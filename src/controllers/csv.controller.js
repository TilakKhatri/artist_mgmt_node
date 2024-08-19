import path from "path";
import fs from "fs";
import db from "../config/db.config.js";
import { parse } from "csv-parse";
import { Parser } from "@json2csv/plainjs";
import { validateRow, validateHeaders } from "../validators/rowValidator.js";

const importCsv = async (req, res) => {
  if (!req.file) {
    return res.apiError("Please enter file", 400);
  }

  const results = [];
  const errors = [];
  const existingNames = new Set();

  const filePath = req.file.path;

  try {
    // Create a read stream for the CSV file
    const fileStream = fs.createReadStream(filePath);

    fileStream
      .pipe(parse({ columns: true, skip_empty_lines: true }))
      .on("data", (row) => {
        const validationErrors = validateRow(row);
        if (validationErrors.length > 0) {
          errors.push({ row, errors: validationErrors });
        } else {
          results.push(row);
        }
      })
      .on("end", async () => {
        if (errors.length > 0) {
          fs.unlink(filePath, (unlinkErr) => {
            if (unlinkErr) console.error("Error deleting file:", unlinkErr);
          });
          return res.apiError("Invalid file uploaded", 400);
        }

        let client;
        try {
          client = await db.connect();
          const existingNamesResult = await client.query(
            "SELECT name FROM artists"
          );
          existingNamesResult.rows.forEach((row) =>
            existingNames.add(row.name)
          );

          const filteredResults = results.filter(
            (row) => !existingNames.has(row.name)
          );

          if (filteredResults.length === 0) {
            fs.unlink(filePath, (unlinkErr) => {
              if (unlinkErr) console.error("Error deleting file:", unlinkErr);
            });
            return res.apiError("No new unique names to insert.", 400);
          }

          await client.query("BEGIN");

          for (const row of filteredResults) {
            await client.query(
              "INSERT INTO artists (name, address, first_release_year, no_of_album_release, dob, gender) VALUES ($1, $2, $3, $4, $5, $6)",
              [
                row.name,
                row.address,
                row.first_release_year,
                row.no_of_album_release,
                row.dob,
                row.gender,
              ]
            );
          }

          await client.query("COMMIT");
          return res.apiSuccess("Inserted successfully", results, 201);
        } catch (error) {
          if (client) {
            try {
              await client.query("ROLLBACK");
            } catch (rollbackErr) {
              console.error("Error during rollback:", rollbackErr);
            }
          }
          console.error("Error importing data:", error.message);
          return res.apiError(
            "Your dataset name must be unique" || error.message,
            500
          );
        } finally {
          if (client) client.release();
          fs.unlink(filePath, (unlinkErr) => {
            if (unlinkErr) console.error("Error deleting file:", unlinkErr);
          });
        }
      })
      .on("error", (err) => {
        console.error("Error parsing CSV:", err);
        fs.unlink(filePath, (unlinkErr) => {
          if (unlinkErr) console.error("Error deleting file:", unlinkErr);
        });
        res.apiError("Failed to process the file", 500);
      });
  } catch (error) {
    console.error("Error during CSV processing:", error.message);

    try {
      await fs.promises.access(filePath); // Check if file exists
      await fs.promises.unlink(filePath); // Delete file
    } catch (err) {
      // File might not exist or could not be deleted
      console.error("Error deleting file:", err.message);
    }
    return res.apiError("Something went wrong" || error.message, 500);
  }
};

const exportCSV = async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM artists");

    if (result.rows.length === 0) {
      return res.apiError(" artist data not found", 404);
    }

    const jsonData = result.rows;

    const parser = new Parser();
    const csv = parser.parse(jsonData);
    res.send(csv);
  } catch (error) {
    console.error("Error exporting data:", error);
    return res.status(500).json({ message: "Error exporting data" });
  }
};
export { exportCSV, importCsv };

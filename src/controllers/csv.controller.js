import path from "path";
import fs from "fs";
import db from "../config/db.config.js";
import { parse } from "csv-parse";
import { Parser } from "@json2csv/plainjs";
import { validateRow, validateHeaders } from "../validators/rowValidator.js";

const importCsv = async (req, res) => {
  try {
    if (!req.file) {
      return res.apiError("Please enter file", 400);
    }
    const results = [];
    const errors = [];
    const existingNames = new Set();

    fs.createReadStream(req.file.path)
      .pipe(parse({ columns: true, skip_empty_lines: true })) // Parse CSV data with headers as columns
      // .on("headers", (headers) => {
      //   console.log(headers);
      //   headersValid = validateHeaders(headers);
      //   if (!headersValid) {
      //     this.emit("error", new Error("Invalid CSV headers"));
      //   }
      // })
      .on("data", (row) => {
        // validating each row of csv to check they match with our schema or not
        const validationErrors = validateRow(row);
        if (validationErrors.length > 0) {
          errors.push({ row, errors: validationErrors });
        } else {
          results.push(row);
        }
      })

      .on("end", async () => {
        if (errors.length > 0) {
          fs.unlinkSync(req.file.path);
          return res.apiError("Invalid file uploaded", 400);
        }
        const client = await db.connect();

        try {
          // Fetch existing names from the database
          const existingNamesResult = await client.query(
            "SELECT name FROM artists"
          );
          existingNamesResult.rows.forEach((row) =>
            existingNames.add(row.name)
          );

          // Filter out rows with existing names
          const filteredResults = results.filter(
            (row) => !existingNames.has(row.name)
          );

          if (filteredResults.length === 0) {
            fs.unlinkSync(req.file.path);
            return res
              .status(400)
              .json({ message: "No new unique names to insert." });
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
          await client.query("ROLLBACK");
          console.error("Error importing data:", error?.message);
          return res.apiError(
            "Your dataset name must be unique" || error?.message,
            500
          );
        } finally {
          client.release();
          fs.unlinkSync(req.file.path);
        }
      });
  } catch (error) {
    console.log("Error", error?.message);
    return res.apiError("Something went wrong" || error?.message, 500);
  }
};

const exportCSV = async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM artists");

    if (result.rows.length === 0) {
      return res.apiError("No artist data found", 404);
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

import path from "path";
import fs from "fs";
import db from "../config/db.config.js";
import { parse } from "csv-parse";
import { Parser } from "@json2csv/plainjs";

const importCsv = async (req, res) => {
  try {
    const results = [];
    fs.createReadStream(req.file.path)
      .pipe(parse({ columns: true, skip_empty_lines: true })) // Parse CSV data with headers as columns
      .on("data", (row) => results.push(row))
      .on("end", async () => {
        // Insert data into PostgreSQL
        const client = await db.connect();
        try {
          await client.query("BEGIN");
          for (const row of results) {
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
          console.error("Error importing data:", error);
          return res.apiError("Error importing data", 500);
        } finally {
          client.release();
          fs.unlinkSync(req.file.path);
        }
      });
  } catch (error) {
    console.log(error?.message);
    return res.apiError("Something went wrong", 500);
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

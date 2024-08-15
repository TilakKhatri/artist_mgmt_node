import pg from "pg";
const { Pool } = pg;

const db = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: 5432, // Default PostgreSQL port
});

async function dbConnection() {
  try {
    const client = await db.connect();
    console.log("Connected to the database successfully");
    client.release();
  } catch (err) {
    console.error("Error connecting to the database", err.stack);
    process.exit(1);
  }
}

dbConnection();

export default db;

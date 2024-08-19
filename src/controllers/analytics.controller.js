import db from "../config/db.config.js";

class AnalyticsControllers {
  constructor() {}

  getCounts = async (req, res) => {
    try {
      const query = `
      SELECT
        (SELECT COUNT(*) FROM users) AS user_count,
        (SELECT COUNT(*) FROM artists) AS artist_count,
        (SELECT COUNT(*) FROM music) AS music_count
    `;
      const result = await db.query(query);
      return res.apiSuccess("Fetched successfully", result.rows[0], 200);
    } catch (error) {
      console.log(error?.message);
      return res.apiError("Something went wrong", 500);
    }
  };
}

export default AnalyticsControllers;

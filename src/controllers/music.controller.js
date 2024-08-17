import db from "../config/db.config.js";

class MusicControllers {
  constructor() {}

  create = async (req, res) => {
    try {
      const { artist_id, title, album_name, genre } = req.body;

      // Validate genre value if not using ENUM
      const validGenres = ["rnb", "country", "classic", "rock", "jazz"];
      if (!validGenres.includes(genre)) {
        return res.apiError("Invalid genre", 400);
      }

      const result = await db.query(
        `INSERT INTO music (artist_id, title, album_name, genre, created_at, updated_at)
         VALUES ($1, $2, $3, $4, NOW(), NOW()) 
         RETURNING id, artist_id, title, album_name, genre`,
        [artist_id, title, album_name, genre]
      );

      const newMusic = result.rows[0];
      return res.apiSuccess("Music created successfully", newMusic, 201);
    } catch (error) {
      return res.apiError("Something went wrong", 500);
    }
  };

  getAllMusic = async (req, res) => {
    try {
      const page = parseInt(req.query.page, 10) || 1;
      const limit = parseInt(req.query.limit, 10) || 10;
      const offset = (page - 1) * limit;

      const totalMusicResult = await db.query("SELECT COUNT(*) FROM music");
      const totalMusic = parseInt(totalMusicResult.rows[0].count, 10);

      const musicResult = await db.query(
        `SELECT * FROM music ORDER BY created_at DESC LIMIT $1 OFFSET $2`,
        [limit, offset]
      );

      const music = musicResult.rows;
      // Calculate total pages
      const totalPages = Math.ceil(totalMusic / limit);

      return res.apiSuccess(
        "Fetched successfully",
        {
          music,
          currentPage: page,
          totalPages,
          totalMusic,
          limit,
        },
        200
      );
    } catch (error) {
      return res.apiError("Something went wrong", 500);
    }
  };

  getMusicById = async (req, res) => {
    try {
      const musicId = req.params.id;
      const musicResult = await db.query(`SELECT * FROM music WHERE id = $1`, [
        musicId,
      ]);

      if (musicResult.rows.length === 0) {
        return res.apiError("Music not found", 404);
      }

      const musicDetail = musicResult.rows[0];
      return res.apiSuccess("Music detail fetched", musicDetail, 200);
    } catch (error) {
      return res.apiError("Something went wrong", 500);
    }
  };

  deleteMusicById = async (req, res) => {
    try {
      const musicId = req.params.id;
      const musicResult = await db.query(
        `DELETE FROM music WHERE id = $1 RETURNING id`,
        [musicId]
      );

      if (musicResult.rows.length === 0) {
        return res.apiError("Music not found", 404);
      }

      return res.apiSuccess("Music deleted successfully", null, 200);
    } catch (error) {
      return res.apiError("Something went wrong", 500);
    }
  };

  editMusicById = async (req, res) => {
    try {
      const musicId = req.params.id;
      const { artist_id, title, album_name, genre } = req.body;

      // Validate genre value if not using ENUM
      const validGenres = ["rnb", "country", "classic", "rock", "jazz"];
      if (!validGenres.includes(genre)) {
        return res.apiError("Invalid genre", 400);
      }

      const existingMusicResult = await db.query(
        "SELECT * FROM music WHERE id = $1",
        [musicId]
      );

      if (existingMusicResult.rows.length === 0) {
        return res.apiError("Music not found", 404);
      }

      const musicResult = await db.query(
        `UPDATE music 
         SET artist_id = $1, title = $2, album_name = $3, genre = $4, updated_at = $5
         WHERE id = $6 RETURNING *`,
        [artist_id, title, album_name, genre, new Date(), musicId]
      );

      const updatedMusic = musicResult.rows[0];
      return res.apiSuccess("Music updated successfully", updatedMusic, 200);
    } catch (error) {
      return res.apiError(`Something went wrong: ${error.message}`, 500);
    }
  };
}

export default MusicControllers;

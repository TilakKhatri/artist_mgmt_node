import db from "../config/db.config.js";

class ArtistControllers {
  constructor() {}

  create = async (req, res) => {
    try {
      // console.log(req.body);
      // Check if the email already exists
      const existingArtist = await db.query(
        "SELECT * FROM artists WHERE name = $1",
        [req.body.name]
      );

      if (existingArtist.rows.length > 0) {
        return res.apiError("Artist already exists", 400);
      }

      const result = await db.query(
        `INSERT INTO artists (name, address, first_release_year, no_of_album_release, dob, gender) 
                VALUES ($1, $2, $3, $4, $5, $6) 
                RETURNING id, name, address, first_release_year, no_of_album_release, dob, gender`,
        [
          req.body.name,
          req.body.address,
          req.body.first_release_year,
          req.body.no_of_album_release,
          req.body.dob,
          req.body.gender,
        ]
      );

      const newArtist = result.rows[0];
      // console.log(newArtist);
      if (newArtist !== null) {
        return res.apiSuccess("Artist created sucessful", newArtist, 201);
      } else {
        return new Error("Database error");
      }
    } catch (error) {
      return res.apiError("Something went wrong", 500);
    }
  };

  getArtistCreation = async (req, res) => {
    try {
      const artistId = req.params.id;
      const artistResult = await db.query(
        `SELECT * FROM artists WHERE id = $1`,
        [artistId]
      );
      // Check if a user was found
      if (artistResult.rows.length === 0) {
        return res.apiError("Artist not found", 404);
      }
      const query = `SELECT m.id,m.title,m.album_name,m.genre FROM music m inner join artists ar on m.artist_id = ar.id where ar.id=$1`;
      const result = await db.query(query, [artistId]);

      const artistCreation = result.rows;
      return res.apiSuccess("Artist Creation Fetching", artistCreation, 200);
    } catch (error) {
      return res.apiError("Something went wrong", 500);
    }
  };

  getAllArtists = async (req, res) => {
    try {
      const page = parseInt(req.query.page, 10) || 1;
      const limit = parseInt(req.query.limit, 10) || 10;
      const offset = (page - 1) * limit;

      const totalArtistsResult = await db.query("SELECT COUNT(*) FROM artists");
      const totalArtists = parseInt(totalArtistsResult.rows[0].count, 10);

      const artistResult = await db.query(
        `SELECT * FROM artists ORDER BY created_at DESC LIMIT $1 OFFSET $2`,
        [limit, offset]
      );

      const artists = artistResult.rows;
      // console.log(artists);
      // Calculate total pages
      const totalPages = Math.ceil(totalArtists / limit);

      return res.apiSuccess(
        "fetched successfully",
        {
          artists,
          currentPage: page,
          totalPages,
          totalArtists,
          limit,
        },
        200
      );
    } catch (error) {
      return res.apiError("Something went wrong", 500);
    }
  };

  getArtistById = async (req, res) => {
    try {
      const artistId = req.params.id;
      const artistResult = await db.query(
        `SELECT * FROM artists WHERE id = $1`,
        [artistId]
      );
      // Check if a user was found
      if (artistResult.rows.length === 0) {
        return res.apiError("Artist not found", 404);
      }
      const artistDetail = artistResult.rows[0];
      return res.apiSuccess("Artist Detail Fetching", { artistDetail }, 200);
    } catch (error) {
      return res.apiError("Something went wrong", 500);
    }
  };

  deleteArtistById = async (req, res) => {
    try {
      const artistId = req.params.id;
      const artistResult = await db.query(
        `DELETE FROM artists where id = $1 RETURNING id`,
        [artistId]
      );
      //   console.log(artistResult);
      if (artistResult.rows.length === 0) {
        return res.apiError("Artist not found", 404);
      }

      return res.apiSuccess("Artist deleted successfully", null, 200);
    } catch (error) {
      return res.apiError("Something went wrong", 500);
    }
  };

  editArtistById = async (req, res) => {
    try {
      const artistId = req.params.id;
      const {
        name,
        address,
        first_release_year,
        no_of_album_release,
        dob,
        gender,
      } = req.body;

      const existingArtistResult = await db.query(
        "SELECT * FROM artists WHERE id = $1",
        [artistId]
      );

      if (existingArtistResult.rows.length === 0) {
        return res.apiError("Artist not found", 404);
      }

      const artistResult = await db.query(
        `UPDATE artists SET name = $1, address = $2, first_release_year = $3, no_of_album_release = $4, dob = $5, gender = $6, updated_at = $7
             WHERE id = $8 RETURNING *`,

        [
          name,
          address,
          first_release_year,
          no_of_album_release,
          dob,
          gender,
          new Date(),
          artistId,
        ]
      );

      const updatedArtist = artistResult.rows[0];
      return res.apiSuccess(
        "Fetching user after update",
        { updatedArtist },
        200
      );
    } catch (error) {
      return res.apiError(`Something went wrong ${error.message}`, 500);
    }
  };
}

export default ArtistControllers;

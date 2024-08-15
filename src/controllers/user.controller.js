import db from "../config/db.config.js";
import {
  GeneratePassword,
  PasswordValidation,
  GenerateToken,
} from "../utils/auth.utils.js";

class UserControllers {
  constructor() {}

  create = async (req, res) => {
    try {
      // Check if the email already exists
      const existingUser = await db.query(
        "SELECT * FROM users WHERE email = $1",
        [req.body.email]
      );

      if (existingUser.rows.length > 0) {
        return res.apiError("Email already exists", 400);
      }

      // hash password using bcrypt
      const hashedPassword = await GeneratePassword(req.body.password);

      const result = await db.query(
        `INSERT INTO users (first_name, last_name, email, password, phone, dob, gender, address, isAdmin, created_at, updated_at) 
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, NOW(), NOW()) 
                RETURNING id, first_name, last_name, email, phone, dob, gender, address, isAdmin, created_at, updated_at`,
        [
          req.body.first_name,
          req.body.last_name,
          req.body.email,
          hashedPassword,
          req.body.phone,
          req.body.dob,
          req.body.gender,
          req.body.address,
          req.body.isAdmin,
        ]
      );

      const newUser = result.rows[0];

      if (newUser !== null) {
        return res.apiSuccess("Account created sucessful", newUser, 201);
      } else {
        return new Error("Database error");
      }
    } catch (error) {
      return res.apiError("Something went wrong", 500);
    }
  };

  getAllUsers = async (req, res) => {
    try {
      const page = parseInt(req.query.page, 10) || 1;
      const limit = parseInt(req.query.limit, 10) || 10;
      const offset = (page - 1) * limit;

      const totalUsersResult = await db.query("SELECT COUNT(*) FROM users");
      const totalUsers = parseInt(totalUsersResult.rows[0].count, 10);

      const usersResult = await db.query(
        `SELECT * FROM users ORDER BY created_at DESC LIMIT $1 OFFSET $2`,
        [limit, offset]
      );

      const users = usersResult.rows;
      // Calculate total pages
      const totalPages = Math.ceil(totalUsers / limit);

      return res.apiSuccess(
        "fetched successfully",
        {
          users,
          currentPage: page,
          totalPages,
          totalUsers,
          limit,
        },
        200
      );
    } catch (error) {
      return res.apiError("Something went wrong", 500);
    }
  };
}

export default UserControllers;

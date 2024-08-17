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

  getUserById = async (req, res) => {
    try {
      const userId = req.params.id;
      const userResult = await db.query(
        `SELECT id, first_name,last_name,email,email,phone,address,gender,isAdmin FROM users WHERE id = $1`,
        [userId]
      );
      // Check if a user was found
      if (userResult.rows.length === 0) {
        return res.apiError("User not found", 404);
      }
      const userDetail = userResult.rows[0];
      return res.apiSuccess("User Detail Fetching", { userDetail }, 200);
    } catch (error) {
      return res.apiError("Something went wrong", 500);
    }
  };

  deleteUserById = async (req, res) => {
    try {
      const userId = req.params.id;
      const userResult = await db.query(
        `DELETE FROM users where id = $1 RETURNING id`,
        [userId]
      );
      console.log(userResult);
      if (userResult.rows.length === 0) {
        return res.apiError("User not found", 404);
      }

      return res.apiSuccess("User deleted successfully", null, 200);
    } catch (error) {
      return res.apiError("Something went wrong", 500);
    }
  };

  editUserById = async (req, res) => {
    try {
      const userId = req.params.id;
      const {
        first_name,
        last_name,
        email,
        phone,
        dob,
        gender,
        address,
        isAdmin,
      } = req.body;

      const existingUserResult = await db.query(
        "SELECT * FROM users WHERE id = $1",
        [userId]
      );

      if (existingUserResult.rows.length === 0) {
        return res.apiError("User not found", 404);
      }

      const userResult = await db.query(
        `UPDATE users SET first_name = $1, last_name = $2, email = $3, phone = $4, dob = $5, gender = $6, address = $7, isAdmin = $8, updated_at = $9
             WHERE id = $10 RETURNING id, first_name, last_name, email, phone, dob, gender, address, isAdmin`,

        [
          first_name,
          last_name,
          email,
          phone,
          dob,
          gender,
          address,
          isAdmin,
          new Date(),
          userId,
        ]
      );

      const updateUser = userResult.rows[0];
      return res.apiSuccess("Fetching user after update", { updateUser }, 200);
    } catch (error) {
      return res.apiError(`Something went wrong ${error.message}`, 500);
    }
  };
}

export default UserControllers;

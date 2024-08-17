import {
  GeneratePassword,
  PasswordValidation,
  GenerateToken,
} from "../utils/auth.utils.js";

import db from "../config/db.config.js";

class AuthControllers {
  constructor() {}

  register = async (req, res) => {
    try {
      // Check if the email already exists
      const existingUser = await db.query(
        "SELECT * FROM admin WHERE email = $1",
        [req.body.email]
      );

      if (existingUser.rows.length > 0) {
        return res.apiError("Email already exists", 400);
      }

      // hash password using bcrypt
      const hashedPassword = await GeneratePassword(req.body.password);

      const result = await db.query(
        `INSERT INTO admin (username, email, password) 
              VALUES ($1, $2, $3) 
              RETURNING id, username, email`,
        [req.body.username, req.body.email, hashedPassword]
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

  login = async (req, res) => {
    try {
      const { email, password } = req.body;

      // check user exists or not
      const userExists = await db.query(
        "SELECT * FROM admin WHERE email = $1",
        [email]
      );

      if (userExists.rows.length < 1) {
        return res.apiError("admin does not exists", 404);
      } else {
        const user = userExists.rows[0];
        console.log(user);
        const validate = await PasswordValidation(user.password, password);
        console.log(validate);
        if (validate === false) {
          return res.apiError("Email or Password incorrect.", 403);
        }
        // generate token
        const token = await GenerateToken({
          _id: user.id,
          email: user.email,
          username: user.username,
        });
        return res.apiSuccess(
          "Login successfully",
          {
            email: user.email,
            username: user.username,
            token,
          },
          200
        );
      }
    } catch (error) {
      return res.apiError("Something went wrong", 500);
    }
  };

  logout = async (req, res) => {
    const token = req.header("Authorization")?.split(" ")[1];
    if (!token) {
      return res.apiError("Token not found", 400);
    }
    return res.apiSuccess("Logged out successfully", 200);
  };
}

export default AuthControllers;

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const GeneratePassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

export const PasswordValidation = async (hashPassword, plainPassword) => {
  console.log(plainPassword, hashPassword);
  return await bcrypt.compare(plainPassword, hashPassword);
};

export const GenerateToken = async (payload) => {
  return jwt.sign(payload, process.env.APP_SECRET, { expiresIn: "30d" });
};

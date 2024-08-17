import { z } from "zod";

export const userRegisterSchema = z.object({
  username: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(8),
});

export const userLoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const createUserSchema = z.object({
  first_name: z.string().min(1),
  last_name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(8),
  phone: z.string().optional(),
  dob: z.string().refine((date) => !isNaN(Date.parse(date))),
  gender: z.enum(["m", "f", "o"], "Gender must be one of 'm', 'f', or 'o'."),
  address: z.string().optional(),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
});

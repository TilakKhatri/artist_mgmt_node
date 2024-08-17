import * as z from "zod";

export const artistSchema = z.object({
  name: z.string().min(8),
  address: z.string().optional(),
  first_release_year: z.string(),
  no_of_album_release: z.number(),
  dob: z.string().refine((date) => !isNaN(Date.parse(date))),
  gender: z.enum(["m", "f", "o"], "Gender must be one of 'm', 'f', or 'o'."),
});

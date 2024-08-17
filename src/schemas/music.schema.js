import * as z from "zod";

export const musicSchema = z.object({
  artist_id: z.number(),
  title: z.string().min(10),
  album_name: z.string().min(5),
  genre: z.enum(
    ["rnb", "country", "classic", "rock", "jazz"],
    "Gender must be one of 'rnb', 'country','classic','rock', or 'jazz'."
  ),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
});

import { z } from "zod";

const movieRequestSchema = z.object({
  name: z.string().max(50, "String must contain at most 50 character(s)"),
  description: z.string().nullish(),
  duration: z.number().int().positive("Number must be greater than 0"),
  price: z.number().int().positive("Number must be greater than 0"),
});

const movieSchema = movieRequestSchema.extend({
  id: z.number().int(),
});

export { movieRequestSchema, movieSchema };

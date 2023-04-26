import { z } from "zod";
import { movieRequestSchema, movieSchema } from "../schemas/movies.schemas";

type IMovieRequest = z.infer<typeof movieRequestSchema>;

type IMovie = z.infer<typeof movieSchema>;

export { IMovieRequest, IMovie };

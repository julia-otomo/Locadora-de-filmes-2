import { z } from "zod";
import { movieRequestSchema, movieSchema } from "../schemas/movies.schemas";

type IMovieRequest = z.infer<typeof movieRequestSchema>;

type IMovie = z.infer<typeof movieSchema>;

interface IGetMovies {
  prevPage: string | null;
  nextPage: string | null;
  count: number;
  data: IMovie[];
}

export { IMovieRequest, IMovie, IGetMovies };

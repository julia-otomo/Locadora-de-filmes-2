import { Repository } from "typeorm";
import { IMovie, IMovieRequest } from "../interfaces/movies.interfaces";
import { Movie } from "../entities";
import { AppDataSource } from "../data-source";
import { movieSchema } from "../schemas/movies.schemas";

const createMovieService = async (
  requestBody: IMovieRequest
): Promise<IMovie> => {
  const movieRepository: Repository<Movie> = AppDataSource.getRepository(Movie);

  const movie: Movie = movieRepository.create(requestBody);

  await movieRepository.save(movie);

  const validateMovie: IMovie = movieSchema.parse(movie);

  return validateMovie;
};

export default createMovieService;

import { Repository } from "typeorm";
import { IMovie, IMovieRequest } from "../interfaces/movies.interfaces";
import { AppDataSource } from "../data-source";
import { Movie } from "../entities";
import { movieSchema } from "../schemas/movies.schemas";

const updateMovieService = async (
  requestBody: Partial<IMovieRequest>,
  movieId: number
): Promise<IMovie> => {
  const movieRepository: Repository<Movie> = AppDataSource.getRepository(Movie);

  let movie: Movie | null = await movieRepository.findOne({
    where: {
      id: movieId,
    },
  });

  movie = {
    ...movie!,
    ...requestBody,
  };

  const validateUpdate: IMovie = movieSchema.parse(movie);

  await movieRepository.save(validateUpdate);

  return validateUpdate;
};

export default updateMovieService;

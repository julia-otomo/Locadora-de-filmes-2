import { Repository } from "typeorm";
import { Movie } from "../entities";
import { AppDataSource } from "../data-source";
import { IMovie } from "../interfaces/movies.interfaces";

const deleteMovieService = async (movieId: number): Promise<void> => {
  const movieRepository: Repository<Movie> = AppDataSource.getRepository(Movie);

  const movie: Movie | null = await movieRepository.findOne({
    where: {
      id: movieId,
    },
  });

  await movieRepository.remove(movie!);
};

export default deleteMovieService;

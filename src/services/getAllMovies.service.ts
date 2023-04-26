import { Repository } from "typeorm";
import { Movie } from "../entities";
import { AppDataSource } from "../data-source";
import { IMovie } from "../interfaces/movies.interfaces";

const getAllMoviesService = async (): Promise<IMovie[]> => {
  const movieRepository: Repository<Movie> = AppDataSource.getRepository(Movie);

  const movies: IMovie[] = await movieRepository.find();

  return movies;
};

export default getAllMoviesService;

import { Repository } from "typeorm";
import { Movie } from "../entities";
import { AppDataSource } from "../data-source";
import { IGetMovies, IMovie } from "../interfaces/movies.interfaces";

const getAllMoviesService = async (
  page: number | null,
  perPage: number | null,
  order: string | null,
  sort: string | null
): Promise<IGetMovies> => {
  const movieRepository: Repository<Movie> = AppDataSource.getRepository(Movie);

  let pageParams: number = page && page > 0 ? page : 1;

  let perPageParams: number =
    perPage && perPage > 0 && perPage <= 5 ? perPage : 5;

  let orderParams: string =
    order && (order === "asc" || order === "desc") ? order : "asc";

  let orderAndSortItems = {};

  if (sort) {
    if (sort === "price") {
      orderAndSortItems = {
        price: orderParams,
      };
    } else if (sort === "duration") {
      orderAndSortItems = {
        duration: orderParams,
      };
    } else {
      orderAndSortItems = {
        id: orderParams,
      };
    }
  } else {
    orderAndSortItems = {
      id: "asc",
    };
  }

  const [filteredMovies, count]: [IMovie[], number] =
    await movieRepository.findAndCount({
      skip: (pageParams - 1) * perPageParams,
      take: perPageParams,
      order: orderAndSortItems,
    });

  const totalPages: number = Math.ceil(count / perPageParams);

  const nextPageUrl: string = `http://localhost:3000/movies?page=${
    pageParams + 1
  }&perPage=${perPageParams}`;

  const prevPageUrl: string = `http://localhost:3000/movies?page=${
    pageParams - 1
  }&perPage=${perPageParams}`;

  const filteredMoviesReturn: IGetMovies = {
    prevPage: pageParams >= 2 ? prevPageUrl : null,

    nextPage:
      pageParams >= 1 && pageParams <= totalPages - 1 ? nextPageUrl : null,
    count: count,
    data: filteredMovies,
  };

  return filteredMoviesReturn;
};

export default getAllMoviesService;

import { Request, Response } from "express";
import {
  IGetMovies,
  IMovie,
  IMovieRequest,
} from "../interfaces/movies.interfaces";
import createMovieService from "../services/createMovie.service";
import getAllMoviesService from "../services/getAllMovies.service";
import updateMovieService from "../services/updateMovie.service";
import deleteMovieService from "../services/deleteMovie.service";

const createMovieController = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const requestBody: IMovieRequest = request.body;

  const newMovie: IMovie = await createMovieService(requestBody);

  return response.status(201).json(newMovie);
};

const getAllMoviesController = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const page: number | undefined = Number(request.query.page);
  const perPage: number | undefined = Number(request.query.perPage);
  const order: any = request.query.order;
  const sort: any = request.query.sort;

  const getMovies: IGetMovies = await getAllMoviesService(
    page,
    perPage,
    order,
    sort
  );

  return response.json(getMovies);
};

const updateMovieController = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const requestBody: IMovieRequest = request.body;

  const movieId: number = Number(request.params.id);

  const updateQuery: IMovie = await updateMovieService(requestBody, movieId);

  return response.status(200).json(updateQuery);
};

const deleteMovieController = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const movieId: number = Number(request.params.id);

  await deleteMovieService(movieId);

  return response.status(204).send();
};

export {
  createMovieController,
  getAllMoviesController,
  updateMovieController,
  deleteMovieController,
};

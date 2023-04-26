import { Request, Response } from "express";
import { IMovie, IMovieRequest } from "../interfaces/movies.interfaces";
import createMovieService from "../services/createMovie.service";
import getAllMoviesService from "../services/getAllMovies.service";

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
  const getMovies: IMovie[] = await getAllMoviesService();

  return response.json(getMovies);
};

export { createMovieController, getAllMoviesController };

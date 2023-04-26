import { NextFunction, Request, Response } from "express";
import { Repository } from "typeorm";
import { Movie } from "../entities";
import { AppDataSource } from "../data-source";
import AppError from "../error";

const verifyIdMiddleware = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> => {
  const movieId: number = Number(request.params.id);

  const movieRepository: Repository<Movie> = AppDataSource.getRepository(Movie);

  const findMovie: boolean | null = await movieRepository.exist({
    where: {
      id: movieId,
    },
  });

  if (!findMovie) {
    throw new AppError("Movie not found", 404);
  }

  next();
};

export default verifyIdMiddleware;

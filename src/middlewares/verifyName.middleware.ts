import { NextFunction, Request, Response } from "express";
import { Repository } from "typeorm";
import { Movie } from "../entities";
import { AppDataSource } from "../data-source";
import AppError from "../error";

const verifyNameMiddleware = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> => {
  const movieName: string = request.body.name;

  const movieRepository: Repository<Movie> = AppDataSource.getRepository(Movie);

  const findMovie: boolean | null = await movieRepository.exist({
    where: {
      name: movieName,
    },
  });

  if (findMovie) {
    throw new AppError("Movie already exists.", 409);
  }

  next();
};

export default verifyNameMiddleware;

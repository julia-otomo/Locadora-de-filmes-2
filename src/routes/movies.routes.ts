import { Router } from "express";
import validateRequestBody from "../middlewares/validateBody.middleware";
import { movieRequestSchema, movieSchema } from "../schemas/movies.schemas";
import verifyNameMiddleware from "../middlewares/verifyName.middleware";
import {
  createMovieController,
  getAllMoviesController,
} from "../controllers/movies.controllers";
import verifyIdMiddleware from "../middlewares/verifyId.middleware";

const moviesRouter: Router = Router();

moviesRouter.post(
  "",
  validateRequestBody(movieRequestSchema),
  verifyNameMiddleware,
  createMovieController
);

moviesRouter.get("", getAllMoviesController);

export default moviesRouter;

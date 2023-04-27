import { Router } from "express";
import validateRequestBody from "../middlewares/validateBody.middleware";
import { movieRequestSchema, movieSchema } from "../schemas/movies.schemas";
import verifyNameMiddleware from "../middlewares/verifyName.middleware";
import {
  createMovieController,
  deleteMovieController,
  getAllMoviesController,
  updateMovieController,
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

moviesRouter.patch(
  "/:id",
  validateRequestBody(movieRequestSchema.partial()),
  verifyIdMiddleware,
  verifyNameMiddleware,
  updateMovieController
);

moviesRouter.delete("/:id", verifyIdMiddleware, deleteMovieController);

export default moviesRouter;

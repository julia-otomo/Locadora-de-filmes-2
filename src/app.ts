import express, { Application } from "express";
import "reflect-metadata";
import "express-async-errors";
import handleError from "./middlewares/handleErrors.middleware";
import moviesRouter from "./routes/movies.routes";

const app: Application = express();

app.use(express.json());

app.use("/movies", moviesRouter);

app.use(handleError);

export default app;

import express, { Application } from "express";
import "express-async-errors";
import handleError from "./middlewares/handleErrors.middleware";

const app: Application = express();

app.use(express.json());

app.use(handleError);

export default app;

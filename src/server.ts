import app from "./app";
import AppDataSource from "./data-source";
import "dotenv/config";
AppDataSource.initialize()
  .then(async () => {
    console.log("Database connected");

    const PORT: number = Number(process.env.PORT);

    app.listen(PORT, () => {
      console.log(`Server is running on https://localhost:${PORT}`);
    });
  })
  .catch((error) => console.log(error));

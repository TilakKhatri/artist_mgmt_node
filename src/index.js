import express from "express";
import dotenv from "dotenv";
import cors from "cors";

// import setupDB from "./config/db";
import ExpressApp from "./services/express.js";
import responseHandler from "./middlewares/responseHandler.js";
import dbConnection from "./config/db.config.js";
dotenv.config({
  path: "./.env",
});

const port = process.env.PORT || 8000;

async function startServer() {
  const app = express();

  app.use(
    cors({
      origin: [
        "http://127.0.0.1:3000",
        "http://localhost:3000",
        "http://localhost:5173",
      ],
      credentials: true,
    })
  );
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // @DESC middleware setups
  app.use(responseHandler);

  // await setupDB();
  await ExpressApp(app);

  app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
  });

  app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
  });
}

startServer();

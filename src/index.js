import express from "express";
import path from "path";
import fs from "fs";
import dotenv from "dotenv";
import cors from "cors";
import audit from "express-requests-logger";

// import setupDB from "./config/db";
import ExpressApp from "./services/express.js";
import responseHandler from "./middlewares/responseHandler.js";
dotenv.config({
  path: "./.env",
});

const port = process.env.PORT || 8000;

async function startServer() {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // app.use("/static", express.static(path.join(__dirname, "public")));

  // @DESC middleware setups
  app.use(responseHandler);

  // await setupDB();
  await ExpressApp(app);

  app.use(audit());
  app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
  });
}

startServer();

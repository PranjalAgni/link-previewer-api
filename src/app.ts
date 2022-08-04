import express from "express";
import compression from "compression";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import config from "./config";
import apiRouter from "./api/index";
import { errorHandler, notFound } from "./middlewares/common";

const initalizeApp = async (): Promise<express.Application> => {
  const app: express.Application = express();

  // If we are behind some reverse proxy like Nginx then we can trust this X-Forwarded-For header
  // Read More: https://stackoverflow.com/questions/39930070/nodejs-express-why-should-i-use-app-enabletrust-proxy
  app.enable("trust proxy");

  app.use(cors());
  app.use(helmet());
  app.use(compression());
  app.use(express.json());
  app.use(morgan(config.isDev ? "dev" : "combined"));

  app.get("/", (_req: express.Request, res: express.Response) => {
    res.status(200).send(`Server running at http://localhost:${config.port}`);
  });

  app.use("/api", apiRouter);
  app.use(notFound);
  app.use(errorHandler);

  return app;
};

export default initalizeApp;

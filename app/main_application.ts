require("dotenv").config();
import express = require("express");
import "reflect-metadata";
import { Controller } from "./controller/controller";
import ErrorHandlerMiddleware from "./middleware/error_middleware";
import cors from "cors";
import { runPuppeteerLogin } from "./services/runPuppeteerLogin";

class MainApplication {
  public app: express.Application;
  public origins: Array<string> = ["*"];

  constructor(controllers: Controller[]) {
    this.app = express();

    this.initializeMiddlewares();
    this.initializeControllers(controllers);
    this.initializeErrorHandling();
  }

  public listen() {
    this.app.listen(process.env.PORT, () => {
      console.log(`MainApplication listening on the port ${process.env.PORT}`);
    }).keepAliveTimeout = 2 * 60 * 1000;
  }

  public dispose() {}

  private initializeMiddlewares() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(
      cors({
        origin: true,
        methods: "*",
        allowedHeaders: ["Content-Type", "Authorization"],
        optionsSuccessStatus: 204,
      }),
    );
  }

  private initializeErrorHandling() {
    this.app.use(ErrorHandlerMiddleware.errorMiddleware);
  }

  private initializeControllers(controllers: Controller[]) {
    controllers.forEach((controller) => {
      this.app.use("/", controller.router);
    });
  }
}

export default MainApplication;

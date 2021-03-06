import express from "express";
import bodyParser from "body-parser";
import helmet from "helmet";
import cors from "cors";

import Authentication from "./Authentication";
import Router from "./routes/Routes";

export class Server {
  private app: express.Application;
  private PORT: number | string;

  constructor(PORT: number) {
    this.app = express();
    this.PORT = process.env.PORT || PORT;
    this.config();
  }

  private config(): void {
    this.app.use(helmet());
    this.app.use(cors());
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(Authentication.initialize());
  }

  public start(): void {
    this.app.listen(this.PORT, () => {
      console.log(`Serving on port: ${this.PORT}`);
    });
    Router.routes(this.app);
  }
}

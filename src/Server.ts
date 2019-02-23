import express from "express";
import bodyParser from "body-parser";

import Router from "./routes/Routes";

class Server {
  private app: express.Application;
  private PORT: number | string;

  constructor(PORT: number) {
    this.app = express();
    this.PORT = process.env.PORT || PORT;
    this.config();
  }

  private config(): void {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
  }

  public start(): void {
    this.app.listen(this.PORT, () => {
      console.log(`Serving on port: ${this.PORT}`);
    });
    Router.routes(this.app);
  }
}

export default new Server(8000);

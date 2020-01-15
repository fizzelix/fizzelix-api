require("dotenv").config();
import { Server } from "./Server";
import Database from "./Database";

class Program {
  static init(): void {
    new Server(8000).start();
    Database.connect();
    Database.showConnection();
  }
}
Program.init();

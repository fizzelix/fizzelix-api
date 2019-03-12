require("dotenv").config();
import Server from "./Server";
import Database from "./Database";

class Program {
  static init(): void {
    Server.start();
    Database.connect();
    Database.showConnection();
  }
}
Program.init();

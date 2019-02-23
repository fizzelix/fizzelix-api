require("dotenv").config();
import mongoose from "mongoose";

const db = process.env.DATABASE_URL || "development";

class Database {
  private databaseEnvironment: string;
  private enviroment: string;

  constructor(databaseEnvironment: string | undefined) {
    if (
      process.env.DATABASE_URL !== undefined &&
      databaseEnvironment === process.env.DATABASE_URL
    ) {
      this.enviroment = "production";
      this.databaseEnvironment = process.env.DATABASE_URL;
    } else {
      this.enviroment = "development";
      this.databaseEnvironment = "mongodb://localhost:27017/fizzelix";
    }
  }

  public connect(): void {
    mongoose.connect(
      this.databaseEnvironment,
      { useNewUrlParser: true },
      (err: any) => {
        if (err) return console.log("Unable to connect to database");
      }
    );
  }

  public showConnection(): void {
    console.log(
      `Connected to ${this.databaseEnvironment} and is in ${
        this.enviroment
      } mode`
    );
  }
}

export default new Database(db);

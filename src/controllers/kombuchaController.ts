import mongoose from "mongoose";
import { Request, Response } from "express";
import { Kombucha } from "../models/kombucha";

class KombuchaController {
  public addNewKombucha(req: Request, res: Response): void {
    const newKombucha = new Kombucha(req.body);

    newKombucha.save((err: any, kombucha: mongoose.Document) => {
      if (err) {
        console.log(`Failed to save a Kombucha`);
        res.send(err);
      }
      res.json(kombucha);
    });
  }

  public getKombuchas(req: Request, res: Response): void {
    Kombucha.find({}, (err: any, kombuchas) => {
      if (err) {
        res.send(err);
      }
      res.json(kombuchas);
    });
  }
}

export default new KombuchaController();

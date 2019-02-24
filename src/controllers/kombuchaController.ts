import mongoose from "mongoose";
import { Request, Response } from "express";
import { Kombucha } from "../models/kombucha";

// /kombucha/	GET	index   XX
// /kombucha/new	GET	new (client)
// /kombucha	POST	create    XX
// /kombucha/:id	GET	show    XX
// /kombucha/:id/edit	GET	edit  (client)
// /kombucha/:id	PATCH/PUT	update  XX
// /kombucha/:id	DELETE	destroy XX

class KombuchaController {
  public getKombuchas(req: Request, res: Response): void {
    Kombucha.find({}, (err: any, kombuchas) => {
      if (err) {
        console.log("Failed to get kombuchas");
        res.send(err);
      }
      res.json(kombuchas);
    });
  }

  public addNewKombucha(req: Request, res: Response): void {
    const newKombucha = new Kombucha(req.body);

    newKombucha.save((err: any, kombucha: mongoose.Document) => {
      if (err) {
        console.log("Failed to save a Kombucha");
        res.send(err);
      }
      // TODO: redirect in client
      res.status(200).send("Save Successful. Redirecting...");
    });
  }

  public getKombucha(req: Request, res: Response): void {
    // url looks like this: /kombucha/5c6e10b194bff38119f1f82u
    Kombucha.findById(
      req.params.id,
      (err: any, kombucha: mongoose.Document) => {
        if (err) {
          console.log("Failed to get kombucha");
          res.send(err);
        }
        res.status(200).json(kombucha);
      }
    );
  }

  public editKombucha(req: Request, res: Response): void {
    Kombucha.findByIdAndUpdate(
      req.params.id,
      req.body,
      (err: any, kombucha: any) => {
        if (err) {
          console.log("Failed to edit kombucha");
          res.send(err);
        }
        // TODO: redirect in client
        res.status(200).send("Update Successful. Redirecting...");
      }
    );
  }

  public deleteKombucha(req: Request, res: Response): void {
    Kombucha.findByIdAndDelete(req.params.id, (err: any, kombucha: any) => {
      if (err) {
        console.log("Failed to Delete komucha");
        res.send(err);
      }
      // TODO: redirect in client
      res.status(200).send("Delete Successful. Redirecting...");
    });
  }
}

export default new KombuchaController();

import mongoose from "mongoose";
import { Request, Response } from "express";
import { User } from "../models/users";
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
    Kombucha.create(req.body, (err: any, kombucha: any) => {
      if (err) return console.log("Failed to create kombucha");

      // username will be dynamic once authentication is set up,
      // it will read from req.user.username
      User.findOne({ username: "Paulo" }, (err: any, user: any) => {
        if (err) {
          console.log("Couldn't find user");
        }
        user.kombuchas.push(kombucha);
        user.save((err: any, data: any) => {
          if (err) {
            console.log("Failed to save data", err);
          }
          res.redirect("/users");
        });
      });
    });
  }

  public getKombucha(req: Request, res: Response): void {
    // url looks like this: /kombucha/5c6e10b194bff38119f1f82u
    // populate("user") refers to object key in kombuchaSchema
    Kombucha.findById(
      req.params.kombuchaId,
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
      req.params.kombuchaId,
      req.body,
      (err: any, kombucha: any) => {
        if (err) {
          console.log("Failed to edit kombucha");
          res.send(err);
        }
        res.redirect(`/kombucha/${kombucha._id}`);
      }
    );
  }

  public deleteKombucha(req: Request, res: Response): void {
    Kombucha.findByIdAndDelete(
      req.params.kombuchaId,
      (err: any, kombucha: any) => {
        if (err) {
          console.log("Failed to Delete kombucha");
          res.send(err);
        }
        res.redirect("/kombucha");
      }
    );
  }
}

export default new KombuchaController();

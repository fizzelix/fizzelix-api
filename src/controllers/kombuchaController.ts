import mongoose from "mongoose";
import { Request, Response } from "express";
import { Validation } from "../Validation";

import { User } from "../models/users";
import { getKombuchaType } from "../utils/utils";

class KombuchaController {
  public addNewKombucha(req: Request, res: Response) {
    const validation = new Validation();
    const { type, model } = getKombuchaType(req.params.type);

    User.findOne({ email: req.user.email }, (err: any, user: any) => {
      if (err) {
        console.log(err);
        validation.setErrors("Unable to find user. Try again later...", validation.GENERAL);
        return res.status(503).json({ error: validation.errors }); // Service  Unavailable
      }
      model.create(req.body, (err: any, kombucha: any) => {
        if (err) {
          console.log(err);
          validation.setErrors("Unable to create kombucha. Try again later...", validation.GENERAL);
          return res.status(503).json({ errors: validation.errors }); // Service  Unavailable
        }
        user.kombuchas[type].push(kombucha);
        user.save((err: any, user: any) => {
          if (err) {
            console.log(err);
            validation.setErrors("Failed to save kombucha", validation.GENERAL);
            return res.status(503).json({ errors: validation.errors }); // Service  Unavailable
          }
          res.json(kombucha);
        });
      });
    });
  }

  public getKombucha(req: Request, res: Response): void {
    // url looks like this: /kombucha/5c6e10b194bff38119f1f82u
    // populate("user") refers to object key in kombuchaSchema
    Kombucha.findById(req.params.kombuchaId, (err: any, kombucha: mongoose.Document) => {
      if (err) {
        console.log("Failed to get kombucha");
        res.send(err);
      }
      res.status(200).json(kombucha);
    });
  }

  public editKombucha(req: Request, res: Response): void {
    Kombucha.findByIdAndUpdate(req.params.kombuchaId, req.body, (err: any, kombucha: any) => {
      if (err) {
        console.log("Failed to edit kombucha");
        res.send(err);
      }
      res.redirect(`/kombucha/${kombucha._id}`);
    });
  }

  public deleteKombucha(req: Request, res: Response): void {
    Kombucha.findByIdAndDelete(req.params.kombuchaId, (err: any, kombucha: any) => {
      if (err) {
        console.log("Failed to Delete kombucha");
        res.send(err);
      }
      res.redirect("/kombucha");
    });
  }
}

export default new KombuchaController();

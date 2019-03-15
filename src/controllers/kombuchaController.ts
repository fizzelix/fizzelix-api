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

  public getKombucha(req: Request, res: Response) {
    const validation = new Validation();
    const { model } = getKombuchaType(req.params.type);
    const { kombuchaId } = req.params;

    model.findById(kombuchaId, (err: any, kombucha: any) => {
      if (err) {
        console.log(err);
        validation.setErrors("Failed to get kombucha", validation.GENERAL);
        return res.status(503).json({ errors: validation.errors });
      }
      res.json(kombucha);
    });
  }

  public editKombucha(req: Request, res: Response): void {
    const validation = new Validation();
    const { model } = getKombuchaType(req.params.type);
    const { kombuchaId } = req.params;
    const newContent = req.body;

    // 3rd parameter, {new: true}, returns the updated document
    model.findByIdAndUpdate(kombuchaId, newContent, { new: true }, (err: any, kombucha: any) => {
      if (err) {
        console.log(err);
        validation.setErrors("Failed to edit kombucha", validation.GENERAL);
        return res.status(503).json({ errors: validation.errors });
      }
      res.json(kombucha);
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

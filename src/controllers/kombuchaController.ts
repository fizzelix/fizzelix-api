import { Controller } from "./Controller";
import { getKombuchaType } from "../utils/utils";
import { Request, Response } from "express";
import { User } from "../models/users";

class KombuchaController extends Controller {
  constructor() {
    super();
  }

  public addNewKombucha = (req: Request, res: Response) => {
    const { type, model } = getKombuchaType(req.params.type);

    User.findOne({ email: req.user.email }, (err: any, user: any) => {
      if (err) {
        console.log(err);
        this.validation.setErrors(
          "Unable to find user. Try again later...",
          this.validation.GENERAL
        );
        return res.status(503).json({ error: this.validation.errors }); // Service  Unavailable
      }
      model.create(req.body, (err: any, kombucha: any) => {
        if (err) {
          console.log(err);
          this.validation.setErrors(
            "Unable to create kombucha. Try again later...",
            this.validation.GENERAL
          );
          return res.status(503).json({ errors: this.validation.errors }); // Service  Unavailable
        }
        user.kombuchas[type].push(kombucha);
        user.save((err: any) => {
          if (err) {
            console.log(err);
            this.validation.setErrors("Failed to save kombucha", this.validation.GENERAL);
            return res.status(503).json({ errors: this.validation.errors }); // Service  Unavailable
          }
          res.json(kombucha);
        });
      });
    });
  };

  public getKombucha = (req: Request, res: Response) => {
    const { model } = getKombuchaType(req.params.type);
    const { kombuchaId } = req.params;

    model.findById(kombuchaId, (err: any, kombucha: any) => {
      if (err) {
        console.log(err);
        this.validation.setErrors("Failed to get kombucha", this.validation.GENERAL);
        return res.status(503).json({ errors: this.validation.errors });
      }
      res.json(kombucha);
    });
  };

  public editKombucha = (req: Request, res: Response) => {
    const { model } = getKombuchaType(req.params.type);
    const { kombuchaId } = req.params;
    const newContent = req.body;

    // 3rd parameter, {new: true}, returns the updated document
    model.findByIdAndUpdate(kombuchaId, newContent, { new: true }, (err: any, kombucha: any) => {
      if (err) {
        console.log(err);
        this.validation.setErrors("Failed to edit kombucha", this.validation.GENERAL);
        return res.status(503).json({ errors: this.validation.errors });
      }
      res.json(kombucha);
    });
  };

  public deleteKombucha = (req: Request, res: Response) => {
    const { model, type } = getKombuchaType(req.params.type);
    const { kombuchaId } = req.params;

    // delete kombucha from kombucha model
    model.findByIdAndDelete(kombuchaId, (err: any, kombucha: any) => {
      if (err) {
        console.log(err || kombucha === null);
        this.validation.setErrors("Failed to find kombucha to delete", this.validation.GENERAL);
        return res.status(503).json({ errors: this.validation.errors });
      }
      // delete kombucha from user model
      User.findOne({ _id: req.user.id }, (err, user: any) => {
        if (err) {
          console.log("err");
          this.validation.setErrors("Failed to your kombucha", this.validation.GENERAL);
          return res.status(503).json({ errors: this.validation.errors });
        }

        const kombuchaArray = user.kombuchas[type];
        const kombuchaPosition = user.kombuchas[type].indexOf(kombuchaId);

        if (kombuchaPosition !== -1) {
          kombuchaArray.splice(kombuchaPosition, 1);
          user.save();
        }
      });
      return res.json({ success: true });
    });
  };
}

export default new KombuchaController();

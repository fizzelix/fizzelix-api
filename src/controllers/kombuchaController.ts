import { Validation } from "../Validation";
import { getKombuchaType } from "../utils/utils";
import { Request, Response } from "express";
import { User } from "../models/users";

class KombuchaController {
  public addNewKombucha = async (req: Request, res: Response) => {
    const validation = new Validation();
    const { type, model } = getKombuchaType(req.params.type);

    try {
      const user: any = await User.findOne({ email: req.user.email });
      const newKombucha = await model.create(req.body);
      user.kombuchas[type].push(newKombucha);
      await user.save();
      res.json(newKombucha);
    } catch (err) {
      const errorMessage = (err as Error).message;
      validation.setErrors(errorMessage, validation.GENERAL);
      return res.status(503).json({ error: validation.errors }); // Service  Unavailable
    }
  };

  public getKombucha = (req: Request, res: Response) => {
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
  };

  public editKombucha = (req: Request, res: Response) => {
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
  };

  public deleteKombucha = (req: Request, res: Response) => {
    const validation = new Validation();
    const { model, type } = getKombuchaType(req.params.type);
    const { kombuchaId } = req.params;

    // delete kombucha from kombucha model
    model.findByIdAndDelete(kombuchaId, (err: any, kombucha: any) => {
      if (err) {
        console.log(err || kombucha === null);
        validation.setErrors("Failed to find kombucha to delete", validation.GENERAL);
        return res.status(503).json({ errors: validation.errors });
      }
      // delete kombucha from user model
      User.findOne({ _id: req.user.id }, (err, user: any) => {
        if (err) {
          console.log("err");
          validation.setErrors("Failed to your kombucha", validation.GENERAL);
          return res.status(503).json({ errors: validation.errors });
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

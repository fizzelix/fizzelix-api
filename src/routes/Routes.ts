import { Request, Response } from "express";
import KombuchaController from "../controllers/kombuchaController";

class Routes {
  public routes(app: any): void {
    /***
    General routes
    ***/
    app.get("/", (req: Request, res: Response) => {
      res.status(200).send("Fizzelix API");
    });

    /***
      Kombucha Routes
    ***/
    app.get("/kombucha", KombuchaController.getKombuchas);
    app.post("/kombucha", KombuchaController.addNewKombucha);
    app.get("/kombucha/:kombuchaId", KombuchaController.getKombucha);
    app.put("/kombucha/:kombuchaId", KombuchaController.editKombucha);
    app.delete("/kombucha/:kombuchaId", KombuchaController.deleteKombucha);
  }
}

export default new Routes();

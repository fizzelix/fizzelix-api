import { Request, Response } from "express";
import Auth from "../Authentication";
import KombuchaController from "../controllers/kombuchaController";
import UserController from "../controllers/usersController";

class Routes {
  public routes(app: any): void {
    /***
    General routes
    ***/
    app.get("/", (req: Request, res: Response) => {
      res.status(200).send("Fizzelix API");
    });

    app.post("/register", UserController.register);
    app.post("/login", UserController.login);
    app.get("/users/current", Auth.protect(), UserController.getCurrentUser);

    /***
      Kombucha Routes
    ***/
    app.get("/kombucha", KombuchaController.getKombuchas);
    app.post("/kombucha", Auth.protect(), KombuchaController.addNewKombucha);
    app.get("/kombucha/:kombuchaId", KombuchaController.getKombucha);
    app.put(
      "/kombucha/:kombuchaId",
      Auth.protect(),
      KombuchaController.editKombucha
    );
    app.delete(
      "/kombucha/:kombuchaId",
      Auth.protect(),
      KombuchaController.deleteKombucha
    );

    /***
      Users Routes
    ***/
    app.get("/users", UserController.getUsers);
    app.post("/users", Auth.protect(), UserController.addNewUser);
    app.get("/users/:userId", UserController.getUser);
    app.put("/users/:userId", Auth.protect(), UserController.editUser);
    app.delete("/users/:userId", Auth.protect(), UserController.deleteUser);
  }
}

export default new Routes();

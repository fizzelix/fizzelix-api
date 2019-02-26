import { Request, Response } from "express";
import passport from "passport";
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
    app.get(
      "/users/current",
      passport.authenticate("jwt", { session: false }),
      UserController.getCurrentUser
    );

    /***
      Kombucha Routes
    ***/
    app.get("/kombucha", KombuchaController.getKombuchas);
    app.post("/kombucha", KombuchaController.addNewKombucha);
    app.get("/kombucha/:kombuchaId", KombuchaController.getKombucha);
    app.put("/kombucha/:kombuchaId", KombuchaController.editKombucha);
    app.delete("/kombucha/:kombuchaId", KombuchaController.deleteKombucha);

    /***
      Users Routes
    ***/
    app.get("/users", UserController.getUsers);
    app.post("/users", UserController.addNewUser);
    app.get("/users/:userId", UserController.getUser);
    app.put("/users/:userId", UserController.editUser);
    app.delete("/users/:userId", UserController.deleteUser);
  }
}

export default new Routes();

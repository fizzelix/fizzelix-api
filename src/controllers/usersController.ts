declare module "mongoose" {
  interface Document {
    password: string;
  }
}

import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { User } from "../models/users";

import Validation from "../Validation";

const { validateRegistration, validateLogin } = Validation;

class UsersController {
  public register(req: Request, res: Response) {
    const { errors, isValid } = validateRegistration(
      req.body.email,
      req.body.password
    );

    if (!isValid) {
      return res.status(400).json({ errors }); // Bad Request
    }

    User.findOne({ email: req.body.email }, (err: any, user: any) => {
      if (err) {
        console.log(err);
        errors.general = "Unexpected Error. Try again";
        return res.status(503).json({ errors }); // Service Unavailable
      }
      if (user) {
        console.log("Email already exists");
        errors.email = "Email already exists";
        return res.status(409).json({ errors }); // Conflict
      }

      const newUser = new User(req.body);

      bcrypt.hash(newUser.password, 10, (err: Error, hash: string) => {
        if (err) {
          console.log(err, "Failed to hash password");
          errors.password = "Invalid Password";
          return res.status(503).json({ errors }); // Service Unavailable
        }

        newUser.password = hash;
        newUser.save((err: any, user: any) => {
          if (err) {
            console.log("Failed to save user");
            errors.general = "Failed to register. Please try again";
            return res.status(503).json({ errors }); // Service Unavailable
          }
          return res.json(user);
        });
      });
    });
  }

  public login(req: Request, res: Response) {
    const { errors, isValid } = validateLogin(
      req.body.email,
      req.body.password
    );

    if (!isValid) {
      return res.status(400).json({ errors }); // Bad Request
    }

    User.findOne({ email: req.body.email }, (err: any, user: any) => {
      if (err) {
        console.log(err);
        errors.general = "Unexpected Error. Please try again.";
        return res.status(503).json({ errors }); // Service Unavailable
      }
      if (!user) {
        console.log("Failed to find user");
        errors.general = "Failed to find user";
        return res.status(404).json({ errors }); // Not Found
      }

      bcrypt.compare(
        req.body.password,
        user.password,
        (err: any, isMatch: boolean) => {
          if (err) {
            console.log(err);
            errors.general = "Unexpected Error. Please try again.";
            return res.status(503).json({ errors }); // Service Unavailable
          }
          if (isMatch) {
            const payload = { id: user._id };
            if (process.env.JWT_SECRET !== undefined) {
              jwt.sign(
                payload,
                process.env.JWT_SECRET,
                { expiresIn: 1200 }, // 20 min
                (err: any, token: any) => {
                  if (err) {
                    console.log(err);
                    errors.general = "Failed to create token";
                    return res.status(503).json({ errors }); // Service Unavailable
                  }
                  res.json({ success: true, token: `Bearer ${token}` });
                }
              );
            }
          } else {
            console.log("Incorrect Password");
            errors.general = "Incorrect Password";
            return res.status(409).json({ errors }); // Conflict
          }
        }
      );
    });
  }

  public getCurrentUser(req: Request, res: Response) {
    const errors: {
      general?: string;
    } = {};

    let { authorization } = req.headers;

    if (authorization && process.env.JWT_SECRET !== undefined) {
      authorization = authorization.replace(/^Bearer\s/, ""); // Remove Bearer in JWT

      jwt.verify(
        authorization,
        process.env.JWT_SECRET,
        (err: jwt.VerifyErrors) => {
          if (err) {
            console.log(err);
            errors.general = "Unable to verify user";
            return res.status(503).json(errors);
          }
          // data returned from the database
          const { email, kombuchas } = req.user;
          res.json({ email, kombuchas });
        }
      );
    }
  }

  public addNewUser(req: Request, res: Response) {
    const newUser = new User(req.body);

    newUser.save((err: any, user: any) => {
      if (err) {
        console.log("Failed to save user");
        return res.json({ error: "Failed to save user" });
      }
      res.json({ message: `successfully saved user ${user.username}` });
    });
  }

  public editUser(req: Request, res: Response) {
    User.findByIdAndUpdate(
      req.params.userId,
      req.body,
      (err: any, user: any) => {
        if (err) {
          console.log("Failed to edit user");
          return res.json({ error: "Failed to edit user" });
        }
        res.json({ message: `Successfully updated ${user.username}` });
      }
    );
  }

  public deleteUser(req: Request, res: Response) {
    User.findByIdAndDelete(req.params.userId, (err: any, user: any) => {
      if (err) {
        console.log(`Error deleting ${user.username}`);
        return res.json({ error: "Error deleting user" });
      }
      res.json({ message: `Successfully deleted ${user.username}` });
    });
  }
}

export default new UsersController();

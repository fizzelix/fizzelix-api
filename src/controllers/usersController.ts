import { Request, Response } from "express";
declare module "express" {
  interface Request {
    user: any;
  }
}

import mongoose from "mongoose";
declare module "mongoose" {
  interface Document {
    password: string;
  }
}

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { User } from "../models/users";

class UsersController {
  public register(req: Request, res: Response): void {
    User.findOne({ email: req.body.email }, (err: any, user: any) => {
      if (err) {
        console.log(err);
        return res.json({ error: "Unexpected Error. Try again" });
      }
      if (user) {
        console.log("Email already exists");
        return res.status(404).json({ error: "Email already exists" });
      }

      const newUser = new User(req.body);

      bcrypt.hash(newUser.password, 10, (err: Error, hash: string) => {
        if (err) {
          console.log(err, "Failed to hash password");
          return res.json({ error: "Invalid password" });
        }
        newUser.password = hash;
        newUser.save((err: any, user: any) => {
          if (err) {
            console.log("Failed to save user");
            return res.json({
              error: `Failed to register. Please try again`
            });
          }
          return res.json(user);
        });
      });
    });
  }

  public login(req: Request, res: Response): void {
    User.findOne({ email: req.body.email }, (err: any, user: any) => {
      if (!user) {
        console.log("Failed to find user");
        return res.status(404).json({ error: "User not found" });
      }

      bcrypt.compare(
        req.body.password,
        user.password,
        (err: any, isMatch: boolean) => {
          if (err) return console.log("Failed to compare passwords");
          if (isMatch) {
            const payload = { id: user._id };
            if (process.env.JWT_SECRET !== undefined) {
              jwt.sign(
                payload,
                process.env.JWT_SECRET,
                { expiresIn: 1200 },
                (err: any, token: any) => {
                  if (err) return console.log("Failed to create token");
                  res.json({ success: true, token: `Bearer ${token}` });
                }
              );
            }
          } else {
            res.status(400).json({ error: "Incorrect Password" });
          }
        }
      );
    });
  }

  public getCurrentUser(req: Request, res: Response): void {
    let { authorization } = req.headers;
    if (authorization && process.env.JWT_SECRET !== undefined) {
      authorization = authorization.replace(/^Bearer\s/, "");

      jwt.verify(
        authorization,
        process.env.JWT_SECRET,
        (err: jwt.VerifyErrors) => {
          if (err) {
            console.log(err);
            return res.json({ error: "Unable to verify user" });
          }
          const { email, kombuchas } = req.user;
          res.json({ email, kombuchas });
        }
      );
    }
  }

  public addNewUser(req: Request, res: Response): void {
    const newUser = new User(req.body);

    newUser.save((err: any, user: any) => {
      if (err) {
        console.log("Failed to save user");
        return res.json({ error: "Failed to save user" });
      }
      res.json({ message: `successfully saved user ${user.username}` });
    });
  }

  public editUser(req: Request, res: Response): void {
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

  public deleteUser(req: Request, res: Response): void {
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

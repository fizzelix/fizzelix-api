import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { User } from "../models/users";
import { Validation } from "../Validation";

class UsersController {
  public register(req: Request, res: Response) {
    const validation = new Validation();
    validation.validateRegistration(req.body.email, req.body.password);

    if (!validation.isValid) {
      return res.status(400).json({ errors: validation.errors }); // Bad Request
    }

    User.findOne({ email: req.body.email }, (err: any, user: any) => {
      if (err) {
        console.log(err);
        validation.setErrors("Unexpected Error. Try again", "general");
        return res.status(503).json({ errors: validation.errors }); // Service Unavailable
      }
      if (user) {
        validation.setErrors("Email already exists", "email");
        return res.status(409).json({ errors: validation.errors }); // Conflict
      }

      const newUser = new User(req.body);

      bcrypt.hash(newUser.password, 10, (err: Error, hash: string) => {
        if (err) {
          console.log(err);
          validation.setErrors("Invalid Password", "password");
          return res.status(503).json({ errors: validation.errors }); // Service Unavailable
        }

        newUser.password = hash;
        newUser.save((err: any, user: any) => {
          if (err) {
            console.log(err);
            validation.setErrors("Failed to register. Please try again", "general");
            return res.status(503).json({ errors: validation.errors }); // Service Unavailable
          }
          return res.json(user);
        });
      });
    });
  }

  public login(req: Request, res: Response) {
    const validation = new Validation();
    validation.validateLogin(req.body.email, req.body.password);

    if (!validation.isValid) {
      return res.status(400).json({ errors: validation.errors }); // Bad Request
    }

    User.findOne({ email: req.body.email }, (err: any, user: any) => {
      if (err) {
        console.log(err);
        validation.setErrors("Unexpected Error. Please try again", validation.GENERAL);
        return res.status(503).json({ errors: validation.errors }); // Service Unavailable
      }
      if (!user) {
        validation.setErrors("Failed to find user", validation.GENERAL);
        return res.status(404).json({ errors: validation.errors }); // Not Found
      }

      bcrypt.compare(req.body.password, user.password, (err: any, isMatch: boolean) => {
        if (err) {
          console.log(err);
          validation.setErrors("Unexpected Error. Please try again", validation.GENERAL);
          return res.status(503).json({ errors: validation.errors }); // Service Unavailable
        }
        if (isMatch) {
          const payload = { id: user._id };
          if (process.env.JWT_SECRET !== undefined) {
            jwt.sign(
              payload,
              process.env.JWT_SECRET,
              { expiresIn: "3 days" },
              (err: any, token: string) => {
                if (err) {
                  console.log(err);
                  validation.setErrors("Unexpected Error. Please try again.", validation.GENERAL);
                  return res.status(503).json({ errors: validation.errors }); // Service Unavailable
                }
                res.json({ success: true, token: `Bearer ${token}` });
              }
            );
          }
        } else {
          validation.setErrors("Incorrect Password", validation.PASSWORD);
          return res.status(409).json({ errors: validation.errors }); // Conflict
        }
      });
    });
  }

  public getCurrentUser(req: Request, res: Response) {
    const validation = new Validation();

    let { authorization } = req.headers;
    if (authorization && process.env.JWT_SECRET !== undefined) {
      authorization = authorization.replace(/^Bearer\s/, ""); // Remove Bearer in JWT

      jwt.verify(authorization, process.env.JWT_SECRET, (err: jwt.VerifyErrors) => {
        if (err) {
          console.log(err);
          validation.setErrors("Unable to verify user", validation.GENERAL);
          return res.status(503).json({ errors: validation.errors });
        }
        // data returned from the database
        User.findById(req.user.id)
          .populate("kombuchas.primary")
          .populate("kombuchas.secondary")
          .exec((error: any, userData: any) => {
            if (error) return console.log(error);
            const data = {
              email: userData.email,
              kombuchas: userData.kombuchas,
            };
            res.json(data);
          });
      });
    }
  }

  public editUser(req: Request, res: Response) {
    const validation = new Validation();

    User.findByIdAndUpdate(req.params.userId, req.body, (err: any, user: any) => {
      if (err) {
        console.log(err);
        validation.setErrors("Failed to edit user", validation.GENERAL);
        return res.status(503).json({ errors: validation.errors });
      }
      res.json({
        success: `Successfully updated user!`,
        user: user,
      });
    });
  }

  public deleteUser(req: Request, res: Response) {
    const validation = new Validation();

    User.findByIdAndDelete(req.params.userId, (err: any, user: any) => {
      if (err) {
        console.log(err);
        validation.setErrors("Error deleting user", validation.GENERAL);
        return res.status(503).json({ errors: validation.errors });
      }
      res.json({ success: `Successfully deleted user` });
    });
  }
}

export default new UsersController();

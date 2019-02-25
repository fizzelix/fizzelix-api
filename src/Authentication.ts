import passport from "passport";
import { Strategy, ExtractJwt, StrategyOptions } from "passport-jwt";

import { User } from "./models/users";

class Authentication {
  constructor() {
    this.config();
  }

  private config(): void {
    console.log("passport authentication configured");

    const opt: StrategyOptions = {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET
    };

    passport.use(
      new Strategy(opt, (jwtPayload: any, done: any) => {
        const { id } = jwtPayload;
        User.findById(id, (err: any, user: any) => {
          if (err) return done(err, null);
          if (user) {
            return done(null, user);
          } else {
            return done(null, false);
          }
        });
      })
    );
  }

  public initialize(): any {
    console.log("passport initialized");
    return passport.initialize();
  }
}

export default new Authentication();

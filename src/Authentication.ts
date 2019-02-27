import passport from "passport";
import { Strategy, ExtractJwt, StrategyOptions } from "passport-jwt";

import { User } from "./models/users";

class Authentication {
  constructor() {
    this.config();
  }

  private config(): void {
    const opt: StrategyOptions = {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET
    };

    passport.use(
      new Strategy(opt, (payload: any, done: any) => {
        const { id } = payload;
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
    return passport.initialize();
  }

  public protect(): any {
    return passport.authenticate("jwt", { session: false });
  }
}

export default new Authentication();

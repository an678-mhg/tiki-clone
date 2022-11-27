import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

export const configGoogleSignIn = () => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID as string,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        callbackURL: "/api/auth/google/callback",
      },
      function (_: string, __: string, profile: any, cb: Function) {
        cb(null, profile);
      }
    )
  );
};

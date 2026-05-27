import { OAuth2Client } from "google-auth-library";
import { env } from "../env";

export const googleOAuth2Client = new OAuth2Client({
  client_id: env.GOOGLE_CLIENT_ID,
  client_secret: env.GOOGLE_CLIENT_SECRET,
  redirectUri: env.GOOGLE_OAUTH_REDIRECT_URI,
});

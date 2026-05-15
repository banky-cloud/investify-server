import oauth2Client from "../config/googleOAuth.js";
import GoogleToken from "../models/googleToken.model.js";
import { google } from "googleapis";
export const googleLogin = async (req, res) => {
  try {
    // await GoogleToken.deleteMany()
  
    const url = oauth2Client.generateAuthUrl({
      access_type: "offline",

      prompt: "consent",

   scope: [
  "https://mail.google.com/",
  "https://www.googleapis.com/auth/userinfo.email",
],
    });

    return res.redirect(url);

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Google auth failed",
    });
  }
};

export const googleCallback = async (req, res) => {
  try {
    const code = req.query.code;

    if (!code) {
      return res.status(400).json({
        message: "Authorization code missing",
      });
    }

    const { tokens } = await oauth2Client.getToken(code);

    oauth2Client.setCredentials(tokens);

    const oauth2 = google.oauth2({
      auth: oauth2Client,
      version: "v2",
    });

    const userInfo = await oauth2.userinfo.get();

    const email = userInfo.data.email;

    if (!tokens.refresh_token) {
      return res.status(400).json({
        message:
          "No refresh token returned. Revoke app access and try again.",
      });
    }

    await GoogleToken.findOneAndUpdate(
      { email },

      {
        email,
        refreshToken: tokens.refresh_token,
      },

      {
        upsert: true,
        new: true,
      }
    );

    return res.status(200).json({
      message: "Google authentication successful",
      email,
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Google callback failed",
    });
  }
};
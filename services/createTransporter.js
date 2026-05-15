import nodemailer from "nodemailer";
import oauth2Client from "../config/googleOAuth.js";
import GoogleToken from "../models/googleToken.model.js";

const createTransporter = async (email) => {
  const tokenDoc = await GoogleToken.findOne({
    email,
  });

  if (!tokenDoc) {
    throw new Error(
      "No Google refresh token found"
    );
  }

  oauth2Client.setCredentials({
    refresh_token: tokenDoc.refreshToken,
  });

  const accessToken =
    await oauth2Client.getAccessToken();
    console.log({accessToken})

  const transporter =
    nodemailer.createTransport({
      service: "gmail",

      auth: {
        type: "OAuth2",

        user: email,

        clientId:
          process.env.GOOGLE_CLIENT_ID,

        clientSecret:
          process.env.GOOGLE_CLIENT_SECRET,

        refreshToken:
          tokenDoc.refreshToken,

        accessToken:
          accessToken.token,
      },
    });

  return transporter;
};

export default createTransporter;
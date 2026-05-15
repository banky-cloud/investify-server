import { Resend } from "resend";
import {config} from "dotenv"
config()
const resend = new Resend(
  process.env.RESEND_API_KEY
);

export const sendMail = async ({
  to,
  subject,
  html,
}) => {
  try {
    const response = await resend.emails.send({
      from: "Investify <onboarding@resend.dev>",
      to,
      subject,
      html,
    });

    return response;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export default sendMail;
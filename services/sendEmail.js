import createTransporter from "./createTransporter.js";

const sendEmail = async ({
  to,
  subject,
  html,
}) => {
  const transporter =
    await createTransporter("melissa.investify@gmail.com");

  const info =
    await transporter.sendMail({
      from: `"Investify" <melissa.investify@gmmail.com>`,
      to,
      subject,
      html,
    });

  return info;
};

export default sendEmail;
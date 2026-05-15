import sendEmail from "../services/sendEmail.js";

export const sendTestEmail = async (
  req,
  res
) => {
  try {
    await sendEmail({
      from:
        "melissa.investify@gmail.com",

      to:
        "chigbustephennamdi@gmail.com",

      subject:
        "Investify Test Email",

      html: `
        <div
          style="
            font-family: Arial;
            padding: 20px;
          "
        >
          <h1>
            Hello 👋
          </h1>

          <p>
            Your Gmail API +
            Nodemailer setup is working.
          </p>

          <button
            style="
              background: blue;
              color: white;
              border: none;
              padding: 12px 20px;
              border-radius: 6px;
            "
          >
            Investify
          </button>
        </div>
      `,
    });

    return res.status(200).json({
      message:
        "Email sent successfully",
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message:
        "Failed to send email",

      error: error.message,
    });
  }
};
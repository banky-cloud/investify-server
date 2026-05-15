const notificationTemplate = ({
  name,
  subject,
  message,
}) => {
  return {
    subject,

    html: `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        />
        <title>${subject}</title>
      </head>

      <body
        style="
          margin: 0;
          padding: 0;
          background-color: #121212;
          font-family: Arial, sans-serif;
          color: white;
        "
      >
        <table
          width="100%"
          cellpadding="0"
          cellspacing="0"
          style="padding: 40px 15px;"
        >
          <tr>
            <td align="center">
              <table
                width="100%"
                cellpadding="0"
                cellspacing="0"
                style="
                  max-width: 600px;
                  background-color: #1e1e1e;
                  border-radius: 12px;
                  overflow: hidden;
                  border: 1px solid #2e2e2e;
                "
              >
                <!-- HEADER -->
                <tr>
                  <td
                    align="center"
                    style="
                      background-color: #198754;
                      padding: 25px;
                      font-size: 28px;
                      font-weight: bold;
                      color: white;
                    "
                  >
                    Investify
                  </td>
                </tr>

                <!-- CONTENT -->
                <tr>
                  <td style="padding: 40px 30px;">
                    <h2
                      style="
                        margin-top: 0;
                        color: white;
                      "
                    >
                      Hello ${name},
                    </h2>

                    <h3
                      style="
                        color: #198754;
                        margin-bottom: 20px;
                      "
                    >
                      ${subject}
                    </h3>

                    <div
                      style="
                        color: #cccccc;
                        font-size: 16px;
                        line-height: 1.8;
                      "
                    >
                      ${message}
                    </div>

                    <p
                      style="
                        margin-top: 35px;
                        color: #aaaaaa;
                        font-size: 14px;
                        line-height: 1.6;
                      "
                    >
                      Thank you for choosing Investify.
                    </p>
                  </td>
                </tr>

                <!-- FOOTER -->
                <tr>
                  <td
                    align="center"
                    style="
                      padding: 20px;
                      background-color: #181818;
                      color: #777777;
                      font-size: 13px;
                    "
                  >
                    © ${new Date().getFullYear()} Investify.
                    All rights reserved.
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
    `,
  };
};

export default notificationTemplate;
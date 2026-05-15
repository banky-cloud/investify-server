export const welcomeTemplate=`
<div style="
  margin:0;
  padding:0;
  background-color:#f4f7fb;
  font-family:Arial, Helvetica, sans-serif;
">
  <table width="100%" cellpadding="0" cellspacing="0" border="0">
    <tr>
      <td align="center" style="padding:40px 20px;">

        <table width="600" cellpadding="0" cellspacing="0" border="0" style="
          background:#ffffff;
          border-radius:16px;
          overflow:hidden;
          box-shadow:0 4px 20px rgba(0,0,0,0.08);
        ">

          <!-- Header -->
          <tr>
            <td style="
              background:linear-gradient(135deg,#0f172a,#2563eb);
              padding:40px 30px;
              text-align:center;
            ">
              <h1 style="
                color:white;
                margin:0;
                font-size:32px;
                letter-spacing:1px;
              ">
                Investify
              </h1>

              <p style="
                color:#dbeafe;
                margin-top:10px;
                font-size:16px;
              ">
                Smart Investing Starts Here
              </p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:50px 40px; color:#1e293b;">

              <h2 style="
                margin-top:0;
                font-size:28px;
                color:#0f172a;
              ">
                Welcome to Investify 🎉
              </h2>

              <p style="
                font-size:16px;
                line-height:1.8;
                color:#475569;
              ">
                Hi {{name}},
              </p>

              <p style="
                font-size:16px;
                line-height:1.8;
                color:#475569;
              ">
                Thank you for joining Investify. We're excited to help you
                grow your financial future with a smarter investing experience.
              </p>

              <p style="
                font-size:16px;
                line-height:1.8;
                color:#475569;
              ">
                To get started, please verify your email address by clicking
                the button below.
              </p>

              <!-- Button -->
              <table cellpadding="0" cellspacing="0" border="0" align="center" style="margin:35px auto;">
                <tr>
                  <td align="center" bgcolor="#2563eb" style="
                    border-radius:10px;
                  ">
                    <a
                      href="{{verifyLink}}"
                      target="_blank"
                      style="
                        display:inline-block;
                        padding:16px 34px;
                        color:white;
                        text-decoration:none;
                        font-size:16px;
                        font-weight:bold;
                        border-radius:10px;
                      "
                    >
                      Verify Email
                    </a>
                  </td>
                </tr>
              </table>

              <p style="
                font-size:14px;
                line-height:1.8;
                color:#64748b;
                margin-top:30px;
              ">
                If you did not create an account with Investify,
                you can safely ignore this email.
              </p>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="
              background:#f8fafc;
              padding:25px;
              text-align:center;
              border-top:1px solid #e2e8f0;
            ">
              <p style="
                margin:0;
                color:#94a3b8;
                font-size:13px;
              ">
                © 2026 Investify. All rights reserved.
              </p>
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>
</div>

`
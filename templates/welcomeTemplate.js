const welcomeEmailTemplate = (
  userId,
  name
) => {
  const verificationLink =
    `http://localhost:3333/users/verify/${userId}`;

  return `
    <div
      style="
        font-family: Arial, sans-serif;
        max-width: 600px;
        margin: 0 auto;
        padding: 40px 20px;
        background: #f9fafb;
      "
    >
      <div
        style="
          background: white;
          padding: 40px;
          border-radius: 12px;
          box-shadow:
            0 2px 10px rgba(0,0,0,0.08);
        "
      >
        <h1
          style="
            color: #111827;
            margin-bottom: 20px;
          "
        >
          Welcome to Investify 👋
        </h1>

        <p
          style="
            font-size: 16px;
            color: #374151;
            line-height: 1.7;
          "
        >
          Hello ${name},
        </p>

        <p
          style="
            font-size: 16px;
            color: #374151;
            line-height: 1.7;
          "
        >
          We're excited to have you join
          Investify.
        </p>

        <p
          style="
            font-size: 16px;
            color: #374151;
            line-height: 1.7;
          "
        >
          Please verify your email address
          to activate your account.
        </p>

        <div
          style="
            margin: 35px 0;
            text-align: center;
          "
        >
          <a
            href="${verificationLink}"
            style="
              display: inline-block;
              background: #2563eb;
              color: white;
              text-decoration: none;
              padding: 14px 28px;
              border-radius: 8px;
              font-size: 16px;
              font-weight: bold;
            "
          >
            Verify Email
          </a>
        </div>

        <p
          style="
            font-size: 14px;
            color: #6b7280;
            line-height: 1.7;
          "
        >
          If the button above doesn't work,
          copy and paste this link into your
          browser:
        </p>

        <p
          style="
            font-size: 14px;
            word-break: break-all;
            color: #2563eb;
          "
        >
          ${verificationLink}
        </p>

        <hr
          style="
            margin: 30px 0;
            border: none;
            border-top: 1px solid #e5e7eb;
          "
        />

        <p
          style="
            font-size: 13px;
            color: #9ca3af;
            text-align: center;
          "
        >
          © 2026 Investify. All rights reserved.
        </p>
      </div>
    </div>
  `;
};

export default welcomeEmailTemplate;
const OTPMailTemp = (otp, fullName) => {
  return `
  <div style="margin:0; padding:40px 0; background:#f4f7fb; font-family:Arial, sans-serif;">

    <table width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td align="center">

          <!-- Main Card -->
          <table width="450" cellpadding="0" cellspacing="0" 
            style="background:#ffffff; border-radius:18px; overflow:hidden; box-shadow:0 8px 25px rgba(0,0,0,0.08);">

            <!-- Header -->
            <tr>
              <td 
                style="background:#111827; padding:35px 20px; text-align:center;">

                <div 
                  style="width:70px; height:70px; background:#ffffff20; border-radius:50%; margin:auto; line-height:70px; font-size:32px;">
                  🔐
                </div>

                <h1 style="margin:18px 0 8px; color:#ffffff; font-size:28px;">
                  OTP Verification
                </h1>

                <p style="margin:0; color:#d1d5db; font-size:14px;">
                  Secure access to your account
                </p>

              </td>
            </tr>

            <!-- Body -->
            <tr>
              <td style="padding:40px 35px; color:#374151;">

                <h2 style="margin-top:0; font-size:20px; color:#111827;">
                  Hello, ${fullName || "User"} 👋
                </h2>

                <p style="font-size:15px; line-height:1.8; margin-bottom:25px;">
                  Use the verification code below to complete your sign in process.
                </p>

                <!-- OTP Box -->
                <div style="text-align:center; margin:35px 0;">

                  <div 
                    style="display:inline-block; background:#2563eb; color:#ffffff; padding:18px 40px; border-radius:12px; font-size:34px; font-weight:bold; letter-spacing:10px;">

                    ${otp}

                  </div>

                </div>

                <!-- Info Box -->
                <div 
                  style="background:#f9fafb; border-left:4px solid #2563eb; padding:15px 18px; border-radius:8px; margin-top:25px;">

                  <p style="margin:0; font-size:14px; line-height:1.8; color:#4b5563;">
                    ⏳ This OTP will expire in <b>5 minutes</b> <br>
                    🔒 Do not share this code with anyone
                  </p>

                </div>

                <!-- Button -->
                <div style="text-align:center; margin-top:35px;">

                  <a href="#"
                    style="background:#111827; color:#ffffff; text-decoration:none; padding:14px 32px; border-radius:10px; display:inline-block; font-size:15px; font-weight:bold;">

                    Verify Account

                  </a>

                </div>

              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td 
                style="padding:25px; text-align:center; background:#f9fafb; font-size:12px; color:#6b7280; line-height:1.7;">

                If you didn’t request this email, you can safely ignore it.
                <br><br>

                © 2026 Your Company. All rights reserved.

              </td>
            </tr>

          </table>

        </td>
      </tr>
    </table>

  </div>
  `;
};

module.exports = { OTPMailTemp };
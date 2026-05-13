const OTPMailTemp = (otp, fullName) => {
  return `
  <div style="margin:0; padding:40px 0; background:#f0fdf4; font-family:Arial, sans-serif;">

    <table width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td align="center">

          <table width="450" cellpadding="0" cellspacing="0" 
            style="background:#ffffff; border-radius:14px; overflow:hidden; border:1px solid #dcfce7;">

            <tr>
              <td style="background:#16a34a; padding:28px 20px; text-align:center;">

                <div 
                  style="width:60px; height:60px; background:#ffffff25; border-radius:50%; margin:auto; line-height:60px; font-size:28px;">
                  🔐
                </div>

                <h1 style="margin:16px 0 6px; color:#ffffff; font-size:24px;">
                  OTP Verification
                </h1>

                <p style="margin:0; color:#dcfce7; font-size:14px;">
                  Secure access to your account
                </p>

              </td>
            </tr>

            <tr>
              <td style="padding:35px 30px; color:#374151;">

                <h2 style="margin-top:0; font-size:20px; color:#14532d;">
                  Hello, ${fullName || "User"} 👋
                </h2>

                <p style="font-size:15px; line-height:1.7; margin-bottom:25px;">
                  Use the verification code below to complete your sign in process.
                </p>

                <div style="text-align:center; margin:30px 0;">

                  <div 
                    style="display:inline-block; background:#16a34a; color:#ffffff; padding:16px 36px; border-radius:10px; font-size:32px; font-weight:bold; letter-spacing:10px;">
                    ${otp}
                  </div>

                </div>

                <div 
                  style="background:#f0fdf4; border-left:4px solid #16a34a; padding:14px 16px; border-radius:8px; margin-top:25px;">

                  <p style="margin:0; font-size:14px; line-height:1.8; color:#166534;">
                    ⏳ This OTP will expire in <b>5 minutes</b> <br>
                    🔒 Do not share this code with anyone
                  </p>

                </div>

              </td>
            </tr>

            <tr>
              <td 
                style="padding:22px; text-align:center; background:#f9fafb; font-size:12px; color:#6b7280; line-height:1.7;">

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
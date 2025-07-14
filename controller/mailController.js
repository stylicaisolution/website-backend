import nodemailer from "nodemailer";
import dotenv from "dotenv"
import OTP from "../models/OTP.js";

dotenv.config()


const transporter = nodemailer.createTransport({
  host: "smtp.hostinger.com", // Replace with your SES SMTP endpoint
  port: 587, // For secure connection
  secure: false, // Use TLS
  auth: {
    user: "info@stylic.ai", // SES SMTP username
    pass: 'Har@#0401', // SES SMTP password
  },
  tls: {
    rejectUnauthorized: true,
  },
});

// Email options remain the same

export const sendMail = async (req, res, next) => {
  try {
    const mailOptions = {
      from: process.env.USER_MAIL, // Must be a verified email in Amazon SES
      to: req.body.email,
      subject: "Connect With Stylic",
      text: "This is a test email sent using Amazon SES with Nodemailer!",
      html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Stylic Newsletter</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, Helvetica, sans-serif; line-height: 1.6; color: #333333; background-color: #f4f4f4;">
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f4f4f4;">
    <tr style="background-color: #f4f4f4;">
      <td align="center" style="padding: 20px 0;">
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" style="max-width: 600px; background-color: #ffffff; border-radius: 10px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); overflow: hidden;">
          
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #1B345C 0%, #2c5aa0 100%); background-color: #1B345C; padding: 40px 30px; text-align: center;">
              <img src="https://stylic.ai/assets/stylic-logo-1-BQOP5sjr.png" alt="Stylic AI Logo" style="width: 120px; height: auto; margin-bottom: 20px; filter: brightness(0) invert(1);">
              <h1 style="color: #ffffff; font-size: 28px; font-weight: 700; margin: 0; text-shadow: 0 2px 4px rgba(0,0,0,0.3);">Exciting Product Update from Stylic AI</h1>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 40px 30px;">
              
              <!-- Greeting -->
              <p style="font-size: 18px; margin-bottom: 10px; color: #34495e; font-weight: bold;">Hi there!</p>
              <p style="font-size: 16px; margin-bottom: 30px; color: #555555;">We hope this message finds you well! We're excited to bring you the latest updates and offers from Stylic AI.</p>
              
              <!-- Product Section -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f8f9fa; border-radius: 10px; margin-bottom: 30px;">
                <tr>
                  <td style="padding: 30px;">
                    <h2 style="color: #1B345C; font-size: 24px; margin: 0 0 15px 0; font-weight: 700;">AI Photoshoot (Models without limit)</h2>
                    <div style="width: 60px; height: 3px; background-color: #1B345C; margin-bottom: 20px; border-radius: 2px;"></div>
                    <p style="color: #555555; margin-bottom: 25px; line-height: 1.7;">At Stylic.ai, we are redefining fashion photography through the power of AI. Model photoshoots are expensive, time-consuming, and often restrictive. Our cutting-edge AI technology allows fashion brands, e-commerce stores, and garment manufacturers to generate high-quality, photorealistic model images without the need for physical photoshoots.</p>
                    <a href="https://stylic.ai/contact-us" style="display: inline-block; background-color: #1B345C; color: #ffffff; padding: 15px 30px; text-decoration: none; border-radius: 25px; font-weight: 600; font-size: 16px;">Connect Now</a>
                  </td>
                </tr>
              </table>
              
              <!-- Special Offer -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #ff6b6b; border-radius: 10px; margin-bottom: 30px;">
                <tr>
                  <td style="padding: 25px; text-align: center; color: #ffffff;">
                    <h3 style="font-size: 22px; margin: 0 0 15px 0; font-weight: 700;">🎉 Special Offer</h3>
                    <p style="margin: 0 0 15px 0; font-size: 16px;">For a limited time, enjoy <strong>5% off</strong> your next purchase with promo code:</p>
                    <div style="background-color: rgba(255,255,255,0.2); padding: 10px 20px; border-radius: 25px; display: inline-block; font-weight: bold; margin: 10px 0; border: 2px solid rgba(255,255,255,0.3); font-size: 18px;">STY78L23C</div>
                    <p style="margin: 10px 0 0 0; font-size: 16px;">Use at checkout to unlock your savings!</p>
                  </td>
                </tr>
              </table>
              
              <!-- Social Media -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-bottom: 30px;">
                <tr>
                  <td style="text-align: center;">
                    <p style="font-size: 16px; margin-bottom: 20px; color: #555555; font-weight: bold;">Stay Connected:</p>
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin: 0 auto;">
                      <tr>
                        <td style="padding: 0 10px;">
                          <a href="https://www.facebook.com/stylicai" style="color: #1B345C; text-decoration: none; padding: 10px 20px; border: 2px solid #1B345C; border-radius: 25px; font-weight: 600; display: inline-block;">Facebook</a>
                        </td>
                        <td style="padding: 0 10px;">
                          <a href="https://www.instagram.com/stylicai/" style="color: #1B345C; text-decoration: none; padding: 10px 20px; border: 2px solid #1B345C; border-radius: 25px; font-weight: 600; display: inline-block;">Instagram</a>
                        </td>
                        <td style="padding: 0 10px;">
                          <a href="https://www.linkedin.com/company/stylicai/" style="color: #1B345C; text-decoration: none; padding: 10px 20px; border: 2px solid #1B345C; border-radius: 25px; font-weight: 600; display: inline-block;">LinkedIn</a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
              
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #34495e; color: #ffffff; text-align: center; padding: 30px;">
              <p style="margin: 0 0 15px 0; opacity: 0.9; font-size: 14px;">Thank you for being part of the Stylic family! We look forward to continuing to provide you with top-notch products.</p>
              <p style="margin: 20px 0 0 0; font-style: italic; opacity: 0.8; font-size: 14px;"><strong>Best regards,</strong><br>The Stylic Team</p>
            </td>
          </tr>
          
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`,
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.error("Error:", error);
      }
    });

    res.status(200).json("mail sended.")
  } catch (err) {
    next(err);
  }
};



export const sendOtpMail = async (req, res, next) => {
  try {
    const { email } = req.body

    if (!email) return res.status(400).json({ message: "Email is required." })

    const otp = Math.floor(1000 + Math.random() * 9000)

    await OTP.findOneAndUpdate({ email }, { otp, createdAt: Date.now() },
      { upsert: true, new: true })

    const mailOption = {
      from: process.env.USER_MAIL, // Must be a verified email in Amazon SES
      to: req.body.email,
      subject: "Connect With Stylic",
      text: "This is a test email sent using Amazon SES with Nodemailer!",
      html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>OTP Verification</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, Helvetica, sans-serif; line-height: 1.6; color: #333333; background-color: #f4f4f4;">
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f4f4f4;">
    <tr>
      <td align="center" style="padding: 20px 0;">
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" style="max-width: 600px; background-color: #ffffff; border-radius: 10px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); overflow: hidden;">
          
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #1B345C 0%, #2c5aa0 100%); background-color: #1B345C; padding: 40px 30px; text-align: center;">
              <img src="https://stylic.ai/assets/stylic-logo-1-BQOP5sjr.png" alt="Stylic AI Logo" style="width: 120px; height: auto; margin-bottom: 20px; filter: brightness(0) invert(1);">
              <h1 style="color: #ffffff; font-size: 28px; font-weight: 700; margin: 0; text-shadow: 0 2px 4px rgba(0,0,0,0.3);">🔐 OTP Verification</h1>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 40px 30px; text-align: center;">
              
              <!-- OTP Section -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f8f9fa; border-radius: 10px; margin-bottom: 30px;">
                <tr>
                  <td style="padding: 30px;">
                    <p style="font-size: 18px; color: #555555; margin: 0 0 20px 0; text-align: left;"><strong>Your One-Time Password (OTP) for verification is:</strong></p>
                    
                    <div style="text-align: center; margin: 20px 0;">
                      <div style="background-color: #1B345C; color: #ffffff; font-size: 32px; font-weight: bold; padding: 20px 40px; border-radius: 10px; display: inline-block; letter-spacing: 8px; font-family: 'Courier New', monospace; box-shadow: 0 4px 12px rgba(27,52,92,0.3);">${otp}</div>
                    </div>
                    
                    <p style="font-size: 16px; color: #555555; margin: 20px 0 0 0; line-height: 1.7; text-align: center;">Please enter this OTP within the next <strong>3 minutes</strong> to verify your identity.</p>
                  </td>
                </tr>
              </table>
              
              <!-- Timer Section -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #ff6b6b; border-radius: 10px; margin-bottom: 20px;">
                <tr>
                  <td style="padding: 20px; text-align: center; color: #ffffff;">
                    <div style="font-size: 24px; margin-bottom: 10px;">⏰</div>
                    <div style="font-size: 16px; font-weight: 600;">This OTP expires in 3 minutes</div>
                  </td>
                </tr>
              </table>
              
              <!-- Security Notice -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #fff3cd; border: 2px solid #ffc107; border-radius: 10px; margin-bottom: 20px;">
                <tr>
                  <td style="padding: 20px; color: #856404;">
                    <div style="font-size: 20px; margin-bottom: 10px; text-align: center;">🛡️</div>
                    <p style="margin: 0; font-size: 14px; text-align: center;"><strong>Security Notice:</strong> Never share this OTP with anyone. Stylic will never ask for your OTP via phone, email, or any other communication method.</p>
                  </td>
                </tr>
              </table>
              
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #34495e; color: #ffffff; text-align: center; padding: 30px;">
              <p style="margin: 0 0 15px 0; opacity: 0.9; font-size: 14px;">If you did not request this OTP, please ignore this email or contact our support team immediately.</p>
              <p style="margin: 20px 0 0 0; font-style: italic; opacity: 0.8; font-size: 14px;"><strong>Best regards,</strong><br>The Stylic Team</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
    }

    await transporter.sendMail(mailOption)
    res.status(200).json({ message: "Otp sended successfully." })

  } catch (err) {
    next(err)
  }
}


export const verifyOtp = async (req, res, next) => {
  try {
    const { email, otp } = req.body
    console.log(email, otp);

    if (!email || !otp) return res.status(400).json({ message: "Email address or otp is not given." })

    const storedOtp = await OTP.findOne({ email })

    if (!storedOtp) return res.status(400).json({ message: "Otp expired or not found." })

    if (otp !== storedOtp.otp) {
      return res.status(400).json({ message: "Invalid Otp." })
    }

    await OTP.deleteOne({ email })

    res.status(200).json({ message: "Otp verified successfully" })

  } catch (err) {
    next(err)
  }
}



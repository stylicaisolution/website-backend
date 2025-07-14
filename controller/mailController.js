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
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      line-height: 1.6;
      color: #2c3e50;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      min-height: 100vh;
      padding: 20px;
    }

    .container {
      max-width: 650px;
      margin: 0 auto;
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(10px);
      border-radius: 20px;
      box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
      overflow: hidden;
      animation: slideIn 0.8s ease-out;
    }

    @keyframes slideIn {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .header {
      background: linear-gradient(135deg, #1B345C 0%, #2c5aa0 100%);
      color: white;
      padding: 40px 30px;
      text-align: center;
      position: relative;
      overflow: hidden;
    }

    .header::before {
      content: '';
      position: absolute;
      top: -50%;
      left: -50%;
      width: 200%;
      height: 200%;
      background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
      animation: pulse 4s ease-in-out infinite;
    }

    @keyframes pulse {
      0%, 100% { transform: scale(1); opacity: 0.3; }
      50% { transform: scale(1.1); opacity: 0.6; }
    }

    .header img {
      width: 120px;
      height: auto;
      margin-bottom: 20px;
      filter: brightness(0) invert(1);
      transition: transform 0.3s ease;
    }

    .header img:hover {
      transform: scale(1.1);
    }

    .header h1 {
      font-size: 28px;
      font-weight: 700;
      margin-bottom: 10px;
      text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
      position: relative;
      z-index: 1;
    }

    .content {
      padding: 40px 30px;
    }

    .greeting {
      font-size: 18px;
      margin-bottom: 25px;
      color: #34495e;
    }

    .product-section {
      background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
      border-radius: 15px;
      padding: 30px;
      margin: 30px 0;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    .product-section:hover {
      transform: translateY(-5px);
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12);
    }

    .product-section h2 {
      color: #1B345C;
      font-size: 24px;
      margin-bottom: 20px;
      position: relative;
      padding-bottom: 10px;
    }

    .product-section h2::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 60px;
      height: 3px;
      background: linear-gradient(135deg, #1B345C, #2c5aa0);
      border-radius: 2px;
    }

    .product-section p {
      color: #555;
      margin-bottom: 25px;
      line-height: 1.8;
    }

    .button {
      display: inline-block;
      background: linear-gradient(135deg, #1B345C 0%, #2c5aa0 100%);
      color: white !important;
      padding: 15px 30px;
      text-decoration: none;
      border-radius: 50px;
      font-weight: 600;
      transition: all 0.3s ease;
      box-shadow: 0 5px 15px rgba(27, 52, 92, 0.3);
      position: relative;
      overflow: hidden;
    }

    .button::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
      transition: left 0.5s ease;
    }

    .button:hover::before {
      left: 100%;
    }

    .button:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 25px rgba(27, 52, 92, 0.4);
    }

    .offer-section {
      background: linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%);
      color: white;
      padding: 25px;
      border-radius: 15px;
      margin: 30px 0;
      text-align: center;
      box-shadow: 0 10px 30px rgba(255, 107, 107, 0.3);
    }

    .offer-section h3 {
      font-size: 22px;
      margin-bottom: 15px;
    }

    .promo-code {
      background: rgba(255, 255, 255, 0.2);
      padding: 10px 20px;
      border-radius: 25px;
      display: inline-block;
      font-weight: bold;
      margin: 10px 0;
      border: 2px solid rgba(255, 255, 255, 0.3);
    }

    .social-section {
      text-align: center;
      margin: 30px 0;
    }

    .social-links {
      display: flex;
      justify-content: center;
      gap: 20px;
      margin-top: 15px;
    }

    .social-links a {
      color: #1B345C;
      text-decoration: none;
      padding: 10px 20px;
      border: 2px solid #1B345C;
      border-radius: 25px;
      transition: all 0.3s ease;
      font-weight: 600;
    }

    .social-links a:hover {
      background: #1B345C;
      color: white;
      transform: translateY(-2px);
    }

    .footer {
      background: linear-gradient(135deg, #34495e 0%, #2c3e50 100%);
      color: white;
      text-align: center;
      padding: 30px;
      margin-top: 40px;
    }

    .footer p {
      margin-bottom: 15px;
      opacity: 0.9;
    }

    .footer .signature {
      font-style: italic;
      margin-top: 20px;
      opacity: 0.8;
    }

    /* Responsive Design */
    @media (max-width: 768px) {
      body {
        padding: 10px;
      }
      
      .container {
        margin: 10px auto;
        border-radius: 15px;
      }
      
      .header {
        padding: 30px 20px;
      }
      
      .header h1 {
        font-size: 24px;
      }
      
      .content {
        padding: 30px 20px;
      }
      
      .product-section {
        padding: 25px 20px;
      }
      
      .product-section h2 {
        font-size: 20px;
      }
      
      .social-links {
        flex-direction: column;
        gap: 10px;
      }
      
      .social-links a {
        display: block;
        margin: 0 20px;
      }
      
      .button {
        padding: 12px 25px;
        font-size: 14px;
      }
    }

    @media (max-width: 480px) {
      .header img {
        width: 100px;
      }
      
      .header h1 {
        font-size: 20px;
      }
      
      .product-section {
        padding: 20px 15px;
      }
      
      .offer-section {
        padding: 20px 15px;
      }
      
      .content {
        padding: 25px 15px;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <img src="https://stylic.ai/assets/stylic-logo-1-BQOP5sjr.png" alt="Stylic AI Logo">
      <h1>Exciting Product Update from Stylic AI</h1>
    </div>
    
    <div class="content">
      <div class="greeting">
        <p><strong>Hi there!</strong></p>
        <p>We hope this message finds you well! We're excited to bring you the latest updates and offers from Stylic AI.</p>
      </div>
      
      <div class="product-section">
        <h2>AI Photoshoot (Models without limit)</h2>
        <p>At Stylic.ai, we are redefining fashion photography through the power of AI. Model photoshoots are expensive, time-consuming, and often restrictive. Our cutting-edge AI technology allows fashion brands, e-commerce stores, and garment manufacturers to generate high-quality, photorealistic model images without the need for physical photoshoots.</p>
        <a href="https://stylic.ai/contact-us" class="button">Connect Now</a>
      </div>

      <div class="offer-section">
        <h3>🎉 Special Offer</h3>
        <p>For a limited time, enjoy <strong>5% off</strong> your next purchase with promo code:</p>
        <div class="promo-code">STY78L23C</div>
        <p>Use at checkout to unlock your savings!</p>
      </div>

      <div class="social-section">
        <p><strong>Stay Connected:</strong></p>
        <div class="social-links">
          <a href="https://www.facebook.com/stylicai">Facebook</a>
          <a href="https://www.instagram.com/stylicai/">Instagram</a>
          <a href="https://www.linkedin.com/company/stylicai/">LinkedIn</a>
        </div>
      </div>
    </div>

    <div class="footer">
      <p>Thank you for being part of the Stylic family! We look forward to continuing to provide you with top-notch products.</p>
      <div class="signature">
        <p><strong>Best regards,</strong><br>The Stylic Team</p>
      </div>
    </div>
  </div>
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
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      line-height: 1.6;
      color: #2c3e50;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      min-height: 100vh;
      padding: 20px;
    }

    .container {
      max-width: 600px;
      margin: 0 auto;
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(10px);
      border-radius: 20px;
      box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
      overflow: hidden;
      animation: slideIn 0.8s ease-out;
    }

    @keyframes slideIn {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .header {
      background: linear-gradient(135deg, #1B345C 0%, #2c5aa0 100%);
      color: white;
      padding: 40px 30px;
      text-align: center;
      position: relative;
      overflow: hidden;
    }

    .header::before {
      content: '';
      position: absolute;
      top: -50%;
      left: -50%;
      width: 200%;
      height: 200%;
      background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
      animation: pulse 4s ease-in-out infinite;
    }

    @keyframes pulse {
      0%, 100% { transform: scale(1); opacity: 0.3; }
      50% { transform: scale(1.1); opacity: 0.6; }
    }

    .header img {
      width: 120px;
      height: auto;
      margin-bottom: 20px;
      filter: brightness(0) invert(1);
      transition: transform 0.3s ease;
    }

    .header img:hover {
      transform: scale(1.1);
    }

    .header h1 {
      font-size: 28px;
      font-weight: 700;
      margin-bottom: 10px;
      text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
      position: relative;
      z-index: 1;
    }

    .content {
      padding: 40px 30px;
      text-align: center;
    }

    .otp-section {
      background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
      border-radius: 15px;
      padding: 30px;
      margin: 30px 0;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    .otp-section:hover {
      transform: translateY(-5px);
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12);
    }

    .otp-label {
      font-size: 18px;
      color: #555;
      margin-bottom: 20px;
      text-align: left;
    }

    .otp-code {
      background: linear-gradient(135deg, #1B345C 0%, #2c5aa0 100%);
      color: white;
      font-size: 32px;
      font-weight: bold;
      padding: 20px 40px;
      border-radius: 15px;
      display: inline-block;
      letter-spacing: 8px;
      margin: 20px 0;
      box-shadow: 0 10px 30px rgba(27, 52, 92, 0.3);
      animation: glow 2s ease-in-out infinite alternate;
      font-family: 'Courier New', monospace;
    }

    @keyframes glow {
      from {
        box-shadow: 0 10px 30px rgba(27, 52, 92, 0.3);
      }
      to {
        box-shadow: 0 15px 40px rgba(27, 52, 92, 0.5);
      }
    }

    .timer-section {
      background: linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%);
      color: white;
      padding: 20px;
      border-radius: 15px;
      margin: 20px 0;
      box-shadow: 0 10px 30px rgba(255, 107, 107, 0.3);
    }

    .timer-section .timer-icon {
      font-size: 24px;
      margin-bottom: 10px;
    }

    .timer-text {
      font-size: 16px;
      font-weight: 600;
    }

    .instruction-text {
      font-size: 16px;
      color: #555;
      margin: 20px 0;
      line-height: 1.8;
    }

    .security-notice {
      background: rgba(255, 193, 7, 0.1);
      border: 2px solid #ffc107;
      border-radius: 10px;
      padding: 20px;
      margin: 20px 0;
      color: #856404;
    }

    .security-notice .icon {
      font-size: 20px;
      margin-bottom: 10px;
    }

    .footer {
      background: linear-gradient(135deg, #34495e 0%, #2c3e50 100%);
      color: white;
      text-align: center;
      padding: 30px;
      margin-top: 40px;
    }

    .footer p {
      margin-bottom: 15px;
      opacity: 0.9;
    }

    .footer .signature {
      font-style: italic;
      margin-top: 20px;
      opacity: 0.8;
    }

    /* Responsive Design */
    @media (max-width: 768px) {
      body {
        padding: 10px;
      }
      
      .container {
        margin: 10px auto;
        border-radius: 15px;
      }
      
      .header {
        padding: 30px 20px;
      }
      
      .header h1 {
        font-size: 24px;
      }
      
      .content {
        padding: 30px 20px;
      }
      
      .otp-section {
        padding: 25px 20px;
      }
      
      .otp-code {
        font-size: 28px;
        padding: 15px 30px;
        letter-spacing: 6px;
      }
      
      .timer-section {
        padding: 15px;
      }
      
      .security-notice {
        padding: 15px;
      }
    }

    @media (max-width: 480px) {
      .header img {
        width: 100px;
      }
      
      .header h1 {
        font-size: 20px;
      }
      
      .otp-code {
        font-size: 24px;
        padding: 12px 25px;
        letter-spacing: 4px;
      }
      
      .content {
        padding: 25px 15px;
      }
      
      .otp-section {
        padding: 20px 15px;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <img src="https://stylic.ai/assets/stylic-logo-1-BQOP5sjr.png" alt="Stylic AI Logo">
      <h1>🔐 OTP Verification</h1>
    </div>
    
    <div class="content">
      <div class="otp-section">
        <div class="otp-label">
          <p><strong>Your One-Time Password (OTP) for verification is:</strong></p>
        </div>
        
        <div class="otp-code">${otp}</div>
        
        <div class="instruction-text">
          <p>Please enter this OTP within the next <strong>3 minutes</strong> to verify your identity.</p>
        </div>
      </div>

      <div class="timer-section">
        <div class="timer-icon">⏰</div>
        <div class="timer-text">This OTP expires in 3 minutes</div>
      </div>

      <div class="security-notice">
        <div class="icon">🛡️</div>
        <p><strong>Security Notice:</strong> Never share this OTP with anyone. Stylic will never ask for your OTP via phone, email, or any other communication method.</p>
      </div>
    </div>

    <div class="footer">
      <p>If you did not request this OTP, please ignore this email or contact our support team immediately.</p>
      <div class="signature">
        <p><strong>Best regards,</strong><br>The Stylic Team</p>
      </div>
    </div>
  </div>
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



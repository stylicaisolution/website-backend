import CONTACT from "../models/CONTACT.js";

import nodemailer from "nodemailer";

export const createContact = async (req, res, next) => {
  console.log("Request received");
  try {
    const { name, email, contactno, message } = req.body;
    if (!name || !email || !contactno || !message) {
      return res
        .status(400)
        .json({ message: "All input fields are required." });
    }

    const newContact = new CONTACT({ name, email, contactno, message });
    await newContact.save();

    // Configure the email transporter
    const transporter = nodemailer.createTransport({
      host: "smtp.hostinger.com", // Replace with your SES SMTP endpoint
      port: 587, // For secure connection
      secure: false, // Use TLS
      auth: {
        user: "info@stylic.ai", // SES SMTP username
        pass: "Har@#0401", // SES SMTP password
      },
      tls: {
        rejectUnauthorized: true,
      },
    });

    // Email content
    const mailOptions = {
      from: process.env.USER_MAIL,
      to: email,
      subject: "Welcome To Stylic",
      html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Thank You for Contacting Us</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      background-color: #f4f4f4;
      margin: 0;
      padding: 0;
    }
    .container {
      width: 100%;
      max-width: 600px;
      margin: 0 auto;
      background-color: #f2f2f2;
      margin-top: 50px;
      margin-bottom: 50px;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 0 10px #333;
    }
    .header {
      text-align: center;
      padding-bottom: 20px;
      padding-top: 30px;
    }
    .header h1 {
      font-size: 24px;
      color: #1B345C;
    }
    .button {
      display: inline-block;
      background-color: #1B345C;
      color: white !important;
      padding: 10px 20px;
      text-decoration: none;
      border-radius: 5px;
      margin-top: 10px;
    }
    .footer {
      text-align: center;
      padding-top: 20px;
      font-size: 12px;
      color: #888;
    }
    .footer a {
      color: #2a9d8f;
      text-decoration: none;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <img src="https://stylic.ai/assets/stylic-logo-1-BQOP5sjr.png" style="width: 30%;">
      <h1>Thank You for Reaching Out!</h1>
    </div>
    <p>Hi ${name},</p>
    <p>Thank you for contacting us. We have received your inquiry and will get back to you shortly.</p>
    <p>Meanwhile, feel free to explore our services and latest offerings.</p>
    
    <h3>Stay Connected</h3>
    <p>
      <a href="https://www.facebook.com/stylicai">Facebook</a> | 
      <a href="https://www.instagram.com/stylicai/">Instagram</a> | 
      <a href="https://www.linkedin.com/company/stylicai/">Linkedin</a>
    </p>
    
    <div class="footer">
      <p>We appreciate your interest and look forward to assisting you.</p>
      <p>Best regards, <br> The Stylic Team</p>
    </div>
  </div>
</body>
</html>

`,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    res.status(200).json({
      message: "Successfully created contact and sent confirmation email.",
    });
  } catch (err) {
    next(err);
  }
};

export const getContact = async (req, res, next) => {
  try {
    let searchQuery = req.query.searchQuery || "";

    let query = {};

    if (searchQuery.length > 0) {
      const searchRegx = new RegExp(searchQuery, "i");
      query["$or"] = [
        { name: searchRegx },
        { email: searchRegx },
        { contactno: searchRegx },
        { message: searchRegx },
      ];
    }

    const contacts = await CONTACT.find(query);
    res.status(200).json({
      success : false,
      message : "All Contacts Fetched Successfully",
      contacts
    });
  } catch (err) {
    next(err);
  }
};

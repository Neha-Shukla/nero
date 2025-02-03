const transporter = require("../config/mailer");
const User = require("../models/User");

const sendVerificationEmail = async (email, token) => {
  const verificationUrl = `http://localhost:3001/auth/verify-email?token=${token}`;
  
  await transporter.sendMail({
    from: process.env.SMTP_USER,
    to: email,
    subject: "Verify Your Email",
    html: `<p>Click <a href="${verificationUrl}">here</a> to verify your email.</p>`,
  });
};

module.exports = sendVerificationEmail;

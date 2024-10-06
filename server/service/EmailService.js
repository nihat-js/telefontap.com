// EmailService.js
const nodemailer = require('nodemailer');

class EmailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail', 
      auth: {
        user: process.env.EMAIL_USER, // Your email
        pass: process.env.EMAIL_PASS  // Your app password or email password
      }
    });
  }

  // Method to send a verification email
  async sendVerificationEmail(to, verificationCode) {
    const mailOptions = {
      from: process.env.EMAIL_USER, // Your email
      to: to,
      subject: 'Email Verification',
      text: `Please verify your email by using the following code: ${verificationCode}`
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      console.log('Email sent:', info.response);
      return true; // Indicate success
    } catch (error) {
      console.error('Error sending email:', error);
      return false; // Indicate failure
    }
  }
}

module.exports = EmailService;

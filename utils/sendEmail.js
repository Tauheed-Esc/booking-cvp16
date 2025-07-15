const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.SMTP_EMAIL,
    pass: process.env.SMTP_PASS
  }
});

module.exports = async function sendOtpEmail(to, otp) {
  const mailOptions = {
    from: process.env.SMTP_EMAIL,
    to,
    subject: 'Your OTP for CV-P16 Verification',
    text: `Your OTP is ${otp}. It expires in 5 minutes.`
  };
  await transporter.sendMail(mailOptions);
};

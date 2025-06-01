require('dotenv').config();
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: Number(process.env.MAIL_PORT),
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  }
});

exports.sendOrderEmail = async (to, subject, html) => {
  try {
    const info = await transporter.sendMail({
      from: '"MyShop" <pankajpriney@gmail.com>',
      to,
      subject,
      html
    });

    console.log('✅ Email sent:', info.messageId);
  } catch (err) {
    console.error('❌ Failed to send email:', err);
  }
};

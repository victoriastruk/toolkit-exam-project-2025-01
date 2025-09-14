const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

const sendOfferStatusEmail = async (to, offer, status) => {
  const subject = `Your offer has been ${status}`;
  const text = `Hello ${offer.User.firstName},\n\n
  Your offer for the contest "${offer.Contest.title}" 
  has been ${status} by the moderator.\n\n
  Best regards,\nTeam`;

  const info = await transporter.sendMail({
    from: process.env.SMTP_USER,
    to,
    subject,
    text,
  });

  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
};

module.exports = { sendOfferStatusEmail };

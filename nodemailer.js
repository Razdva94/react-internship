const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: 'smtp.mail.ru',
  port: 465,
  secure: true,
  auth: {
      user: 'razdva94@list.ru',
      pass: 'zJkSymmBdvSLxRup1YGy'
  }
},
{
  from: "Mailer Test <razdva94@list.ru>"
}
);

const mailer = message => {
  transporter.sendMail(message, (err, info) => {
    if (err) {
      console.log("Error sending email:", err);
    } else {
      console.log("Email sent:", info.response);
    }
  });
};

module.exports = mailer
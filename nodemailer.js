const nodemailer = require("nodemailer");

const { config } = require('./config/config');

// async..await is not allowed in global scope, must use a wrapper
async function sendMail() {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  // let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    // host: "smtp.ethereal.email",
    host: "smtp.gmail.com",
    // port: 587, // puerto ethereal.email
    port: 465, // puerto gmail
    secure: true, // true for 465, false for other ports
    auth: {
      user: config.mailerUser,
      pass: config.mailerPass,
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: "juan.valenciaor@amigo.edu.co", // sender address
    to: "juanda.vid1996@hotmail.com", // list of receivers
    subject: "Correo de prueba desde API NODEMAILER ✔", // Subject line
    text: "Correo de prueba NODE MAILER", // plain text body
    html: "<b>Esto es un correo de prueba de API NODE.JS</b>", // html body
  });



  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}



// sendMail().catch(console.error);
sendMail();


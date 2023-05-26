const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
require('dotenv').config();

router.post('/verify', async (req, res) => {
  const {otp,email} = req.body;
 console.log(otp,'hfksjh');

  const output = `
    <p> Your Otp for registration is Given below: </p>
    <h3> Your Otp -->  ${otp} <-- </h3>`;

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    auth: {
      user: process.env.SMTP_USERNAME,
      pass: process.env.SMTP_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  // send mail with defined transport object
  try {
    let info = await transporter.sendMail({
      from: `"Shivam" <${process.env.SMTP_USERNAME}>`, // sender address
      to: email, // list of receivers
      subject: 'Otp Verification', // Subject line
      text: 'Hello world?', // plain text body
      html: output, // html body
    });

    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    res.status(200).send({msg:"opt send successfully"});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to send OTP email' });
  }
});

module.exports = router;

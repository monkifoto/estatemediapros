import * as functions from 'firebase-functions';
import * as nodemailer from 'nodemailer';
import * as cors from 'cors';

// Configure CORS middleware to allow requests from any origin
const corsHandler = cors({origin: true});

// Configure the email transport using the
// default SMTP transport and a Gmail account.
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'pacificpropertyphotos@gmail.com',
    pass: 'ywwu joug obdw ewzr',
  },
});

// Create and deploy the Firebase function with CORS support
export const sendContactEmail = functions.https.onRequest((req, res) => {
  corsHandler(req, res, () => {
    const {name, email, message} = req.body;

    const mailOptions = {
      from: 'pacificpropertyphotos@gmail.com',
      to: 'pacificpropertyphotos@gmail.com',
      cc: 'sorin.bucse@gmail.com',
      subject: 'Pacific Property Photos Email',
      text: `You have a new message from:
      Name: ${name}
      Email: ${email}
      Message: ${message}`,
    };

    return transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.status(500).send(error.toString());
      }
      return res.status(200).send('Email sent: ' + info.response);
    });
  });
});

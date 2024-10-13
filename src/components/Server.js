const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Replace with your SMTP credentials
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'rathnayakarcc@gmail.com',
    pass: 'your-email-password',
  },
});

app.post('/send-reset-code', (req, res) => {
  const { email } = req.body;

  // Generate a random 6-digit OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  // Email message options
  const mailOptions = {
    from: 'rathnayakarcc@gmail.com',
    to: email,
    subject: 'Your Password Reset Code',
    text: `Your OTP Code is ${otp}`,
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send('Error sending email');
    } else {
      console.log('Email sent: ' + info.response);
      // Save the OTP in the server (in a real app, store in DB)
      // For demo purposes, we'll send it back in response
      res.status(200).send({ otp });
    }
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

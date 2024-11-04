const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const asyncHandler = require('express-async-handler');

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// MongoDB connection setup using mongoose
const uri = process.env.MONGODB_URI;

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true, 
})
  .then(() => console.log('Connected to MongoDB with Mongoose!'))
  .catch((error) => console.error('Error connecting to MongoDB:', error));

// Membership Application model
const MembershipApplication = mongoose.model('MembershipApplication', new mongoose.Schema({
  name: String,
  personalNumber: String,
  address: String,
  phone: String,
  email: String,
  occupation: String,
  howFound: String,
  greeting: String,
  createdAt: { type: Date, default: Date.now },
}));

// Nodemailer transporter setup using Strato SMTP
const transporter = nodemailer.createTransport({
  host: 'smtp.strato.com',
  port: 465, // Use 587 if you want to use TLS instead of SSL
  secure: true, // Use true for SSL (port 465), and false for TLS (port 587)
  auth: {
    user: process.env.STRATO_USER, // e.g., admin@albyradet.se
    pass: process.env.STRATO_PASS, // Your Strato email password
  },
  debug: true, // Enable debug mode for detailed logs
  logger: true, // Log SMTP traffic for debugging
});

// Endpoint for handling membership applications
app.post('/api/bli-medlem', asyncHandler(async (req, res) => {
  const { name, personalNumber, address, phone, email, occupation, howFound, greeting } = req.body;

  // Store the application in MongoDB
  const newApplication = new MembershipApplication({
    name,
    personalNumber,
    address,
    phone,
    email,
    occupation,
    howFound,
    greeting,
  });

  const result = await newApplication.save();

  // Define the email content
  const mailOptions = {
    from: 'admin@albyradet.se',
    to: process.env.CONTACT_EMAIL, // Primary recipient
    cc: 'Muhammet@albyradet.se', // Additional recipient
    subject: `Ny medlemsansökan från ${name}`,
    text: `
      Namn: ${name}
      Personnummer: ${personalNumber}
      Adress: ${address}
      Telefonnummer: ${phone}
      E-postadress: ${email}
      Sysselsättning: ${occupation}
      Hur hittade de oss: ${howFound}
      Hälsning: ${greeting || 'Ingen hälsning'}
    `,
  };

  // Send the email using nodemailer
  await transporter.sendMail(mailOptions);

  console.log('Email sent successfully!');
  res.status(201).send({ message: 'Ansökan har skickats och sparats', id: result._id });
}));

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

const nodemailer = require('nodemailer');
require('dotenv').config();

console.log('Testing email configuration...');
console.log('Email:', process.env.STRATO_EMAIL);
console.log('Password:', process.env.STRATO_EMAIL_PASSWORD ? '*** (set)' : 'Not set');

async function testEmail() {
  const transporter = nodemailer.createTransport({
    host: 'smtp.strato.com',
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
      user: process.env.STRATO_EMAIL,
      pass: process.env.STRATO_EMAIL_PASSWORD,
    },
    debug: true,
    logger: true,
  });

  try {
    console.log('Verifying SMTP connection...');
    await transporter.verify();
    console.log('✓ Server is ready to take our messages');

    console.log('Sending test email...');
    const info = await transporter.sendMail({
      from: process.env.STRATO_EMAIL,
      to: process.env.STRATO_EMAIL,
      subject: 'Test Email from Albyrådet',
      text: 'This is a test email from Albyrådet',
    });

    console.log('✓ Test email sent:', info.messageId);
  } catch (error) {
    console.error('Error:', error);
  }
}

testEmail();

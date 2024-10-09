// pages/api/send-application.js

import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST requests allowed' });
  }

  const { name, personalNumber, address, phone, email, occupation, howFound, greeting } = req.body;

  // Skapa en transportör med nodemailer och Strato:s SMTP-inställningar
  const transporter = nodemailer.createTransport({
    host: 'smtp.strato.com',
    port: 465, // Använd 465 för SSL
    secure: true, // true för SSL
    auth: {
      user: process.env.STRATO_USER, // Din Strato-e-postadress, t.ex. admin@albyradet.se
      pass: process.env.STRATO_PASS, // Lösenordet till din e-postadress
    },
  });

  // E-postens innehåll
  const mailOptions = {
    from: 'admin@albyradet.se',
    to: 'admin@albyradet.se', // Primär mottagare, t.ex. adminadressen
    cc: 'member1@albyradet.se, member2@albyradet.se', // Lägg till fler mottagare här
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

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Ansökan har skickats!' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Misslyckades med att skicka ansökan' });
  }
}

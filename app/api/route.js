import nodemailer from 'nodemailer';

export async function POST(req) {
  try {
    // Parse the request body
    const { name, personalNumber, address, phone, email, occupation, howFound, greeting } = await req.json();

    // Create a transporter with Nodemailer using Gmail's SMTP settings
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true, // Use true for SSL (port 465)
      auth: {
        user: process.env.GMAIL,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
      connectionTimeout: 20000, // 20 seconds
      socketTimeout: 30000, // 30 seconds
      debug: true,
      logger: true,
    });
    
    


    // Define the email content
    const mailOptions = {
      from: 'webmaster.albyradet@gmail.com',
      to: 'admin@albyradet.se', // Primary recipient
      cc: 'kontakt@albyradet.se', // Additional recipient(s)
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

    // Send the email
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully!');

    // Return a success response
    return new Response(JSON.stringify({ message: 'Ansökan har skickats!' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error sending email:', error);
    return new Response(JSON.stringify({ message: 'Misslyckades med att skicka ansökan' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

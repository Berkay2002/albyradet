import nodemailer from 'nodemailer';

export async function POST(req) {
  try {
    // Parse the request body
    const { name, personalNumber, address, phone, email, occupation, howFound, greeting } = await req.json();

    // Verify environment variables are set
    if (!process.env.STRATO_EMAIL || !process.env.STRATO_EMAIL_PASSWORD) {
      console.error('Email credentials not properly configured');
      return new Response(JSON.stringify({ message: 'Server configuration error' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    console.log('Using email:', process.env.STRATO_EMAIL);
    
    // Create a transporter with Nodemailer using Strato's SMTP settings
    const transporter = nodemailer.createTransport({
      host: 'smtp.strato.com',
      port: 587, // Alternative port with STARTTLS
      secure: false, // Use STARTTLS
      requireTLS: true, // Requires TLS
      auth: {
        user: process.env.STRATO_EMAIL,
        pass: process.env.STRATO_EMAIL_PASSWORD,
      },
      connectionTimeout: 20000, // 20 seconds
      socketTimeout: 30000, // 30 seconds
      debug: true,
      logger: true,
    });
    
    // Verify connection configuration
    try {
      await transporter.verify();
      console.log('Server is ready to take our messages');
    } catch (error) {
      console.error('SMTP connection error:', error);
      return new Response(JSON.stringify({ 
        message: 'Failed to connect to email server',
        error: error.message 
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    
    


    // Define the email content
    const mailOptions = {
      from: 'admin@albyradet.se',
      to: 'kontakt@albyradet.se', // Primary recipient
      cc: '', // Additional recipient(s)
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

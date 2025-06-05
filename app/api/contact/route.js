import nodemailer from 'nodemailer';

export async function POST(req) {
  try {
    const { name, email, phone, message } = await req.json();

    // Verify environment variables are set
    if (!process.env.STRATO_EMAIL || !process.env.STRATO_EMAIL_PASSWORD) {
      console.error('Email credentials not properly configured');
      return new Response(JSON.stringify({ message: 'Server configuration error' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    console.log('Using email:', process.env.STRATO_EMAIL);
    
    const transporter = nodemailer.createTransport({
      host: 'smtp.strato.com',
      port: 587,
      secure: false,
      requireTLS: true,
      auth: {
        user: process.env.STRATO_EMAIL,
        pass: process.env.STRATO_EMAIL_PASSWORD,
      },
      connectionTimeout: 20000,
      socketTimeout: 30000,
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
      to: 'kontakt@albyradet.se',
      subject: `Nytt kontaktmeddelande från ${name}`,
      text: `
        Namn: ${name}
        E-post: ${email}
        Telefon: ${phone || 'Inte angivet'}
        
        Meddelande:
        ${message}
      `,
      html: `
        <h2>Nytt kontaktmeddelande från ${name}</h2>
        <p><strong>E-post:</strong> ${email}</p>
        <p><strong>Telefon:</strong> ${phone || 'Inte angivet'}</p>
        <p><strong>Meddelande:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    };

    // Send the email
    await transporter.sendMail(mailOptions);
    
    return new Response(JSON.stringify({ message: 'Meddelandet har skickats!' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error sending contact form:', error);
    return new Response(JSON.stringify({ 
      message: 'Misslyckades med att skicka meddelandet',
      error: error.message 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

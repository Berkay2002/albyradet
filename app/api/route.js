import nodemailer from 'nodemailer';

// Rate limiting store (in production, use Redis or a database)
const rateLimitStore = new Map();

// Simple rate limiting function
function rateLimit(identifier, maxRequests = 5, windowMs = 15 * 60 * 1000) {
  const now = Date.now();
  const userRequests = rateLimitStore.get(identifier) || [];
  
  // Filter out old requests
  const validRequests = userRequests.filter(time => now - time < windowMs);
  
  if (validRequests.length >= maxRequests) {
    return false;
  }
  
  validRequests.push(now);
  rateLimitStore.set(identifier, validRequests);
  return true;
}

// Input validation and sanitization
function validateAndSanitizeInput(data) {
  const errors = [];
  
  // Validate name
  if (!data.name || typeof data.name !== 'string' || data.name.trim().length < 2) {
    errors.push('Namn måste vara minst 2 tecken');
  }
  
  // Validate email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email || !emailRegex.test(data.email)) {
    errors.push('Ogiltig e-postadress');
  }
  
  // Validate personal number (Swedish format)
  const personalNumberRegex = /^\d{8}-\d{4}$/;
  if (!data.personalNumber || !personalNumberRegex.test(data.personalNumber)) {
    errors.push('Personnummer måste vara i format ÅÅÅÅMMDD-XXXX');
  }
  
  // Sanitize strings
  const sanitizedData = {};
  for (const [key, value] of Object.entries(data)) {
    if (typeof value === 'string') {
      sanitizedData[key] = value.trim().replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
    } else {
      sanitizedData[key] = value;
    }
  }
  
  return { errors, data: sanitizedData };
}

export async function POST(req) {
  try {
    // Get client IP for rate limiting
    const clientIP = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown';
    
    // Apply rate limiting
    if (!rateLimit(clientIP)) {
      return new Response(JSON.stringify({ message: 'För många förfrågningar. Försök igen senare.' }), {
        status: 429,
        headers: { 
          'Content-Type': 'application/json',
          'X-RateLimit-Limit': '5',
          'X-RateLimit-Remaining': '0',
          'X-RateLimit-Reset': new Date(Date.now() + 15 * 60 * 1000).toISOString()
        },
      });
    }

    // Parse and validate the request body
    const rawData = await req.json();
    const { errors, data } = validateAndSanitizeInput(rawData);
    
    if (errors.length > 0) {
      return new Response(JSON.stringify({ message: 'Valideringsfel', errors }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    
    const { name, personalNumber, address, phone, email, occupation, howFound, greeting } = data;

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

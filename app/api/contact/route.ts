import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

// Helper function to create email HTML
function createEmailHTML(data: any) {
  const isCandidate = data.type === 'candidate';

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border: 1px solid #ddd; }
          .field { margin-bottom: 20px; }
          .label { font-weight: bold; color: #666; margin-bottom: 5px; }
          .value { background: white; padding: 10px; border-radius: 5px; border-left: 4px solid #667eea; }
          .footer { background: #666; color: white; padding: 20px; text-align: center; border-radius: 0 0 10px 10px; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>${isCandidate ? 'New Candidate Application' : 'New Contact Form Submission'}</h2>
            <p>DataVruti Website</p>
          </div>
          <div class="content">
            <div class="field">
              <div class="label">Name:</div>
              <div class="value">${data.name}</div>
            </div>
            <div class="field">
              <div class="label">Email:</div>
              <div class="value">${data.email}</div>
            </div>
            ${data.phone ? `
            <div class="field">
              <div class="label">Phone:</div>
              <div class="value">${data.phone}</div>
            </div>
            ` : ''}
            ${data.company ? `
            <div class="field">
              <div class="label">Company:</div>
              <div class="value">${data.company}</div>
            </div>
            ` : ''}
            ${isCandidate && data.skills ? `
            <div class="field">
              <div class="label">Skills:</div>
              <div class="value">${data.skills}</div>
            </div>
            ` : ''}
            <div class="field">
              <div class="label">${isCandidate ? 'About Candidate:' : 'Message:'}</div>
              <div class="value">${data.message.replace(/\n/g, '<br>')}</div>
            </div>
            <div class="field">
              <div class="label">Submitted:</div>
              <div class="value">${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST</div>
            </div>
          </div>
          <div class="footer">
            <p>This email was sent from the DataVruti website contact form</p>
            <p>© ${new Date().getFullYear()} Reflion Tech Private Limited. All rights reserved.</p>
          </div>
        </div>
      </body>
    </html>
  `;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, company, message, skills, type } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Log the submission for debugging
    console.log('Contact form submission:', {
      type,
      name,
      email,
      phone,
      company,
      message,
      skills,
      timestamp: new Date().toISOString(),
    });

    // Check if Resend API key is configured
    if (!process.env.RESEND_API_KEY) {
      console.warn('RESEND_API_KEY not configured. Email will not be sent.');
      // Still return success for development
      return NextResponse.json(
        { success: true, message: 'Form submitted successfully (email not configured)' },
        { status: 200 }
      );
    }

    // Send email using Resend
    const emailData = {
      from: 'DataVruti Website <onboarding@resend.dev>',
      to: 'sales@datavruti.com',
      subject: type === 'candidate'
        ? `New Candidate Application: ${name}`
        : `New Contact Form Submission from ${name}`,
      html: createEmailHTML({ name, email, phone, company, message, skills, type }),
      reply_to: email,
    };

    const emailResponse = await resend.emails.send(emailData);

    if (emailResponse.error) {
      console.error('Resend error:', emailResponse.error);
      throw new Error(emailResponse.error.message);
    }

    console.log('Email sent successfully:', emailResponse.data);

    return NextResponse.json(
      { success: true, message: 'Form submitted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing contact form:', error);
    return NextResponse.json(
      { error: 'Failed to submit form. Please try again or contact us directly at sales@datavruti.com' },
      { status: 500 }
    );
  }
}

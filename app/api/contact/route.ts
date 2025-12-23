import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { validateAndSanitizeObject, containsXSS } from '@/lib/sanitize';

// Helper function to create email HTML (kept for reference)
function createEmailHTML(data: any) {
  const isCandidate = data.type === 'candidate';
  const isTalentPool = data.formType === 'talentPool';

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
            <h2>${isTalentPool ? 'New Talent Pool Application' : isCandidate ? 'New Candidate Application' : 'New Contact Form Submission'}</h2>
            <p>DataVruti Website</p>
          </div>
          <div class="content">
            <pre style="white-space: pre-wrap; word-wrap: break-word;">${JSON.stringify(data, null, 2)}</pre>
          </div>
          <div class="footer">
            <p>This email was sent from the DataVruti website</p>
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

    // Handle both talent pool and contact forms
    const isTalentPool = body.formType === 'talentPool';
    const isContact = !isTalentPool;

    // Validate required fields
    if (isContact && (!body.name || !body.email || !body.message)) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    if (isTalentPool && (!body.fullName || !body.email)) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check for XSS attacks in string fields
    for (const [key, value] of Object.entries(body)) {
      if (typeof value === 'string' && containsXSS(value)) {
        console.error(`⚠️ XSS attempt detected in field: ${key}`);
        return NextResponse.json(
          { error: 'Invalid input detected. Please remove any HTML or scripts.' },
          { status: 400 }
        );
      }
    }

    // Sanitize all input data
    const sanitizedBody = validateAndSanitizeObject(body);

    // Log the submission for debugging
    console.log('Form submission:', {
      type: sanitizedBody.formType || sanitizedBody.type,
      ...sanitizedBody,
      timestamp: new Date().toISOString(),
    });

    // Prepare submission data with sanitized values
    const submissionData = {
      ...sanitizedBody,
      submittedAt: new Date().toISOString(),
      submittedAtIST: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
    };

    // Create a filename with timestamp
    const timestamp = new Date().getTime();
    const formType = isTalentPool ? 'talent-pool' : body.type === 'candidate' ? 'candidate' : 'contact';
    const name = (isTalentPool ? body.fullName : body.name).replace(/[^a-zA-Z0-9]/g, '_').toLowerCase();
    const filename = `${formType}_${name}_${timestamp}.json`;

    // Save to public/submissions folder
    const submissionsDir = path.join(process.cwd(), 'public', 'submissions');

    // Create directory if it doesn't exist
    try {
      await fs.access(submissionsDir);
    } catch {
      await fs.mkdir(submissionsDir, { recursive: true });
    }

    const filePath = path.join(submissionsDir, filename);

    // Write the submission to a file
    await fs.writeFile(filePath, JSON.stringify(submissionData, null, 2), 'utf-8');

    console.log(`✅ Form submission saved to: ${filename}`);
    console.log(`📁 Path: public/submissions/${filename}`);
    console.log(`📧 Email: ${isTalentPool ? body.email : body.email}`);
    console.log(`👤 Name: ${isTalentPool ? body.fullName : body.name}`);

    return NextResponse.json(
      {
        success: true,
        message: 'Form submitted successfully',
        file: filename
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing form:', error);
    return NextResponse.json(
      { error: 'Failed to submit form. Please try again.' },
      { status: 500 }
    );
  }
}

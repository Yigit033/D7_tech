import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { name, email, subject, message } = await req.json();

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'D7 Technology Contact <onboarding@resend.dev>',
        to: 'yigitd7tech@gmail.com',
        reply_to: email,
        subject: `[D7 Contact] ${subject} — ${name}`,
        html: `
          <div style="font-family:monospace;background:#020409;color:#e2e8f0;padding:32px;border-radius:8px;max-width:600px">
            <h2 style="color:#38bdf8;margin:0 0 24px">New Contact Form Submission</h2>
            <table style="width:100%;border-collapse:collapse">
              <tr><td style="color:#64748b;padding:6px 0;width:80px">From</td><td style="color:#e2e8f0">${name}</td></tr>
              <tr><td style="color:#64748b;padding:6px 0">Email</td><td style="color:#38bdf8">${email}</td></tr>
              <tr><td style="color:#64748b;padding:6px 0">Subject</td><td style="color:#e2e8f0;text-transform:capitalize">${subject}</td></tr>
            </table>
            <hr style="border:none;border-top:1px solid #1a2540;margin:20px 0"/>
            <p style="color:#94a3b8;line-height:1.7;white-space:pre-wrap">${message}</p>
            <p style="color:#334155;font-size:11px;margin-top:32px">Sent via d7tech.net contact form</p>
          </div>
        `,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error('Resend API error:', err);
      return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
  }
}

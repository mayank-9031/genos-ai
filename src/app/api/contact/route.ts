import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

export async function POST(request: Request) {
  try {
    const { fullName, email, phone, company, message } = await request.json()

    if (!fullName || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required.' },
        { status: 400 }
      )
    }

    const safeName = escapeHtml(fullName)
    const safeEmail = escapeHtml(email)
    const safePhone = escapeHtml(phone || 'Not provided')
    const safeCompany = escapeHtml(company || 'Not provided')
    const safeMessage = escapeHtml(message).replace(/\n/g, '<br>')

    const { error } = await resend.emails.send({
      from: 'GenosAI Contact Form <hello@genosai.tech>',
      to: 'hello@genosai.tech',
      replyTo: email,
      subject: `New Strategy Call Request from ${safeName}`,
      html: `
        <h2>New Strategy Call Request</h2>
        <table style="border-collapse:collapse;width:100%;max-width:600px;">
          <tr><td style="padding:8px 12px;font-weight:bold;color:#555;">Name</td><td style="padding:8px 12px;">${safeName}</td></tr>
          <tr style="background:#f9f9f9;"><td style="padding:8px 12px;font-weight:bold;color:#555;">Email</td><td style="padding:8px 12px;">${safeEmail}</td></tr>
          <tr><td style="padding:8px 12px;font-weight:bold;color:#555;">Phone</td><td style="padding:8px 12px;">${safePhone}</td></tr>
          <tr style="background:#f9f9f9;"><td style="padding:8px 12px;font-weight:bold;color:#555;">Company</td><td style="padding:8px 12px;">${safeCompany}</td></tr>
        </table>
        <h3 style="margin-top:20px;">Message</h3>
        <p style="background:#f5f5f5;padding:16px;border-radius:8px;line-height:1.6;">${safeMessage}</p>
      `,
    })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json(
      { error: 'Failed to send message. Please try again.' },
      { status: 500 }
    )
  }
}

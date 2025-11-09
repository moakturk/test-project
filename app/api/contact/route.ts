import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { z } from 'zod'
import { supabaseAdmin } from '@/lib/supabase/server'
import { rateLimit, getClientIp } from '@/lib/rate-limit'
import { verifyCsrfToken, CSRF_COOKIE_NAME, CSRF_HEADER_NAME } from '@/lib/csrf'
import { validateEmail } from '@/lib/email-validation'

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY)

// Validation schema
const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  company: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})

export async function POST(request: NextRequest) {
  try {
    // Rate limiting: Max 3 requests per minute per IP
    const clientIp = getClientIp(request)
    const rateLimitResult = rateLimit(clientIp, 3, 60000)

    if (!rateLimitResult.success) {
      return NextResponse.json(
        {
          success: false,
          message: 'Too many requests. Please try again later.',
          retryAfter: Math.ceil((rateLimitResult.reset - Date.now()) / 1000),
        },
        {
          status: 429,
          headers: {
            'X-RateLimit-Limit': rateLimitResult.limit.toString(),
            'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
            'X-RateLimit-Reset': rateLimitResult.reset.toString(),
            'Retry-After': Math.ceil((rateLimitResult.reset - Date.now()) / 1000).toString(),
          },
        }
      )
    }

    // CSRF Protection: Verify token
    const csrfToken = request.headers.get(CSRF_HEADER_NAME)
    const csrfCookie = request.cookies.get(CSRF_COOKIE_NAME)?.value

    if (!csrfToken || !csrfCookie) {
      return NextResponse.json(
        {
          success: false,
          message: 'CSRF token missing. Please refresh the page and try again.',
        },
        { status: 403 }
      )
    }

    if (!verifyCsrfToken(csrfToken, csrfCookie)) {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid CSRF token. Please refresh the page and try again.',
        },
        { status: 403 }
      )
    }

    // Parse request body
    const body = await request.json()

    // Honeypot check: If website field is filled, it's a bot
    if (body.website && body.website.trim() !== '') {
      console.warn('Honeypot triggered - potential bot submission:', {
        ip: clientIp,
        website: body.website,
      })
      // Return success to avoid tipping off the bot
      return NextResponse.json(
        {
          success: true,
          message: 'Thank you for contacting us!',
        },
        { status: 200 }
      )
    }

    // Validate email (disposable email detection)
    const emailValidation = validateEmail(body.email)
    if (!emailValidation.valid) {
      return NextResponse.json(
        {
          success: false,
          message: emailValidation.reason || 'Invalid email address',
        },
        { status: 400 }
      )
    }

    // Validate input with Zod
    const validatedData = contactSchema.parse(body)

    // 1. Save to Supabase
    const { data: contact, error: dbError } = await supabaseAdmin
      .from('contacts')
      .insert({
        name: validatedData.name,
        email: validatedData.email,
        phone: validatedData.phone || null,
        company: validatedData.company || null,
        message: validatedData.message,
        status: 'new',
      })
      .select()
      .single()

    if (dbError) {
      console.error('Database error:', dbError)
      throw new Error('Failed to save contact to database')
    }

    // 2. Send email notification via Resend
    try {
      await resend.emails.send({
        from: process.env.EMAIL_FROM || 'onboarding@resend.dev',
        to: process.env.EMAIL_TO || 'info@automexus.com',
        subject: `New Contact Form Submission from ${validatedData.name}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #007bff;">New Contact Form Submission</h2>

            <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p><strong>Name:</strong> ${validatedData.name}</p>
              <p><strong>Email:</strong> ${validatedData.email}</p>
              ${validatedData.phone ? `<p><strong>Phone:</strong> ${validatedData.phone}</p>` : ''}
              ${validatedData.company ? `<p><strong>Company:</strong> ${validatedData.company}</p>` : ''}
            </div>

            <div style="margin: 20px 0;">
              <h3 style="color: #333;">Message:</h3>
              <p style="line-height: 1.6; color: #666;">${validatedData.message}</p>
            </div>

            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd;">
              <p style="color: #999; font-size: 12px;">
                Submitted: ${new Date().toLocaleString()}<br>
                Contact ID: ${contact.id}
              </p>
            </div>
          </div>
        `,
      })
    } catch (emailError) {
      console.error('Email error:', emailError)
      // Don't fail the request if email fails - data is already saved in DB
    }

    // 3. Return success response
    return NextResponse.json(
      {
        success: true,
        message: 'Thank you for contacting us! We will get back to you soon.',
        contactId: contact.id,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Contact form error:', error)

    // Handle validation errors
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          message: error.issues[0]?.message || 'Validation error',
          errors: error.issues.map((e) => ({
            field: e.path.join('.'),
            message: e.message,
          })),
        },
        { status: 400 }
      )
    }

    // Handle other errors
    return NextResponse.json(
      {
        success: false,
        message: 'Something went wrong. Please try again later.',
      },
      { status: 500 }
    )
  }
}
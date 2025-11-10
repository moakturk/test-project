import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { z } from 'zod'
import { supabaseAdmin } from '@/lib/supabase/server'
import { rateLimit, getClientIp } from '@/lib/rate-limit'
import { verifyCsrfToken, CSRF_COOKIE_NAME, CSRF_HEADER_NAME } from '@/lib/csrf'
import { validateEmail } from '@/lib/email-validation'
import { sanitizeFormInput, sanitizeEmail, sanitizePhone } from '@/lib/sanitize'
import { CONTACT, MESSAGES, RATE_LIMIT as RATE_LIMITS, STATUS, VALIDATION } from '@/lib/constants'

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY)

// Validation schema using constants
const contactSchema = z.object({
  name: z.string()
    .min(VALIDATION.NAME_MIN_LENGTH, `Name must be at least ${VALIDATION.NAME_MIN_LENGTH} characters`)
    .max(VALIDATION.NAME_MAX_LENGTH, `Name must be less than ${VALIDATION.NAME_MAX_LENGTH} characters`),
  email: z.string()
    .email('Invalid email address')
    .max(VALIDATION.EMAIL_MAX_LENGTH, 'Email is too long'),
  phone: z.string()
    .max(VALIDATION.PHONE_MAX_LENGTH, 'Phone number is too long')
    .optional(),
  company: z.string()
    .max(VALIDATION.COMPANY_MAX_LENGTH, 'Company name is too long')
    .optional(),
  message: z.string()
    .min(VALIDATION.MESSAGE_MIN_LENGTH, `Message must be at least ${VALIDATION.MESSAGE_MIN_LENGTH} characters`)
    .max(VALIDATION.MESSAGE_MAX_LENGTH, `Message must be less than ${VALIDATION.MESSAGE_MAX_LENGTH} characters`),
})

export async function POST(request: NextRequest) {
  try {
    // Rate limiting using constants
    const clientIp = getClientIp(request)
    const rateLimitResult = rateLimit(
      clientIp,
      RATE_LIMITS.CONTACT_FORM.MAX_REQUESTS,
      RATE_LIMITS.CONTACT_FORM.WINDOW_MS
    )

    if (!rateLimitResult.success) {
      return NextResponse.json(
        {
          success: false,
          message: MESSAGES.ERROR.RATE_LIMIT,
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
          message: MESSAGES.ERROR.CSRF_MISSING,
        },
        { status: 403 }
      )
    }

    if (!verifyCsrfToken(csrfToken, csrfCookie)) {
      return NextResponse.json(
        {
          success: false,
          message: MESSAGES.ERROR.CSRF_INVALID,
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
          message: MESSAGES.SUCCESS.CONTACT_FORM,
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

    // Sanitize all inputs to prevent XSS attacks
    const sanitizedData = {
      name: sanitizeFormInput(validatedData.name),
      email: sanitizeEmail(validatedData.email),
      phone: validatedData.phone ? sanitizePhone(validatedData.phone) : undefined,
      company: validatedData.company ? sanitizeFormInput(validatedData.company) : undefined,
      message: sanitizeFormInput(validatedData.message),
    }

    // 1. Save to Supabase (using sanitized data)
    const { data: contact, error: dbError } = await supabaseAdmin
      .from('contacts')
      .insert({
        name: sanitizedData.name,
        email: sanitizedData.email,
        phone: sanitizedData.phone || null,
        company: sanitizedData.company || null,
        message: sanitizedData.message,
        status: STATUS.CONTACT.NEW,
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
        to: process.env.EMAIL_TO || CONTACT.EMAIL,
        subject: `New Contact Form Submission from ${sanitizedData.name}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #007bff;">New Contact Form Submission</h2>

            <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p><strong>Name:</strong> ${sanitizedData.name}</p>
              <p><strong>Email:</strong> ${sanitizedData.email}</p>
              ${sanitizedData.phone ? `<p><strong>Phone:</strong> ${sanitizedData.phone}</p>` : ''}
              ${sanitizedData.company ? `<p><strong>Company:</strong> ${sanitizedData.company}</p>` : ''}
            </div>

            <div style="margin: 20px 0;">
              <h3 style="color: #333;">Message:</h3>
              <p style="line-height: 1.6; color: #666; white-space: pre-wrap;">${sanitizedData.message}</p>
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
        message: MESSAGES.SUCCESS.CONTACT_FORM,
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
        message: MESSAGES.ERROR.GENERIC,
      },
      { status: 500 }
    )
  }
}
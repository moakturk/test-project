import { NextResponse } from 'next/server'
import { generateCsrfToken, generateSignedToken, CSRF_COOKIE_NAME, CSRF_COOKIE_OPTIONS } from '@/lib/csrf'

export const dynamic = 'force-dynamic'

/**
 * CSRF Token Endpoint
 *
 * Generates and returns a CSRF token for form submissions.
 * The token is also set as an HTTP-only cookie for verification.
 *
 * Usage:
 * - Frontend calls this endpoint before showing the contact form
 * - Token is returned in response and stored in cookie
 * - Form submission includes token in header
 * - API validates token against cookie
 */

export async function GET() {
  try {
    // Generate new CSRF token
    const token = generateCsrfToken()
    const signedToken = generateSignedToken(token)

    // Create response with token
    const response = NextResponse.json({
      token,
      success: true,
    })

    // Set signed token in HTTP-only cookie
    response.cookies.set(CSRF_COOKIE_NAME, signedToken, CSRF_COOKIE_OPTIONS)

    return response
  } catch (error) {
    console.error('CSRF token generation error:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to generate CSRF token' },
      { status: 500 }
    )
  }
}

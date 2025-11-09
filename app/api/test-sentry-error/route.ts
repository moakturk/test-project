import { NextResponse } from 'next/server'
import * as Sentry from '@sentry/nextjs'

export async function GET() {
  try {
    // Intentionally throw an error for testing
    throw new Error('Test server-side error from Sentry test API')
  } catch (error) {
    // Capture the error with Sentry
    Sentry.captureException(error)

    // Return a response (in production, you'd return an error status)
    return NextResponse.json(
      {
        success: true,
        message: '✅ Server error captured! Check your Sentry dashboard.',
      },
      { status: 200 }
    )
  }
}

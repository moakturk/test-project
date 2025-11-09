import { randomBytes, createHmac } from 'crypto'

/**
 * CSRF Protection Utility
 *
 * Implements Double Submit Cookie pattern for CSRF protection.
 * More info: https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html
 */

const CSRF_SECRET = process.env.CSRF_SECRET || 'your-secret-key-change-this-in-production'
const TOKEN_LENGTH = 32

/**
 * Generate a cryptographically secure CSRF token
 */
export function generateCsrfToken(): string {
  const token = randomBytes(TOKEN_LENGTH).toString('hex')
  return token
}

/**
 * Generate a signed token using HMAC
 */
export function generateSignedToken(token: string): string {
  const hmac = createHmac('sha256', CSRF_SECRET)
  hmac.update(token)
  return hmac.digest('hex')
}

/**
 * Verify CSRF token
 */
export function verifyCsrfToken(token: string, signedToken: string): boolean {
  if (!token || !signedToken) {
    return false
  }

  const expectedSignature = generateSignedToken(token)

  // Use timing-safe comparison to prevent timing attacks
  try {
    return timingSafeEqual(
      Buffer.from(expectedSignature, 'hex'),
      Buffer.from(signedToken, 'hex')
    )
  } catch {
    return false
  }
}

/**
 * Timing-safe comparison to prevent timing attacks
 */
function timingSafeEqual(a: Buffer, b: Buffer): boolean {
  if (a.length !== b.length) {
    return false
  }

  let result = 0
  for (let i = 0; i < a.length; i++) {
    result |= a[i] ^ b[i]
  }

  return result === 0
}

/**
 * Cookie configuration for CSRF token
 */
export const CSRF_COOKIE_NAME = 'csrf_token'
export const CSRF_HEADER_NAME = 'x-csrf-token'

export const CSRF_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict' as const,
  maxAge: 60 * 60 * 24, // 24 hours
  path: '/',
}

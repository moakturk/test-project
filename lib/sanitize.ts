/**
 * Input sanitization utilities
 * Prevents XSS attacks by sanitizing user input
 */

import DOMPurify from 'isomorphic-dompurify'

/**
 * Sanitize HTML content to prevent XSS attacks
 * @param dirty - Untrusted HTML string
 * @returns Sanitized HTML string safe for rendering
 */
export function sanitizeHTML(dirty: string): string {
  return DOMPurify.sanitize(dirty, {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'p', 'br'],
    ALLOWED_ATTR: [],
    KEEP_CONTENT: true,
  })
}

/**
 * Sanitize text input by stripping all HTML tags
 * @param input - User text input
 * @returns Plain text without HTML
 */
export function sanitizeText(input: string): string {
  return DOMPurify.sanitize(input, {
    ALLOWED_TAGS: [],
    ALLOWED_ATTR: [],
    KEEP_CONTENT: true,
  }).trim()
}

/**
 * Sanitize email input
 * @param email - User email input
 * @returns Sanitized email string
 */
export function sanitizeEmail(email: string): string {
  // Remove any HTML tags and trim whitespace
  const cleaned = sanitizeText(email).toLowerCase()

  // Basic email format validation (additional to Zod validation)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(cleaned)) {
    throw new Error('Invalid email format')
  }

  return cleaned
}

/**
 * Sanitize phone number input
 * @param phone - User phone input
 * @returns Sanitized phone string
 */
export function sanitizePhone(phone: string): string {
  // Remove HTML tags and keep only digits, spaces, +, -, (, )
  const cleaned = sanitizeText(phone)
  return cleaned.replace(/[^0-9+\-\s()]/g, '').trim()
}

/**
 * Sanitize general form input
 * @param input - Any form field value
 * @returns Sanitized input
 */
export function sanitizeFormInput(input: string): string {
  // Strip all HTML, trim whitespace, limit length
  const sanitized = sanitizeText(input)

  // Prevent extremely long inputs (potential DoS)
  const MAX_LENGTH = 10000
  if (sanitized.length > MAX_LENGTH) {
    return sanitized.substring(0, MAX_LENGTH)
  }

  return sanitized
}

/**
 * Email Validation Utilities
 * Provides disposable email detection and validation
 */

// Common disposable email domains (top 100 most used)
// Source: https://github.com/disposable-email-domains/disposable-email-domains
const DISPOSABLE_DOMAINS = new Set([
  '10minutemail.com',
  'guerrillamail.com',
  'mailinator.com',
  'maildrop.cc',
  'temp-mail.org',
  'tempmail.com',
  'throwaway.email',
  'yopmail.com',
  'fakeinbox.com',
  'trashmail.com',
  'getnada.com',
  'sharklasers.com',
  'guerrillamail.info',
  'grr.la',
  'guerrillamail.biz',
  'guerrillamail.org',
  'guerrillamailblock.com',
  'pokemail.net',
  'spam4.me',
  'bccto.me',
  'chacuo.net',
  '027168.com',
  '123-m.com',
  'mvrht.com',
  '0815.ru',
  'anonymbox.com',
  'discard.email',
  'discardmail.com',
  'discardmail.de',
  'eyepaste.com',
  'getairmail.com',
  'gettempmail.com',
  'guerillamail.com',
  'guerillamail.de',
  'guerillamail.net',
  'guerillamail.org',
  'hidemail.de',
  'mailcatch.com',
  'mailnesia.com',
  'mailtothis.com',
  'mintemail.com',
  'mytemp.email',
  'sharklasers.com',
  'trash-mail.com',
  'trash2009.com',
  'trbvm.com',
  'wegwerfmail.de',
  'wegwerfmail.net',
  'wegwerfmail.org',
  'zippymail.info',
  'crazymailing.com',
  'mailexpire.com',
  'rcpt.at',
  'spambox.us',
  'tempemail.com',
  'tempemail.net',
  'tempinbox.com',
  'tempmail.it',
  'trashmail.ws',
  'emailondeck.com',
  'fakemailgenerator.com',
  'mailnator.com',
  'mailsac.com',
  'mohmal.com',
  'rootfest.net',
  'spamgourmet.com',
  'suremail.info',
  'tempail.com',
  'tempr.email',
  'throwawaymail.com',
  '20minutemail.com',
  '33mail.com',
  'anonbox.net',
  'anonymouse.org',
  'bugmenot.com',
  'deadaddress.com',
  'despam.it',
  'disposeamail.com',
  'disposableemailaddresses.com',
  'disposemail.com',
  'dodgeit.com',
  'dodgit.com',
  'dontreg.com',
  'emailias.com',
  'emailsensei.com',
  'emailtemporar.ro',
  'emailtemporario.com.br',
  'emltmp.com',
  'fillmail.com',
  'incognitomail.com',
  'jetable.org',
  'mailforspam.com',
  'mailmoat.com',
  'mailnull.com',
  'mintemail.com',
  'mytrashmail.com',
  'netmails.net',
  'no-spam.ws',
])

/**
 * Check if an email domain is a known disposable email service
 */
export function isDisposableEmail(email: string): boolean {
  if (!email || typeof email !== 'string') {
    return false
  }

  const domain = email.toLowerCase().split('@')[1]
  if (!domain) {
    return false
  }

  return DISPOSABLE_DOMAINS.has(domain)
}

/**
 * Validate email format using regex
 */
export function isValidEmailFormat(email: string): boolean {
  if (!email || typeof email !== 'string') {
    return false
  }

  // RFC 5322 compliant email regex (simplified version)
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/

  return emailRegex.test(email)
}

/**
 * Comprehensive email validation
 * Returns { valid: boolean, reason?: string }
 */
export function validateEmail(email: string): { valid: boolean; reason?: string } {
  // Check format
  if (!isValidEmailFormat(email)) {
    return {
      valid: false,
      reason: 'Invalid email format',
    }
  }

  // Check for disposable email
  if (isDisposableEmail(email)) {
    return {
      valid: false,
      reason: 'Disposable email addresses are not allowed. Please use a permanent email address.',
    }
  }

  // Check email length
  if (email.length > 254) {
    return {
      valid: false,
      reason: 'Email address is too long',
    }
  }

  // Check for common typos in popular domains
  const domain = email.toLowerCase().split('@')[1]
  const commonTypos: Record<string, string> = {
    'gmial.com': 'gmail.com',
    'gmai.com': 'gmail.com',
    'gmil.com': 'gmail.com',
    'yahooo.com': 'yahoo.com',
    'yaho.com': 'yahoo.com',
    'hotmial.com': 'hotmail.com',
    'outlok.com': 'outlook.com',
  }

  if (commonTypos[domain]) {
    return {
      valid: false,
      reason: `Did you mean ${commonTypos[domain]}?`,
    }
  }

  return { valid: true }
}

/**
 * Additional validation: Check if email has been used too many times (rate limiting by email)
 * This can be used in conjunction with database checks
 */
export function normalizeEmail(email: string): string {
  if (!email || typeof email !== 'string') {
    return email
  }

  // Normalize email for comparison
  // Remove dots from Gmail addresses (gmail ignores dots)
  // Convert to lowercase
  const [localPart, domain] = email.toLowerCase().split('@')

  if (domain === 'gmail.com' || domain === 'googlemail.com') {
    // Remove dots from Gmail local part
    const normalizedLocal = localPart.replace(/\./g, '')
    return `${normalizedLocal}@gmail.com`
  }

  return email.toLowerCase()
}

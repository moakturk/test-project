/**
 * Application-wide constants
 * Centralized configuration for reusable values
 */

// Company Information
export const COMPANY = {
  NAME: 'Automexus',
  TAGLINE: 'AI-Powered Business Automation',
  DESCRIPTION: 'Transform your business with intelligent automation solutions',
  FOUNDED: '2024',
} as const

// Contact Information
export const CONTACT = {
  EMAIL: 'info@automexus.com',
  PHONE: '+1 (555) 000-0000',
  ADDRESS: {
    STREET: '',
    CITY: '',
    STATE: '',
    ZIP: '',
    COUNTRY: 'United States',
  },
} as const

// Website URLs
export const URLS = {
  BASE: 'https://automexus.com',
  SOCIAL: {
    LINKEDIN: 'https://linkedin.com/company/automexus',
    TWITTER: 'https://twitter.com/automexus',
    FACEBOOK: 'https://facebook.com/automexus',
    GITHUB: 'https://github.com/automexus',
  },
} as const

// SEO Metadata
export const SEO = {
  TITLE_TEMPLATE: '%s | Automexus',
  DEFAULT_TITLE: 'Automexus - AI-Powered Business Automation',
  DEFAULT_DESCRIPTION: 'Transform your business with intelligent automation solutions powered by cutting-edge AI technology.',
  DEFAULT_KEYWORDS: [
    'business automation',
    'AI automation',
    'process automation',
    'workflow automation',
    'intelligent automation',
    'RPA',
    'artificial intelligence',
    'machine learning',
  ],
  OG_IMAGE: '/og-image.png',
  OG_IMAGE_WIDTH: 1200,
  OG_IMAGE_HEIGHT: 630,
} as const

// Rate Limiting
export const RATE_LIMIT = {
  CONTACT_FORM: {
    MAX_REQUESTS: 3,
    WINDOW_MS: 60000, // 1 minute
  },
  API: {
    MAX_REQUESTS: 100,
    WINDOW_MS: 900000, // 15 minutes
  },
} as const

// Form Validation
export const VALIDATION = {
  NAME_MIN_LENGTH: 2,
  NAME_MAX_LENGTH: 100,
  EMAIL_MAX_LENGTH: 255,
  MESSAGE_MIN_LENGTH: 10,
  MESSAGE_MAX_LENGTH: 5000,
  PHONE_MAX_LENGTH: 20,
  COMPANY_MAX_LENGTH: 100,
} as const

// API Response Messages
export const MESSAGES = {
  SUCCESS: {
    CONTACT_FORM: 'Thank you for contacting us! We will get back to you soon.',
    UPDATED: 'Updated successfully.',
    DELETED: 'Deleted successfully.',
  },
  ERROR: {
    GENERIC: 'Something went wrong. Please try again later.',
    RATE_LIMIT: 'Too many requests. Please try again later.',
    CSRF_MISSING: 'CSRF token missing. Please refresh the page and try again.',
    CSRF_INVALID: 'Invalid CSRF token. Please refresh the page and try again.',
    VALIDATION: 'Validation error. Please check your input.',
    UNAUTHORIZED: 'Unauthorized access.',
    NOT_FOUND: 'Resource not found.',
    DATABASE: 'Database error occurred.',
    EMAIL_SEND: 'Failed to send email.',
  },
} as const

// Status Types
export const STATUS = {
  CONTACT: {
    NEW: 'new',
    IN_PROGRESS: 'in-progress',
    RESOLVED: 'resolved',
  },
} as const

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 20,
  MAX_PAGE_SIZE: 100,
} as const

// Analytics Events
export const ANALYTICS_EVENTS = {
  CONTACT_FORM_SUBMIT: 'contact_form_submit',
  PAGE_VIEW: 'page_view',
  BUTTON_CLICK: 'button_click',
  LINK_CLICK: 'link_click',
} as const

// Time Constants
export const TIME = {
  ONE_SECOND: 1000,
  ONE_MINUTE: 60000,
  ONE_HOUR: 3600000,
  ONE_DAY: 86400000,
  ONE_WEEK: 604800000,
  ONE_MONTH: 2592000000,
  ONE_YEAR: 31536000000,
} as const

// Cache Duration
export const CACHE = {
  STATIC_ASSETS: TIME.ONE_YEAR,
  API_RESPONSE: TIME.ONE_MINUTE * 5,
  IMAGE: TIME.ONE_YEAR,
} as const

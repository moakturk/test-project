// Simple in-memory rate limiter for serverless
// Note: This is basic. For production, consider Vercel KV or Upstash

interface RateLimitStore {
  [key: string]: {
    count: number
    resetTime: number
  }
}

const store: RateLimitStore = {}

// Clean up old entries every 10 minutes
setInterval(() => {
  const now = Date.now()
  Object.keys(store).forEach((key) => {
    if (store[key].resetTime < now) {
      delete store[key]
    }
  })
}, 10 * 60 * 1000)

export interface RateLimitResult {
  success: boolean
  limit: number
  remaining: number
  reset: number
}

export function rateLimit(
  identifier: string,
  limit: number = 3,
  windowMs: number = 60000 // 1 minute default
): RateLimitResult {
  const now = Date.now()
  const key = `rl_${identifier}`

  // Get or create entry
  if (!store[key] || store[key].resetTime < now) {
    store[key] = {
      count: 0,
      resetTime: now + windowMs,
    }
  }

  // Increment count
  store[key].count++

  const remaining = Math.max(0, limit - store[key].count)
  const success = store[key].count <= limit

  return {
    success,
    limit,
    remaining,
    reset: store[key].resetTime,
  }
}

// Get client IP from request
export function getClientIp(request: Request): string {
  // Try various headers (Vercel, Cloudflare, etc.)
  const forwarded = request.headers.get('x-forwarded-for')
  if (forwarded) {
    return forwarded.split(',')[0].trim()
  }

  const realIp = request.headers.get('x-real-ip')
  if (realIp) {
    return realIp
  }

  // Fallback
  return 'unknown'
}

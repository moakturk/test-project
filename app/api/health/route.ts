import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export const dynamic = 'force-dynamic'

/**
 * Health Check Endpoint
 *
 * This endpoint is used by monitoring services to check if the application is running.
 * It performs basic checks on critical services:
 * - Application is running (HTTP 200)
 * - Database connectivity (Supabase)
 * - Environment variables are set
 *
 * Usage:
 * - UptimeRobot: Monitor https://automexus.com/api/health
 * - Alerts: Configure to alert when status != 200
 *
 * Response format:
 * {
 *   "status": "healthy" | "degraded" | "unhealthy",
 *   "timestamp": ISO 8601 timestamp,
 *   "checks": {
 *     "database": "ok" | "error",
 *     "environment": "ok" | "error"
 *   },
 *   "version": "1.0.0"
 * }
 */

interface HealthCheck {
  status: 'healthy' | 'degraded' | 'unhealthy'
  timestamp: string
  checks: {
    database: 'ok' | 'error'
    environment: 'ok' | 'error'
  }
  version: string
  uptime?: number
}

export async function GET() {
  const startTime = Date.now()

  const healthCheck: HealthCheck = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    checks: {
      database: 'ok',
      environment: 'ok',
    },
    version: '1.0.0',
  }

  // Check environment variables
  const requiredEnvVars = [
    'NEXT_PUBLIC_SUPABASE_URL',
    'NEXT_PUBLIC_SUPABASE_ANON_KEY',
  ]

  const missingEnvVars = requiredEnvVars.filter(
    (varName) => !process.env[varName]
  )

  if (missingEnvVars.length > 0) {
    healthCheck.checks.environment = 'error'
    healthCheck.status = 'degraded'
  }

  // Check database connectivity
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    // Simple query to check database connectivity
    const { error } = await supabase
      .from('contacts')
      .select('count')
      .limit(1)
      .single()

    if (error && error.code !== 'PGRST116') {
      // PGRST116 = no rows returned (acceptable)
      healthCheck.checks.database = 'error'
      healthCheck.status = 'unhealthy'
    }
  } catch {
    healthCheck.checks.database = 'error'
    healthCheck.status = 'unhealthy'
  }

  // Add response time
  healthCheck.uptime = Date.now() - startTime

  // Return appropriate status code
  const statusCode = healthCheck.status === 'healthy' ? 200 : 503

  return NextResponse.json(healthCheck, {
    status: statusCode,
    headers: {
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0',
    },
  })
}

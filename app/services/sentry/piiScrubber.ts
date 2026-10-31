import type { Breadcrumb, ErrorEvent } from "@sentry/react-native"

const BEARER_REGEX = /Bearer\s+[A-Za-z0-9-_=.]+/gi
const AU_PHONE_REGEX = /\b(?:\+?61|0)[2-478](?:[ -]?\d){8}\b/g
const AU_BSB_REGEX = /\b\d{3}[-\s]\d{3}\b/g

const SENSITIVE_KEY_REGEX = /password|secret|token|authorization|cookie|bsb|accountnumber/i

function sanitizeString(str: string): string {
  return str
    .replace(BEARER_REGEX, "Bearer [REDACTED]")
    .replace(AU_PHONE_REGEX, "[REDACTED_PHONE]")
    .replace(AU_BSB_REGEX, "[REDACTED_BSB]")
}

function sanitizeObject(target: unknown, depth = 0): unknown {
  if (depth > 4 || target === null || target === undefined) return target
  if (typeof target === "string") return sanitizeString(target)
  if (Array.isArray(target)) return target.map((item) => sanitizeObject(item, depth + 1))
  if (typeof target === "object") {
    const record = target as Record<string, unknown>
    const result: Record<string, unknown> = {}
    for (const [key, value] of Object.entries(record)) {
      if (SENSITIVE_KEY_REGEX.test(key)) {
        result[key] = "[REDACTED]"
      } else {
        result[key] = sanitizeObject(value, depth + 1)
      }
    }
    return result
  }
  return target
}

/**
 * Strips PII and secrets from Sentry Event before sending
 */
export function scrubEvent(event: ErrorEvent): ErrorEvent {
  if (event.request?.headers) {
    const headers = { ...event.request.headers }
    for (const key of Object.keys(headers)) {
      if (SENSITIVE_KEY_REGEX.test(key)) {
        headers[key] = "[REDACTED]"
      }
    }
    event.request.headers = headers
  }

  if (event.request?.data) {
    event.request.data = sanitizeObject(event.request.data)
  }

  if (event.extra) {
    event.extra = sanitizeObject(event.extra) as Record<string, unknown>
  }

  if (event.user) {
    // Redact direct PII from user context while preserving non-identifying id
    const { id, username } = event.user
    event.user = {
      id,
      username: username ? sanitizeString(username) : undefined,
    }
  }

  return event
}

/**
 * Strips sensitive data from Sentry breadcrumbs
 */
export function scrubBreadcrumb(breadcrumb: Breadcrumb): Breadcrumb | null {
  if (breadcrumb.data) {
    const sanitizedData = sanitizeObject(breadcrumb.data) as Record<string, unknown>
    if (sanitizedData.url && typeof sanitizedData.url === "string") {
      sanitizedData.url = sanitizeString(sanitizedData.url)
    }
    breadcrumb.data = sanitizedData
  }

  if (breadcrumb.message) {
    breadcrumb.message = sanitizeString(breadcrumb.message)
  }

  return breadcrumb
}

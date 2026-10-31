import * as Sentry from "@sentry/react-native"

import Config from "@/config"
import { Reactotron } from "@/devtools/ReactotronClient"
import { scrubBreadcrumb, scrubEvent } from "@/services/sentry/piiScrubber"
import { routingInstrumentation } from "@/services/sentry/sentryIntegration"

/**
 * Initializes Sentry crash reporting and performance monitoring service
 */
export const initCrashReporting = () => {
  try {
    Sentry.init({
      dsn: Config.sentryDsn,
      enabled: Config.sentryEnabled,
      debug: false,
      tracesSampleRate: __DEV__ ? 1.0 : 0.2,
      integrations: [routingInstrumentation],
      beforeSend: scrubEvent,
      beforeBreadcrumb: scrubBreadcrumb,
    })
  } catch {
    // Sentry initialization failure must never block application startup
  }
}

/**
 * Error classifications used to sort errors on error reporting services.
 */
export enum ErrorType {
  FATAL = "Fatal",
  HANDLED = "Handled",
}

/**
 * Manually report a handled or fatal error.
 */
export const reportCrash = (error: Error, type: ErrorType = ErrorType.FATAL) => {
  if (__DEV__) {
    const message = error.message || "Unknown Error"
    Reactotron.error?.(message, error.stack)
  }

  if (Config.sentryEnabled) {
    Sentry.captureException(error, {
      tags: {
        errorType: type,
      },
    })
  }
}

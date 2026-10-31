import * as Sentry from "@sentry/react-native"

/**
 * Routing instrumentation for React Navigation 7
 */
export const routingInstrumentation = Sentry.reactNavigationIntegration({
  enableTimeToInitialDisplay: true,
})

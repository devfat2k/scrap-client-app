export interface ConfigBaseProps {
  persistNavigation: "always" | "dev" | "prod" | "never"
  catchErrors: "always" | "dev" | "prod" | "never"
  exitRoutes: string[]
  sentryDsn: string
  sentryEnabled: boolean
}

export type PersistNavigationConfig = ConfigBaseProps["persistNavigation"]

const BaseConfig: ConfigBaseProps = {
  // This feature is particularly useful in development mode, but
  // can be used in production as well if you prefer.
  persistNavigation: "dev",

  /**
   * Only enable if we're catching errors in the right environment
   */
  catchErrors: "always",

  /**
   * This is a list of all the route names that will exit the app if the back button
   * is pressed while in that screen. Only affects Android.
   */
  exitRoutes: ["Welcome"],

  /**
   * Sentry crash reporting configuration
   */
  sentryDsn:
    "https://9f1ba4a6b090be39ebbace00b39e44c1@o4512221424517120.ingest.us.sentry.io/4512349519740928",
  sentryEnabled: !__DEV__,
}

export default BaseConfig

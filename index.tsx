import "@expo/metro-runtime" // this is for fast refresh on web w/o expo-router
import * as Sentry from "@sentry/react-native"
import { registerRootComponent } from "expo"

import { App } from "@/app"
import { initCrashReporting } from "@/utils/crashReporting"

initCrashReporting()

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(Sentry.wrap(App))

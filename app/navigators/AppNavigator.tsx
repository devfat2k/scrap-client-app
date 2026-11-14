/**
 * The app navigator (formerly "AppNavigator" and "MainNavigator") is used for the primary
 * navigation flows of your app.
 * Generally speaking, it will contain an auth flow (registration, login, forgot password)
 * and a "main" flow which the user will use once logged in.
 */
import { useEffect } from "react"
import { BackHandler } from "react-native"
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"

import Config from "@/config"
import { ErrorBoundary } from "@/screens/ErrorScreen/ErrorBoundary"
import { WelcomeScreen } from "@/screens/WelcomeScreen"
import { routingInstrumentation } from "@/services/sentry/sentryIntegration"
import { useAppTheme } from "@/theme/context"
import { showToast } from "@/utils/toastService"

import type { AppStackParamList, NavigationProps } from "./navigationTypes"
import { navigationRef, useBackButtonHandler } from "./navigationUtilities"

/**
 * This is a list of all the route names that will exit the app if the back button
 * is pressed while in that screen. Only affects Android.
 */
const exitRoutes = Config.exitRoutes

// Documentation: https://reactnavigation.org/docs/stack-navigator/
const Stack = createNativeStackNavigator<AppStackParamList>()

const AppStack = () => {
  const {
    theme: { colors },
  } = useAppTheme()

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        navigationBarColor: colors.background,
        contentStyle: {
          backgroundColor: colors.background,
        },
      }}
    >
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
    </Stack.Navigator>
  )
}

export const AppNavigator = (props: NavigationProps) => {
  const { navigationTheme } = useAppTheme()

  useBackButtonHandler((routeName) => exitRoutes.includes(routeName))

  useEffect(() => {
    let backPressCount = 0
    let resetTimeout: ReturnType<typeof setTimeout> | null = null

    const onBackPress = () => {
      if (!navigationRef.isReady()) {
        return false
      }

      const state = navigationRef.getRootState()
      const currentRoute = state?.routes[state.index]?.name

      if (currentRoute === "MainTab") {
        backPressCount++

        if (backPressCount === 2) {
          BackHandler.exitApp()
          return true
        }

        showToast({
          type: "NORMAL",
          message: "Click back again to exit the app",
          duration: 2000,
          animationDuration: 300,
        })

        if (resetTimeout) {
          clearTimeout(resetTimeout)
        }
        resetTimeout = setTimeout(() => {
          backPressCount = 0
        }, 2000)

        return true
      }

      // Nếu không ở MainTab, cho phép back bình thường
      if (navigationRef.canGoBack()) {
        navigationRef.goBack()
        return true
      }
      return false
    }

    const backHandler = BackHandler.addEventListener("hardwareBackPress", onBackPress)

    return () => {
      backHandler.remove()
      if (resetTimeout) {
        clearTimeout(resetTimeout)
      }
    }
  }, [])
  return (
    <NavigationContainer
      ref={navigationRef}
      theme={navigationTheme}
      {...props}
      onReady={(...args) => {
        routingInstrumentation.registerNavigationContainer(navigationRef)
        props.onReady?.(...args)
      }}
    >
      <ErrorBoundary catchErrors={Config.catchErrors}>
        <AppStack />
      </ErrorBoundary>
    </NavigationContainer>
  )
}

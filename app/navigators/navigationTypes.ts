import { ComponentProps } from "react"
import { NavigationContainer, NavigatorScreenParams } from "@react-navigation/native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"

export type HomeStackParamList = {
  HomeScreen: undefined
}

export type HistoryStackParamList = {
  HistoryScreen: undefined
  OrderDetailScreen: { orderId: string }
}

export type AccountStackParamList = {
  AccountScreen: undefined
}

export type AuthStackParamList = {
  SignInScreen: undefined
}

export type RequestStackParamList = {
  CreateRequestScreen: undefined
  RequestSuccessScreen: { requestId: string }
}

export type MainTabParamList = {
  HomeTab: NavigatorScreenParams<HomeStackParamList> | undefined
  HistoryTab: NavigatorScreenParams<HistoryStackParamList> | undefined
  AccountTab: NavigatorScreenParams<AccountStackParamList> | undefined
}

// App Stack Navigator types
export type AppStackParamList = {
  Splash: undefined
  MainTab: NavigatorScreenParams<MainTabParamList> | undefined
  Auth: NavigatorScreenParams<AuthStackParamList> | undefined
  Request: NavigatorScreenParams<RequestStackParamList> | undefined
  Welcome: undefined
  Login: undefined
  // 🔥 Your screens go here
  // IGNITE_GENERATOR_ANCHOR_APP_STACK_PARAM_LIST
}

export type AppStackScreenProps<T extends keyof AppStackParamList> = NativeStackScreenProps<
  AppStackParamList,
  T
>

export interface NavigationProps extends Partial<
  ComponentProps<typeof NavigationContainer<AppStackParamList>>
> {}

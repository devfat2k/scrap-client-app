import { ErrorInfo } from "react"
import { ScrollView, TextStyle, View, ViewStyle } from "react-native"
import { StatusBar } from "expo-status-bar"

import { Button } from "@/components/Button"
import { Icon } from "@/components/Icon"
import { Text } from "@/components/Text"
import { useAppTheme } from "@/theme/context"
import type { ThemedStyle } from "@/theme/types"
import { useSafeAreaInsetsStyle } from "@/utils/useSafeAreaInsetsStyle"

export interface ErrorDetailsProps {
  error: Error
  errorInfo: ErrorInfo | null
  onReset(): void
}

/**
 * Renders the error details screen.
 * @param {ErrorDetailsProps} props - The props for the `ErrorDetails` component.
 * @returns {JSX.Element} The rendered `ErrorDetails` component.
 */
export function ErrorDetails(props: ErrorDetailsProps) {
  const { themed, themeContext } = useAppTheme()
  const containerInsets = useSafeAreaInsetsStyle(["top", "bottom"])
  return (
    <View style={[themed(styles.$container), containerInsets]}>
      <StatusBar style={themeContext === "dark" ? "light" : "dark"} />
      <View style={themed(styles.$contentContainer)}>
        <View style={styles.$topSection}>
          <Icon icon="ladybug" size={64} />
          <Text style={themed(styles.$heading)} preset="subheading" tx="errorScreen:title" />
          <Text tx="errorScreen:friendlySubtitle" />
        </View>

        <ScrollView
          style={themed(styles.$errorSection)}
          contentContainerStyle={themed(styles.$errorSectionContentContainer)}
        >
          <Text style={themed(styles.$errorContent)} weight="bold" text={`${props.error}`.trim()} />
          <Text
            selectable
            style={themed(styles.$errorBacktrace)}
            text={`${props.errorInfo?.componentStack ?? ""}`.trim()}
          />
        </ScrollView>

        <Button
          preset="reversed"
          style={themed(styles.$resetButton)}
          onPress={props.onReset}
          tx="errorScreen:reset"
        />
      </View>
    </View>
  )
}

const styles = {
  $container: (({ colors }) => ({
    flex: 1,
    backgroundColor: colors.background,
  })) as ThemedStyle<ViewStyle>,
  $contentContainer: (({ spacing }) => ({
    alignItems: "center",
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
    flex: 1,
  })) as ThemedStyle<ViewStyle>,

  $topSection: {
    flex: 1,
    alignItems: "center",
  } as ViewStyle,

  $heading: (({ colors, spacing }) => ({
    color: colors.error,
    marginBottom: spacing.md,
  })) as ThemedStyle<TextStyle>,

  $errorSection: (({ colors, spacing }) => ({
    flex: 2,
    backgroundColor: colors.separator,
    marginVertical: spacing.md,
    borderRadius: 6,
  })) as ThemedStyle<ViewStyle>,

  $errorSectionContentContainer: (({ spacing }) => ({
    padding: spacing.md,
  })) as ThemedStyle<ViewStyle>,

  $errorContent: (({ colors }) => ({
    color: colors.error,
  })) as ThemedStyle<TextStyle>,

  $errorBacktrace: (({ colors, spacing }) => ({
    marginTop: spacing.md,
    color: colors.textDim,
  })) as ThemedStyle<TextStyle>,

  $resetButton: (({ colors, spacing }) => ({
    backgroundColor: colors.error,
    paddingHorizontal: spacing.xxl,
  })) as ThemedStyle<ViewStyle>,
}

import { ErrorInfo } from "react"
import { ScrollView, View } from "react-native"
import { StatusBar } from "expo-status-bar"

import { Button } from "@/components/Button"
import { Icon } from "@/components/Icon"
import { Text } from "@/components/Text"
import { useAppTheme } from "@/theme/context"
import type { Theme } from "@/theme/types"
import { useStyles } from "@/theme/useStyles"
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
  const styles = useStyles(createStyles)

  const { themeContext } = useAppTheme()
  const containerInsets = useSafeAreaInsetsStyle(["top", "bottom"])
  return (
    <View style={[styles.container, containerInsets]}>
      <StatusBar style={themeContext === "dark" ? "light" : "dark"} />
      <View style={styles.contentContainer}>
        <View style={styles.topSection}>
          <Icon icon="ladybug" size={64} />
          <Text style={styles.heading} preset="subheading" tx="errorScreen:title" />
          <Text tx="errorScreen:friendlySubtitle" />
        </View>

        <ScrollView
          style={styles.errorSection}
          contentContainerStyle={styles.errorSectionContentContainer}
        >
          <Text style={styles.errorContent} weight="bold" text={`${props.error}`.trim()} />
          <Text
            selectable
            style={styles.errorBacktrace}
            text={`${props.errorInfo?.componentStack ?? ""}`.trim()}
          />
        </ScrollView>

        <Button
          preset="reversed"
          style={styles.resetButton}
          onPress={props.onReset}
          tx="errorScreen:reset"
        />
      </View>
    </View>
  )
}

const createStyles = ({ colors, spacing }: Theme) =>
  ({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    contentContainer: {
      alignItems: "center",
      paddingHorizontal: spacing.lg,
      paddingTop: spacing.xl,
      flex: 1,
    },
    topSection: {
      flex: 1,
      alignItems: "center",
    },
    heading: {
      color: colors.error,
      marginBottom: spacing.md,
    },
    errorSection: {
      flex: 2,
      backgroundColor: colors.separator,
      marginVertical: spacing.md,
      borderRadius: 6,
    },
    errorSectionContentContainer: {
      padding: spacing.md,
    },
    errorContent: {
      color: colors.error,
    },
    errorBacktrace: {
      marginTop: spacing.md,
      color: colors.textDim,
    },
    resetButton: {
      backgroundColor: colors.error,
      paddingHorizontal: spacing.xxl,
    },
  }) as const

import { useState } from "react"
import { Pressable, View } from "react-native"
import DateTimePicker from "@react-native-community/datetimepicker"

import { Button } from "@/components/Button"
import { Text } from "@/components/Text"
import { translate } from "@/i18n/translate"
import { useAppTheme } from "@/theme/context"
import { useStyles } from "@/theme/useStyles"

import { createStyles } from "../styles/collectionTimeSheetStyles"

type PickerMode = "date" | "time"

interface CollectionTimePickerProps {
  value: Date
  minimumDate: Date
  onChange: (date: Date) => void
  onCancel: () => void
  onConfirm: () => void
}

/** iOS wheels share one draft; changing either part preserves the other. */
export function CollectionTimePicker(props: CollectionTimePickerProps) {
  const { value, minimumDate, onChange, onCancel, onConfirm } = props
  const [mode, setMode] = useState<PickerMode>("date")
  const { themeContext } = useAppTheme()
  const styles = useStyles(createStyles)

  function selectValue(selected: Date) {
    const next = new Date(value)
    if (mode === "date") {
      next.setFullYear(selected.getFullYear(), selected.getMonth(), selected.getDate())
    } else {
      next.setHours(selected.getHours(), selected.getMinutes(), 0, 0)
    }
    onChange(next)
  }

  return (
    <>
      <Text preset="subheading" tx="request:proposedAtLabel" accessibilityRole="header" />
      <View style={styles.tabs} accessibilityRole="tablist">
        {(["date", "time"] as const).map((tab) => (
          <Pressable
            key={tab}
            accessibilityRole="tab"
            accessibilityState={{ selected: mode === tab }}
            onPress={() => setMode(tab)}
            style={({ pressed }) => [
              styles.tab,
              mode === tab && styles.tabSelected,
              pressed && styles.tabPressed,
            ]}
          >
            <Text
              tx={tab === "date" ? "request:collectionDate" : "request:collectionTime"}
              weight={mode === tab ? "semiBold" : "normal"}
            />
          </Pressable>
        ))}
      </View>
      <View style={styles.pickerContainer}>
        <DateTimePicker
          key={mode}
          value={value}
          mode={mode}
          display="spinner"
          themeVariant={themeContext}
          minimumDate={mode === "date" ? minimumDate : undefined}
          onValueChange={(_, date) => selectValue(date)}
          accessibilityLabel={translate(
            mode === "date" ? "request:collectionDate" : "request:collectionTime",
          )}
          style={styles.picker}
        />
      </View>
      <View style={styles.actions}>
        <Button
          preset="default"
          tx="common:cancel"
          onPress={onCancel}
          style={styles.actionSurface}
        />
        <Button
          preset="primary"
          tx="common:done"
          onPress={onConfirm}
          style={styles.actionSurface}
        />
      </View>
    </>
  )
}

const palette = {
  neutral100: "#FFFFFF",
  neutral200: "#F9FAFB", // gray-50: app background
  neutral300: "#F3F4F6", // gray-100: card input bg
  neutral400: "#E5E7EB", // gray-200: borders
  neutral500: "#9CA3AF", // gray-400: muted/placeholder
  neutral600: "#6B7280", // gray-500: secondary text
  neutral700: "#374151", // gray-700: primary content
  neutral800: "#1F2937", // gray-800: headings/titles
  neutral900: "#111827", // gray-900: high contrast

  // Emerald green brand colors (HTML screens #10b981)
  primary100: "#ECFDF5", // emerald-50: light green tint
  primary200: "#D1FAE5", // emerald-100: badge/light border
  primary300: "#6EE7B7", // emerald-300: accent border
  primary400: "#34D399", // emerald-400: light tint
  primary500: "#10B981", // emerald-500: primary action / header
  primary600: "#059669", // emerald-600: active press

  // Status & secondary accents
  secondary100: "#EFF6FF", // blue-50: dispatched / scheduled
  secondary200: "#BFDBFE", // blue-200
  secondary300: "#60A5FA", // blue-400
  secondary400: "#3B82F6", // blue-500: link / active trip
  secondary500: "#1D4ED8", // blue-700: scheduled text

  // Warning & quotes (yellow/amber)
  accent100: "#FEFCE8", // yellow-50
  accent200: "#FEF08A", // yellow-200
  accent300: "#FACC15", // yellow-400
  accent400: "#EAB308", // yellow-500
  accent500: "#CA8A04", // yellow-600

  // Error & cancellations
  angry100: "#FEF2F2", // red-50: cancel button / alert bg
  angry500: "#EF4444", // red-500: error / cancel action

  overlay20: "rgba(17, 24, 39, 0.2)",
  overlay50: "rgba(17, 24, 39, 0.5)",
} as const

export const colors = {
  palette,
  transparent: "rgba(0, 0, 0, 0)",
  text: palette.neutral800,
  textDim: palette.neutral600,
  background: palette.neutral200,
  card: palette.neutral100,
  border: palette.neutral400,
  tint: palette.primary500,
  tintInactive: palette.neutral500,
  separator: palette.neutral400,
  error: palette.angry500,
  errorBackground: palette.angry100,
} as const

const palette = {
  neutral900: "#FFFFFF",
  neutral800: "#F9FAFB",
  neutral700: "#E5E7EB",
  neutral600: "#9CA3AF",
  neutral500: "#6B7280",
  neutral400: "#374151",
  neutral300: "#1F2937",
  neutral200: "#111827", // dark background
  neutral100: "#0B0F19", // deep dark card

  // Emerald dark variants
  primary600: "#ECFDF5",
  primary500: "#34D399",
  primary400: "#10B981",
  primary300: "#059669",
  primary200: "#047857",
  primary100: "#064E3B",

  secondary500: "#EFF6FF",
  secondary400: "#60A5FA",
  secondary300: "#3B82F6",
  secondary200: "#1D4ED8",
  secondary100: "#1E3A8A",

  accent500: "#FEFCE8",
  accent400: "#FACC15",
  accent300: "#EAB308",
  accent200: "#CA8A04",
  accent100: "#713F12",

  angry100: "#450A0A",
  angry500: "#EF4444",

  overlay20: "rgba(0, 0, 0, 0.4)",
  overlay50: "rgba(0, 0, 0, 0.7)",
} as const

export const colors = {
  palette,
  transparent: "rgba(0, 0, 0, 0)",
  text: palette.neutral800,
  textDim: palette.neutral600,
  background: palette.neutral200,
  card: palette.neutral100,
  border: palette.neutral400,
  tint: palette.primary400,
  tintInactive: palette.neutral500,
  separator: palette.neutral400,
  error: palette.angry500,
  errorBackground: palette.angry100,
} as const

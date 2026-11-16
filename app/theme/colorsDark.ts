const palette = {
  neutral900: "#FFFFFF",
  neutral800: "#F8FAFC",
  neutral700: "#E2E8F0",
  neutral600: "#94A3B8",
  neutral500: "#64748B",
  neutral400: "#334155", // viền sáng rõ hơn trên nền tối
  neutral300: "#263548", // nền input / khối phụ
  neutral200: "#0F172A", // nền chính (xanh đen dịu mắt, không bị tối đặc)
  neutral100: "#1E293B", // nền card nổi bật, sáng hơn nền chính

  // Vibrant Green biến thể phát sáng nhẹ trên nền tối
  primary600: "#F0FDF4",
  primary500: "#4ADE80", // xanh lá neon dịu, nổi bật trên nền tối
  primary400: "#22C55E", // màu nhấn chính (tint)
  primary300: "#16A34A",
  primary200: "#15803D",
  primary100: "#14532D",

  // Sky Blue sáng cho Dark Mode
  secondary500: "#F0F9FF",
  secondary400: "#38BDF8",
  secondary300: "#0EA5E9",
  secondary200: "#0284C7",
  secondary100: "#0C4A6E",

  // Sunny Yellow / Amber cho Dark Mode
  accent500: "#FEFCE8",
  accent400: "#FACC15",
  accent300: "#F59E0B",
  accent200: "#D97706",
  accent100: "#78350F",

  // Coral Rose cho Dark Mode
  angry100: "#4C0519",
  angry500: "#FB7185", // hồng đỏ sáng giúp dễ đọc trên nền tối

  overlay20: "rgba(15, 23, 42, 0.4)",
  overlay50: "rgba(15, 23, 42, 0.7)",
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

const palette = {
  neutral100: "#FFFFFF",
  neutral200: "#F8FAFC", // slate-50: nền app sáng thoáng hơn
  neutral300: "#F1F5F9", // slate-100: nền ô nhập liệu / khối phụ
  neutral400: "#E2E8F0", // slate-200: viền mảnh, sáng
  neutral500: "#94A3B8", // slate-400: chữ gợi ý (placeholder)
  neutral600: "#64748B", // slate-500: chữ phụ
  neutral700: "#334155", // slate-700: nội dung chính
  neutral800: "#1E293B", // slate-800: tiêu đề
  neutral900: "#0F172A", // slate-900: tương phản cao

  // Vibrant Eco Green (Tươi sáng, đồng điệu với nhóm green trong HTML)
  primary100: "#F0FDF4", // green-50: nền xanh siêu nhạt
  primary200: "#DCFCE7", // green-100: nền badge / viền nhạt
  primary300: "#86EFAC", // green-300: viền nhấn
  primary400: "#4ADE80", // green-400: xanh lá sáng
  primary500: "#22C55E", // green-500: nút bấm chính / header tươi sáng
  primary600: "#16A34A", // green-600: trạng thái nhấn (active/press)

  // Secondary: Sky Blue tươi sáng (thay cho blue trầm)
  secondary100: "#F0F9FF", // sky-50: nền trạng thái điều phối
  secondary200: "#BAE6FD", // sky-200
  secondary300: "#38BDF8", // sky-400
  secondary400: "#0EA5E9", // sky-500: link / chuyến xe đang chạy
  secondary500: "#0284C7", // sky-600: chữ lịch hẹn

  // Warning & quotes: Sunny Amber / Yellow tươi tắn
  accent100: "#FEFCE8", // yellow-50: nền thông báo báo giá
  accent200: "#FEF08A", // yellow-200: viền cảnh báo
  accent300: "#FACC15", // yellow-400: chấm trạng thái
  accent400: "#F59E0B", // amber-500: nhấn mạnh
  accent500: "#D97706", // amber-600: chữ trạng thái báo giá rõ nét

  // Error & cancellations: Coral / Rose Red hiện đại
  angry100: "#FFF1F2", // rose-50: nền nút hủy đơn
  angry500: "#F43F5E", // rose-500: chữ/icon hủy đơn & báo lỗi

  overlay20: "rgba(15, 23, 42, 0.18)",
  overlay50: "rgba(15, 23, 42, 0.45)",
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

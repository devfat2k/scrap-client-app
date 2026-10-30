const SECOND = 1000
const MINUTE = 60 * SECOND
const HOUR = 60 * MINUTE

/** Chọn theo mức độ thay đổi của dữ liệu, không đặt số tay ở từng query. */
export const STALE = {
  NONE: 0, // dữ liệu thời gian thực
  SHORT: 30 * SECOND,
  DEFAULT: MINUTE,
  LONG: 5 * MINUTE, // hồ sơ, cấu hình ít đổi
  FOREVER: Infinity, // chỉ đổi khi invalidate thủ công
} as const

export const CACHE = {
  GC_TIME: 24 * HOUR,
  PERSIST_MAX_AGE: 24 * HOUR, // phải <= GC_TIME
  BUSTER: "v1", // tăng khi đổi hình dạng dữ liệu đã persist
} as const

export const RETRY = {
  MAX: 3,
  KINDS: ["timeout", "cannot-connect", "server"],
} as const

export const PERSIST = {
  THROTTLE_MS: 1000,
  STORAGE_ID: "query-cache",
} as const

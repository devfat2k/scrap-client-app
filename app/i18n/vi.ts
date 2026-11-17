import type { Translations } from "./en"
import homeVi from "./vi/home"
import orderVi from "./vi/order"
import requestVi from "./vi/request"

const vi = {
  common: {
    ok: "OK!",
    cancel: "Hủy",
    done: "Xong",
    back: "Quay lại",
    required: "Bắt buộc",
  },
  ...homeVi,
  ...requestVi,
  ...orderVi,
  welcomeScreen: {
    postscript: "Đây là giao diện mẫu của ứng dụng. Hãy tùy chỉnh theo thiết kế của bạn!",
    readyForLaunch: "Ứng dụng của bạn sắp sẵn sàng ra mắt!",
    exciting: "Thật hào hứng!",
  },
  errorScreen: {
    title: "Đã xảy ra lỗi!",
    friendlySubtitle: "Ứng dụng gặp sự cố. Vui lòng khởi động lại và thử lại.",
    reset: "KHỞI ĐỘNG LẠI",
  },
  emptyStateComponent: {
    generic: {
      heading: "Chưa có dữ liệu",
      content: "Chưa tìm thấy dữ liệu. Hãy làm mới hoặc tải lại ứng dụng.",
      button: "Thử lại",
    },
  },
} satisfies Translations

export default vi

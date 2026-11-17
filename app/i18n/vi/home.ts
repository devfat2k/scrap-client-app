import type homeEn from "../en/home"

const homeVi = {
  home: {
    title: "Thu gom phế liệu thật dễ dàng",
    subtitle: "Cho chúng tôi biết bạn có gì và khi nào có thể đến. Chúng tôi sẽ lo phần còn lại.",
    createRequest: "Tạo yêu cầu thu gom",
    greeting: "Xin chào",
    greetingSubtitle: "Sẵn sàng biến phế liệu thành giá trị?",
    themeAction: "Đổi giao diện",
    languageAction: "Đổi ngôn ngữ",
    language: { title: "Ngôn ngữ", english: "English", vietnamese: "Tiếng Việt" },
    tabs: { home: "Trang chủ", history: "Lịch sử", account: "Tài khoản" },
    notificationsAction: "Thông báo",
    quickActions: {
      myRequests: "Yêu cầu của tôi",
      myRequestsHint: "Theo dõi thu gom",
      howItWorks: "Cách hoạt động",
      howItWorksHint: "3 bước đơn giản",
    },
    recent: { title: "Yêu cầu gần đây" },
    theme: { title: "Giao diện", light: "Sáng", dark: "Tối" },
    notifications: {
      title: "Thông báo",
      emptyTitle: "Chưa có thông báo",
      emptyMessage: "Chúng tôi sẽ thông báo khi yêu cầu của bạn có cập nhật.",
    },
    howItWorks: {
      title: "Cách hoạt động",
      step1Title: "Cho biết bạn có gì",
      step1Body: "Chọn loại và số lượng phế liệu, sau đó thêm ảnh.",
      step2Title: "Chọn thời gian",
      step2Body: "Cho chúng tôi biết khi nào bạn muốn thu gom.",
      step3Title: "Thu gom và thanh toán",
      step3Body: "Đội ngũ của chúng tôi xác nhận chi tiết và thanh toán khi thu gom.",
    },
  },
} satisfies typeof homeEn

export default homeVi

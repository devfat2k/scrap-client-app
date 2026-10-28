# Các câu hỏi còn mở (Open Questions)

Quy tắc cho Claude Code: Nếu một tác vụ phụ thuộc vào bất kỳ mục nào có trạng thái `OPEN` bên dưới, **DỪNG LẠI và hỏi người dùng**. Tuyệt đối không tự ý suy đoán logic nghiệp vụ.

| # | Câu hỏi | Khu vực ảnh hưởng | Trạng thái | Quyết định đã chốt |
|---|---|---|---|---|
| 1 | Hình thức đăng nhập: SĐT + Mật khẩu, OTP SMS hay Magic Link? | Auth | OPEN | |
| 2 | Sau khi tạo tài khoản tự động, khách nhận thông tin đăng nhập qua kênh nào? | Auth, Security | OPEN | |
| 3 | Lần đầu đăng nhập có bắt buộc đổi mật khẩu / kích hoạt tài khoản không? | Auth | OPEN | |
| 9 | SĐT khách vãng lai đã tồn tại trong hệ thống: Tự động gắn đơn vào tài khoản cũ hay yêu cầu xác minh OTP? | Privacy, Form | OPEN | |
| 13 | Danh sách loại phế liệu: Cố định hay lấy động từ API cấu hình? Khách được chọn nhiều loại cùng lúc không? | Form | OPEN | |
| 14 | Bảng quy đổi thể tích trực quan sang số khối (m³) từ backend | Form, Backend | OPEN | |
| 19 | Có kiểm tra khu vực phục vụ (Service Area) theo Postcode khi nhập địa chỉ không? Ngoài vùng thì hiển thị gì? | Form, Flow | OPEN | |
| 22 | Danh sách trạng thái đơn hàng hiển thị cho khách | Toàn app | OPEN | Xem `docs/product/order-status.md` |
| 23 | "Chốt Order" của Reception có cần qua Manager duyệt trước không? | Trạng thái | OPEN | |
| 29 | Khách hàng có được sửa/hủy đơn không? Khóa quyền sửa ở trạng thái nào? | Order Detail | OPEN | Tạm thời: chỉ sửa/hủy khi `NEW` |
| 32 | Triển khai Push Notification qua FCM/APNs khi app đóng | Notification | RESOLVED | Sử dụng FCM/APNs kết hợp WebSocket |
| 36 | Khách chọn hình thức nhận tiền ở đâu? Nhập thông tin tài khoản ngân hàng khi nào? | Profile, Payment | OPEN | |
| 47 | Danh sách các bang phục vụ tại Úc và quy định định danh theo từng bang | Form, Legal | OPEN | |
| 56 | Framework: Expo Dev Client hay Bare React Native CLI? | Kỹ thuật | RESOLVED | Expo SDK 57 dev client + CNG (Ignite 11.5) |
| 57 | Package Manager | Kỹ thuật | RESOLVED | `bun` duy nhất (không dùng npm/yarn/pnpm) |
| 58 | API Client | Kỹ thuật | RESOLVED | `apisauce` (giữ nguyên quy ước Ignite) |
| 59 | Realtime Protocol | Kỹ thuật | RESOLVED | `@stomp/stompjs` qua WebSocket native (không dùng SockJS) |
| 60 | Ngôn ngữ ứng dụng | Kỹ thuật | RESOLVED | Tiếng Anh là chính và duy nhất cho thị trường Úc |

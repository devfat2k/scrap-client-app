# Security & Privacy Rules

- **Dữ liệu cá nhân (PII)**: Ứng dụng xử lý thông tin cá nhân nhạy cảm (Họ tên, SĐT, địa chỉ nhà riêng, ảnh chụp khuôn viên/tài sản). Phải tuân thủ nghiêm ngặt theo đạo luật bảo vệ quyền riêng tư của Úc (Privacy Act).
- **Log an toàn**: Không bao giờ log PII, access tokens, refresh tokens hoặc toàn bộ raw payload API vào console hay remote service. Lọc bỏ thông tin nhạy cảm trước khi gửi tới Sentry/Analytics.
- **Giao thức mạng**: Luôn dùng HTTPS. URL của API phải lấy từ file cấu hình môi trường, không hardcode trong source code.
- **Biến môi trường client**: Các biến `EXPO_PUBLIC_*` nằm lộ thiên trong JavaScript bundle của ứng dụng. Tuyệt đối không lưu secret, private key, token quản trị tại đây.
- **Tài khoản ngân hàng**: BSB và số tài khoản ngân hàng (nếu có) phải được che (mask) trên UI và không được lưu dạng plain text ở log.
- **Ủy quyền dữ liệu**: Khách vãng lai và người dùng đã đăng nhập tuyệt đối không được truy cập đơn hàng của người khác. Không tin cậy hoàn toàn phía client cho phân quyền.

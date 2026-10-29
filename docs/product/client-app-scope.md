# Phạm vi App Khách hàng (Client App Scope)

Nguồn: Báo cáo App Client (27/10/2026), SRS Client + Reception flow, SRS tổng thể.

## 1. Mục tiêu
Người dân tại Úc đặt lịch thu mua phế liệu tận nơi và theo dõi trạng thái đơn hàng. App là "thin client": tạo yêu cầu, theo dõi tiến độ, nhận thông báo, xem biên nhận.

## 2. KHÔNG thuộc phạm vi app (Out of Scope)
- Thương lượng hay đàm phán giá trên app.
- Thanh toán trực tuyến trong app (thanh toán do tài xế/thủ quỹ trả trực tiếp bằng tiền mặt hoặc chuyển khoản).
- Bản đồ dẫn đường hay hiển thị bản đồ phức tạp.
- Hệ thống chat/nhắn tin nội bộ.
- Phiên bản Web.
- Ứng dụng dành cho Driver / Collaborator (dự án riêng biệt, phát triển sau).

## 3. Nhóm người dùng
- **Khách vãng lai (Guest)**: Chưa có tài khoản, gửi yêu cầu với Họ tên + Số điện thoại.
- **Khách có tài khoản**: Tài khoản do hệ thống tự sinh khi bộ phận tiếp nhận (Reception) chốt đơn, hoặc đăng ký sau.
- **Khách bán qua Collaborator**: Có thể không dùng smartphone. Collaborator xác nhận thay kèm lý do bắt buộc.

## 4. Danh sách chức năng

| Mã | Chức năng | Mô tả | Mức ưu tiên |
|---|---|---|---|
| C01 | Tạo yêu cầu thu mua | Chọn loại phế liệu, ước lượng thể tích, tối đa 3 ảnh, địa chỉ tách trường, giờ mong muốn | MVP |
| C02 | Popup khách vãng lai | Nhập Họ tên + SĐT khi chưa đăng nhập | MVP |
| C03 | Màn hình gửi thành công | Ẩn header, không nút Back, hiển thị thông tin tóm tắt và nút sang chi tiết đơn | MVP |
| C04 | Chi tiết đơn: Chờ xử lý | Header xám, text trạng thái "Pending" + icon, đơn giá ghi "Chờ báo giá" (cấm badge, không animation) | MVP |
| C05 | Chi tiết đơn: Đã báo giá | Header xanh lá, text trạng thái "Quote ready" + icon (cấm badge, không animation), giá tạm tính, thể tích/giờ thu công ty chốt, kèm disclaimer | MVP |
| C06 | Đăng nhập & giữ phiên | Xác thực JWT, lưu token an toàn | MVP |
| C07 | Trung tâm thông báo | Lưu lịch sử thông báo, nhận realtime qua WebSocket/Push | MVP |
| C08 | Ngôn ngữ | Tiếng Anh là ngôn ngữ chính duy nhất cho thị trường Úc | MVP |
| C09 | Xử lý mất mạng | Thông báo mất kết nối, chặn gọi API, giữ nguyên dữ liệu form đã nhập | MVP |
| C10 | Danh sách đơn của tôi | Danh sách đơn hàng theo trạng thái, xem lại lịch sử | MVP |
| C11 | Theo dõi sau báo giá | Đã điều xe (Scheduled/Dispatched), đang sắp xếp lại lịch (Rescheduling), hoàn tất (Completed) | MVP |
| C12 | Xem biên nhận (Receipt) | Xem lại hóa đơn/phiếu thu sau khi hoàn tất | Giai đoạn 2 |
| C13 | Xác nhận bán qua CTV | Khách hàng bấm xác nhận đã bán qua cộng tác viên | Khi có app CTV |
| C14 | Phản ánh dịch vụ / CTV | Gửi ý kiến phản hồi | Khi có app CTV |
| C15 | Hồ sơ & Cài đặt cá nhân | Đổi mật khẩu, quản lý địa chỉ, thông tin tài khoản | Sau MVP |

## 5. Quy tắc dữ liệu
- Tối đa 3 ảnh chụp phế liệu, nén phía client trước khi upload.
- Giá trị phân loại lưu dạng tiếng Anh (`mixed`, `plastic`, `glass`, `aluminium`, `paper`, `other`). UI hiển thị qua i18n.
- Thể tích: Khách chọn mô tả trực quan; Backend map sang số thập phân.
- Địa chỉ chia nhỏ trường để phục vụ gom tuyến đường: Unit/House No, Street, Suburb, State, Postcode (đúng 4 số), Country (cố định AUSTRALIA).
- Giá hiển thị trước khi cân luôn là giá tạm tính, bắt buộc có câu miễn trừ trách nhiệm.
- Giờ thu gom ban đầu là giờ khách đề xuất, sau đó được cập nhật bằng giờ công ty chốt.

# Mô hình trạng thái đơn hàng (Order Status Model)

Nguồn sự thật cho `app/domain/orderStatus.ts`. Khi có thay đổi từ team sản phẩm/backend, cập nhật tài liệu này TRƯỚC rồi mới sửa code.

## 1. Danh sách trạng thái

| Giá trị Backend | Khách hàng nhìn thấy | Màu sắc / Header | Ghi chú |
|---|---|---|---|
| `NEW` | Pending | Xám | Chờ báo giá; hiển thị giờ khách đề xuất |
| `CONFIRMED` | Quote ready | Xanh lá | Đã có giá tạm tính, thể tích và giờ thu công ty chốt; disclaimer bắt buộc; animation xuất hiện 1 lần |
| `DISPATCHED` | Scheduled | Xanh dương | Đã phân công tài xế, hiển thị thời gian dự kiến đến |
| `PAID` | Completed | Xanh lá đậm | Đã thu mua và thanh toán xong; cho phép xem receipt |
| `RESCHEDULING` | Rescheduling | Cam | Đang sắp xếp lại lịch sau khi điều phối có sự thay đổi |
| `CANCELLED` | Cancelled | Đỏ xám | Đơn đã bị hủy |

## 2. Quy tắc kỹ thuật
- Enum trạng thái được định nghĩa duy nhất tại `app/domain/orderStatus.ts`.
- Tuyệt đối không so sánh chuỗi trạng thái thô trong màn hình hoặc components.
- Không thể hiện trạng thái chỉ bằng màu sắc: luôn có Icon + Text label đi kèm để đảm bảo Accessibility.
- Nếu server trả về trạng thái lạ chưa được hỗ trợ, app phải fallback về trạng thái chung an toàn (Generic Status), tuyệt đối không để crash màn hình.
- Badge trạng thái không được nhấp nháy/chớp nháy hoặc lặp vô tận. Chỉ cho phép animation nhẹ (fade-in, scale-in) khi trạng thái mới xuất hiện.

## 3. Các điểm còn thảo luận (OPEN)
- Quyền sửa hoặc hủy đơn: Khách được hủy đơn ở trạng thái nào? (Giả định hiện tại: chỉ khi còn ở `NEW`).
- Trạng thái sau khi điều phối thu hồi chuyến (Revoke): Đơn quay về `NEW` hay `CONFIRMED`?
- Luồng duyệt giá: `CONFIRMED` là do Reception chốt trực tiếp hay cần Manager phê duyệt trước?

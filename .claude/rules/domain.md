---
paths:
  - "app/features/**"
  - "app/domain/**"
---
# Domain Rules (Scrap Collection System)

## Yêu cầu thu gom (Request Form)
- **Danh mục phế liệu**: Lưu dạng tiếng Anh (`mixed`, `plastic`, `glass`, `aluminium`, `paper`, `other`). UI hiển thị text qua i18n.
- **Ước lượng thể tích**: Khách chọn mô tả trực quan; Backend chịu trách nhiệm map sang số thập phân (ví dụ: `0.24` m³). Không ép khách tự tính số khối.
- **Hình ảnh**: Tối đa 3 ảnh, nén ngay trên thiết bị trước khi upload, có hiển thị tiến trình và nút thử lại khi lỗi.
- **Địa chỉ tách trường**: Unit/House No, Street Name & Type, Suburb, State (chọn từ danh sách: NSW, VIC, QLD, WA, SA, TAS, ACT, NT), Postcode, Country.
- **Postcode Úc**: Đúng 4 chữ số (lưu ý: SRS ghi 6 số là nhầm lẫn).
- **Quốc gia**: Cố định giá trị `AUSTRALIA`, không cho phép chỉnh sửa.
- **Thời gian mong muốn**: Chỉ là đề xuất của khách; thời gian thu gom thực tế do công ty chốt sau khi khảo sát/liên hệ.

## Khách hàng & Tài khoản
- **Khách vãng lai (Guest)**: Gửi yêu cầu chỉ cần Họ tên + Số điện thoại (qua bottom sheet popup). Backend đối chiếu SĐT đã có hoặc cấp Guest ID.
- **Tạo tài khoản tự động**: Được sinh ra khi công ty xác nhận đơn (CONFIRMED). Chi tiết kích hoạt/đăng nhập tuân theo tài liệu `open-questions.md`.

## Giá cả & Biên nhận (Receipt)
- **Giá tạm tính (Provisional Price)**: Giá khách thấy trước khi cân luôn là tạm tính. BẮT BUỘC hiển thị câu miễn trừ trách nhiệm (disclaimer). Giá cuối cùng chỉ được chốt khi tài xế đến cân thực tế.
- **Thanh toán**: App KHÔNG xử lý thanh toán in-app dưới bất kỳ hình thức nào.

## Trạng thái đơn hàng (Order Status)
- Định nghĩa enum 1 lần duy nhất tại `app/domain/orderStatus.ts`. Tuyệt đối không so sánh chuỗi string thô trong màn hình.
- Trạng thái chưa rõ từ server phải fallback về hiển thị an toàn, không được gây crash màn hình.

## Câu hỏi chưa chốt (OPEN Items)
- Bất kỳ mục nào đánh dấu OPEN trong `docs/product/open-questions.md` KHÔNG ĐƯỢC tự ý đoán mò để code. DỪNG LẠI và đối chất với người dùng.

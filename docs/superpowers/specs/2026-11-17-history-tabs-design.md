# Spec: History Top Tabs và Order Card

- **Ngày:** 2026-11-17.
- **Phase:** `2026-11-mock-flow-mvp`.
- **Trạng thái:** **ĐÃ ĐƯỢC NGƯỜI DÙNG DUYỆT VÀ YÊU CẦU TRIỂN KHAI ngày 2026-11-17.**
- **Nguồn tham khảo:** `docs/app-client-history.html`, màn History hiện tại và domain trạng thái trong ứng dụng.
- **Workflow:** brainstorming và Hallmark cho hướng thiết kế; spec được duyệt trước khi triển khai. Kế hoạch thực hiện và bằng chứng kiểm tra được lưu ở tài liệu plans cùng tên.

## 1. Yêu cầu đã xác nhận và phương án trình duyệt

Người dùng yêu cầu Top Tab phân loại trạng thái bằng `react-native-tab-view` đã cài; Order Card giữ các loại thông tin từ HTML tham khảo nhưng có thiết kế khác, áp dụng Hallmark. Chưa code; người dùng duyệt spec trước khi triển khai. Người dùng đã bỏ yêu cầu agent mở thiết bị/simulator.

**Phương án đề xuất để duyệt toàn bộ:** ba nhóm tab, card có nội dung theo từng nhóm, bổ sung dữ liệu mẫu cần thiết và điều chỉnh tối thiểu cách hiển thị trạng thái/lịch tại Detail để không mâu thuẫn với History. Phương án do agent đề xuất và đã được người dùng duyệt qua yêu cầu “Duyệt và hãy triển khai”.

## 2. Mục tiêu và phạm vi

Khách hàng nhìn nhanh được yêu cầu đang xử lý, giao dịch hoàn thành và yêu cầu đã hủy; đọc thông tin quan trọng của từng đơn và mở đúng chi tiết.

Trong phạm vi:

- Thay danh sách History bằng ba tab và danh sách cuộn riêng cho từng tab.
- Thiết kế lại Order Card và bổ sung dữ liệu mock cho các nhánh nội dung.
- Giữ điều hướng vào OrderDetailScreen theo orderId; sửa tối thiểu status/lịch tại Detail cho trường hợp đang đổi lịch hoặc trạng thái không nhận diện.
- English UI, i18n, font Inter, theme tokens, light/dark và navigation shell hiện có.
- Kiểm tra mã nguồn, `bun run check` và review; agent không mở thiết bị/simulator, không capture UI native.

Ngoài phạm vi: API, auth, persistence qua restart, đồng bộ create/cancel xuyên Home–History–Detail, live tracking/ETA, receipt, đánh giá, tìm kiếm, tab All, số lượng đơn trên tab, thay đổi quyền hủy, màn hình tài xế/cộng tác viên. Không cài dependency, commit hoặc push ở bước viết spec.

**Giới hạn được công khai:** đây là đợt UI + mock, không hoàn thành toàn bộ flow MVP. Tạo đơn hiện chưa đưa vào History; thao tác hủy hiện chỉ cập nhật state ở Detail. Hai hạn chế này không được mô tả như đã xử lý khi bàn giao task.

## 3. Top Tab và hành vi danh sách

| Nhãn UI | Domain status |
| --- | --- |
| In progress | NEW, CONFIRMED, DISPATCHED, RESCHEDULING |
| Completed | PAID |
| Cancelled | CANCELLED |

- Lần mở màn hình mới chọn In progress. Tab rỗng vẫn giữ nguyên, không tự chuyển nhóm.
- Chạm nhãn hoặc vuốt ngang để chuyển tab; tab active có underline và trạng thái selected cho accessibility.
- Header và thanh tab nằm ngoài danh sách cuộn; bottom navigation hiện có được giữ nguyên.
- Giữ vị trí cuộn của từng tab và tab đang chọn trong phiên màn hình, bao gồm khi mở chi tiết rồi quay lại. Không lưu qua restart/remount.
- Ba nhãn chia đều khi đủ chỗ. Khi màn nhỏ hoặc chữ phóng lớn không đủ chỗ, cho tab bar cuộn ngang; không cắt mất nhãn.
- Mỗi tab dùng FlatList với key là orderId, không lồng trong ScrollView cùng chiều.
- Tất cả tab xếp theo createdAt mới nhất trước; cùng timestamp thì dùng id để thứ tự ổn định. Ngày hoàn tất/hủy trên card không thay đổi quy tắc sort.
- Status không nhận diện: đưa vào In progress để không mất đơn, hiện icon chuẩn + `Status unavailable`; không coi là Pending và không cho hành động phụ thuộc trạng thái.

## 4. Thiết kế theo Hallmark, thích nghi cho React Native

Hướng thị giác: dễ đọc như một phiếu thu gom, tiết chế màu, ưu tiên thông tin cần hành động. Giữ Inter và palette của ứng dụng; màu nhấn chủ yếu cho tab active, trạng thái cụ thể và hành động.

- Một bề mặt card trung tính, viền mảnh, bo góc và spacing theo token; không banner trạng thái, viền màu dọc, gradient, card lồng card hoặc bóng đậm.
- ID và ngày gửi là thông tin phụ. Lịch thu gom, số tiền thực nhận hoặc lý do hủy là điểm đọc chính của từng nhóm.
- Status dùng icon chuẩn + text; không badge, emoji, chấm trang trí hoặc nhấp nháy. Completed/Cancelled không lặp lại badge nhãn nhóm.
- Dùng wrapper Text/Button hiện có, vùng chạm tối thiểu 44 đơn vị layout; màu phải được chọn có tương phản đọc được trong cả hai theme.
- Nội dung chính được xuống dòng; không ép card chiều cao cố định. Địa chỉ và lý do dài hiển thị tối đa hai dòng với dấu rút gọn; mã đơn cho xuống dòng khi cần.
- Áp dụng nguyên tắc Hallmark cho app screen; không dùng CSS scaffold, website hero hoặc web lint làm bằng chứng kiểm chứng UI native.

## 5. Nội dung Order Card

### 5.1. In progress

Thứ tự: mã đơn/ngày gửi → status cụ thể nhỏ → lịch thu gom → địa chỉ → tóm tắt loại phế liệu → thông tin tài xế khi phù hợp → gợi ý View details.

| Status | Nội dung lịch |
| --- | --- |
| NEW | `Preferred collection`, dùng proposedAt |
| CONFIRMED, DISPATCHED | `Confirmed collection`, dùng confirmedAt; thiếu thì hiện `Collection time not confirmed` |
| RESCHEDULING | `Collection time being rearranged`; không coi confirmedAt cũ là lịch còn hiệu lực |
| Không nhận diện | `Collection time unavailable`; không suy ra lịch đang có hiệu lực |

- Hai loại phế liệu đầu tiên, ngăn bằng dấu phẩy; nếu còn thì thêm `+N more`.
- Chỉ DISPATCHED có vùng tài xế: tên, biển số, nút Call nếu đủ dữ liệu hợp lệ. Thiếu assignment thì hiện `Driver details unavailable`; thiếu tên/biển số thì bỏ riêng trường thiếu, không bịa dữ liệu.
- Bản thiết kế này không hiển thị tổng báo giá trên card đang xử lý; báo giá và disclaimer ở Detail hiện có. Tránh nhầm giá tạm tính với tiền thực nhận.

### 5.2. Completed

Thứ tự: mã đơn/ngày hoàn tất → tối đa hai dòng vật liệu thực tế (tên, khối lượng, đơn giá) → `+N more` nếu còn → phương thức thanh toán → `Total received` → View details.

- Số tiền thực nhận AUD là điểm nhấn; hiển thị mã tiền tệ rõ ràng, không cần dấu cộng mang tính trang trí.
- Tổng tiền dùng receivedTotalCents của toàn giao dịch, không cộng riêng các dòng đang hiện và không lấy quoteTotalCents thay thế.
- Giá trị 0 là dữ liệu hợp lệ, không coi là thiếu.
- Thiếu ngày hoàn tất: `Completion date unavailable`; không đổi createdAt thành ngày hoàn tất.
- Thiếu actualItems: `Collection breakdown unavailable`; thiếu phương thức: `Payment method unavailable`; thiếu tổng tiền: `Received amount unavailable`.
- View details mở OrderDetailScreen hiện có, không mở hay hứa có receipt. Detail chưa hiển thị đầy đủ settlement là giới hạn của đợt này.

### 5.3. Cancelled

Thứ tự: mã đơn/ngày hủy → `Cancellation reason` → lý do → địa chỉ và loại phế liệu → View details.

Thiếu ngày hủy hiện `Cancellation date unavailable`; thiếu lý do hiện `Reason not available`. Không dùng ngày gửi thay ngày hủy; không làm mờ toàn card khiến khó đọc. Không thêm thao tác hủy/làm lại đơn trên card.

### 5.4. Wireframe nội dung

Các giá trị trong dấu <…> là placeholder bố cục, không phải dữ liệu giao dịch.

```text
My requests
In progress       Completed       Cancelled
━━━━━━━━━━━

┌──────────────────────────────────────┐
│ #<ID>                  Submitted <…> │
│ [icon] Scheduled                    │
│ Confirmed collection                │
│ <Date, time>                        │
│ <Street address>                    │
│ <Suburb, state, postcode>            │
│ <Material>, <Material>               │
│ ─────────────────────────────────── │
│ <Driver name>   <Vehicle plate> Call │
│ View details                        │
└──────────────────────────────────────┘

Completed card
┌──────────────────────────────────────┐
│ #<ID>                 Completed <…> │
│ <Material>          <kg> × <price>   │
│ <Material>          <kg> × <price>   │
│ +<N> more                           │
│ ─────────────────────────────────── │
│ <Payment method>     Total received │
│                        AUD <amount> │
│ View details                        │
└──────────────────────────────────────┘

Cancelled card
┌──────────────────────────────────────┐
│ #<ID>                 Cancelled <…> │
│ Cancellation reason                 │
│ <Reason, up to two lines>           │
│ <Address>                           │
│ <Materials summary>                 │
│ View details                        │
└──────────────────────────────────────┘
```

## 6. Tương tác và nhất quán với Detail

- Vùng chính của card mở OrderDetailScreen với đúng orderId. View details là gợi ý của cùng hành động, không tạo thêm target trùng lặp cho screen reader.
- Call là target riêng, không kích hoạt mở Detail. Với số hợp lệ, không thuộc fixture demo và có ứng dụng hỗ trợ, mở trình quay số; không tự bắt đầu cuộc gọi. Mở không được thì hiện thông báo `Unable to open the phone app`.
- Trong mock phase, số demo luôn được đánh dấu trong dữ liệu, nút Call disabled với nhãn hỗ trợ `Calling unavailable for demo data`; không thử gọi số hư cấu. Khi không có số hợp lệ cũng không tạo link tel.
- Detail dùng cùng cách diễn đạt trạng thái không nhận diện và lịch RESCHEDULING như History; không hiển thị lịch cũ như còn xác nhận. Lịch của PAID/CANCELLED nếu giữ lại ở Detail phải được ghi là lịch thu gom đã ghi nhận, không phải cuộc hẹn sắp tới.
- Quy tắc lịch/status tại Detail phải dùng trạng thái đang hiển thị hiện hành, bao gồm trạng thái sau thao tác hủy cục bộ; không chỉ đọc order.status gốc trong fixture. Điều này không mở rộng sang đồng bộ dữ liệu giữa các màn.
- Không thiết kế lại toàn bộ Detail, không thêm settlement/receipt layout hoặc sửa cancellation policy. Việc rút gọn actualItems ở History vẫn được chỉ rõ bằng +N more dù Detail chưa có đầy đủ breakdown.

## 7. Dữ liệu và luồng hiển thị

Giữ nguồn mock chung đang dùng giữa History và tra cứu Detail; không tạo fixture riêng biệt cho mỗi tab. Luồng: danh sách RequestOrder → sort → phân nhóm theo domain → card → mở Detail bằng id.

Bổ sung các nhóm dữ liệu optional, độc lập với báo giá:

| Nhóm | Trường cần thiết |
| --- | --- |
| driverAssignment | name, vehiclePlate, phone, isDemoContact |
| settlement | completedAt, actualItems, paymentMethod, receivedTotalCents |
| cancellation | cancelledAt, reason |

actualItems dùng category, quantity, unit và unitPriceCents có nghĩa là kết quả thu gom thực tế. Tiền lưu cents, hiển thị AUD. paymentMethod có nhãn English qua i18n; giá trị lạ dùng `Payment method unavailable`.

Thêm fixture đủ sáu trạng thái domain; thông tin giả phải được nhận diện trong code. Trường thiếu và unknown được kiểm tra bằng dữ liệu tạm, không cần tập fake data lớn. Không log dữ liệu liên hệ/địa chỉ, không thêm số tài khoản hoặc ảnh avatar từ dịch vụ ngoài.

## 8. Empty, offline và accessibility

- In progress rỗng: `No requests in progress` / `Requests being processed will appear here.`
- Completed rỗng: `No completed requests` / `Completed collections will appear here.`
- Cancelled rỗng: `No cancelled requests` / `Cancelled requests will appear here.`
- Empty state không có nút không hoạt động, không tự đổi tab.
- Offline vẫn xem được mock; copy không nói đang đọc dữ liệu đã lưu bền vững. Đề xuất `You're offline` / `Showing available requests.`
- Nguồn đồng bộ không thêm loading giả, pull-to-refresh giả hoặc network error giả.
- Tab có tên và selected state; card có orderId, status và hành động mở chi tiết trong accessible label; nút Call có tên tài xế khi có và disabled state tương ứng.
- Text scaling, safe areas, bottom navigation, tương phản và nội dung dài là yêu cầu thiết kế. Phần xác nhận hiển thị/thao tác thực tế do người dùng kiểm tra, không được agent tuyên bố pass từ đọc source.

## 9. Các file dự kiến bị tác động sau khi được duyệt

- `app/screens/History/screens/HistoryScreen.tsx`: ghép header, tabs và danh sách.
- `app/screens/History/components/OrderListRow.tsx`: layout card mới, giữ order/onPress interface.
- Các component/style/helper mới nằm trong module History cho tabs, list, card content và mapping; tên cụ thể được chốt trong implementation plan.
- `app/screens/History/styles/historyScreenStyles.ts`: tách trách nhiệm màn hình và card.
- `app/screens/History/types/order.ts`, `app/screens/History/mocks/historyOrders.ts`: dữ liệu optional và fixtures.
- `app/i18n/en/order.ts`: nhãn tab, card, empty/offline và fallback.
- `app/screens/History/screens/OrderDetailScreen.tsx`, `app/screens/History/components/OrderCollectionCard.tsx` và helper trạng thái/lịch liên quan: nhất quán tối thiểu với History.
- Chưa xác nhận cần đổi package.json/bun.lock. Trước triển khai đối chiếu compatibility bằng package metadata/source; native runtime chưa được xác minh. Không đổi generated ios/android.

## 10. Tiêu chí nghiệm thu và cách kiểm chứng

| Tiêu chí | Bằng chứng agent cung cấp | Người dùng kiểm tra thực tế |
| --- | --- | --- |
| Mapping đủ sáu status, unknown không thành Pending, sort ổn định | Review mapping và kiểm tra logic phù hợp | Các đơn xuất hiện đúng tab |
| Tab tap/swipe, scroll riêng và quay lại đúng vị trí | Review wiring/state và test hiện có nếu bao phủ | Chạm/vuốt/cuộn/back |
| Card đủ nội dung theo nhóm, fallback rõ, không dùng quote làm received | Review data/formatting/fixtures | Thứ bậc và khả năng đọc |
| RESCHEDULING/unknown/đơn kết thúc không bị hiển thị thành lịch sắp tới ở Detail | Review helper và dữ liệu truyền giữa màn | Mở Detail và đối chiếu |
| Card và Call không xung đột; số demo không quay số | Review handler và demo guard | Tương tác/disabled state |
| Empty/offline, light/dark, chữ lớn, màn nhỏ, safe areas | Review i18n/styles/accessibility props | Hiển thị và screen reader |
| Không lỗi kiểm tra dự án do thay đổi | `bun run check` và review diff | Không bắt buộc mở simulator cho agent |

Theo yêu cầu người dùng: **agent không mở thiết bị/simulator, không chạy native flow hoặc chụp ảnh màn hình.** Bàn giao nêu rõ phần native/visual chưa được agent kiểm chứng. Không tạo test file mới khi chưa được yêu cầu. Bước spec hiện tại chỉ chạy kiểm tra tài liệu/setup; `bun run check` thuộc giai đoạn triển khai sau khi được duyệt.

## 11. Phê duyệt

Spec này trình duyệt một phương án thống nhất: ba nhóm tab; card theo nội dung ở mục 5; mock data và Call demo bị vô hiệu hóa; nhất quán tối thiểu ở Detail; không làm đồng bộ create/cancel và không mở simulator. Người dùng có thể yêu cầu chỉnh spec trước khi duyệt.

**Đã được duyệt và triển khai trong phạm vi trên. Xem execution ledger trong kế hoạch để biết bằng chứng kiểm tra và giới hạn còn lại.**

Approval record: “Duyệt và hãy triển khai”. Các lựa chọn trong spec được chấp thuận; tiếp tục giữ ràng buộc không mở simulator.

# Spec: Quy trình Codex và Claude dùng chung cho Scrap Client App

Ngày: 2026-11-17
Trạng thái: APPROVED — người dùng yêu cầu “Triển khai” ngày 2026-11-17
Giai đoạn tham chiếu: `2026-11-mock-flow-mvp` (task cấu hình không triển khai flow sản phẩm)
Loại task: Cấu hình hướng dẫn, skills và quy trình; không triển khai tính năng ứng dụng.

## 1. Mục đích

Thiết lập Codex làm việc có phương pháp, phản biện trước khi quyết định, thiết kế dựa trên bằng chứng và kiểm chứng kết quả. Giữ khả năng dùng Claude mà không tạo hai bộ quy tắc nghiệp vụ cạnh tranh. Giảm việc người dùng phải nhắc lại nguyên tắc trong mỗi prompt.

## 2. Yêu cầu đã được người dùng xác nhận

- MVP chỉ là giai đoạn hiện tại, không phải giới hạn cho toàn bộ vòng đời sản phẩm.
- Giai đoạn hiện tại dùng mock, hành vi nghiệp vụ phải nhất quán xuyên màn hình; BE chưa bắt đầu, chưa mapping API chính thức.
- Không bắt buộc đăng nhập; tạm không đánh giá Auth trong giai đoạn này.
- Luồng ưu tiên: Home → tạo yêu cầu → thành công → chi tiết → lịch sử, cùng các thao tác cơ bản.
- Repository phục vụ khách hàng; Driver/Collaborator là các ứng dụng riêng.
- Không đọc toàn bộ dự án; chỉ đọc hướng dẫn, tài liệu và code liên quan task.
- Có brainstorming/đối chất; không tự biến đề xuất hoặc giả định thành quyết định của người dùng.
- Hướng dẫn Codex và Claude cần bổ trợ nhau và tránh xung đột.

## 3. Hiện trạng và vấn đề

- `AGENTS.md` hiện là contributor guide; chưa mô tả đầy đủ quy trình phê duyệt và nguồn quyết định.
- `CLAUDE.md` chứa quy tắc, dữ kiện kỹ thuật và scope trộn lẫn. Một số mô tả không còn khớp code, ví dụ chưa có tabs, thư mục `app/features/`, đường dẫn sinh SVG.
- Có xung đột về commit convention, kiểm thử, yêu cầu chạy check và thời điểm được ghi spec/plan.
- Superpowers có trong cache Claude. Không coi đường dẫn cache đó là vị trí cài đặt bền vững cho Codex.
- Các rule trong `.claude/rules/` không được giả định tự nạp khi chạy Codex.
- Tài liệu `open-questions.md` có thể chưa phản ánh quyết định mới nhất trong hội thoại.

## 4. Kiến trúc tài liệu đề xuất

Chọn một bộ nguồn dùng chung trong repository. Không duy trì bản sao quy tắc ở hai công cụ.

| Thành phần | Trách nhiệm |
|---|---|
| `AGENTS.md` | Entry point ngắn cho Codex; trỏ tới tài liệu chung và quy tắc đọc theo task |
| `CLAUDE.md` | Entry point ngắn cho Claude; trỏ tới cùng tài liệu chung, giữ hướng dẫn riêng của Claude khi cần |
| `docs/ai/workflow.md` | Quy trình, phân loại task, phê duyệt, skill routing, xử lý xung đột và verification |
| `docs/ai/rules/*.md` | Nguồn chung cho architecture, domain, UI, navigation, state, API, security và testing |
| `docs/ai/skills.md` | Danh sách skill, nguồn, phiên bản đã xác minh, trigger, công cụ hỗ trợ và ngoại lệ của repo |
| `docs/product/current-phase.md` | Chỉ mục trỏ tới đúng một giai đoạn active, không lặp lại toàn bộ nội dung giai đoạn |
| `docs/product/phases/2026-11-mock-flow-mvp.md` | Phạm vi, tiêu chí nghiệm thu, phần hoãn lại và điều kiện kết thúc giai đoạn hiện tại |
| `docs/product/decisions.md` | Nhật ký quyết định và quan hệ thay thế quyết định cũ |
| `docs/ai/design-guidelines.md` | Hướng dẫn thiết kế React Native và quy trình phê duyệt hình ảnh |

Các file `.claude/rules/*.md` giữ frontmatter phù hợp Claude và chỉ dẫn đọc nguồn chung theo domain. Loại bỏ nội dung quy tắc trùng lặp sau khi đối chiếu; không xóa cấu hình Claude không liên quan.

Không migrate code từ `app/screens/` sang `app/features/` trong task cấu hình này. Rule cần phân biệt kiến trúc mong muốn với cấu trúc thực tế và không tạo refactor ngoài phạm vi.

## 5. Quản lý giai đoạn, không đóng băng sản phẩm ở MVP

Entry point lâu dài chỉ yêu cầu đọc `current-phase.md`; không đặt các câu như “luôn mock”, “không có Auth” hoặc “không cần API” thành rule toàn dự án.

Mỗi hồ sơ giai đoạn có: ID, trạng thái (draft/active/completed/superseded), ngày hiệu lực, mục tiêu, phạm vi, phần hoãn lại, tiêu chí nghiệm thu và quyết định liên quan. Giai đoạn hiện tại ghi Auth/API là deferred, không phải permanently out of scope.

Khi chuyển giai đoạn: người dùng chốt phạm vi mới → tạo hồ sơ mới → cập nhật con trỏ → lưu quyết định chuyển giai đoạn. Giữ lịch sử cũ để truy vết. Không tự kích hoạt giai đoạn mới vì ngày tháng hoặc vì đã cài dependency.

Mỗi spec task ghi ID giai đoạn tại thời điểm lập. Khi giai đoạn thay đổi giữa task, xác định tác động và xin quyết định nếu thay đổi hành vi/phạm vi; không âm thầm tiếp tục theo scope cũ.

## 6. Quy tắc nhất quán và xử lý xung đột

Đây là quy ước nội dung repository, không thay thế thứ tự ưu tiên chỉ dẫn và quyền của môi trường chạy.

- Chỉ dẫn mới nhất của người dùng trong phiên được ưu tiên hơn tài liệu cũ; quyết định đã chốt không hỏi lại.
- Quy tắc kỹ thuật dùng nguồn chung; scope hiện tại lấy từ hồ sơ giai đoạn active; hành vi task lấy từ spec/plan đã duyệt.
- Spec không tự miễn trừ quy tắc chung. Ngoại lệ cần được nêu rõ và người dùng chấp thuận.
- Codex và Claude không có quyền ưu tiên chỉ vì tên công cụ. Hai entry point phải cùng dẫn tới một nguồn.
- Nếu hai tài liệu đang hiệu lực bất đồng về nghiệp vụ, phê duyệt hoặc bảo mật: nêu cụ thể mâu thuẫn và hỏi phần chưa thể xác định; không tự chọn phương án thuận tiện.
- Dữ kiện kỹ thuật có thể xác minh bằng file thực tế được đánh dấu tài liệu lỗi thời, không biến thành thay đổi sản phẩm. Đề xuất cập nhật trong phạm vi được duyệt.
- Skill không được ghi đè quyết định của người dùng hoặc quy tắc chung. Ghi rõ ngoại lệ khi áp dụng thay vì tuyên bố tuân thủ nguyên bản.

## 7. Workflow bắt buộc theo loại task

### Đọc và đánh giá

Đọc có chọn lọc, báo cáo có bằng chứng, ghi giới hạn xác minh. Không mặc định viết spec/plan cho một câu hỏi hay báo cáo.

### Thêm/sửa tính năng, logic, flow hoặc thiết kế

1. Đọc entry point, phase active, rule liên quan và các quyết định cần thiết.
2. Dùng brainstorming: nhắc lại phần đã hiểu, phản biện, làm rõ từng điểm có tác động. Chỉ trình lựa chọn có đánh đổi hữu ích.
3. Chốt hướng với người dùng; phân biệt yêu cầu đã xác nhận, đề xuất và phần còn mở.
4. Viết spec; review khả năng triển khai và đối chiếu tiêu chí nghiệm thu. Người dùng duyệt spec trước khi lập plan chi tiết.
5. Dùng writing-plans: ghi file, trách nhiệm, thứ tự, kiểm chứng và giới hạn. Người dùng duyệt plan trước khi implementation.
6. Triển khai đúng phạm vi; thay đổi làm lệch spec cần quay lại chốt.
7. Kiểm chứng, review diff và báo cáo kết quả cùng giới hạn thực tế.

Được ghi tài liệu spec/plan khi người dùng yêu cầu lập chúng; không hiểu gate “chờ duyệt plan” thành cấm viết chính plan. Không cài skill, dependency hoặc sửa entry point trước khi được duyệt phần setup tương ứng.

Task lỗi dùng systematic-debugging để tìm nguyên nhân; thay đổi hành vi vẫn tuân thủ gate. Ngoại lệ nhỏ giữ đúng phạm vi typo/text/style một dòng đã chỉ định, không mở rộng thành sửa logic.

## 8. Skills và agent review

Ưu tiên bộ tối thiểu: using-superpowers, brainstorming, writing-plans, systematic-debugging, verification-before-completion, requesting-code-review và receiving-code-review; chỉ bổ sung execution skill khi phương thức triển khai đã chốt.

Khi setup được duyệt, xác minh nguồn upstream và hướng dẫn Codex hiện hành, pin phiên bản/commit và ghi provenance. Ưu tiên skill dùng chung theo repo trong `.agents/skills/`; không sửa cache Claude hoặc cấu hình global. Kiểm tra license, tài nguyên tham chiếu và dependency của từng skill; không sao chép mỗi `SKILL.md` rồi bỏ tài nguyên cần thiết.

Nếu phiên bản/cách cài upstream không hỗ trợ cấu trúc này, báo phương án cụ thể trước khi đổi vị trí cài hoặc cài global. Không tải hay chạy installer chưa được duyệt. Claude tiếp tục dùng integration vốn có và nguồn rule chung.

Mỗi task thông báo skill thực sự dùng; không coi đã dùng chỉ vì tài liệu nhắc tên. Thiếu skill bắt buộc: kiểm tra vị trí hợp lệ, báo thiếu và đề xuất cách khắc phục trước bước phụ thuộc. Không tự thay bằng phỏng đoán.

Review độc lập áp dụng cho spec/plan hoặc thay đổi nhiều bước khi công cụ hỗ trợ và được chỉ dẫn cho phép. Reviewer đọc yêu cầu và tài liệu liên quan, kiểm tra thiếu scope, mâu thuẫn và khả năng nghiệm thu; không tự sửa code hoặc mở rộng scope. Không yêu cầu người dùng bật tính năng agent nếu phiên đã có công cụ phù hợp. Không cam kết model hoặc config key chưa xác minh.

## 9. Chất lượng thiết kế

Thiết kế dựa trên UI hiện tại, theme tokens, component dùng chung và mẫu tham chiếu được người dùng xác nhận. Đề xuất thay đổi typography, màu hoặc bố cục đáng kể phải trình hình ảnh/phương án trước khi làm.

Checklist: hierarchy, khoảng cách, mật độ nội dung, CTA chính, bàn phím, safe area, accessibility, light/dark và trạng thái tương tác có liên quan. Không ép mỗi component tĩnh phải có loading/error; đánh giá các trạng thái ở cấp màn hình hoặc flow sở hữu dữ liệu.

Không tự áp dụng Hallmark cho giao diện React Native hiện có: skill hiện tại hướng tới website và có giới hạn kích hoạt. Chỉ tạo skill thiết kế React Native riêng nếu qua bước skill-creator, có tài liệu nguồn và được duyệt. Task setup này tạo hướng dẫn thiết kế chung, chưa tự viết skill mới hoặc redesign màn hình.

## 10. Verification và bảo vệ dữ liệu

- Task tài liệu/setup: kiểm tra toàn bộ link/path đã thêm, skill discovery, tính toàn vẹn tài nguyên, tính nhất quán entry point và diff; không yêu cầu build app nếu không thay code/tooling thực thi.
- Thay đổi code ứng dụng: chạy `bun run check`, kiểm chứng flow liên quan và visual check khi sửa UI. Nếu bị chặn, ghi rõ bước chưa chạy và không báo pass.
- Giữ chính sách hiện tại không tạo file test mới khi chưa được yêu cầu; chạy test có sẵn, ghi kịch bản kiểm chứng hành vi. Hợp nhất mâu thuẫn với rule cũ đòi test mới bắt buộc.
- Không đọc/in `.env*`, không đưa PII/token vào spec, log hoặc ảnh minh họa; không sửa `android/`, `ios/` generated.
- Không nới sandbox, quyền, hook hoặc approvals để ép tuân thủ workflow. Không thêm dependency app hoặc sửa global config trong task này.

## 11. Phạm vi file của task triển khai sau khi duyệt

- Đề xuất cập nhật: `AGENTS.md`, `CLAUDE.md`, `.claude/rules/*.md` và các tài liệu product có nội dung bị thay thế.
- Tạo: các file `docs/ai/` và hồ sơ phase mô tả ở mục 4.
- Cài sau xác minh: skills dưới `.agents/skills/` và tài nguyên cần thiết.
- Xem xét `.gitignore` chỉ nếu nó ngăn version-control các tài liệu/skills mới; không thay đổi trước khi kiểm tra và ghi rõ trong plan.
- Không sửa `app/**`, dependency, cấu hình cá nhân hoặc cache plugin Claude.

Yêu cầu trước đây không sửa `AGENTS.md` vẫn được giữ ở lượt lập spec này. Việc duyệt spec chưa tự động cho phép sửa file đó; plan triển khai phải liệt kê rõ thay đổi `AGENTS.md` và được người dùng duyệt.

## 12. Tiêu chí nghiệm thu setup

1. Phiên Codex mới đọc entry point, xác định đúng phase và tìm đúng skill bắt buộc mà không dựa vào cache Claude.
2. Phiên Claude đi tới cùng nguồn quy tắc; không có hai bản active cho cùng một nguyên tắc.
3. Mô phỏng đổi phase không đòi sửa rule lâu dài và không làm mất lịch sử MVP.
4. Prompt “thêm flow” dẫn tới làm rõ/spec/plan; không code trước duyệt. Prompt “đọc báo cáo” không bị ép qua triển khai.
5. Tình huống tài liệu mâu thuẫn dẫn tới báo xung đột; quyết định đã chốt trong phiên không bị hỏi lại.
6. Không còn rule cùng lúc vừa cấm vừa bắt buộc tạo test, hoặc cấm ghi chính spec/plan cần duyệt.
7. Skill thiết kế không tự mở rộng phạm vi hoặc đổi phong cách; visual verification chưa thực hiện phải được báo rõ.
8. Có danh mục nguồn/phiên bản skill, hướng dẫn cài lại và cách gỡ phần setup mới mà không tác động code app hay Claude cache.

## 13. Quyết định đề xuất để duyệt

- Dùng `docs/ai/` làm nguồn chung, hai entry point chỉ làm nhiệm vụ định tuyến.
- Version-control skills theo repo thay vì cài global ở bước đầu.
- Duyệt spec trước plan; duyệt plan trước setup/implementation. Task chỉ đọc không cần các gate này.
- Chưa thêm MCP, hooks, app dependency hoặc skill thiết kế tùy biến trong task này.

Các lựa chọn này là đề xuất của người viết spec, chưa phải quyết định đã được người dùng xác nhận.

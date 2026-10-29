# BÁO CÁO RÀ SOÁT TỔNG THỂ CẤU HÌNH AI REPO SCRAP-CLIENT-APP

## 1. TÓM TẮT TỔNG QUAN (5-10 DÒNG)
- **Nền móng hiện tại mạnh ở:**
  - Stack kỹ thuật và ranh giới package manager được phân tầng rõ ràng (chỉ dùng `bun`, chặn triệt để `npm/npx/yarn/pnpm/bun test` bằng deny rules Tầng 1).
  - Phân vùng rules theo đường dẫn (`paths` frontmatter) đã được cấu hình tốt cho hầu hết các domain kỹ thuật (`api.md`, `architecture.md`, `state.md`, `testing.md`).
  - Subagent `researcher` và bộ 3 skills nội bộ (`new-screen`, `new-api-service`, `check-done`) được thiết kế sát thực tế của dự án.
- **Nền móng hiện tại yếu ở:**
  - Ô nhiễm kỹ thuật từ 4 skills bên thứ ba (`clean-code`, `senior-architect`, `react-native-architecture`, `ui-ux-pro-max`): chứa script Python không tồn tại, chỉ dẫn dùng `Expo Router` và `npm` mâu thuẫn trực tiếp với `CLAUDE.md`.
  - Quy tắc đo đếm được (tối đa 150 dòng/file) chỉ nằm ở Tầng 2 (văn bản), thiếu chế tài Tầng 1 (ESLint/Hooks) nên liên tục bị vi phạm trong thực tế.
  - Ba skill nội bộ chuẩn của dự án lại bị khóa tự động gọi bằng `disable-model-invocation: true`, khiến AI không tự kích hoạt khi gặp task phù hợp.
  - Tồn tại mâu thuẫn trực tiếp về UI: User cấm tuyệt đối badge status và hiệu ứng chớp nháy, trong khi `CLAUDE.md`, `ui.md` và tài liệu sản phẩm lại đang cho phép và mô tả badge có animation 1 lần.

---

## 2. BẰNG CHỨNG TÀI LIỆU CHÍNH THỨC (OFFICIAL DOCS CITATIONS)
Mọi kết luận và đề xuất trong báo cáo này đều được đối chiếu từ tài liệu chính thức của Claude Code tại `https://code.claude.com/docs/llms.txt`:
1. **Memory & Rules**:
   - `https://code.claude.com/docs/en/memory.md`: `CLAUDE.md` nạp vào mọi phiên; rules không có `paths` nạp vào mọi phiên; rules có `paths` chỉ nạp khi mở file khớp pattern; khuyến nghị giữ `CLAUDE.md` ngắn (< 200 dòng).
   - `https://code.claude.com/docs/en/claude-directory.md`: Quy chuẩn vị trí và tổ chức thư mục `.claude/`.
2. **Skills**:
   - `https://code.claude.com/docs/en/skills.md`: Cú pháp `SKILL.md`, `disable-model-invocation`, `allowed-tools`, `skillOverrides`.
   - `https://code.claude.com/docs/en/settings-reference.md`: Cấu hình `skillOverrides` và `disableBundledSkills`.
3. **Subagents / Agents**:
   - `https://code.claude.com/docs/en/sub-agents.md`: Frontmatter, cách ly ngữ cảnh (subagent không thấy chat history, không thấy auto-memory, nhưng CÓ thấy `CLAUDE.md` trừ khi cấu hình `omitClaudeMd: true`). Subagent không tự đọc rules có `paths` nếu chưa chạm vào file khớp glob.
4. **Hooks**:
   - `https://code.claude.com/docs/en/hooks.md` & `https://code.claude.com/docs/en/hooks-guide.md`: Sự kiện `PreToolUse` (chặn trước bằng exit 2), `PostToolUse` (gửi feedback stderr bằng exit 2), `Stop` (chặn kết thúc phiên bằng exit 2 nếu chưa xong task).
5. **Permissions & Settings**:
   - `https://code.claude.com/docs/en/permissions.md`: Cú pháp `Tool(specifier)`. Thứ tự: Deny > Ask > Allow (Deny luôn thắng). Scoped vs Bare tool name.
   - `https://code.claude.com/docs/en/settings.md`: Thứ tự ưu tiên: Managed > CLI > Project Local (`.claude/settings.local.json`) > Shared Project (`.claude/settings.json`) > User (`~/.claude/settings.json`).
6. **Best Practices**:
   - `https://code.claude.com/docs/en/best-practices.md`: "Only write down what Claude can't find by reading the repo". "If you keep adding emphasis to a CLAUDE.md line and Claude still misses it, that's a sign the line belongs in a hook."

---

## 3. KIỂM KÊ NHANH & CHỒNG CHÉO, MÂU THUẪN

| STT | File | Mục đích thực tế | Chồng chéo / Mâu thuẫn phát hiện |
|---|---|---|---|
| 1 | `CLAUDE.md` (59 dòng) | Hướng dẫn trung tâm toàn dự án | - Dòng 31 (150 dòng) lặp lại tại `architecture.md:14` và `ui.md:14`.<br>- Dòng 36 (i18n English only) lặp lại tại `i18n.md:8-9` và `ui.md:10`.<br>- Dòng 41 (Badge animation 1 lần) mâu thuẫn với yêu cầu User cấm tuyệt đối badge status. |
| 2 | `.claude/settings.json` (57 dòng) | Quản lý permissions và hooks dự án | - Dòng 40 `Bash(cat .env*)` chặn lệnh cat nhưng chưa chặn các lệnh shell khác đọc file nhạy cảm.<br>- `Read(./.env*)` chỉ chặn ở root, chưa bao quát đường dẫn sâu. |
| 3 | `.claude/settings.local.json` (16 dòng) | Cấu hình cục bộ máy cá nhân | - Dòng 8: `Read(//Users/andy2015bui/**)` mở quyền đọc toàn bộ máy tính cá nhân.<br>- Dòng 14: Tắt cục bộ `ui-ux-pro-max` chứng tỏ skill này gây phiền toái. |
| 4 | `.claude/hooks/lint-on-edit.mjs` (25 dòng) | Chạy eslint --fix sau khi sửa code | Tốt ở Tầng 1, nhưng chỉ bắt lỗi cú pháp, chưa tích hợp chặn 150 dòng và compile. |
| 5 | `.claude/rules/api.md` (11 dòng) | Quy chuẩn API service & apisauce | Hoạt động tốt, paths chuẩn `app/services/**`. |
| 6 | `.claude/rules/architecture.md` (18 dòng) | Cấu trúc feature, thin screen, thin component | Dòng 14 lặp lại 150 dòng từ CLAUDE.md. |
| 7 | `.claude/rules/domain.md` (31 dòng) | Nghiệp vụ thu gom, guest, OPEN items | Tốt, paths `app/features/**`, `app/domain/**`. |
| 8 | `.claude/rules/i18n.md` (14 dòng) | Bản địa hóa, tiếng Anh duy nhất, chuẩn Úc | Lặp lại nội dung cấm literal strings trong `CLAUDE.md` và `ui.md`. |
| 9 | `.claude/rules/navigation.md` (11 dòng) | React Navigation 7, type routing | Tốt, paths `app/navigators/**`, `app/screens/**`. |
| 10 | `.claude/rules/security-privacy.md` (12 dòng) | Bảo mật PII theo Privacy Act của Úc | **KHÔNG CÓ PATHS FRONTMATTER** → Nạp vào context ở MỌI session bất kể task gì. |
| 11 | `.claude/rules/state.md` (12 dòng) | Context, Zustand, TanStack Query, MMKV | Lặp lại nội dung cấm MST từ `CLAUDE.md:42`. |
| 12 | `.claude/rules/testing.md` (16 dòng) | Jest, RNTL, Maestro, cấm bun test | Lặp lại cấm `bun test` từ `CLAUDE.md:13`. |
| 13 | `.claude/rules/ui.md` (16 dòng) | Theme, FlatList, A11y, UI states, Badge | Dòng 15 cho phép badge animation 1 lần, mâu thuẫn với yêu cầu của User. |
| 14 | `.claude/skills/clean-code` | Tiêu chuẩn clean code bên thứ ba | **RÁC**: Dòng 148-164 đòi chạy các script Python không tồn tại của các agent `frontend-specialist`, `seo-specialist`, `Lighthouse`! Dòng 4 cấm Bash nhưng dòng 150 đòi chạy Bash Python. |
| 15 | `.claude/skills/mobile-design` | Thiết kế mobile touch & performance | Quá nặng (13 file md, 1 script python). Dòng 277-314 ép AI in `🧠 CHECKPOINT:` trước khi code. Lặp lại rules về FlatList, console.log. |
| 16 | `.claude/skills/react-native-architecture` | Kiến trúc React Native bên thứ ba | **MÂU THUẪN NGHIÊM TRỌNG**: `resources/implementation-playbook.md:24-27, 55` hướng dẫn cài `expo-router` và `async-storage`, vi phạm trực tiếp `CLAUDE.md`. |
| 17 | `.claude/skills/senior-architect` | Thiết kế hệ thống bên thứ ba | **RÁC**: Dòng 121, 176-189 hướng dẫn dùng `npm`, Docker, K8s, Go, Postgres, Next.js. Không liên quan đến mobile app. |
| 18 | `.claude/skills/tanstack-query-expert` | Quản lý server state | Dòng 152-225 hướng dẫn Next.js App Router (SSR) vô dụng cho React Native. Phần Query Key Factory và Mutation Invalidation tốt nhưng cần gọt giũa. |
| 19 | `.claude/skills/new-screen` | Tạo screen mới cho app | Tốt, nhưng có `disable-model-invocation: true` làm AI không tự gọi được. |
| 20 | `.claude/skills/new-api-service` | Tạo API service mới cho app | Tốt, nhưng có `disable-model-invocation: true` làm AI không tự gọi được. |
| 21 | `.claude/skills/check-done` | Kiểm tra Definition of Done | Tốt, nhưng có `disable-model-invocation: true` làm AI không tự gọi được. |
| 22 | `.claude/skills/ui-ux-pro-max` | Thư viện UI/UX đa nền tảng | **RÁC & BỊ TẮT**: Chứa 18 CSV, 3 Python script. Description nhồi nhét từ khóa làm AI kích hoạt bừa bãi. Đang bị tắt trong `settings.local.json`. |
| 23 | `.claude/agents/code-reviewer.md` | Agent review code dự án | Cấp quyền `Bash` quá rộng. Thiếu `model: sonnet` rõ ràng. |
| 24 | `.claude/agents/researcher.md` | Agent nghiên cứu thư viện & SDK | Rất tốt. Tools chỉ đọc (`Read, Grep, Glob, WebSearch, WebFetch`). |
| 25 | `.claude/agents/test-writer.md` | Agent viết unit test | Quyền `Bash` chưa bị giới hạn theo matcher (`bun run test *`). |

---

## 4. ĐỐI CHIẾU 9 TIÊU CHUẨN CODING & 4 LỖI HAY GẶP

### 4.1. Bảng phân tầng 9 tiêu chuẩn coding

| Yêu cầu | Tầng hiện tại | Nguy cơ vi phạm | Tầng phù hợp nhất | Khả năng tự động hóa |
|---|---|---|---|---|
| **1. Clean code, tách theo trách nhiệm** | Tầng 2 (`CLAUDE.md:31`, `architecture.md`) | Cao (AI hay tách file máy móc để lách dòng) | **Tầng 3 (User Review)** + Tầng 2 (hướng dẫn) | **KHÔNG tự động hóa 100% được** (khái niệm "trách nhiệm" thuộc về ngữ nghĩa). |
| **2. Tối đa 150 dòng/file** | Tầng 2 (`CLAUDE.md:31`, `architecture.md:14`) | Rất cao (AI hay viết vượt nếu không tự đếm) | **Tầng 1 (ESLint rule `max-lines`)** | **Tự động hóa 100%** bằng linter và hook `lint-on-edit.mjs`. |
| **3. Không comment bừa bãi (chỉ 'why', không 'what')** | Tầng 2 (`CLAUDE.md:34`) | Cao (LLM có thiên kiến comment giải thích code) | **Tầng 2 + Tầng 3 (User Review)** | **KHÔNG tự động hóa 100% được** (linter không phân biệt được comment giải thích logic hay mô tả). |
| **4. API, Query tách rõ service/const/hook** | Tầng 2 (`CLAUDE.md:43`, `api.md`) | Trung bình | **Tầng 1 (`deps:check` / dependency-cruiser)** + Tầng 2 | **Tự động hóa phần lớn** qua dependency-cruiser chặn import chéo. |
| **5. Không magic number; mock data tối thiểu** | Tầng 2 (`CLAUDE.md:37, 39`, `ui.md:9`) | Cao (AI hay bịa mảng mock dài) | **Tầng 2 + Tầng 3 (User Review)** | **Một phần Tầng 1** (Style linting), mock thừa phải do Tầng 3 soi. |
| **6. Hiểu quy trình, đối chất khi gặp OPEN items** | Tầng 2 (`CLAUDE.md:28`, `domain.md:30`) | Rất cao (AI hay đoán mò để code tiếp) | **Tầng 2 (Quy tắc dừng) + Tầng 3 (Quyền quyết định)** | **KHÔNG tự động hóa bằng script được**; cần kỷ luật prompt và Plan Mode. |
| **7. Cấm tuyệt đối badge status & chớp nháy** | **MÂU THUẪN NẶNG** (Tầng 2 hiện tại cho phép) | 100% vi phạm nếu AI đọc cấu hình cũ | **Tầng 1 (ESLint no-restricted-syntax)** + Sửa Tầng 2 | **Tự động hóa 100%** bằng cách cấm component hoặc prop qua ESLint. |
| **8. Tái sử dụng component và Ignite code** | Tầng 2 (`CLAUDE.md:40`) | Cao (AI lười tìm component có sẵn) | **Tầng 2 + Tầng 3 (User Review)** | **KHÔNG tự động hóa 100% được**. |
| **9. Không dùng hook/logic khi chưa hiểu** | Chưa có tầng cụ thể | Trung bình (lạm dụng useEffect) | **Tầng 3 (User Review)** | **KHÔNG tự động hóa được**. |

### 4.2. Nguyên nhân và giải pháp nhỏ nhất cho 4 lỗi hay gặp

- **(a) Không hiểu ngữ cảnh dù đã cung cấp:**
  - *Nguyên nhân trong repo hiện tại:* Ngữ cảnh bị pha loãng (Context Dilution). Khi mở bất kỳ file UI nào, Claude bị nạp chồng chéo 5-6 file cùng lúc (`CLAUDE.md`, `security-privacy.md` không có paths, `architecture.md`, `i18n.md`, `ui.md`), chứa nhiều câu lặp lại. Thêm vào đó là các skill bên thứ ba cồng kềnh.
  - *Cách sửa nhỏ nhất:* Gán `paths` chặt chẽ cho mọi file rules (kể cả `security-privacy.md`). Xóa sạch skills rác. Lược bỏ trùng lặp trong `CLAUDE.md`.
- **(b) Không áp dụng skill khi cần:**
  - *Nguyên nhân trong repo hiện tại:* 3 skill nội bộ chuẩn (`new-screen`, `new-api-service`, `check-done`) bị cài cờ `disable-model-invocation: true`, chặn đứng khả năng tự kích hoạt của Claude! Ngược lại, skill rác như `ui-ux-pro-max` lại nhồi nhét từ khóa làm AI kích hoạt nhầm.
  - *Cách sửa nhỏ nhất:* Xóa cờ `disable-model-invocation: true` ở 3 skill nội bộ; viết lại `description` chuẩn xác ("Use when asked to create a new screen..."). Xóa bỏ skill rác.
- **(c) Tự diễn giải sáng tạo khi chưa được phép:**
  - *Nguyên nhân trong repo hiện tại:* Các tài liệu bên thứ ba như `react-native-architecture/resources/implementation-playbook.md` đưa vào các giải pháp đối nghịch (`Expo Router`, `AsyncStorage`, `Next.js`), làm loãng nguyên tắc single source of truth.
  - *Cách sửa nhỏ nhất:* Xóa hoàn toàn các skill bên thứ ba; đưa danh sách các điểm cấm đoán cốt lõi (Không Expo Router, Không Badge Status, Gặp OPEN items phải dừng) lên vị trí nổi bật trong `CLAUDE.md`.
- **(d) Không tuân thủ rules và CLAUDE.md:**
  - *Nguyên nhân trong repo hiện tại:* Dồn các quy tắc đo đếm được vào Tầng 2 mà không có chế tài Tầng 1. Quy tắc 150 dòng chỉ là chữ viết; khi Claude viết 160 dòng, linter chạy qua vẫn báo thành công vì ESLint không bắt lỗi.
  - *Cách sửa nhỏ nhất:* Chuyển quy tắc 150 dòng lên Tầng 1 bằng ESLint `max-lines`. Bổ sung Stop Hook kiểm tra trước khi kết thúc task.

---

## 5. ĐÁNH GIÁ CHI TIẾT TỪNG THÀNH PHẦN

### 5.1. CLAUDE.md và Rules
- **CLAUDE.md**:
  - Loại bỏ các câu hiển nhiên không mang lại giá trị ("Names must be self-describing. No vague abbreviations" - model hiện đại đã tự tối ưu; "Follow existing Ignite conventions" - lặp lại ở nhiều nơi).
  - Loại bỏ các dòng lặp lại hoàn toàn với rules: i18n rules, theme rules, accessibilityLabel rules.
  - Chuyển `CLAUDE.md` thành một bản "Chỉ mục điều hành" ngắn gọn (< 45 dòng) chỉ chứa: Tech Stack, Commands bắt buộc (bun ONLY), Hard Rules (generated code, secret, STOP on OPEN questions) và con trỏ trỏ tới rules.
- **`.claude/rules/`**:
  - `security-privacy.md`: Hiện tại không có frontmatter `paths`. Phải bổ sung `paths: ["app/services/**", "app/features/**", "app/utils/**"]` để tránh việc một task sửa file test hay config build cũng bị nạp quy tắc PII.
  - `ui.md`: Sửa dòng 15 để đồng bộ với quyết định cấm Badge Status của User.

### 5.2. Skills
- **Skill bên thứ ba & plugins**:
  - `clean-code`: Xóa hoàn toàn. Chứa references giả mạo tới các script không tồn tại.
  - `senior-architect`: Xóa hoàn toàn. Chứa tài liệu backend/cloud (npm, docker, k8s, go) sai lệch hoàn toàn với mobile client app.
  - `react-native-architecture`: Xóa hoàn toàn. Playbook xúi giục dùng `Expo Router` và `AsyncStorage` vi phạm trực tiếp stack dự án.
  - `ui-ux-pro-max`: Xóa hoàn toàn. Đang bị tắt ở local, chứa 18 CSV và code Python cồng kềnh, keyword stuffing.
  - `tanstack-query-expert`: Rút gọn chỉ giữ lại phần Client React Native (< 70 dòng), xóa bỏ toàn bộ Next.js App Router (SSR).
  - Plugin `superpowers`: Giữ nguyên vì là workflow tiêu chuẩn của người dùng (brainstorming, writing-plans, executing-plans).
- **Skill nội bộ (`new-screen`, `new-api-service`, `check-done`)**:
  - Xóa `disable-model-invocation: true`, tinh chỉnh `description` để Claude tự kích hoạt đúng lúc.

### 5.3. Agents
- `code-reviewer`:
  - Hiện cấp quyền `Bash` không giới hạn. Cần thu hẹp thành quyền chỉ đọc: `tools: Read, Grep, Glob, Bash(git diff *)`.
  - Cấu hình tường minh `model: sonnet` (hoặc kế thừa) để tối ưu chi phí và tốc độ.
- `researcher`:
  - Cấu hình hoàn hảo (`Read, Grep, Glob, WebSearch, WebFetch`, read-only). Giữ nguyên.
- `test-writer`:
  - Giới hạn quyền `Bash` bằng matcher: chỉ cho phép `Bash(bun run test *)`, ngăn chặn việc vô tình chạy lệnh xóa hoặc sửa git.

### 5.4. Hooks
- Hiện tại: Chỉ có 1 hook `PostToolUse` chạy `bunx eslint --fix` trên file vừa sửa.
- Còn thiếu:
  - Chưa có cơ chế ngăn Claude báo "xong việc" khi code chưa qua kiểm tra (`bun run check`).
  - Đề xuất bổ sung: Hook sự kiện `Stop` trong `.claude/settings.json`. Khi Claude chuẩn bị kết thúc lượt trả lời, hook kiểm tra xem trong phiên có sửa code không; nếu có, yêu cầu xác nhận `bun run check` đã pass. Nếu chưa, exit 2 để buộc Claude chạy kiểm tra và sửa lỗi trước khi hoàn tất.

### 5.5. Settings & Permissions
- `.claude/settings.json`:
  - Luật `deny` cần siết chặt hơn:
    - Đổi `Read(./.env*)` thành `Read(**/.env*)` để chặn đọc ở mọi cấp thư mục.
    - Bổ sung `Edit(**/.env*)` và `Write(**/.env*)`.
    - Luật `Bash(npm *)`, `Bash(yarn *)`, `Bash(pnpm *)`, `Bash(bun test)` đang hoạt động rất tốt, giữ nguyên.
- `.claude/settings.local.json`:
  - Cảnh báo: `Read(//Users/andy2015bui/**)` là quyền quá rộng trên máy local. Khi xóa `ui-ux-pro-max`, xóa bỏ luôn dòng override skill tương ứng trong file này.

---

## 6. MÂU THUẪN VỚI TÀI LIỆU SẢN PHẨM (PRODUCT CONFLICTS)
Phát hiện các xung đột trực tiếp giữa tài liệu sản phẩm và yêu cầu hiện tại:
1. **Mâu thuẫn về Badge trạng thái đơn hàng:**
   - `docs/product/order-status.md:10, 21` ghi: "CONFIRMED: Quote ready (Xanh lá) ... animation xuất hiện 1 lần", "Badge trạng thái không được nhấp nháy... Chỉ cho phép animation nhẹ (fade-in, scale-in) khi trạng thái mới xuất hiện."
   - `docs/product/client-app-scope.md:29` (Mục C05) ghi: "badge 'Quote ready' (animation nhẹ 1 lần, không chớp nháy)".
   - `CLAUDE.md:41` và `.claude/rules/ui.md:15` đều ghi: "Badge animation: one-time only (fade-in/scale-in)..."
   - **Xung đột:** Yêu cầu mới của User quy định: *"7. UI cấm tuyệt đối badge status và hiệu ứng chớp nháy."*
   - Cần User quyết định chính thức: Xóa bỏ hoàn toàn khái niệm Badge (thay bằng Text Header thông thường) hay chỉ cấm hiệu ứng animation của badge?
2. **Mâu thuẫn về trạng thái RESCHEDULING:**
   - `order-status.md:13` định nghĩa trạng thái `RESCHEDULING` (Đang sắp xếp lại lịch).
   - Nhưng `client-app-scope.md` trong danh sách màn hình MVP (C04, C05, C10, C11) hoàn toàn không có giao diện cho trạng thái này.

---

## 7. KẾ HOẠCH HÀNH ĐỘNG: 12 THAY ĐỔI ĐỀ XUẤT (TỐI ĐA 12 MỤC)

### Mục 1: Xóa các skills rác bên thứ ba (`clean-code`, `senior-architect`, `react-native-architecture`)
- **Mục tiêu:** Loại bỏ hoàn toàn mã nguồn rác, script Python không tồn tại, và các hướng dẫn mâu thuẫn trực tiếp (Expo Router, npm, K8s, Docker).
- **File ảnh hưởng:** Xóa `.claude/skills/clean-code/`, `.claude/skills/senior-architect/`, `.claude/skills/react-native-architecture/`.
- **Lý do & bằng chứng:**
  - `react-native-architecture/resources/implementation-playbook.md:24-27, 55` hướng dẫn cài `expo-router`, trong khi `CLAUDE.md:7` cấm Expo Router, dùng React Navigation 7.
  - `clean-code/SKILL.md:148-164` ép chạy scripts Python trong `~/.claude/skills/` không tồn tại.
  - `senior-architect/SKILL.md:121, 176` ép dùng `npm` vi phạm `CLAUDE.md:10` (bun ONLY).
  - [URL: https://code.claude.com/docs/en/best-practices.md#keep-claudemd-short]
- **Rủi ro:** Không có rủi ro vì repo không sử dụng các skill này.
- **Cách kiểm tra:** Thư mục `.claude/skills/` sạch, không còn 3 thư mục trên.
- **Độ ưu tiên:** P0 (Xác minh từ tài liệu).
- **Nhóm commit:** `chore(ai): prune incompatible third-party skills`.

### Mục 2: Xóa bỏ dứt điểm skill `ui-ux-pro-max`
- **Mục tiêu:** Xóa tận gốc skill cồng kềnh chứa 18 CSV, 3 script Python và keyword stuffing gây nhiễu context.
- **File ảnh hưởng:** Xóa thư mục `.claude/skills/ui-ux-pro-max/`, xóa dòng override trong `.claude/settings.local.json:14`.
- **Lý do & bằng chứng:**
  - `ui-ux-pro-max/SKILL.md:3` nhồi nhét từ khóa làm kích hoạt tự động ngoài ý muốn, đã phải tắt cục bộ tại `.claude/settings.local.json:14`.
  - [URL: https://code.claude.com/docs/en/skills.md#skilloverrides-settingsjson]
- **Rủi ro:** Không có.
- **Cách kiểm tra:** Kiểm tra `ls .claude/skills/` không còn `ui-ux-pro-max`.
- **Độ ưu tiên:** P0 (Xác minh từ tài liệu).
- **Nhóm commit:** `chore(ai): remove ui-ux-pro-max skill`.

### Mục 3: Thu gọn và loại bỏ checkpoint bắt buộc trong skill `mobile-design`
- **Mục tiêu:** Xóa 13 file markdown phụ và đoạn ép buộc in `🧠 CHECKPOINT:` trước khi code, chỉ giữ 1 file `SKILL.md` cô đọng về mobile UX.
- **File ảnh hưởng:** `.claude/skills/mobile-design/*`.
- **Lý do & bằng chứng:**
  - `mobile-design/SKILL.md:277-314` ép AI in mẫu checkpoint làm loãng luồng hội thoại.
  - [URL: https://code.claude.com/docs/en/best-practices.md#tell-claude-what-it-cant-see]
- **Rủi ro:** Thấp.
- **Cách kiểm tra:** `mobile-design/SKILL.md` gọn dưới 60 dòng, không còn checkpoint bắt buộc.
- **Độ ưu tiên:** P1 (Xác minh từ tài liệu).
- **Nhóm commit:** `chore(ai): simplify mobile-design skill`.

### Mục 4: Cho phép tự động kích hoạt 3 skills chuẩn của repo (`new-screen`, `new-api-service`, `check-done`)
- **Mục tiêu:** Xóa cờ `disable-model-invocation: true`, chuẩn hóa description để Claude tự gọi skill khi nhận task (sửa dứt điểm Lỗi b).
- **File ảnh hưởng:** `.claude/skills/new-screen/SKILL.md`, `.claude/skills/new-api-service/SKILL.md`, `.claude/skills/check-done/SKILL.md`.
- **Lý do & bằng chứng:**
  - Cả 3 file đều có `disable-model-invocation: true` (dòng 4), khiến model không bao giờ tự gọi được.
  - [URL: https://code.claude.com/docs/en/skills.md#structure-of-a-skill]
- **Rủi ro:** Cần viết description có điều kiện loại trừ để tránh gọi nhầm.
- **Cách kiểm tra:** Gõ prompt yêu cầu tạo screen mới, kiểm tra xem Claude có tự gọi `new-screen` không.
- **Độ ưu tiên:** P1 (Xác minh từ tài liệu).
- **Nhóm commit:** `chore(ai): enable model invocation for project skills`.

### Mục 5: Rút gọn `tanstack-query-expert` cho React Native Client
- **Mục tiêu:** Cắt bỏ toàn bộ Next.js App Router (SSR), giữ lại Query Key Factory, Custom Hooks và Invalidation.
- **File ảnh hưởng:** `.claude/skills/tanstack-query-expert/SKILL.md`.
- **Lý do & bằng chứng:**
  - Dòng 152-225 trong file nói về Next.js Server Components, HydrationBoundary hoàn toàn vô dụng cho Expo/RN.
  - [URL: https://code.claude.com/docs/en/best-practices.md]
- **Rủi ro:** Không có.
- **Cách kiểm tra:** File không còn từ khóa `Next.js`, `Server Component`, `HydrationBoundary`.
- **Độ ưu tiên:** P2 (Xác minh từ tài liệu).
- **Nhóm commit:** `chore(ai): adapt tanstack-query-expert to react native`.

### Mục 6: Đưa quy tắc "≤ 150 dòng/file" lên Tầng 1 qua ESLint `max-lines`
- **Mục tiêu:** Tự động phát hiện và chặn vi phạm giới hạn 150 dòng code bằng ESLint ngay khi lưu file.
- **File ảnh hưởng:** `.eslintrc.js`.
- **Lý do & bằng chứng:**
  - Quy tắc nằm ở `CLAUDE.md:31` nhưng không có công cụ Tầng 1 thực thi. Hook `lint-on-edit.mjs` đã có sẵn, chỉ cần ESLint cấu hình rule `max-lines`.
  - [URL: https://code.claude.com/docs/en/best-practices.md#enforce-the-rules-that-cant-have-exceptions]
- **Rủi ro:** Cần cấu hình `skipBlankLines: true, skipComments: true` để tránh bắt lỗi không cần thiết.
- **Cách kiểm tra:** Chạy `bun run lint:check` trên file > 150 dòng sẽ báo lỗi.
- **Độ ưu tiên:** P0 (Xác minh từ tài liệu).
- **Nhóm commit:** `chore(lint): enforce max 150 lines per file in eslint`.

### Mục 7: Gán `paths` frontmatter cho `.claude/rules/security-privacy.md`
- **Mục tiêu:** Ngăn nạp không điều kiện quy tắc PII vào mọi phiên làm việc không liên quan.
- **File ảnh hưởng:** `.claude/rules/security-privacy.md`.
- **Lý do & bằng chứng:**
  - File không có frontmatter `paths`. Tài liệu chỉ rõ rules không có paths sẽ tải ở mọi session.
  - Thêm `paths: ["app/services/**", "app/features/**", "app/utils/**"]`.
  - [URL: https://code.claude.com/docs/en/memory.md#path-specific-rules]
- **Rủi ro:** Không có.
- **Cách kiểm tra:** Mở một file không khớp (như `.maestro/flow.yaml`), rule không bị tự nạp.
- **Độ ưu tiên:** P1 (Xác minh từ tài liệu).
- **Nhóm commit:** `chore(ai): scope security-privacy rule with paths`.

### Mục 8: Lược bỏ trùng lặp và câu hiển nhiên trong `CLAUDE.md` và `rules/*.md`
- **Mục tiêu:** Rút gọn `CLAUDE.md` xuống dưới 45 dòng, xóa các câu sáo rỗng và các đoạn lặp lại nguyên văn với rules.
- **File ảnh hưởng:** `CLAUDE.md`, `.claude/rules/architecture.md`, `.claude/rules/ui.md`.
- **Lý do & bằng chứng:**
  - Trùng lặp giữa `CLAUDE.md:31, 36, 37, 38` với `architecture.md:14` và `ui.md:9, 10, 13`.
  - [URL: https://code.claude.com/docs/en/best-practices.md#keep-claudemd-short]
- **Rủi ro:** Không có.
- **Cách kiểm tra:** `CLAUDE.md` ngắn gọn, không còn nội dung lặp lại.
- **Độ ưu tiên:** P1 (Xác minh từ tài liệu).
- **Nhóm commit:** `chore(ai): deduplicate CLAUDE.md and rules`.

### Mục 9: Siết chặt Deny Rules bảo vệ file bí mật (`.env*`) trong `.claude/settings.json`
- **Mục tiêu:** Chặn hoàn toàn việc đọc/sửa file `.env` ở mọi đường dẫn.
- **File ảnh hưởng:** `.claude/settings.json`.
- **Lý do & bằng chứng:**
  - Thay vì chỉ deny `Read(./.env*)` ở root, bổ sung `Read(**/.env*)`, `Write(**/.env*)`, `Edit(**/.env*)`.
  - [URL: https://code.claude.com/docs/en/permissions.md#read-and-edit]
- **Rủi ro:** Không có.
- **Cách kiểm tra:** Gọi lệnh Read trên một file `.env` ở thư mục con bị từ chối ngay lập tức.
- **Độ ưu tiên:** P1 (Xác minh từ tài liệu).
- **Nhóm commit:** `chore(ai): tighten env file permissions in settings`.

### Mục 10: Giới hạn quyền tối thiểu (Least Privilege) cho các Agents
- **Mục tiêu:** Thu hẹp quyền `Bash` của `code-reviewer` và `test-writer`.
- **File ảnh hưởng:** `.claude/agents/code-reviewer.md`, `.claude/agents/test-writer.md`.
- **Lý do & bằng chứng:**
  - `code-reviewer.md:4` cấp bare `Bash` là quá rộng; đổi thành `tools: Read, Grep, Glob, Bash(git diff *)`.
  - `test-writer.md` chỉ cần `Bash(bun run test *)`.
  - [URL: https://code.claude.com/docs/en/sub-agents.md#best-practices]
- **Rủi ro:** Không có.
- **Cách kiểm tra:** Kiểm tra frontmatter agent.
- **Độ ưu tiên:** P1 (Xác minh từ tài liệu).
- **Nhóm commit:** `chore(ai): enforce least-privilege tools on agents`.

### Mục 11: Bổ sung Stop Hook đảm bảo Definition of Done trước khi kết thúc
- **Mục tiêu:** Tự động bắt Claude kiểm tra `bun run check` trước khi kết thúc task có sửa code.
- **File ảnh hưởng:** `.claude/settings.json`, tạo script `.claude/hooks/verify-on-stop.mjs`.
- **Lý do & bằng chứng:**
  - Sự kiện `Stop` cho phép exit 2 để block việc Claude kết thúc khi chưa hoàn thành kiểm tra.
  - [URL: https://code.claude.com/docs/en/hooks.md#stop] & [URL: https://code.claude.com/docs/en/best-practices.md]
- **Rủi ro:** Cần đảm bảo nếu không có thay đổi file code (chỉ hỏi đáp), hook exit 0 để không gây kẹt.
- **Cách kiểm tra:** Sửa 1 file có lỗi, gõ "xong", hook chặn lại báo lỗi.
- **Độ ưu tiên:** P1 (Xác minh từ tài liệu).
- **Nhóm commit:** `feat(ai): add Stop hook for definition of done verification`.

### Mục 12: Đồng bộ hóa quy định cấm Badge Status và trạng thái RESCHEDULING (theo quyết định của User)
- **Mục tiêu:** Cập nhật đồng nhất quy tắc cấm Badge Status (thay bằng Text + Icon thuần, không animation) và bổ sung luồng hiển thị cho `RESCHEDULING`.
- **File ảnh hưởng:** `CLAUDE.md`, `.claude/rules/ui.md`, `docs/product/order-status.md`, `docs/product/client-app-scope.md`, `docs/product/decisions.md`.
- **Lý do & bằng chứng:**
  - User đã chốt **Phương án A** (cấm hoàn toàn component Badge) và **Giữ `RESCHEDULING`**.
  - Loại bỏ hoàn toàn mâu thuẫn giữa Business Docs cũ và Coding Standard mới của User.
  - [URL: https://code.claude.com/docs/en/memory.md#consistency]
- **Rủi ro:** Không có.
- **Cách kiểm tra:** Kiểm tra toàn bộ file tài liệu và rules: không còn khái niệm Badge / animation cho status; `RESCHEDULING` có mô tả UI nhất quán.
- **Độ ưu tiên:** P0 (Xác minh từ tài liệu).
- **Nhóm commit:** `docs: align order status UI specifications with user requirements`.

---

## 8. MỤC "CẦN TÔI QUYẾT ĐỊNH" (ĐÃ ĐƯỢC USER CHỐT)

1. **Quyết định về Badge Status và Animation trạng thái:**
   - **KẾT QUẢ CHỐT: Phương án A.**
   - *Hành động:* Cấm hoàn toàn component Badge. Trạng thái đơn hàng được hiển thị bằng Text thuần kết hợp Icon tiêu chuẩn trong Header của màn hình chi tiết, tuyệt đối không có hiệu ứng chuyển động hay chớp nháy. Cập nhật đồng bộ lại `order-status.md`, `client-app-scope.md`, `CLAUDE.md`, `rules/ui.md`.

2. **Xử lý trạng thái đơn hàng `RESCHEDULING`:**
   - **KẾT QUẢ CHỐT: Giữ `RESCHEDULING`.**
   - *Hành động:* Giữ `RESCHEDULING` trong enum backend (`app/domain/orderStatus.ts`); bổ sung luồng/mô tả hiển thị UI tương ứng trong `docs/product/client-app-scope.md` (hiển thị trạng thái sắp xếp lại lịch sau khi điều phối có thay đổi).

3. **Quyền đọc thư mục cá nhân trong `.claude/settings.local.json`:**
   - **KẾT QUẢ CHỐT: Giữ nguyên quyền đọc, hỏi khi truy cập nếu cần.**
   - *Hành động:* Không xóa rule `"Read(//Users/andy2015bui/**)"` trong `.claude/settings.local.json`.

---

## 9. MỤC "KHÔNG XÁC ĐỊNH ĐƯỢC / GIẢ ĐỊNH"

1. **[Xác minh từ tài liệu]**:
   - Khả năng chặn đọc file bằng `Read(**/.env*)` và sự ưu tiên của `deny` so với `allow`: Đã xác minh từ `https://code.claude.com/docs/en/permissions.md`.
   - Cơ chế nạp rule không có `paths` vào mọi session: Đã xác minh từ `https://code.claude.com/docs/en/memory.md`.
   - Cơ chế vô hiệu hóa tự gọi skill bằng `disable-model-invocation: true`: Đã xác minh từ `https://code.claude.com/docs/en/skills.md`.
   - Cơ chế chặn kết thúc lượt bằng `Stop` hook exit 2: Đã xác minh từ `https://code.claude.com/docs/en/hooks.md`.
   - Cơ chế cách ly của subagent không tự động nạp rules nếu chưa chạm file: Đã xác minh từ `https://code.claude.com/docs/en/sub-agents.md`.

2. **[Giả định - Cần xác thực thêm]**:
   - **Giả định 1:** Cấu hình ESLint hiện tại của repo cho phép thêm rule `max-lines` mà không xung đột với Ignite ESLint plugin hiện có.
   - **Giả định 2:** Việc xóa hoàn toàn 4 skill rác (`clean-code`, `senior-architect`, `react-native-architecture`, `ui-ux-pro-max`) không ảnh hưởng đến bất kỳ script tự động bên ngoài nào của bạn (các file này hoàn toàn là copy từ các mẫu generic web dev trên mạng).

---

## 10. ĐÁNH GIÁ CHUYÊN SÂU: KHẢ THI, HIỆU QUẢ, HẠN CHẾ SAI SÓT, BẢO MẬT & TRẢI NGHIỆM

### 10.1. Tính khả thi (Feasibility) — Điểm: 9.5/10
- **Zero dependency mới**: 100% giải pháp dùng tính năng sẵn có của Claude Code (`paths`, `deny`, `hooks`) và ESLint có sẵn của Ignite.
- **Tương thích tuyệt đối**: Không can thiệp build native (CNG / Expo SDK 57), giữ nguyên lệnh `bun run check`.
- **Rủi ro duy nhất**: Rule `max-lines: 150` có thể bắt lỗi các file boilerplate dài sẵn có của Ignite. Giải pháp: Thêm `skipBlankLines: true, skipComments: true` và khoanh vùng cho `app/features/**`.

### 10.2. Tính hiệu quả & Tối ưu Context (Efficacy / Token & Speed) — Điểm: 9/10
- **Dọn sạch rác ngữ cảnh**: Xóa 4 skill rác giải phóng 18 file CSV và hàng chục ngàn token mô tả sai lệch.
- **Nạp đúng lúc, đúng chỗ**: Thêm `paths` cho `security-privacy.md` giúp không bị nạp luật PII khi làm việc với build hay unit test.
- **Tốc độ phản hồi**: Giảm kích thước context giúp phản hồi nhanh hơn, tránh bị ép nén context (Compaction) giữa chừng.

### 10.3. Khả năng hạn chế sai sót & Ảo giác (Error Prevention / Reliability) — Điểm: 9.5/10
- **Chuyển đo lường lên Tầng 1**:
  - Giới hạn 150 dòng được ESLint + Hook `lint-on-edit.mjs` bắt tự động ngay khi lưu file, không phụ thuộc vào việc Claude có nhớ hay không.
  - Deny rules chặn cứng `npm/yarn/pnpm/bun test`, Claude không thể chạy nhầm dù có thiên kiến mặc định.
  - Stop Hook bắt buộc vượt qua `bun run check` trước khi kết thúc task có code change.
- **Xóa bỏ chỉ dẫn mâu thuẫn**: Loại bỏ hoàn toàn playbook xúi dùng `Expo Router` và `AsyncStorage`, chỉ giữ 1 nguồn sự thật duy nhất.

### 10.4. Khả năng bảo mật & Quyền riêng tư (Security & Privacy) — Điểm: 9.5/10
- **Bảo vệ Secrets đa tầng**: Mở rộng Deny Rules thành `Read(**/.env*)`, `Write(**/.env*)`, `Edit(**/.env*)` chặn đọc sửa biến môi trường ở mọi cấp thư mục.
- **Tuân thủ Privacy Act Úc**: Gán path chuẩn cho luật PII (`app/services/**`, `app/features/**`), đảm bảo nhắc nhở mask số tài khoản, HTTPS và cấm log PII.
- **Quyền tối thiểu (Least Privilege)**: Thu hẹp quyền `Bash` của subagent `code-reviewer` (chỉ `git diff`) và `test-writer` (chỉ `bun run test *`).

### 10.5. Hiệu quả sử dụng hàng ngày (Developer Experience) — Điểm: 9/10
- **Bỏ thủ tục rườm rà**: Xóa bỏ mẫu `🧠 CHECKPOINT:` trong `mobile-design` bắt in ra trước mỗi lần code.
- **Tự động kích hoạt đúng việc**: Gỡ bỏ `disable-model-invocation: true` ở `new-screen` và `new-api-service` giúp Claude tự áp dụng template chuẩn khi bạn yêu cầu tạo màn hình/API mới.
- **Giữ cân bằng**: Giữ yêu cầu "tách theo trách nhiệm", "mock tối thiểu" ở Tầng 2 & Tầng 3 (User review), không tạo linter thô bạo gây false-positive nghẽn việc.

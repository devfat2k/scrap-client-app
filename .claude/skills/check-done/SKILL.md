---
name: check-done
description: Kiểm tra thay đổi hiện tại theo Definition of Done của Scrap Client App. Dùng trước khi xác nhận hoàn thành task hoặc báo cáo xong.
---
1. Chạy `bun run compile`, `bun run lint:check`, `bun run test`.
2. Rà `git diff` theo Definition of Done: loading/error/empty/offline state, quy ước import/component, i18n chuẩn tiếng Anh (`en.ts`), không magic number, file <= 150 dòng.
3. Báo cáo: đạt / chưa đạt từng mục, kèm file:dòng cần sửa. Không tự sửa.

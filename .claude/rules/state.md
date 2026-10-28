---
paths:
  - "app/stores/**"
  - "app/features/**"
---
# State Management Rules

- **Global UI State**: Dùng React Context (cho theme, layout) hoặc Zustand (`app/stores/`) khi cần chia sẻ UI state giữa nhiều màn hình. KHÔNG dùng MobX-State-Tree (MST).
- **Server State**: TanStack Query quản lý toàn bộ server state (fetch, cache, invalidate). KHÔNG lưu API data vào Zustand hay global store.
- **Persistent Storage**: MMKV cho dữ liệu phi nhạy cảm (cài đặt, theme); `expo-secure-store` cho JWT token.
- **YAGNI**: Không thêm state store nếu React state cục bộ hoặc navigation params là đủ.

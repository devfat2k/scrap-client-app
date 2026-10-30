# Camera & Photo Picker Service Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Hoàn thiện và chuẩn hóa camera service cho việc chụp/chọn ảnh, validation dung lượng/định dạng và tự động nén kích thước phục vụ tính năng tạo yêu cầu thu mua phế liệu (C01).

**Architecture:** Tách biệt module thành các trách nhiệm độc lập: `cameraTypes.ts` (định nghĩa kiểu), `imageValidator.ts` (cổng kiểm tra dung lượng/format), `imageCompressor.ts` (nén resize chuẩn hóa) và `cameraServices.ts` (bọc ImagePicker và cấp quyền).

**Tech Stack:** React Native 0.86, Expo SDK 57, `expo-image-picker`, `expo-image-manipulator`, TypeScript strict.

**Spec:** [docs/superpowers/specs/2026-10-30-camera-photo-picker-design.md](docs/superpowers/specs/2026-10-30-camera-photo-picker-design.md)

## Global Constraints

- Package manager: `bun` và `bunx` ONLY (cấm npm, npx, yarn, pnpm).
- Tối đa ≤ 150 dòng/file (ESLint `max-lines`).
- Không `any` (dùng `unknown` + type guard), không `console.log` (dùng Reactotron nếu cần).
- Không tạo các file `.test.ts` (theo chỉ đạo rõ ràng từ người dùng).
- `bun run compile && bun run lint:check && bun run deps:check` phải pass 100%.

## Review Focus

- Trường hợp user bấm "Don't allow" vĩnh viễn trên iOS/Android: Service phải trả về `canAskAgain: false` và cung cấp hàm `openAppSettings()`.
- Trường hợp ảnh RAW/siêu nặng (>10MB): Validator phải chặn ngay lập tức mà không thực hiện nén.
- Trường hợp file không đúng định dạng ảnh (PDF/video): Validator phải chặn với mã `invalid_format`.
- Lỗi type lặp và `catch (e: any)` trong `cameraServices.ts` hiện tại: Thay thế toàn bộ bằng `unknown` và type guard an toàn.

---

### Task 1: Cấu hình Permissions Native trong `app.json` và cài đặt `expo-image-manipulator`

**Files:**
- Modify: `app.json:33-47`
- Modify: `package.json`

**Interfaces:**
- Produces: Cấu hình plugin `expo-image-picker` và thư viện `expo-image-manipulator`.

- [ ] **Step 1: Cài đặt `expo-image-manipulator` qua bunx expo install**

Chạy lệnh: `bunx expo install expo-image-manipulator`

- [ ] **Step 2: Cập nhật `plugins` trong `app.json`**

Thêm config plugin `expo-image-picker` vào mảng `plugins`:
```json
[
  "expo-image-picker",
  {
    "photosPermission": "The app needs access to your photos to attach scrap images to pickup requests.",
    "cameraPermission": "The app needs access to your camera to take scrap photos."
  }
]
```

- [ ] **Step 3: Kiểm tra compile & lint**

Chạy lệnh: `bun run compile && bun run lint:check`

- [ ] **Step 4: Commit**

```bash
git add app.json package.json bun.lock
git commit -m "chore(camera): add expo-image-manipulator and configure image picker plugins"
```

---

### Task 2: Định nghĩa Kiểu dữ liệu & Constants (`cameraTypes.ts`)

**Files:**
- Create: `app/services/camera/cameraTypes.ts`

**Interfaces:**
- Produces: `ProcessedAsset`, `PickerErrorCode`, `PickerResultOk`, `PickerResultCancelled`, `PickerResultError`, `PickerResult`, `ValidationResult`.

- [ ] **Step 1: Tạo file `app/services/camera/cameraTypes.ts`**

Định nghĩa đầy đủ:
- `ProcessedAsset`: `{ uri: string, width: number, height: number, fileName?: string, mimeType?: string, fileSize?: number }`
- `PickerErrorCode`: `"camera_unavailable" | "permission_denied" | "file_too_large" | "invalid_format" | "others"`
- `PickerResultOk`: `{ canceled: false, assets: ProcessedAsset[] }`
- `PickerResultCancelled`: `{ canceled: true, assets: [] }`
- `PickerResultError`: `{ canceled: false, assets: [], errorCode: PickerErrorCode, errorMessage?: string, canAskAgain?: boolean }`
- `PickerResult`: union của 3 loại trên.
- `ValidationResult`: `{ valid: boolean, errorCode?: PickerErrorCode, errorMessage?: string }`
- Constants:
  - `MAX_RAW_FILE_SIZE = 10 * 1024 * 1024` (10MB)
  - `MAX_PROCESSED_FILE_SIZE = 2 * 1024 * 1024` (2MB)
  - `ALLOWED_MIME_TYPES = ["image/jpeg", "image/png", "image/heic", "image/webp"]`

- [ ] **Step 2: Kiểm tra compile & lint**

Chạy lệnh: `bun run compile && bunx eslint app/services/camera/cameraTypes.ts`

- [ ] **Step 3: Commit**

```bash
git add app/services/camera/cameraTypes.ts
git commit -m "feat(camera): define camera and picker types and constants"
```

---

### Task 3: Triển khai Client Validation Gate (`imageValidator.ts`)

**Files:**
- Create: `app/services/camera/imageValidator.ts`

**Interfaces:**
- Consumes: `ImagePicker.ImagePickerAsset`, `ProcessedAsset`, `cameraTypes.ts`
- Produces: `validateRawAsset(asset: ImagePicker.ImagePickerAsset): ValidationResult`, `validateProcessedAsset(asset: ProcessedAsset): ValidationResult`

- [ ] **Step 1: Tạo file `app/services/camera/imageValidator.ts`**

Triển khai:
- `validateRawAsset`: Kiểm tra dung lượng thô nếu có (`fileSize > MAX_RAW_FILE_SIZE` -> `file_too_large`), kiểm tra `mimeType` nếu có (`!ALLOWED_MIME_TYPES.includes(mimeType)` -> `invalid_format`).
- `validateProcessedAsset`: Kiểm tra dung lượng sau nén nếu có (`fileSize > MAX_PROCESSED_FILE_SIZE` -> `file_too_large`).

- [ ] **Step 2: Kiểm tra compile & lint**

Chạy lệnh: `bun run compile && bunx eslint app/services/camera/imageValidator.ts`

- [ ] **Step 3: Commit**

```bash
git add app/services/camera/imageValidator.ts
git commit -m "feat(camera): implement image validator gate"
```

---

### Task 4: Triển khai Bộ Nén và Chuẩn hóa Ảnh (`imageCompressor.ts`)

**Files:**
- Create: `app/services/camera/imageCompressor.ts`

**Interfaces:**
- Consumes: `ImagePicker.ImagePickerAsset`, `cameraTypes.ts`, `expo-image-manipulator`
- Produces: `compressAndNormalizeImage(asset: ImagePicker.ImagePickerAsset): Promise<ProcessedAsset>`

- [ ] **Step 1: Tạo file `app/services/camera/imageCompressor.ts`**

Triển khai:
- Tính toán kích thước: Cạnh lớn nhất nếu > 1600px thì resize theo tỷ lệ gốc (width hoặc height = 1600).
- Gọi `ImageManipulator.manipulateAsync` với `{ compress: 0.8, format: ImageManipulator.SaveFormat.JPEG }`.
- Đóng gói trả về `ProcessedAsset`. Bắt lỗi `unknown` và fallback về asset gốc nếu manipulate thất bại.

- [ ] **Step 2: Kiểm tra compile & lint**

Chạy lệnh: `bun run compile && bunx eslint app/services/camera/imageCompressor.ts`

- [ ] **Step 3: Commit**

```bash
git add app/services/camera/imageCompressor.ts
git commit -m "feat(camera): implement image compressor and normalizer"
```

---

### Task 5: Refactor và Tối ưu hóa `cameraServices.ts`

**Files:**
- Modify: `app/services/camera/cameraServices.ts`

**Interfaces:**
- Consumes: `cameraTypes.ts`, `imageValidator.ts`, `imageCompressor.ts`, `expo-image-picker`, `react-native Linking`
- Produces: `takePhoto(options?)`, `pickImages(options?)`, `pickImage(options?)`, `openAppSettings()`

- [ ] **Step 1: Refactor toàn bộ `cameraServices.ts`**

Cải tiến:
- Loại bỏ toàn bộ `any`, dùng `unknown` + helper lấy error message.
- Sửa lỗi type duplicate ở `takePhoto`.
- Bổ sung `canAskAgain` khi quyền bị từ chối (`!perm.granted`).
- Tích hợp pipeline sau khi picker trả về: `validateRawAsset` -> `compressAndNormalizeImage` -> `validateProcessedAsset`.
- Xuất hàm tiện ích `openAppSettings() => Linking.openSettings()`.
- Đảm bảo file ≤ 150 dòng code.

- [ ] **Step 2: Kiểm tra compile, lint, depcruise toàn dự án**

Chạy lệnh: `bun run compile && bun run lint:check && bun run deps:check`

- [ ] **Step 3: Commit**

```bash
git add app/services/camera/cameraServices.ts
git commit -m "refactor(camera): modernize cameraServices with validation, compression and permission handling"
```

---

### Task 6: Tích hợp barrel export và chạy Verification hoàn chỉnh

**Files:**
- Create: `app/services/camera/index.ts`

**Interfaces:**
- Produces: Re-export các hàm và types cần dùng cho màn hình Form (`pickImages`, `takePhoto`, `openAppSettings`, `ProcessedAsset`, `PickerResult`).

- [ ] **Step 1: Tạo file `app/services/camera/index.ts`**

Re-export các hàm và type từ `cameraServices.ts` và `cameraTypes.ts`.

- [ ] **Step 2: Chạy kiểm tra toàn bộ chất lượng (`bun run check`)**

Chạy lệnh: `bun run check`
Đảm bảo tất cả compile, lint, dependency cruiser và existing tests đều pass.

- [ ] **Step 3: Commit**

```bash
git add app/services/camera/index.ts
git commit -m "feat(camera): add barrel export for camera module"
```

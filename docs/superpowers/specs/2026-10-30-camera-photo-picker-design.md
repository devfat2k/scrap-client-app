# Camera & Photo Picker Service Design

- **Date**: 2026-10-30
- **Status**: Approved by User
- **Feature Scope**: Client App - Pickup Request Image Attachment (C01)
- **Target Platform**: React Native 0.86, Expo SDK 57 (New Architecture), iOS & Android

---

## 1. Context & Business Intent

Trong chức năng **C01: Tạo yêu cầu thu mua** của ứng dụng Scrap Client App (Úc):
- Khách hàng đính kèm tối đa **3 ảnh** chụp phế liệu để bên điều phối định giá và sắp xếp xe.
- Quy tắc dữ liệu yêu cầu: Ảnh phải được kiểm soát kích thước, dung lượng và nén phía client trước khi upload.
- Phạm vi hiện tại: **Chỉ tập trung vào tầng Client Service & Validation Gate (chọn, chụp, xử lý quyền, validation kích thước/dung lượng, nén chuẩn hóa)**. Phần upload lên server tạm thời chưa phát triển theo yêu cầu người dùng.
- Chiến lược phát triển: Tập trung hoàn thiện logic và trải nghiệm trực tiếp trên app, tạm bỏ qua các file unit test `.test.ts`.

---

## 2. Goals, Non-Goals & Anti-Goals

### Goals
1. Cung cấp API Service chuẩn hóa (`cameraServices.ts`) cho 3 hành động:
   - Chụp ảnh từ camera (`takePhoto`).
   - Chọn ảnh từ thư viện (`pickImages`, hỗ trợ `selectionLimit` dựa trên số slot còn lại).
   - Kiểm tra và yêu cầu quyền truy cập (kèm cờ `canAskAgain` và helper mở Settings khi bị từ chối vĩnh viễn).
2. **Cổng kiểm tra hợp lệ tại Client (Client-side Validation Gate - `imageValidator.ts`)**:
   - Kiểm tra dung lượng ảnh gốc trước khi xử lý (ví dụ: tối đa 10MB).
   - Kiểm tra dung lượng sau khi nén (ví dụ: tối đa 2MB).
   - Kiểm tra định dạng ảnh cho phép (JPEG, PNG, HEIC, WEBP).
   - Trả về mã lỗi rõ ràng (`file_too_large`, `invalid_format`) để UI cảnh báo ngay, chặn request rác lên server.
3. Tự động nén và chuẩn hóa kích thước/chất lượng ảnh ngay sau khi chọn/chụp (JPEG, resize cạnh dài tối đa 1600px, quality 0.8 qua `imageCompressor.ts`).
4. Tuân thủ 100% quy chuẩn dự án:
   - Dưới 150 dòng/file.
   - Không dùng `any`, xử lý kiểu dữ liệu chặt chẽ (`unknown` + type guard).
   - Khai báo đầy đủ permission trong `app.json` cho Expo Prebuild.

### Non-Goals
- Upload lên backend / S3 / API multipart (để dành cho giai đoạn tích hợp API).
- Crop ảnh native bắt buộc sau khi chụp/chọn.
- Viết unit test `.test.ts` (theo chỉ định của người dùng).

### Anti-Goals
- Không ép người dùng crop ảnh tuần tự từng tấm một.
- Không để ảnh quá dung lượng hoặc ảnh gốc dung lượng lớn đi vào state của form hoặc gửi lên Server.

---

## 3. Architecture & Module Design

### 3.1. Structure

```text
app/
├── services/
│   └── camera/
│       ├── cameraServices.ts       # Core logic: ImagePicker wrapper & permission handler
│       ├── imageCompressor.ts      # Compression & normalization via expo-image-manipulator
│       ├── imageValidator.ts       # Validation gate: file size, format checks
│       └── cameraTypes.ts          # Type definitions, error codes & result shapes
```

### 3.2. Types (`cameraTypes.ts`)

```typescript
export interface ProcessedAsset {
  uri: string
  width: number
  height: number
  fileName?: string
  mimeType?: string
  fileSize?: number
}

export type PickerErrorCode =
  | "camera_unavailable"
  | "permission_denied"
  | "file_too_large"
  | "invalid_format"
  | "others"

export interface PickerResultOk {
  canceled: false
  assets: ProcessedAsset[]
}

export interface PickerResultCancelled {
  canceled: true
  assets: []
}

export interface PickerResultError {
  canceled: false
  assets: []
  errorCode: PickerErrorCode
  errorMessage?: string
  canAskAgain?: boolean
}

export type PickerResult = PickerResultOk | PickerResultCancelled | PickerResultError
```

### 3.3. Module: `cameraServices.ts`
- Bọc các hàm `requestCameraPermissionsAsync`, `requestMediaLibraryPermissionsAsync`, `launchCameraAsync`, `launchImageLibraryAsync`.
- Nhận `maxPhotos` hoặc `selectionLimit` (mặc định tính theo số slot còn lại của form, tối đa 3).
- Cung cấp hàm tiện ích `openAppSettings()` thông qua `Linking.openSettings()` để UI gọi khi quyền bị khóa vĩnh viễn (`canAskAgain === false`).

### 3.4. Module: `imageValidator.ts` (Validation Gate)
- Định nghĩa ngưỡng giới hạn:
  - `MAX_RAW_FILE_SIZE = 10 * 1024 * 1024` (10MB cho ảnh gốc từ thư viện).
  - `MAX_PROCESSED_FILE_SIZE = 2 * 1024 * 1024` (2MB cho ảnh sau nén).
  - `ALLOWED_MIME_TYPES = ["image/jpeg", "image/png", "image/heic", "image/webp"]`.
- Hàm kiểm tra:
  - `validateRawAsset(asset: ImagePicker.ImagePickerAsset): { valid: boolean; errorCode?: PickerErrorCode; message?: string }`
  - `validateProcessedAsset(asset: ProcessedAsset): { valid: boolean; errorCode?: PickerErrorCode; message?: string }`

### 3.5. Module: `imageCompressor.ts`
- Sử dụng `expo-image-manipulator` (thư viện chính chủ Expo SDK 57).
- Chuẩn hóa:
  - Nếu chiều rộng hoặc chiều cao > 1600px: resize giữ nguyên tỉ lệ với cạnh lớn nhất = 1600px.
  - Định dạng: JPEG, `compress: 0.8`.
- Trả về `ProcessedAsset` chứa URI cục bộ đã nén và kích thước mới.

---

## 4. UI/UX Interaction Flow

1. **Trigger**: Người dùng bấm nút "Thêm ảnh" trên form tạo yêu cầu.
2. **Bottom Sheet Option**:
   - Hiện 2 tùy chọn: "Take Photo" (Chụp ảnh) và "Choose from Library" (Chọn từ thư viện).
   - Hiển thị số lượng ảnh còn có thể chọn: ví dụ `(Còn lại 2/3)`.
3. **Permission Check**:
   - Nếu quyền chưa cấp: Hệ thống hiển thị popup xin quyền hệ thống.
   - Nếu quyền bị từ chối vĩnh viễn: Hiển thị thông báo thân thiện kèm nút "Mở Cài đặt" (Open Settings).
4. **Execution & Validation & Compression**:
   - Sau khi chụp hoặc chọn xong, ảnh đi qua `imageValidator` để kiểm tra kích thước / định dạng.
   - Nếu không đạt: Báo lỗi ngay lập tức, không tốn tài nguyên nén và thông báo cho người dùng chọn lại.
   - Nếu đạt: Ảnh đi qua `imageCompressor` xử lý ngầm (resize cạnh max 1600px, JPEG quality 0.8).
   - Kiểm tra lại dung lượng sau nén xem có vượt ngưỡng 2MB hay không.
   - Trả về danh sách `ProcessedAsset` cho form hiển thị thumbnail preview.
5. **Thumbnail Management**:
   - Mỗi ảnh preview có nút "Xóa".
   - Tùy chọn "Thay thế" khi bấm vào ảnh, mở lại Bottom Sheet để chọn/chụp ảnh khác đè vào vị trí đó.

---

## 5. Configuration Updates (`app.json`)

Thêm cấu hình plugin `expo-image-picker` để Expo prebuild tạo đầy đủ quyền iOS `Info.plist` và Android `AndroidManifest.xml`:

```json
[
  "expo-image-picker",
  {
    "photosPermission": "The app needs access to your photos to attach scrap images to pickup requests.",
    "cameraPermission": "The app needs access to your camera to take scrap photos."
  }
]
```

---

## 6. Verification & Quality Gates

- **Quality Gates**:
  - `bun run compile`: Kiểm tra lỗi TypeScript toàn bộ dự án.
  - `bun run lint:check`: Kiểm tra ESLint (không `any`, không `console.log`, file ≤ 150 dòng).
  - `bun run deps:check`: Đảm bảo quy tắc phụ thuộc kiến trúc.

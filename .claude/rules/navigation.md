---
paths:
  - "app/navigators/**"
  - "app/screens/**"
---
# Navigation Rules

- **Thêm screen**: Khai báo route trong `AppStackParamList` (`app/navigators/navigationTypes.ts`) → Thêm `Stack.Screen` tại vị trí anchor `IGNITE_GENERATOR_ANCHOR_APP_STACK_SCREENS` trong `AppNavigator.tsx`.
- **Screen Props**: Dùng type `AppStackScreenProps<"ScreenName">` cho props của màn hình.
- **Deep Linking**: Khai báo path tương ứng trong `config.screens` tại `app.tsx`.

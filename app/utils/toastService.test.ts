import Toast from "react-native-toast-message"

import { hideToast, showToast } from "./toastService"

jest.mock("react-native-toast-message", () => ({
  __esModule: true,
  default: {
    show: jest.fn(),
    hide: jest.fn(),
  },
}))

describe("toastService", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it("calls Toast.hide before Toast.show to prevent overlapping", () => {
    showToast({ message: "Test message" })

    expect(Toast.hide).toHaveBeenCalledTimes(1)
    expect(Toast.show).toHaveBeenCalledTimes(1)
  })

  it("shows toast with default parameters", () => {
    showToast({ message: "Default toast" })

    expect(Toast.show).toHaveBeenCalledWith(
      expect.objectContaining({
        type: "normal",
        text1: "Default toast",
        position: "top",
        visibilityTime: 2000,
      }),
    )
  })

  it("maps types correctly", () => {
    showToast({ message: "Success", type: "SUCCESS" })
    expect(Toast.show).toHaveBeenLastCalledWith(
      expect.objectContaining({
        type: "success",
        text1: "Success",
      }),
    )

    showToast({ message: "Error", type: "ERROR" })
    expect(Toast.show).toHaveBeenLastCalledWith(
      expect.objectContaining({
        type: "error",
        text1: "Error",
      }),
    )

    showToast({ message: "Warning", type: "WARNING" })
    expect(Toast.show).toHaveBeenLastCalledWith(
      expect.objectContaining({
        type: "warning",
        text1: "Warning",
      }),
    )

    showToast({ message: "Custom", type: "CUSTOM" })
    expect(Toast.show).toHaveBeenLastCalledWith(
      expect.objectContaining({
        type: "custom",
        text1: "Custom",
      }),
    )
  })

  it("maps positions correctly", () => {
    showToast({ message: "Top toast", position: "TOP" })
    expect(Toast.show).toHaveBeenLastCalledWith(
      expect.objectContaining({
        position: "top",
      }),
    )

    showToast({ message: "Bottom toast", position: "BOTTOM" })
    expect(Toast.show).toHaveBeenLastCalledWith(
      expect.objectContaining({
        position: "bottom",
      }),
    )
  })

  it("supports subtitle, duration, and onPress callbacks", () => {
    const onPressMock = jest.fn()
    showToast({
      message: "Title",
      subtitle: "Subtitle",
      duration: 3500,
      onPress: onPressMock,
    })

    expect(Toast.show).toHaveBeenCalledWith(
      expect.objectContaining({
        text1: "Title",
        text2: "Subtitle",
        visibilityTime: 3500,
        onPress: onPressMock,
      }),
    )
  })

  it("hides toast on hideToast call", () => {
    hideToast()
    expect(Toast.hide).toHaveBeenCalledTimes(1)
  })
})

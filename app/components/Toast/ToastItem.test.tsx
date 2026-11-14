import { fireEvent, render } from "@testing-library/react-native"

import { ThemeProvider } from "@/theme/context"

import { ToastItem } from "./ToastItem"

jest.mock("@/components/Icon", () => {
  const { View: MockView } = require("react-native")
  return {
    Icon: ({ icon }: { icon: string; color?: string; size?: number }) => (
      <MockView testID={`icon-${icon}`} />
    ),
  }
})

function renderWithTheme(component: React.ReactElement) {
  return render(<ThemeProvider>{component}</ThemeProvider>)
}

describe("ToastItem", () => {
  it("renders text1 and text2 correctly", () => {
    const { getByText } = renderWithTheme(
      <ToastItem type="success" text1="Operation successful" text2="Your data was saved" />,
    )

    expect(getByText("Operation successful")).toBeDefined()
    expect(getByText("Your data was saved")).toBeDefined()
  })

  it("renders only text1 when text2 is absent", () => {
    const { getByText, queryByText } = renderWithTheme(
      <ToastItem type="normal" text1="Single message" />,
    )

    expect(getByText("Single message")).toBeDefined()
    expect(queryByText("Your data was saved")).toBeNull()
  })

  it("renders correct icon for toast types", () => {
    const { getByTestId, rerender } = renderWithTheme(<ToastItem type="success" text1="Success" />)
    expect(getByTestId("icon-check")).toBeDefined()

    rerender(
      <ThemeProvider>
        <ToastItem type="error" text1="Error" />
      </ThemeProvider>,
    )
    expect(getByTestId("icon-x")).toBeDefined()

    rerender(
      <ThemeProvider>
        <ToastItem type="warning" text1="Warning" />
      </ThemeProvider>,
    )
    expect(getByTestId("icon-bell")).toBeDefined()
  })

  it("handles onPress callback when pressed", () => {
    const onPressMock = jest.fn()
    const { getByRole } = renderWithTheme(
      <ToastItem type="error" text1="Error occurred" onPress={onPressMock} />,
    )

    const alertElement = getByRole("alert")
    fireEvent.press(alertElement)

    expect(onPressMock).toHaveBeenCalledTimes(1)
  })
})

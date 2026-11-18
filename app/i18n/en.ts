import homeEn from "./en/home"
import orderEn from "./en/order"
import requestEn from "./en/request"

const en = {
  account: {
    title: "Account",
    guest: "Guest",
    description: "Your basic contact information.",
    contactDetails: "Contact details",
    fullName: "Full name",
    phone: "Phone number",
    email: "Email",
    notProvided: "Not provided",
  },
  common: {
    ok: "OK!",
    cancel: "Cancel",
    done: "Done",
    back: "Back",
    required: "Required",
  },
  ...homeEn,
  ...requestEn,
  ...orderEn,
  welcomeScreen: {
    postscript:
      "psst  — This probably isn't what your app looks like. (Unless your designer handed you these screens, and in that case, ship it!)",
    readyForLaunch: "Your app, almost ready for launch!",
    exciting: "(ohh, this is exciting!)",
  },
  errorScreen: {
    title: "Something went wrong!",
    friendlySubtitle:
      "This is the screen that your users will see in production when an error is thrown. You'll want to customize this message (located in `app/i18n/en.ts`) and probably the layout as well (`app/screens/ErrorScreen`). If you want to remove this entirely, check `app/app.tsx` for the <ErrorBoundary> component.",
    reset: "RESET APP",
  },
  emptyStateComponent: {
    generic: {
      heading: "So empty... so sad",
      content: "No data found yet. Try clicking the button to refresh or reload the app.",
      button: "Let's try this again",
    },
  },
}

export default en
export type Translations = typeof en

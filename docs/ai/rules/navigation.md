# Navigation Rules

- React Navigation 7 with typed stack/tab params in `app/navigators/navigationTypes.ts`; no Expo Router.
- Register a screen in its owning stack, not automatically in the root AppStack. Current modules have Home, History, Account, Auth and Request stacks under `app/screens/`.
- Use the owning stack's param list for screen props. Keep root navigation for cross-stack actions and type nested params explicitly.
- Review relevant linking configuration in `app/app.tsx` only when adding/changing externally addressable routes. Do not assume every internal screen needs a deep link.
- Specify Back, reset, tab visibility and success-exit behavior in the task spec. Preserve identifiers across Home, details and History; do not recreate a separate mock record for each route.

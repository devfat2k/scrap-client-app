# API Rules

- Apply real API requirements when the active phase/task includes integration. Do not make an HTTP endpoint a prerequisite for an accepted mock flow.
- Use the existing singleton `api` in `app/services/api`, configured through `Config.API_URL`. Domain services inject `api.apisauce`; do not put feature methods in the base Api class or components.
- Follow existing ApiEnvelope/unwrap/ApiError and apiProblem conventions after inspecting the relevant service; avoid parallel error protocols.
- Server queries/mutations use the existing TanStack Query infrastructure, registered query scopes/keys and explicit invalidation. No duplicate server-state store.
- Handle session expiry/refresh only in its approved scope; never invent a backend authentication contract.

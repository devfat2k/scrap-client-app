# State Rules

- Choose the smallest existing mechanism that preserves the specified behavior. Local state for isolated UI; Context for shared UI; another store only when justified and approved. Do not add Zustand or another package just because a guide mentions it.
- TanStack Query owns real server state, caching and invalidation. Do not duplicate API data into UI stores.
- In a mock phase, changes must propagate across related screens using a shared source/repository or existing cache as approved. Mock data does not require premature HTTP contracts or a new server-state abstraction.
- Persist only what the spec requires. MMKV is for non-sensitive preferences/data with appropriate privacy review; credentials require secure storage when Auth is implemented. Do not assume an uninstalled secure-store library is available.
- Keep fixtures minimal but sufficient to prove the accepted scenarios. Do not add large fake datasets, invent metrics or misrepresent mock behavior as backend integration.

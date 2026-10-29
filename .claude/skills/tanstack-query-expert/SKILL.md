---
name: tanstack-query-expert
description: Expert in TanStack Query for React Native client apps (Query Key factories, custom query/mutation hooks, cache invalidation, optimistic updates).
---

# TanStack Query (React Native Client)

Asynchronous server-state management for React Native applications. Handles caching, background synchronization, deduplication, and loading/error states.

## Core Rules for React Native
- **Never mirror server state:** Never copy query data into local component state (`useState`) or global UI state (`Zustand/Context`). Derive state during render.
- **Custom hook encapsulation:** Always wrap `useQuery` and `useMutation` in custom hooks under `app/features/<feature>/hooks/`. UI components must only consume hooks.
- **Query key factories:** Use structured query key factories to avoid mismatched cache keys.

## Query Key Factory Pattern

```typescript
export const orderKeys = {
  all: ['orders'] as const,
  lists: () => [...orderKeys.all, 'list'] as const,
  list: (status?: string) => [...orderKeys.lists(), { status }] as const,
  details: () => [...orderKeys.all, 'detail'] as const,
  detail: (id: string) => [...orderKeys.details(), id] as const,
};
```

## Query Hook Pattern

```typescript
import { useQuery } from '@tanstack/react-query';
import { api } from '@/services/api';
import { orderKeys } from './orderKeys';

export const useOrderDetail = (orderId: string) => {
  return useQuery({
    queryKey: orderKeys.detail(orderId),
    queryFn: async () => {
      const response = await api.getOrder(orderId);
      if (!response.ok) throw new Error(response.problem);
      return response.data;
    },
    staleTime: 1000 * 60 * 2, // 2 minutes
    enabled: Boolean(orderId),
  });
};
```

## Mutation Hook with Cache Invalidation

```typescript
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/services/api';
import { orderKeys } from './orderKeys';

export const useCancelOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (orderId: string) => {
      const response = await api.cancelOrder(orderId);
      if (!response.ok) throw new Error(response.problem);
      return response.data;
    },
    onSuccess: (_data, orderId) => {
      queryClient.invalidateQueries({ queryKey: orderKeys.detail(orderId) });
      queryClient.invalidateQueries({ queryKey: orderKeys.lists() });
    },
  });
};
```

## Best Practices
- **staleTime vs gcTime:** `staleTime` determines when data is considered stale. `gcTime` determines how long inactive cache persists in memory (ensure `gcTime >= staleTime`).
- **Network status:** Use NetInfo integration or onlineManager for offline-first resilience.

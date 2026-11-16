import { HISTORY_ORDERS } from "@/screens/History/mocks/historyOrders"
import type { RequestOrder } from "@/screens/History/types/order"

/**
 * Temporary: reuse the History mock until the requests API is wired.
 */
export const RECENT_REQUEST: RequestOrder | undefined = HISTORY_ORDERS[0]

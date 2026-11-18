import { DriverContact } from "@/components/order/DriverContact"
import type { DriverAssignment } from "@/domain/driver"

export function OrderDriver({ driver }: { driver?: DriverAssignment }) {
  return <DriverContact driver={driver} />
}

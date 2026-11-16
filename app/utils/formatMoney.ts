/**
 * Formats an integer amount of cents, e.g. 2000 -> "$20.00".
 * Avoids `Intl` so the output is consistent across Hermes versions.
 */
export function formatMoneyFromCents(cents: number): string {
  const sign = cents < 0 ? "-" : ""
  return `${sign}$${(Math.abs(cents) / 100).toFixed(2)}`
}

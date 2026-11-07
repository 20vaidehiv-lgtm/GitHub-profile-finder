export function formatCompact(value) {
  const number = Number(value) || 0;
  return new Intl.NumberFormat("en-US", { notation: "compact", maximumFractionDigits: 1 }).format(number);
}

export function formatFull(value) {
  return new Intl.NumberFormat("en-US").format(Number(value) || 0);
}

export function formatJoined(iso) {
  if (!iso) return null;
  return new Date(iso).toLocaleDateString("en-US", { month: "short", year: "numeric", timeZone: "UTC" });
}
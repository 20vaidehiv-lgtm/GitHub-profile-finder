const STORAGE_KEY = "gpf-recent-searches";
const LIMIT = 5;

export function getRecentSearches() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((item) => typeof item === "string") : [];
  } catch {
    return [];
  }
}

export function addRecentSearch(username) {
  const clean = String(username || "").trim();
  if (!clean) return getRecentSearches();
  const next = [clean, ...getRecentSearches().filter((item) => item.toLowerCase() !== clean.toLowerCase())].slice(
    0,
    LIMIT
  );
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    /* ignore */
  }
  return next;
}

export function clearRecentSearches() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    /* ignore */
  }
  return [];
}
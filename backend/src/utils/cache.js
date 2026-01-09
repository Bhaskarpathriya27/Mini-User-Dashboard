// Simple in-memory cache with TTL (time-to-live) support
const store = new Map();

function set(key, value, ttlSeconds = 60) {
  const expiresAt = Date.now() + ttlSeconds * 1000;
  store.set(key, { value, expiresAt });
}

function get(key) {
  const entry = store.get(key);
  if (!entry) return null;

  // Check if expired
  if (Date.now() > entry.expiresAt) {
    store.delete(key);
    return null; // Cache miss
  }

  return entry.value;
}

module.exports = { set, get };

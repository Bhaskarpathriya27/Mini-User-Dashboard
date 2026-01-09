export async function fetchCoins() {
  const res = await fetch("/api/coins");

  if (!res.ok) {
    const message = await res.text();
    throw new Error(message || "Failed to fetch coins");
  }

  if (res.status === 204) return [];

  return res.json();
}

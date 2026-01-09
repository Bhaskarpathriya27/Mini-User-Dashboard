const client = require("../clients/coingeckoClient");
const cache = require("../utils/cache");
const { CACHE_TTL_SECONDS } = require("../config");

const CACHE_KEY = "coins:top10";

// Get top 10 coins. Returns from cache if available (within TTL).
// Otherwise fetches from CoinGecko and caches the result.
async function getTopCoins() {
  // Check cache first
  const cached = cache.get(CACHE_KEY);
  if (cached) return cached;

  // Fetch from external API
  const data = await client.fetchMarkets();

  // Validate we got an array
  if (!Array.isArray(data)) {
    const err = new Error("Invalid response from CoinGecko");
    err.status = 502; // Bad Gateway
    throw err;
  }

  // Extract only the fields we need
  const coins = data.map((coin) => ({
    name: coin.name,
    symbol: coin.symbol,
    image: coin.image,
    current_price: coin.current_price,
    price_change_percentage_24h: coin.price_change_percentage_24h,
    market_cap: coin.market_cap,
  }));

  // Save to cache for next time
  cache.set(CACHE_KEY, coins, CACHE_TTL_SECONDS);

  return coins;
}

module.exports = { getTopCoins };

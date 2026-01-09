const axios = require("axios");
const { COINGECKO_TIMEOUT } = require("../config");

const client = axios.create({
  baseURL: "https://api.coingecko.com/api/v3",
  timeout: COINGECKO_TIMEOUT,
});

async function fetchMarkets() {
  let attempt = 0;
  const maxRetries = 2;

  while (attempt <= maxRetries) {
    try {
      const res = await client.get("/coins/markets", {
        params: {
          vs_currency: "usd",
          order: "market_cap_desc",
          per_page: 10,
          page: 1,
        },
      });
      return res.data;
    } catch (err) {
      attempt += 1;
      const status = err.response?.status;
      // Retry on network errors or server errors (5xx)
      const isNetworkError = !err.response; // timeout, no connection
      const isServerError = status && status >= 500;
      const shouldRetry = isNetworkError || isServerError;

      if (!shouldRetry || attempt > maxRetries) {
        throw err; // Give up
      }

      // Wait a bit before retrying
      const delay = 200 * attempt;
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
}

module.exports = { fetchMarkets };

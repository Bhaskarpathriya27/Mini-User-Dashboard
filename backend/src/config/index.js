require("dotenv").config();

module.exports = {
  PORT: parseInt(process.env.PORT) || 4000,
  COINGECKO_TIMEOUT: parseInt(process.env.COINGECKO_TIMEOUT) || 5000,
  CACHE_TTL_SECONDS: parseInt(process.env.CACHE_TTL_SECONDS) || 60,
};

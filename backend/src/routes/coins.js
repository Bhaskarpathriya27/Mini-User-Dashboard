const express = require("express");
const router = express.Router();
const coinService = require("../services/coinService");

// GET /api/coins
// Returns top 10 coins with name, symbol, price, etc.
router.get("/", async (req, res, next) => {
  try {
    const coins = await coinService.getTopCoins();
    res.json(coins);
  } catch (err) {
    // Pass error to error handler middleware
    next(err);
  }
});

module.exports = router;

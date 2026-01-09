const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const coinsRouter = require("./routes/coins");
const errorHandler = require("./middleware/errorHandler");
const { PORT } = require("./config");

const app = express();

// middleware
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

// routes
app.use("/api/coins", coinsRouter);
app.get("/health", (req, res) => res.json({ status: "ok" }));

// error handling (must be last)
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});

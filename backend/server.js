require("dotenv").config();
const express = require("express");
const cors = require("cors");

const citiesRouter = require("./routes/cities");

const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:3000",
  credentials: true
}));

app.use(express.json());

app.get("/health", (_req, res) => res.json({ ok: true }));

app.use("/api/cities", citiesRouter);

const PORT = Number(process.env.PORT || 4000);
app.listen(PORT, () => {
  console.log(`✅ Backend running on http://localhost:${PORT}`);
});

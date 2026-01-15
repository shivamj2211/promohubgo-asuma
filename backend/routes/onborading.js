const express = require("express");
const pool = require("../db");
const { requireAuth } = require("../middleware/auth");

const router = express.Router();

router.post("/complete", requireAuth, async (req, res) => {
  await pool.query(`UPDATE users SET is_onboarded=true, updated_at=now() WHERE id=$1`, [req.user.id]);
  res.json({ ok: true });
});

module.exports = router;

const express = require("express");
const pool = require("../db");
const { requireAuth } = require("../middleware/auth");

const router = express.Router();

router.patch("/profile", requireAuth, async (req, res) => {
  const { here_to_do, approx_budget, business_type } = req.body || {};

  await pool.query(
    `
    INSERT INTO brand_profiles(user_id, here_to_do, approx_budget, business_type)
    VALUES($1,$2,$3,$4)
    ON CONFLICT (user_id)
    DO UPDATE SET here_to_do=EXCLUDED.here_to_do, approx_budget=EXCLUDED.approx_budget, business_type=EXCLUDED.business_type, updated_at=now()
    `,
    [req.user.id, here_to_do || null, approx_budget || null, business_type || null]
  );

  res.json({ ok: true });
});

router.put("/categories", requireAuth, async (req, res) => {
  const { categories } = req.body || {};
  const arr = Array.isArray(categories) ? categories : [];
  if (arr.length > 3) return res.status(400).json({ ok: false, error: "Max 3 categories" });

  await pool.query(`DELETE FROM brand_influencer_categories WHERE user_id=$1`, [req.user.id]);
  for (const c of arr) {
    await pool.query(`INSERT INTO brand_influencer_categories(user_id, category) VALUES($1,$2)`, [req.user.id, String(c)]);
  }
  res.json({ ok: true });
});

router.put("/platforms", requireAuth, async (req, res) => {
  const { platforms } = req.body || {};
  const arr = Array.isArray(platforms) ? platforms : [];

  await pool.query(`DELETE FROM brand_target_platforms WHERE user_id=$1`, [req.user.id]);
  for (const p of arr) {
    await pool.query(`INSERT INTO brand_target_platforms(user_id, platform) VALUES($1,$2)`, [req.user.id, String(p)]);
  }
  res.json({ ok: true });
});

module.exports = router;

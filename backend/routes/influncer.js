const express = require("express");
const pool = require("../db");
const { requireAuth } = require("../middleware/auth");

const router = express.Router();

router.patch("/profile", requireAuth, async (req, res) => {
  const { gender, dob, title, description } = req.body || {};

  await pool.query(
    `
    INSERT INTO influencer_profiles(user_id, gender, dob, title, description)
    VALUES($1,$2,$3,$4,$5)
    ON CONFLICT (user_id)
    DO UPDATE SET gender=EXCLUDED.gender, dob=EXCLUDED.dob, title=EXCLUDED.title, description=EXCLUDED.description, updated_at=now()
    `,
    [req.user.id, gender || null, dob || null, title || null, description || null]
  );

  res.json({ ok: true });
});

// replace all languages (normalized)
router.put("/languages", requireAuth, async (req, res) => {
  const { languages } = req.body || {};
  const arr = Array.isArray(languages) ? languages : [];

  await pool.query(`DELETE FROM influencer_languages WHERE user_id=$1`, [req.user.id]);
  for (const l of arr) {
    await pool.query(`INSERT INTO influencer_languages(user_id, language) VALUES($1,$2)`, [req.user.id, String(l)]);
  }
  res.json({ ok: true });
});

// replace all categories
router.put("/categories", requireAuth, async (req, res) => {
  const { categories } = req.body || {};
  const arr = Array.isArray(categories) ? categories : [];
  if (arr.length > 5) return res.status(400).json({ ok: false, error: "Max 5 categories" });

  await pool.query(`DELETE FROM influencer_categories WHERE user_id=$1`, [req.user.id]);
  for (const c of arr) {
    await pool.query(`INSERT INTO influencer_categories(user_id, category) VALUES($1,$2)`, [req.user.id, String(c)]);
  }
  res.json({ ok: true });
});

// replace all socials
router.put("/socials", requireAuth, async (req, res) => {
  const { socials } = req.body || {};
  const arr = Array.isArray(socials) ? socials : [];

  await pool.query(`DELETE FROM influencer_socials WHERE user_id=$1`, [req.user.id]);
  for (const s of arr) {
    await pool.query(
      `INSERT INTO influencer_socials(user_id, platform, username, follower_range, url) VALUES($1,$2,$3,$4,$5)`,
      [req.user.id, s.platform, s.username || null, s.follower_range || null, s.url || null]
    );
  }
  res.json({ ok: true });
});

module.exports = router;

const express = require("express");
const pool = require("../db");
const { requireAuth } = require("../middleware/auth");

const router = express.Router();

router.get("/", requireAuth, async (req, res) => {
  const { rows } = await pool.query(`SELECT id, full_name, email, phone, role, is_onboarded FROM users WHERE id=$1`, [req.user.id]);
  res.json({ ok: true, user: rows[0] });
});

router.patch("/role", requireAuth, async (req, res) => {
  const { role } = req.body || {};
  if (!["influencer", "brand"].includes(role)) {
    return res.status(400).json({ ok: false, error: "Invalid role" });
  }

  await pool.query(`UPDATE users SET role=$1, updated_at=now() WHERE id=$2`, [role, req.user.id]);
  res.json({ ok: true });
});

// Save location (from your Location page)
router.patch("/location", requireAuth, async (req, res) => {
  const { pincode, state, district, city_label, area, full_address, lat, lng } = req.body || {};

  await pool.query(
    `
    INSERT INTO user_locations(user_id, pincode, state, district, city_label, area, full_address, lat, lng)
    VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9)
    ON CONFLICT (user_id)
    DO UPDATE SET
      pincode=EXCLUDED.pincode,
      state=EXCLUDED.state,
      district=EXCLUDED.district,
      city_label=EXCLUDED.city_label,
      area=EXCLUDED.area,
      full_address=EXCLUDED.full_address,
      lat=EXCLUDED.lat,
      lng=EXCLUDED.lng,
      updated_at=now()
    `,
    [
      req.user.id,
      pincode || null,
      state || null,
      district || null,
      city_label || null,
      area || null,
      full_address || null,
      lat || null,
      lng || null,
    ]
  );

  res.json({ ok: true });
});

module.exports = router;

const express = require("express");
const bcrypt = require("bcrypt");
const pool = require("../db");
const { verifyFirebaseIdToken } = require("../firebaseAdmin");
const { linkOrCreateUser } = require("../services/identityService");
const { signToken, setAuthCookie, clearAuthCookie } = require("../utils/jwt");

const router = express.Router();

// Email+Password Signup
router.post("/signup-email", async (req, res) => {
  try {
    const { full_name, email, password, phone, country_code } = req.body || {};
    if (!email || !password) return res.status(400).json({ ok: false, error: "Email and password required" });

    const lower = String(email).toLowerCase();
    const exists = await pool.query(`SELECT 1 FROM users WHERE email=$1 LIMIT 1`, [lower]);
    if (exists.rows.length) return res.status(409).json({ ok: false, error: "Email already exists" });

    const hash = await bcrypt.hash(String(password), 10);

    const user = await linkOrCreateUser({
      provider: "email_password",
      providerUserId: lower,
      email: lower,
      phone: phone || null,
      full_name: full_name || null,
      country_code: country_code || null,
      password_hash: hash,
    });

    const token = signToken({ userId: user.id });
    setAuthCookie(res, token);

    return res.json({ ok: true, user: { id: user.id, email: user.email, role: user.role, is_onboarded: user.is_onboarded } });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ ok: false, error: "Server error" });
  }
});

// Email+Password Login
router.post("/login-email", async (req, res) => {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) return res.status(400).json({ ok: false, error: "Email and password required" });

    const lower = String(email).toLowerCase();
    const { rows } = await pool.query(`SELECT * FROM users WHERE email=$1 LIMIT 1`, [lower]);
    const user = rows[0];
    if (!user || !user.password_hash) return res.status(401).json({ ok: false, error: "Invalid credentials" });

    const ok = await bcrypt.compare(String(password), user.password_hash);
    if (!ok) return res.status(401).json({ ok: false, error: "Invalid credentials" });

    const token = signToken({ userId: user.id });
    setAuthCookie(res, token);

    return res.json({ ok: true, user: { id: user.id, email: user.email, role: user.role, is_onboarded: user.is_onboarded } });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ ok: false, error: "Server error" });
  }
});

// Firebase login (Phone OTP OR Google) → send firebase idToken
router.post("/firebase", async (req, res) => {
  try {
    const { idToken, country_code } = req.body || {};
    if (!idToken) return res.status(400).json({ ok: false, error: "idToken required" });

    const decoded = await verifyFirebaseIdToken(idToken);

    const firebaseUid = decoded.uid;
    const email = decoded.email || null;
    const phone = decoded.phone_number || null;
    const full_name = decoded.name || null;

    // determine provider type
    const provider = phone ? "firebase_phone" : "firebase_google";

    const user = await linkOrCreateUser({
      provider,
      providerUserId: firebaseUid,
      email,
      phone,
      full_name,
      country_code: country_code || null,
      password_hash: null,
    });

    const token = signToken({ userId: user.id });
    setAuthCookie(res, token);

    return res.json({ ok: true, user: { id: user.id, email: user.email, phone: user.phone, role: user.role, is_onboarded: user.is_onboarded } });
  } catch (e) {
    console.error(e);
    return res.status(401).json({ ok: false, error: "Invalid token" });
  }
});

router.post("/logout", async (_req, res) => {
  clearAuthCookie(res);
  res.json({ ok: true });
});

module.exports = router;

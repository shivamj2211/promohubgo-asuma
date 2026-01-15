const jwt = require("jsonwebtoken");
const { COOKIE_NAME } = require("../utils/jwt");

function requireAuth(req, res, next) {
  try {
    const token =
      req.cookies?.[COOKIE_NAME] ||
      (req.headers.authorization?.startsWith("Bearer ")
        ? req.headers.authorization.slice(7)
        : null);

    if (!token) return res.status(401).json({ ok: false, error: "Unauthorized" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.userId };
    next();
  } catch {
    return res.status(401).json({ ok: false, error: "Unauthorized" });
  }
}

module.exports = { requireAuth };

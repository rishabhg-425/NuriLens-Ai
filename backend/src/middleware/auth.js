import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "nutrilens_secret_key_2026";

export function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    // Default fallback demo user ID for quick testing without mandatory login
    req.user = { id: "demo_guest_user", email: "guest@nutrilens.org" };
    return next();
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      req.user = { id: "demo_guest_user", email: "guest@nutrilens.org" };
      return next();
    }
    req.user = user;
    next();
  });
}

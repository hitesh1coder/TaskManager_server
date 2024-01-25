function verifyToken(req, res, next) {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(403).json({ error: "Access Forbidden" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.error("Error verifying token:", err);
      return res.status(401).json({ error: "Unauthorized" });
    }

    req.user = decoded;
    next();
  });
}

module.exports = verifyToken;

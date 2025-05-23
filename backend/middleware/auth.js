const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) return res.status(401).json({ message: "Accès refusé" });

  try {
const decoded = jwt.verify(token, process.env.jwt_secret);
    req.user = decoded; // tu récupères userId et role
    next();
  } catch (err) {
    res.status(400).json({ message: "Token invalide" });
  }
};

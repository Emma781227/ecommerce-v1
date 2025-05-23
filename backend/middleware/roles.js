// middleware/roles.js
module.exports = function (...allowedRoles) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: "Accès refusé" });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: "Accès interdit : rôle insuffisant" });
    }

    next();
  };
};

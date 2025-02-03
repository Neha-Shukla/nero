const { verifyToken } = require("../config/jwt");

const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ msg: "No token, authorization denied" });

  const decoded = verifyToken(token.replace("Bearer ", ""));
  if (!decoded) return res.status(401).json({ msg: "Token is not valid" });

  req.user = decoded;
  next();
};

module.exports = authMiddleware;

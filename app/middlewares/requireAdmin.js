const jwt = require("jsonwebtoken");

const requireAdmin = (req, res, next) => {
  let token = req.header("token");
  if (!token) {
    return res.status(401).json({ error: "Please provide the token" });
  }
  try {
    let verifiedData = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.id = verifiedData.id;
    if (verifiedData.isAdmin === false) {
        return res.status(403).json({ error: "Access denied. Admin only." });
    }
    next();
  } catch (error) {
    res.status(401).json({ error: "Please Login Again!!" });
  }
};
module.exports = requireAdmin;

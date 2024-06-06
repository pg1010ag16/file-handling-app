const jwt = require("jsonwebtoken");

const fetchUser = (req, res, next) => {
  let token = req.header("token");
  if (!token) {
    return res.status(401).json({ error: "Please provide the token" });
  }
  try {
    let verifiedData = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.id = verifiedData.id;
    next();
  } catch (error) {
    res.status(401).json({ error: "Please Login Again!!" });
  }
};
module.exports = fetchUser;

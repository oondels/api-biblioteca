const jwt = require("jsonwebtoken");

const authUser = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).redirect("/login");
  }

  try {
    const decoded = jwt.verify(token, "secretKey");
    req.userId = decoded.userId;
    req.admin = decoded.admin;
    next();
  } catch (error) {
    res.status(401).redirect("login");
  }
};

module.exports = authUser;

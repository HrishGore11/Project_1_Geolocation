const jwt = require("jsonwebtoken");
const jwt_key = "sdfghjkla@$%&";

const auth_user = (req, res, next) => {
  const token = req.header("AUTHORIZATION");
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "please Authenticate with Valid Token",
    });
  }
  try {
    const data1 = jwt.verify(token, jwt_key);
    req.user = data1.user;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "please Authenticate with Valid Token",
    });
  }
};

module.exports = auth_user;

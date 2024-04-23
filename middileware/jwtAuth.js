const jwt = require("jsonwebtoken");
const jwAuth = (req, res, next) => {
  const token = (req.cookies && req.cookies.token) || null;
  if (!token) {
    return res.status(400).json({
      success: false,
      message: "token doesn't exist",
    });
  }
  try {
    const payload = jwt.verify(token, process.env.SECRET);
    req.user = { id: payload.id, email: payload.email };
  } catch (error) {
    console.log("the error is ", error);
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }

  next();
};

module.exports = jwAuth;

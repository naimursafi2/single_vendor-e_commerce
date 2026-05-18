const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const { acc_tkn } = req.cookies;
  const decoded = jwt.verify(acc_tkn, process.env.JWT_SEC);
  try {
    if (decoded) {
      req.user = decoded;
      next();
    } else {
      res.status(401).send({ message: "Unothorized request" });
    }
  } catch (error) {
    res.status(500).send({ message: "Unothorized request" });
  }
};

module.exports = authMiddleware;

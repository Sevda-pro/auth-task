const jwt = require("jsonwebtoken");
const db = require("../util/db.config")
const User = db.customers

const authenticate = (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    const user = jwt.verify(token,'secretkey');
    User.findByPk(user.userId).then((user) => {
      req.user = user;
      next();
    });
  } catch (err) {
    console.log(err);
    return res.status(401).json({ success: false });
  }
};

module.exports = authenticate;
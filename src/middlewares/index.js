const jwt = require('jsonwebtoken');
//const Userdata = require('../models/Userdata');

const userAuth = async (req, res, next) => {
  const cookies = req.cookies;
  try {
    if (!cookies || !cookies.userToken) {
      return res.status(401).send('No token provided');
    }
    const decoded = jwt.verify(cookies.userToken, 'secretkey');
    if (!decoded) {
      return res.status(401).send('Invalid token');
    }
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).send('Error in Auth middleware: ' + error.message);
  }
};

const adminAuth = async (req, res, next) => {
  const cookies = req.cookies;
  try {
    if (!cookies || !cookies.userToken) {
      return res.status(401).send('No token provided');
    }
    const decoded = jwt.verify(cookies.userToken, 'secretkey');
    // Optional: enforce admin role if your token contains an isAdmin claim
    // if (!decoded.isAdmin) return res.status(403).send('Forbidden');
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).send('Error in Admin middleware: ' + error.message);
  }
};

module.exports = {
  userAuth,
  adminAuth,
};

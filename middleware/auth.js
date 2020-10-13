const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

exports.auth = async (req, res, next) => {
  //  Get token from req.cookies
  const { token } = req.cookies;

  // Make sure token exists
  if (!token) {
    req.flash('error', 'You need to be logged in');
    return res.redirect('/auth/login');
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const admin = await Admin.findById(decoded.id);

    if (!admin) {
      req.flash('error', 'Admin not found');
      return res.redirect('/auth/login');
    }

    res.locals.user = admin;
    req.user = admin;

    next();
  } catch (err) {
    req.flash('error', 'Something went wrong');
    return res.redirect('/auth/login');
  }
};

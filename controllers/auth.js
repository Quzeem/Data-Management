const Admin = require("../models/Admin");
const sendTokenResponse = require("../utils/sendToken");

// @desc    Admin Login
// @route   GET /auth/login
// @access  Public
exports.showLoginForm = async (req, res) => {
  res.render("login");
};

/**
@desc    Admin Login
@route   POST /auth/login
@access  Public
*/

exports.login = async (req, res) => {
  const { username, password } = req.body;
  // Validate Email and Password
  if (!username || !password) {
    req.flash("error", "Please provide a username and a password");
    return res.redirect("/auth/login");
  }
  try {
    const user = await Admin.findOne({ username });

    if (!user) {
      req.flash("error", "Invalid credentials");
      return res.redirect("/auth/login");
    }

    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      req.flash("error", "Invalid credentials");
      return res.redirect("/auth/login");
    }

    sendTokenResponse(user, req, res);
  } catch (error) {
    req.flash("error", error.message);
    return res.redirect("/auth/login");
  }
};

// @desc    Logout
// @route   GET /auth/logout
// @access  Private

exports.logout = async (req, res) => {
  try {
    res.cookie("token", "", {
      expires: new Date(Date.now() + 5 * 1000),
      httpOnly: true,
    });

    req.flash("success", "You are logged out");
    return res.redirect("/auth/login");
  } catch (error) {
    req.flash("error", "Something went wrong");
    return res.redirect("/auth/login");
  }
};

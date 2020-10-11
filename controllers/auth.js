const Admin = require("../models/Admin");
const sendTokenRespones = require("../utils/sendToken");

// @desc    Admin Login
// @route   POST /login
// @access  Public

exports.login = async (req, res, next) => {
  const { username, password } = req.body;

  // Validate Email and Password
  if (!username || !password) {
    return next(
      new ErrorResponse("Please provide a username and a password", 400)
      );
    }
    try{
    const user = await Admin.findOne({ username })
    if(!user){
      return new ErrorResponse('Invalid credentials supplied.')
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch){
      return new Error('Invalid credentials supplied.')
    }
    sendTokenRespones(user, 200, res)
  }catch(error){
    return new Error('Invalid credentials supplied.')
  }
    
  }; 



// @desc    Logout
// @route   GET /logout
// @access  Private

exports.logout = async (req, res) => {
  try {
    
  res.cookie("token", "none", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });

  res.status(200).json({
    status: "success",
    message: "You are logged out. We hope to see you soon.",
  });
  }catch(error){
    return new Error({
      error: error.message
    })
  }
};
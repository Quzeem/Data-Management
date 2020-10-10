const asyncHandler = require("../middleware/asyncHandler");
const Admin = require("../models/Admin");
const ErrorResponse = require("../utils/errorResponse");
const sendTokenRespones = require("../utils/sendToken");
const { tokenResponse } = require("../utils/sendToken");

// @desc    Admin Login
// @route   POST /login
// @access  Public

exports.login = asyncHandler(async (req, res, next) => {
  const { username, password } = req.body;

  
  // Validate Email and Password
  if (!username || !password) {
    return next(
      new ErrorResponse("Please provide an email address and a password", 400)
      );
    }
    const user = await Admin.findOne({ username })
    if(!user){
      return next(new ErrorResponse('Invalid credentials supplied.', 401))
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch){
      return next(new ErrorResponse('Invalid credentials supplied.', 401))
    }
sendTokenRespones(user, 200, res)


    
  }) 

  // if (user && (await user.matchPassword(password))) {
  // res.json({
  //   _id: user._id,
  //   username: user.username
  // })
  // }else{
  //   return next(
  //   new ErrorResponse("Plase input a valid email or password.", 401)
  // );
  // }
// });


// @desc    Logout
// @route   GET /logout
// @access  Private

exports.logout = asyncHandler(async (req, res, next) => {
  res.cookie("token", "none", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });

  res.status(200).json({
    status: "success",
    message: "You are logged out. We hope to see you soon.",
  });
});
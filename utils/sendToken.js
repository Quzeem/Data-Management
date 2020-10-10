// Get token from model, create cookie and send response
const sendTokenRespones = (user, statusCode, res) => {
    // Create Token  
    const token = user.signToken();
  
    const options = {
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
    };
    if (process.env.NODE_ENV === "production") {
      options.secure = true;
    }
  
    res.status(statusCode).cookie("token", token, options).json({
      success: true,
      token,
    });
  };
  
  module.exports = sendTokenRespones;
  
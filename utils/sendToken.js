// Get token from model, create cookie and send response
const sendTokenResponse = (user, req, res) => {
  // Create Token
  const token = user.signToken();

  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === 'production') {
    options.secure = true;
  }

  res.cookie('token', token, options);

  req.flash('success', 'Succesfully logged in');
  return res.redirect('/guards');
};

module.exports = sendTokenResponse;

//create Token and saving the cookies
const sendToken = (user, statusCode, res) => {
  const token = user.getJwtToken();
  //options for cookies
  const options = {
    expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
    httpOnly: true,
    sameSite: "none",// 🔥 required for cross-origin cookies
    secure: true,// 🔥 must be true when using sameSite: "None"
  };
  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    user,
    token,
  });
};
module.exports = sendToken;
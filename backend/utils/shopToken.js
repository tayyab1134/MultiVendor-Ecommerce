const sendShopToken = (user, statusCode, res) => {
  const token = user.getJwtToken();

  // Cookie options
  const options = {
    expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), // 90 days
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  };

  res.status(statusCode).cookie("seller_token", token, options).json({
    success: true,
    user,
    token,
  });
};

module.exports = sendShopToken;

//create Token and saving the cookies
//const sendShopToken = (seller, statusCode, res) => {
//const token = seller.getJwtToken();
//options for cookies
/*const options = {
    expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
    httpOnly: true,
    sameSite: "none",
    secure: true,
  };
  res.status(statusCode).cookie("shop_token", token, options).json({
    success: true,
    seller,
    token,
  });
};
module.exports = sendShopToken;
*/

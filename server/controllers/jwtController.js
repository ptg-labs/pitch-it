const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const secret = process.env.TOKEN_SECRET;
const jwtController = {}

jwtController.write = (req, res, next) => {
    res.locals.jwt = jwt.sign(
      {
        username: res.locals.user.username, // payload on the jwt is going to be an object with the username in it
      }, 
      secret, // actual token string
      { expiresIn: '3 hours'} // arbitrarily 3 hours so it doesn't impede dev but we can also make sure it works? idk
      );
      res.cookie('jwt', res.locals.jwt, { httpOnly: true }); // send the signed token back in the response as a cookie
      return next();
  },

jwtController.verify = (req, res, next) => {
  try {
    res.locals.username = jwt.verify(req.cookies.jwt, secret) // verify returns the payload on the token you are verifying if it passes
  } catch {
    return next({err: 'Verification error - Invalid JWT'});
  }
}

module.exports = jwtController;
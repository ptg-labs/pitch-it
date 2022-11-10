const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const secret = process.env.TOKEN_SECRET;
const jwtController = {}

jwtController.write = (req, res, next) => {
    res.locals.user.jwt = jwt.sign(
      {
        username: res.locals.user.username, // payload on the jwt is going to be an object with the username in it
      }, 
      secret, // actual token string
      { expiresIn: '3 hours'} // arbitrarily 3 hours so it doesn't impede dev but we can also make sure it works? idk
      );
      res.cookie('jwt', res.locals.user.jwt, { httpOnly: true }); // send the signed token back in the response as a cookie
      return next();
  },

jwtController.verify = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1].slice(6);
  if (token == null) return res.sendStatus(401);
  try {
    res.locals.username = jwt.verify(token, secret) // verify returns the payload on the token you are verifying if it passes
    return next();
  } catch {
    console.log('jwtController caught error in verify MW');
    return next({err: 'Verification error - Invalid JWT'});
  }
}

module.exports = jwtController;
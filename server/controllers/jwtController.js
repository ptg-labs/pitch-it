const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const secret = process.env.TOKEN_SECRET;
const jwtController = {}

//once user logs in, res.locals.user,jwt stores an object with the username and user id, and a secret in the res.cookie w
jwtController.write = (req, res, next) => {
    res.locals.user.jwt = jwt.sign(
      {
        //payload on the jwt is going to be an object with the username in it
        username: res.locals.user.username,
        user_id: res.locals.user.user_id

      }, 
      //token string
      secret,
      //arbitrarily 3 hours so it does not impede dev but not positive this is functional
      { expiresIn: '3 hours'}
      );
      //send signed token as a cookie
      res.cookie('jwt', res.locals.user.jwt, { httpOnly: true });
      return next();
  },

  //verifies the current user is the correct user
jwtController.verify = (req, res, next) => {
  //uses the authorization header for any calls
  const authHeader = req.headers['authorization'];
  console.log(authHeader);
  const token = authHeader && authHeader.split(' ')[1].slice(6);
  if (token == null) return res.sendStatus(401);
  try {
    res.locals.user_id = jwt.verify(token, secret).user_id // verify returns the payload on the token you are verifying if it passes
    return next();
  } catch {
    console.log('jwtController caught error in verify MW');
    return next({err: 'Verification error - Invalid JWT'});
  }
}

module.exports = jwtController;
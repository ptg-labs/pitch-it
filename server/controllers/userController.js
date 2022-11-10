const db = require('../models/projectModels');
const bcrypt = require('bcryptjs');
const userController = {};

// userController.getAllUsers = (req, res, next) => {
//   try {
//     const queryStr = `SELECT * FROM users`;
//     db.query(queryStr).then((data) => {
//       console.log(data);
//       return res.status(200);
//     });
//   } catch (err) {
//     return next({});
//   }
// };
// TODO: IMPLEMENT PROPER AUTH - needs testing now
userController.verifyUser = (req, res, next) => {
  const { username, password } = req.body;
  const queryStr = 'SELECT "id", "username", "password" FROM "public.users" WHERE username= ($1) AND password= ($2)';
  const values = [username, password];
  db.query(queryStr, values)
    .then((data) => {
      console.log(data.rows[0]);
      return data.rows[0];
    })
    .then(async (user) => {
      // If our query returns null, just send back false to our front end
      if (!user) throw new Error("User not found"); // used to send back falsy but I don't see why we don't just throw error
      // TODO: figure out how bcrypt compare can work in this middleware. seems to always return false no matter what here
      // console.log(user.password + password);
      // const valid = await bcrypt.compare(password, user.password) 
      // console.log("valid: ", valid);
      // if (valid) {
        res.locals.user = { user_id: user.id, username: user.username };
        return next();
      // } else throw new Error("Password does not match");
    })
    .catch((err) => {
      return next({
        log: 'Error in userController.verifyUser',
        status: 400,
        message: { err: err },
      });
    });
};

const SALT_WORK_FACTOR = 10;

// ! Think about what if user already exists
userController.createUser = (req, res, next) => {
  const { username, password } = req.body;

  // const hashedPW = bcrypt.hashSync(password, 10); // commented until bcrypt compare works
  const queryStr = `INSERT INTO "public.users" (username, password) VALUES ($1, $2)`;
  const values = [username, password];
  db.query(queryStr, values)
    .then(() => {
      return next();
    })
    .catch((err) => {
      return next({
        log: 'Error in userController.createUser',
        status: 400,
        message: { err: err },
      });
    });
};

// TODO: CREATE UPDATE USER MIDDLEWARE
userController.updateUser = (req, res, next) => {
  //need a password input from req.body
  //get res.locals.username from jwt controller - make it be middleware before usercontroller.updateuser
  const queryStr = `UPDATE "public.users" SET password= ($1) WHERE username= ($2)`;
  const values = [req.body.password, res.locals.username.username];
  db.query(queryStr, values)
    .then(() => {
      console.log('updated on db')
      return next();
    })
    .catch((err) => {
      return next({
        log: 'Error in userController.updateUser',
        status: 400,
        message: { err: err },
      });
    });
};

// //change username to req.cookie.jwt;
userController.deleteUser = (req, res, next) => {
  // const { username } = req.body; //user_id is the number of the id. maybe do username and password instead??
  const queryStr = `DELETE FROM "public.users" WHERE username=($1)`;
  const values = [res.locals.username.username];
  db.query(queryStr, values)
    .then(() => {
      console.log('account deleted')
      return next();
    })
    .catch((err) => {
      return next({
        log: 'Error in userController.deleteUser',
        status: 400,
        message: { err: err },
      });
    });
};

module.exports = userController;

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
  // TODO: don't get sql injected
  const queryStr = `SELECT "id", "username" FROM "public.users" WHERE username='${username}' AND password='${password}'`;
  db.query(queryStr)
    .then((data) => {
      console.log(data.rows[0]);
      return data.rows[0];
    })
    .then((user) => {
      // If our query returns null, just send back false to our front end
      if (!user) throw new Error("User not found"); // used to send back falsy but I don't see why we don't just throw error
      const valid = bcrypt.compareSync(password, user.password) // compareSync, password from req.body should equal password from DB
      if (valid) {
        res.locals.user = { user_id: user.id, username: user.username };
      return next();
      } else throw new Error("Password does not match");
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
  const hashedPW = bcrypt.hashSync(password, 10);
  const queryStr = `INSERT INTO "public.users" (username, password) VALUES ('${username}', '${hashedPW}')`;
  db.query(queryStr)
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

userController.deleteUser = (req, res, next) => {
  const { user_id } = req.body;
  const queryStr = `DELETE FROM "public.users" WHERE users.id = '${user_id}'`;
  db.query(queryStr)
    .then(() => {
      return res.status(200).json(true);
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

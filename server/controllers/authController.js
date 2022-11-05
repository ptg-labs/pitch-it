const db = require('../models/projectModels');

const authController = {};

authController.getAllUsers = (req, res, next) => {
  try {
    const queryStr = `SELECT * FROM users`;
    db.query(queryStr).then((data) => {
      console.log(data);
      return res.status(200);
    });
  } catch (err) {
    return next({});
  }
};

authController.verifyUser = (req, res, next) => {
  const { username, password } = req.body;
  const queryStr = `SELECT users.id, users.username FROM users WHERE users.username='${username}' AND users.password='${password}'`;
  db.query(queryStr)
    .then((data) => {
      console.log(data.rows[0]);
      return data.rows[0];
    })
    .then((user) => {
      // If our query returns null, just send back false to our front end
      if (!user) return res.status(400).json(false);
      return res
        .status(200)
        .json({ user_id: user.id, username: user.username });
    })
    .catch((err) => {
      return next({
        log: 'Error in authController.verifyUser',
        status: 400,
        message: { err: err },
      });
    });
};

// ! Think about what if user already exists
authController.createUser = (req, res, next) => {
  const { username, password } = req.body;
  const queryStr = `INSERT INTO users(username,password) VALUES ('${username}', '${password}')`;
  db.query(queryStr)
    .then(() => {
      return res.status(200).json(true);
    })
    .catch((err) => {
      return next({
        log: 'Error in authController.verifyUser',
        status: 400,
        message: { err: err },
      });
    });
};

module.exports = authController;

const db = require('../models/projectModels');

const authController = {};

authController.verifyUser = (req, res, next) => {
  const { username, password } = req.body;
  try {
    const queryStr = `SELECT users.id, users.username WHERE users.username=${username} AND users.password=${password}`;
    db.query(queryStr)
      .then((data) => {
        console.log(data);
        return res.status(200).json({ data });
      })
      .catch(err);
    return res.status(200).json(false);
  } catch (err) {
    return next({
      log: 'Error in authController.createGol',
      status: 400,
      message: { err: err },
    });
  }
};

module.exports = authController;

const db = require('../models/projectModels');
const bcrypt = require('bcryptjs');
const userController = {};

//verifying the user at login
userController.verifyUser = (req, res, next) => {
  //input data is used to look through the database
  const { username, password } = req.body;
  //query the database for the information at input username 
  const queryStr = 'SELECT "id", "username", "password" FROM "public.users" WHERE username= ($1)';
  //using query string and values to avoid SQL injections
  const values = [username];
  db.query(queryStr, values)
    .then((data) => {
      //data.rows[0] is the first and only instance where we find the username because username is unique in db
      console.log(data.rows[0]);
      return data.rows[0];
    })
    //then this user's info: user_id, username, and password is used
    .then(async (user) => {
      // If our query returns null, it means there is no username by name given in input - throw an error to the user
      if (!user) throw new Error("User not found");
      console.log(user.password + password);
      //compare the user.password from our query and the password that we have in our database which is bcrypt encrypted
      const valid = await bcrypt.compare(password, user.password) 
      console.log("valid: ", valid);
      //if the passwords match, then send the information to the next middleware
      if (valid) {
        res.locals.user = { user_id: user.id, username: user.username };
        return next();
        //if passwords do not match, throw error for user
      } else throw new Error("Password does not match");
    })
    //error handler
    .catch((err) => {
      return next({
        log: 'Error in userController.verifyUser',
        status: 400,
        message: { err: err },
      });
    });
};

const SALT_WORK_FACTOR = 10;

//creating a new user
userController.createUser = async (req, res, next) => {
  //inputs coming from the client
  const { username, password } = req.body;
  //password that is coming from the client is encrypted and hashed
  const hashedPW = await bcrypt.hash(password, SALT_WORK_FACTOR);
  //insert this username and encrypted password into the database
  const queryStr = `INSERT INTO "public.users" (username, password) VALUES ($1, $2)`;
  const values = [username, hashedPW];
  //complete the query string avoiding template literals to avoid SQL injections
  db.query(queryStr, values)
    .then(() => {
      return next();
    })
    //error handler
    .catch((err) => {
      return next({
        log: 'Error in userController.createUser',
        status: 400,
        message: { err: err },
      });
    });
};

//updating user password
userController.updateUser = async (req, res, next) => {
  //updating the password using the user id information sent from the jwtController verifyuser middleware
  const queryStr = `UPDATE "public.users" SET password= ($1) WHERE id= ($2)`;
  //encrypt the new password coming from user input
  const hashedPW = await bcrypt.hash(req.body.password, SALT_WORK_FACTOR);
  const values = [hashedPW, res.locals.user_id];
  //query the database and avoiding SQL injections
  db.query(queryStr, values)
    .then(() => {
      console.log('updated on db')
      return next();
    })
    //error handler
    .catch((err) => {
      return next({
        log: 'Error in userController.updateUser',
        status: 400,
        message: { err: err },
      });
    });
};

//deleting the current user
userController.deleteUser = (req, res, next) => {
  //query the db to delete the user using the user id sent from jwt controller verifyuser middleware
  const queryStr = `DELETE FROM "public.users" WHERE id=($1)`;
  const values = [res.locals.user_id];
  //query the db avoiding SQL injections
  db.query(queryStr, values)
    .then(() => {
      console.log('account deleted')
      return next();
    })
    //error handler
    .catch((err) => {
      return next({
        log: 'Error in userController.deleteUser',
        status: 400,
        message: { err: err },
      });
    });
};

module.exports = userController;

const db = require('../models/projectModels');
const { json } = require('express');

const projectController = {};

const defaultErr = {
  log: 'Express error handler caught unknown middleware error',
  status: 500,
  message: { err: 'An error occurred' },
};

// retrieves all projects
projectController.getAllProjects = (req, res, next) => {
  const queryStr = `SELECT * FROM projects`;
  db.query(queryStr)
    .then((data) => {
      return data.rows;
    })
    .then((projects) => {
      // If our query returns null, just send back false to our front end
      if (!projects) return res.status(400).json(false);
      return res.status(200).json(projects);
    })
    .catch((err) => {
      return next({
        log: 'Error in projectController.getAllProjects',
        status: 400,
        message: { err: err },
      });
    });
};

//get individual users projects
projectController.getMyProject = (req, res, next) => {
  const user_id = req.params.id;
  const queryStr = `SELECT * FROM projects WHERE projects.owner_id='${user_id}'`;
  db.query(queryStr)
    .then((data) => {
      return data.rows;
    })
    .then((projects) => {
      // If our query returns null, just send back false to our front end
      if (!projects) return res.status(400).json(false);
      return res.status(200).json(projects);
    })
    .catch((err) => {
      return next({
        log: 'Error in projectController.getMyProject',
        status: 400,
        message: { err: err },
      });
    });
};

// ! WTF?
projectController.getProject = (req, res, next) => {
  const { project } = req.body;
  const queryStr = ``;
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
        log: 'Error in projectController.getProject',
        status: 400,
        message: { err: err },
      });
    });
};

projectController.addProject = (req, res, next) => {
  const { owner_id, project_name, date, description, owner_name, skills } =
    req.body;
  console.log(req.body.skills);
  const queryStr = `INSERT INTO projects(owner_id, project_name, date, description, owner_name) VALUES ('${owner_id}','${project_name}','${date}','${description}','${owner_name}') RETURNING id`;
  db.query(queryStr)
    .then((data) => {
      // By using RETURNING id in conjunction with the insert into, we can store the new project's primary key in insertedId
      const insertedId = data.rows[0].id;
      // We need to construct another query string to add to our join table
      // ! We have a varying amount of rows to enter into our join table.....
      const multipleStringArr = [];
      // each value of skills is the primary key to the skill in the skills table
      for (const value of skills) {
        multipleStringArr.push(`('${insertedId}', '${value}')`);
      }
      // create a single string
      const multipleString = multipleStringArr.join(',').replaceAll('`', '');
      const queryStr2 = `INSERT INTO projects_skills_join_table (project_id, skill_id) VALUES${multipleString}`;
      db.query(queryStr2)
        .then(() => {
          return res.status(200).json(true);
        })
        .catch((err) => {
          return next({
            log: 'Error in projectController.addProject join table',
            status: 400,
            message: { err: err },
          });
        });
    })
    .catch((err) => {
      return next({
        log: 'Error in projectController.addProject',
        status: 400,
        message: { err: err },
      });
    });
};

projectController.deleteProject = (req, res, next) => {
  const project_id = req.params.id;
  const queryStr = `DELETE FROM projects WHERE projects.id = '${project_id}'`;
  db.query(queryStr)
    .then(() => {
      return res.status(200).json(true);
    })
    .catch((err) => {
      return next({
        log: 'Error in projectController.deleteProject',
        status: 400,
        message: { err: err },
      });
    });
};

module.exports = projectController;

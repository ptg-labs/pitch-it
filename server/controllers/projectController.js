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
  // Original Query Str
  // const queryStr = `SELECT * FROM projects`;
  // Join table Query Str
  const queryStr = `SELECT s.*, pr.* FROM projects_skills_join_table jt JOIN projects pr ON jt.project_id = pr.id JOIN skills s ON jt.skill_id = s.id`;
  db.query(queryStr)
    .then((data) => {
      return data.rows;
    })
    .then((projects) => {
      // ! We are getting back an array of objects with repeats because each object has a unique skill field
      // We already have a check that ensures that each project's title is unique on the frontend
      const uniqueTitles = new Set();
      // We have to add to previous values to ones that pass the Set, probably better to do this using reduce but i've already written a bunch of logic using filter
      const mergedProjects = [];
      // filter out any repeat project_name and instead just push the skill into an array
      projects.filter((project) => {
        // This if block triggers when there's a repeat
        if (uniqueTitles.has(project.project_name)) {
          // Find the project with the exact same project name and push in the unique skill
          const toMerge = mergedProjects.find(
            (obj) => obj.project_name === project.project_name
          );
          toMerge.skills.push(project.skill);
          return false;
        }
        // If the project_name is unique, add its name to the set
        uniqueTitles.add(project.project_name);
        // add a skills property to the project object that is an array with the skill
        project.skills = [project.skill];
        // delete that skill
        delete project.skill;
        // push the altered object into the merged Projects array
        mergedProjects.push(project);
        return true;
      });
      // If our query returns null, just send back false to our front end
      if (!projects) return res.status(400).json(false);
      return res.status(200).json(mergedProjects);
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
  // ! For some reason, the project MUST be the second select or else the skill ID will be returned
  const queryStr = `SELECT s.*, pr.* FROM projects_skills_join_table jt JOIN skills s ON jt.skill_id = s.id JOIN projects pr ON jt.project_id = pr.id WHERE pr.owner_id='${user_id}'`;
  db.query(queryStr)
    .then((data) => {
      return data.rows;
    })
    .then((projects) => {
      // ! We are getting back an array of objects with repeats because each object has a unique skill field
      // We already have a check that ensures that each project's title is unique on the frontend
      const uniqueTitles = new Set();
      // We have to add to previous values to ones that pass the Set, probably better to do this using reduce but i've already written a bunch of logic using filter
      const mergedProjects = [];
      // filter out any repeat project_name and instead just push the skill into an array
      projects.filter((project) => {
        // This if block triggers when there's a repeat
        if (uniqueTitles.has(project.project_name)) {
          // Find the project with the exact same project name and push in the unique skill
          const toMerge = mergedProjects.find(
            (obj) => obj.project_name === project.project_name
          );
          toMerge.skills.push(project.skill);
          return false;
        }
        // If the project_name is unique, add its name to the set
        uniqueTitles.add(project.project_name);
        // add a skills property to the project object that is an array with the skill
        project.skills = [project.skill];
        // delete that skill
        delete project.skill;
        // push the altered object into the merged Projects array
        mergedProjects.push(project);
        return true;
      });
      console.log(mergedProjects);
      // If our query returns null, just send back false to our front end
      if (!projects) return res.status(400).json(false);
      return res.status(200).json(mergedProjects);
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
  // send off a nested query to our database, effectively adding to the projects and join table with one user click
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
      // create a single string, getting rid of all the backticks
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

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
  const queryStr = `SELECT s.*, pr.*, u.username FROM "public.projects" pr
  JOIN "public.projects_skills_join_table" psjt ON psjt.project_id = pr.id
  JOIN "public.skills" s ON psjt.skill_id = s.id
  JOIN "public.users" u ON pr.owner_id = u.id`;
  db.query(queryStr)
    .then((data) => {
      return data.rows;
    })
    .then((projects) => {
      // ! We are getting back an array of objects with repeats because each object has a unique skill field
      // We already have a check that ensures that each project's title is unique on the frontend
      // console.log('projects in projectController.getAllProjects', projects);
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
      if (!projects) throw new Error('No projects!')
      res.locals.mergedProjects = mergedProjects;
      return next();
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
  const user_id = res.locals.user_id;
  // ! For some reason, the project MUST be the second select or else the skill ID will be returned
  const queryStr = `SELECT s.*, pr.* FROM "public.projects_skills_join_table" jt 
  JOIN "public.skills" s ON jt.skill_id = s.id 
  JOIN "public.projects" pr ON jt.project_id = pr.id 
  WHERE pr.owner_id=$1`;
  const values = [user_id];
  db.query(queryStr, values)
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
      if (!projects) return res.status(400).json(false); // does this have to be false?
      res.locals.mergedProjects = mergedProjects;
      return next();
    })
    .catch((err) => {
      return next({
        log: 'Error in projectController.getMyProject',
        status: 400,
        message: { err: err },
      });
    });
};

// ! WTF? -- unfinished, unused
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
  const { owner_id, project_name, description, skills } = req.body;
  console.log(req.body.skills);
  const insertStr = `INSERT INTO "public.projects" (owner_id, project_name, description)
  VALUES ($1, $2, $3)`;
  const selectStr = `SELECT * FROM "public.projects" WHERE project_name=$1`;
  const values = [owner_id, project_name, description];
  console.log('values arr', values);
  // send off a nested query to our database, effectively adding to the projects and join table with one user click
  db.query(insertStr, values)
    .then(() => {
      // fetch just created row to get id
      db.query(selectStr, [project_name]).then(({ rows }) => {
        console.log('rows', rows);
        const newProjId = rows[0].id;
        const multipleStringArr = [];
        console.log('skills in projectController.js', skills);
        for (const value of skills) {
          console.log('value in for of', value);
          multipleStringArr.push(`('${newProjId}', '${value}')`);
        }
        const multipleString = multipleStringArr.join(',').replaceAll('`', '');
        const queryStr2 = `INSERT INTO "public.projects_skills_join_table" (project_id, skill_id) VALUES${multipleString}`;
        db.query(queryStr2).then(() => {
          return next();
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
  const queryStr = `DELETE FROM "public.projects" WHERE id = '${project_id}'`;
  db.query(queryStr)
    .then(() => {
      res.locals.deleteSuccess = true
      return next();
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

const fs = require('fs');

let testLocation;
let projectCard;

if (process.env.NODE_ENV === 'test') {//if we are testing npm test
    testLocation = `${__dirname}/test.json`;
    projectCard = JSON.parse(fs.readFileSync(testLocation));
}

const db = {};

/**
 * type of projectCard is an object 
 * 
 */

db.sync = (projects) => {
    if (typeof projectCard !== 'object') {
        return new Error(`Project list must be an object, received ${typeof projectCard}`);
    }
    if (projects.some(p => p.owner_name === undefined || p.project_id === undefined
        || p.title === undefined || p.description === undefined || p.skills === undefined || p.date === undefined)) {
        return new Error('Missing fields on some projects');
    }
    if (projects.some(p => typeof p.owner_name !== 'string' || typeof p.project_id !== 'string'
        || typeof p.title !== 'string' || typeof p.description !== 'string' || typeof p.skills !== 'string' || typeof p.date !== 'string')) {
        return new Error('Value of project keys need to be strings');
    }

    db.write(projects);
    db.reset();
    return projectCard;
};


/**
 * #find - Returns the entire list of projectCards from the appropriate
 * test.json file.
 */
db.find = () => {
    db.reset();
    return projectCard;
};


/**
 * #drop - Deletes everything from the appropriate test.json file and
 * writes an empty object in its place.
 */
db.drop = () => {
    projectCard = {};
    db.write(projectCard);
};


db.write = (data) => {
    fs.writeFileSync(testLocation, JSON.stringify(data, null, 2));
};


db.reset = () => {
    projectCard = JSON.parse(fs.readFileSync(testLocation));
};


module.exports = db;
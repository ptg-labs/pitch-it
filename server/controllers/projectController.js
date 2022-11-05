const db = require('../models/projectModels');
const { json } = require('express');

const projectController = {};

const defaultErr = {
	log: 'Express error handler caught unknown middleware error',
	status: 500,
	message: { err: 'An error occurred' },
};

// Check if backend speaking
projectController.expressCheck = (req, res, next) =>{
	return res.status(200).json({express: 'express is live'})
}
projectController.getProject = (req, res, next) => {
	// write code here

	// // const list = 'SELECT * FROM people';
	// const list = 'SELECT * FROM people';

	// db.query(list)
	// 	.then((data) => {
	// 		res.locals.characters = data;
	// 		return next();
	// 	})
	// 	.catch((error) => {
	// 		return next({
	// 			message: `startWarsController.getCharacters Not working! ${error}`,
	// 			status: 404,
	// 		});
	// 	});
	// console.log(res.locals.list);
	// return next();
};

// starWarsController.getSpecies = (req, res, next) => {
// 	// write code here
// 	const speciesQueryStr =
// 		'SELECT species.name AS species, species.classification AS classification, species.average_lifespan, species.language AS language, species._id AS species_id, planets.name AS homeworld FROM species LEFT OUTER JOIN planets ON species._id = planets._id;';

// 	//from Jeff
// 	/**
// 			 * SELECT SPECIES.classification, SPECIES.average_height, SPECIES.average_lifespan, SPECIES.language, SPECIES.name, PLANETS.name AS HOMEWORLD
// 				FROM PLANETS
// 				RIGHT JOIN SPECIES
// 				ON PLANETS._id = SPECIES.homeworld_id
// 				WHERE SPECIES._id = $1`
// 			 */

// 	const speciesId = req.query.id;
// 	const speciesArr = [speciesId];

// 	// const getQueryParams = (url) => {
// 	// 	const paramArr = url.slice(url.indexOf('?') + 1).split('&');
// 	// 	const params = {};
// 	// 	paramArr.map(param => {
// 	// 		const [key, val] = param.split('=');
// 	// 		params[key] = decodeURIComponent(val);
// 	// 	})
// 	// 	return params;
// 	// }

// 	// console.log(value);
// 	//client.query(text, values, (err, res) => {
// 	//console.log(res.rows[0])
// 	// { name: 'brianc', email: 'brian.m.carlson@gmail.com' }
// 	db.query(speciesQueryStr, speciesArr)
// 		.then((data) => {
// 			console.log(data.row[0]);
// 			res.locals.speciesInfo = data.rows[0];
// 			return next();
// 		})
// 		.catch((error) => {
// 			return next({
// 				message: `starWarsController.getSpecies Not working! ${error}`,
// 				status: 404,
// 			});
// 		});

// 	// const queryId = {
// 	// 	name: 'species.name',
// 	// 	texr: 'SELECT * FROM species WHERE id = $1',
// 	// 	values: [1],
// 	// };
// 	// db.query(queryId, (err, res) => {
// 	// 	if (err) {
// 	// 		console.log(err);
// 	// 	} else {
// 	// 		console.log(res.rows[0]);
// 	// 	}
// 	// });
// 	// db.query(queryId)
// 	// 	.then((data) => console.log(data.rows[0]))
// 	// 	.catch((error) => console.error(error));
// };

// starWarsController.getHomeworld = (req, res, next) => {
// 	const homeworldId = 'SELECT people.homeworld_id FROM people';
// 	const getreqHome = req.params.homeworldId;
// 	const queryString = `/api/species?id=${getreqHome}`;
// 	const planetsDetail =
// 		'SELECT planets.rotation_period, planets.orbital_period, planets.diameter, planets.climate, planets.gravity, planets.terrain, planets.surface_water, planets.population FROM planets;';

// 	next();
// };

// starWarsController.getFilm = (req, res, next) => {
// 	// write code here

// 	next();
// };

// starWarsController.addCharacter = (req, res, next) => {
// 	// write code here

// 	next();
// };

module.exports = projectController;
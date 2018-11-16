const categoryController = require('./../controllers').category;
const psychographicController = require('./../controllers').psychographic;

function setRoutes(app) {
	app.get('/favicon.ico', (req, res) => res.status(204).send());
	app.get("/categories", categoryController.checkParams, categoryController.getCategories);
	app.get("/fixedCategories", categoryController.checkParams, categoryController.getCategoriesFixedLevel);
	app.get("/psychographics", psychographicController.checkParams, psychographicController.getPsychographics);
	app.get("/fixedPsychographics", psychographicController.checkParams, psychographicController.getPsychographicsFixedLevel);
};

module.exports = {
	 setRoutes : setRoutes
};
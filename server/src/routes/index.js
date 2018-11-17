const categoryController = require('./../controllers').category;
const psychographicController = require('./../controllers').psychographic;

function setRoutes(app) {
	app.get('/favicon.ico', (req, res) => res.status(204).send());
	
	app.get("/categories", categoryController.checkFields, categoryController.checkParamsCategories, categoryController.getCategories);
	app.get("/fixedCategories", categoryController.checkFields, categoryController.checkParamsCategoriesFixedLevel, categoryController.getCategoriesFixedLevel);
	app.get("/categoriesSchemaFields", categoryController.getCategorySchemaFields, categoryController.handle);

	app.get("/psychographics", psychographicController.checkFields, psychographicController.checkParamsPsychographics, psychographicController.getPsychographics);
	app.get("/fixedPsychographics", psychographicController.checkFields, psychographicController.checkParamsPsychographicsFixedLevel, psychographicController.getPsychographicsFixedLevel);
	app.get("/psychographicsSchemaFields", psychographicController.getPsychographicsSchemaFields, categoryController.handle);
};

module.exports = {
	 setRoutes : setRoutes
};
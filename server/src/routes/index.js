const categoryController = require('./../controllers').category;
const psychographicController = require('./../controllers').psychographic;
const treeController = require('./../controllers').tree;

function setRoutes(app) {
	app.get('/favicon.ico', (req, res) => res.status(204).send());

	app.get("/categoriesSchemaFields", categoryController.getCategorySchemaFields, categoryController.handle);
	
	app.get("/psychographicsSchemaFields", psychographicController.getPsychographicsSchemaFields, categoryController.handle);

	app.get("/element/:tree", treeController.checkFields, treeController.checkParams, treeController.getElement, treeController.handle);
};

module.exports = {
	 setRoutes : setRoutes
};
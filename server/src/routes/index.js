const categoryController = require('./../controllers').category;

function setRoutes(app) {
	app.get('/favicon.ico', (req, res) => res.status(204).send());
	app.get("/category", categoryController.checkParams, categoryController.getCategory);
};

module.exports = {
	 setRoutes : setRoutes
};
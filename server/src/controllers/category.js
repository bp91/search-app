const log4js = require('log4js');
const log = log4js.getLogger("default");
const categories = require("../../index/categories.json");
const CategoryProvider = require("../core/CategoryProvider").CategoryProvider;
let categoryProvider;

function checkParams(req, res, next) {
    log.info("category.js: checkParams");
    categoryProvider = new CategoryProvider(categories);
    let goNext = true;
    for(var key in req.query) {
        if(!categoryProvider.checkField(key, req.query[key])) {
            goNext = false;
        }
    }
    if(goNext) {
        return next();
    }else {
        res.status(404).send({
            "message" : "Wrong parameters"
        });
    }
};

async function getCategories(req, res) {
    log.info("category.js: getCategories");
    /**
     * Maybe in the future you want to search for categories indexed by date
     */
    const response = await categoryProvider.getCategories(req.query);
    res.status(response.status).send(response.message);
};

async function getCategoriesFixedLevel(req, res) {
    log.info("category.js: getCategoriesFixedLevel");
    /**
     * Maybe in the future you want to search for categories indexed by date
     */
    const response = await categoryProvider.getCategoriesFromLayer(req.query);
    res.status(response.status).send(response.message);
};

module.exports = {
    checkParams : checkParams,
    getCategories : getCategories,
    getCategoriesFixedLevel : getCategoriesFixedLevel
};

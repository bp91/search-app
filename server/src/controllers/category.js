const log4js = require('log4js');
const log = log4js.getLogger("default");
const categories = require("../../index/categories.json");
const CategoryProvider = require("../core/CategoryProvider").CategoryProvider;
let categoryProvider = new CategoryProvider();

function checkFields(req, res, next) {
    log.info("category.js: checkFields");
    let goNext = true;
    for(var key in req.query) {
        if(!categoryProvider.checkField(key, req.query[key])) {
            goNext = false;
        }
    }
    if(goNext) {
        return next();
    }else {
        res.status(404).json({
            "message" : "Wrong Parameters"
        });
    }
};

function checkParamsCategories(req, res, next) {
    log.info("category.js: checkParamsCategories");
    let goNext = true;
    var parameters = Object.keys(req.query);
    if(parameters.length > 1) {
        if(parameters.includes("fixedLevel") || (!parameters.includes("fixedLevel") && !parameters.includes("operator"))) {
            goNext = false;
        }
        parameters.splice(parameters.indexOf("operator"), 1);
        if(parameters.length == 1) {
            goNext = false;
        }
    }else {
        if(parameters.includes("fixedLevel") || parameters.includes("operator")) {
            goNext = false;
        }
    }
    if(goNext) {
        return next();
    }else {
        res.status(404).json({
            "message" : "Wrong Parameters"
        });
    }
};

function checkParamsCategoriesFixedLevel(req, res, next) {
    log.info("category.js: checkParamsCategoriesCategoriesFixedLevel");
    let goNext = true;
    var parameters = Object.keys(req.query);
    if(parameters.length > 1) {
        if(!parameters.includes("fixedLevel")) {
            goNext = false;
        }else {
            parameters.splice(parameters.indexOf("fixedLevel"), 1);
            if(parameters.length > 1) {
                if(!parameters.includes("operator")) {
                    goNext = false;
                }else {
                    parameters.splice(parameters.indexOf("operator"), 1);
                    if(parameters.length == 1) {
                        goNext = false;
                    }
                }
            }
        }
    }else {
        goNext = false;
    }
    if(goNext) {
        return next();
    }else {
        res.status(404).json({
            "message" : "Wrong Parameters"
        });
    }
};

async function getCategories(req, res) {
    log.info("category.js: getCategories");
    /**
     * Maybe in the future you want to search for categories indexed by date
     */
    categoryProvider.setIndex(categories);
    const response = await categoryProvider.getCategories(req.query);
    res.status(response.status).json(response.message);
};

async function getCategoriesFixedLevel(req, res) {
    log.info("category.js: getCategoriesFixedLevel");
    /**
     * Maybe in the future you want to search for categories indexed by date
     */
    categoryProvider.setIndex(categories);
    const response = await categoryProvider.getCategoriesFromLayer(req.query);
    res.status(response.status).json(response.message);
};

function handle(req, res) {
    res.send(res._getData());
};

module.exports = {
    checkFields : checkFields,
    checkParamsCategories : checkParamsCategories,
    checkParamsCategoriesFixedLevel : checkParamsCategoriesFixedLevel,
    getCategories : getCategories,
    getCategoriesFixedLevel : getCategoriesFixedLevel,
    handle : handle
};

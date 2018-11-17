const log4js = require('log4js');
const log = log4js.getLogger("default");
const dbEnv = require('../utils/EnvUtils').getDbEnv();
const Field = require('../db/models').indexschemafield;
const categories = require("../../index/categories.json");
const CategoryProvider = require("../core/CategoryProvider").CategoryProvider;
let categoryProvider = new CategoryProvider();
let Sequelize;
if(dbEnv == "true") {
    Sequelize = require("./../db/models/index").Sequelize;
}
/**
 * This method controls if passed parameters are allowed in the enum schema defined
 * for the current index type
 */
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

/**
* This methods controls if there are no missing parameters for the requested service:
 * ex: presence of fixedLevel or multiparameters query without the operator field
 */
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

/**
 * This methods controls if there are no missing parameters for the requested service:
 * ex: missing fixedLevel or multiparameters query without the operator field
 */
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

function getCategorySchemaFields(req, res) {
    if(dbEnv == "true") {
        Field.findAll({
            where : {
                index_type : "category"
            }
        }).then(fields => {
            return res.status(200).json(fields);
        });
    }else {
        log.info("category.js: getCategorySchemaFields: No DB Connection");
        return res.status(200).json({
            "message" : "No DB Connection",
            "value" : categoryProvider.getSchemaFields()
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
    getCategorySchemaFields : getCategorySchemaFields,
    getCategories : getCategories,
    getCategoriesFixedLevel : getCategoriesFixedLevel,
    handle : handle
};

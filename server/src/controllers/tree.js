const log4js = require('log4js');
const log = log4js.getLogger("default");
const dbEnv = require('../utils/EnvUtils').getDbEnv();
const Field = require('../db/models').indexschemafield;
const categories = require("../../index/categories.json");
const psychographics = require("../../index/psychographics.json");
const CategoryProvider = require("../core/CategoryProvider").CategoryProvider;
const PsychographicProvider = require("../core/PsychographicProvider").PsychographicProvider;
let provider;
let Sequelize;
let isFixed = false;
if(dbEnv == "true") {
    Sequelize = require("./../db/models/index").Sequelize;
}
/**
 * This method controls if passed parameters are allowed in the enum schema defined
 * for the current index type
 */
function checkFields(req, res, next) {
    let goNext = true;
    if(req.params.hasOwnProperty("tree")) {
        if(req.params.tree == "categories") {
            log.info("tree.js: checkFields for", req.params.tree);
            provider = new CategoryProvider();
            for(var key in req.query) {
                if(!provider.checkField(key, req.query[key])) {
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
        }else if(req.params.tree == "psychographics") {
            log.info("tree.js: checkFields for", req.params.tree);
            provider = new PsychographicProvider();
            for(var key in req.query) {
                if(!provider.checkField(key, req.query[key])) {
                    goNext = false;
                }
            }
            if(goNext) {
                return next();
            }else {
                res.status(404).send({
                    "message" : "Wrong Parameters"
                });
            }
        }else {
            res.status(404).json({
                "message" : "Wrong Parameters"
            });
        }
    }else {
        res.status(404).json({
            "message" : "Wrong Parameters"
        }); 
    }
};

function checkFixedLevel(req, res) {
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
    return goNext;
}

/**
* This methods controls if there are no missing parameters for the requested service:
 * ex: presence of fixedLevel or multiparameters query without the operator field
 */
function checkParams(req, res, next) {
    let goNext = true;
    var parameters = Object.keys(req.query);
    if(parameters.length > 1) {
        if(parameters.includes("fixedLevel")) {
            log.info("tree.js: checkParams with fixedLevel");
            isFixed = true;
            goNext = checkFixedLevel(req, res);
        }else {
            log.info("tree.js: checkParams without fixedLevel");
            isFixed = false;
            if(!parameters.includes("operator")) {
                goNext = false;
            }
            parameters.splice(parameters.indexOf("operator"), 1);
            if(parameters.length == 1) {
                goNext = false;
            }
        }
    }else {
        log.info("tree.js: checkParams without fixedLevel and operator");
        isFixed = false;
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

async function getElement(req, res) {
    /**
     * Maybe in the future you want to search for categories indexed by date
     */
    let response;
    switch(req.params.tree) {
        case "categories":
            provider = new CategoryProvider();
            provider.setIndex(categories);
            if(!isFixed) {
                log.info("tree.js: getElement for " + req.params.tree + " without fixedLevel");
                response = await provider.getCategories(req.query);
            }else {
                log.info("tree.js: getElement for " + req.params.tree + " with fixedLevel");
                response = await provider.getCategoriesFromLayer(req.query);
            }
            res.status(response.status).json(response.message);
            break;
        case "psychographics":
            provider = new PsychographicProvider();
            provider.setIndex(psychographics);
            if(!isFixed) {
                log.info("tree.js: getElement for " + req.params.tree + " without fixedLevel");
                response = await provider.getPsychographics(req.query);
            }else {
                log.info("tree.js: getElement for " + req.params.tree + " with fixedLevel");
                response = await provider.getPsychographicsFromLayer(req.query);
            }
            res.status(response.status).json(response.message);
            break;
        default:
            res.status(404).json({
                "message" : "Wrong Parameters"
            });
            break;
    }
};

function handle(req, res) {
    res.send(res._getData());
};

module.exports = {
    checkFields : checkFields,
    checkParams : checkParams,
    getElement : getElement,
    handle : handle
};

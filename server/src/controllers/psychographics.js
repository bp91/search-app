const log4js = require('log4js');
const log = log4js.getLogger("default");
const psychographics = require("../../index/psychographics.json");
const PsychographicProvider = require("../core/PsychographicProvider").PsychographicProvider;
let psychographicProvider = new PsychographicProvider();

/**
 * This method controls if passed parameters are allowed in the enum schema defined
 * for the current index type
 */
function checkFields(req, res, next) {
    log.info("psychographics.js: checkParams");
    let goNext = true;
    for(var key in req.query) {
        if(!psychographicProvider.checkField(key, req.query[key])) {
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
};

/**
* This methods controls if there are no missing parameters for the requested service:
 * ex: presence of fixedLevel or multiparameters query without the operator field
 */
function checkParamsPsychographics(req, res, next) {
    log.info("psychographics.js: checkParamsPsychographics");
    let goNext = true;
    var parameters = Object.keys(req.query);
    if(parameters.length > 1) {
        if(parameters.includes("fixedLevel") || (!parameters.includes("fixedLevel") && !parameters.includes("operator"))) {
            log.error("psychographics.js: checkParamsPsychographics: missing operator or fixedLevel presence");
            goNext = false;
        }
        parameters.splice(parameters.indexOf("operator"), 1);
        if(parameters.length == 1) {
            log.error("psychographics.js: checkParamsPsychographics: missing other field for operator");
            goNext = false;
        }
    }else {
        if(parameters.includes("fixedLevel") || parameters.includes("operator")) {
            log.error("psychographics.js: checkParamsPsychographics: no field passed");
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
function checkParamsPsychographicsFixedLevel(req, res, next) {
    log.info("psychographics.js: checkParamsPsychographicsFixedLevel");
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

async function getPsychographics(req, res) {
    log.info("psychographic.js: getPsychographics");
    /**
     * Maybe in the future you want to search for categories indexed by date
     */
    psychographicProvider.setIndex(psychographics);
    const response = await psychographicProvider.getPsychographics(req.query);
    res.status(response.status).json(response.message);
};

async function getPsychographicsFixedLevel(req, res) {
    log.info("psychographic.js: getPsychographicsFixedLevel");
    /**
     * Maybe in the future you want to search for categories indexed by date
     */
    psychographicProvider.setIndex(psychographics);
    const response = await psychographicProvider.getPsychographicsFromLayer(req.query);
    res.status(response.status).json(response.message);
};

function handle(req, res) {
    res.send(res._getData());
};

module.exports = {
    checkFields : checkFields,
    checkParamsPsychographics : checkParamsPsychographics,
    checkParamsPsychographicsFixedLevel : checkParamsPsychographicsFixedLevel,
    getPsychographics : getPsychographics,
    getPsychographicsFixedLevel : getPsychographicsFixedLevel,
    handle : handle
};

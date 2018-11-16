const log4js = require('log4js');
const log = log4js.getLogger("default");
const psychographics = require("../../index/psychographics.json");
const PsychographicProvider = require("../core/PsychographicProvider").PsychographicProvider;
let psychographicProvider;

function checkParams(req, res, next) {
    log.info("psychographics.js: checkParams");
    psychographicProvider = new PsychographicProvider(psychographics);
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
            "message" : "Wrong parameters"
        });
    }
};

async function getPsychographics(req, res) {
    log.info("psychographic.js: getPsychographics");
    /**
     * Maybe in the future you want to search for categories indexed by date
     */
    const response = await psychographicProvider.getPsychographics(req.query);
    res.status(response.status).send(response.message);
};

async function getPsychographicsFixedLevel(req, res) {
    log.info("psychographic.js: getPsychographicsFixedLevel");
    /**
     * Maybe in the future you want to search for categories indexed by date
     */
    const response = await psychographicProvider.getPsychographicsFromLayer(req.query);
    res.status(response.status).send(response.message);
};

module.exports = {
    checkParams : checkParams,
    getPsychographics : getPsychographics,
    getPsychographicsFixedLevel : getPsychographicsFixedLevel
};

const log4js = require('log4js');
const log = log4js.getLogger("default");
const fields = require("../db/enum/PsychographicFields").PsychographicFields;
const SearchUtils = require("../utils/SearchUtils");

class PsychographicProvider {
    constructor() {
        this.index = undefined;
    }
};

PsychographicProvider.prototype.setIndex = function(index) {
    this.index = index;
};

PsychographicProvider.prototype.checkField = function(field, value) {
    if(fields.hasOwnProperty(field)) {
        if(field == "operator") {
            if(fields.operator.includes(value.toUpperCase())) {
                return true;
            }else {
                return false;
            }
        }else {
            if(fields[field].type == "int") {
                if(!isNaN(value)) {
                    return true
                }else {
                    return false
                }
            }else {
                return true;
            }
        }
    }else {
        return false;
    }
};

PsychographicProvider.prototype.getPsychographics = async function(params) {
    log.info("PsychographicProvider.js: getPsychographics");
    try {
        response = await SearchUtils.recursiveSearch(this.index, fields, params);
        return  {
            "status" : response.status,
            "message" : response.value
        }
    }catch(e) {
        log.error(e);
        return {
            "status" : 404,
            "message" : {
                "message" : e
            }
        };
    }
};

PsychographicProvider.prototype.getPsychographicsFromLayer = async function(params) {
    try {
        const jumpLevel = params.fixedLevel;
        delete params.fixedLevel;
        response = await SearchUtils.recursiveSearch(this.index, fields, params, undefined, undefined, jumpLevel);
        return  {
            "status" : response.status,
            "message" : response.value
        }
    }catch(e) {
        log.error(e);
        return {
            "status" : 404,
            "message" : {
                "message" : e
            }
        };
    }
};


module.exports = {
    PsychographicProvider
};
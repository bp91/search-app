const log4js = require('log4js');
const log = log4js.getLogger("default");
const fields = require("../db/enum/CategoryFields").CategoryFields;
const SearchUtils = require("../utils/SearchUtils");

class CategoryProvider {
    constructor() {
        this.index = undefined;
    }
};

CategoryProvider.prototype.setIndex = function(index) {
    this.index = index;
};

CategoryProvider.prototype.checkField = function(field, value) {
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

CategoryProvider.prototype.getCategories = async function(params) {
    log.info("CategoryProvider.js: getCategories");
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

CategoryProvider.prototype.getCategoriesFromLayer = async function(params) {
    try {
        const jumpLevel = params.fixedLevel;
        delete params.fixedLevel;
        response = await SearchUtils.recursiveSearch(this.index, fields, params, undefined, undefined, jumpLevel);
        return  {
            "status" : 200,
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
    CategoryProvider
};
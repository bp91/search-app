const log4js = require('log4js');
const log = log4js.getLogger("default");
const alasql = require('alasql');
const fields = require("../db/enum/CategoryFields").CategoryFields;
const QueryConstructor = require("../utils/QueryConstructor");
const SearchUtils = require("../utils/SearchUtils");

class CategoryProvider {
    constructor(index) {
        this.index = index;
    }
};

CategoryProvider.prototype.checkField = function(field, value) {
    if(fields.hasOwnProperty(field)) {
        if(field == "OPERATOR") {
            if(fields.OPERATOR.includes(value)) {
                return true;
            }else {
                return false;
            }
        }else {
            return true;
        }
    }else {
        return false;
    }
};

CategoryProvider.prototype.getCategory = async function(params) {
    try {
        response = await SearchUtils.recursiveSearch(this.index, fields, params);
        return  {
            "status" : 200,
            "message" : response
        }
    }catch(e) {
        log.error(e);
        return {
            "status" : 404,
            "message" : e
        };
    }
};


module.exports = {
    CategoryProvider
};
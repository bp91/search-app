const log4js = require('log4js');
const log = log4js.getLogger("default");
const alasql = require('alasql');
const fields = require("../db/enum/CategoryFields").CategoryFields;
const QueryConstructor = require("../utils/QueryConstructor");

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

CategoryProvider.prototype.getCategory = function(params) {
    let query;
    if(Object.keys(params).length > 1) {
        query = QueryConstructor.multiQuery(fields, params);
    }else {
        query = QueryConstructor.singleQuery(fields, params);
    }

    try {
        return  {
            "status" : 200,
            "message" : alasql(query,[this.index])
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
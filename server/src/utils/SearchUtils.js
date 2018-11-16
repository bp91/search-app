const log4js = require('log4js');
const log = log4js.getLogger("default");
let BreakException = {};

function concatParams(sub, params, fields, operator) {
    let query = "";
    for(var key in params) {
        if(query == "") {
            if(fields[key].type == "string") {
                query = "'" + sub[key].replace(/\\/g, "\\\\").replace(/\$/g, "\\$").replace(/'/g, "\\'").replace(/"/g, "\\\"") + "'=='" + params[key].replace(/\\/g, "\\\\").replace(/\$/g, "\\$").replace(/'/g, "\\'").replace(/"/g, "\\\"") + "'";
            }else if(fields[key].type == "int"){
                query = sub[key] + "==" + params[key];
            }
        }else {
            if(fields[key].type == "string") {
                query = query + operator + "'" + sub[key].replace(/\\/g, "\\\\").replace(/\$/g, "\\$").replace(/'/g, "\\'").replace(/"/g, "\\\"") + "'=='" + params[key].replace(/\\/g, "\\\\").replace(/\$/g, "\\$").replace(/'/g, "\\'").replace(/"/g, "\\\"") + "'";
       
            }else if(fields[key].type == "int"){
                query = query + operator + sub[key] + "==" + params[key];
            }
        }
    }
    return query;
}

function createQuery(sub, params, fields) {
    if(params.hasOwnProperty("operator")) {
        switch (params.operator) {
            case "or":
                return concatParams(sub, params, fields, "||");
            case "and":
                return concatParams(sub, params, fields, "&&");
            default:
                return undefined;
        }
    }else {
        if(Object.keys(params).length > 1) {
            log.error("Wrong Parameters");
            return undefined;
        }else {
            return concatParams(sub, params, fields, undefined);
        }
    }
};

function findSublayer(fields, sub) {
    let returnValue = {
        "check" : false,
        "value" : ""
    };
    for(var key in sub) {
        console.log(fields[key].type);
        if(fields[key].type == "object") {
            returnValue.check = true;
            returnValue.value = key;
        }
    }
    return returnValue;
}

async function recursiveSearch(index, fields, params, layer, resp, jumpLevel) {
    log.info("SearchUtils.js: recursiveSearch with params: ", params, layer, resp, jumpLevel);
    if(resp == undefined) {
        resp = [];
    }
    if(layer == undefined) {
        layer = 0;
    }

    try {
        index.forEach(function(sub) {
            if(jumpLevel == undefined || layer == jumpLevel - 1) {
                let query = createQuery(sub, params, fields);
                if(query != undefined) {
                    if(eval(query)) {
                        if(resp.length > 0) {
                            if(resp[0].layer < layer) {
                                resp.pop();
                                resp.push({
                                    "layer" : layer,
                                    "value" : [sub]
                                });
                            }else if(resp[0].layer == layer) {
                                resp[0].value.push(sub);
                            }
                        }else {
                            resp.push({
                                "layer" : layer,
                                "value" : [sub]
                            });
                        }
                    }
                }else {
                    resp.push({
                        "value" : "Wrong Parameters"
                    });
                    throw BreakException;
                }
            }
            let sublayer = findSublayer(fields, sub);
            if(sublayer.check) {
                recursiveSearch(sub[sublayer.value], fields, params, layer + 1, resp, jumpLevel);
            }
        });
        if(resp.length > 0) {
            return resp[0].value;
        }else {
            return resp;
        }
    }catch(e) {
        log.error(e);
        if(e === BreakException) {
            return e["message"] = "Wrong Parameters";
        }
    }
};

module.exports = {
    recursiveSearch : recursiveSearch
};
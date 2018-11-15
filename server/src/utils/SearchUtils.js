const log4js = require('log4js');
const log = log4js.getLogger("default");

async function recursiveSearch(index, fields, params, layer, resp) {
    if(resp == undefined) {
        resp = [];
    }
    if(layer == undefined) {
        layer = 0;
    }
    index.forEach(function(sub) {
        if(sub.name == params.name) {
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
        if(sub.hasOwnProperty("children")) {
            recursiveSearch(sub.children, fields, params, layer + 1, resp);
            
        }
    });
    if(resp.length > 0) {
        return resp[0].value;
    }else {
        return resp;
    }
};

module.exports = {
    recursiveSearch : recursiveSearch
};
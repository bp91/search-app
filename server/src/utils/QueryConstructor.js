const log4js = require('log4js');
const log = log4js.getLogger("default");

function singleQuery(fields, params) {
    log.info("CategoryProvider: Single Query with params ", params);
    let query = "SEARCH / * WHERE(";
    
    for(var key in params) {
        query = query + (fields[key].type == "string"? fields[key].value + "='" + params[key] + "'" : (fields[key].type == "int"? fields[key].value + "=" + params[key] + "" : undefined));
    }
    query = query + ") FROM ?";

    return query;
};

function multiQuery(fields, params) {
    log.info("CategoryProvider: Multi Query with params ", params);
    let query = "SEARCH / * WHERE(";

    let operator = params["operator"];
    delete params["operator"];
    
    for(var key in params) {
        query = query + (fields[key].type == "string"? fields[key].value + "='" + params[key] + "'" : (fields[key].type == "int"? fields[key].value + "=" + params[key] + "" : undefined)) + " " + operator + " ";
    }
    query = query.slice(0, -5) + ") FROM ?";

    return query;
};

module.exports = {
    singleQuery : singleQuery,
    multiQuery : multiQuery
}
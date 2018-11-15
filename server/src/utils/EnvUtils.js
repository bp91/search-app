var log4js = require('log4js');

var log = log4js.getLogger("default");

function getEnv() {
    let returnValue = "";
    let tmpEnv = "";

    if(process.argv && Array.isArray(process.argv.slice(2))) {
        process.argv.slice(2).forEach(function(arg) {
            if(arg.indexOf("env") !== -1) {
                tmpEnv = arg.substring(arg.lastIndexOf("=") + 1);
            }
        });
    }
    if(tmpEnv && tmpEnv != "") {
        returnValue = tmpEnv;
    }else {
        returnValue = process.env.npm_config_env ||  'development';
    }
    log.info("EnvUtils: env =", returnValue);
    return returnValue;
};

function getDbEnv() {
    let returnValue = "";
    let tmpDb = "";

    if(process.argv && Array.isArray(process.argv.slice(2))) {
        process.argv.slice(2).forEach(function(arg) {
            if(arg.indexOf("db") !== -1) {
                tmpDb = arg.substring(arg.lastIndexOf("=") + 1);
                if(tmpDb != "true" && tmpDb != "false") {
                    tmpDb = "false";
                }
            }
        });
    }
    if(tmpDb && tmpDb != "") {
        returnValue = tmpDb;
    }else {
        returnValue = "false";
    }
    log.info("EnvUtils: db =", returnValue);
    return returnValue;
};

module.exports = {
    getEnv : getEnv,
    getDbEnv : getDbEnv
};
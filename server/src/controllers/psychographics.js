const log4js = require('log4js');
const log = log4js.getLogger("default");
const dbEnv = require('../utils/EnvUtils').getDbEnv();
const Field = require('../db/models').indexschemafield;
const PsychographicProvider = require("../core/PsychographicProvider").PsychographicProvider;
let psychographicProvider = new PsychographicProvider();
let Sequelize;
if(dbEnv == "true") {
    Sequelize = require("./../db/models/index").Sequelize;
}

function getPsychographicsSchemaFields(req, res) {
    if(dbEnv == "true") {
        Field.findAll({
            where : {
                index_type : "psychographic"
            }
        }).then(fields => {
            return res.status(200).json(fields);
        });
    }else {
        log.info("psychographic.js: getPsychographicsSchemaFields: No DB Connection");
        return res.status(200).json({
            "message" : "No DB Connection",
            "value" : psychographicProvider.getSchemaFields()
        });
    }
};

function handle(req, res) {
    res.send(res._getData());
};

module.exports = {
    getPsychographicsSchemaFields : getPsychographicsSchemaFields,
    handle : handle
};

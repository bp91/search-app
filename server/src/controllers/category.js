const log4js = require('log4js');
const log = log4js.getLogger("default");
const dbEnv = require('../utils/EnvUtils').getDbEnv();
const Field = require('../db/models').indexschemafield;
const CategoryProvider = require("../core/CategoryProvider").CategoryProvider;
let categoryProvider = new CategoryProvider();
let Sequelize;
if(dbEnv == "true") {
    Sequelize = require("./../db/models/index").Sequelize;
}

function getCategorySchemaFields(req, res) {
    if(dbEnv == "true") {
        Field.findAll({
            where : {
                index_type : "category"
            }
        }).then(fields => {
            return res.status(200).json(fields);
        });
    }else {
        log.info("category.js: getCategorySchemaFields: No DB Connection");
        return res.status(200).json({
            "message" : "No DB Connection",
            "value" : categoryProvider.getSchemaFields()
        });
    }
};

function handle(req, res) {
    res.send(res._getData());
};

module.exports = {
    getCategorySchemaFields : getCategorySchemaFields,
    handle : handle
};

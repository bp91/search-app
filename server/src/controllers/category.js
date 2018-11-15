const log4js = require('log4js');
const log = log4js.getLogger("default");
const categories = require("../../index/categories.json");
const CategoryProvider = require("../core/CategoryProvider").CategoryProvider;
let categoryProvider;

function checkParams(req, res, next) {
    categoryProvider = new CategoryProvider(categories);
    let goNext = true;
    for(var key in req.query) {
        if(!categoryProvider.checkField(key, req.query[key])) {
            goNext = false;
        }
    }
    if(goNext) {
        return next();
    }else {
        res.status(404).send({
            "message" : "Wrong parameters"
        });
    }
};

async function getCategory(req, res) {
    /**
     * Maybe in the future you want to search for categories indexed by date
     */
    categoryProvider = new CategoryProvider(categories);
    const response = await categoryProvider.getCategory(req.query);
    res.status(response.status).send(response.message);
};

module.exports = {
    checkParams : checkParams,
    getCategory : getCategory
};

const elasticsearch = require('elasticsearch');
const config = require('./config/config.json').development.elasticsearch;

let client = new elasticsearch.Client({
    hosts : [
        "http://" + config.server + ":" + config.port + "/" 
    ]
});

client.cluster.health({},function(err,resp,status) {  
    console.log("-- Client Health --",resp);
});
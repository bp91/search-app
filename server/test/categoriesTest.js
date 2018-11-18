let categoryController = require('../src/controllers/tree');
let http_mocks = require('node-mocks-http');
let assert = require('assert');

function buildResponse() {
    return http_mocks.createResponse({eventEmitter: require('events').EventEmitter})
};

describe('categories test', function() {
    it("Wrong Parameters", async function() {
        var response = http_mocks.createResponse({eventEmitter: require('events').EventEmitter});
        var request = http_mocks.createRequest({
            method: 'GET',
            url: '/element/categories',
            query : {
                "customField" : "Punk",
            }
        });

        response.on("end", function() {
            assert.equal(response._getData(), JSON.stringify({
                "message": "Wrong Parameters"
                }));
        });
        
        await categoryController.checkFields(request, response);

        categoryController.handle(request, response, function() {
            done();
        });
    });

    it("Unhandled Parameters", async function() {
        var response = http_mocks.createResponse({eventEmitter: require('events').EventEmitter});
        var request = http_mocks.createRequest({
            method: 'GET',
            url: '/element/categories',
            query : {
                "name" : "Punk",
                "fixedLevel" : 3
            }
        });

        response.on("end", function() {
            assert.equal(response._getData(), JSON.stringify({
                "message": "Wrong Parameters"
                }));
        });
        
        await categoryController.checkFields(request, response);

        categoryController.handle(request, response, function() {
            done();
        });
    });

    it("operator without all fields", async function() {
        var response = http_mocks.createResponse({eventEmitter: require('events').EventEmitter});
        var request = http_mocks.createRequest({
            method: 'GET',
            url: '/element/categories',
            query : {
                "name" : "Punk",
                "operator" : "and"
            }
        });

        response.on("end", function() {
            assert.equal(response._getData(), JSON.stringify({
                "message": "Wrong Parameters"
                }));
        });
        
        await categoryController.checkParams(request, response);

        categoryController.handle(request, response, function() {
            done();
        });
    });

    it("operator without all fields and fixedLevel", async function() {
        var response = http_mocks.createResponse({eventEmitter: require('events').EventEmitter});
        var request = http_mocks.createRequest({
            method: 'GET',
            url: '/element/categories',
            query : {
                "name" : "Punk",
                "operator" : "and"
            }
        });

        response.on("end", function() {
            assert.equal(response._getData(), JSON.stringify({
                "message": "Wrong Parameters"
                }));
        });
        
        await categoryController.checkParams(request, response);

        categoryController.handle(request, response, function() {
            done();
        });
    });
    
    it("Category Punk", async function() {
        var response = http_mocks.createResponse({eventEmitter: require('events').EventEmitter});
        var request = http_mocks.createRequest({
            method: 'GET',
            url: '/element',
            params:{
                "tree" : "categories"
            },
            query : {
                "name" : "Punk",
            }
        });

        response.on("end", function() {
            assert.equal(response._getData(), JSON.stringify([{
                "l1": -3,
                "l2": 13,
                "level": 3,
                "id": 25,
                "name": "Punk"
                }]));
        });
        
        await categoryController.getElement(request, response);

        categoryController.handle(request, response, function() {
            done();
        });
    });

    it("Category Punk and Level", async function() {
        var response = http_mocks.createResponse({eventEmitter: require('events').EventEmitter});
        var request = http_mocks.createRequest({
            method: 'GET',
            url: '/element',
            params:{
                "tree" : "categories"
            },
            query : {
                "name" : "Punk",
                "level" : 3,
                "operator" : "and"
            }
        });

        response.on("end", function() {
            assert.equal(response._getData(), JSON.stringify([{
                "l1": -3,
                "l2": 13,
                "level": 3,
                "id": 25,
                "name": "Punk"
                }]));
        });
        
        await categoryController.getElement(request, response);

        categoryController.handle(request, response, function() {
            done();
        });
    });

    it("Category Punk and Level missing operator", async function() {
        var response = http_mocks.createResponse({eventEmitter: require('events').EventEmitter});
        var request = http_mocks.createRequest({
            method: 'GET',
            url: '/element/categories',
            query : {
                "name" : "Punk",
                "level" : 3
            }
        });

        response.on("end", function() {
            assert.equal(response._getData(), JSON.stringify({
                "message": "Wrong Parameters"
                }));
        });
        
        await categoryController.checkParams(request, response);

        categoryController.handle(request, response, function() {
            done();
        });
    });

    it("Category Punk and Level missing operator and with fixedLevel", async function() {
        var response = http_mocks.createResponse({eventEmitter: require('events').EventEmitter});
        var request = http_mocks.createRequest({
            method: 'GET',
            url: '/element',
            params:{
                "tree" : "categories"
            },
            query : {
                "name" : "Punk",
                "level" : 3,
                "fixedLevel" : 3
            }
        });

        response.on("end", function() {
            assert.equal(response._getData(), JSON.stringify({
                "message": "Wrong Parameters"
                }));
        });
        
        await categoryController.checkParams(request, response);

        categoryController.handle(request, response, function() {
            done();
        });
    });

    it("Category Punk and Level empty response", async function() {
        var response = http_mocks.createResponse({eventEmitter: require('events').EventEmitter});
        var request = http_mocks.createRequest({
            method: 'GET',
            url: '/element',
            params:{
                "tree" : "categories"
            },
            query : {
                "name" : "Punk",
                "level" : 2,
                "operator" : "and"
            }
        });

        response.on("end", function() {
            assert.equal(response._getData(), JSON.stringify([]));
        });
        
        await categoryController.getElement(request, response);

        categoryController.handle(request, response, function() {
            done();
        });
    });
});

describe('categoriesFixedLevel test', function() {
    it("Wrong Parameters", async function() {
        var response = http_mocks.createResponse({eventEmitter: require('events').EventEmitter});
        var request = http_mocks.createRequest({
            method: 'GET',
            url: '/element',
            params:{
                "tree" : "categories"
            },
            query : {
                "customField" : "Punk",
            }
        });

        response.on("end", function() {
            assert.equal(response._getData(), JSON.stringify({
                "message": "Wrong Parameters"
                }));
        });
        
        await categoryController.checkFields(request, response);

        categoryController.handle(request, response, function() {
            done();
        });
    });

    it("Category Punk", async function() {
        var response = http_mocks.createResponse({eventEmitter: require('events').EventEmitter});
        var request = http_mocks.createRequest({
            method: 'GET',
            url: '/element',
            params:{
                "tree" : "categories"
            },
            query : {
                "name" : "Punk",
                "fixedLevel" : 3
            }
        });

        response.on("end", function() {
            assert.equal(response._getData(), JSON.stringify([{
                "l1": -3,
                "l2": 13,
                "level": 3,
                "id": 25,
                "name": "Punk"
                }]));
        });
        
        await categoryController.getElement(request, response);

        categoryController.handle(request, response, function() {
            done();
        });
    });

    it("Missing operator", async function() {
        var response = http_mocks.createResponse({eventEmitter: require('events').EventEmitter});
        var request = http_mocks.createRequest({
            method: 'GET',
            url: '/element',
            params:{
                "tree" : "categories"
            },
            query : {
                "name" : "Punk",
                "level": 3,
                "fixedLevel": 3
            }
        });

        response.on("end", function() {
            assert.equal(response._getData(), JSON.stringify({
                "message": "Wrong Parameters"
                }));
        });
        
        await categoryController.checkParams(request, response);

        categoryController.handle(request, response, function() {
            done();
        });
    });

    it("Punk with operator and", async function() {
        var response = http_mocks.createResponse({eventEmitter: require('events').EventEmitter});
        var request = http_mocks.createRequest({
            method: 'GET',
            url: '/element',
            params:{
                "tree" : "categories"
            },
            query : {
                "name" : "Punk",
                "level": 3,
                "fixedLevel": 3,
                "operator" : "and"
            }
        });

        response.on("end", function() {
            assert.equal(response._getData(), JSON.stringify([{
                "l1": -3,
                "l2": 13,
                "level": 3,
                "id": 25,
                "name": "Punk"
                }]));
        });
        
        await categoryController.getElement(request, response);

        categoryController.handle(request, response, function() {
            done();
        });
    });

    it("Empty Response", async function() {
        var response = http_mocks.createResponse({eventEmitter: require('events').EventEmitter});
        var request = http_mocks.createRequest({
            method: 'GET',
            url: '/element',
            params:{
                "tree" : "categories"
            },
            query : {
                "name" : "Punk",
                "fixedLevel": 2
            }
        });

        response.on("end", function() {
            assert.equal(response._getData(), JSON.stringify([]));
        });
        
        await categoryController.getElement(request, response);

        categoryController.handle(request, response, function() {
            done();
        });
    });

    it("Empty Response with operator", async function() {
        var response = http_mocks.createResponse({eventEmitter: require('events').EventEmitter});
        var request = http_mocks.createRequest({
            method: 'GET',
            url: '/element',
            params:{
                "tree" : "categories"
            },
            query : {
                "name" : "Punk",
                "level" : 3,
                "operator" : "and",
                "fixedLevel": 2
            }
        });

        response.on("end", function() {
            assert.equal(response._getData(), JSON.stringify([]));
        });
        
        await categoryController.getElement(request, response);

        categoryController.handle(request, response, function() {
            done();
        });
    });
});
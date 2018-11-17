let categoryController = require('../src/controllers/category');
let http_mocks = require('node-mocks-http');
let assert = require('assert');

function buildResponse() {
    return http_mocks.createResponse({eventEmitter: require('events').EventEmitter})
};

// (function prepareData() {
//     console.log("Prepare Data");
//     global.CurrencyProvider.setTodayCurrency(
//         [
//             {
//                 "$" : {
//                     "time" : "2018-10-26"
//                 },
//                 "Cube" : [
//                     {
//                         "$" : {
//                             "currency" : "USD",
//                             "rate" : "1.1345"
//                         }
//                     },
//                     {
//                         "$" : {
//                             "currency" : "JPY",
//                             "rate" : "127.13"
//                         }
//                     }
//                 ]
//             }
//         ]
//     );
// })();

describe('categories test', function() {
    it("Wrong Parameters", async function() {
        var response = http_mocks.createResponse({eventEmitter: require('events').EventEmitter});
        var request = http_mocks.createRequest({
            method: 'GET',
            url: '/categories',
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
            url: '/categories',
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
        
        await categoryController.getCategories(request, response);

        categoryController.handle(request, response, function() {
            done();
        });
    });
    
    it("Category Punk", async function() {
        var response = http_mocks.createResponse({eventEmitter: require('events').EventEmitter});
        var request = http_mocks.createRequest({
            method: 'GET',
            url: '/categories',
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
        
        await categoryController.getCategories(request, response);

        categoryController.handle(request, response, function() {
            done();
        });
    });
});
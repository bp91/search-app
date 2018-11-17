let currencyController = require('../src/controllers/currency');
let http_mocks = require('node-mocks-http');
let assert = require('assert');
const CurrencyProvider = require('../src/core/CurrencyProvider').CurrencyProvider;
global.CurrencyProvider = new CurrencyProvider();

function buildResponse() {
    return http_mocks.createResponse({eventEmitter: require('events').EventEmitter})
};

(function prepareData() {
    console.log("Prepare Data");
    global.CurrencyProvider.setTodayCurrency(
        [
            {
                "$" : {
                    "time" : "2018-10-26"
                },
                "Cube" : [
                    {
                        "$" : {
                            "currency" : "USD",
                            "rate" : "1.1345"
                        }
                    },
                    {
                        "$" : {
                            "currency" : "JPY",
                            "rate" : "127.13"
                        }
                    }
                ]
            }
        ]
    );
})();

describe('getCurrency test', function() {
    it("Amount USD", function() {
        var response = http_mocks.createResponse({eventEmitter: require('events').EventEmitter});
        var request = http_mocks.createRequest({
            method: 'GET',
            url: '/currencies',
            query : {
                "amount" : "10.2",
                "src_currency" : "EUR",
                "dest_currency" : "USD",
                "reference_date" : "2018-10-26"
            }
        });

        response.on("end", function(done) {
            assert.equal(response._getData(), JSON.stringify({
                "amount" : 11.5719,
                "currency" : "USD"
            }));
        });

        currencyController.getCurrency(request, response);

        currencyController.handle(request, response, function() {
            done();
        });
    });

    it("Amount JPY fail", function() {
        var response = http_mocks.createResponse({eventEmitter: require('events').EventEmitter});
        var request = http_mocks.createRequest({
            method: 'GET',
            url: '/currencies',
            query : {
                "amount" : "10.4",
                "src_currency" : "EUR",
                "dest_currency" : "JPY",
                "reference_date" : "2018-10-26"
            }
        });

        response.on("end", function(done) {
            assert.notEqual(response._getData(), JSON.stringify({
                "amount" : 1296.7259999999999,
                "currency" : "JPY"
            }));
        });

        currencyController.getCurrency(request, response);

        currencyController.handle(request, response, function() {
            done();
        });
    });

    it("Missing amount", function() {
        var response = http_mocks.createResponse({eventEmitter: require('events').EventEmitter});
        var request = http_mocks.createRequest({
            method: 'GET',
            url: '/currencies',
            query : {
                "src_currency" : "EUR",
                "dest_currency" : "JPY",
                "reference_date" : "2018-10-26"
            }
        });

        response.on("end", function(done) {
            assert.equal(response._getData(), JSON.stringify({
                "message" : "Missing parameters"
            }));
        });

        currencyController.getCurrency(request, response);

        currencyController.handle(request, response, function() {
            done();
        });
    });

    it("Missing src_currency", function() {
        var response = http_mocks.createResponse({eventEmitter: require('events').EventEmitter});
        var request = http_mocks.createRequest({
            method: 'GET',
            url: '/currencies',
            query : {
                "amount" : "10.4",
                "dest_currency" : "JPY",
                "reference_date" : "2018-10-26"
            }
        });

        response.on("end", function(done) {
            assert.equal(response._getData(), JSON.stringify({
                "message" : "Missing parameters"
            }));
        });

        currencyController.getCurrency(request, response);

        currencyController.handle(request, response, function() {
            done();
        });
    });

    it("Missing dest_currency", function() {
        var response = http_mocks.createResponse({eventEmitter: require('events').EventEmitter});
        var request = http_mocks.createRequest({
            method: 'GET',
            url: '/currencies',
            query : {
                "amount" : "10.4",
                "src_currency" : "EUR",
                "reference_date" : "2018-10-26"
            }
        });

        response.on("end", function(done) {
            assert.equal(response._getData(), JSON.stringify({
                "message" : "Missing parameters"
            }));
        });

        currencyController.getCurrency(request, response);

        currencyController.handle(request, response, function() {
            done();
        });
    });

    it("Missing reference_date", function() {
        var response = http_mocks.createResponse({eventEmitter: require('events').EventEmitter});
        var request = http_mocks.createRequest({
            method: 'GET',
            url: '/currencies',
            query : {
                "amount" : "10.4",
                "src_currency" : "EUR",
                "dest_currency" : "JPY"
            }
        });

        response.on("end", function(done) {
            assert.equal(response._getData(), JSON.stringify({
                "message" : "Missing parameters"
            }));
        });

        currencyController.getCurrency(request, response);

        currencyController.handle(request, response, function() {
            done();
        });
    });

    it("Invalid amount", function() {
        var response = http_mocks.createResponse({eventEmitter: require('events').EventEmitter});
        var request = http_mocks.createRequest({
            method: 'GET',
            url: '/currencies',
            query : {
                "amount" : "dasdsa",
                "src_currency" : "EUR",
                "dest_currency" : "JPY",
                "reference_date" : "2018-10-26"
            }
        });

        response.on("end", function(done) {
            assert.equal(response._getData(), JSON.stringify({
                "message" : "Invalid amount param"
            }));
        });

        currencyController.getCurrency(request, response);

        currencyController.handle(request, response, function() {
            done();
        });
    });

    it("Wrong src_currency", function() {
        var response = http_mocks.createResponse({eventEmitter: require('events').EventEmitter});
        var request = http_mocks.createRequest({
            method: 'GET',
            url: '/currencies',
            query : {
                "amount" : "10.4",
                "src_currency" : "sadsa",
                "dest_currency" : "JPY",
                "reference_date" : "2018-10-26"
            }
        });

        response.on("end", function(done) {
            assert.equal(response._getData(), JSON.stringify({
                "message" : "Wrong src_currency"
            }));
        });

        currencyController.getCurrency(request, response);

        currencyController.handle(request, response, function() {
            done();
        });
    });

    it("Wrong dest_currency", function() {
        var response = http_mocks.createResponse({eventEmitter: require('events').EventEmitter});
        var request = http_mocks.createRequest({
            method: 'GET',
            url: '/currencies',
            query : {
                "amount" : "10.4",
                "src_currency" : "EUR",
                "dest_currency" : "dsdsad",
                "reference_date" : "2018-10-26"
            }
        });

        response.on("end", function(done) {
            assert.equal(response._getData(), JSON.stringify({
                "message" : "Wrong dest_currency"
            }));
        });

        currencyController.getCurrency(request, response);

        currencyController.handle(request, response, function() {
            done();
        });
    });

    it("Wrong reference_date", function() {
        var response = http_mocks.createResponse({eventEmitter: require('events').EventEmitter});
        var request = http_mocks.createRequest({
            method: 'GET',
            url: '/currencies',
            query : {
                "amount" : "10.4",
                "src_currency" : "EUR",
                "dest_currency" : "JPY",
                "reference_date" : "sdadas"
            }
        });

        response.on("end", function(done) {
            assert.equal(response._getData(), JSON.stringify({
                "message" : "Invalid reference_date param"
            }));
        });

        currencyController.getCurrency(request, response);

        currencyController.handle(request, response, function() {
            done();
        });
    });

    it("Missing reference_date", function() {
        var response = http_mocks.createResponse({eventEmitter: require('events').EventEmitter});
        var request = http_mocks.createRequest({
            method: 'GET',
            url: '/currencies',
            query : {
                "amount" : "10.4",
                "src_currency" : "EUR",
                "dest_currency" : "JPY",
                "reference_date" : "2018-10-27"
            }
        });

        response.on("end", function(done) {
            assert.equal(response._getData(), JSON.stringify({
                "message" : "No updated rate found for the date"
            }));
        });

        currencyController.getCurrency(request, response);

        currencyController.handle(request, response, function() {
            done();
        });
    });
});
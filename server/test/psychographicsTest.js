let psychographicController = require('../src/controllers/psychographics');
let http_mocks = require('node-mocks-http');
let assert = require('assert');

function buildResponse() {
    return http_mocks.createResponse({eventEmitter: require('events').EventEmitter})
};

describe('psychographic test', function() {
    it("Wrong Parameters", async function() {
        var response = http_mocks.createResponse({eventEmitter: require('events').EventEmitter});
        var request = http_mocks.createRequest({
            method: 'GET',
            url: '/psychographics',
            query : {
                "customField" : "Lifestyles",
            }
        });

        response.on("end", function() {
            assert.equal(JSON.stringify(response._getData()), JSON.stringify({
                "message": "Wrong Parameters"
                }));
        });
        
        await psychographicController.checkFields(request, response);

        psychographicController.handle(request, response, function() {
            done();
        });
    });

    it("Unhandled Parameters", async function() {
        var response = http_mocks.createResponse({eventEmitter: require('events').EventEmitter});
        var request = http_mocks.createRequest({
            method: 'GET',
            url: '/psychographics',
            query : {
                "label" : "Lifestyles",
                "fixedLevel" : 3
            }
        });

        response.on("end", function() {
            assert.equal(response._getData(), JSON.stringify({
                "message": "Wrong Parameters"
                }));
        });
        
        await psychographicController.checkParamsPsychographics(request, response);

        psychographicController.handle(request, response, function() {
            done();
        });
    });

    it("operator without all fields", async function() {
        var response = http_mocks.createResponse({eventEmitter: require('events').EventEmitter});
        var request = http_mocks.createRequest({
            method: 'GET',
            url: '/psychographics',
            query : {
                "label" : "Lifestyles",
                "operator" : "and"
            }
        });

        response.on("end", function() {
            assert.equal(response._getData(), JSON.stringify({
                "message": "Wrong Parameters"
                }));
        });
        
        await psychographicController.checkParamsPsychographics(request, response);

        psychographicController.handle(request, response, function() {
            done();
        });
    });

    it("operator without all fields and fixedLevel", async function() {
        var response = http_mocks.createResponse({eventEmitter: require('events').EventEmitter});
        var request = http_mocks.createRequest({
            method: 'GET',
            url: '/psychographics',
            query : {
                "label" : "Lifestyles",
                "operator" : "and"
            }
        });

        response.on("end", function() {
            assert.equal(response._getData(), JSON.stringify({
                "message": "Wrong Parameters"
                }));
        });
        
        await psychographicController.checkParamsPsychographics(request, response);

        psychographicController.handle(request, response, function() {
            done();
        });
    });
    
    it("Label Lifestyles", async function() {
        var response = http_mocks.createResponse({eventEmitter: require('events').EventEmitter});
        var request = http_mocks.createRequest({
            method: 'GET',
            url: '/psychographics',
            query : {
                "label" : "Lifestyles",
                "operator" : "and"
            }
        });

        response.on("end", function() {
            assert.equal(response._getData(), JSON.stringify([
                {
                "values": [
                {
                "values": [
                {
                "value": "Ads web",
                "id": 7,
                "label": "Online Ads"
                },
                {
                "value": "Ads Road",
                "id": 5,
                "label": "Outdoor Ads"
                },
                {
                "value": "Ads Paper",
                "id": 4,
                "pic": "/assets/img/psychographics/ico/psy_4.jpg",
                "label": "Print Ads"
                },
                {
                "value": "Ads EmergingMediaVehicles",
                "id": 3,
                "pic": "/assets/img/psychographics/ico/psy_3.jpg",
                "label": "Unconventional Ads"
                },
                {
                "value": "Ads TV",
                "id": 6,
                "pic": "/assets/img/psychographics/ico/psy_6.jpg",
                "label": "Tv Ads"
                }
                ],
                "label": "Advertising",
                "ico": "flaticon-marketing",
                "id": "Adv Strategy"
                },
                {
                "values": [
                {
                "value": "Casual gamers",
                "id": 51,
                "label": "Casual Gamers"
                },
                {
                "value": "Free time gamers",
                "id": 37,
                "label": "Social Gamer"
                },
                {
                "value": "Hardcore gamers",
                "id": 80,
                "label": "Hardcore Gamers"
                }
                ],
                "label": "Gaming",
                "ico": "",
                "id": "general-gamers-segments",
                "pic": ""
                },
                {
                "values": [
                {
                "value": "Background beats",
                "id": 10,
                "label": "Background Beats"
                },
                {
                "value": "Musicians",
                "id": 56,
                "pic": "/assets/img/psychographics/ico/psy_56.jpg",
                "label": "Musicians"
                },
                {
                "value": "Radio listeners",
                "id": 71,
                "pic": "/assets/img/psychographics/ico/psy_71.jpg",
                "label": "Web Radio Listeners"
                },
                {
                "value": "Dancers",
                "id": 21,
                "pic": "/assets/img/psychographics/ico/psy_21.jpg",
                "label": "Dancers"
                },
                {
                "value": "Sophisticated listeners",
                "id": 61,
                "pic": "/assets/img/psychographics/ico/psy_61.jpg",
                "label": "Sophisticated Listeners"
                },
                {
                "value": "Metalheads",
                "id": 49,
                "pic": "/assets/img/psychographics/ico/psy_49.jpg",
                "label": "Metalheads"
                },
                {
                "value": "Signature soundtrack",
                "id": 75,
                "pic": "/assets/img/psychographics/ico/psy_75.jpg",
                "label": "Signature Soundtrack"
                }
                ],
                "label": "Music",
                "ico": "",
                "id": "music-attitude-segments",
                "pic": ""
                },
                {
                "values": [
                {
                "value": "Techno Gamers",
                "label": "Techno Gamers",
                "id": 85
                },
                {
                "value": "Tech Splorers",
                "id": 83,
                "label": "Tech-Splorers"
                },
                {
                "value": "Techno Phobes",
                "label": "Techno-Phobes",
                "id": 86
                },
                {
                "value": "Mobile App Happy",
                "id": 50,
                "label": "Mobile App-Happy"
                }
                ],
                "label": "Tech and Mobile",
                "ico": "",
                "id": "tech",
                "pic": ""
                }
                ],
                "label": "Lifestyles",
                "ico": "",
                "id": "lifestyiles-cy",
                "pic": ""
                }
                ]));
        });
        
        await psychographicController.getPsychographics(request, response);

        psychographicController.handle(request, response, function() {
            done();
        });
    });

    it("Label Lifestyles and id", async function() {
        var response = http_mocks.createResponse({eventEmitter: require('events').EventEmitter});
        var request = http_mocks.createRequest({
            method: 'GET',
            url: '/psychographics',
            query : {
                "label" : "Lifestyles",
                "id" : "lifestyiles-cy",
                "operator" : "and"
            }
        });

        response.on("end", function() {
            assert.equal(response._getData(), JSON.stringify([
                {
                "values": [
                {
                "values": [
                {
                "value": "Ads web",
                "id": 7,
                "label": "Online Ads"
                },
                {
                "value": "Ads Road",
                "id": 5,
                "label": "Outdoor Ads"
                },
                {
                "value": "Ads Paper",
                "id": 4,
                "pic": "/assets/img/psychographics/ico/psy_4.jpg",
                "label": "Print Ads"
                },
                {
                "value": "Ads EmergingMediaVehicles",
                "id": 3,
                "pic": "/assets/img/psychographics/ico/psy_3.jpg",
                "label": "Unconventional Ads"
                },
                {
                "value": "Ads TV",
                "id": 6,
                "pic": "/assets/img/psychographics/ico/psy_6.jpg",
                "label": "Tv Ads"
                }
                ],
                "label": "Advertising",
                "ico": "flaticon-marketing",
                "id": "Adv Strategy"
                },
                {
                "values": [
                {
                "value": "Casual gamers",
                "id": 51,
                "label": "Casual Gamers"
                },
                {
                "value": "Free time gamers",
                "id": 37,
                "label": "Social Gamer"
                },
                {
                "value": "Hardcore gamers",
                "id": 80,
                "label": "Hardcore Gamers"
                }
                ],
                "label": "Gaming",
                "ico": "",
                "id": "general-gamers-segments",
                "pic": ""
                },
                {
                "values": [
                {
                "value": "Background beats",
                "id": 10,
                "label": "Background Beats"
                },
                {
                "value": "Musicians",
                "id": 56,
                "pic": "/assets/img/psychographics/ico/psy_56.jpg",
                "label": "Musicians"
                },
                {
                "value": "Radio listeners",
                "id": 71,
                "pic": "/assets/img/psychographics/ico/psy_71.jpg",
                "label": "Web Radio Listeners"
                },
                {
                "value": "Dancers",
                "id": 21,
                "pic": "/assets/img/psychographics/ico/psy_21.jpg",
                "label": "Dancers"
                },
                {
                "value": "Sophisticated listeners",
                "id": 61,
                "pic": "/assets/img/psychographics/ico/psy_61.jpg",
                "label": "Sophisticated Listeners"
                },
                {
                "value": "Metalheads",
                "id": 49,
                "pic": "/assets/img/psychographics/ico/psy_49.jpg",
                "label": "Metalheads"
                },
                {
                "value": "Signature soundtrack",
                "id": 75,
                "pic": "/assets/img/psychographics/ico/psy_75.jpg",
                "label": "Signature Soundtrack"
                }
                ],
                "label": "Music",
                "ico": "",
                "id": "music-attitude-segments",
                "pic": ""
                },
                {
                "values": [
                {
                "value": "Techno Gamers",
                "label": "Techno Gamers",
                "id": 85
                },
                {
                "value": "Tech Splorers",
                "id": 83,
                "label": "Tech-Splorers"
                },
                {
                "value": "Techno Phobes",
                "label": "Techno-Phobes",
                "id": 86
                },
                {
                "value": "Mobile App Happy",
                "id": 50,
                "label": "Mobile App-Happy"
                }
                ],
                "label": "Tech and Mobile",
                "ico": "",
                "id": "tech",
                "pic": ""
                }
                ],
                "label": "Lifestyles",
                "ico": "",
                "id": "lifestyiles-cy",
                "pic": ""
                }
                ]));
        });
        
        await psychographicController.getPsychographics(request, response);

        psychographicController.handle(request, response, function() {
            done();
        });
    });

    it("Label Lifestyles and id missing operator", async function() {
        var response = http_mocks.createResponse({eventEmitter: require('events').EventEmitter});
        var request = http_mocks.createRequest({
            method: 'GET',
            url: '/psychographics',
            query : {
                "label" : "Lifestyles",
                "id" : "lifestyiles-cy"
            }
        });

        response.on("end", function() {
            assert.equal(response._getData(), JSON.stringify({
                "message": "Wrong Parameters"
                }));
        });
        
        await psychographicController.checkParamsPsychographics(request, response);

        psychographicController.handle(request, response, function() {
            done();
        });
    });

    it("Label Lifestyles and id missing operator and with fixedLevel", async function() {
        var response = http_mocks.createResponse({eventEmitter: require('events').EventEmitter});
        var request = http_mocks.createRequest({
            method: 'GET',
            url: '/psychographics',
            query : {
                "label" : "Lifestyles",
                "id" : "lifestyiles-cy",
                "fixedLevel" : 3
            }
        });

        response.on("end", function() {
            assert.equal(response._getData(), JSON.stringify({
                "message": "Wrong Parameters"
                }));
        });
        
        await psychographicController.checkParamsPsychographics(request, response);

        psychographicController.handle(request, response, function() {
            done();
        });
    });

    it("Label Lifestyles and id empty response", async function() {
        var response = http_mocks.createResponse({eventEmitter: require('events').EventEmitter});
        var request = http_mocks.createRequest({
            method: 'GET',
            url: '/psychographics',
            query : {
                "label" : "Lifestyles",
                "id" : "testFake",
                "operator" : "and"
            }
        });

        response.on("end", function() {
            assert.equal(response._getData(), JSON.stringify([]));
        });
        
        await psychographicController.getPsychographics(request, response);

        psychographicController.handle(request, response, function() {
            done();
        });
    });
});

describe('psychographicsFixedLevel test', function() {
    it("Wrong Parameters", async function() {
        var response = http_mocks.createResponse({eventEmitter: require('events').EventEmitter});
        var request = http_mocks.createRequest({
            method: 'GET',
            url: '/fixedPsychographics',
            query : {
                "customField" : "Lifestyles",
            }
        });

        response.on("end", function() {
            assert.equal(JSON.stringify(response._getData()), JSON.stringify({
                "message": "Wrong Parameters"
                }));
        });
        
        await psychographicController.checkFields(request, response);

        psychographicController.handle(request, response, function() {
            done();
        });
    });

    it("Missing Parameter fixedLevel", async function() {
        var response = http_mocks.createResponse({eventEmitter: require('events').EventEmitter});
        var request = http_mocks.createRequest({
            method: 'GET',
            url: '/fixedPsychographics',
            query : {
                "label" : "Lifestyles"
            }
        });

        response.on("end", function() {
            assert.equal(response._getData(), JSON.stringify({
                "message": "Wrong Parameters"
                }));
        });
        
        await psychographicController.checkParamsPsychographicsFixedLevel(request, response);

        psychographicController.handle(request, response, function() {
            done();
        });
    });

    it("Label Lifestyles", async function() {
        var response = http_mocks.createResponse({eventEmitter: require('events').EventEmitter});
        var request = http_mocks.createRequest({
            method: 'GET',
            url: '/fixedPsychographics',
            query : {
                "label" : "Lifestyles",
                "fixedLevel" : 2
            }
        });

        response.on("end", function() {
            assert.equal(response._getData(), JSON.stringify([
                {
                "values": [
                {
                "values": [
                {
                "value": "Ads web",
                "id": 7,
                "label": "Online Ads"
                },
                {
                "value": "Ads Road",
                "id": 5,
                "label": "Outdoor Ads"
                },
                {
                "value": "Ads Paper",
                "id": 4,
                "pic": "/assets/img/psychographics/ico/psy_4.jpg",
                "label": "Print Ads"
                },
                {
                "value": "Ads EmergingMediaVehicles",
                "id": 3,
                "pic": "/assets/img/psychographics/ico/psy_3.jpg",
                "label": "Unconventional Ads"
                },
                {
                "value": "Ads TV",
                "id": 6,
                "pic": "/assets/img/psychographics/ico/psy_6.jpg",
                "label": "Tv Ads"
                }
                ],
                "label": "Advertising",
                "ico": "flaticon-marketing",
                "id": "Adv Strategy"
                },
                {
                "values": [
                {
                "value": "Casual gamers",
                "id": 51,
                "label": "Casual Gamers"
                },
                {
                "value": "Free time gamers",
                "id": 37,
                "label": "Social Gamer"
                },
                {
                "value": "Hardcore gamers",
                "id": 80,
                "label": "Hardcore Gamers"
                }
                ],
                "label": "Gaming",
                "ico": "",
                "id": "general-gamers-segments",
                "pic": ""
                },
                {
                "values": [
                {
                "value": "Background beats",
                "id": 10,
                "label": "Background Beats"
                },
                {
                "value": "Musicians",
                "id": 56,
                "pic": "/assets/img/psychographics/ico/psy_56.jpg",
                "label": "Musicians"
                },
                {
                "value": "Radio listeners",
                "id": 71,
                "pic": "/assets/img/psychographics/ico/psy_71.jpg",
                "label": "Web Radio Listeners"
                },
                {
                "value": "Dancers",
                "id": 21,
                "pic": "/assets/img/psychographics/ico/psy_21.jpg",
                "label": "Dancers"
                },
                {
                "value": "Sophisticated listeners",
                "id": 61,
                "pic": "/assets/img/psychographics/ico/psy_61.jpg",
                "label": "Sophisticated Listeners"
                },
                {
                "value": "Metalheads",
                "id": 49,
                "pic": "/assets/img/psychographics/ico/psy_49.jpg",
                "label": "Metalheads"
                },
                {
                "value": "Signature soundtrack",
                "id": 75,
                "pic": "/assets/img/psychographics/ico/psy_75.jpg",
                "label": "Signature Soundtrack"
                }
                ],
                "label": "Music",
                "ico": "",
                "id": "music-attitude-segments",
                "pic": ""
                },
                {
                "values": [
                {
                "value": "Techno Gamers",
                "label": "Techno Gamers",
                "id": 85
                },
                {
                "value": "Tech Splorers",
                "id": 83,
                "label": "Tech-Splorers"
                },
                {
                "value": "Techno Phobes",
                "label": "Techno-Phobes",
                "id": 86
                },
                {
                "value": "Mobile App Happy",
                "id": 50,
                "label": "Mobile App-Happy"
                }
                ],
                "label": "Tech and Mobile",
                "ico": "",
                "id": "tech",
                "pic": ""
                }
                ],
                "label": "Lifestyles",
                "ico": "",
                "id": "lifestyiles-cy",
                "pic": ""
                }
                ]));
        });
        
        await psychographicController.getPsychographicsFixedLevel(request, response);

        psychographicController.handle(request, response, function() {
            done();
        });
    });

    it("Missing operator", async function() {
        var response = http_mocks.createResponse({eventEmitter: require('events').EventEmitter});
        var request = http_mocks.createRequest({
            method: 'GET',
            url: '/fixedPsychographics',
            query : {
                "label" : "Lifestyles",
                "id" : "lifestyiles-cy",
                "fixedLevel" : 3
            }
        });

        response.on("end", function() {
            assert.equal(response._getData(), JSON.stringify({
                "message": "Wrong Parameters"
                }));
        });
        
        await psychographicController.checkParamsPsychographicsFixedLevel(request, response);

        psychographicController.handle(request, response, function() {
            done();
        });
    });

    it("Lifestyles with operator and", async function() {
        var response = http_mocks.createResponse({eventEmitter: require('events').EventEmitter});
        var request = http_mocks.createRequest({
            method: 'GET',
            url: '/fixedPsychographics',
            query : {
                "label" : "Lifestyles",
                "id" : "lifestyiles-cy",
                "fixedLevel" : 2,
                "operator" : "and"
            }
        });

        response.on("end", function() {
            assert.equal(response._getData(), JSON.stringify([
                {
                "values": [
                {
                "values": [
                {
                "value": "Ads web",
                "id": 7,
                "label": "Online Ads"
                },
                {
                "value": "Ads Road",
                "id": 5,
                "label": "Outdoor Ads"
                },
                {
                "value": "Ads Paper",
                "id": 4,
                "pic": "/assets/img/psychographics/ico/psy_4.jpg",
                "label": "Print Ads"
                },
                {
                "value": "Ads EmergingMediaVehicles",
                "id": 3,
                "pic": "/assets/img/psychographics/ico/psy_3.jpg",
                "label": "Unconventional Ads"
                },
                {
                "value": "Ads TV",
                "id": 6,
                "pic": "/assets/img/psychographics/ico/psy_6.jpg",
                "label": "Tv Ads"
                }
                ],
                "label": "Advertising",
                "ico": "flaticon-marketing",
                "id": "Adv Strategy"
                },
                {
                "values": [
                {
                "value": "Casual gamers",
                "id": 51,
                "label": "Casual Gamers"
                },
                {
                "value": "Free time gamers",
                "id": 37,
                "label": "Social Gamer"
                },
                {
                "value": "Hardcore gamers",
                "id": 80,
                "label": "Hardcore Gamers"
                }
                ],
                "label": "Gaming",
                "ico": "",
                "id": "general-gamers-segments",
                "pic": ""
                },
                {
                "values": [
                {
                "value": "Background beats",
                "id": 10,
                "label": "Background Beats"
                },
                {
                "value": "Musicians",
                "id": 56,
                "pic": "/assets/img/psychographics/ico/psy_56.jpg",
                "label": "Musicians"
                },
                {
                "value": "Radio listeners",
                "id": 71,
                "pic": "/assets/img/psychographics/ico/psy_71.jpg",
                "label": "Web Radio Listeners"
                },
                {
                "value": "Dancers",
                "id": 21,
                "pic": "/assets/img/psychographics/ico/psy_21.jpg",
                "label": "Dancers"
                },
                {
                "value": "Sophisticated listeners",
                "id": 61,
                "pic": "/assets/img/psychographics/ico/psy_61.jpg",
                "label": "Sophisticated Listeners"
                },
                {
                "value": "Metalheads",
                "id": 49,
                "pic": "/assets/img/psychographics/ico/psy_49.jpg",
                "label": "Metalheads"
                },
                {
                "value": "Signature soundtrack",
                "id": 75,
                "pic": "/assets/img/psychographics/ico/psy_75.jpg",
                "label": "Signature Soundtrack"
                }
                ],
                "label": "Music",
                "ico": "",
                "id": "music-attitude-segments",
                "pic": ""
                },
                {
                "values": [
                {
                "value": "Techno Gamers",
                "label": "Techno Gamers",
                "id": 85
                },
                {
                "value": "Tech Splorers",
                "id": 83,
                "label": "Tech-Splorers"
                },
                {
                "value": "Techno Phobes",
                "label": "Techno-Phobes",
                "id": 86
                },
                {
                "value": "Mobile App Happy",
                "id": 50,
                "label": "Mobile App-Happy"
                }
                ],
                "label": "Tech and Mobile",
                "ico": "",
                "id": "tech",
                "pic": ""
                }
                ],
                "label": "Lifestyles",
                "ico": "",
                "id": "lifestyiles-cy",
                "pic": ""
                }
                ]));
        });
        
        await psychographicController.getPsychographicsFixedLevel(request, response);

        psychographicController.handle(request, response, function() {
            done();
        });
    });

    it("Empty Response", async function() {
        var response = http_mocks.createResponse({eventEmitter: require('events').EventEmitter});
        var request = http_mocks.createRequest({
            method: 'GET',
            url: '/fixedPsychographics',
            query : {
                "label" : "Lifestyles",
                "fixedLevel" : 3
            }
        });

        response.on("end", function() {
            assert.equal(response._getData(), JSON.stringify([]));
        });
        
        await psychographicController.getPsychographicsFixedLevel(request, response);

        psychographicController.handle(request, response, function() {
            done();
        });
    });

    it("Empty Response with operator", async function() {
        var response = http_mocks.createResponse({eventEmitter: require('events').EventEmitter});
        var request = http_mocks.createRequest({
            method: 'GET',
            url: '/fixedPsychographics',
            query : {
                "label" : "Lifestyles",
                "id" : "lifestyiles-cy",
                "fixedLevel" : 3,
                "operator" : "and"
            }
        });

        response.on("end", function() {
            assert.equal(response._getData(), JSON.stringify([]));
        });
        
        await psychographicController.getPsychographicsFixedLevel(request, response);

        psychographicController.handle(request, response, function() {
            done();
        });
    });
});
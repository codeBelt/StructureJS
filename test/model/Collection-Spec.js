var movies = [
    {
        "id": "770678819",
        "title": "Man of Steel",
        "year": "2013",
        "mpaaRating": "PG-13",
        "runtime": "148",
        "releaseDates": { "theater": "2013-06-14" },
        "ratings": {
            "criticsRating": "Rotten",
            "criticsScore": "56",
            "audienceRating": "Upright",
            "audienceScore": "82"
        },
        "synopsis": "A young boy learns that he has extraordinary powers and is not of this Earth. As a young man, he journeys to discover where he came from and what he was sent here to do. But the hero in him must emerge if he is to save the world from annihilation and become the symbol of hope for all mankind. -- (C) Warner Bros",
        "posters": {
            "thumbnail": "http://content6.flixster.com/movie/11/17/13/11171304_mob.jpg",
            "profile": "http://content6.flixster.com/movie/11/17/13/11171304_pro.jpg",
            "detailed": "http://content6.flixster.com/movie/11/17/13/11171304_det.jpg",
            "original": "http://content6.flixster.com/movie/11/17/13/11171304_ori.jpg"
        },
        "abridgedCast": [
            {
                "name": "Henry Cavill",
                "id": "341817917",
                "characters": [
                    "Clark Kent/Kal-El"
                ]
            },
            {
                "name": "Amy Adams",
                "id": "162653029",
                "characters": [
                    "Lois Lane"
                ]
            },
            {
                "name": "Michael Shannon",
                "id": "368451324",
                "characters": [
                    "General Zod"
                ]
            },
            {
                "name": "Diane Lane",
                "id": "162652926",
                "characters": [
                    "Martha Kent"
                ]
            },
            {
                "name": "Russell Crowe",
                "id": "162652569",
                "characters": [
                    "Jor-El"
                ]
            }
        ]
    },
    {
        "id": "771238418",
        "title": "Monsters University",
        "year": "2013",
        "mpaaRating": "G",
        "runtime": "95",
        "releaseDates": {
            "theater": "2013-06-21"
        },
        "ratings": {
            "criticsRating": "Certified Fresh",
            "criticsScore": "77",
            "audienceRating": "Upright",
            "audienceScore": "88"
        },
        "synopsis": "Mike Wazowski and James P. Sullivan are an inseparable pair, but that wasn't always the case. From the moment these two mismatched monsters met they couldn't stand each other. \"Monsters University\" unlocks the door to how Mike and Sulley overcame their differences and became the best of friends. -- (C) Walt Disney",
        "posters": {
            "thumbnail": "http://content6.flixster.com/movie/11/16/99/11169964_mob.jpg",
            "profile": "http://content6.flixster.com/movie/11/16/99/11169964_pro.jpg",
            "detailed": "http://content6.flixster.com/movie/11/16/99/11169964_det.jpg",
            "original": "http://content6.flixster.com/movie/11/16/99/11169964_ori.jpg"
        },
        "abridgedCast": [
            {
                "name": "Billy Crystal",
                "id": "162655707",
                "characters": [
                    "Mike"
                ]
            },
            {
                "name": "John Goodman",
                "id": "162655706",
                "characters": [
                    "Sullivan"
                ]
            },
            {
                "name": "Steve Buscemi",
                "id": "162652875",
                "characters": [
                    "Randy"
                ]
            },
            {
                "name": "Helen Mirren",
                "id": "162662871",
                "characters": [
                    "Dean Hardscrabble"
                ]
            },
            {
                "name": "Peter Sohn",
                "id": "770673194",
                "characters": [
                    "Squishy"
                ]
            }
        ]
    }
];

var Collection = require('../../js/model/Collection');

describe("Collection", function() {
    var collection = new Collection();

    beforeEach(function () {
        collection.add(movies);
    });

    afterEach(function () {
        collection.clear();
    });

    it("add collection.length === 2", function() {
        expect(collection.length).toEqual(2);
    });

    it("clear collection.length === 0", function() {
        collection.clear();
        expect(collection.length).toEqual(0);
    });

    it("clone", function() {
        expect(collection.clone().models).toEqual(collection.models);
    });

    it("filter", function() {
        var filterFunction = function(model){
            return model.runtime < 100;
        };
        var filteredArray = collection.filter(filterFunction);

        expect(filteredArray[0]).toEqual(collection.models[1]);
    });

    //it("findBy", function() {
    //    expect(collection.findBy('148')).toEqual(collection.models[0]);
    //});

    it("fromJSON collection.length === 2", function() {
        var moviesStringify = JSON.stringify(movies);
        collection.clear();
        collection.fromJSON(moviesStringify);

        expect(collection.length).toEqual(2);
    });

    it("get", function() {
        expect(collection.get(1)).toEqual(collection.models[1]);
    });

    it("has", function() {
        var model = collection.models[1];
        expect(collection.has(model)).toBeTruthy();
    });

    it("indexOf", function() {
        var model = collection.models[1];
        expect(collection.indexOf(model)).toEqual(1);
    });

    it("remove", function() {
        var model = collection.models[0];
        collection.remove(model);

        expect(collection.length).toEqual(1);
    });

    //it("reverse", function() {
    //    expect(collection.reverse()).toEqual(1);
    //});

    //it("sort", function() {
    //    expect(collection.sort(1)).toEqual(collection.models[1]);
    //});

    //it("sortOn", function() {
    //    expect(collection.sortOn(1)).toEqual(collection.models[1]);
    //});

    //it("toJSON", function() {
    //    expect(collection.toJSON(1)).toEqual(collection.models[1]);
    //});

    //it("toJSONString", function() {
    //    expect(collection.toJSONString(1)).toEqual(collection.models[1]);
    //});


    it("getQualifiedClassName === Collection", function() {
        expect(collection.getQualifiedClassName()).toEqual('Collection');
    });

    it("toJSONString match", function() {
        expect(JSON.stringify(collection.models)).toEqual(collection.toJSONString());
    });
});
//http://net.tutsplus.com/tutorials/javascript-ajax/testing-your-javascript-with-jasmine/

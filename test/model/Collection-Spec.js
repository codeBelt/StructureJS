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

    it("collection.length === 2", function() {
        expect(collection.length).toEqual(2);
    });

    it("collection.length === 0", function() {
        collection.clear();
        expect(collection.length).toEqual(0);
    });

    it("getQualifiedClassName === Collection", function() {
        expect(collection.getQualifiedClassName()).toEqual('Collection');
    });

    it("toJSONString match", function() {
        expect(JSON.stringify(collection.models)).toEqual(collection.toJSONString());
    });
});
//http://net.tutsplus.com/tutorials/javascript-ajax/testing-your-javascript-with-jasmine/


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
    }
];


var ValueObject = require('../../js/model/ValueObject');
var MovieVO = require('./valueobjects/MovieVO');

describe("ValueObject", function() {

    var movieVO = new MovieVO(movies[0]);

    it("getQualifiedClassName", function() {
        expect(movieVO.getQualifiedClassName()).toEqual('MovieVO');
    });

    it("movie name", function() {
        expect(movieVO.title).toEqual('Man of Steel');
    });

    it("Is PosterVO", function() {
        expect(movieVO.posters.getQualifiedClassName()).toEqual('PosterVO');
    });

    it("Is CastVO", function() {
        expect(movieVO.abridgedCast[1].getQualifiedClassName()).toEqual('CastVO');
    });

});
//http://net.tutsplus.com/tutorials/javascript-ajax/testing-your-javascript-with-jasmine/
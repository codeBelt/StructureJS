// Load the file that exports the functionality to test
jest.dontMock('../../js/model/Collection');  // Don't create mock functions
jest.dontMock('../../js/event/EventDispatcher');
jest.dontMock('../../js/event/BaseEvent');
jest.dontMock('../../js/util/Util');

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
        "id": "771352237",
        "title": "Penguins 3D",
        "year": "2012",
        "mpaaRating": "PG-13",
        "runtime": "78",
        "releaseDates": {
            "theater": "2013-05-24"
        },
        "ratings": {
            "criticsScore": -1,
            "audienceRating": "Spilled",
            "audienceScore": "57"
        },
        "synopsis": "\"Penguins 3D,\" which comes in 40- and 20-minute versions, 3D and 2D, 15-perf./70-mm, and digital in 4K and 2K, will be available from nWave exclusively, for exhibition at IMAX theatres, REALD and digital 3D giant screen cinemas. The film depicts the fortunes of a young male King Penguin, who returns to the place where he was born and raised. Known as Penguin City, this sub-Antarctic island is home to albatrosses, leopard seals and elephant seals-and six million penguins! Somehow our hero must earn his place among the inhabitants and fulfill his destiny by finding a mate and raising a family. (c) nWave Pictures Distribution",
        "posters": {
            "thumbnail": "http://content9.flixster.com/movie/11/17/13/11171315_mob.jpg",
            "profile": "http://content9.flixster.com/movie/11/17/13/11171315_pro.jpg",
            "detailed": "http://content9.flixster.com/movie/11/17/13/11171315_det.jpg",
            "original": "http://content9.flixster.com/movie/11/17/13/11171315_ori.jpg"
        },
        "abridgedCast": [
            {
                "name": "Tim Allen",
                "id": "162655909"
            },
            {
                "name": "David Attenborough",
                "id": "335719288"
            }
        ]
    }
];

var Collection = require('../../js/model/Collection');

describe('Collection', function() {
    var collection = new Collection();

    beforeEach(function () {
        collection.add(movies);
    });

    afterEach(function () {
        collection.clear();
    });

    it('add collection.length === 2', function() {
        expect(collection.length).toEqual(2);
    });

    it('clear collection.length === 0', function() {
        collection.clear();
        expect(collection.length).toEqual(0);
    });

    it('clone', function() {
        expect(collection.clone().models).toEqual(collection.models);
    });

    it('filter', function() {
        var filterFunction = function(model){
            return model.runtime < 100;
        };
        var filteredArray = collection.filter(filterFunction);

        expect(filteredArray[0]).toEqual(collection.models[1]);
    });

    it('findBy', function() {
        var foundModels = collection.findBy('2012');
        // TODO: get working
        //expect(foundModels[0]).toEqual(collection.models[1]);

        foundModels = collection.findBy({mpaaRating: 'PG-13'});
        expect(foundModels.length).toEqual(2);

        foundModels = collection.findBy({year: '2013', mpaaRating: 'PG-13'});
        expect(foundModels[0]).toEqual(collection.models[0]);

        foundModels = collection.findBy(['2013', 'PG-13', 'Penguins 3D']);
        expect(foundModels.length).toEqual(2);

        foundModels = collection.findBy([{title: 'Penguins 3D'}, {title: 'Man of Steel'}]);
        expect(foundModels.length).toEqual(2);
    });

    it('fromJSON collection.length === 2', function() {
        var moviesStringify = JSON.stringify(movies);
        collection.clear();
        collection.fromJSON(moviesStringify);

        expect(collection.length).toEqual(2);
    });

    it('get', function() {
        expect(collection.get(1)).toEqual(collection.models[1]);
    });

    it('has', function() {
        var model = collection.models[1];
        expect(collection.has(model)).toBeTruthy();
    });

    it('indexOf', function() {
        var model = collection.models[1];
        expect(collection.indexOf(model)).toEqual(1);
    });

    it('remove', function() {
        var model = collection.models[0];
        collection.remove(model);

        expect(collection.length).toEqual(1);
    });

    it('reverse', function() {
        collection.reverse();
        expect(collection.models[0].title).toEqual('Penguins 3D');
    });

    it('sort', function() {
        var sortByDate = function(a, b){
            return a.runtime - b.runtime;
        };

        collection.sort(sortByDate);

        expect(collection.models[0].title).toEqual('Penguins 3D');
    });

    it('sortOn', function() {
        collection.sortOn('title', false);

        expect(collection.models[0].title).toEqual('Penguins 3D');
    });

    it('toJSON', function() {
        // TODO: get working
        //expect(collection.models).toEqual(collection.toJSON());
    });

    it('toJSONString', function() {
        expect(JSON.stringify(collection.models)).toEqual(collection.toJSONString());
    });

    it('getQualifiedClassName === Collection', function() {
        // TODO: get working
        //expect(collection.getQualifiedClassName()).toEqual('Collection');
    });
});
//http://net.tutsplus.com/tutorials/javascript-ajax/testing-your-javascript-with-jasmine/

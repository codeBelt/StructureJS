define(function (require, exports, module) {

    var people = [
        {
            name: "krista",
            age: 25,
            house: {
                address: '3 Street',
                numOfBathrooms: 1,
                numOfBedRooms: 1
            },
            cars: [
                { make: 'Tesla', model: 'Model S', year: 2014 },
                { make: 'Ford', model: 'Escort', year: 2000 }
            ]
        },
        {
            name: "Robert",
            age: 33,
            house: {
                address: '1 Street',
                numOfBathrooms: 2,
                numOfBedRooms: 4
            }
        },
        {
            name: "Robert",
            age: 37,
            house: {
                address: '1 Street',
                numOfBathrooms: 4,
                numOfBedRooms: 4
            }
        },
        {
            name: "Mario",
            house: {
                address: '3 Street',
                numOfBathrooms: 5,
                numOfBedRooms: 11
            }
        },
        {
            name: "Joe",
            age: 25
        }
    ];

    var Collection = require('model/Collection');

    describe("Collection", function() {

        var vo = new Collection();

        it("getQualifiedClassName", function() {
            expect(vo.getQualifiedClassName()).toEqual('Collection');
        });

        it("add", function() {
            vo.add(people);

            expect(JSON.stringify(vo)).toEqual(vo.toJSONString());
        });

    });
});
//http://net.tutsplus.com/tutorials/javascript-ajax/testing-your-javascript-with-jasmine/


define(function (require, exports, module) {

    var Route = require('model/Route');

    describe("Route", function() {

        var route;

        it("match()", function() {
            route = new Route('/house/', function(){}, this);
            expect(route.match('about')).toBeNull();

            route = new Route('/games/{gameName}/:level:/', function(){}, this);
            expect(route.match('games/asteroids')).not.toBeNull();
            expect(route.match('/games/asteroids/')).not.toBeNull();
            expect(route.match('/games/asteroids/2')).not.toBeNull();
            expect(route.match('/games/asteroids/2/')).not.toBeNull();
        });
    });
});
//http://net.tutsplus.com/tutorials/javascript-ajax/testing-your-javascript-with-jasmine/
define(function (require, exports, module) {

   /* var Route = require('model/Route');

    describe("Route", function() {

        var route;

        it("match()", function() {
            route = new Route('', function(){}, this);
            expect(route.match('')).not.toBeNull();
            expect(route.match('/')).not.toBeNull();


            route = new Route('/', function(){}, this);
            expect(route.match('')).not.toBeNull();
            expect(route.match('/')).not.toBeNull();


            route = new Route('/house/', function(){}, this);
            expect(route.match('house')).not.toBeNull();
            expect(route.match('house/another')).toBeNull();
//            expect(route.match('house/another/?one=1&two=2&three=3')).not.toBeNull();
//            expect(route.match('house/another?one=1&two=2&three=3')).not.toBeNull();


            route = new Route('/games/{gameName}/:level:/', function(){}, this);
            expect(route.match('games/asteroids')).not.toBeNull();
            expect(route.match('/games/asteroids/')).not.toBeNull();
            expect(route.match('/games/asteroids/2')).not.toBeNull();
            expect(route.match('/games/asteroids/2/')).not.toBeNull();


            route = new Route('/product/{productName}/', function(){}, this);
            expect(route.match('/product/shoes/')).not.toBeNull();
            expect(route.match('/product/jackets/')).not.toBeNull();
            expect(route.match('/product/')).toBeNull();


            route = new Route('*', function(){}, this);
            expect(route.match('/anything/')).not.toBeNull();
            expect(route.match('/matches/any/hash/url/')).not.toBeNull();
            expect(route.match('/really/it/matches/any/and/all/hash/urls/')).not.toBeNull();


            route = new Route('/about*//*', function(){}, this);
//            expect(route.match('about')).not.toBeNull();
            expect(route.match('/about/')).not.toBeNull();
            expect(route.match('/about/any/hash/url/')).not.toBeNull();
            expect(route.match('/about/it/matches/any/and/all/hash/urls/')).not.toBeNull();


            route = new Route('?', function(){}, this);
            expect(route.match('/?one=1&two=2&three=3')).not.toBeNull();
            expect(route.match('?one=1&two=2&three=3')).not.toBeNull();


            route = new Route('/{category}/blog/', function(){}, this);
            expect(route.match('/product/blog/')).not.toBeNull();
            expect(route.match('/blog/blog/')).not.toBeNull();
            expect(route.match('/car/blog/')).not.toBeNull();
            expect(route.match('/blog/')).toBeNull();
        });
    });*/
});
//http://net.tutsplus.com/tutorials/javascript-ajax/testing-your-javascript-with-jasmine/
// Load the file that exports the functionality to test
jest.dontMock('../../js/model/Route');  // Don't create mock functions

var Route = require('../../js/model/Route');

describe("Route", function() {

    var route;

    it("home", function() {
        route = new Route('', function(){}, this);
        expect(route.match('')).not.toBeNull();
        expect(route.match('/')).not.toBeNull();

        route = new Route('/', function(){}, this);
        expect(route.match('')).not.toBeNull();
        expect(route.match('/')).not.toBeNull();
        expect(route.match('/?one=1&two=2&three=3')).not.toBeNull();
        expect(route.match('?one=1&two=2&three=3')).not.toBeNull();
    });

    it("house", function() {
        route = new Route('/house/', function(){}, this);
        expect(route.match('house')).not.toBeNull();
        expect(route.match('house/another')).toBeNull();
        expect(route.match('house?one=1&two=2&three=3')).not.toBeNull();
        expect(route.match('house/?one=1&two=2&three=3')).not.toBeNull();
        expect(route.match('')).toBeNull();
    });

    it("games", function() {
        route = new Route('/games/{gameName}/:level:/', function(){}, this);
        expect(route.match('games/asteroids')).not.toBeNull();
        expect(route.match('/games/asteroids/')).not.toBeNull();
        expect(route.match('/games/asteroids/2')).not.toBeNull();
        expect(route.match('/games/asteroids/2/')).not.toBeNull();
        expect(route.match('')).toBeNull();
    });

    it("product", function() {
        route = new Route('/product/{productName}/', function(){}, this);
        expect(route.match('/product/shoes/')).not.toBeNull();
        expect(route.match('/product/jackets/')).not.toBeNull();
        expect(route.match('/product/')).toBeNull();
        expect(route.match('')).toBeNull();
    });

    it("anything", function() {
        route = new Route('*', function(){}, this);
        expect(route.match('/anything/')).not.toBeNull();
        expect(route.match('/matches/any/hash/url/')).not.toBeNull();
        expect(route.match('/really/it/matches/any/and/all/hash/urls/')).not.toBeNull();
        expect(route.match('')).not.toBeNull();
    });

    it("about", function() {
        route = new Route('/about/*', function(){}, this);
        expect(route.match('about')).not.toBeNull();
        expect(route.match('/about/')).not.toBeNull();
        expect(route.match('/about/any/hash/url/')).not.toBeNull();
        expect(route.match('/about/it/matches/any/and/all/hash/urls/')).not.toBeNull();
        expect(route.match('')).toBeNull();
    });

    it("{}", function() {
        route = new Route('/{category}/blog/', function(){}, this);
        expect(route.match('/product/blog/')).not.toBeNull();
        expect(route.match('/blog/blog/')).not.toBeNull();
        expect(route.match('/car/blog/')).not.toBeNull();
        expect(route.match('/blog/')).toBeNull();
        expect(route.match('')).toBeNull();
    });
});
//http://net.tutsplus.com/tutorials/javascript-ajax/testing-your-javascript-with-jasmine/

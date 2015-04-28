// Imports
var Extend = window.structurejs.Extend;
var Stage = window.structurejs.Stage;
var Router = window.structurejs.Router;

/**
 * TODO: YUIDoc_comment
 *
 * @class Main
 * @extends Stage
 * @constructor
 **/
var Main = (function () {

    var _super = Extend(Main, Stage);

    function Main() {
        _super.call(this);

    }

    /**
     * @overridden Main.create
     */
    Main.prototype.create = function () {
        _super.prototype.create.call(this);

        Router.add('', function(event) { console.log(event.routePattern, event); }, this);

        Router.add('/house/', function(event) { console.log(event.routePattern, event); }, this);

        Router.add('/games/{gameName}/:level:/', function(event) { console.log(event.routePattern, event); }, this);

        Router.add('/product/{productName}/', function(event) { console.log(event.routePattern, event); }, this);

        Router.add('*', function(event) { console.log(event.routePattern, event); }, this);

        Router.add('/about/*', function(event) { console.log(event.routePattern, event); }, this);

        //Router.add('?', function(event) { console.log(event.routePattern, event); }, this);

        Router.add('/{category}/blog/', function(event) { console.log(event.routePattern, event); }, this);

        Router.start();
    };

    return Main;
})();
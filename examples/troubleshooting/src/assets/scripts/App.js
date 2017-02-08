"use strict";
var CheckoutViewModel_1 = require("./models/CheckoutViewModel");
/**
 * Initial application setup. Runs once upon every page load.
 *
 * @class App
 * @constructor
 */
var App = (function () {
    function App() {
    }
    /**
     * Initializes the application and kicks off loading of prerequisites.
     *
     * @method init
     * @public
     */
    App.prototype.init = function () {
        // Create your views here
        var asdf = new CheckoutViewModel_1["default"]({ test: { id: -1 } }, { expand: false });
        console.log("CheckoutViewModel", asdf);
        console.log("!!!!!!! clone");
        var clone = asdf.clone();
        console.log("clone", clone);
    };
    return App;
}());
exports.__esModule = true;
exports["default"] = App;
//# sourceMappingURL=App.js.map
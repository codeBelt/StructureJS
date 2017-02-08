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
        // console.log(`CheckoutViewModel`, new CheckoutViewModel().pickHowOptions);
        new CheckoutViewModel_1["default"]().pickHowOptions;
    };
    return App;
}());
exports.__esModule = true;
exports["default"] = App;
//# sourceMappingURL=App.js.map
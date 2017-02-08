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
        var checkoutViewModel = new CheckoutViewModel_1["default"]({ test: { id: -1 } }, { expand: false });
        console.log("1", checkoutViewModel);
        checkoutViewModel = checkoutViewModel.clone();
        console.log("2", checkoutViewModel);
        checkoutViewModel = checkoutViewModel.clone();
        checkoutViewModel.update({ pick: { id: 'asdfasdfas' } });
        console.log("3", checkoutViewModel);
    };
    return App;
}());
exports.__esModule = true;
exports["default"] = App;
//# sourceMappingURL=App.js.map
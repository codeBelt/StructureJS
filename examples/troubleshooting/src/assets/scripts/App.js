"use strict";
var GuestViewModel_1 = require("./models/GuestViewModel");
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
        // let checkoutViewModel = new CheckoutViewModel({test: {id:-1}}, { expand: false });
        // console.log(`1`, checkoutViewModel);
        //
        // checkoutViewModel = <CheckoutViewModel>checkoutViewModel.clone();
        // console.log(`2`, checkoutViewModel);
        //
        // checkoutViewModel = <CheckoutViewModel>checkoutViewModel.clone();
        // checkoutViewModel.update({pick: {id: 'asdfasdfas'}});
        // console.log(`3`, checkoutViewModel);
        var guestViewModel = new GuestViewModel_1["default"]();
        guestViewModel.validate();
        console.log("guestViewModel", guestViewModel);
        console.log("clone", guestViewModel.clone());
    };
    return App;
}());
exports.__esModule = true;
exports["default"] = App;
//# sourceMappingURL=App.js.map
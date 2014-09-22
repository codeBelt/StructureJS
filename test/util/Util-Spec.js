define(function (require, exports, module) {

    var Util = require('util/Util');

    describe("Util", function() {
        //http://www.freeformatter.com/credit-card-number-generator-validator.html
        it("Util.toBoolean()", function() {
            expect(Util.toBoolean("true")).toBeTruthy();
            expect(Util.toBoolean("TRUE")).toBeTruthy();
            expect(Util.toBoolean("1")).toBeTruthy();
            expect(Util.toBoolean(1)).toBeTruthy();
            expect(Util.toBoolean("false")).toBeFalsy();
            expect(Util.toBoolean("FALSE")).toBeFalsy();
            expect(Util.toBoolean("0")).toBeFalsy();
            expect(Util.toBoolean(0)).toBeFalsy();
            expect(Util.toBoolean(null)).toBeFalsy();
            expect(Util.toBoolean(undefined)).toBeFalsy();
        });
    });
});
//http://net.tutsplus.com/tutorials/javascript-ajax/testing-your-javascript-with-jasmine/
define(function (require, exports, module) {

    var MerchantUtil = require('util/MerchantUtil');

    describe("MerchantUtil", function() {
        //http://www.freeformatter.com/credit-card-number-generator-validator.html
        it("isCreditCard()", function() {
            expect(MerchantUtil.isCreditCard("4556106734384949")).toBeTruthy();
            expect(MerchantUtil.isCreditCard("1234567890123456")).toBeFalsy();
        });

        it("encodeCreditCardNumber()", function() {
            expect(MerchantUtil.encodeCreditCardNumber("4556106734384949")).toEqual("************4949");
            expect(MerchantUtil.encodeCreditCardNumber("4556106734384949", 5, "x")).toEqual("xxxxxxxxxxx84949");
        });

        it("getCreditCardProvider()", function() {
            expect(MerchantUtil.getCreditCardProvider("1234567890123456")).toEqual("invalid");
            expect(MerchantUtil.getCreditCardProvider("4556106734384949")).toEqual("visa");
            expect(MerchantUtil.getCreditCardProvider("5428070016026573")).toEqual("mastercard");
            expect(MerchantUtil.getCreditCardProvider("344499834236852")).toEqual("amex");
            expect(MerchantUtil.getCreditCardProvider("30047198581956")).toEqual("diners");
            expect(MerchantUtil.getCreditCardProvider("6771593131817460")).toEqual("other");
        });

        it("isValidExpirationDate()", function() {
            expect(MerchantUtil.isValidExpirationDate(8, 2090)).toBeTruthy();
            expect(MerchantUtil.isValidExpirationDate(11, 2013)).toBeFalsy();
        });
    });
});
//http://net.tutsplus.com/tutorials/javascript-ajax/testing-your-javascript-with-jasmine/
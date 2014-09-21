define(function (require, exports, module) {

    var NumberUtil = require('util/NumberUtil');

    describe("NumberUtil", function() {
        it("centimeterToInch() 1 centimeter should be 0.3937 inches", function() {
            expect(NumberUtil.centimeterToInch(1)).toEqual(0.3937);
        });

        it("bytesToMegabytes() 100000 bytes should be 0.095367432 megabytes", function() {
            expect(Number(NumberUtil.bytesToMegabytes(100000).toFixed(9))).toEqual(0.095367432);
        });

        it("inchToCentimeter() 1 inch should be 2.54 centimeters", function() {
            expect(NumberUtil.inchToCentimeter(1)).toEqual(2.54);
        });

        it("feetToMeter() 1 foot should be 0.3048 meters", function() {
            expect(Number(NumberUtil.feetToMeter(1).toFixed(4))).toEqual(0.3048);
        });

        it("convertToHHMMSS() 33333 seconds should be 09:15:33", function() {
            expect(NumberUtil.convertToHHMMSS(33333)).toEqual('09:15:33');
        });

        it("doubleDigitFormat() 8 seconds should be 08", function() {
            expect(NumberUtil.doubleDigitFormat(8)).toEqual('08');
        });

        it("unformat()", function() {
            expect(NumberUtil.unformatUnit("$1,234,567.89")).toEqual(1234567.89);
            expect(NumberUtil.unformatUnit("1.234.567,89 €")).toEqual(1234567.89);
            expect(NumberUtil.unformatUnit("1 234 567,89£")).toEqual(1234567.89);
            expect(NumberUtil.unformatUnit("123 456 789,99 $")).toEqual(123456789.99);
            expect(NumberUtil.unformatUnit("-123.456.789,99 $")).toEqual(-123456789.99);
            expect(NumberUtil.unformatUnit("$-123,456,789.99")).toEqual(-123456789.99);
        });

        it("formatCost()", function() {
            expect(NumberUtil.formatUnit(1234567.89, 2, "*", ",", "$", 0)).toEqual('$1,234,567.89');
            expect(NumberUtil.formatUnit(1234.5676, 2, "*", ",",  " $", 1)).toEqual('1,234.57 $');
            expect(NumberUtil.formatUnit(12341234.56, 2, "*", ",",  " €", 1)).toEqual('12,341,234.56 €');
            expect(NumberUtil.formatUnit(1900, 0)).toEqual('1,900');
            expect(NumberUtil.formatUnit(-1900.24, 1)).toEqual('-1,900.2');
        });
    });
});
//http://net.tutsplus.com/tutorials/javascript-ajax/testing-your-javascript-with-jasmine/
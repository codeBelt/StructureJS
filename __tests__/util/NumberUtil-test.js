// Load the file that exports the functionality to test
jest.dontMock('../../js/util/NumberUtil');  // Don't create mock functions

var NumberUtil = require('../../js/util/NumberUtil').default;

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
        expect(NumberUtil.convertToHHMMSS(3599, false)).toEqual('59:59');
        expect(NumberUtil.convertToHHMMSS(3600, false)).toEqual('01:00:00');
        expect(NumberUtil.convertToHHMMSS(3599, true)).toEqual('00:59:59');
        expect(NumberUtil.convertToHHMMSS(3599)).toEqual('00:59:59');
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
        expect(NumberUtil.formatUnit(1234567.89, 2, ".", ",", "$", 0)).toEqual('$1,234,567.89');
        expect(NumberUtil.formatUnit(1234.5676, 2, ".", " ", " $", 1)).toEqual('1 234.57 $');
        expect(NumberUtil.formatUnit(12341234.56, 2, "~", ",", " €", 1)).toEqual('12,341,234~56 €');
        expect(NumberUtil.formatUnit(1900, 0)).toEqual('1,900');
        expect(NumberUtil.formatUnit(-1900.24, 1)).toEqual('-1,900.2');
    });

    it("NumberUtil.fahrenheitToCelsius()", function() {
        expect(NumberUtil.fahrenheitToCelsius(32)).toEqual(0);
        expect(NumberUtil.fahrenheitToCelsius(212)).toEqual(100);
    });

    it("NumberUtil.celsiusToFahrenheit()", function() {
        expect(NumberUtil.celsiusToFahrenheit(0)).toEqual(32);
        expect(NumberUtil.celsiusToFahrenheit(100)).toEqual(212);
    });

});
//http://net.tutsplus.com/tutorials/javascript-ajax/testing-your-javascript-with-jasmine/
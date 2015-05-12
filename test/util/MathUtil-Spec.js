var MathUtil = require('../../js/util/MathUtil');

describe("MathUtil", function() {

    it("MathUtil.constrain()", function() {
        expect(MathUtil.constrain(12, 3, 20)).toEqual(12);
        expect(MathUtil.constrain(22, 3, 20)).toEqual(20);
        expect(MathUtil.constrain(0, 3, 20)).toEqual(3);
    });

    it("MathUtil.randomRange()", function() {
        //expect(MathUtil.randomRange(2, 9)).toEqual(12);
    });

    it("MathUtil.rangeToPercent()", function() {
        expect(MathUtil.rangeToPercent(15, 10, 20)).toEqual(0.5);
    });

    it("MathUtil.percentToRange()", function() {
        expect(MathUtil.percentToRange(0.5, 10, 20)).toEqual(15);
    });

    it("MathUtil.map()", function() {
        expect(MathUtil.map(10, 0, 100, 0, 50)).toEqual(5);
    });

    it("MathUtil.radiansToDegrees()", function() {
        expect(MathUtil.radiansToDegrees(1.5707963267948966)).toEqual(90);
        expect(MathUtil.radiansToDegrees(3.141592653589793)).toEqual(180);
    });

    it("MathUtil.degreesToRadians()", function() {
        expect(MathUtil.degreesToRadians(90)).toEqual(1.5707963267948966);
        expect(MathUtil.degreesToRadians(180)).toEqual(3.141592653589793);
    });

    it("MathUtil.sign()", function() {
        expect(MathUtil.sign(23)).toEqual(1);
        expect(MathUtil.sign(-23)).toEqual(-1);
    });

    it("MathUtil.isPositive()", function() {
        expect(MathUtil.isPositive(23)).toEqual(true);
        expect(MathUtil.isPositive(-23)).toEqual(false);
    });

    it("MathUtil.isNegative()", function() {
        expect(MathUtil.isNegative(23)).toEqual(false);
        expect(MathUtil.isNegative(-23)).toEqual(true);
    });

    it("MathUtil.isOdd()", function() {
        expect(MathUtil.isOdd(2)).toEqual(false);
        expect(MathUtil.isOdd(3)).toEqual(true);
    });

    it("MathUtil.isEven()", function() {
        expect(MathUtil.isEven(3)).toEqual(false);
        expect(MathUtil.isEven(2)).toEqual(true);
    });

    it("MathUtil.isPrime()", function() {
        expect(MathUtil.isPrime(4)).toEqual(false);
        expect(MathUtil.isPrime(5)).toEqual(true);
    });

    it("MathUtil.factorial()", function() {
        expect(MathUtil.factorial(5)).toEqual(120);
        expect(MathUtil.factorial(9)).toEqual(362880);
    });

});
//http://net.tutsplus.com/tutorials/javascript-ajax/testing-your-javascript-with-jasmine/
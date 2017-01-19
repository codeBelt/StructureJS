/**
 * A helper class to do calculations and conversions.
 *
 * @class MathUtil
 * @module StructureJS
 * @submodule util
 * @author Robert S. (www.codeBelt.com)
 * @static
 */
declare class MathUtil {
    constructor();
    /**
     * Returns a number constrained between min and max.
     *
     * @method constrain
     * @param num {number}
     * @param min {number}
     * @param  max {number}
     * @return  {number}
     * @example
     *      MathUtil.constrain(12, 3, 20);
     *      // 12
     *
     *      MathUtil.constrain(22, 3, 20);
     *      // 20
     *
     *      MathUtil.constrain(0, 3, 20);
     *      // 3
     */
    static constrain(num: number, min?: number, max?: number): number;
    /**
     * Returns a random number between min and max.
     *
     * @method randomRange
     * @param min {number}
     * @param max {number}
     * @param [wholeNumber=true] {number}
     * @return {number}
     * @example
     *
     */
    static randomRange(min: number, max: number, wholeNumber?: boolean): number;
    /**
     * Returns the percentage of a number in a given range.
     * Example: num = 15 range 10 to 20 // outputs 0.5
     *
     * @method rangeToPercent
     * @param num {number}
     * @param min {number}
     * @param max {number}
     * @param constrainMin {boolean}        Returns 0 if num < min.
     * @param constrainMax {boolean}        Returns 1 if num > max.
     * @return {number}
     * @example
     *      MathUtil.rangeToPercent(15, 10, 20);
     *      // 0.5
     */
    static rangeToPercent(num: number, min: number, max: number, constrainMin?: boolean, constrainMax?: boolean): number;
    /**
     * Returns the number that corresponds to the percentage in a given range.
     * Example: percent = 0.5 range 10 to 20 // outputs 15
     *
     * @method percentToRange
     * @param percent {number}
     * @param min {number}
     * @param max {number}
     * @return {number}
     * @example
     *      MathUtil.percentToRange(0.5, 10, 20);
     *      // 15
     */
    static percentToRange(percent: number, min: number, max: number): number;
    /**
     * Re-maps a number from one range to another. The output is the same as inputing the result of rangeToPercent() numbero percentToRange().
     * Example: num = 10, min1 = 0, max1 = 100, min2 = 0, max2 = 50 // outputs 5
     *
     * @method map
     * @param num {number}
     * @param min1 {number}
     * @param max1 {number}
     * @param min2 {number}
     * @param max2 {number}
     * @return {number}
     * @example
     *      MathUtil.map(10, 0, 100, 0, 50);
     *      // 5
     */
    static map(num: number, min1: number, max1: number, min2: number, max2: number, round?: boolean, constrainMin?: boolean, constrainMax?: boolean): number;
    /**
     * Converts radians to degrees.
     *
     * @method radiansToDegrees
     * @param radians {number}
     * @return {number}
     * @example
     *      MathUtil.radiansToDegrees(1.5707963267948966);
     *      // 90
     *
     *      MathUtil.radiansToDegrees(3.141592653589793);
     *      // 180
     */
    static radiansToDegrees(radians: number): number;
    /**
     * Converts degrees to radians.
     *
     * @method degreesToRadians
     * @param degrees {number}
     * @return {number}
     * @example
     *      MathUtil.degreesToRadians(90);
     *      // 1.5707963267948966
     *
     *      MathUtil.degreesToRadians(180);
     *      // 3.141592653589793
     */
    static degreesToRadians(degrees: number): number;
    /**
     * Returns 1 if the value is >= 0. Returns -1 if the value is < 0.
     *
     * @method sign
     * @param num {number}
     * @return {number}
     * @example
     *      MathUtil.sign(23);
     *      // 1
     *
     *      MathUtil.sign(-23);
     *      // -1
     */
    static sign(num: number): number;
    /**
     * Check if number is positive (zero is positive).
     *
     * @method isPositive
     * @param num {number} The number.
     * @return {boolean}
     * @example
     *      MathUtil.isPositive(23);
     *      // true
     *
     *      MathUtil.isPositive(-23);
     *      // false
     */
    static isPositive(num: number): boolean;
    /**
     * Check if number is negative.
     *
     * @method isNegative
     * @param num {number} The
     * @return {boolean}
     * @example
     *      MathUtil.isNegative(23);
     *      // false
     *
     *      MathUtil.isNegative(-23);
     *      // true
     */
    static isNegative(num: number): boolean;
    /**
     * Check if number is odd (convert to Integer if necessary).
     *
     * @method isOdd
     * @param num {number} The number.
     * @return {boolean}
     * @example
     *      MathUtil.isOdd(2);
     *      // false
     *
     *      MathUtil.isOdd(3);
     *      // true
     */
    static isOdd(num: number): boolean;
    /**
     * Check if number is even (convert to Integer if necessary).
     *
     * @method isEven
     * @param num {number} The number.
     * @return {boolean}
     * @example
     *      MathUtil.isEven(2);
     *      // true
     *
     *      MathUtil.isEven(3);
     *      // false
     */
    static isEven(num: number): boolean;
    /**
     * Check if number is Prime (divisible only by itself and one).
     *
     * @method isPrime
     * @param num {number} The number.
     * @return {boolean}
     * @example
     *      MathUtil.isPrime(4);
     *      // false
     *
     *      MathUtil.isPrime(5);
     *      // true
     */
    static isPrime(num: number): boolean;
    /**
     * Calculate the factorial of the integer.
     *
     * @method factorial
     * @param num {number} The number.
     * @return {number}
     * @example
     *      MathUtil.factorial(5);
     *      // 120
     *
     *      MathUtil.factorial(9);
     *      // 362880
     */
    static factorial(num: number): number;
    /**
     * Return an array of divisors of the integer.
     *
     * @method getDivisors
     * @param num {number} The number.
     * @return {Array.<number>}
     * @example
     *
     */
    static getDivisors(num: number): Array<number>;
}
export default MathUtil;

/**
 * A helper class to do calculations and conversions.
 *
 * @class MathUtil
 * @module StructureJS
 * @submodule util
 * @author Robert S. (www.codeBelt.com)
 * @static
 */
class MathUtil
{
    constructor()
    {
        throw new Error('[MathUtil] Do not instantiate the MathUtil class because it is a static class.');
    }

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
    public static constrain(num:number, min:number = 0, max:number = 1):number
    {
        if (num < min)
        {
            return min;
        }
        if (num > max)
        {
            return max;
        }
        return num;
    }


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
    public static randomRange(min:number, max:number, wholeNumber:boolean = true):number
    {
        const num:number = (min + Math.random() * (max - min));

        if (wholeNumber)
        {
            return Math.round(num);
        }
        return num;
    }


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
    public static rangeToPercent(num:number, min:number, max:number, constrainMin:boolean = false, constrainMax:boolean = false):number
    {
        if (constrainMin && num < min)
        {
            return 0;
        }
        if (constrainMax && num > max)
        {
            return 1;
        }
        return (num - min) / (max - min);
    }


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
    public static percentToRange(percent:number, min:number, max:number):number
    {
        return (percent * (max - min)) + min;
    }


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
    public static map(num:number, min1:number, max1:number, min2:number, max2:number, round:boolean = true, constrainMin:boolean = true, constrainMax:boolean = true):number
    {
        if (constrainMin && num < min1)
        {
            return min2;
        }
        if (constrainMax && num > max1)
        {
            return max2;
        }

        const num1:number = (num - min1) / (max1 - min1);
        const num2:number = (num1 * (max2 - min2)) + min2;
        if (round)
        {
            return Math.round(num2);
        }
        return num2;
    }


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
    public static radiansToDegrees(radians:number):number
    {
        return radians * (180 / Math.PI);
    }


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
    public static degreesToRadians(degrees:number):number
    {
        return (degrees * Math.PI / 180);
    }


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
    public static sign(num:number):number
    {
        if (num < 0)
        {
            return -1
        }
        return 1;
    }

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
    public static isPositive(num:number):boolean
    {
        return (num >= 0);
    }

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
    public static isNegative(num:number):boolean
    {
        return (num < 0);
    }

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
    public static isOdd(num:number):boolean
    {
        const i:number = num;
        const e:number = 2;
        return Boolean(i % e);
    }

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
    public static isEven(num:number):boolean
    {
        const int:number = num;
        const e:number = 2;
        return (int % e == 0);
    }

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
    public static isPrime(num:number):boolean
    {
        if (num > 2 && num % 2 == 0)
        {
            return false;
        }
        const l:number = Math.sqrt(num);
        let i:number = 3;
        for (i; i <= l; i += 2)
        {
            if (num % i == 0)
            {
                return false;
            }
        }
        return true;
    }

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
    public static factorial(num:number):number
    {
        if (num == 0)
        {
            return 1;
        }
        let d:number = <number>num.valueOf();
        let i:number = d - 1;
        while (i)
        {
            d = d * i;
            i--;
        }
        return d;
    }

    /**
     * Return an array of divisors of the integer.
     *
     * @method getDivisors
     * @param num {number} The number.
     * @return {Array.<number>}
     * @example
     *
     */
    public static getDivisors(num:number):Array<number>
    {
        const r:Array<number> = [];

        for (let i:number = 1, e:number = num / 2; i <= e; i++)
        {
            if (num % i == 0)
            {
                r.push(i);
            }
        }

        if (num != 0)
        {
            r.push(<number>num.valueOf());
        }

        return r;
    }

}

export default MathUtil;
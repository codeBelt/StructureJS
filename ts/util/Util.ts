/**
 * A Utility class that has several static methods to assist in development.
 *
 * @class Util
 * @module StructureJS
 * @submodule util
 * @author Robert S. (www.codeBelt.com)
 * @static
 */
class Util
{
    /**
     * Keeps track of the count for the uniqueId method.
     *
     * @property _idCounter
     * @type {int}
     * @private
     * @static
     */
    private static _idCounter:number = 0;

    constructor()
    {
        throw new Error('[Util] Do not instantiate the Util class because it is a static class.');
    }

    /**
     * Generates a unique ID. If a prefix is passed in, the value will be appended to it.
     *
     * @method uniqueId
     * @param [prefix] {string} The string value used for the prefix.
     * @returns {init|string} Returns the unique identifier.
     * @public
     * @static
     * @example
     *      let property = Util.uniqueId();
     *      // 1
     *
     *      let property = Util.uniqueId('prefixName_');
     *      // prefixName_1
     */
    public static uniqueId(prefix:string = null):any
    {
        const id:number = ++Util._idCounter;

        if (prefix != null)
        {
            return String(prefix + id);
        }
        else
        {
            return id;
        }
    }

    /**
     * Removes a list of properties from an object.
     *
     * @method deletePropertyFromObject
     * @param object {Object} The object you want to remove properties from.
     * @param value {string|Array.<string>} A property name or an array of property names you want to remove from the object.
     * @returns {any} Returns the object passed in without the removed the properties.
     * @public
     * @static
     * @example
     *      let obj = { name: 'Robert', gender: 'male', phone: '555-555-5555' }
     *
     *      Util.deletePropertyFromObject(obj, ['phone', 'gender']);
     *
     *      // { name: 'Robert' }
     */
    public static deletePropertyFromObject(object:any, value:any):any
    {
        // If properties is not an array then make it an array object.
        const list:any = (value instanceof Array) ? value : [value];

        // Loop through the object properties.
        for (let key in object)
        {
            // If the key is a property and not function.
            if (object.hasOwnProperty(key))
            {
                let value:any = object[key];
                // If the property is an Array.
                if (value instanceof Array)
                {
                    // Loop through the Array and call the Util.deletePropertyFromObject method on each object in the array.
                    let array:Array<any> = value;
                    for (let index in array)
                    {
                        // Recursive function call.
                        Util.deletePropertyFromObject(array[index], list);
                    }
                }
                else if (value instanceof Object)
                {
                    Util.deletePropertyFromObject(value, list);
                }
                else
                {
                    // Loop through the list of property name.
                    for (let listIndex in list)
                    {
                        // If the key(property name) equals the property name in the list array.
                        if (key === list[listIndex])
                        {
                            // Delete the property from the object.
                            delete object[key];
                        }
                    }

                }
            }
        }

        return object;
    }

    /**
     * Renames a property name on an object.
     *
     * @method renamePropertyOnObject
     * @param object {Object} The object you want to rename properties from.
     * @param oldName {string}
     * @param newName {string}
     * @returns {any} Returns the object passed in renamed properties.
     * @public
     * @static
     * @example
     *      let obj = { name: 'Robert', gender: 'male', phone: '555-555-5555' }
     *
     *      Util.renamePropertyOnObject(obj, 'gender', 'sex');
     *
     *      // { name: 'Robert', sex: 'male', phone: '555-555-5555' }
     */
    public static renamePropertyOnObject(object:any, oldName:string, newName:string):any
    {
        // Check for the old property name to avoid a ReferenceError in strict mode.
        if (object.hasOwnProperty(oldName))
        {
            object[newName] = object[oldName];
            delete object[oldName];
        }

        return object;
    }

    /**
     * Makes a clone of an object.
     *
     * @method clone
     * @param obj {Object} The object you to clone.
     * @returns {any} Returns a clone object of the one passed in.
     * @public
     * @static
     * @example
     *      let cloneOfObject = Util.clone(obj);
     */
    public static clone(obj:any):any
    {

        //other scripts: http://davidwalsh.name/javascript-clone
        //http://oranlooney.com/functional-javascript/
        //http://oranlooney.com/deep-copy-javascript/


        // Handle the 3 simple types, and null or undefined
        if (null == obj || 'object' != typeof obj)
        {
            return obj;
        }

        // Handle Date
        if (obj instanceof Date)
        {
            const date:Date = new Date();
            date.setTime(obj.getTime());
            return date;
        }

        // Handle Array
        if (obj instanceof Array)
        {
            const array:Array<any> = [];
            for (let i = 0, len = obj.length; i < len; i++)
            {
                array[i] = Util.clone(obj[i]);
            }
            return array;
        }

        // Handle Object
        if (obj instanceof Object)
        {
            let copy:any = {};
            for (let attr in obj)
            {
                if (obj.hasOwnProperty(attr))
                {
                    copy[attr] = Util.clone(obj[attr]);
                }
            }
            return copy;
        }

        throw new Error("[Util] Unable to copy obj! Its type isn't supported.");
    }

    /**
     * Converts a string or number to a boolean.
     *
     * @method toBoolean
     * @param strNum {string|number}
     * @returns {boolean}
     * @public
     * @static
     * @example
     *      Util.toBoolean("TRUE");
     *      // true
     *
     *      Util.toBoolean(0);
     *      // false
     *
     *      Util.toBoolean(undefined);
     *      // false
     */
    public static toBoolean(strNum:any):boolean
    {
        const value:any = (typeof strNum === 'string') ? strNum.toLowerCase() : strNum;

        return (value > 0 || value == 'true' || value == 'yes');
    }

    /**
     * Returns the name of the function/object passed in.
     *
     * @method getName
     * @param classObject {any}
     * @returns {string} Returns the name of the function or object.
     * @static
     * @example
     *      let someClass = new SomeClass();
     *      Util.getName(someClass);            // 'SomeClass'
     *
     *      Util.getName(function Test(){});    // 'Test'
     *      Util.getName(function (){});        // 'anonymous'
     */
    public static getName(classObject:any):string
    {
        const type:string = typeof classObject;
        let value:string;
        const funcNameRegex:RegExp = /function ([^\(]+)/;

        if (type === 'object') {
            // Gets the name of the object.
            const results:RegExpExecArray = (<any>classObject).constructor.toString().match(funcNameRegex);
            value = results[1];
        } else {
            // This else code is mainly for Internet Explore.
            const isFunction:boolean = (type === 'function');
            // TODO: figure out how to explain this
            const name:any = isFunction && ((classObject.name && ['', classObject.name]) || (<any>classObject).toString().match(funcNameRegex));

            if (isFunction === false) {
                value = type;
            } else if (name && name[1]) {
                value = name[1];
            } else {
                value = 'anonymous';
            }
        }

        return value;
    }

    /**
     * Creates and returns a new debounced version of the passed function which will postpone its execution until after
     * wait milliseconds have elapsed since the last time it was invoked.
     *
     * @method debounce
     * @param callback {Function} The function that should be executed.
     * @param wait {number} Milliseconds to elapsed before invoking the callback.
     * @param immediate {boolean} Pass true for the immediate parameter to cause debounce to trigger the function on the leading instead of the trailing edge of the wait interval. Useful in circumstances like preventing accidental double-clicks on a "submit" button from firing a second time.
     * @param callbackScope {any} The scope of the callback function that should be executed.
     * @public
     * @static
     * @example
     *      Util.debounce(this._onBreakpointChange, 250, false, this);
     */
    public static debounce(callback:Function, wait:number, immediate:boolean, callbackScope:any):Function
    {
        let timeout:any;
        let result:any;

        let debounced:any = function ()
        {
            let args:any = arguments;

            function delayed()
            {
                if (immediate == false)
                {
                    result = callback.apply(callbackScope, args);
                }
                timeout = null;
            }

            if (timeout)
            {
                clearTimeout(timeout);
            }
            else if (immediate === true)
            {
                result = callback.apply(callbackScope, args);
            }

            timeout = setTimeout(delayed, wait);

            return result;
        };

        debounced.cancel = function ()
        {
            clearTimeout(timeout);
        };

        return debounced;
    }

    /**
     * TODO: YUIDoc_comment
     *
     * @method applyMixins
     * @param derivedCtor {any}
     * @param baseCtors {any}
     * @public
     * @static
     * @example
     *
            class Flies {
                fly() {
                    alert('Is it a bird? Is it a plane?');
                }
            }

            class Climbs {
                climb() {
                    alert('My spider-sense is tingling.');
                }
            }

            class HorseflyWoman implements Climbs, Flies {
                climb: () => void;
                fly: () => void;
            }

            Util.applyMixins(HorseflyWoman, [Climbs, Flies]);
     */
    public static applyMixins(derivedCtor: any, baseCtors: any[]):void
    {
        baseCtors.forEach(baseCtor => {
            Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {
                derivedCtor.prototype[name] = baseCtor.prototype[name];
            })
        });
    }

    /**
     * Returns a new array with duplicates removed.
     *
     * @method unique
     * @param list {Array.<any>} The array you want to use to generate the unique array.
     * @return {Array<any>} Returns a new array list of unique items.
     * @protected
     */
    public static unique(list:Array<any>):Array<any>
    {
        const uniqueList:Array<any> = list.reduce(function (previousValue:any, currentValue:any)
        {
            if (previousValue.indexOf(currentValue) === -1)
            {
                previousValue.push(currentValue);
            }

            return previousValue;
        }, []);

        return uniqueList;
    }

}

export default Util;

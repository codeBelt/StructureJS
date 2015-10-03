'use strict';
/*
 UMD Stuff
 @export Util
 */

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
     *      var property = Util.uniqueId();
     *      // 1
     *
     *      var property = Util.uniqueId('prefixName_');
     *      // prefixName_1
     */
    public static uniqueId(prefix:string = null):any
    {
        var id:number = ++Util._idCounter;

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
     * @param list {Array} A list of property names you want to remove from the object.
     * @returns {any} Returns the object passed in without the removed the properties.
     * @public
     * @static
     * @example
     *      var obj = { name: 'Robert', gender: 'male', phone: '555-555-5555' }
     *
     *      Util.deletePropertyFromObject(obj, ['phone', 'gender']);
     *
     *      // { name: 'Robert' }
     */
    public static deletePropertyFromObject(object:any, list:any[]):any
    {
        // Loop through the object properties.
        for (var key in object)
        {
            // If the key is a property and not function.
            if (object.hasOwnProperty(key))
            {
                var value:any = object[key];
                // If the property is an Array.
                if (value instanceof Array)
                {
                    // Loop through the Array and call the Util.deletePropertyFromObject method on each object in the array.
                    var array:any[] = value;
                    for (var index in array)
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
                    for (var listIndex in list)
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
     *      var obj = { name: 'Robert', gender: 'male', phone: '555-555-5555' }
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
     *      var cloneOfObject = Util.clone(obj);
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
            var date:Date = new Date();
            date.setTime(obj.getTime());
            return date;
        }

        // Handle Array
        if (obj instanceof Array)
        {
            var array:any[] = [];
            for (var i = 0, len = obj.length; i < len; i++)
            {
                array[i] = Util.clone(obj[i]);
            }
            return array;
        }

        // Handle Object
        if (obj instanceof Object)
        {
            var copy:any = {};
            for (var attr in obj)
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
        var value:any = (typeof strNum === 'string') ? strNum.toLowerCase() : strNum;

        return (value > 0 || value == 'true' || value == 'yes');
    }

    /**
     * Returns the name of the class object passed in.
     *
     * @method getClassName
     * @param classObject {Object}
     * @returns {string} Returns the name of the class object passed in.
     * @public
     * @static
     * @example
     *      var someClass = new SomeClass();
     *
     *      Util.getClassName(someClass);
     *      // 'SomeClass'
     */
    public static getClassName(classObject:any):string
    {
        var funcNameRegex:RegExp = /function (.{1,})\(/;
        var results:RegExpExecArray = (funcNameRegex).exec((<any>classObject).constructor.toString());

        return (results && results.length > 1) ? results[1] : '';
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
        var timeout:any;
        var result:any;

        var debounced:any = function ()
        {
            var args:any = arguments;

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
}

export = Util;
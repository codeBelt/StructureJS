/*
 * Copyright (c) 2013 Robert S. https://github.com/codeBelt/StructureTS
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without restriction,
 * including without limitation the rights to use, copy, modify, merge,
 * publish, distribute, sublicense, and/or sell copies of the Software,
 * and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NON-INFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE
 * OR OTHER DEALINGS IN THE SOFTWARE.
 */

class Util
{
    /**
     * Keeps track of the count for the uniqueId method.
     *
     * @property _idCounter
     * @type {init}
     * @private
     * @static
     */
    private static _idCounter:number = 0;

    /**
     * A Utility class that has several static methods to assist in development.
     *
     * @class Util
     * @module StructureTS
     * @submodule util
     * @constructor
     * @version 0.2.0
     **/
    constructor()
    {
    }

    /**
     * Generates a unique ID. If a prefix is passed in, the value will be appended to it.
     * @example
     var property:number = Util.uniqueId();
     // 1

     var property:string = Util.uniqueId('yomama_');
     // yomama_1
     * @method uniqueId
     * @param [prefix] {string} The string value used for the prefix.
     * @returns {init|string} Returns the unique identifier.
     * @public
     * @static
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
     * @method deletePropertyFromObject
     * @param object {Object} The object you want to remove properties from.
     * @param list {array} A list of property names you want to remove from the object.
     * @returns {any} Returns the object passed in without the removed the properties.
     * @public
     * @static
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
     * @method renamePropertyOnObject
     * @param object {Object} The object you want to rename properties from.
     * @param oldName {string}
     * @param newName {string}
     * @returns {any} Returns the object passed in renamed properties.
     * @public
     * @static
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
     * @method clone
     * @param obj {Object} The object you to clone.
     * @returns {any} Returns a clone object of the one passed in.
     * @public
     * @static
     */
    public static clone(obj:any):any
    {

        //other scripts: http://davidwalsh.name/javascript-clone
        //http://oranlooney.com/functional-javascript/
        //http://oranlooney.com/deep-copy-javascript/


        // Handle the 3 simple types, and null or undefined
        if (null == obj || "object" != typeof obj)
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
     * YUIDoc_comment
     *
     * @method toBoolean
     * @param strNum {string|number}
     * @returns {boolean}
     * @public
     * @static
     */
    public static toBoolean(strNum:any):boolean
    {
        strNum = (typeof strNum === 'string') ? strNum.toLowerCase() : strNum;

        return (strNum == "1" || strNum == "true");
    }

    /**
     * Returns the name of the class object passed in.
     *
     * @method getClassName
     * @param classObject {Object}
     * @returns {string} Returns the name of the class object passed in.
     * @public
     * @static
     */
    public static getClassName(classObject):string
    {
        var funcNameRegex = /function (.{1,})\(/;
        var results = (funcNameRegex).exec((<any>classObject).constructor.toString());

        return (results && results.length > 1) ? results[1] : '';
    }

}

export = Util;
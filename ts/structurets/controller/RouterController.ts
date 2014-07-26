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

import EventDispatcher = require('../event/EventDispatcher')
import RouterEvent = require('../event/RouterEvent')

import Hasher = require('../../../millermedeiros/hasher/Hasher')
import Crossroads = require('../../../millermedeiros/crossroads/Crossroads')

class RouterController extends EventDispatcher
{
    /**
     * YUIDoc_comment
     *
     * @property _crossroads
     * @type {Crossroads}
     * @private
     */
    private _crossroads:Crossroads = null;

    /**
     * Keeps a reference how the Router Controller will handle routes.
     * If the value is true it will user the browsers history to dispatch events when the history state changes.
     * If the value is false it directly dispatch events when the {{#crossLink "BaseObject/navigateTo:method"}}{{/crossLink}} method is called.
     *
     * @property _useDeepLinking
     * @type {boolean}
     * @private
     */
    private _useDeepLinking:boolean = true;

    /**
     * If _useDeepLinking is set to false user can manual type in the hash/deep link to make the application change to
     * different views. If this is not wanted for security concerns you can set allowManualDeepLinking to false and users
     * cannot update the app via url hash changes.
     *
     * @property _allowManualDeepLinking
     * @type {boolean}
     * @private
     */
    private _allowManualDeepLinking:boolean = true;

    /**
     * The RouterController...
     *
     * @class RouterController
     * @module StructureTS
     * @submodule controller
     * @constructor
     * @version 0.2.0
     **/
    constructor(useDeepLinking:boolean = true, allowManualDeepLinking:boolean = true)
    {
        super();

        this._useDeepLinking = useDeepLinking;
        this._allowManualDeepLinking = allowManualDeepLinking;

        this._crossroads = new Crossroads();
    }

    public addRoute(pattern:string, handler:Function, scope:any, priority:number = 0):void
    {
        this._crossroads.addRoute(pattern, handler.bind(scope), priority);
    }

    /**
     *
     * @method start
     */
    public start():void
    {
        if (Hasher.isActive())
        {
            return;
        }

        this._crossroads.routed.add(this.onAllRoutesHandler, this);

        if (this._useDeepLinking === false && this._allowManualDeepLinking === false)
        {
            this.parseHash('', '');
        }
        else
        {
            Hasher.initialized.add(this.parseHash.bind(this)); //parse initial hash
            Hasher.changed.add(this.parseHash.bind(this)); //parse hash changes
        }

        Hasher.init(); //start listening for hash changes
    }

    public onAllRoutesHandler():void
    {
        //console.log("all", arguments);
        this.dispatchEvent(new RouterEvent(RouterEvent.CHANGE));
    }

    /**
     *
     * @method parseHash
     * @param newHash {string}
     * @param oldHash {string}
     */
    public parseHash(newHash:string, oldHash:string):void
    {
        this._crossroads.parse(newHash);
    }

    /**
     *
     * @method navigateTo
     * @param hash {string}
     * @param [silently=false] {boolean}
     */
    public navigateTo(hash:string, silently:boolean = false):void
    {
        hash = hash.replace('#/', '');

        if (this._useDeepLinking === true)
        {
            this.changeUrl(hash, silently);
        }
        else
        {
            this.changeState(hash);
        }
    }

    /**
     *
     * @method getHash
     * @returns {string}
     */
    public getHash():string
    {
        return Hasher.getHash();
    }

    /**
     *
     * @method getHashAsArray
     * @returns {array}
     */
    public getHashAsArray():any[]
    {
        return Hasher.getHashAsArray();
    }

    /**
     *
     * @method getURL
     * @returns {string}
     */
    public getURL():string
    {
        return Hasher.getURL();
    }

    /**
     *
     * @method getBaseURL
     * @returns {string}
     */
    public getBaseURL():string
    {
        return Hasher.getBaseURL();
    }

    public destroy():void
    {
        this._crossroads.removeAllRoutes();
        this._crossroads = null;
    }

    /**
     * YUIDoc_comment
     *
     * @method changeUrl
     * @private
     */
    private changeUrl(hash:string, silently):void
    {
        if (silently)
        {
            Hasher.changed.active = false;
            Hasher.setHash(hash);
            Hasher.changed.active = true;
        }
        else
        {
            Hasher.setHash(hash);
        }
    }

    /**
     * YUIDoc_comment
     *
     * @method changeState
     * @private
     */
    private changeState(hash:string):void
    {
        this._crossroads.parse(hash);
    }

}

export = RouterController;
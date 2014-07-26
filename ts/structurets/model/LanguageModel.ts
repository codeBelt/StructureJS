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

import IDataStore = require('../interface/IDataStore')
import EventDispatcher = require('../event/EventDispatcher')
import LocalStorageController = require('../controller/LocalStorageController')
import RequestEvent = require('../event/RequestEvent')
import LanguageEvent = require('../event/LanguageEvent')
import BaseRequest = require('../request/BaseRequest')
import LanguageConfigVO = require('vo/LanguageConfigVO')

class LanguageModel extends EventDispatcher
{
    private _request:BaseRequest = null;
    private _availableLanguagesDictionary:LanguageConfigVO[] = [];
    private _localStorageController:LocalStorageController = null;

    public currentLanguage:string = null;
    public data:any = null;

    /**
     * The LanguageModel...
     *
     * @class LanguageModel
     * @module StructureTS
     * @submodule model
     * @constructor
     * @version 0.1.0
     **/
    constructor()
    {
        super();

        this._localStorageController = new LocalStorageController();
        this._localStorageController.setNamespace('StructureTS.');
        this.currentLanguage = this._localStorageController.getItem('language', true);
    }

    /**
     * The ...
     *
     * @method loadConfig
     * @param path {string} The path to the main language config json file.
     * @example
     {
     "data": [
         {
             "id": "en-US",
             "lang": "English",
             "text": "English",
             "path": "data/languages/main.en.json"
         },
         {
             "id": "es-ES",
             "lang": "Spanish",
             "text": "Español",
             "path": "data/languages/main.sp.json"
         }
     ]
 }
     */
    public loadConfig(path:string):void
    {
        this._request = new BaseRequest(path);
        this._request.addEventListener(RequestEvent.SUCCESS, this.onConfigLoaded, this);
        this._request.load();
    }

    /**
     *
     * @method setLang
     * @param value
     */
    public setLang(value:string):void
    {
        this.currentLanguage = value;
    }

    /**
     *
     * @method loadLanguageData
     * @param path {LanguageConfigVO}
     * @protected
     */
    public loadLanguageData(vo:LanguageConfigVO):void
    {
        this._localStorageController.addItem('language', vo.id, true);

        this._request = new BaseRequest(vo.path);
        this._request.addEventListener(RequestEvent.SUCCESS, this.onLanguageDataLoad, this);
        this._request.load();
    }

    /**
     *
     * @method getSupportedLanguages
     */
    public getSupportedLanguages()
    {
        var temp:LanguageConfigVO[] = [];
        for (var key in this._availableLanguagesDictionary)
        {
            temp.push(this._availableLanguagesDictionary[key]);
        }
        return temp;
    }

    /**
     *
     * @method loadLanguageById
     */
    public loadLanguageById(id:string):void
    {
        var vo:LanguageConfigVO = this.getLangConfigById(id);
        this.loadLanguageData(vo);
    }

    /**
     *
     * @method getLangConfigById
     * @param id {string}
     * @return {LanguageConfigVO}
     * @protected
     */
    public getLangConfigById(id:string):LanguageConfigVO
    {
        return this._availableLanguagesDictionary[id];
    }

    /**
     *
     * @method onConfigLoaded
     * @param event {RequestEvent}
     * @protected
     */
    public onConfigLoaded(event:RequestEvent):void
    {
        this._request.removeEventListener(RequestEvent.SUCCESS, this.onConfigLoaded, this);

        var firstLanguageId:string = null;
        var jsonData:any = JSON.parse(event.target.data);
        var vo:LanguageConfigVO;
        var len:number = jsonData.data.length;
        for (var i:number = 0; i < len; i++)
        {
            vo = new LanguageConfigVO(jsonData.data[i]);
            this._availableLanguagesDictionary[vo.id] = vo;

            // Save a reference to the first vo id so we can set that as the default language.
            if (firstLanguageId == null)
            {
                firstLanguageId = vo.id;
            }
        }

        // Checks if the language id that exists in LocalStorage is found in the _availableLanguagesDictionary.
        var languageIdFound:boolean = this.hasLanguage(this.currentLanguage);

        // If there is no default language set in LocalStorage then use the first one in the _availableLanguagesDictionary.
        this.currentLanguage = (languageIdFound) ? this.currentLanguage : firstLanguageId;

        this.dispatchEvent(new RequestEvent(LanguageEvent.CONFIG_LOADED, false, false, this.data));

        // Get the language vo and get the json file path to load that specific language.
        var currentLanguageVO:LanguageConfigVO = this.getLangConfigById(this.currentLanguage);
        this.loadLanguageData(currentLanguageVO);
    }

    /**
     *
     * @method onLanguageDataLoad
     * @param event {RequestEvent}
     * @protected
     */
    public onLanguageDataLoad(event:RequestEvent):void
    {
        this.data = JSON.parse(event.target.data);
        this._request.removeEventListener(RequestEvent.SUCCESS, this.onConfigLoaded, this);
        this._request = null;

        this.dispatchEvent(new RequestEvent(LanguageEvent.LANGUAGE_LOADED, false, false, this.data));
    }

    /**
     * We need to check if the language id that exists in LocalStorage matches an id in the _availableLanguagesDictionary.
     * If the application was updated and the language id's changed it would break the application.
     *
     * @method hasLanguage
     * @private
     */
    private hasLanguage(languageId:string):boolean
    {
        return !!this._availableLanguagesDictionary[languageId];
    }

}
export = LanguageModel;
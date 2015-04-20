define(function(require, exports, module) { // jshint ignore:line
    'use strict';

    var $ = require('jquery');

    var ListController = require('list/ListController');

    /**
     * Initial application setup. Runs once upon every page load.
     *
     * @class App
     * @constructor
     */
    var App = function() {
        this.init();
    };

    var proto = App.prototype;

    /**
     * Initializes the application and kicks off loading of prerequisites.
     *
     * @method init
     * @private
     */
    proto.init = function() {
        this.listArray = [];
        var $list = $('.js-list');
        var i;
        var listLength = $list.length;
        for (i = 0; i < listLength; i++) {
            this.listArray.push(new ListController($list.eq(i)));
        }
    };

    return App;

});

!function(e){"object"==typeof exports?module.exports=e():"function"==typeof define&&define.amd?define(e):"undefined"!=typeof window?window.nerderyHasJs=e():"undefined"!=typeof global?global.nerderyHasJs=e():"undefined"!=typeof self&&(self.nerderyHasJs=e())}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var global=typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {};'use strict';

var document = global.document;

/**
 * Replaces "no-js" class with "js" on the html element if JavaScript
 * is present. This allows you to style both the JavaScript enhanced
 * and non JavaScript experiences.
 *
 * @class HasJS
 * @static
 */
var HasJS = {
    init: function() {
        var element = document.documentElement;

        element.className = element.className.replace(
            /(^|\s)no-js(\s|$)/g, // find instances of 'no-js'
            '$1js$2'              // replace with 'js'
        );
    }
};

module.exports = HasJS;

},{}]},{},[1])
(1)
});
;
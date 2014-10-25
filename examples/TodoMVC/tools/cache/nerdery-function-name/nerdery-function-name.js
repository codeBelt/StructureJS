!function(e){if("object"==typeof exports)module.exports=e();else if("function"==typeof define&&define.amd)define(e);else{var n;"undefined"!=typeof window?n=window:"undefined"!=typeof global?n=global:"undefined"!=typeof self&&(n=self),n.nerderyFunctionName=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
/**
 * Polyfill for named functions.
 * http://stackoverflow.com/a/17056530
 */
(function() {
    'use strict';

    function f() {}

    if (!f.name && Object.defineProperty) {
        Object.defineProperty(Function.prototype, 'name', {
            get: function() {
                var name = this.toString().match(/^\s*function\s*(\S*)\s*\(/)[1] || '';

                // For better performance only parse once, and then cache the
                // result through a new accessor for repeated access.
                Object.defineProperty(this, 'name', { value: name });

                return name;
            }
        });
    }
}());

},{}]},{},[1])
(1)
});
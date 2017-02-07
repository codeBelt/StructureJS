(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";
/**
 * Initial application setup. Runs once upon every page load.
 *
 * @class App
 * @constructor
 */

var App = function () {
  function App() {}
  /**
   * Initializes the application and kicks off loading of prerequisites.
   *
   * @method init
   * @public
   */
  App.prototype.init = function () {
    // Create your views here
  };
  return App;
}();
exports.__esModule = true;
exports["default"] = App;


},{}],2:[function(require,module,exports){
"use strict";

var App_1 = require('./App');
var app = new App_1.default();
app.init();

},{"./App":1}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvYXNzZXRzL3NjcmlwdHMvQXBwLmpzIiwic3JjL2Fzc2V0cy9zY3JpcHRzL21haW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBOzs7Ozs7O0FBTUEsSUFBSSxNQUFPLFlBQVk7QUFDbkIsV0FBUyxHQUFULEdBQWUsQ0FDZDtBQUNEOzs7Ozs7QUFNQSxNQUFJLFNBQUosQ0FBYyxJQUFkLEdBQXFCLFlBQVk7QUFDN0I7QUFDSCxHQUZEO0FBR0EsU0FBTyxHQUFQO0FBQ0gsQ0FiVSxFQUFYO0FBY0EsUUFBUSxVQUFSLEdBQXFCLElBQXJCO0FBQ0EsUUFBUSxTQUFSLElBQXFCLEdBQXJCO0FBQ0E7Ozs7O0FDdkJBLG9CQUFnQixBQUFPLEFBQUM7QUFFeEIsSUFBTSxBQUFHLE1BQUcsSUFBSSxNQUFHLEFBQUUsQUFBQztBQUN0QixBQUFHLElBQUMsQUFBSSxBQUFFLEFBQUMiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiXCJ1c2Ugc3RyaWN0XCI7XG4vKipcbiAqIEluaXRpYWwgYXBwbGljYXRpb24gc2V0dXAuIFJ1bnMgb25jZSB1cG9uIGV2ZXJ5IHBhZ2UgbG9hZC5cbiAqXG4gKiBAY2xhc3MgQXBwXG4gKiBAY29uc3RydWN0b3JcbiAqL1xudmFyIEFwcCA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gQXBwKCkge1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBJbml0aWFsaXplcyB0aGUgYXBwbGljYXRpb24gYW5kIGtpY2tzIG9mZiBsb2FkaW5nIG9mIHByZXJlcXVpc2l0ZXMuXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIGluaXRcbiAgICAgKiBAcHVibGljXG4gICAgICovXG4gICAgQXBwLnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAvLyBDcmVhdGUgeW91ciB2aWV3cyBoZXJlXG4gICAgfTtcbiAgICByZXR1cm4gQXBwO1xufSgpKTtcbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IEFwcDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPUFwcC5qcy5tYXAiLCJpbXBvcnQgQXBwIGZyb20gJy4vQXBwJztcblxuY29uc3QgYXBwID0gbmV3IEFwcCgpO1xuYXBwLmluaXQoKTtcbiJdfQ==

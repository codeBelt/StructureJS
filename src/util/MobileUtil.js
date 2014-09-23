/**
 * UMD (Universal Module Definition) wrapper.
 */
(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof module !== 'undefined' && module.exports) { //Node
        module.exports = factory();
    } else {
        /*jshint sub:true */
        root.structurejs = root.structurejs || {};
        root.structurejs.MobileUtil = factory();
    }
}(this, function() {
    'use strict';

    /**
     * The MobileUtil...
     *
     * @class MobileUtil
     * @module StructureJS
     * @submodule util
     * @constructor
     * @author Robert S. (www.codeBelt.com)
     */
    var MobileUtil = (function () {

        function MobileUtil() {
        }
        MobileUtil.isAndroid = function () {
            return !!navigator.userAgent.match(/Android/i);
        };

        MobileUtil.isBlackBerry = function () {
            return Boolean(!!navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/BB10; Touch/));
        };

        MobileUtil.isiOS = function () {
            return !!navigator.userAgent.match(/iPhone|iPad|iPod/i);
        };

        MobileUtil.isOpera = function () {
            return !!navigator.userAgent.match(/Opera Mini/i);
        };

        MobileUtil.isWindows = function () {
            return !!navigator.userAgent.match(/IEMobile/i);
        };

        MobileUtil.isMobile = function () {
            return (MobileUtil.isAndroid() || MobileUtil.isBlackBerry() || MobileUtil.isiOS() || MobileUtil.isOpera() || MobileUtil.isWindows());
        };
        return MobileUtil;
    })();

    return MobileUtil;
}));
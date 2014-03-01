define(function (require, exports, module)
{
    'use strict';

    var Extend = this.__extends || function (d, b)
    {
        for (var p in b)
        {
            if (b.hasOwnProperty(p)) d[p] = b[p];
        }
        function __()
        {
            this.constructor = d;
        }

        __.prototype = b.prototype;
        d.prototype = new __();

        return b;
    };

    module.exports = Extend;

});
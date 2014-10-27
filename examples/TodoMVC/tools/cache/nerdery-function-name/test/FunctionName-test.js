/*jshint node:true */
/*global describe, it */
'use strict';

var assert = require('assert');

require('../lib/FunctionName.js');

describe('Function.prototype.name', function() {
    it('should return valid function names', function() {
        var count = 0;

        function foo() { count++; }
        function bar (a, b, c) {
            a = a(b(c()));
            count++;
            assert.ok(false);
        }

        var baz = function bat() { count++; };
        var qux = function() { count++; };

        assert.strictEqual(foo.name, 'foo');
        assert.strictEqual(bar.name, 'bar');
        assert.strictEqual(baz.name, 'bat');
        assert.strictEqual(qux.name, '');
        assert.strictEqual(count, 0);
    });
});

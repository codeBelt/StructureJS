// Load the file that exports the functionality to test
jest.dontMock('../../js/util/Util');  // Don't create mock functions

var Util = require('../../js/util/Util').default;

describe("Util", function() {

    it("Util.uniqueId()", function() {
        expect(Util.uniqueId()).toEqual(1);
    });

    it("Util.deletePropertyFromObject()", function() {
        var obj = { name: 'Robert', gender: 'male', phone: '555-555-5555' };

        var result = Util.deletePropertyFromObject(obj, ['phone', 'gender']);

        expect(JSON.stringify(result)).toEqual(JSON.stringify({ name: 'Robert' }));
    });

    it("Util.renamePropertyOnObject()", function() {
        var obj = { name: 'Robert', phone: '555-555-5555', gender: 'male' };

        var result = Util.renamePropertyOnObject(obj, 'gender', 'sex');

        expect(JSON.stringify(result)).toEqual(JSON.stringify({ name: 'Robert', phone: '555-555-5555', sex: 'male' }));
    });

    it("Util.clone()", function() {
        //TODO
    });

    it("Util.toBoolean()", function() {
        expect(Util.toBoolean(true)).toBeTruthy();
        expect(Util.toBoolean("YES")).toBeTruthy();
        expect(Util.toBoolean("yes")).toBeTruthy();
        expect(Util.toBoolean("no")).toBeFalsy();
        expect(Util.toBoolean("true")).toBeTruthy();
        expect(Util.toBoolean("TRUE")).toBeTruthy();
        expect(Util.toBoolean("1")).toBeTruthy();
        expect(Util.toBoolean("36")).toBeTruthy();
        expect(Util.toBoolean(36)).toBeTruthy();
        expect(Util.toBoolean(1)).toBeTruthy();

        expect(Util.toBoolean(false)).toBeFalsy();
        expect(Util.toBoolean("false")).toBeFalsy();
        expect(Util.toBoolean("FALSE")).toBeFalsy();
        expect(Util.toBoolean("0")).toBeFalsy();
        expect(Util.toBoolean("-1")).toBeFalsy();
        expect(Util.toBoolean(0)).toBeFalsy();
        expect(Util.toBoolean(-1)).toBeFalsy();
        expect(Util.toBoolean(null)).toBeFalsy();
        expect(Util.toBoolean(undefined)).toBeFalsy();
    });

    it("Util.getName()", function() {
        expect(Util.getName(function Test(){})).toEqual('Test');
        expect(Util.getName(function (){})).toEqual('anonymous');
    });

    it("Util.debounce()", function() {
        //TODO
    });

    it("Util.applyMixins()", function() {
        //TODO
    });

    it("Util.unique()", function() {
        var array = [1,2,3,3,3,2,1];
        expect(Util.unique(array)).toEqual([1,2,3]);
    });

});
//http://net.tutsplus.com/tutorials/javascript-ajax/testing-your-javascript-with-jasmine/
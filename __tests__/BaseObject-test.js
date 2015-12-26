// Load the file that exports the functionality to test
jest.dontMock('../js/util/Util');  // Don't create mock functions
jest.dontMock('../js/BaseObject');  // Don't create mock functions

var BaseObject = require('../js/BaseObject').default;

describe("BaseObject", function() {

    var baseObject = new BaseObject();

    it("baseObject.sjsId", function() {
        expect(baseObject.sjsId).toEqual(1);
    });

    it("baseObject.getQualifiedClassName()", function() {
        expect(baseObject.getQualifiedClassName()).toEqual('BaseObject');
    });

    it("baseObject.destroy()", function() {
        baseObject.destroy();
        expect(baseObject.sjsId).toEqual(null);
    });
});
//http://net.tutsplus.com/tutorials/javascript-ajax/testing-your-javascript-with-jasmine/
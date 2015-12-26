// Load the file that exports the functionality to test
jest.dontMock('../js/ObjectManager');  // Don't create mock functions

var ObjectManager = require('../js/ObjectManager').default;;

describe("ObjectManager", function() {

    var objectManager = new ObjectManager();

    it("objectManager.isEnabled", function() {
        expect(objectManager.isEnabled).toEqual(false);
    });

    it("objectManager.enable()", function() {
        objectManager.enable();
        expect(objectManager.isEnabled).toEqual(true);
    });

    it("objectManager.disable()", function() {
        objectManager.disable();
        expect(objectManager.isEnabled).toEqual(false);
    });

});
//http://net.tutsplus.com/tutorials/javascript-ajax/testing-your-javascript-with-jasmine/
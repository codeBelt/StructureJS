define(function (require, exports, module) {

    var BaseObject = require('BaseObject');

    describe("BaseObject", function() {

        var baseObject = new BaseObject();

        it("baseObject.cid", function() {
            expect(baseObject.cid).toEqual(1);
        });

        it("baseObject.getQualifiedClassName()", function() {
            expect(baseObject.getQualifiedClassName()).toEqual('BaseObject');
        });

        it("baseObject.destroy()", function() {
            baseObject.destroy();
            expect(baseObject.cid).toEqual(null);
        });
    });
});
//http://net.tutsplus.com/tutorials/javascript-ajax/testing-your-javascript-with-jasmine/
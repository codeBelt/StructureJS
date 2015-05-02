define(function (require, exports, module) {

    var ValueObject = require('model/ValueObject');

    describe("ValueObject", function() {

        var vo;

        it("getQualifiedClassName", function() {
            vo = new ValueObject();
            expect(vo.getQualifiedClassName()).toEqual('ValueObject');
        });

    });
});
//http://net.tutsplus.com/tutorials/javascript-ajax/testing-your-javascript-with-jasmine/
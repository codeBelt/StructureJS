var DateUtil = require('../../js/util/DateUtil');

describe("DateUtil", function() {

    it("DateUtil.getDaySuffix()", function() {
        expect(DateUtil.getDaySuffix(1)).toEqual('st');
        expect(DateUtil.getDaySuffix(2)).toEqual('nd');
        expect(DateUtil.getDaySuffix(3)).toEqual('rd');
        expect(DateUtil.getDaySuffix(4)).toEqual('th');
        expect(DateUtil.getDaySuffix(5)).toEqual('th');
        expect(DateUtil.getDaySuffix(6)).toEqual('th');
        expect(DateUtil.getDaySuffix(7)).toEqual('th');
        expect(DateUtil.getDaySuffix(12)).toEqual('th');
    });
});
//http://net.tutsplus.com/tutorials/javascript-ajax/testing-your-javascript-with-jasmine/
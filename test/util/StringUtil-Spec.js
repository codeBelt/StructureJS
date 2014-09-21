define(function (require, exports, module) {

    var StringUtil = require('util/StringUtil');

    describe("StringUtil", function() {
        it("getExtension()", function() {
            expect(StringUtil.getExtension("file.exe")).toEqual("exe");
            expect(StringUtil.getExtension("file.jpg.zip")).toEqual("zip");
        });

        it("hyphenToCamelCase()", function() {
            expect(StringUtil.hyphenToCamelCase("hyphen-to-camel-case")).toEqual("hyphenToCamelCase");
            expect(StringUtil.hyphenToCamelCase("hyphen-TO-camel-CASE")).toEqual("hyphenToCamelCase");
        });

//    it("hyphenToPascalCase()", function() {
//        expect(StringUtil.hyphenToPascalCase("hyphen-to-camel-case")).toEqual("HyphenToCamelCase");
//        expect(StringUtil.hyphenToPascalCase("hyphen-TO-camel-CASE")).toEqual("HyphenToCamelCase");
//    });

        it("camelCaseToHyphen()", function() {
            expect(StringUtil.camelCaseToHyphen("hyphenToCamelCase")).toEqual("hyphen-to-camel-case");
        });

//    it("queryStringToObject()", function() {
//    });

        it("removeAllWhitespace()", function() {
            expect(StringUtil.removeAllWhitespace("   a b    c d e f g ")).toEqual("abcdefg");
        });

        it("removeLeadingTrailingWhitespace()", function() {
            expect(StringUtil.removeLeadingTrailingWhitespace("   a b    c d e f g ")).toEqual("a b    c d e f g");
        });

        it("truncate()", function() {
            expect(StringUtil.truncate("Robert is cool and he knows it.", 14)).toEqual("Robert is cool...");
        });
    });
});
//http://net.tutsplus.com/tutorials/javascript-ajax/testing-your-javascript-with-jasmine/
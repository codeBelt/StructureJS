define(function (require, exports, module) {

    var StringUtil = require('util/StringUtil');

    describe("StringUtil", function() {
        it("getExtension()", function() {
            expect(StringUtil.getExtension("file.exe")).toEqual("exe");
            expect(StringUtil.getExtension("file.exe", true)).toEqual(".exe");
            expect(StringUtil.getExtension("file.jpg.zip")).toEqual("zip");
        });

        it("toCamelCase()", function() {
            expect(StringUtil.toCamelCase("hyphen-to-camel-case")).toEqual("hyphenToCamelCase");
            expect(StringUtil.toCamelCase("hyphen_to_camel_case")).toEqual("hyphenToCamelCase");
            expect(StringUtil.toCamelCase("hyphen~TO~camel~ CASE")).toEqual("hyphenToCamelCase");
            expect(StringUtil.toCamelCase("Hyphen.TO.camel-CASE")).toEqual("hyphenToCamelCase");
            expect(StringUtil.toCamelCase("HyphenTo camel CASE")).toEqual("hyphenToCamelCase");
            expect(StringUtil.toCamelCase("  H  yphenTo camel CASE")).toEqual("hYphenToCamelCase");
            expect(StringUtil.toCamelCase("HyphenToCamelCase")).toEqual("hyphenToCamelCase");
            expect(StringUtil.toCamelCase("Hyphen8ToCamelCase")).toEqual("hyphen8ToCamelCase");
        });

        it("hyphenToPascalCase()", function() {
            expect(StringUtil.hyphenToPascalCase("hyphen-to-camel-case")).toEqual("HyphenToCamelCase");
            expect(StringUtil.hyphenToPascalCase("hyphen-TO-camel-CASE")).toEqual("HyphenToCamelCase");
        });

        it("camelCaseToHyphen()", function() {
            expect(StringUtil.camelCaseToHyphen("hyphenToCamelCase")).toEqual("hyphen-to-camel-case");
        });

        it("createUUID()", function() {
            //expect(StringUtil.createUUID()).toEqual();
        });

        it("queryStringToObject()", function() {
            var obj1 = StringUtil.queryStringToObject('?name=Robert&age=23&gender=male', true);
            var obj2 = {name: 'Robert', age: 23, gender: 'male'};
            //expect(_.isEqual(obj1, obj2)).toEqual(true);
        });

        it("removeAllWhitespace()", function() {
            expect(StringUtil.removeAllWhitespace("   a b    c d e f g ")).toEqual("abcdefg");
        });

        it("removeLeadingTrailingWhitespace()", function() {
            expect(StringUtil.removeLeadingTrailingWhitespace("   a b    c d e f g ")).toEqual("a b    c d e f g");
        });

        it("truncate()", function() {
            expect(StringUtil.truncate("Robert is cool and he knows it.", 14)).toEqual("Robert is cool...");
        });

        it("format()", function() {
            expect(StringUtil.format('Robert is {0}. Very {0} and {1}!', 'cool', 'smart')).toEqual('Robert is cool. Very cool and smart!');
        });

        it("paramReplace()", function() {
            expect(StringUtil.paramReplace('?name=Robert&age=23&gender=male', 'gender', 'female')).toEqual('?name=Robert&age=23&gender=female');
        });
    });
});
//http://net.tutsplus.com/tutorials/javascript-ajax/testing-your-javascript-with-jasmine/
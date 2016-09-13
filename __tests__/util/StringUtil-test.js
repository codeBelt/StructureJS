// Load the file that exports the functionality to test
jest.dontMock('../../js/util/StringUtil');  // Don't create mock functions

var StringUtil = require('../../js/util/StringUtil').default;

describe("StringUtil", function() {
    it("getExtension()", function() {
        expect(StringUtil.getExtension("file.exe")).toEqual("exe");
        expect(StringUtil.getExtension("file.exe", true)).toEqual(".exe");
        expect(StringUtil.getExtension("file.jpg.zip")).toEqual("zip");
    });

    it("toSentence()", function() {
        expect(StringUtil.toSentence("liveDown_by/the.River")).toEqual("live down by the river");
        expect(StringUtil.toSentence("liveDown_by-the.River", '-')).toEqual("live-down-by-the-river");
        expect(StringUtil.toSentence("Under 6 00 Calories", '-')).toEqual("under-6-00-calories");
        expect(StringUtil.toSentence("Under 600 Calories", '-')).toEqual("under-600-calories");
        expect(StringUtil.toSentence("hyphenToCamelCase", '/')).toEqual("hyphen/to/camel/case");
        expect(StringUtil.toSentence("HyphenToCamelCase", '_')).toEqual("hyphen_to_camel_case");
        expect(StringUtil.toSentence("Hyphen8to~Camel_Case", ' ')).toEqual("hyphen 8 to camel case");
        expect(StringUtil.toSentence("Hyphen.To~Camel_Case", '~')).toEqual("hyphen~to~camel~case");
        expect(StringUtil.toSentence("Hyphen.To~Camel_Case", '~')).toEqual("hyphen~to~camel~case");
        expect(StringUtil.toSentence(" hyphen To Camel Case ", '.')).toEqual("hyphen.to.camel.case");
    });

    it("toConstantCase()", function() {
        expect(StringUtil.toConstantCase("liveDown_by-the.River")).toEqual("LIVE_DOWN_BY_THE_RIVER");
    });

    it("toCamelCase()", function() {
        expect(StringUtil.toCamelCase("liveDown_by-the.River")).toEqual("liveDownByTheRiver");
        expect(StringUtil.toCamelCase("hyphen-to-camel-case")).toEqual("hyphenToCamelCase");
        expect(StringUtil.toCamelCase("hyphen_to_camel_case")).toEqual("hyphenToCamelCase");
        expect(StringUtil.toCamelCase("hyphen~TO~camel~ CASE")).toEqual("hyphenToCamelCase");
        expect(StringUtil.toCamelCase("Hyphen.TO.camel-CASE")).toEqual("hyphenToCamelCase");
        expect(StringUtil.toCamelCase("HyphenTo camel CASE")).toEqual("hyphenToCamelCase");
        expect(StringUtil.toCamelCase("  H  yphenTo camel CASE")).toEqual("hYphenToCamelCase");
        expect(StringUtil.toCamelCase("HyphenToCamelCase")).toEqual("hyphenToCamelCase");
        expect(StringUtil.toCamelCase("Hyphen8ToCamelCase")).toEqual("hyphen8ToCamelCase");
    });

    it("toPascalCase()", function() {
        expect(StringUtil.toPascalCase("liveDown_by-the.River")).toEqual("LiveDownByTheRiver");
        expect(StringUtil.toPascalCase("hyphen-to-camel-case")).toEqual("HyphenToCamelCase");
        expect(StringUtil.toPascalCase("hyphen_to_camel_case")).toEqual("HyphenToCamelCase");
        expect(StringUtil.toPascalCase("hyphen~TO~camel~ CASE")).toEqual("HyphenToCamelCase");
        expect(StringUtil.toPascalCase("Hyphen.TO.camel-CASE")).toEqual("HyphenToCamelCase");
        expect(StringUtil.toPascalCase("HyphenTo camel CASE")).toEqual("HyphenToCamelCase");
        expect(StringUtil.toPascalCase("  H  yphenTo camel CASE")).toEqual("HYphenToCamelCase");
        expect(StringUtil.toPascalCase("HyphenToCamelCase")).toEqual("HyphenToCamelCase");
        expect(StringUtil.toPascalCase("Hyphen8ToCamelCase")).toEqual("Hyphen8ToCamelCase");
        expect(StringUtil.toPascalCase("hyphenToCamelCase")).toEqual("HyphenToCamelCase");
        expect(StringUtil.toPascalCase("hyphen to camel case")).toEqual("HyphenToCamelCase");
    });

    it("createUUID()", function() {
        //expect(StringUtil.createUUID()).toEqual();
    });

    it("queryStringToObject()", function() {
        var obj1 = StringUtil.queryStringToObject('?name=Robert&age=23&gender=male', true);
        var obj2 = {name: 'Robert', age: 23, gender: 'male'};
        expect(JSON.stringify(obj1)).toEqual(JSON.stringify(obj2));
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
//http://net.tutsplus.com/tutorials/javascript-ajax/testing-your-javascript-with-jasmine/

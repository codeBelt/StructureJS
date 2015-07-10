var ValidationUtil = require('../../js/util/ValidationUtil');

describe("ValidationUtil", function() {
    it("isValidEmailAddress()", function() {
        expect(ValidationUtil.isValidEmailAddress('a@a.org')).toBeTruthy();
        expect(ValidationUtil.isValidEmailAddress('a@b.co-foo.uk')).toBeTruthy();
        expect(ValidationUtil.isValidEmailAddress('a@a.a')).toBeTruthy();
        expect(ValidationUtil.isValidEmailAddress('a+co@a.a')).toBeTruthy();
        expect(ValidationUtil.isValidEmailAddress('first.last@iana.org')).toBeTruthy();
        expect(ValidationUtil.isValidEmailAddress('first.last@123.iana.org')).toBeTruthy();
        expect(ValidationUtil.isValidEmailAddress('asdf@adsf.adsf')).toBeTruthy();
        expect(ValidationUtil.isValidEmailAddress('test@xn--example.com')).toBeTruthy();

        expect(ValidationUtil.isValidEmailAddress('first.last@sub.do,com')).toBeFalsy();
        expect(ValidationUtil.isValidEmailAddress('first\@last@iana.org')).toBeFalsy();
        expect(ValidationUtil.isValidEmailAddress('"first@last"@iana.org')).toBeFalsy();
        expect(ValidationUtil.isValidEmailAddress('"first\\last"@iana.org')).toBeFalsy();
        expect(ValidationUtil.isValidEmailAddress('.first.last@iana.org')).toBeFalsy();
        expect(ValidationUtil.isValidEmailAddress('first..last@iana.org')).toBeFalsy();
        expect(ValidationUtil.isValidEmailAddress('first.last@com')).toBeFalsy();
        expect(ValidationUtil.isValidEmailAddress('nicolas.@gmail..com')).toBeFalsy();
        expect(ValidationUtil.isValidEmailAddress('a@bar.com.')).toBeFalsy();
        expect(ValidationUtil.isValidEmailAddress('test@@iana.org')).toBeFalsy();
        expect(ValidationUtil.isValidEmailAddress('NotAnEmail')).toBeFalsy();
        expect(ValidationUtil.isValidEmailAddress('@NotAnEmail')).toBeFalsy();
        expect(ValidationUtil.isValidEmailAddress('NotAnEmail@asdf')).toBeFalsy();
        expect(ValidationUtil.isValidEmailAddress('a@b')).toBeFalsy();
    });

    it("isValidPhoneNumber()", function() {
        expect(ValidationUtil.isValidPhoneNumber('1234567899')).toBeTruthy();
        expect(ValidationUtil.isValidPhoneNumber('123 456 7899')).toBeTruthy();
        expect(ValidationUtil.isValidPhoneNumber('123-456-7899')).toBeTruthy();
        expect(ValidationUtil.isValidPhoneNumber('123.456.7899')).toBeTruthy();
        expect(ValidationUtil.isValidPhoneNumber('(123)-456-7899')).toBeTruthy();
        expect(ValidationUtil.isValidPhoneNumber('(123).456.7899')).toBeTruthy();
        expect(ValidationUtil.isValidPhoneNumber('(123) 456 7899')).toBeTruthy();
        expect(ValidationUtil.isValidPhoneNumber('1 123-234-4567')).toBeTruthy();
        expect(ValidationUtil.isValidPhoneNumber('1 123.234.4567')).toBeTruthy();

        expect(ValidationUtil.isValidPhoneNumber('3456')).toBeFalsy();
        expect(ValidationUtil.isValidPhoneNumber('123-456-7890appleCoffee')).toBeFalsy();
        expect(ValidationUtil.isValidPhoneNumber('appleCoffee123-456-7890')).toBeFalsy();
    });

    it("isZipCode()", function() {
        expect(ValidationUtil.isZipCode('55067')).toBeTruthy();
        expect(ValidationUtil.isZipCode('55067-4434')).toBeTruthy();
        expect(ValidationUtil.isZipCode('55067 4434')).toBeTruthy();
        expect(ValidationUtil.isZipCode('550674434')).toBeTruthy();

        expect(ValidationUtil.isZipCode('550673')).toBeFalsy();
        expect(ValidationUtil.isZipCode('55067-44343')).toBeFalsy();
        expect(ValidationUtil.isZipCode('55067 44343')).toBeFalsy();
        expect(ValidationUtil.isZipCode('P8N 3G3')).toBeFalsy();
    });

    it("isPostalCode()", function() {
        expect(ValidationUtil.isPostalCode('P8N 3G3')).toBeTruthy();
        expect(ValidationUtil.isPostalCode('p8n 3g3')).toBeTruthy();
        expect(ValidationUtil.isPostalCode('P8N3G3')).toBeTruthy();
        expect(ValidationUtil.isPostalCode('p8n3h3')).toBeTruthy();

        expect(ValidationUtil.isPostalCode('P8N-3G3')).toBeFalsy();
        expect(ValidationUtil.isPostalCode('P8N3G32')).toBeFalsy();
        expect(ValidationUtil.isPostalCode('P8N 3G32')).toBeFalsy();
        expect(ValidationUtil.isPostalCode('ADF REE')).toBeFalsy();
    });

    it("isSocialSecurityNumber()", function() {
        expect(ValidationUtil.isSocialSecurityNumber('178051120')).toBeTruthy();
        expect(ValidationUtil.isSocialSecurityNumber('178-05-1120')).toBeTruthy();

        expect(ValidationUtil.isSocialSecurityNumber('178 05 1120')).toBeFalsy();
        expect(ValidationUtil.isSocialSecurityNumber('178-05-11203')).toBeFalsy();
        expect(ValidationUtil.isSocialSecurityNumber('178 05 11203')).toBeFalsy();
        expect(ValidationUtil.isSocialSecurityNumber('1780511203')).toBeFalsy();
        expect(ValidationUtil.isSocialSecurityNumber('346774')).toBeFalsy();
    });
});
//http://net.tutsplus.com/tutorials/javascript-ajax/testing-your-javascript-with-jasmine/
"use strict";
var ValidationUtil_1 = require("../../../../../../ts/util/ValidationUtil");
var ValidateService = (function () {
    function ValidateService() {
    }
    ValidateService.isValidEmail = function (email) {
        return ValidationUtil_1["default"].isValidEmailAddress(email);
    };
    ValidateService.isNotEmpty = function (value) {
        return ValidationUtil_1["default"].isEmpty(value) === false;
    };
    ValidateService.maxLength = function (num) {
        return function (value) {
            if (num == null) {
                return false;
            }
            return String(value).length <= num;
        };
    };
    ValidateService.isValidPassword = function (password) {
        if (password == null) {
            return false;
        }
        var isValid = 
        // Must be greater than 8 characters
        password.length >= 8
            && password.match(/\s/) === null
            && [
                // Must contain a number
                password.match(/\d/) !== null,
                // Must contain an uppercase letter
                password.match(/[A-Z]/) !== null,
                // Must contain an lowercase letter
                password.match(/[a-z]/) !== null,
                // Must contain a special character
                password.match(/\W/) !== null,
            ]
                .filter(Boolean)
                .length >= 3;
        return isValid;
    };
    ValidateService.isValidZipcode = function (zipCode) {
        return /^\d{5}(?:[-\s]\d{4})?$/.test(zipCode);
    };
    ValidateService.isValidPhoneNumber = function (phoneNumber) {
        return /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/.test(phoneNumber);
    };
    return ValidateService;
}());
exports.__esModule = true;
exports["default"] = ValidateService;
//# sourceMappingURL=ValidateService.js.map
import ValidationUtil from '../../../../../../ts/util/ValidationUtil';

class ValidateService {

    public static isValidEmail(email: string): boolean {
        return ValidationUtil.isValidEmailAddress(email);
    }

    public static isNotEmpty(value: string): boolean {
        return ValidationUtil.isEmpty(value) === false;
    }

    public static maxLength(num: number): Function {
        return (value: string): boolean => {
            if (num == null) {
                return false;
            }

            return String(value).length <= num;
        };
    }

    public static isValidPassword(password: string): boolean {
        if (password == null) {
            return false;
        }

        const isValid: boolean =
            // Must be greater than 8 characters
            password.length >= 8
            // Must not contain spaces
            && password.match(/\s/) === null
            // Must have at least 3 of the following
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
            // Filter out all the false values
                .filter(Boolean)
                // Must have at least 3 of the conditions above
                .length >= 3;

        return isValid;
    }

    public static isValidZipcode(zipCode: string): boolean {
        return /^\d{5}(?:[-\s]\d{4})?$/.test(zipCode);
    }

    public static isValidPhoneNumber(phoneNumber: string): boolean {
        return /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/.test(phoneNumber);
    }

}

export default ValidateService;

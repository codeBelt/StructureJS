import FormViewModel from './FormViewModel';
import ValidateService from '../services/ValidateService';
import FormInputModel from './FormInputModel';

class GuestViewModel extends FormViewModel {

    public firstName: FormInputModel = new FormInputModel({
        validators: [
            ValidateService.isNotEmpty,
        ],
        errorMessage: 'Please enter a first name.',
    });

    public lastName: FormInputModel = new FormInputModel({
        validators: [
            ValidateService.isNotEmpty,
        ],
        errorMessage: 'Please enter a last name.',
    });

    public email: FormInputModel = new FormInputModel({
        validators: [
            ValidateService.isValidEmail,
            ValidateService.maxLength(100),
        ],
        errorMessage: 'Please enter a valid email address',
    });

    constructor(data = {}, opts = {}) {
        super(opts);

        if (data) {
            this.update(data);
        }
    }

    /**
     * @overridden BaseModel.update
     */
    public update(data): void {
        return super.update(data);

        // Override any values after the default super update method has set the values.

    }

}

export default GuestViewModel;

import BaseModel from '../../../../../../ts/model/BaseModel';
import FormInputModel from './FormInputModel';

class FormViewModel extends BaseModel {

    public isValid: boolean = true;
    public generalError: string = null;
    public isSubmittingForm: boolean = false;

    public validate(): void {
        const validationList = [];

        Object
            .keys(this)
            .forEach(propertyName => {
                const property: any = this[propertyName];

                if (property instanceof FormInputModel === true && property.ignoreValidation === false) {
                    const formInputModel: FormInputModel = property;
                    formInputModel.validate();

                    validationList.push(formInputModel.isValid);
                }
            });

        this.isValid = validationList.every(value => value === true);

        this.generalError = null;
    }

    public reset(): void {
        Object
            .keys(this)
            .forEach(propertyName => {
                const property: any = this[propertyName];

                if (property instanceof FormInputModel === true && property.ignoreValidation === false) {
                    const formInputModel: FormInputModel = property;
                    formInputModel.value = null;
                    formInputModel.isValid = true;
                }
            });

        this.isValid = true;

        this.generalError = null;
    }

}

export default FormViewModel;

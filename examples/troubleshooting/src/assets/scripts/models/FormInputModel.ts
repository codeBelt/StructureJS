import BaseModel from '../../../../../../ts/model/BaseModel';

class FormInputModel extends BaseModel {

    public value: any = null;
    public errorMessage: string = '';
    public isValid: boolean = true;
    public validators: Array<any> = [];
    public ignoreValidation: boolean = false;

    constructor(data = {}, opts = {}) {
        super(opts);

        this.update(data);
    }

    /**
     * @overridden BaseModel.update
     */
    public update(data): void {
        super.update(data);

        // Override any values after the default super update method has set the values.
    }

    public validate(): void {
        this.isValid = this
            .validators
            .map(validationFunction => validationFunction(this.value))
            .every(value => value === true);
    }

}

export default FormInputModel;

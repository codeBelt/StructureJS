///<reference path='replace/path/structurejs/ts/model/ValueObject.ts'/>
///<reference path='replace/path/structurejs/ts/interface/IValueObject.ts'/>

module ${Namespace} {

    import ValueObject = StructureTS.ValueObject;
    import IValueObject = StructureTS.IValueObject;

    /**
     * TODO: YUIDoc_comment
     *
     * @class ${NAME}
     * @param [data] {any} Provide a way to update the value object upon initialization.
     * @extends ValueObject
     * @module ${Namespace}
     * @constructor
     **/
    export class ${NAME} extends ValueObject {

        constructor(data:any = null) {
            super();

            if (data) {
                this.update(data);
            }
        }

        /**
         * @overridden ValueObject.update
         */
        public update(data:any):void {
            super.update(data);

            // Override any values after the default super update method has set the values.
        }

    }
}

///<reference path='com/codebelt/structurets/model/ValueObject.ts'/>
///<reference path='com/codebelt/structurets/interface/IValueObject.ts'/>

module ${Namespace} {

    import ValueObject = StructureTS.ValueObject;
    import IValueObject = StructureTS.IValueObject;

    /**
     * TODO_YUIDoc_comment
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

        }

        /**
         * @overridden ValueObject.copy
         */
        public copy():${NAME} {
            var data:IValueObject = super.copy();
            return new ${NAME}(data);
        }

    }
}
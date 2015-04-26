///<reference path='../ValueObject.ts'/>
///<reference path='../../interface/IValueObject.ts'/>

module StructureJS
{
    export class StatusVO extends ValueObject
    {
        /**
         * TODO: YUIDoc_comment
         *
         * @property ERROR
         * @type {string}
         * @public
         */
        public static ERROR:string = 'error';

        /**
         * TODO: YUIDoc_comment
         *
         * @property SUCCESS
         * @type {string}
         * @public
         */
        public static SUCCESS:string = 'success';

        public status:string = null;
        public message:string = null;
        public code:number = null;

        /**
         * TODO: YUIDoc_comment
         *
         * @class StatusVO
         * @param [data] {any} Provide a way to update the value object upon initialization.
         * @extends ValueObject
         * @module StructureJS
         * @constructor
         * @author Robert S. (www.codeBelt.com)
         */
        constructor(data:any = null)
        {
            super();

            if (data)
            {
                this.update(data);
            }
        }

        /**
         * @overridden ValueObject.update
         */
        public update(data:any):void
        {
            super.update(data);

            // Override any values after the default super update method has set the values.
        }

    }
}
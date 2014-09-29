///<reference path='../ValueObject.ts'/>
///<reference path='../../interface/IValueObject.ts'/>

module StructureTS
{
    export class StatusVO extends ValueObject
    {
        /**
         * YUIDoc_comment
         *
         * @property ERROR
         * @type {string}
         * @public
         */
        public static ERROR:string = 'error';

        /**
         * YUIDoc_comment
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
         * YUIDoc_comment
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
            this.status = data.status;
            this.message = data.message;
            this.code = data.code;
        }

        /**
         * @overridden ValueObject.copy
         */
        public copy():StatusVO
        {
            var data:IValueObject = super.copy();
            return new StatusVO(data);
        }
    }
}
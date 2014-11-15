///<reference path='../ValueObject.ts'/>
///<reference path='../../interface/IValueObject.ts'/>

module StructureTS
{
    export class LanguageConfigVO extends ValueObject
    {
        public id:string;
        public lang:string;
        public text:string;
        public path:string;

        /**
         * TODO: YUIDoc_comment
         *
         * @class LanguageConfigVO
         * @param [data] {any} Provide a way to update the value object upon initialization.
         * @constructor
         * @author Robert S. (www.codeBelt.com)
         * @module StructureJS
         * @version 0.1.0
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
        public update(data:any):any
        {
            this.id = data.id;
            this.lang = data.lang;
            this.text = data.text;
            this.path = data.path;

            return this;
        }

        /**
         * @overridden ValueObject.copy
         */
        public copy():LanguageConfigVO
        {
            var data:IValueObject = super.copy();
            return new LanguageConfigVO(data);
        }
    }
}
///<reference path='replace/path/${Extends}.ts'/>

module ${Namespace} {

    import ${Extends} = StructureTS.${Extends};

    /**
     * TODO: YUIDoc_comment
     *
     * @class ${NAME}
     * @extends ${Extends}
     * @module ${Namespace}
     * @constructor
     **/
    export class ${NAME} extends ${Extends} {

        constructor() {
            super();
        }

        /**
         * @overridden ${Extends}.createChildren
         */
        public createChildren():void {
            super.createChildren();

            // Create and add your child objects to this parent class.
        }

        /**
         * @overridden ${Extends}.layoutChildren
         */
        public layoutChildren():void {
            // Layout or update the child objects in this parent class.
        }

        /**
         * @overridden ${Extends}.enable
         */
        public enable():void {
            if (this.isEnabled === true) { return; }

            // Enable the child objects and add any event listeners.

            super.enable();
        }

        /**
         * @overridden ${Extends}.disable
         */
        public disable():void {
            if (this.isEnabled === false) { return; }

            // Disable the child objects and remove any event listeners.

            super.disable();
        }

        /**
         * @overridden ${Extends}.destroy
         */
        public destroy():void {
            //  Destroy the child objects and references in this parent class to prevent memory leaks.

            super.destroy();
        }

    }
}
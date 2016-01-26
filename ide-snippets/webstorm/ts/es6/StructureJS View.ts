import ${Extends} from 'replace/path/${Extends}';

/**
 * TODO: YUIDoc_comment
 *
 * @class ${NAME}
 * @extends ${Extends}
 * @constructor
 **/
class ${NAME} extends ${Extends} {

    constructor() {
        super();
    }

    /**
     * @overridden ${Extends}.create
     */
    public create():void {
        super.create();

        // Create or setup objects in this parent class.
    }

    /**
     * @overridden ${Extends}.enable
     */
    public enable():void {
        if (this.isEnabled === true) { return; }

        // Enable the child objects and/or add any event listeners.

        super.enable();
    }

    /**
     * @overridden ${Extends}.disable
     */
    public disable():void {
        if (this.isEnabled === false) { return; }

        // Disable the child objects and/or remove any event listeners.

        super.disable();
    }

    /**
     * @overridden ${Extends}.layout
     */
    public layout():void {
        // Layout or update the objects in this parent class.
    }

    /**
     * @overridden ${Extends}.destroy
     */
    public destroy():void {
        this.disable();

        // Call destroy on any child objects.
        // This super method will also null out your properties for garbage collection.

        super.destroy();
    }

}

export default ${NAME};
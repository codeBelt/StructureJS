import DOMElement = require('../vendor/structurejs/ts/display/DOMElement');

/**
 * TODO: YUIDoc_comment
 *
 * @class ${NAME}
 * @extends ${Extends}
 * @constructor
 **/
class ${NAME} extends DOMElement {

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
     * @overridden ${Extends}.layout
     */
    public layout():void {
        // Layout or update the objects in this parent class.
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
     * @overridden ${Extends}.destroy
     */
    public destroy():void {
        // Call destroy on any child objects that is needed.
        // This super method will also null out all properties automatically to prevent memory leaks.

        super.destroy();
    }

}

export = ${NAME};
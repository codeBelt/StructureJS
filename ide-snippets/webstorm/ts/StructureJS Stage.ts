import Stage = require('../vendor/structurejs/ts/display/Stage');

/**
 * TODO: YUIDoc_comment
 *
 * @class ${NAME}
 * @extends Stage
 * @constructor
 **/
class ${NAME} extends Stage {

    constructor() {
        super();
    }

    /**
     * @overridden Stage.create
     */
    public create():void {
        super.create();

        // Create or setup objects in this parent class.
    }

    /**
     * @overridden Stage.enable
     */
    public enable():void {
        if (this.isEnabled === true) { return; }

        // Enable the child objects and/or add any event listeners.

        super.enable();
    }

    /**
     * @overridden Stage.disable
     */
    public disable():void {
        if (this.isEnabled === false) { return; }

        // Disable the child objects and/or remove any event listeners.

        super.disable();
    }

    /**
     * @overridden Stage.layout
     */
    public layout():void {
        // Layout or update the objects in this parent class.
    }

    /**
     * @overridden Stage.destroy
     */
    public destroy():void {
        // Call destroy on any child objects that is needed.
        // This super method will also null out all properties automatically to prevent memory leaks.

        super.destroy();
    }

}

export = ${NAME};
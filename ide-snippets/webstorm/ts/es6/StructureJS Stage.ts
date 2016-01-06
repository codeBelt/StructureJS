import Stage from '../vendor/structurejs/ts/display/Stage';

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
     * @overridden Stage.onEnabled
     */
    public onEnabled():void {
        // Enable the child objects and/or add any event listeners.
    }

    /**
     * @overridden Stage.onDisabled
     */
    public onDisabled():void {
        // Disable the child objects and/or remove any event listeners.
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
        this.disable();

        // Call destroy on any child objects.
        // This super method will also null out your properties for garbage collection.

        super.destroy();
    }

}

export default ${NAME};
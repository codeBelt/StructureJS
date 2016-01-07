import DOMElement from 'structurejs/display/DOMElement';

/**
 * TODO: YUIDoc_comment
 *
 * @class MenuView
 * @extends DOMElement
 * @constructor
 **/
class MenuView extends DOMElement {

    constructor(routerEvent) {
        super();
    }

    /**
     * @overridden DOMElement.create
     */
    create() {
        super.create('templates/precompile/pages/MenuView');

        // Create or setup objects in this parent class.
    }

    /**
     * @overridden DOMElement.onEnabled
     */
    onEnabled() {
        // Enable the child objects and/or add any event listeners.
    }

    /**
     * @overridden DOMElement.onDisabled
     */
    onDisabled() {
        // Disable the child objects and/or remove any event listeners.
    }

    /**
     * @overridden DOMElement.layout
     */
    layout() {
        // Layout or update the objects in this parent class.
    }

    /**
     * @overridden DOMElement.destroy
     */
    destroy() {
        this.disable();

        // Call destroy on any child objects.
        // This super method will also null out your properties for garbage collection.

        super.destroy();
    }

}

export default MenuView;

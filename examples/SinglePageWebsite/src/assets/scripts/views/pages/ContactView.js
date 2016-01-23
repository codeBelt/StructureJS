import DOMElement from 'structurejs/display/DOMElement';

/**
 * TODO: YUIDoc_comment
 *
 * @class ContactView
 * @extends DOMElement
 * @constructor
 **/
class ContactView extends DOMElement {

    /**
     * @property _routerEvent
     * @type {RouterEvent}
     * @private
     */
    _routerEvent = null;

    constructor(routerEvent) {
        super();

        this._routerEvent = routerEvent;
    }

    /**
     * @overridden DOMElement.create
     */
    create() {
        super.create('templates/precompile/pages/ContactView', this._routerEvent.query);

        // Create or setup objects in this parent class.
    }

    /**
     * @overridden DOMElement.enable
     */
    enable() {
        if (this.isEnabled === true) { return; }

        // Enable the child objects and/or add any event listeners.

        super.enable();
    }

    /**
     * @overridden DOMElement.disable
     */
    disable() {
        if (this.isEnabled === false) { return; }

        // Disable the child objects and/or remove any event listeners.

        super.disable();
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

export default ContactView;

import DOMElement from 'structurejs/display/DOMElement';
import BaseEvent from 'structurejs/event/BaseEvent';

import GameModel from '../../models/GameModel';

/**
 * TODO: YUIDoc_comment
 *
 * @class DeviceButton
 * @extends DOMElement
 * @constructor
 **/
class DeviceButton extends DOMElement {

    /**
     * @property _color
     * @type {string}
     * @private
     */
    _color = null;

    /**
     * @property _indexId
     * @type {number}
     * @public
     */
    _indexId = null;

    constructor(color, index) {
        super();

        this._color = color;
        this._indexId = index;
    }

    /**
     * @overridden DOMElement.create
     */
    create() {
        super.create('templates/precompile/DeviceButton', {buttonColor: this._color});
    }

    /**
     * @overridden DOMElement.enable
     */
    enable() {
        if (this.isEnabled === true) { return; }

        this.$element.addEventListener('click', this._onClick, this);
        this.$element.css('cursor','pointer');

        super.enable();
    }

    /**
     * @overridden DOMElement.disable
     */
    disable() {
        if (this.isEnabled === false) { return; }

        this.$element.removeEventListener('click', this._onClick, this);
        this.$element.css('cursor','default');

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

    //////////////////////////////////////////////////////////////////////////////////
    // HELPER METHOD
    //////////////////////////////////////////////////////////////////////////////////

    /**
     * A helper method to trigger the CSS transitions.
     *
     * @method animate
     * @public
     */
    animate() {
        this.$element.addClass('active');

        setTimeout(() => {
            this.$element.removeClass('active');
        }, 250);
    }

    //////////////////////////////////////////////////////////////////////////////////
    // EVENT HANDLERS
    //////////////////////////////////////////////////////////////////////////////////

    /**
     * On click of the button it will animate itself and dispatch an event so the SimonApp
     * can respond to the CHANGE event. Probably should of create and dispatched a custom event.
     *
     * @method _onClick
     * @param event {jQueryEventObject}
     * @private
     */
    _onClick(event) {
        event.preventDefault();

        this.animate();

        let gameModel = new GameModel();
        gameModel.buttonIndex = this._indexId;

        this.dispatchEvent(new BaseEvent(BaseEvent.CHANGE, true, true, gameModel));
    }

}

export default DeviceButton;

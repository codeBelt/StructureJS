import DOMElement from 'structurejs/display/DOMElement';

import DeviceButton from './components/DeviceButton';

/**
 * TODO: YUIDoc_comment
 *
 * @class DeviceView
 * @extends DOMElement
 * @constructor
 **/
class DeviceView extends DOMElement {

    /**
     * @property _redButton
     * @type {DeviceButton}
     * @private
     */
    _redButton = null;

    /**
     * @property _greenButton
     * @type {DeviceButton}
     * @private
     */
    _greenButton = null;

    /**
     * @property _yellowButton
     * @type {DeviceButton}
     * @private
     */
    _yellowButton = null;

    /**
     * @property _blueButton
     * @type {DeviceButton}
     * @private
     */
    _blueButton = null;

    /**
     * A list of the buttons so we can get the correct one by this index
     * number being passed into animateButton method.
     *
     * @property _buttonList
     * @type {DeviceButton[]}
     * @private
     */
    _buttonList = null;

    constructor($element) {
        super($element);
    }

    /**
     * @overridden DOMElement.create
     */
    create() {
        super.create();

        this._buttonList = [];

        this._blueButton = new DeviceButton('blue', 0);
        this.addChild(this._blueButton);

        this._redButton = new DeviceButton('red', 1);
        this.addChildAt(this._redButton, 0);// Example of the addChildAt method.

        this._greenButton = new DeviceButton('green', 2);
        this.addChild(this._greenButton);

        this._yellowButton = new DeviceButton('yellow', 3);
        this.addChild(this._yellowButton);

        this.swapChildren(this._blueButton, this._greenButton);// Example of the swapChildren method.

        // Hold on to the colored buttons in the same order as there index id.
        this._buttonList.push(this._blueButton);
        this._buttonList.push(this._redButton);
        this._buttonList.push(this._greenButton);
        this._buttonList.push(this._yellowButton);
    }

    /**
     * @overridden DOMElement.onEnabled
     */
    onEnabled() {
        this._redButton.enable();
        this._greenButton.enable();
        this._blueButton.enable();
        this._yellowButton.enable();
    }

    /**
     * @overridden DOMElement.onDisabled
     */
    onDisabled() {
        this._redButton.disable();
        this._greenButton.disable();
        this._blueButton.disable();
        this._yellowButton.disable();
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

        this._redButton.destroy();
        this._greenButton.destroy();
        this._blueButton.destroy();
        this._yellowButton.destroy();

        super.destroy();
    }

    //////////////////////////////////////////////////////////////////////////////////
    // HELPER METHOD
    //////////////////////////////////////////////////////////////////////////////////

    /**
     * This method accepts a index position for the _buttonList array and will
     * call the animate method on that button.
     *
     * @method animateButton
     * @param buttonIndex {int}
     * @public
     */
    animateButton(buttonIndex) {
        let deviceButton = this._buttonList[buttonIndex];
        deviceButton.animate();
    }

}

export default DeviceView;

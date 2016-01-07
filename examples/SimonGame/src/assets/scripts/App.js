import Stage from 'structurejs/display/Stage';
import DOMElement from 'structurejs/display/DOMElement';
import BaseEvent from 'structurejs/event/BaseEvent';
import Timer from 'structurejs/util/Timer';
import TimerEvent from 'structurejs/event/TimerEvent';

import DeviceView from './views/DeviceView';

/**
 * TODO: YUIDoc_comment
 *
 * @class App
 * @extends Stage
 * @constructor
 **/
class App extends Stage {

    /**
     * A view that contains the color buttons.
     *
     * @property _deviceView
     * @type {DeviceView}
     * @private
     */
    _deviceView = null;

    /**
     * The white center button for the game to start the game.
     *
     * @property _centerDisplay
     * @type {DOMElement}
     * @private
     */
    _centerDisplay = null;

    /**
     * Timer to play the sequence the user needs to remember.
     *
     * @property _timer
     * @type {Timer}
     * @private
     */
    _timer = null;

    constructor() {
        super();
    }

    /**
     * @overridden DOMElement.create
     */
    create() {
        super.create();

        let $device = this.$element.find('.js-simonApp-device');

        this._deviceView = new DeviceView($device);
        this.addChild(this._deviceView);
        this._deviceView.disable();

        this._centerDisplay = new DOMElement('div', {'class': 'display'});
        this._deviceView.addChild(this._centerDisplay);
    }

    /**
     * @overridden DOMElement.onEnabled
     */
    onEnabled() {
        this.addEventListener(BaseEvent.CHANGE, this._onClickColorBtn, this);

        this._centerDisplay.$element.addEventListener('click', this._onClick, this);
    }

    /**
     * @overridden DOMElement.onDisabled
     */
    onDisabled() {
        this.removeEventListener(BaseEvent.CHANGE, this._onClickColorBtn, this);

        this._centerDisplay.$element.removeEventListener('click', this._onClick, this);
    }

    /**
     * @overridden DOMElement.layout
     */
    layout() {
        if (this._deviceView.isEnabled === true) {
            this._centerDisplay.$element.text('Go!');
        } else {
            this._centerDisplay.$element.text('Start!');
        }
    }

    /**
     * @overridden DOMElement.destroy
     */
    destroy() {
        this.disable();

        this._deviceView.destroy();
        this._centerDisplay.destroy();
        this._timer.destroy();

        super.destroy();
    }

    //////////////////////////////////////////////////////////////////////////////////
    // EVENT HANDLERS
    //////////////////////////////////////////////////////////////////////////////////

    /**
     * Each time the timer ticks this method is called and animates one of the colored buttons.
     *
     * @method _onTimer
     * @param event {TimerEvent}
     * @private
     */
    _onTimer(event) {
        let timer = event.target;
        let sequenceSteps = this._memoryOrder.length - 1;
        let currentIndex = sequenceSteps - timer.getCurrentCount();
        let showItem = this._memoryOrder[currentIndex];

        this._deviceView.animateButton(showItem);
    }

    /**
     * When the memory sequence completes this method will enable the color buttons and
     * will update the white button text by calling the layout method.
     *
     * @method _onTimerComplete
     * @param event {TimerEvent}
     * @private
     */
    _onTimerComplete(event) {
        this._timer.destroy();

        this._deviceView.enable();
        this.layout();
    }

    /**
     * For every CHANGE event that is dispatched by the DeviceButton's this method will help keep
     * track of the buttons clicked and then will determine if the user click the colored buttons
     * in the correct sequence.
     *
     * @method _onClickColorBtn
     * @param event {BaseEvent}
     * @private
     */
    _onClickColorBtn(event) {
        let gameModel = event.data;
        this._userSequence.push(gameModel.buttonIndex);

        if (this._userSequence.length === this._memoryOrder.length) {
            let isMatch = this._userSequence.toString() === this._memoryOrder.toString();
            if (isMatch) {
                alert('You did it!');
            } else {
                alert('Nope, you did not get it.');
            }
            this._userSequence = [];
            this._deviceView.disable();
            this.layout();
        }
    }

    /**
     * When the white center button is clicked this will set the memory sequence and start a timer
     * which will play the sequence for the user to remember.
     *
     * @method _onClick
     * @param event {jQueryEventObject}
     * @private
     */
    _onClick(event) {
        event.preventDefault();

        this._centerDisplay.$element.text('');

        this._memoryOrder = [0,2,3,1,2,2];
        this._userSequence = [];

        this._timer =  new Timer(1500, this._memoryOrder.length);
        this._timer.addEventListener(TimerEvent.TIMER, this._onTimer, this);
        this._timer.addEventListener(TimerEvent.TIMER_COMPLETE, this._onTimerComplete, this);
        this._timer.start();
    }

}

export default App;

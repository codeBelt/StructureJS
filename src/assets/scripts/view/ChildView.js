define(function (require, exports, module) {
    'use strict';

    // Imports
    var Extend = require('structurejs/util/Extend');
    var DOMElement = require('structurejs/display/DOMElement');
    var BaseEvent = require('structurejs/event/BaseEvent');
    var EventBroker = require('structurejs/event/EventBroker');

    /**
     * YUIDoc_comment
     *
     * @class ChildView
     * @extends DOMElement
     * @constructor
     **/
    var ChildView = (function () {

        var _super = Extend(ChildView, DOMElement);

        function ChildView() {
            _super.call(this);

            /**
             * @overridden DOMElement.CLASS_NAME
             */
            this.CLASS_NAME = 'ChildView';

            this._panelContainer = null;
            this._dispatchButton = null;
            this._sonMessage = null;
        }

        /**
         * @overridden DOMElement.createChildren
         */
        ChildView.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this, '#containerTemplate', { title: this.getQualifiedClassName() });

            this._panelContainer = this.getChild('.js-panelContent');

            this._dispatchButton = new DOMElement('button', { 'class': 'button_dispatch', text: 'Dispatch Event' });
            this._panelContainer.addChild(this._dispatchButton);

            this._sonMessage = this.getChild('.js-message');
        }

        /**
         * @overridden DOMElement.layoutChildren
         */
        ChildView.prototype.layoutChildren = function () {
            this._sonMessage.$element.css('opacity', 0);

            return this;
        }

        /**
         * @overridden DOMElement.enable
         */
        ChildView.prototype.enable = function () {
            if (this.isEnabled === true) return;

            this.addEventListener(BaseEvent.CHANGE, this.onBubbled, this);

            this._dispatchButton.$element.addEventListener('click', this.onButtonClick, this);

            return _super.prototype.enable.call(this);
        }

        /**
         * @overridden DOMElement.disable
         */
        ChildView.prototype.disable = function () {
            if (this.isEnabled === false) return;

            this.removeEventListener(BaseEvent.CHANGE, this.onBubbled, this);

            this._dispatchButton.$element.removeEventListener('click', this.onButtonClick, this);

            return _super.prototype.disable.call(this);
        }

        /**
         * @overridden DOMElement.destroy
         */
        ChildView.prototype.destroy = function () {
            _super.prototype.destroy.call(this);

            this._dispatchButton.destroy();
            this._dispatchButton = null;

            this._panelContainer.destroy();
            this._panelContainer = null;
        }

        ChildView.prototype.onButtonClick = function (event) {
            event.preventDefault();

            this.dispatchEvent(new BaseEvent(BaseEvent.CHANGE, true, true));
            EventBroker.dispatchEvent(new BaseEvent(BaseEvent.CHANGE, true, true));
        }

        ChildView.prototype.onBubbled = function (event) {
            var checkbox = this._panelContainer.$element.find('[type=checkbox]').first().prop('checked');

            if (checkbox == true) {
                event.stopPropagation();
            }

            this._sonMessage.$element.css('opacity', 1);
        }

        return ChildView;
    })();

    module.exports = ChildView;

});

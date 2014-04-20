define(function (require, exports, module) {
    'use strict';

    // Imports
    var Extend = require('structurejs/util/Extend');
    var DOMElement = require('structurejs/display/DOMElement');
    var BaseEvent = require('structurejs/event/BaseEvent');
    var ChildView = require('view/ChildView');
    var ContainerTemplate = require('hbs!templates/ContainerTemplate');

    /**
     * YUIDoc_comment
     *
     * @class ParentView
     * @extends DOMElement
     * @constructor
     **/
    var ParentView = (function () {

        var _super = Extend(ParentView, DOMElement);

        function ParentView() {
            _super.call(this);

            /**
             * @overridden DOMElement.CLASS_NAME
             */
            this.CLASS_NAME = 'ParentView';
            this._panelContainer = null;
            this._childView = null;
            this._parentMessage = null;
        }

        /**
         * @overridden DOMElement.createChildren
         */
        ParentView.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this, ContainerTemplate, { title: this.getQualifiedClassName() });

            this._panelContainer = this.getChild('.js-panelContent');

            this._childView = new ChildView();
            this._panelContainer.addChild(this._childView);

            this._parentMessage = this.getChild('.js-message');
        }

        /**
         * @overridden DOMElement.layoutChildren
         */
        ParentView.prototype.layoutChildren = function () {
            this._parentMessage.$element.css('opacity', 0);
            this._childView.layoutChildren();

            return this;
        }

        /**
         * @overridden DOMElement.enable
         */
        ParentView.prototype.enable = function () {
            if (this.isEnabled === true) return this;

            this.addEventListener(BaseEvent.CHANGE, this.onBubbled, this);

            this._childView.enable();

            return _super.prototype.enable.call(this);
        }

        /**
         * @overridden DOMElement.disable
         */
        ParentView.prototype.disable = function () {
            if (this.isEnabled === false) return this;

            this.removeEventListener(BaseEvent.CHANGE, this.onBubbled, this);

            this._childView.disable();

            return _super.prototype.disable.call(this);
        }

        /**
         * @overridden DOMElement.destroy
         */
        ParentView.prototype.destroy = function () {
            _super.prototype.destroy.call(this);

            this._childView.destroy();
            this._childView = null;

            this._panelContainer.destroy();
            this._panelContainer = null;
        }

        ParentView.prototype.onBubbled = function (event) {
            var checkbox = this._panelContainer.$element.find('[type=checkbox]').first().prop('checked');

            if (checkbox == true) {
                event.stopPropagation();
            }

            this._parentMessage.$element.css('opacity', 1);
        }

        return ParentView;
    })();

    module.exports = ParentView;

});

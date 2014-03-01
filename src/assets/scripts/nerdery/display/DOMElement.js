define(function(require, exports, module) {
    'use strict';

    var jQuery = require('nerdery/plugin/jquery.eventListener');
    var Extend = require('nerdery/util/Extend');
    var DisplayObjectContainer = require('nerdery/display/DisplayObjectContainer');
    var BaseEvent = require('nerdery/event/BaseEvent');
    var TemplateFactory = require('nerdery/util/TemplateFactory');

    var DOMElement = (function () {

        var _super = Extend(DOMElement, DisplayObjectContainer);

        /**
         * The {{#crossLink "DOMElement"}}{{/crossLink}} class is the base class for all objects that can be placed into the HTML DOM.
         *
         * @class DOMElement
         * @extends DisplayObjectContainer
         * @module StructureTS
         * @submodule view
         * @constructor
         * @version 0.1.2
         **/
        function DOMElement(type, params) {
            if (typeof type === "undefined") { type = null; }
            if (typeof params === "undefined") { params = null; }

            _super.call(this);

            /**
             * @overridden DisplayObjectContainer.CLASS_NAME
             */
            this.CLASS_NAME = 'DOMElement'

            /**
             * Whether or not the display object is visible. Display objects that are not visible are disabled.
             * For example, if visible=false for an InteractiveObject instance, it cannot be clicked.
             *
             * @property _isVisible
             * @type {boolean}
             * @default true
             * @private
             */
            this._isVisible = true;

            /**
             * A cached of the DOM Element.
             *
             * @property element
             * @type {Element}
             * @default null
             */
            this.element = null;

            /**
             * A cached jQuery object for the view's element.
             *
             * @property $element
             * @type {JQuery}
             * @default null
             */
            this.$element = null;

            /**
             * Holds onto the value passed into the constructor.
             *
             * @property _type
             * @type {string}
             * @default null
             */
            this._type = null;

            /**
             * Holds onto the value passed into the constructor.
             *
             * @property _params
             * @type {any}
             * @default null
             */
            this._params = null;

            if (type) {
                this._type = type;
                this._params = params;
            }
        }

        /**
         * @overridden DisplayObjectContainer.createChildren
         */
        DOMElement.prototype.createChildren = function (type, params) {
            if (typeof type === "undefined") { type = 'div'; }
            if (typeof params === "undefined") { params = null; }
            // Use the data passed into the constructor first else use the arguments from createChildren.
            type = this._type || type;
            params = this._params || params;

            // If the raw element is not null it must of been set before this addChild was called and
            // we should it as the element for this display object.
            if (this.element != null) {
                this.$element = jQuery(this.element);
                return this;
            }

            if (!this.$element) {
                var html = TemplateFactory.createTemplate(type, params);
                if (html) {
                    this.$element = jQuery(html);
                } else {
                    this.$element = jQuery("<" + type + "/>", params);
                }
            }

            this.element = this.$element[0];

            return this;
        };

        /**
         * @overridden DisplayObjectContainer.addChild
         * @example
         *      container.addChild(domElementInstance);
         * @method addChild
         * @param child {DOMElement} The DOMElement instance to add as a child of this object instance.
         * @returns {DOMElement} Returns an instance of itself.
         * @chainable
         */
        DOMElement.prototype.addChild = function (child) {
            _super.prototype.addChild.call(this, child);

            if (this.$element == null) {
                throw new Error('[' + this.getQualifiedClassName() + '] You cannot use the addChild method if the parent object is not added to the DOM.');
            }

            if (!child.isCreated) {
                child.createChildren(); // Render the item before adding to the DOM
                child.isCreated = true;
            }

            // Adds the cid to the DOM element so we can know what what Class object the element belongs too.
            child.$element.attr('data-cid', child.cid);

            child.$element.addEventListener('DOMNodeInsertedIntoDocument', child, this.onAddedToDom, this);
            this.$element.append(child.$element);

            child.layoutChildren();

            return this;
        };

        /**
         * Gets called when the child object is added to the DOM.
         * The method will call {{#crossLink "DOMElement/layoutChildren:method"}}{{/crossLink}} and dispatch the BaseEvent.ADDED event.
         *
         * @method onDomAdded
         * @param event {JQueryEventObject}
         * @private
         */
        DOMElement.prototype.onAddedToDom = function (event) {
            var child = event.data;
            child.$element.removeEventListener('DOMNodeInsertedIntoDocument', this.onAddedToDom, this);
            child.layoutChildren();
            child.dispatchEvent(new BaseEvent(BaseEvent.ADDED));
        };

        /**
         * @overridden DisplayObjectContainer.addChildAt
         */
        DOMElement.prototype.addChildAt = function (child, index) {
            var children = this.$element.children();
            var length = children.length;

            // If the index passed in is less than 0 and greater than
            // the total number of children then place the item at the end.
            if (index < 0 || index >= length) {
                this.addChild(child);
            } else {
                if (!child.isCreated) {
                    child.createChildren(); // Render the item before adding to the DOM
                    child.isCreated = true;
                }
                child.$element.addEventListener('DOMNodeInsertedIntoDocument', child, this.onAddedToDom, this);
                child.layoutChildren();

                // Adds the child at a specific index but also will remove the child from another parent object if one exists.
                _super.prototype.addChildAt.call(this, child, index);

                // Adds the child before the a child already in the DOM.
                jQuery(children.get(index)).before(child.$element);
            }

            return this;
        };

        /**
         * @overridden DisplayObjectContainer.swapChildren
         */
        DOMElement.prototype.swapChildren = function (child1, child2) {
            var child1Index = child1.$element.index();
            var child2Index = child2.$element.index();

            this.addChildAt(child1, child2Index);
            this.addChildAt(child2, child1Index);

            return this;
        };

        /**
         *
         * @method getChildAt
         * @param index {number}
         * @returns {DOMElement}
         * @public
         */
        DOMElement.prototype.getChildAt = function (index) {
            return _super.prototype.getChildAt.call(this, index);
        };

        /**
         * Returns a DOMElement object with the first found DOM element by the passed in selector.
         *
         * @method getChild
         * @param selector {string} DOM id name, DOM class name or a DOM tag name.
         * @returns {DOMElement}
         * @override
         * @public
         */
        DOMElement.prototype.getChild = function (selector) {
            // Get the first match from the selector passed in.
            var jQueryElement = this.$element.find(selector).first();
            if (jQueryElement.length == 0) {
                throw new TypeError('[' + this.getQualifiedClassName() + '] getChild(' + selector + ') Cannot find DOM $element');
            }

            // Check to see if there the element already has a cid value and is a child of this parent object.
            var cid = jQueryElement.data('cid');
            var domElement = this.getChildByCid(cid);

            // Creates a DOMElement from the jQueryElement.
            if (domElement == null) {
                // Create a new DOMElement and assign the jQuery element to it.
                domElement = new DOMElement();
                domElement.$element = jQueryElement;
                domElement.$element.attr('data-cid', domElement.cid);
                domElement.element = jQueryElement[0];
                domElement.isCreated = true;

                // Added to the super addChild method because we don't need to append the element to the DOM.
                // At this point it already exists and we are just getting a reference to the DOM element.
                _super.prototype.addChild.call(this, domElement);
            }

            return domElement;
        };

        /**
         * Gets all the HTML elements children of this object.
         *
         * @method getChildren
         * @param [selector] {string} You can pass in any type of jQuery selector. If there is no selector passed in it will get all the children this parent element.
         * @returns {Array} Returns a list of DOMElement's. It will grab all children HTML DOM elements of this object and will create a DOMElement for each DOM child.
         * If the 'data-cid' property exists is on an HTML element a DOMElement will not be create for that element because it will be assumed it already exists as a DOMElement.
         */
        DOMElement.prototype.getChildren = function (selector) {
            if (typeof selector === "undefined") { selector = ''; }
            //TODO: Make sure the index of the children added is the same as the what is in the actual DOM.
            var $child;
            var domElement;
            var $list = this.$element.children(selector);

            var listLength = $list.length;
            for (var i = 0; i < listLength; i++) {
                $child = jQuery($list[i]);

                // If the jQuery element already has cid data property then must be an existing DisplayObjectContainer (DOMElement) in the children array.
                if (!$child.data('cid')) {
                    domElement = new DOMElement();
                    domElement.$element = $child;
                    domElement.$element.attr('data-cid', domElement.cid);
                    domElement.element = $child.get(0);
                    domElement.isCreated = true;

                    // Added to the super addChild method because we don't need to append the element to the DOM.
                    // At this point it already exists and we are just getting a reference to the DOM element.
                    _super.prototype.addChild.call(this, domElement);
                }
            }

            return this.children;
        };

        /**
         * Removes the specified child object instance from the child list of the parent object instance.
         * The parent property of the removed child is set to null , and the object is garbage collected if no other references
         * to the child exist. The index positions of any objects above the child in the parent object are decreased by 1.
         *
         * @method removeChild
         * @param child {DOMElement} The DisplayObjectContainer instance to remove.
         * @returns {DOMElement} Returns an instance of itself.
         * @override
         * @public
         * @chainable
         */
        DOMElement.prototype.removeChild = function (child) {
            child.$element.unbind();
            child.$element.remove();

            _super.prototype.removeChild.call(this, child);

            return this;
        };

        /**
         * Removes all child object instances from the child list of the parent object instance.
         * The parent property of the removed children is set to null , and the objects are garbage collected if no other
         * references to the children exist.
         *
         * @method removeChildren
         * @returns {DOMElement} Returns an instance of itself.
         * @override
         * @public
         * @chainable
         */
        DOMElement.prototype.removeChildren = function () {
            _super.prototype.removeChildren.call(this);

            this.$element.empty();

            return this;
        };

        /**
         * Indicates the alpha transparency value of the object specified. Valid values are 0 (fully transparent)
         * to 1 (fully opaque). The default value is 1. Display objects with alpha set to 0 are active, even though
         * they are invisible.
         *
         * @method alpha
         * @param number
         * @returns {DOMElement} Returns an instance of itself.
         * @chainable
         */
        DOMElement.prototype.alpha = function (number) {
            this.$element.css('opacity', number);
            return this;
        };

        /**
         *
         * @method visible
         * @param value
         * @returns {any}
         */
        DOMElement.prototype.visible = function (value) {
            if (value == false) {
                this._isVisible = false;
                this.$element.hide();
            } else if (value == true) {
                this._isVisible = true;
                this.$element.show();
            } else if (value == undefined) {
                return this._isVisible;
            }
            return this;
        };

        /**
         * @overridden DisplayObjectContainer.destroy
         */
        DOMElement.prototype.destroy = function () {
            _super.prototype.destroy.call(this);

            this.$element = null;
            this.element = null;
        };

        return DOMElement;
    })();

    module.exports = DOMElement;

});
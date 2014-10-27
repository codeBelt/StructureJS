'use strict';

var document = global.document;
var window = global.window;

/**
 * Event type to listen for.
 *
 * @type String
 * @final
 */
var EVENT_TYPE = 'click';

/**
 * Target element tag name.
 *
 * @type String
 * @final
 */
var MATCH_TAG_ANCHOR = 'A';

/**
 * Target element attribute name.
 *
 * @type String
 * @final
 */
var MATCH_ATTRIBUTE_REL = 'rel';

/**
 * Target element attribute value.
 *
 * @type String
 * @final
 */
var MATCH_VALUE_EXTERNAL = 'external';

/**
 * Attribute containing external url.
 *
 * @type String
 * @final
 */
var URL_ATTRIBUTE = 'href';

/**
 * Matches invalid decendents of anchor tags.
 *
 * @type RegExp
 * @final
 */
var INVALID_DECENDENTS = /BODY|BUTTON|DETAILS|EMBED|IFRAME|INPUT|KEYGEN|LABEL|SELECT|TEXTAREA/;

/**
 * Adds event listeners to DOM elements as the browser requires.
 *
 * @param {DOMElement|DOMText} element The target node.
 * @param {String} type Which event to listen for.
 * @param {Function} handler The even handler.
 * @return {DOMElement|DOMText}
 */
var on = function(element, type, handler) {
    if (element.addEventListener) {
        // Standard.
        element.addEventListener(type, handler, false);
    } else if (element.attachEvent)  {
        // Microsoft.
        element.attachEvent('on' + type, handler);
    }

    return element;
};

/**
 * Removes event listeners from DOM elements as the browser requires.
 *
 * @param {DOMElement|DOMText} element The target node.
 * @param {String} type Which event to listen for.
 * @param {Function} handler The even handler.
 * @return {DOMElement|DOMText}
 */
var off = function(element, type, handler) {
    if (element.removeEventListener) {
        // Standard.
        element.removeEventListener(type, handler, false);
    } else if (element.detachEvent)  {
        // Microsoft.
        element.detachEvent('on' + type, handler);
    }

    return element;
};

/**
 * Prevents the default event functionality from happening.
 *
 * @param {DOMEvent} event The DOM Event to handle.
 * @return {Boolean} false
 */
var preventDefault = function(event) {
    // No need for default anchor handling.
    if (event.preventDefault) {
        // Standard.
        event.preventDefault();
    } else {
        // Microsoft.
        event.returnValue = false;
    }

    // For good measure.
    return false;
};

/**
 * Launches links with a rel="external" in a new window.
 *
 * @class ExternalLinks
 * @static
 */
var ExternalLinks = {
    /**
     * Attaches a delegated click event handler to launch links with a rel="external" in a new window.
     *
     * @method init
     * @chainable
     */
    init: function() {
        return this
            .createChildren()
            .enable();
    },

    /**
     * Caches references to DOM elements.
     *
     * @method createChildren
     * @chainable
     */
    createChildren: function() {
        this.element = document;

        return this;
    },

    /**
     * Adds a delegated click event listener to document.
     *
     * @method enable
     * @chainable
     */
    enable: function() {
        // Remove any previously bound listeners.
        this.disable();

        on(this.element, EVENT_TYPE, this.onClickNative);

        return this;
    },

    /**
     * Removes delegated click event listener from document.
     *
     * @method disable
     * @chainable
     */
    disable: function() {
        off(this.element, EVENT_TYPE, this.onClickNative);

        return this;
    },

    /**
     * Destroys events and nulls self.
     *
     * @method destroy
     */
    destroy: function() {
        var property = null;

        this.disable();

        for (property in this) {
            if (this.hasOwnProperty(property)) {
                this[property] = null;
            }
        }
    },

    /**
     * Event handler which causes external links to open in a new browser window.
     * May be attached to a parent node (delegated).
     *
     * @method onClickNative
     * @param {DOMEvent} event The DOM Event to handle.
     * @callback
     */
    onClickNative: function(event) {
        var rel = null;
        var tag = null;
        var element = event && (event.target || event.srcElement);

        // Iterate over the clicked element and its ancestors to check for external links.
        while (element) {
            tag = element.tagName;

            // Check if element is an anchor tag.
            if (tag === MATCH_TAG_ANCHOR) {
                rel = element.getAttribute(MATCH_ATTRIBUTE_REL);

                // Check if anchor links to an external site.
                if (rel && rel.toLowerCase().indexOf(MATCH_VALUE_EXTERNAL) >= 0) {
                    window.open(element.getAttribute(URL_ATTRIBUTE));
                    preventDefault(event);
                }

                // Anchor handled. We're done.
                break;
            }

            // Handle invalid anchor decendents.
            if (INVALID_DECENDENTS.test(tag)) {
                // Anchor not detected. We're done.
                break;
            }

            // Check if parent is an external link.
            element = element.parentNode;
        }
    }
};

module.exports = ExternalLinks;

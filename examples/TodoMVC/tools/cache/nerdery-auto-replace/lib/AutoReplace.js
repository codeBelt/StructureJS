'use strict';

var document = global.document;

/**
 * Attribute name which contains the placeholder text.
 *
 * @type String
 * @final
 */
var PLACEHOLDER_ATTRIBUTE = 'placeholder';

/**
 * ClassName to use when displaying placeholder text.
 *
 * @type String
 * @final
 */
var PLACEHOLDER_CLASS_NAME = 'placeholder-text';

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
 * Filters a list based on the result of executing a tester function. Array.prototype.filter
 * is not available in most browsers that don't also support the placeholder attribute.
 *
 * @type Function
 * @param {Array} list The list to filter.
 * @param {Function(*): boolean} tester A function which tests whether items should be included in the result.
 * @return {Array} A list containing just the items which passed the test.
 */
var filterList = function(list, test) {
    var item = null;
    var res = [];
    var length = list.length;
    var i = 0;

    for (; i < length; i++) {
        item = list[i];

        // Only include in the result if the item passes the test.
        if (test(item)) {
            res.push(item);
        }
    }

    return res;
};

/**
 * Checks if a class name is present in an element's class list. Helps to avoid expensive
 * browser repaints by first checking if a class is present before modifying an element's
 * className value.
 *
 * @type Function
 * @param {DOMElement} element The element to test against.
 * @param {String} className The class to check for.
 * @return {Boolean} True if the class list of the given element contains the class name.
 */
var hasClass = function(element, className) {
    var classList = element.className.split(/\s+/);
    var i = classList.length;

    while (i--) {
        if (classList[i] === className) {
            return true;
        }
    }

    return false;
};

/**
 * Adds a class name to an element's class list, but only if not already present to avoid repaints.
 *
 * @type Function
 * @param {DOMElement} element The element to test against.
 * @param {String} className The class to check for.
 * @return {DOMElement}
 */
var addClass = function(element, className) {
    // Avoid an expensive repaint by checking if the class is not present.
    if (!hasClass(element, className)) {
        // Go ahead and add the class.
        element.className = element.className + ' ' + className;
    }

    return element;
};

/**
 * Removes a class name from an element's class list, but only if present to avoid repaints.
 *
 * @type Function
 * @param {DOMElement} element The element to test against.
 * @param {String} className The class to check for.
 * @return {DOMElement}
 */
var removeClass = function(element, className) {
    var hasClass = false;

    // Split the list on any amount of whitespace.
    var classList = element.className.split(/\s+/);

    // Search for, and filter out, specified className.
    var modifiedList = filterList(classList, function(name) {
        // Flag className as found.
        if (name === className) {
            hasClass = true;
        }

        // Only keep non-matching classNames.
        return name !== className;
    });

    // Avoid an expensive repaint by checking if the class is present.
    if (hasClass) {
        // Go ahead and remove the class.
        element.className = modifiedList.join(' ');
    }

    return element;
};

/**
 * Determines whether an element has a placeholder attribute. Browsers without support
 * for the attribute do not assign a element.placeholer property to elements.
 *
 * @type Function
 * @param {DOMElement} element A native dom element.
 * @return {Boolean} True if the element has a placeholder attribute.
 */
var elementHasPlaceholder = function(element) {
    return !!element.getAttribute(PLACEHOLDER_ATTRIBUTE);
};

/**
 * Returns a list of child form fields with placeholder attributes. Scoping allows for
 * smarter handling of page loads, form submissions, and ajax updates.
 *
 * @type Function
 * @param {DOMElement} element A native dom element.
 * @return {Array.<DOMElement>}
 */
var getFieldsWithPlaceholder = function(element) {
    var inputs = element.getElementsByTagName('input');
    var textareas = element.getElementsByTagName('textarea');

    return [].concat(
        filterList(inputs, elementHasPlaceholder),
        filterList(textareas, elementHasPlaceholder)
    );
};

/**
 * Mimics HTML5 placeholder behavior in browsers that do not support it.
 * Additionally, adds and removes 'placeholder-text' class, used as a
 * styling hook for when placeholder text is visible or not visible
 * Additionally, sets the field value to the empty string upon form
 * submission if the current value is the default text.
 *
 * @class AutoReplace
 * @static
 */
var AutoReplace = {
    /**
     * Mimics HTML5 placeholder behavior in browsers that do not support it.
     *
     * @method init
     * @chainable
     */
    init: function() {
        // Only run the script if placeholder is not natively supported
        if (PLACEHOLDER_ATTRIBUTE in document.createElement('input')) {
            return;
        }

        return this
            .createChildren()
            .enable();
    },

    /**
     * Caches references to DOM elements to improve performance.
     *
     * @method createChildren
     * @chainable
     */
    createChildren: function() {
        this.forms = document.getElementsByTagName('form');
        this.fields = getFieldsWithPlaceholder(document);

        return this;
    },

    /**
     * Adds event listeners to forms and form elements with placeholder attributes.
     *
     * @method enable
     * @chainable
     */
    enable: function() {
        // Remove any previously bound handlers.
        this.disable();

        var field = null;
        var i = null;
        var forms = this.forms;
        var fields = this.fields;

        // Add form handlers.
        i = forms.length;

        while (i--) {
            on(forms[i], 'submit', this.onSubmitForm);
        }

        // Add field handlers.
        i = fields.length;

        while (i--) {
            field = fields[i];

            on(field, 'blur', this.onBlurField);
            on(field, 'focus', this.onFocusField);

            // Trigger the blur handling to set proper default state.
            this.onBlurField({ target: field });
        }

        return this;
    },

    /**
     * Removes event listeners from forms and fields with placeholder attributes.
     *
     * @method disable
     * @chainable
     */
    disable: function() {
        var field = null;
        var i = null;
        var forms = this.forms;
        var fields = this.fields;

        // Remove form handlers.
        i = forms.length;

        while (i--) {
            off(forms[i], 'submit', this.onSubmitForm);
        }

        // Remove field handlers.
        i = fields.length;

        while (i--) {
            field = fields[i];

            off(field, 'blur', this.onBlurField);
            off(field, 'focus', this.onFocusField);
        }

        return this;
    },

    /**
     * Destroys events and nulls self. Useful in single-page web applications.
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
     * Event handler which shows placeholder text as needed.
     *
     * @method onBlurField
     * @param {DOMEvent|Object} event The DOM Event to handle, or an object with a target parameter.
     * @callback
     */
    onBlurField: function(event) {
        var placeholder = null;
        var element = event && (event.target || event.srcElement);

        if (!element) {
            return;
        }

        placeholder = element.getAttribute(PLACEHOLDER_ATTRIBUTE);

        // If the element lacks a value, set it to the placeholder text.
        if (!element.value) {
            element.value = placeholder;
        }

        // Add the placeholder class name if the current value is the placeholder text.
        if (element.value === placeholder) {
            addClass(element, PLACEHOLDER_CLASS_NAME);
        }
    },

    /**
     * Event handler which hides placeholder text as needed.
     *
     * @method onFocusField
     * @param {DOMEvent} event The DOM Event to handle.
     * @callback
     */
    onFocusField: function(event) {
        var element = event && (event.target || event.srcElement);

        if (!element) {
            return;
        }

        // If the current value is the placeholder text, remove it so the user can enter their own value.
        if (element.value === element.getAttribute(PLACEHOLDER_ATTRIBUTE)) {
            element.value = '';
            removeClass(element, PLACEHOLDER_CLASS_NAME);
        }
    },

    /**
     * Event handler which empties the values of fields containing placeholder text on submit
     * to keep useless values from being included in the form data.
     *
     * @method onSubmitForm
     * @param {DOMEvent} event The DOM Event to handle.
     * @callback
     */
    onSubmitForm: function(event) {
        var field = null;
        var fields = null;
        var i = null;
        var element = event && (event.target || event.srcElement);

        if (!element) {
            return;
        }

        // Loop over each field with a placeholder attribute.
        fields = getFieldsWithPlaceholder(element);
        i = fields.length;

        while (i--) {
            field = fields[i];

            // If the value is the same as the placeholder text, null the value.
            if (field.value === field.getAttribute(PLACEHOLDER_ATTRIBUTE)) {
                field.value = '';
            }
        }
    }
};

module.exports = AutoReplace;

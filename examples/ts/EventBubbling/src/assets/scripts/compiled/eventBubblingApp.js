(function ($, window, document) {
    var hashCode = function (str) {
        str = String(str);

        var character;
        var hash = null;
        var strLength = str.length;

        if (strLength == 0)
            return hash;

        for (var i = 0; i < strLength; i++) {
            character = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + character;
            hash = hash & hash;
        }

        return String(Math.abs(hash));
    };

    $.fn.addEventListener = function (type, selector, data, callback, scope) {
        var _callback;
        var _scope;
        var _handler;
        switch (arguments.length) {
            case 3:
                _callback = selector;
                _scope = data;
                _scope._handlerMap = _scope._handlerMap || {};
                _handler = _scope._handlerMap[hashCode(_callback)] = _callback.bind(_scope);
                this.on(type, _handler);
                break;
            case 4:
                _callback = data;
                _scope = callback;
                _scope._handlerMap = _scope._handlerMap || {};
                _handler = _scope._handlerMap[hashCode(_callback)] = _callback.bind(_scope);
                this.on(type, selector, _handler);
                break;
            case 5:
                _callback = callback;
                _scope = scope;
                _scope._handlerMap = _scope._handlerMap || {};
                _handler = _scope._handlerMap[hashCode(_callback)] = _callback.bind(_scope);
                this.on(type, selector, data, _handler);
                break;
            default:
                throw new Error('jQuery addEventListener plugin requires at least 3 arguments.');
        }
        return this;
    };

    $.fn.removeEventListener = function (type, selector, callback, scope) {
        var _callback;
        var _scope;
        var _handler;

        switch (arguments.length) {
            case 3:
                _callback = selector;
                _scope = callback;
                _scope._handlerMap = _scope._handlerMap || {};
                _handler = _scope._handlerMap[hashCode(_callback)];
                this.off(type, _handler);
                _scope._handlerMap[hashCode(_callback)] = null;
                break;
            case 4:
                _callback = callback;
                _scope = scope;
                _scope._handlerMap = _scope._handlerMap || {};
                _handler = _scope._handlerMap[hashCode(_callback)];
                this.off(type, selector, _handler);
                _scope._handlerMap[hashCode(_callback)] = null;
                break;
            default:
                throw new Error('jQuery removeEventListener plugin requires at least 3 arguments.');
        }
        return this;
    };
})(jQuery, window, document);
var StructureTS;
(function (StructureTS) {
    var Util = (function () {
        function Util() {
        }
        Util.uniqueId = function (prefix) {
            if (typeof prefix === "undefined") { prefix = null; }
            var id = ++Util._idCounter;

            if (prefix != null) {
                return String(prefix + id);
            } else {
                return id;
            }
        };

        Util.deletePropertyFromObject = function (object, list) {
            for (var key in object) {
                if (object.hasOwnProperty(key)) {
                    var value = object[key];

                    if (value instanceof Array) {
                        var array = value;
                        for (var index in array) {
                            Util.deletePropertyFromObject(array[index], list);
                        }
                    } else {
                        for (var listIndex in list) {
                            if (key === list[listIndex]) {
                                delete object[key];
                            }
                        }
                    }
                }
            }

            return object;
        };
        Util.CLASS_NAME = 'Util';

        Util._idCounter = 0;
        return Util;
    })();
    StructureTS.Util = Util;
})(StructureTS || (StructureTS = {}));
var StructureTS;
(function (StructureTS) {
    var BaseObject = (function () {
        function BaseObject() {
            this.CLASS_NAME = 'BaseObject';
            this.cid = null;
            this.cid = StructureTS.Util.uniqueId();
        }
        BaseObject.prototype.getQualifiedClassName = function () {
            return this.CLASS_NAME;
        };

        BaseObject.prototype.destroy = function () {
        };
        return BaseObject;
    })();
    StructureTS.BaseObject = BaseObject;
})(StructureTS || (StructureTS = {}));
var StructureTS;
(function (StructureTS) {
    var BaseEvent = (function () {
        function BaseEvent(type, bubbles, cancelable, data) {
            if (typeof bubbles === "undefined") { bubbles = false; }
            if (typeof cancelable === "undefined") { cancelable = false; }
            if (typeof data === "undefined") { data = null; }
            this.CLASS_NAME = 'BaseEvent';
            this.type = null;
            this.target = null;
            this.currentTarget = null;
            this.data = null;
            this.bubble = false;
            this.cancelable = false;
            this.isPropagationStopped = false;
            this.isImmediatePropagationStopped = false;
            this.type = type;
            this.bubble = bubbles;
            this.cancelable = cancelable;
            this.data = data;
        }
        BaseEvent.prototype.stopPropagation = function () {
            this.isPropagationStopped = true;
        };

        BaseEvent.prototype.stopImmediatePropagation = function () {
            this.stopPropagation();
            this.isImmediatePropagationStopped = true;
        };
        BaseEvent.ACTIVATE = 'BaseEvent.activate';

        BaseEvent.ADDED = 'BaseEvent.added';

        BaseEvent.ADDED_TO_STAGE = 'BaseEvent.addedToStage';

        BaseEvent.CANCEL = 'BaseEvent.cancel';

        BaseEvent.CHANGE = 'BaseEvent.change';

        BaseEvent.CLEAR = 'BaseEvent.clear';

        BaseEvent.CLOSE = 'BaseEvent.close';

        BaseEvent.CLOSING = 'BaseEvent.closing';

        BaseEvent.COMPLETE = 'BaseEvent.complete';

        BaseEvent.CONNECT = 'BaseEvent.connect';

        BaseEvent.COPY = 'BaseEvent.copy';

        BaseEvent.CUT = 'BaseEvent.cut';

        BaseEvent.DEACTIVATE = 'BaseEvent.deactivate';

        BaseEvent.DISPLAYING = 'BaseEvent.displaying';

        BaseEvent.ENTER_FRAME = 'BaseEvent.enterFrame';

        BaseEvent.EXIT_FRAME = 'BaseEvent.exitFrame';

        BaseEvent.EXITING = 'BaseEvent.exiting';

        BaseEvent.FULLSCREEN = 'BaseEvent.fullScreen';

        BaseEvent.INIT = 'BaseEvent.init';

        BaseEvent.NETWORK_CHANGE = 'BaseEvent.networkChange';

        BaseEvent.OPEN = 'BaseEvent.open';

        BaseEvent.PASTE = 'BaseEvent.paste';

        BaseEvent.PREPARING = 'BaseEvent.preparing';

        BaseEvent.REMOVED = 'BaseEvent.removed';

        BaseEvent.RENDER = 'BaseEvent.render';

        BaseEvent.RESIZE = 'BaseEvent.resize';
        return BaseEvent;
    })();
    StructureTS.BaseEvent = BaseEvent;
})(StructureTS || (StructureTS = {}));
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var StructureTS;
(function (StructureTS) {
    var EventDispatcher = (function (_super) {
        __extends(EventDispatcher, _super);
        function EventDispatcher() {
            _super.call(this);
            this.CLASS_NAME = 'EventDispatcher';
            this._listeners = null;
            this.parent = null;
            this.isEnabled = false;

            this._listeners = [];
        }
        EventDispatcher.prototype.addEventListener = function (type, callback, scope, priority) {
            if (typeof priority === "undefined") { priority = 0; }
            var list = this._listeners[type];
            if (list == null) {
                this._listeners[type] = list = [];
            }
            var index = 0;
            var listener;
            var i = list.length;
            while (--i > -1) {
                listener = list[i];
                if (listener.c === callback && listener.s === scope) {
                    list.splice(i, 1);
                } else if (index === 0 && listener.pr < priority) {
                    index = i + 1;
                }
            }

            list.splice(index, 0, { c: callback, s: scope, pr: priority });

            return this;
        };

        EventDispatcher.prototype.removeEventListener = function (type, callback, scope) {
            var list = this._listeners[type];
            if (list) {
                var i = list.length;
                while (--i > -1) {
                    if (list[i].c === callback && list[i].s === scope) {
                        list.splice(i, 1);
                        break;
                    }
                }
            }

            return this;
        };

        EventDispatcher.prototype.dispatchEvent = function (event) {
            if (event.target == null) {
                event.target = this;
            }

            event.currentTarget = this;

            var list = this._listeners[event.type];
            if (list) {
                var i = list.length;
                var listener;
                while (--i > -1) {
                    if (event.cancelable && event.isImmediatePropagationStopped) {
                        break;
                    }

                    listener = list[i];
                    listener.c.call(listener.s, event);
                }
            }

            if (this.parent && event.bubble) {
                if (event.cancelable && event.isPropagationStopped) {
                    return this;
                }

                this.parent.dispatchEvent(event);
            }

            return this;
        };

        EventDispatcher.prototype.destroy = function () {
            _super.prototype.destroy.call(this);

            this.disable();

            this.parent = null;
            this._listeners = null;
        };

        EventDispatcher.prototype.enable = function () {
            if (this.isEnabled === true)
                return this;

            this.isEnabled = true;
            return this;
        };

        EventDispatcher.prototype.disable = function () {
            if (this.isEnabled === false)
                return this;

            this.isEnabled = false;
            return this;
        };
        return EventDispatcher;
    })(StructureTS.BaseObject);
    StructureTS.EventDispatcher = EventDispatcher;
})(StructureTS || (StructureTS = {}));
var StructureTS;
(function (StructureTS) {
    var DisplayObjectContainer = (function (_super) {
        __extends(DisplayObjectContainer, _super);
        function DisplayObjectContainer() {
            _super.call(this);
            this.CLASS_NAME = 'DisplayObjectContainer';
            this.isCreated = false;
            this.numChildren = 0;
            this.children = [];
            this.width = 0;
            this.height = 0;
            this.unscaledWidth = 100;
            this.unscaledHeight = 100;
        }
        DisplayObjectContainer.prototype.createChildren = function () {
            return this;
        };

        DisplayObjectContainer.prototype.addChild = function (child) {
            if (child.parent) {
                child.parent.removeChild(child);
            }

            this.children.push(child);
            this.numChildren = this.children.length;

            child.parent = this;

            return this;
        };

        DisplayObjectContainer.prototype.addChildAt = function (child, index) {
            if (child.parent) {
                child.parent.removeChild(child);
            }

            this.children.splice(index, 0, child);
            this.numChildren = this.children.length;

            child.parent = this;

            return this;
        };

        DisplayObjectContainer.prototype.swapChildren = function (child1, child2) {
            return this;
        };

        DisplayObjectContainer.prototype.swapChildrenAt = function (index1, index2) {
            if (index1 < 0 || index1 < 0 || index1 >= this.numChildren || index2 >= this.numChildren) {
                throw new TypeError('[' + this.getQualifiedClassName() + '] index value(s) cannot be out of bounds. index1 value is ' + index1 + ' index2 value is ' + index2);
            }

            var child1 = this.getChildAt(index1);
            var child2 = this.getChildAt(index2);

            this.swapChildren(child1, child2);

            return this;
        };

        DisplayObjectContainer.prototype.getChildIndex = function (child) {
            return this.children.indexOf(child);
        };

        DisplayObjectContainer.prototype.removeChild = function (child) {
            var index = this.getChildIndex(child);
            if (index !== -1) {
                this.children.splice(index, 1);
            }
            child.disable();
            child.parent = null;

            this.numChildren = this.children.length;

            return this;
        };

        DisplayObjectContainer.prototype.removeChildren = function () {
            while (this.children.length > 0) {
                this.removeChild(this.children.pop());
            }

            this.numChildren = this.children.length;

            return this;
        };

        DisplayObjectContainer.prototype.getChildAt = function (index) {
            return this.children[index];
        };

        DisplayObjectContainer.prototype.setSize = function (unscaledWidth, unscaledHeight) {
            this.unscaledWidth = unscaledWidth;
            this.unscaledHeight = unscaledHeight;
            if (this.isCreated) {
                this.layoutChildren();
            }

            return this;
        };

        DisplayObjectContainer.prototype.layoutChildren = function () {
            return this;
        };

        DisplayObjectContainer.prototype.destroy = function () {
            _super.prototype.destroy.call(this);

            this.children = [];
            this.numChildren = 0;
        };
        return DisplayObjectContainer;
    })(StructureTS.EventDispatcher);
    StructureTS.DisplayObjectContainer = DisplayObjectContainer;
})(StructureTS || (StructureTS = {}));
var StructureTS;
(function (StructureTS) {
    var StringUtil = (function () {
        function StringUtil() {
        }
        StringUtil.stringToBoolean = function (str) {
            return (str.toLowerCase() == "true" || str.toLowerCase() == "1");
        };

        StringUtil.getExtension = function (filename) {
            return filename.slice(filename.lastIndexOf(".") + 1, filename.length);
        };

        StringUtil.hyphenToCamelCase = function (str) {
            return str.replace(/-([a-z])/g, function (g) {
                return g[1].toUpperCase();
            });
        };

        StringUtil.hyphenToPascalCase = function (str) {
            return str.replace(/(\-|^)([a-z])/gi, function (match, delimiter, hyphenated) {
                return hyphenated.toUpperCase();
            });
        };

        StringUtil.camelCaseToHyphen = function (str) {
            return str.replace(/([a-z][A-Z])/g, function (g) {
                return g[0] + '-' + g[1].toLowerCase();
            });
        };

        StringUtil.createUUID = function () {
            var uuid = ('xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx').replace(/[xy]/g, function (c) {
                var r = Math.random() * 16 | 0;
                var v = (c == 'x') ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });

            return uuid;
        };

        StringUtil.queryStringToObject = function (queryString) {
            var params = {};
            var temp = null;

            var queries = queryString.substring(1).split("&");

            var len = queries.length;
            for (var i = 0; i < len; i++) {
                temp = queries[i].split('=');
                params[temp[0]] = temp[1];
            }

            return params;
        };

        StringUtil.removeAllWhitespace = function (str) {
            return str.replace(/\s+/g, '');
        };

        StringUtil.removeLeadingTrailingWhitespace = function (str) {
            return str.replace(/(^\s+|\s+$)/g, '');
        };

        StringUtil.truncate = function (text, length) {
            if (text.length <= length) {
                return text;
            } else {
                return text.substr(0, length) + "...";
            }
        };
        StringUtil.CLASS_NAME = 'StringUtil';
        return StringUtil;
    })();
    StructureTS.StringUtil = StringUtil;
})(StructureTS || (StructureTS = {}));
var StructureTS;
(function (StructureTS) {
    var TemplateFactory = (function () {
        function TemplateFactory() {
        }
        TemplateFactory.createTemplate = function (templatePath, data) {
            if (typeof data === "undefined") { data = null; }
            return TemplateFactory.create(templatePath, data);
        };

        TemplateFactory.createView = function (templatePath, data) {
            if (typeof data === "undefined") { data = null; }
            var template = TemplateFactory.create(templatePath, data);

            var view = new StructureTS.DOMElement();
            view.$element = jQuery(template);
            return view;
        };

        TemplateFactory.create = function (templatePath, data) {
            if (typeof data === "undefined") { data = null; }
            var regex = /^([.#])(.+)/;
            var template = null;
            var isClassOrIdName = regex.test(templatePath);

            if (isClassOrIdName) {
                var htmlString = $(templatePath).html();
                htmlString = StructureTS.StringUtil.removeLeadingTrailingWhitespace(htmlString);

                if (TemplateFactory.templateEngine == TemplateFactory.UNDERSCORE) {
                    var templateMethod = _.template(htmlString);
                    template = templateMethod(data);
                } else {
                    var templateMethod = Handlebars.compile(htmlString);
                    template = templateMethod(data);
                }
            } else {
                var templateObj = window[TemplateFactory.templateNamespace];
                if (!templateObj) {
                    return null;
                }

                var templateFunction = templateObj[templatePath];
                if (templateFunction) {
                    template = templateFunction(data);
                }
            }

            return template;
        };
        TemplateFactory.CLASS_NAME = 'TemplateFactory';

        TemplateFactory.UNDERSCORE = 'underscore';
        TemplateFactory.HANDLEBARS = 'handlebars';

        TemplateFactory.templateEngine = TemplateFactory.HANDLEBARS;
        TemplateFactory.templateNamespace = 'JST';
        return TemplateFactory;
    })();
    StructureTS.TemplateFactory = TemplateFactory;
})(StructureTS || (StructureTS = {}));
var StructureTS;
(function (StructureTS) {
    var DOMElement = (function (_super) {
        __extends(DOMElement, _super);
        function DOMElement(type, params) {
            if (typeof type === "undefined") { type = null; }
            if (typeof params === "undefined") { params = null; }
            _super.call(this);
            this.CLASS_NAME = 'DOMElement';
            this._isVisible = true;
            this.element = null;
            this.$element = null;
            this._type = null;
            this._params = null;

            if (type) {
                this._type = type;
                this._params = params;
            }
        }
        DOMElement.prototype.createChildren = function (type, params) {
            if (typeof type === "undefined") { type = 'div'; }
            if (typeof params === "undefined") { params = null; }
            type = this._type || type;
            params = this._params || params;

            if (!this.$element) {
                var html = StructureTS.TemplateFactory.createTemplate(type, params);
                if (html) {
                    this.$element = $(html);
                } else {
                    this.$element = jQuery("<" + type + "/>", params);
                }
            }

            this.element = this.$element[0];

            return this;
        };

        DOMElement.prototype.addChild = function (child) {
            _super.prototype.addChild.call(this, child);

            if (!child.isCreated) {
                child.createChildren();
                child.isCreated = true;
            }

            child.$element.attr('data-cid', child.cid);

            child.$element.addEventListener('DOMNodeInsertedIntoDocument', child, this.onAddedToDom, this);
            this.$element.append(child.$element);

            child.layoutChildren();

            return this;
        };

        DOMElement.prototype.onAddedToDom = function (event) {
            var child = event.data;
            child.$element.removeEventListener('DOMNodeInsertedIntoDocument', this.onAddedToDom, this);
            child.layoutChildren();
            child.dispatchEvent(new StructureTS.BaseEvent(StructureTS.BaseEvent.ADDED));
        };

        DOMElement.prototype.addChildAt = function (child, index) {
            var children = this.$element.children();
            var length = children.length;

            if (index < 0 || index >= length) {
                this.addChild(child);
            } else {
                if (!child.isCreated) {
                    child.createChildren();
                    child.isCreated = true;
                }
                child.$element.addEventListener('DOMNodeInsertedIntoDocument', child, this.onAddedToDom, this);
                child.layoutChildren();

                _super.prototype.addChildAt.call(this, child, index);

                jQuery(children.get(index)).before(child.$element);
            }

            return this;
        };

        DOMElement.prototype.swapChildren = function (child1, child2) {
            var child1Index = child1.$element.index();
            var child2Index = child2.$element.index();

            this.addChildAt(child1, child2Index);
            this.addChildAt(child2, child1Index);

            return this;
        };

        DOMElement.prototype.getChildAt = function (index) {
            return _super.prototype.getChildAt.call(this, index);
        };

        DOMElement.prototype.getChildByCid = function (cid) {
            var domElement = _.find(this.children, function (child) {
                return child.cid == cid;
            });

            return domElement || null;
        };

        DOMElement.prototype.getChild = function (selector) {
            var jQueryElement = this.$element.find(selector).first();
            if (jQueryElement.length == 0) {
                throw new TypeError('[' + this.getQualifiedClassName() + '] getChild(' + selector + ') Cannot find DOM $element');
            }

            var cid = jQueryElement.data('cid');
            var domElement = _.find(this.children, function (domElement) {
                return domElement.cid == cid;
            });

            if (!domElement) {
                domElement = new DOMElement();
                domElement.$element = jQueryElement;
                domElement.$element.attr('data-cid', domElement.cid);
                domElement.element = jQueryElement[0];
                domElement.isCreated = true;

                _super.prototype.addChild.call(this, domElement);
            }

            return domElement;
        };

        DOMElement.prototype.getChildren = function (selector) {
            if (typeof selector === "undefined") { selector = ''; }
            var _this = this;
            var $child;
            var domElement;
            var $list = this.$element.children(selector);

            _.each($list, function (item, index) {
                $child = jQuery(item);

                if (!$child.data('cid')) {
                    domElement = new DOMElement();
                    domElement.$element = $child;
                    domElement.$element.attr('data-cid', domElement.cid);
                    domElement.element = item;
                    domElement.isCreated = true;

                    _super.prototype.addChild.call(_this, domElement);
                }
            });

            return this.children;
        };

        DOMElement.prototype.removeChild = function (child) {
            child.$element.unbind();
            child.$element.remove();

            _super.prototype.removeChild.call(this, child);

            return this;
        };

        DOMElement.prototype.removeChildren = function () {
            _super.prototype.removeChildren.call(this);

            this.$element.empty();

            return this;
        };

        DOMElement.prototype.alpha = function (number) {
            this.$element.css('opacity', number);
            return this;
        };

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

        DOMElement.prototype.destroy = function () {
            _super.prototype.destroy.call(this);

            this.$element = null;
            this.element = null;
        };
        return DOMElement;
    })(StructureTS.DisplayObjectContainer);
    StructureTS.DOMElement = DOMElement;
})(StructureTS || (StructureTS = {}));
var StructureTS;
(function (StructureTS) {
    var Stage = (function (_super) {
        __extends(Stage, _super);
        function Stage() {
            _super.call(this);
            this.CLASS_NAME = 'Stage';
        }
        Stage.prototype.appendTo = function (type, enabled) {
            if (typeof enabled === "undefined") { enabled = true; }
            this.$element = jQuery(type);
            this.$element.attr('data-cid', this.cid);

            if (!this.isCreated) {
                this.createChildren();
                this.isCreated = true;
                this.layoutChildren();
            }

            if (enabled) {
                this.enable();
            }

            return this;
        };
        return Stage;
    })(StructureTS.DOMElement);
    StructureTS.Stage = Stage;
})(StructureTS || (StructureTS = {}));
var StructureTS;
(function (StructureTS) {
    var MouseEvents = (function () {
        function MouseEvents() {
        }
        MouseEvents.CLICK = 'click';

        MouseEvents.DBL_CLICK = 'dblclick';

        MouseEvents.MOUSE_DOWN = 'mousedown';

        MouseEvents.MOUSE_MOVE = 'mousemove';

        MouseEvents.MOUSE_OVER = 'mouseover';

        MouseEvents.MOUSE_OUT = 'mouseout';

        MouseEvents.MOUSE_UP = 'mouseup';

        MouseEvents.TAP = 'tap';
        return MouseEvents;
    })();
    StructureTS.MouseEvents = MouseEvents;
})(StructureTS || (StructureTS = {}));
var codeBelt;
(function (codeBelt) {
    var DOMElement = StructureTS.DOMElement;
    var MouseEvents = StructureTS.MouseEvents;
    var BaseEvent = StructureTS.BaseEvent;

    var ChildView = (function (_super) {
        __extends(ChildView, _super);
        function ChildView() {
            _super.call(this);
            this.CLASS_NAME = 'ChildView';
            this._panelContainer = null;
            this._dispatchButton = null;
            this._sonMessage = null;
        }
        ChildView.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this, '#containerTemplate', { title: this.getQualifiedClassName() });

            this._panelContainer = this.getChild('.js-panelContent');

            this._dispatchButton = new DOMElement('button', { 'class': 'button_dispatch', text: 'Dispatch Event' });
            this._panelContainer.addChild(this._dispatchButton);

            this._sonMessage = this.getChild('.js-message');
        };

        ChildView.prototype.layoutChildren = function () {
            this._sonMessage.$element.css('opacity', 0);
        };

        ChildView.prototype.enable = function () {
            if (this.isEnabled === true)
                return;

            this.addEventListener(BaseEvent.CHANGE, this.onBubbled, this);

            this._dispatchButton.$element.addEventListener(MouseEvents.CLICK, this.onButtonClick, this);

            _super.prototype.enable.call(this);
        };

        ChildView.prototype.disable = function () {
            if (this.isEnabled === false)
                return;

            this.removeEventListener(BaseEvent.CHANGE, this.onBubbled, this);

            this._dispatchButton.$element.removeEventListener(MouseEvents.CLICK, this.onButtonClick, this);

            _super.prototype.disable.call(this);
        };

        ChildView.prototype.destroy = function () {
            _super.prototype.destroy.call(this);

            this._dispatchButton.destroy();
            this._dispatchButton = null;

            this._panelContainer.destroy();
            this._panelContainer = null;
        };

        ChildView.prototype.onButtonClick = function (event) {
            event.preventDefault();

            this.dispatchEvent(new BaseEvent(BaseEvent.CHANGE, true, true));
        };

        ChildView.prototype.onBubbled = function (event) {
            var checkbox = this._panelContainer.$element.find('[type=checkbox]').first().prop('checked');

            if (checkbox == true) {
                event.stopPropagation();
            }

            this._sonMessage.$element.css('opacity', 1);
        };
        return ChildView;
    })(StructureTS.DOMElement);
    codeBelt.ChildView = ChildView;
})(codeBelt || (codeBelt = {}));
var codeBelt;
(function (codeBelt) {
    var DOMElement = StructureTS.DOMElement;
    var BaseEvent = StructureTS.BaseEvent;

    var ParentView = (function (_super) {
        __extends(ParentView, _super);
        function ParentView() {
            _super.call(this);
            this.CLASS_NAME = 'ParentView';
            this._panelContainer = null;
            this._childView = null;
            this._parentMessage = null;
        }
        ParentView.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this, '#containerTemplate', { title: this.getQualifiedClassName() });

            this._panelContainer = this.getChild('.js-panelContent');

            this._childView = new codeBelt.ChildView();
            this._panelContainer.addChild(this._childView);

            this._parentMessage = this.getChild('.js-message');
        };

        ParentView.prototype.layoutChildren = function () {
            this._parentMessage.$element.css('opacity', 0);
            this._childView.layoutChildren();
        };

        ParentView.prototype.enable = function () {
            if (this.isEnabled === true)
                return;

            this.addEventListener(BaseEvent.CHANGE, this.onBubbled, this);

            this._childView.enable();

            _super.prototype.enable.call(this);
        };

        ParentView.prototype.disable = function () {
            if (this.isEnabled === false)
                return;

            this.removeEventListener(BaseEvent.CHANGE, this.onBubbled, this);

            this._childView.disable();

            _super.prototype.disable.call(this);
        };

        ParentView.prototype.destroy = function () {
            _super.prototype.destroy.call(this);

            this._childView.destroy();
            this._childView = null;

            this._panelContainer.destroy();
            this._panelContainer = null;
        };

        ParentView.prototype.onBubbled = function (event) {
            var checkbox = this._panelContainer.$element.find('[type=checkbox]').first().prop('checked');

            if (checkbox == true) {
                event.stopPropagation();
            }

            this._parentMessage.$element.css('opacity', 1);
        };
        return ParentView;
    })(StructureTS.DOMElement);
    codeBelt.ParentView = ParentView;
})(codeBelt || (codeBelt = {}));
var codeBelt;
(function (codeBelt) {
    var DOMElement = StructureTS.DOMElement;
    var BaseEvent = StructureTS.BaseEvent;

    var GrandparentView = (function (_super) {
        __extends(GrandparentView, _super);
        function GrandparentView() {
            _super.call(this);
            this.CLASS_NAME = 'GrandparentView';
            this._panelContainer = null;
            this._parentView = null;
            this._grandparentMessage = null;
        }
        GrandparentView.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this, '#containerTemplate', { title: this.getQualifiedClassName() });

            this._panelContainer = this.getChild('.js-panelContent');

            this._parentView = new codeBelt.ParentView();
            this._panelContainer.addChild(this._parentView);

            this._grandparentMessage = this.getChild('.js-message');
        };

        GrandparentView.prototype.layoutChildren = function () {
            this._grandparentMessage.$element.css('opacity', 0);
            this._parentView.layoutChildren();
        };

        GrandparentView.prototype.enable = function () {
            if (this.isEnabled === true)
                return;

            this.addEventListener(BaseEvent.CHANGE, this.onBubbled, this);

            this._parentView.enable();

            _super.prototype.enable.call(this);
        };

        GrandparentView.prototype.disable = function () {
            if (this.isEnabled === false)
                return;

            this.removeEventListener(BaseEvent.CHANGE, this.onBubbled, this);

            this._parentView.disable();

            _super.prototype.disable.call(this);
        };

        GrandparentView.prototype.destroy = function () {
            _super.prototype.destroy.call(this);

            this._parentView.destroy();
            this._parentView = null;

            this._panelContainer.destroy();
            this._panelContainer = null;
        };

        GrandparentView.prototype.onBubbled = function (event) {
            var checkbox = this._panelContainer.$element.find('[type=checkbox]').first().prop('checked');

            if (checkbox == true) {
                event.stopPropagation();
            }

            this._grandparentMessage.$element.css('opacity', 1);
        };
        return GrandparentView;
    })(StructureTS.DOMElement);
    codeBelt.GrandparentView = GrandparentView;
})(codeBelt || (codeBelt = {}));
var codeBelt;
(function (codeBelt) {
    var DOMElement = StructureTS.DOMElement;
    var MouseEvents = StructureTS.MouseEvents;
    var BaseEvent = StructureTS.BaseEvent;
    var Stage = StructureTS.Stage;

    var EventBubblingApp = (function (_super) {
        __extends(EventBubblingApp, _super);
        function EventBubblingApp() {
            _super.call(this);
            this.CLASS_NAME = 'EventBubblingApp';
            this._grandpaView = null;
            this._clearButton = null;
            this._stageMessage = null;
        }
        EventBubblingApp.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);

            this._grandpaView = new codeBelt.GrandparentView();
            this.addChild(this._grandpaView);

            this._clearButton = this.getChild('#js-clearButton');
            this._stageMessage = this.getChild('.js-message');
        };

        EventBubblingApp.prototype.layoutChildren = function () {
            this._stageMessage.$element.css('opacity', 0);
            this._grandpaView.layoutChildren();
        };

        EventBubblingApp.prototype.enable = function () {
            if (this.isEnabled === true)
                return;

            this.addEventListener(BaseEvent.CHANGE, this.onBubbled, this);

            this._clearButton.$element.addEventListener(MouseEvents.CLICK, this.onClearClick, this);
            this._grandpaView.enable();

            _super.prototype.enable.call(this);
        };

        EventBubblingApp.prototype.disable = function () {
            if (this.isEnabled === false)
                return;

            this.removeEventListener(BaseEvent.CHANGE, this.onBubbled, this);

            this._clearButton.$element.removeEventListener(MouseEvents.CLICK, this.onClearClick, this);
            this._grandpaView.disable();

            _super.prototype.disable.call(this);
        };

        EventBubblingApp.prototype.destroy = function () {
            _super.prototype.destroy.call(this);

            this._grandpaView.destroy();
            this._grandpaView = null;

            this._clearButton.destroy();
            this._clearButton = null;

            this._stageMessage.destroy();
            this._stageMessage = null;
        };

        EventBubblingApp.prototype.onClearClick = function (event) {
            this.layoutChildren();
        };

        EventBubblingApp.prototype.onBubbled = function (event) {
            this._stageMessage.$element.css('opacity', 1);
        };
        return EventBubblingApp;
    })(StructureTS.Stage);
    codeBelt.EventBubblingApp = EventBubblingApp;
})(codeBelt || (codeBelt = {}));

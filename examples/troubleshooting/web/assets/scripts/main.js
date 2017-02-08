(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/object/create"), __esModule: true };
},{"core-js/library/fn/object/create":2}],2:[function(require,module,exports){
require('../../modules/es6.object.create');
var $Object = require('../../modules/_core').Object;
module.exports = function create(P, D){
  return $Object.create(P, D);
};
},{"../../modules/_core":7,"../../modules/es6.object.create":36}],3:[function(require,module,exports){
module.exports = function(it){
  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
  return it;
};
},{}],4:[function(require,module,exports){
var isObject = require('./_is-object');
module.exports = function(it){
  if(!isObject(it))throw TypeError(it + ' is not an object!');
  return it;
};
},{"./_is-object":21}],5:[function(require,module,exports){
// false -> Array#indexOf
// true  -> Array#includes
var toIObject = require('./_to-iobject')
  , toLength  = require('./_to-length')
  , toIndex   = require('./_to-index');
module.exports = function(IS_INCLUDES){
  return function($this, el, fromIndex){
    var O      = toIObject($this)
      , length = toLength(O.length)
      , index  = toIndex(fromIndex, length)
      , value;
    // Array#includes uses SameValueZero equality algorithm
    if(IS_INCLUDES && el != el)while(length > index){
      value = O[index++];
      if(value != value)return true;
    // Array#toIndex ignores holes, Array#includes - not
    } else for(;length > index; index++)if(IS_INCLUDES || index in O){
      if(O[index] === el)return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};
},{"./_to-index":30,"./_to-iobject":32,"./_to-length":33}],6:[function(require,module,exports){
var toString = {}.toString;

module.exports = function(it){
  return toString.call(it).slice(8, -1);
};
},{}],7:[function(require,module,exports){
var core = module.exports = {version: '2.4.0'};
if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef
},{}],8:[function(require,module,exports){
// optional / simple context binding
var aFunction = require('./_a-function');
module.exports = function(fn, that, length){
  aFunction(fn);
  if(that === undefined)return fn;
  switch(length){
    case 1: return function(a){
      return fn.call(that, a);
    };
    case 2: return function(a, b){
      return fn.call(that, a, b);
    };
    case 3: return function(a, b, c){
      return fn.call(that, a, b, c);
    };
  }
  return function(/* ...args */){
    return fn.apply(that, arguments);
  };
};
},{"./_a-function":3}],9:[function(require,module,exports){
// 7.2.1 RequireObjectCoercible(argument)
module.exports = function(it){
  if(it == undefined)throw TypeError("Can't call method on  " + it);
  return it;
};
},{}],10:[function(require,module,exports){
// Thank's IE8 for his funny defineProperty
module.exports = !require('./_fails')(function(){
  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
});
},{"./_fails":14}],11:[function(require,module,exports){
var isObject = require('./_is-object')
  , document = require('./_global').document
  // in old IE typeof document.createElement is 'object'
  , is = isObject(document) && isObject(document.createElement);
module.exports = function(it){
  return is ? document.createElement(it) : {};
};
},{"./_global":15,"./_is-object":21}],12:[function(require,module,exports){
// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');
},{}],13:[function(require,module,exports){
var global    = require('./_global')
  , core      = require('./_core')
  , ctx       = require('./_ctx')
  , hide      = require('./_hide')
  , PROTOTYPE = 'prototype';

var $export = function(type, name, source){
  var IS_FORCED = type & $export.F
    , IS_GLOBAL = type & $export.G
    , IS_STATIC = type & $export.S
    , IS_PROTO  = type & $export.P
    , IS_BIND   = type & $export.B
    , IS_WRAP   = type & $export.W
    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
    , expProto  = exports[PROTOTYPE]
    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE]
    , key, own, out;
  if(IS_GLOBAL)source = name;
  for(key in source){
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if(own && key in exports)continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function(C){
      var F = function(a, b, c){
        if(this instanceof C){
          switch(arguments.length){
            case 0: return new C;
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if(IS_PROTO){
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if(type & $export.R && expProto && !expProto[key])hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library` 
module.exports = $export;
},{"./_core":7,"./_ctx":8,"./_global":15,"./_hide":17}],14:[function(require,module,exports){
module.exports = function(exec){
  try {
    return !!exec();
  } catch(e){
    return true;
  }
};
},{}],15:[function(require,module,exports){
// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef
},{}],16:[function(require,module,exports){
var hasOwnProperty = {}.hasOwnProperty;
module.exports = function(it, key){
  return hasOwnProperty.call(it, key);
};
},{}],17:[function(require,module,exports){
var dP         = require('./_object-dp')
  , createDesc = require('./_property-desc');
module.exports = require('./_descriptors') ? function(object, key, value){
  return dP.f(object, key, createDesc(1, value));
} : function(object, key, value){
  object[key] = value;
  return object;
};
},{"./_descriptors":10,"./_object-dp":23,"./_property-desc":27}],18:[function(require,module,exports){
module.exports = require('./_global').document && document.documentElement;
},{"./_global":15}],19:[function(require,module,exports){
module.exports = !require('./_descriptors') && !require('./_fails')(function(){
  return Object.defineProperty(require('./_dom-create')('div'), 'a', {get: function(){ return 7; }}).a != 7;
});
},{"./_descriptors":10,"./_dom-create":11,"./_fails":14}],20:[function(require,module,exports){
// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = require('./_cof');
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
  return cof(it) == 'String' ? it.split('') : Object(it);
};
},{"./_cof":6}],21:[function(require,module,exports){
module.exports = function(it){
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};
},{}],22:[function(require,module,exports){
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject    = require('./_an-object')
  , dPs         = require('./_object-dps')
  , enumBugKeys = require('./_enum-bug-keys')
  , IE_PROTO    = require('./_shared-key')('IE_PROTO')
  , Empty       = function(){ /* empty */ }
  , PROTOTYPE   = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function(){
  // Thrash, waste and sodomy: IE GC bug
  var iframe = require('./_dom-create')('iframe')
    , i      = enumBugKeys.length
    , lt     = '<'
    , gt     = '>'
    , iframeDocument;
  iframe.style.display = 'none';
  require('./_html').appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while(i--)delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties){
  var result;
  if(O !== null){
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty;
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};

},{"./_an-object":4,"./_dom-create":11,"./_enum-bug-keys":12,"./_html":18,"./_object-dps":24,"./_shared-key":28}],23:[function(require,module,exports){
var anObject       = require('./_an-object')
  , IE8_DOM_DEFINE = require('./_ie8-dom-define')
  , toPrimitive    = require('./_to-primitive')
  , dP             = Object.defineProperty;

exports.f = require('./_descriptors') ? Object.defineProperty : function defineProperty(O, P, Attributes){
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if(IE8_DOM_DEFINE)try {
    return dP(O, P, Attributes);
  } catch(e){ /* empty */ }
  if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
  if('value' in Attributes)O[P] = Attributes.value;
  return O;
};
},{"./_an-object":4,"./_descriptors":10,"./_ie8-dom-define":19,"./_to-primitive":34}],24:[function(require,module,exports){
var dP       = require('./_object-dp')
  , anObject = require('./_an-object')
  , getKeys  = require('./_object-keys');

module.exports = require('./_descriptors') ? Object.defineProperties : function defineProperties(O, Properties){
  anObject(O);
  var keys   = getKeys(Properties)
    , length = keys.length
    , i = 0
    , P;
  while(length > i)dP.f(O, P = keys[i++], Properties[P]);
  return O;
};
},{"./_an-object":4,"./_descriptors":10,"./_object-dp":23,"./_object-keys":26}],25:[function(require,module,exports){
var has          = require('./_has')
  , toIObject    = require('./_to-iobject')
  , arrayIndexOf = require('./_array-includes')(false)
  , IE_PROTO     = require('./_shared-key')('IE_PROTO');

module.exports = function(object, names){
  var O      = toIObject(object)
    , i      = 0
    , result = []
    , key;
  for(key in O)if(key != IE_PROTO)has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while(names.length > i)if(has(O, key = names[i++])){
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};
},{"./_array-includes":5,"./_has":16,"./_shared-key":28,"./_to-iobject":32}],26:[function(require,module,exports){
// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys       = require('./_object-keys-internal')
  , enumBugKeys = require('./_enum-bug-keys');

module.exports = Object.keys || function keys(O){
  return $keys(O, enumBugKeys);
};
},{"./_enum-bug-keys":12,"./_object-keys-internal":25}],27:[function(require,module,exports){
module.exports = function(bitmap, value){
  return {
    enumerable  : !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable    : !(bitmap & 4),
    value       : value
  };
};
},{}],28:[function(require,module,exports){
var shared = require('./_shared')('keys')
  , uid    = require('./_uid');
module.exports = function(key){
  return shared[key] || (shared[key] = uid(key));
};
},{"./_shared":29,"./_uid":35}],29:[function(require,module,exports){
var global = require('./_global')
  , SHARED = '__core-js_shared__'
  , store  = global[SHARED] || (global[SHARED] = {});
module.exports = function(key){
  return store[key] || (store[key] = {});
};
},{"./_global":15}],30:[function(require,module,exports){
var toInteger = require('./_to-integer')
  , max       = Math.max
  , min       = Math.min;
module.exports = function(index, length){
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};
},{"./_to-integer":31}],31:[function(require,module,exports){
// 7.1.4 ToInteger
var ceil  = Math.ceil
  , floor = Math.floor;
module.exports = function(it){
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};
},{}],32:[function(require,module,exports){
// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = require('./_iobject')
  , defined = require('./_defined');
module.exports = function(it){
  return IObject(defined(it));
};
},{"./_defined":9,"./_iobject":20}],33:[function(require,module,exports){
// 7.1.15 ToLength
var toInteger = require('./_to-integer')
  , min       = Math.min;
module.exports = function(it){
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};
},{"./_to-integer":31}],34:[function(require,module,exports){
// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = require('./_is-object');
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function(it, S){
  if(!isObject(it))return it;
  var fn, val;
  if(S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
  if(typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it)))return val;
  if(!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
  throw TypeError("Can't convert object to primitive value");
};
},{"./_is-object":21}],35:[function(require,module,exports){
var id = 0
  , px = Math.random();
module.exports = function(key){
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};
},{}],36:[function(require,module,exports){
var $export = require('./_export')
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
$export($export.S, 'Object', {create: require('./_object-create')});
},{"./_export":13,"./_object-create":22}],37:[function(require,module,exports){
"use strict";

var CheckoutViewModel_1 = require("./models/CheckoutViewModel");
/**
 * Initial application setup. Runs once upon every page load.
 *
 * @class App
 * @constructor
 */
var App = function () {
    function App() {}
    /**
     * Initializes the application and kicks off loading of prerequisites.
     *
     * @method init
     * @public
     */
    App.prototype.init = function () {
        // Create your views here
        var checkoutViewModel = new CheckoutViewModel_1["default"]({ test: { id: -1 } }, { expand: false });
        console.log("1", checkoutViewModel);
        checkoutViewModel = checkoutViewModel.clone();
        console.log("2", checkoutViewModel);
        checkoutViewModel = checkoutViewModel.clone();
        checkoutViewModel.update({ pick: { id: 'asdfasdfas' } });
        console.log("3", checkoutViewModel);
    };
    return App;
}();
exports.__esModule = true;
exports["default"] = App;


},{"./models/CheckoutViewModel":39}],38:[function(require,module,exports){
"use strict";

var App_1 = require("./App");
var app = new App_1.default();
app.init();

},{"./App":37}],39:[function(require,module,exports){
"use strict";

var _create = require("babel-runtime/core-js/object/create");

var _create2 = _interopRequireDefault(_create);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var __extends = this && this.__extends || function (d, b) {
    for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
    }function __() {
        this.constructor = d;
    }
    d.prototype = b === null ? (0, _create2.default)(b) : (__.prototype = b.prototype, new __());
};
var BaseModel_1 = require("../../../../../../ts/model/BaseModel");
var InputModel_1 = require("./form/InputModel");
/**
 * @class CheckoutViewModel
 * @extends ApiBaseModel
 * @constructor
 **/
var CheckoutViewModel = function (_super) {
    __extends(CheckoutViewModel, _super);
    function CheckoutViewModel(data, opts) {
        if (data === void 0) {
            data = {};
        }
        if (opts === void 0) {
            opts = {};
        }
        var _this = _super.call(this, opts) || this;
        /**
         * @property pickHowOptions
         * @type {Array<{}>}
         * @public
         */
        _this.pickHowOptions = [new InputModel_1["default"]({
            id: 'one'
        }), new InputModel_1["default"]({
            id: 'two'
        })];
        _this.pick = new InputModel_1["default"]({
            id: 'three'
        });
        _this.test = InputModel_1["default"];
        _this.testArray = [InputModel_1["default"]];
        if (data) {
            _this.update(data);
        }
        return _this;
    }
    /**
     * @overridden ApiBaseModel.update
     */
    CheckoutViewModel.prototype.update = function (data) {
        _super.prototype.update.call(this, data);
        // Override any values after the default super update method has set the values.
    };
    return CheckoutViewModel;
}(BaseModel_1["default"]);
exports.__esModule = true;
exports["default"] = CheckoutViewModel;


},{"../../../../../../ts/model/BaseModel":42,"./form/InputModel":40,"babel-runtime/core-js/object/create":1}],40:[function(require,module,exports){
"use strict";

var _create = require("babel-runtime/core-js/object/create");

var _create2 = _interopRequireDefault(_create);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var __extends = this && this.__extends || function (d, b) {
    for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
    }function __() {
        this.constructor = d;
    }
    d.prototype = b === null ? (0, _create2.default)(b) : (__.prototype = b.prototype, new __());
};
var BaseModel_1 = require("../../../../../../../ts/model/BaseModel");
/**
 * @class InputModel
 * @extends BaseModel
 * @constructor
 **/
var InputModel = function (_super) {
    __extends(InputModel, _super);
    function InputModel(data, opts) {
        if (data === void 0) {
            data = {};
        }
        if (opts === void 0) {
            opts = {};
        }
        var _this = _super.call(this, opts) || this;
        /**
         * @property id
         * @type {string}
         * @public
         */
        _this.id = null;
        if (data) {
            _this.update(data);
        }
        return _this;
    }
    /**
     * @overridden BaseModel.update
     */
    InputModel.prototype.update = function (data) {
        _super.prototype.update.call(this, data);
        // Override any values after the default super update method has set the values.
    };
    return InputModel;
}(BaseModel_1["default"]);
exports.__esModule = true;
exports["default"] = InputModel;


},{"../../../../../../../ts/model/BaseModel":42,"babel-runtime/core-js/object/create":1}],41:[function(require,module,exports){
"use strict";

var Util_1 = require("./util/Util");
/**
 * The {{#crossLink "BaseObject"}}{{/crossLink}} class is an abstract class that provides common properties and functionality for all StructureJS classes.
 *
 * @class BaseObject
 * @module StructureJS
 * @submodule core
 * @requires Util
 * @constructor
 * @author Robert S. (www.codeBelt.com)
 */
var BaseObject = function () {
    function BaseObject() {
        /**
         * The sjsId (StructureJS ID) is a unique identifier automatically assigned to most StructureJS objects upon instantiation.
         *
         * @property sjsId
         * @type {int}
         * @default null
         * @writeOnce
         * @readOnly
         * @public
         */
        this.sjsId = null;
        this.sjsId = Util_1["default"].uniqueId();
    }
    /**
     * Returns the fully qualified class name of an object.
     *
     * @method getQualifiedClassName
     * @returns {string} Returns the class name.
     * @public
     * @example
     *     let someClass = new SomeClass();
     *     someClass.getQualifiedClassName();
     *
     *     // SomeClass
     */
    BaseObject.prototype.getQualifiedClassName = function () {
        return Util_1["default"].getName(this);
    };
    /**
     * The purpose of the destroy method is to make an object ready for garbage collection. This
     * should be thought of as a one way function. Once destroy is called no further methods should be
     * called on the object or properties accessed. It is the responsibility of those who implement this
     * function to stop all running Timers, all running Sounds, and take any other steps necessary to make an
     * object eligible for garbage collection.
     *
     * By default the destroy method will null out all properties of the class automatically. You should call destroy
     * on other objects before calling the super.
     *
     * @method destroy
     * @return {void}
     * @public
     * @example
     *     destroy() {
     *          this.disable();
     *
     *          this._childInstance.destroy();
     *
     *          super.destroy();
     *     }
     */
    BaseObject.prototype.destroy = function () {
        for (var key in this) {
            if (this.hasOwnProperty(key) && key !== 'sjsId') {
                this[key] = null;
            }
        }
    };
    return BaseObject;
}();
exports.__esModule = true;
exports["default"] = BaseObject;


},{"./util/Util":43}],42:[function(require,module,exports){
"use strict";

var __extends = this && this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() {
        this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BaseObject_1 = require("../BaseObject");
var Util_1 = require("../util/Util");
/**
 *  Base Model is a design pattern used to transfer data between software application subsystems.
 *
 * Note: If the data doesn't match the property names you can set the value manually after update super method has been called.
 *  Also in the class you inherit BaseModel from you can override the update method to handle the data how you want.
 *
 * @class BaseModel
 * @extends BaseObject
 * @param [data] {any} Provide a way to update the base model upon initialization.
 * @param [opts] {{ expand:boolean }} Options for the base model.
 * @module StructureJS
 * @submodule model
 * @requires Extend
 * @requires BaseObject
 * @requires Util
 * @constructor
 * @author Robert S. (www.codeBelt.com)
 * @example
 *      // Example how to extend the BaseModel class.
 *      let data = {
 *              make: 'Tesla',
 *              model: 'Model S',
 *              YeAr: 2014,
 *              feature: {
 *                  abs: true,
 *                  airbags: true
 *              }
 *      }
 *      let carModel = new CarModel(data);
 *
 *
 *      // Example how to extend the BaseModel class.
 *      class CarModel extends BaseModel {
 *
 *          // You need to have properties so the data will get assigned.
 *          // If not the data will not get assigned to the model.
 *          make = null;
 *          model = null;
 *          year = null;
 *          allWheel = false; // Set a default value
 *
 *          // You can assign BaseModel to a property which will
 *          // automatically created it and pass the data to it.
 *          feature = FeatureModel
 *
 *          // If you have an array of data and want them assign to a BaseModel.
 *          feature = [FeatureModel];
 *
 *          constructor(data = {}, opts = {}) {
 *              super(opts);
 *
 *              if (data) {
 *                  this.update(data);
 *              }
 *          }
 *
 *          // @overridden BaseModel.update
 *          update(data) {
 *              super.update(data);
 *
 *              // If the data doesn't match the property name.
 *              // You can set the value(s) manually after the update super method has been called.
 *              this.year = data.YeAr;
 *          }
 *      }
 */
var BaseModel = function (_super) {
    __extends(BaseModel, _super);
    function BaseModel(opts) {
        if (opts === void 0) {
            opts = {};
        }
        var _this = _super.call(this) || this;
        /**
         * @property sjsOptions
         * @type {IBaseModelOptions}}
         * @public
         */
        _this.sjsOptions = {
            expand: false
        };
        _this.sjsOptions.expand = opts.expand === true;
        return _this;
    }
    /**
     * Provide a way to update the  Base Model.
     *
     * @method update
     * @param [data={}] {any}
     * @public
     * @example
     *     // Example of updating some of the data:
     *     carModel.update({ year: 2015, allWheel: true});
     *
     *     // Of course you can also do it the following way:
     *     carModel.year = 2015;
     *     carModel.allWheel = false;
     */
    BaseModel.prototype.update = function (data) {
        var _this = this;
        if (data === void 0) {
            data = {};
        }
        Object.keys(this).forEach(function (propertyName) {
            // Ignore the sjsId property because it is set in the BaseObject constructor and we don't want to update it.
            if (propertyName !== 'sjsId') {
                var propertyData = _this[propertyName];
                var updateData = data[propertyName];
                var dataToUse = updateData !== void 0 ? updateData : propertyData;
                _this._updatePropertyWithDataPassedIn(propertyName, dataToUse);
            }
        });
        return this;
    };
    /**
     * Adds the updateData to the property
     *
     * @method _updatePropertyWithDataPassedIn
     * @param propertyName
     * @param updateData
     * @protected
     */
    BaseModel.prototype._updatePropertyWithDataPassedIn = function (propertyName, updateData) {
        var _this = this;
        // If the current property on the model is an array and the updateData is an array.
        if (this[propertyName] instanceof Array === true && updateData instanceof Array === true) {
            var isPropertyDataValueAnUninstantiatedBaseModel = typeof this[propertyName][0] === 'function' && this[propertyName][0].IS_BASE_MODEL === true;
            var isUpdateDataValueAnUninstantiatedBaseModel = typeof updateData[0] === 'function' && updateData[0].IS_BASE_MODEL === true;
            if (isPropertyDataValueAnUninstantiatedBaseModel === false) {
                this[propertyName] = updateData.map(function (data) {
                    return _this._updateData(null, data);
                });
            } else if (isPropertyDataValueAnUninstantiatedBaseModel === true && isUpdateDataValueAnUninstantiatedBaseModel === false) {
                // If the property data is an uninstantiated BaseModel then we assume the update data passed in
                // needs to be create as that BaseModel Class.
                var baseModel_1 = this[propertyName][0];
                this[propertyName] = updateData.map(function (data) {
                    return _this._updateData(baseModel_1, data);
                });
            } else {
                this[propertyName] = [];
            }
        } else {
            this[propertyName] = this._updateData(this[propertyName], updateData);
        }
    };
    /**
     * @method _updateData
     * @param propertyData
     * @param updateData
     * @protected
     */
    BaseModel.prototype._updateData = function (propertyData, updateData) {
        var returnData = null;
        if (this.sjsOptions.expand === false && typeof updateData === 'function' && updateData.IS_BASE_MODEL === true) {
            // If updateData is a function and has an IS_BASE_MODEL static property then it must be a child model and we need to return null
            // so it cleans up the BaseModel functions on the property.
            // To create empty model(s) pass { expand: true } for the options.
            return null;
        }
        if (typeof propertyData === 'function' && propertyData.IS_BASE_MODEL === true && updateData) {
            // If the propertyData is an instance of a BaseModel class and has not been created yet.
            // Instantiate it and pass in the updateData to the constructor.
            returnData = new propertyData(updateData, this.sjsOptions);
        } else if (updateData instanceof BaseModel === true) {
            returnData = updateData.clone();
        } else if (propertyData instanceof BaseModel === true) {
            // If propertyData is an instance of a BaseModel class and has already been created.
            // Call the update method and pass in the updateData.
            propertyData.update(updateData);
            returnData = propertyData;
        } else {
            // Else just return the updateData to the property.
            returnData = updateData;
        }
        return returnData;
    };
    /**
     * Converts the Base Model data into a JSON object and deletes the sjsId property.
     *
     * @method toJSON
     * @returns {any}
     * @public
     * @example
     *     const obj = carModel.toJSON();
     */
    BaseModel.prototype.toJSON = function () {
        var clone = Util_1["default"].clone(this);
        return Util_1["default"].deletePropertyFromObject(clone, ['sjsId', 'sjsOptions']);
    };
    /**
     * Converts a  Base Model to a JSON string,
     *
     * @method toJSONString
     * @returns {string}
     * @public
     * @example
     *     const str = carModel.toJSONString();
     */
    BaseModel.prototype.toJSONString = function () {
        return JSON.stringify(this.toJSON());
    };
    /**
     * Converts the string json data into an Object and calls the {{#crossLink "BaseModel/update:method"}}{{/crossLink}} method with the converted Object.
     *
     * @method fromJSON
     * @param json {string}
     * @public
     * @example
     *      const str = '{"make":"Tesla","model":"Model S","year":2014}'
     *      const carModel = new CarModel();
     *      carModel.fromJSON(str);
     */
    BaseModel.prototype.fromJSON = function (json) {
        var parsedData = JSON.parse(json);
        this.update(parsedData);
        return this;
    };
    /**
     * Create a clone/copy of the  Base Model.
     *
     * @method clone
     * @returns {BaseModel}
     * @public
     * @example
     *     const clone = carModel.clone();
     */
    BaseModel.prototype.clone = function () {
        var clonedBaseModel = new this.constructor(this);
        return clonedBaseModel;
    };
    return BaseModel;
}(BaseObject_1["default"]);
/**
 * This property helps distinguish a BaseModel from other functions.
 *
 * @property IS_BASE_MODEL
 * @type {boolean}
 * @public
 * @static
 * @readonly
 */
BaseModel.IS_BASE_MODEL = true;
exports.__esModule = true;
exports["default"] = BaseModel;


},{"../BaseObject":41,"../util/Util":43}],43:[function(require,module,exports){
"use strict";
/**
 * A Utility class that has several static methods to assist in development.
 *
 * @class Util
 * @module StructureJS
 * @submodule util
 * @author Robert S. (www.codeBelt.com)
 * @static
 */

var Util = function () {
    function Util() {
        throw new Error('[Util] Do not instantiate the Util class because it is a static class.');
    }
    /**
     * Generates a unique ID. If a prefix is passed in, the value will be appended to it.
     *
     * @method uniqueId
     * @param [prefix] {string} The string value used for the prefix.
     * @returns {init|string} Returns the unique identifier.
     * @public
     * @static
     * @example
     *      let property = Util.uniqueId();
     *      // 1
     *
     *      let property = Util.uniqueId('prefixName_');
     *      // prefixName_1
     */
    Util.uniqueId = function (prefix) {
        if (prefix === void 0) {
            prefix = null;
        }
        var id = ++Util._idCounter;
        if (prefix != null) {
            return String(prefix + id);
        } else {
            return id;
        }
    };
    /**
     * Removes a list of properties from an object.
     *
     * @method deletePropertyFromObject
     * @param object {Object} The object you want to remove properties from.
     * @param value {string|Array.<string>} A property name or an array of property names you want to remove from the object.
     * @returns {any} Returns the object passed in without the removed the properties.
     * @public
     * @static
     * @example
     *      let obj = { name: 'Robert', gender: 'male', phone: '555-555-5555' }
     *
     *      Util.deletePropertyFromObject(obj, ['phone', 'gender']);
     *
     *      // { name: 'Robert' }
     */
    Util.deletePropertyFromObject = function (object, value) {
        // If properties is not an array then make it an array object.
        var list = value instanceof Array ? value : [value];
        Object.keys(object).forEach(function (key) {
            var value = object[key];
            if (list.includes(key) === true) {
                delete object[key];
            } else if (value instanceof Array) {
                value.forEach(function (item) {
                    return Util.deletePropertyFromObject(item, list);
                });
            } else if (value instanceof Object) {
                Util.deletePropertyFromObject(value, list);
            }
        });
        return object;
    };
    /**
     * Renames a property name on an object.
     *
     * @method renamePropertyOnObject
     * @param object {Object} The object you want to rename properties from.
     * @param oldName {string}
     * @param newName {string}
     * @returns {any} Returns the object passed in renamed properties.
     * @public
     * @static
     * @example
     *      let obj = { name: 'Robert', gender: 'male', phone: '555-555-5555' }
     *
     *      Util.renamePropertyOnObject(obj, 'gender', 'sex');
     *
     *      // { name: 'Robert', sex: 'male', phone: '555-555-5555' }
     */
    Util.renamePropertyOnObject = function (object, oldName, newName) {
        // Check for the old property name to avoid a ReferenceError in strict mode.
        if (object.hasOwnProperty(oldName)) {
            object[newName] = object[oldName];
            delete object[oldName];
        }
        return object;
    };
    /**
     * Makes a clone of an object.
     *
     * @method clone
     * @param obj {Object} The object you to clone.
     * @returns {any} Returns a clone object of the one passed in.
     * @public
     * @static
     * @example
     *      let cloneOfObject = Util.clone(obj);
     */
    Util.clone = function (obj) {
        //other scripts: http://davidwalsh.name/javascript-clone
        //http://oranlooney.com/functional-javascript/
        //http://oranlooney.com/deep-copy-javascript/
        // Handle the 3 simple types, and null or undefined
        if (null == obj || 'object' != typeof obj) {
            return obj;
        }
        // Handle Date
        if (obj instanceof Date) {
            var date = new Date();
            date.setTime(obj.getTime());
            return date;
        }
        // Handle Array
        if (obj instanceof Array) {
            var array = [];
            for (var i = 0, len = obj.length; i < len; i++) {
                array[i] = Util.clone(obj[i]);
            }
            return array;
        }
        // Handle Object
        if (obj instanceof Object) {
            var copy = {};
            for (var attr in obj) {
                if (obj.hasOwnProperty(attr)) {
                    copy[attr] = Util.clone(obj[attr]);
                }
            }
            return copy;
        }
        throw new Error("[Util] Unable to copy obj! Its type isn't supported.");
    };
    /**
     * Converts a string or number to a boolean.
     *
     * @method toBoolean
     * @param strNum {string|number}
     * @returns {boolean}
     * @public
     * @static
     * @example
     *      Util.toBoolean("TRUE");
     *      // true
     *
     *      Util.toBoolean(0);
     *      // false
     *
     *      Util.toBoolean(undefined);
     *      // false
     */
    Util.toBoolean = function (strNum) {
        var value = typeof strNum === 'string' ? strNum.toLowerCase() : strNum;
        return value > 0 || value == 'true' || value == 'yes';
    };
    /**
     * Returns the name of the function/object passed in.
     *
     * @method getName
     * @param classObject {any}
     * @returns {string} Returns the name of the function or object.
     * @static
     * @example
     *      let someClass = new SomeClass();
     *      Util.getName(someClass);            // 'SomeClass'
     *
     *      Util.getName(function Test(){});    // 'Test'
     *      Util.getName(function (){});        // 'anonymous'
     */
    Util.getName = function (classObject) {
        var type = typeof classObject;
        var value;
        var funcNameRegex = /function ([^\(]+)/;
        if (type === 'object') {
            // Gets the name of the object.
            var results = classObject.constructor.toString().match(funcNameRegex);
            value = results[1];
        } else {
            // This else code is mainly for Internet Explore.
            var isFunction = type === 'function';
            // TODO: figure out how to explain this
            var name_1 = isFunction && (classObject.name && ['', classObject.name] || classObject.toString().match(funcNameRegex));
            if (isFunction === false) {
                value = type;
            } else if (name_1 && name_1[1]) {
                value = name_1[1];
            } else {
                value = 'anonymous';
            }
        }
        return value;
    };
    /**
     * Creates and returns a new debounced version of the passed function which will postpone its execution until after
     * wait milliseconds have elapsed since the last time it was invoked.
     *
     * @method debounce
     * @param callback {Function} The function that should be executed.
     * @param wait {number} Milliseconds to elapsed before invoking the callback.
     * @param immediate {boolean} Pass true for the immediate parameter to cause debounce to trigger the function on the leading instead of the trailing edge of the wait interval. Useful in circumstances like preventing accidental double-clicks on a "submit" button from firing a second time.
     * @param callbackScope {any} The scope of the callback function that should be executed.
     * @public
     * @static
     * @example
     *      Util.debounce(this._onBreakpointChange, 250, false, this);
     */
    Util.debounce = function (callback, wait, immediate, callbackScope) {
        var timeout;
        var result;
        var debounced = function () {
            var args = arguments;
            function delayed() {
                if (immediate == false) {
                    result = callback.apply(callbackScope, args);
                }
                timeout = null;
            }
            if (timeout) {
                clearTimeout(timeout);
            } else if (immediate === true) {
                result = callback.apply(callbackScope, args);
            }
            timeout = setTimeout(delayed, wait);
            return result;
        };
        debounced.cancel = function () {
            clearTimeout(timeout);
        };
        return debounced;
    };
    /**
     * TODO: YUIDoc_comment
     *
     * @method applyMixins
     * @param derivedCtor {any}
     * @param baseCtors {any}
     * @public
     * @static
     * @example
     *
     class Flies {
                fly() {
                    alert('Is it a bird? Is it a plane?');
                }
            }
      class Climbs {
                climb() {
                    alert('My spider-sense is tingling.');
                }
            }
      class HorseflyWoman implements Climbs, Flies {
                climb: () => void;
                fly: () => void;
            }
      Util.applyMixins(HorseflyWoman, [Climbs, Flies]);
     */
    Util.applyMixins = function (derivedCtor, baseCtors) {
        baseCtors.forEach(function (baseCtor) {
            Object.getOwnPropertyNames(baseCtor.prototype).forEach(function (name) {
                derivedCtor.prototype[name] = baseCtor.prototype[name];
            });
        });
    };
    /**
     * Returns a new array with duplicates removed.
     *
     * @method unique
     * @param list {Array.<any>} The array you want to use to generate the unique array.
     * @return {Array<any>} Returns a new array list of unique items.
     * @protected
     */
    Util.unique = function (list) {
        var uniqueList = list.reduce(function (previousValue, currentValue) {
            if (previousValue.indexOf(currentValue) === -1) {
                previousValue.push(currentValue);
            }
            return previousValue;
        }, []);
        return uniqueList;
    };
    return Util;
}();
/**
 * Keeps track of the count for the uniqueId method.
 *
 * @property _idCounter
 * @type {int}
 * @private
 * @static
 */
Util._idCounter = 0;
exports.__esModule = true;
exports["default"] = Util;


},{}]},{},[38])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9jb3JlLWpzL29iamVjdC9jcmVhdGUuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9jcmVhdGUuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2EtZnVuY3Rpb24uanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2FuLW9iamVjdC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fYXJyYXktaW5jbHVkZXMuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2NvZi5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fY29yZS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fY3R4LmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19kZWZpbmVkLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19kZXNjcmlwdG9ycy5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZG9tLWNyZWF0ZS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZW51bS1idWcta2V5cy5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZXhwb3J0LmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19mYWlscy5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZ2xvYmFsLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19oYXMuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2hpZGUuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2h0bWwuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2llOC1kb20tZGVmaW5lLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pb2JqZWN0LmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pcy1vYmplY3QuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1jcmVhdGUuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1kcC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWRwcy5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWtleXMtaW50ZXJuYWwuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1rZXlzLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19wcm9wZXJ0eS1kZXNjLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19zaGFyZWQta2V5LmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19zaGFyZWQuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLWluZGV4LmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1pbnRlZ2VyLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1pb2JqZWN0LmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1sZW5ndGguanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLXByaW1pdGl2ZS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdWlkLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5vYmplY3QuY3JlYXRlLmpzIiwic3JjL2Fzc2V0cy9zY3JpcHRzL0FwcC5qcyIsInNyYy9hc3NldHMvc2NyaXB0cy9tYWluLnRzIiwic3JjL2Fzc2V0cy9zY3JpcHRzL21vZGVscy9DaGVja291dFZpZXdNb2RlbC5qcyIsInNyYy9hc3NldHMvc2NyaXB0cy9tb2RlbHMvZm9ybS9JbnB1dE1vZGVsLmpzIiwiLi4vLi4vdHMvQmFzZU9iamVjdC5qcyIsIi4uLy4uL3RzL21vZGVsL0Jhc2VNb2RlbC5qcyIsIi4uLy4uL3RzL3V0aWwvVXRpbC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBOztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDSkE7QUFDQTtBQUNBO0FBQ0E7O0FDSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDSkE7QUFDQTs7QUNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0pBO0FBQ0E7QUFDQTtBQUNBOztBQ0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ05BO0FBQ0E7QUFDQTtBQUNBOztBQ0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNOQTtBQUNBO0FBQ0E7QUFDQTs7QUNIQTtBQUNBO0FBQ0E7QUFDQTs7QUNIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1BBOztBQ0FBO0FBQ0E7QUFDQTs7QUNGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0pBO0FBQ0E7QUFDQTs7QUNGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEJBO0FB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LFlBQVk7QUFDM0IseUJBQWEsT0FBYjtBQUNILFNBRkQ7QUFHQSxlQUFPLFNBQVA7QUFDSCxLQXhCRDtBQXlCQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUE2QkEsU0FBSyxXQUFMLEdBQW1CLFVBQVUsV0FBVixFQUF1QixTQUF2QixFQUFrQztBQUNqRCxrQkFBVSxPQUFWLENBQWtCLFVBQVUsUUFBVixFQUFvQjtBQUNsQyxtQkFBTyxtQkFBUCxDQUEyQixTQUFTLFNBQXBDLEVBQStDLE9BQS9DLENBQXVELFVBQVUsSUFBVixFQUFnQjtBQUNuRSw0QkFBWSxTQUFaLENBQXNCLElBQXRCLElBQThCLFNBQVMsU0FBVCxDQUFtQixJQUFuQixDQUE5QjtBQUNILGFBRkQ7QUFHSCxTQUpEO0FBS0gsS0FORDtBQU9BOzs7Ozs7OztBQVFBLFNBQUssTUFBTCxHQUFjLFVBQVUsSUFBVixFQUFnQjtBQUMxQixZQUFJLGFBQWEsS0FBSyxNQUFMLENBQVksVUFBVSxhQUFWLEVBQXlCLFlBQXpCLEVBQXVDO0FBQ2hFLGdCQUFJLGNBQWMsT0FBZCxDQUFzQixZQUF0QixNQUF3QyxDQUFDLENBQTdDLEVBQWdEO0FBQzVDLDhCQUFjLElBQWQsQ0FBbUIsWUFBbkI7QUFDSDtBQUNELG1CQUFPLGFBQVA7QUFDSCxTQUxnQixFQUtkLEVBTGMsQ0FBakI7QUFNQSxlQUFPLFVBQVA7QUFDSCxLQVJEO0FBU0EsV0FBTyxJQUFQO0FBQ0gsQ0FqU1csRUFBWjtBQWtTQTs7Ozs7Ozs7QUFRQSxLQUFLLFVBQUwsR0FBa0IsQ0FBbEI7QUFDQSxRQUFRLFVBQVIsR0FBcUIsSUFBckI7QUFDQSxRQUFRLFNBQVIsSUFBcUIsSUFBckI7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJtb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2NyZWF0ZVwiKSwgX19lc01vZHVsZTogdHJ1ZSB9OyIsInJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM2Lm9iamVjdC5jcmVhdGUnKTtcbnZhciAkT2JqZWN0ID0gcmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9fY29yZScpLk9iamVjdDtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gY3JlYXRlKFAsIEQpe1xuICByZXR1cm4gJE9iamVjdC5jcmVhdGUoUCwgRCk7XG59OyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICBpZih0eXBlb2YgaXQgIT0gJ2Z1bmN0aW9uJyl0aHJvdyBUeXBlRXJyb3IoaXQgKyAnIGlzIG5vdCBhIGZ1bmN0aW9uIScpO1xuICByZXR1cm4gaXQ7XG59OyIsInZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vX2lzLW9iamVjdCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIGlmKCFpc09iamVjdChpdCkpdGhyb3cgVHlwZUVycm9yKGl0ICsgJyBpcyBub3QgYW4gb2JqZWN0IScpO1xuICByZXR1cm4gaXQ7XG59OyIsIi8vIGZhbHNlIC0+IEFycmF5I2luZGV4T2Zcbi8vIHRydWUgIC0+IEFycmF5I2luY2x1ZGVzXG52YXIgdG9JT2JqZWN0ID0gcmVxdWlyZSgnLi9fdG8taW9iamVjdCcpXG4gICwgdG9MZW5ndGggID0gcmVxdWlyZSgnLi9fdG8tbGVuZ3RoJylcbiAgLCB0b0luZGV4ICAgPSByZXF1aXJlKCcuL190by1pbmRleCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihJU19JTkNMVURFUyl7XG4gIHJldHVybiBmdW5jdGlvbigkdGhpcywgZWwsIGZyb21JbmRleCl7XG4gICAgdmFyIE8gICAgICA9IHRvSU9iamVjdCgkdGhpcylcbiAgICAgICwgbGVuZ3RoID0gdG9MZW5ndGgoTy5sZW5ndGgpXG4gICAgICAsIGluZGV4ICA9IHRvSW5kZXgoZnJvbUluZGV4LCBsZW5ndGgpXG4gICAgICAsIHZhbHVlO1xuICAgIC8vIEFycmF5I2luY2x1ZGVzIHVzZXMgU2FtZVZhbHVlWmVybyBlcXVhbGl0eSBhbGdvcml0aG1cbiAgICBpZihJU19JTkNMVURFUyAmJiBlbCAhPSBlbCl3aGlsZShsZW5ndGggPiBpbmRleCl7XG4gICAgICB2YWx1ZSA9IE9baW5kZXgrK107XG4gICAgICBpZih2YWx1ZSAhPSB2YWx1ZSlyZXR1cm4gdHJ1ZTtcbiAgICAvLyBBcnJheSN0b0luZGV4IGlnbm9yZXMgaG9sZXMsIEFycmF5I2luY2x1ZGVzIC0gbm90XG4gICAgfSBlbHNlIGZvcig7bGVuZ3RoID4gaW5kZXg7IGluZGV4KyspaWYoSVNfSU5DTFVERVMgfHwgaW5kZXggaW4gTyl7XG4gICAgICBpZihPW2luZGV4XSA9PT0gZWwpcmV0dXJuIElTX0lOQ0xVREVTIHx8IGluZGV4IHx8IDA7XG4gICAgfSByZXR1cm4gIUlTX0lOQ0xVREVTICYmIC0xO1xuICB9O1xufTsiLCJ2YXIgdG9TdHJpbmcgPSB7fS50b1N0cmluZztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKGl0KS5zbGljZSg4LCAtMSk7XG59OyIsInZhciBjb3JlID0gbW9kdWxlLmV4cG9ydHMgPSB7dmVyc2lvbjogJzIuNC4wJ307XG5pZih0eXBlb2YgX19lID09ICdudW1iZXInKV9fZSA9IGNvcmU7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW5kZWYiLCIvLyBvcHRpb25hbCAvIHNpbXBsZSBjb250ZXh0IGJpbmRpbmdcbnZhciBhRnVuY3Rpb24gPSByZXF1aXJlKCcuL19hLWZ1bmN0aW9uJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGZuLCB0aGF0LCBsZW5ndGgpe1xuICBhRnVuY3Rpb24oZm4pO1xuICBpZih0aGF0ID09PSB1bmRlZmluZWQpcmV0dXJuIGZuO1xuICBzd2l0Y2gobGVuZ3RoKXtcbiAgICBjYXNlIDE6IHJldHVybiBmdW5jdGlvbihhKXtcbiAgICAgIHJldHVybiBmbi5jYWxsKHRoYXQsIGEpO1xuICAgIH07XG4gICAgY2FzZSAyOiByZXR1cm4gZnVuY3Rpb24oYSwgYil7XG4gICAgICByZXR1cm4gZm4uY2FsbCh0aGF0LCBhLCBiKTtcbiAgICB9O1xuICAgIGNhc2UgMzogcmV0dXJuIGZ1bmN0aW9uKGEsIGIsIGMpe1xuICAgICAgcmV0dXJuIGZuLmNhbGwodGhhdCwgYSwgYiwgYyk7XG4gICAgfTtcbiAgfVxuICByZXR1cm4gZnVuY3Rpb24oLyogLi4uYXJncyAqLyl7XG4gICAgcmV0dXJuIGZuLmFwcGx5KHRoYXQsIGFyZ3VtZW50cyk7XG4gIH07XG59OyIsIi8vIDcuMi4xIFJlcXVpcmVPYmplY3RDb2VyY2libGUoYXJndW1lbnQpXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgaWYoaXQgPT0gdW5kZWZpbmVkKXRocm93IFR5cGVFcnJvcihcIkNhbid0IGNhbGwgbWV0aG9kIG9uICBcIiArIGl0KTtcbiAgcmV0dXJuIGl0O1xufTsiLCIvLyBUaGFuaydzIElFOCBmb3IgaGlzIGZ1bm55IGRlZmluZVByb3BlcnR5XG5tb2R1bGUuZXhwb3J0cyA9ICFyZXF1aXJlKCcuL19mYWlscycpKGZ1bmN0aW9uKCl7XG4gIHJldHVybiBPYmplY3QuZGVmaW5lUHJvcGVydHkoe30sICdhJywge2dldDogZnVuY3Rpb24oKXsgcmV0dXJuIDc7IH19KS5hICE9IDc7XG59KTsiLCJ2YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKVxuICAsIGRvY3VtZW50ID0gcmVxdWlyZSgnLi9fZ2xvYmFsJykuZG9jdW1lbnRcbiAgLy8gaW4gb2xkIElFIHR5cGVvZiBkb2N1bWVudC5jcmVhdGVFbGVtZW50IGlzICdvYmplY3QnXG4gICwgaXMgPSBpc09iamVjdChkb2N1bWVudCkgJiYgaXNPYmplY3QoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIGlzID8gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChpdCkgOiB7fTtcbn07IiwiLy8gSUUgOC0gZG9uJ3QgZW51bSBidWcga2V5c1xubW9kdWxlLmV4cG9ydHMgPSAoXG4gICdjb25zdHJ1Y3RvcixoYXNPd25Qcm9wZXJ0eSxpc1Byb3RvdHlwZU9mLHByb3BlcnR5SXNFbnVtZXJhYmxlLHRvTG9jYWxlU3RyaW5nLHRvU3RyaW5nLHZhbHVlT2YnXG4pLnNwbGl0KCcsJyk7IiwidmFyIGdsb2JhbCAgICA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpXG4gICwgY29yZSAgICAgID0gcmVxdWlyZSgnLi9fY29yZScpXG4gICwgY3R4ICAgICAgID0gcmVxdWlyZSgnLi9fY3R4JylcbiAgLCBoaWRlICAgICAgPSByZXF1aXJlKCcuL19oaWRlJylcbiAgLCBQUk9UT1RZUEUgPSAncHJvdG90eXBlJztcblxudmFyICRleHBvcnQgPSBmdW5jdGlvbih0eXBlLCBuYW1lLCBzb3VyY2Upe1xuICB2YXIgSVNfRk9SQ0VEID0gdHlwZSAmICRleHBvcnQuRlxuICAgICwgSVNfR0xPQkFMID0gdHlwZSAmICRleHBvcnQuR1xuICAgICwgSVNfU1RBVElDID0gdHlwZSAmICRleHBvcnQuU1xuICAgICwgSVNfUFJPVE8gID0gdHlwZSAmICRleHBvcnQuUFxuICAgICwgSVNfQklORCAgID0gdHlwZSAmICRleHBvcnQuQlxuICAgICwgSVNfV1JBUCAgID0gdHlwZSAmICRleHBvcnQuV1xuICAgICwgZXhwb3J0cyAgID0gSVNfR0xPQkFMID8gY29yZSA6IGNvcmVbbmFtZV0gfHwgKGNvcmVbbmFtZV0gPSB7fSlcbiAgICAsIGV4cFByb3RvICA9IGV4cG9ydHNbUFJPVE9UWVBFXVxuICAgICwgdGFyZ2V0ICAgID0gSVNfR0xPQkFMID8gZ2xvYmFsIDogSVNfU1RBVElDID8gZ2xvYmFsW25hbWVdIDogKGdsb2JhbFtuYW1lXSB8fCB7fSlbUFJPVE9UWVBFXVxuICAgICwga2V5LCBvd24sIG91dDtcbiAgaWYoSVNfR0xPQkFMKXNvdXJjZSA9IG5hbWU7XG4gIGZvcihrZXkgaW4gc291cmNlKXtcbiAgICAvLyBjb250YWlucyBpbiBuYXRpdmVcbiAgICBvd24gPSAhSVNfRk9SQ0VEICYmIHRhcmdldCAmJiB0YXJnZXRba2V5XSAhPT0gdW5kZWZpbmVkO1xuICAgIGlmKG93biAmJiBrZXkgaW4gZXhwb3J0cyljb250aW51ZTtcbiAgICAvLyBleHBvcnQgbmF0aXZlIG9yIHBhc3NlZFxuICAgIG91dCA9IG93biA/IHRhcmdldFtrZXldIDogc291cmNlW2tleV07XG4gICAgLy8gcHJldmVudCBnbG9iYWwgcG9sbHV0aW9uIGZvciBuYW1lc3BhY2VzXG4gICAgZXhwb3J0c1trZXldID0gSVNfR0xPQkFMICYmIHR5cGVvZiB0YXJnZXRba2V5XSAhPSAnZnVuY3Rpb24nID8gc291cmNlW2tleV1cbiAgICAvLyBiaW5kIHRpbWVycyB0byBnbG9iYWwgZm9yIGNhbGwgZnJvbSBleHBvcnQgY29udGV4dFxuICAgIDogSVNfQklORCAmJiBvd24gPyBjdHgob3V0LCBnbG9iYWwpXG4gICAgLy8gd3JhcCBnbG9iYWwgY29uc3RydWN0b3JzIGZvciBwcmV2ZW50IGNoYW5nZSB0aGVtIGluIGxpYnJhcnlcbiAgICA6IElTX1dSQVAgJiYgdGFyZ2V0W2tleV0gPT0gb3V0ID8gKGZ1bmN0aW9uKEMpe1xuICAgICAgdmFyIEYgPSBmdW5jdGlvbihhLCBiLCBjKXtcbiAgICAgICAgaWYodGhpcyBpbnN0YW5jZW9mIEMpe1xuICAgICAgICAgIHN3aXRjaChhcmd1bWVudHMubGVuZ3RoKXtcbiAgICAgICAgICAgIGNhc2UgMDogcmV0dXJuIG5ldyBDO1xuICAgICAgICAgICAgY2FzZSAxOiByZXR1cm4gbmV3IEMoYSk7XG4gICAgICAgICAgICBjYXNlIDI6IHJldHVybiBuZXcgQyhhLCBiKTtcbiAgICAgICAgICB9IHJldHVybiBuZXcgQyhhLCBiLCBjKTtcbiAgICAgICAgfSByZXR1cm4gQy5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgfTtcbiAgICAgIEZbUFJPVE9UWVBFXSA9IENbUFJPVE9UWVBFXTtcbiAgICAgIHJldHVybiBGO1xuICAgIC8vIG1ha2Ugc3RhdGljIHZlcnNpb25zIGZvciBwcm90b3R5cGUgbWV0aG9kc1xuICAgIH0pKG91dCkgOiBJU19QUk9UTyAmJiB0eXBlb2Ygb3V0ID09ICdmdW5jdGlvbicgPyBjdHgoRnVuY3Rpb24uY2FsbCwgb3V0KSA6IG91dDtcbiAgICAvLyBleHBvcnQgcHJvdG8gbWV0aG9kcyB0byBjb3JlLiVDT05TVFJVQ1RPUiUubWV0aG9kcy4lTkFNRSVcbiAgICBpZihJU19QUk9UTyl7XG4gICAgICAoZXhwb3J0cy52aXJ0dWFsIHx8IChleHBvcnRzLnZpcnR1YWwgPSB7fSkpW2tleV0gPSBvdXQ7XG4gICAgICAvLyBleHBvcnQgcHJvdG8gbWV0aG9kcyB0byBjb3JlLiVDT05TVFJVQ1RPUiUucHJvdG90eXBlLiVOQU1FJVxuICAgICAgaWYodHlwZSAmICRleHBvcnQuUiAmJiBleHBQcm90byAmJiAhZXhwUHJvdG9ba2V5XSloaWRlKGV4cFByb3RvLCBrZXksIG91dCk7XG4gICAgfVxuICB9XG59O1xuLy8gdHlwZSBiaXRtYXBcbiRleHBvcnQuRiA9IDE7ICAgLy8gZm9yY2VkXG4kZXhwb3J0LkcgPSAyOyAgIC8vIGdsb2JhbFxuJGV4cG9ydC5TID0gNDsgICAvLyBzdGF0aWNcbiRleHBvcnQuUCA9IDg7ICAgLy8gcHJvdG9cbiRleHBvcnQuQiA9IDE2OyAgLy8gYmluZFxuJGV4cG9ydC5XID0gMzI7ICAvLyB3cmFwXG4kZXhwb3J0LlUgPSA2NDsgIC8vIHNhZmVcbiRleHBvcnQuUiA9IDEyODsgLy8gcmVhbCBwcm90byBtZXRob2QgZm9yIGBsaWJyYXJ5YCBcbm1vZHVsZS5leHBvcnRzID0gJGV4cG9ydDsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGV4ZWMpe1xuICB0cnkge1xuICAgIHJldHVybiAhIWV4ZWMoKTtcbiAgfSBjYXRjaChlKXtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxufTsiLCIvLyBodHRwczovL2dpdGh1Yi5jb20vemxvaXJvY2svY29yZS1qcy9pc3N1ZXMvODYjaXNzdWVjb21tZW50LTExNTc1OTAyOFxudmFyIGdsb2JhbCA9IG1vZHVsZS5leHBvcnRzID0gdHlwZW9mIHdpbmRvdyAhPSAndW5kZWZpbmVkJyAmJiB3aW5kb3cuTWF0aCA9PSBNYXRoXG4gID8gd2luZG93IDogdHlwZW9mIHNlbGYgIT0gJ3VuZGVmaW5lZCcgJiYgc2VsZi5NYXRoID09IE1hdGggPyBzZWxmIDogRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcbmlmKHR5cGVvZiBfX2cgPT0gJ251bWJlcicpX19nID0gZ2xvYmFsOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVuZGVmIiwidmFyIGhhc093blByb3BlcnR5ID0ge30uaGFzT3duUHJvcGVydHk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0LCBrZXkpe1xuICByZXR1cm4gaGFzT3duUHJvcGVydHkuY2FsbChpdCwga2V5KTtcbn07IiwidmFyIGRQICAgICAgICAgPSByZXF1aXJlKCcuL19vYmplY3QtZHAnKVxuICAsIGNyZWF0ZURlc2MgPSByZXF1aXJlKCcuL19wcm9wZXJ0eS1kZXNjJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJykgPyBmdW5jdGlvbihvYmplY3QsIGtleSwgdmFsdWUpe1xuICByZXR1cm4gZFAuZihvYmplY3QsIGtleSwgY3JlYXRlRGVzYygxLCB2YWx1ZSkpO1xufSA6IGZ1bmN0aW9uKG9iamVjdCwga2V5LCB2YWx1ZSl7XG4gIG9iamVjdFtrZXldID0gdmFsdWU7XG4gIHJldHVybiBvYmplY3Q7XG59OyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9fZ2xvYmFsJykuZG9jdW1lbnQgJiYgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50OyIsIm1vZHVsZS5leHBvcnRzID0gIXJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJykgJiYgIXJlcXVpcmUoJy4vX2ZhaWxzJykoZnVuY3Rpb24oKXtcbiAgcmV0dXJuIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShyZXF1aXJlKCcuL19kb20tY3JlYXRlJykoJ2RpdicpLCAnYScsIHtnZXQ6IGZ1bmN0aW9uKCl7IHJldHVybiA3OyB9fSkuYSAhPSA3O1xufSk7IiwiLy8gZmFsbGJhY2sgZm9yIG5vbi1hcnJheS1saWtlIEVTMyBhbmQgbm9uLWVudW1lcmFibGUgb2xkIFY4IHN0cmluZ3NcbnZhciBjb2YgPSByZXF1aXJlKCcuL19jb2YnKTtcbm1vZHVsZS5leHBvcnRzID0gT2JqZWN0KCd6JykucHJvcGVydHlJc0VudW1lcmFibGUoMCkgPyBPYmplY3QgOiBmdW5jdGlvbihpdCl7XG4gIHJldHVybiBjb2YoaXQpID09ICdTdHJpbmcnID8gaXQuc3BsaXQoJycpIDogT2JqZWN0KGl0KTtcbn07IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIHJldHVybiB0eXBlb2YgaXQgPT09ICdvYmplY3QnID8gaXQgIT09IG51bGwgOiB0eXBlb2YgaXQgPT09ICdmdW5jdGlvbic7XG59OyIsIi8vIDE5LjEuMi4yIC8gMTUuMi4zLjUgT2JqZWN0LmNyZWF0ZShPIFssIFByb3BlcnRpZXNdKVxudmFyIGFuT2JqZWN0ICAgID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0JylcbiAgLCBkUHMgICAgICAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1kcHMnKVxuICAsIGVudW1CdWdLZXlzID0gcmVxdWlyZSgnLi9fZW51bS1idWcta2V5cycpXG4gICwgSUVfUFJPVE8gICAgPSByZXF1aXJlKCcuL19zaGFyZWQta2V5JykoJ0lFX1BST1RPJylcbiAgLCBFbXB0eSAgICAgICA9IGZ1bmN0aW9uKCl7IC8qIGVtcHR5ICovIH1cbiAgLCBQUk9UT1RZUEUgICA9ICdwcm90b3R5cGUnO1xuXG4vLyBDcmVhdGUgb2JqZWN0IHdpdGggZmFrZSBgbnVsbGAgcHJvdG90eXBlOiB1c2UgaWZyYW1lIE9iamVjdCB3aXRoIGNsZWFyZWQgcHJvdG90eXBlXG52YXIgY3JlYXRlRGljdCA9IGZ1bmN0aW9uKCl7XG4gIC8vIFRocmFzaCwgd2FzdGUgYW5kIHNvZG9teTogSUUgR0MgYnVnXG4gIHZhciBpZnJhbWUgPSByZXF1aXJlKCcuL19kb20tY3JlYXRlJykoJ2lmcmFtZScpXG4gICAgLCBpICAgICAgPSBlbnVtQnVnS2V5cy5sZW5ndGhcbiAgICAsIGx0ICAgICA9ICc8J1xuICAgICwgZ3QgICAgID0gJz4nXG4gICAgLCBpZnJhbWVEb2N1bWVudDtcbiAgaWZyYW1lLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gIHJlcXVpcmUoJy4vX2h0bWwnKS5hcHBlbmRDaGlsZChpZnJhbWUpO1xuICBpZnJhbWUuc3JjID0gJ2phdmFzY3JpcHQ6JzsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1zY3JpcHQtdXJsXG4gIC8vIGNyZWF0ZURpY3QgPSBpZnJhbWUuY29udGVudFdpbmRvdy5PYmplY3Q7XG4gIC8vIGh0bWwucmVtb3ZlQ2hpbGQoaWZyYW1lKTtcbiAgaWZyYW1lRG9jdW1lbnQgPSBpZnJhbWUuY29udGVudFdpbmRvdy5kb2N1bWVudDtcbiAgaWZyYW1lRG9jdW1lbnQub3BlbigpO1xuICBpZnJhbWVEb2N1bWVudC53cml0ZShsdCArICdzY3JpcHQnICsgZ3QgKyAnZG9jdW1lbnQuRj1PYmplY3QnICsgbHQgKyAnL3NjcmlwdCcgKyBndCk7XG4gIGlmcmFtZURvY3VtZW50LmNsb3NlKCk7XG4gIGNyZWF0ZURpY3QgPSBpZnJhbWVEb2N1bWVudC5GO1xuICB3aGlsZShpLS0pZGVsZXRlIGNyZWF0ZURpY3RbUFJPVE9UWVBFXVtlbnVtQnVnS2V5c1tpXV07XG4gIHJldHVybiBjcmVhdGVEaWN0KCk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IE9iamVjdC5jcmVhdGUgfHwgZnVuY3Rpb24gY3JlYXRlKE8sIFByb3BlcnRpZXMpe1xuICB2YXIgcmVzdWx0O1xuICBpZihPICE9PSBudWxsKXtcbiAgICBFbXB0eVtQUk9UT1RZUEVdID0gYW5PYmplY3QoTyk7XG4gICAgcmVzdWx0ID0gbmV3IEVtcHR5O1xuICAgIEVtcHR5W1BST1RPVFlQRV0gPSBudWxsO1xuICAgIC8vIGFkZCBcIl9fcHJvdG9fX1wiIGZvciBPYmplY3QuZ2V0UHJvdG90eXBlT2YgcG9seWZpbGxcbiAgICByZXN1bHRbSUVfUFJPVE9dID0gTztcbiAgfSBlbHNlIHJlc3VsdCA9IGNyZWF0ZURpY3QoKTtcbiAgcmV0dXJuIFByb3BlcnRpZXMgPT09IHVuZGVmaW5lZCA/IHJlc3VsdCA6IGRQcyhyZXN1bHQsIFByb3BlcnRpZXMpO1xufTtcbiIsInZhciBhbk9iamVjdCAgICAgICA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpXG4gICwgSUU4X0RPTV9ERUZJTkUgPSByZXF1aXJlKCcuL19pZTgtZG9tLWRlZmluZScpXG4gICwgdG9QcmltaXRpdmUgICAgPSByZXF1aXJlKCcuL190by1wcmltaXRpdmUnKVxuICAsIGRQICAgICAgICAgICAgID0gT2JqZWN0LmRlZmluZVByb3BlcnR5O1xuXG5leHBvcnRzLmYgPSByZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpID8gT2JqZWN0LmRlZmluZVByb3BlcnR5IDogZnVuY3Rpb24gZGVmaW5lUHJvcGVydHkoTywgUCwgQXR0cmlidXRlcyl7XG4gIGFuT2JqZWN0KE8pO1xuICBQID0gdG9QcmltaXRpdmUoUCwgdHJ1ZSk7XG4gIGFuT2JqZWN0KEF0dHJpYnV0ZXMpO1xuICBpZihJRThfRE9NX0RFRklORSl0cnkge1xuICAgIHJldHVybiBkUChPLCBQLCBBdHRyaWJ1dGVzKTtcbiAgfSBjYXRjaChlKXsgLyogZW1wdHkgKi8gfVxuICBpZignZ2V0JyBpbiBBdHRyaWJ1dGVzIHx8ICdzZXQnIGluIEF0dHJpYnV0ZXMpdGhyb3cgVHlwZUVycm9yKCdBY2Nlc3NvcnMgbm90IHN1cHBvcnRlZCEnKTtcbiAgaWYoJ3ZhbHVlJyBpbiBBdHRyaWJ1dGVzKU9bUF0gPSBBdHRyaWJ1dGVzLnZhbHVlO1xuICByZXR1cm4gTztcbn07IiwidmFyIGRQICAgICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWRwJylcbiAgLCBhbk9iamVjdCA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpXG4gICwgZ2V0S2V5cyAgPSByZXF1aXJlKCcuL19vYmplY3Qta2V5cycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJykgPyBPYmplY3QuZGVmaW5lUHJvcGVydGllcyA6IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXMoTywgUHJvcGVydGllcyl7XG4gIGFuT2JqZWN0KE8pO1xuICB2YXIga2V5cyAgID0gZ2V0S2V5cyhQcm9wZXJ0aWVzKVxuICAgICwgbGVuZ3RoID0ga2V5cy5sZW5ndGhcbiAgICAsIGkgPSAwXG4gICAgLCBQO1xuICB3aGlsZShsZW5ndGggPiBpKWRQLmYoTywgUCA9IGtleXNbaSsrXSwgUHJvcGVydGllc1tQXSk7XG4gIHJldHVybiBPO1xufTsiLCJ2YXIgaGFzICAgICAgICAgID0gcmVxdWlyZSgnLi9faGFzJylcbiAgLCB0b0lPYmplY3QgICAgPSByZXF1aXJlKCcuL190by1pb2JqZWN0JylcbiAgLCBhcnJheUluZGV4T2YgPSByZXF1aXJlKCcuL19hcnJheS1pbmNsdWRlcycpKGZhbHNlKVxuICAsIElFX1BST1RPICAgICA9IHJlcXVpcmUoJy4vX3NoYXJlZC1rZXknKSgnSUVfUFJPVE8nKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihvYmplY3QsIG5hbWVzKXtcbiAgdmFyIE8gICAgICA9IHRvSU9iamVjdChvYmplY3QpXG4gICAgLCBpICAgICAgPSAwXG4gICAgLCByZXN1bHQgPSBbXVxuICAgICwga2V5O1xuICBmb3Ioa2V5IGluIE8paWYoa2V5ICE9IElFX1BST1RPKWhhcyhPLCBrZXkpICYmIHJlc3VsdC5wdXNoKGtleSk7XG4gIC8vIERvbid0IGVudW0gYnVnICYgaGlkZGVuIGtleXNcbiAgd2hpbGUobmFtZXMubGVuZ3RoID4gaSlpZihoYXMoTywga2V5ID0gbmFtZXNbaSsrXSkpe1xuICAgIH5hcnJheUluZGV4T2YocmVzdWx0LCBrZXkpIHx8IHJlc3VsdC5wdXNoKGtleSk7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn07IiwiLy8gMTkuMS4yLjE0IC8gMTUuMi4zLjE0IE9iamVjdC5rZXlzKE8pXG52YXIgJGtleXMgICAgICAgPSByZXF1aXJlKCcuL19vYmplY3Qta2V5cy1pbnRlcm5hbCcpXG4gICwgZW51bUJ1Z0tleXMgPSByZXF1aXJlKCcuL19lbnVtLWJ1Zy1rZXlzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gT2JqZWN0LmtleXMgfHwgZnVuY3Rpb24ga2V5cyhPKXtcbiAgcmV0dXJuICRrZXlzKE8sIGVudW1CdWdLZXlzKTtcbn07IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihiaXRtYXAsIHZhbHVlKXtcbiAgcmV0dXJuIHtcbiAgICBlbnVtZXJhYmxlICA6ICEoYml0bWFwICYgMSksXG4gICAgY29uZmlndXJhYmxlOiAhKGJpdG1hcCAmIDIpLFxuICAgIHdyaXRhYmxlICAgIDogIShiaXRtYXAgJiA0KSxcbiAgICB2YWx1ZSAgICAgICA6IHZhbHVlXG4gIH07XG59OyIsInZhciBzaGFyZWQgPSByZXF1aXJlKCcuL19zaGFyZWQnKSgna2V5cycpXG4gICwgdWlkICAgID0gcmVxdWlyZSgnLi9fdWlkJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGtleSl7XG4gIHJldHVybiBzaGFyZWRba2V5XSB8fCAoc2hhcmVkW2tleV0gPSB1aWQoa2V5KSk7XG59OyIsInZhciBnbG9iYWwgPSByZXF1aXJlKCcuL19nbG9iYWwnKVxuICAsIFNIQVJFRCA9ICdfX2NvcmUtanNfc2hhcmVkX18nXG4gICwgc3RvcmUgID0gZ2xvYmFsW1NIQVJFRF0gfHwgKGdsb2JhbFtTSEFSRURdID0ge30pO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihrZXkpe1xuICByZXR1cm4gc3RvcmVba2V5XSB8fCAoc3RvcmVba2V5XSA9IHt9KTtcbn07IiwidmFyIHRvSW50ZWdlciA9IHJlcXVpcmUoJy4vX3RvLWludGVnZXInKVxuICAsIG1heCAgICAgICA9IE1hdGgubWF4XG4gICwgbWluICAgICAgID0gTWF0aC5taW47XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGluZGV4LCBsZW5ndGgpe1xuICBpbmRleCA9IHRvSW50ZWdlcihpbmRleCk7XG4gIHJldHVybiBpbmRleCA8IDAgPyBtYXgoaW5kZXggKyBsZW5ndGgsIDApIDogbWluKGluZGV4LCBsZW5ndGgpO1xufTsiLCIvLyA3LjEuNCBUb0ludGVnZXJcbnZhciBjZWlsICA9IE1hdGguY2VpbFxuICAsIGZsb29yID0gTWF0aC5mbG9vcjtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gaXNOYU4oaXQgPSAraXQpID8gMCA6IChpdCA+IDAgPyBmbG9vciA6IGNlaWwpKGl0KTtcbn07IiwiLy8gdG8gaW5kZXhlZCBvYmplY3QsIHRvT2JqZWN0IHdpdGggZmFsbGJhY2sgZm9yIG5vbi1hcnJheS1saWtlIEVTMyBzdHJpbmdzXG52YXIgSU9iamVjdCA9IHJlcXVpcmUoJy4vX2lvYmplY3QnKVxuICAsIGRlZmluZWQgPSByZXF1aXJlKCcuL19kZWZpbmVkJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIElPYmplY3QoZGVmaW5lZChpdCkpO1xufTsiLCIvLyA3LjEuMTUgVG9MZW5ndGhcbnZhciB0b0ludGVnZXIgPSByZXF1aXJlKCcuL190by1pbnRlZ2VyJylcbiAgLCBtaW4gICAgICAgPSBNYXRoLm1pbjtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gaXQgPiAwID8gbWluKHRvSW50ZWdlcihpdCksIDB4MWZmZmZmZmZmZmZmZmYpIDogMDsgLy8gcG93KDIsIDUzKSAtIDEgPT0gOTAwNzE5OTI1NDc0MDk5MVxufTsiLCIvLyA3LjEuMSBUb1ByaW1pdGl2ZShpbnB1dCBbLCBQcmVmZXJyZWRUeXBlXSlcbnZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vX2lzLW9iamVjdCcpO1xuLy8gaW5zdGVhZCBvZiB0aGUgRVM2IHNwZWMgdmVyc2lvbiwgd2UgZGlkbid0IGltcGxlbWVudCBAQHRvUHJpbWl0aXZlIGNhc2Vcbi8vIGFuZCB0aGUgc2Vjb25kIGFyZ3VtZW50IC0gZmxhZyAtIHByZWZlcnJlZCB0eXBlIGlzIGEgc3RyaW5nXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0LCBTKXtcbiAgaWYoIWlzT2JqZWN0KGl0KSlyZXR1cm4gaXQ7XG4gIHZhciBmbiwgdmFsO1xuICBpZihTICYmIHR5cGVvZiAoZm4gPSBpdC50b1N0cmluZykgPT0gJ2Z1bmN0aW9uJyAmJiAhaXNPYmplY3QodmFsID0gZm4uY2FsbChpdCkpKXJldHVybiB2YWw7XG4gIGlmKHR5cGVvZiAoZm4gPSBpdC52YWx1ZU9mKSA9PSAnZnVuY3Rpb24nICYmICFpc09iamVjdCh2YWwgPSBmbi5jYWxsKGl0KSkpcmV0dXJuIHZhbDtcbiAgaWYoIVMgJiYgdHlwZW9mIChmbiA9IGl0LnRvU3RyaW5nKSA9PSAnZnVuY3Rpb24nICYmICFpc09iamVjdCh2YWwgPSBmbi5jYWxsKGl0KSkpcmV0dXJuIHZhbDtcbiAgdGhyb3cgVHlwZUVycm9yKFwiQ2FuJ3QgY29udmVydCBvYmplY3QgdG8gcHJpbWl0aXZlIHZhbHVlXCIpO1xufTsiLCJ2YXIgaWQgPSAwXG4gICwgcHggPSBNYXRoLnJhbmRvbSgpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihrZXkpe1xuICByZXR1cm4gJ1N5bWJvbCgnLmNvbmNhdChrZXkgPT09IHVuZGVmaW5lZCA/ICcnIDoga2V5LCAnKV8nLCAoKytpZCArIHB4KS50b1N0cmluZygzNikpO1xufTsiLCJ2YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpXG4vLyAxOS4xLjIuMiAvIDE1LjIuMy41IE9iamVjdC5jcmVhdGUoTyBbLCBQcm9wZXJ0aWVzXSlcbiRleHBvcnQoJGV4cG9ydC5TLCAnT2JqZWN0Jywge2NyZWF0ZTogcmVxdWlyZSgnLi9fb2JqZWN0LWNyZWF0ZScpfSk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgQ2hlY2tvdXRWaWV3TW9kZWxfMSA9IHJlcXVpcmUoXCIuL21vZGVscy9DaGVja291dFZpZXdNb2RlbFwiKTtcbi8qKlxuICogSW5pdGlhbCBhcHBsaWNhdGlvbiBzZXR1cC4gUnVucyBvbmNlIHVwb24gZXZlcnkgcGFnZSBsb2FkLlxuICpcbiAqIEBjbGFzcyBBcHBcbiAqIEBjb25zdHJ1Y3RvclxuICovXG52YXIgQXBwID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBBcHAoKSB7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEluaXRpYWxpemVzIHRoZSBhcHBsaWNhdGlvbiBhbmQga2lja3Mgb2ZmIGxvYWRpbmcgb2YgcHJlcmVxdWlzaXRlcy5cbiAgICAgKlxuICAgICAqIEBtZXRob2QgaW5pdFxuICAgICAqIEBwdWJsaWNcbiAgICAgKi9cbiAgICBBcHAucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIC8vIENyZWF0ZSB5b3VyIHZpZXdzIGhlcmVcbiAgICAgICAgdmFyIGNoZWNrb3V0Vmlld01vZGVsID0gbmV3IENoZWNrb3V0Vmlld01vZGVsXzFbXCJkZWZhdWx0XCJdKHsgdGVzdDogeyBpZDogLTEgfSB9LCB7IGV4cGFuZDogZmFsc2UgfSk7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiMVwiLCBjaGVja291dFZpZXdNb2RlbCk7XG4gICAgICAgIGNoZWNrb3V0Vmlld01vZGVsID0gY2hlY2tvdXRWaWV3TW9kZWwuY2xvbmUoKTtcbiAgICAgICAgY29uc29sZS5sb2coXCIyXCIsIGNoZWNrb3V0Vmlld01vZGVsKTtcbiAgICAgICAgY2hlY2tvdXRWaWV3TW9kZWwgPSBjaGVja291dFZpZXdNb2RlbC5jbG9uZSgpO1xuICAgICAgICBjaGVja291dFZpZXdNb2RlbC51cGRhdGUoeyBwaWNrOiB7IGlkOiAnYXNkZmFzZGZhcycgfSB9KTtcbiAgICAgICAgY29uc29sZS5sb2coXCIzXCIsIGNoZWNrb3V0Vmlld01vZGVsKTtcbiAgICB9O1xuICAgIHJldHVybiBBcHA7XG59KCkpO1xuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gQXBwO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9QXBwLmpzLm1hcCIsImltcG9ydCBBcHAgZnJvbSAnLi9BcHAnO1xuXG5jb25zdCBhcHAgPSBuZXcgQXBwKCk7XG5hcHAuaW5pdCgpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07XG4gICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xufTtcbnZhciBCYXNlTW9kZWxfMSA9IHJlcXVpcmUoXCIuLi8uLi8uLi8uLi8uLi8uLi90cy9tb2RlbC9CYXNlTW9kZWxcIik7XG52YXIgSW5wdXRNb2RlbF8xID0gcmVxdWlyZShcIi4vZm9ybS9JbnB1dE1vZGVsXCIpO1xuLyoqXG4gKiBAY2xhc3MgQ2hlY2tvdXRWaWV3TW9kZWxcbiAqIEBleHRlbmRzIEFwaUJhc2VNb2RlbFxuICogQGNvbnN0cnVjdG9yXG4gKiovXG52YXIgQ2hlY2tvdXRWaWV3TW9kZWwgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhDaGVja291dFZpZXdNb2RlbCwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBDaGVja291dFZpZXdNb2RlbChkYXRhLCBvcHRzKSB7XG4gICAgICAgIGlmIChkYXRhID09PSB2b2lkIDApIHsgZGF0YSA9IHt9OyB9XG4gICAgICAgIGlmIChvcHRzID09PSB2b2lkIDApIHsgb3B0cyA9IHt9OyB9XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMsIG9wdHMpIHx8IHRoaXM7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAcHJvcGVydHkgcGlja0hvd09wdGlvbnNcbiAgICAgICAgICogQHR5cGUge0FycmF5PHt9Pn1cbiAgICAgICAgICogQHB1YmxpY1xuICAgICAgICAgKi9cbiAgICAgICAgX3RoaXMucGlja0hvd09wdGlvbnMgPSBbXG4gICAgICAgICAgICBuZXcgSW5wdXRNb2RlbF8xW1wiZGVmYXVsdFwiXSh7XG4gICAgICAgICAgICAgICAgaWQ6ICdvbmUnXG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIG5ldyBJbnB1dE1vZGVsXzFbXCJkZWZhdWx0XCJdKHtcbiAgICAgICAgICAgICAgICBpZDogJ3R3bydcbiAgICAgICAgICAgIH0pLFxuICAgICAgICBdO1xuICAgICAgICBfdGhpcy5waWNrID0gbmV3IElucHV0TW9kZWxfMVtcImRlZmF1bHRcIl0oe1xuICAgICAgICAgICAgaWQ6ICd0aHJlZSdcbiAgICAgICAgfSk7XG4gICAgICAgIF90aGlzLnRlc3QgPSBJbnB1dE1vZGVsXzFbXCJkZWZhdWx0XCJdO1xuICAgICAgICBfdGhpcy50ZXN0QXJyYXkgPSBbSW5wdXRNb2RlbF8xW1wiZGVmYXVsdFwiXV07XG4gICAgICAgIGlmIChkYXRhKSB7XG4gICAgICAgICAgICBfdGhpcy51cGRhdGUoZGF0YSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBAb3ZlcnJpZGRlbiBBcGlCYXNlTW9kZWwudXBkYXRlXG4gICAgICovXG4gICAgQ2hlY2tvdXRWaWV3TW9kZWwucHJvdG90eXBlLnVwZGF0ZSA9IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgIF9zdXBlci5wcm90b3R5cGUudXBkYXRlLmNhbGwodGhpcywgZGF0YSk7XG4gICAgICAgIC8vIE92ZXJyaWRlIGFueSB2YWx1ZXMgYWZ0ZXIgdGhlIGRlZmF1bHQgc3VwZXIgdXBkYXRlIG1ldGhvZCBoYXMgc2V0IHRoZSB2YWx1ZXMuXG4gICAgfTtcbiAgICByZXR1cm4gQ2hlY2tvdXRWaWV3TW9kZWw7XG59KEJhc2VNb2RlbF8xW1wiZGVmYXVsdFwiXSkpO1xuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gQ2hlY2tvdXRWaWV3TW9kZWw7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1DaGVja291dFZpZXdNb2RlbC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgZnVuY3Rpb24gKGQsIGIpIHtcbiAgICBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTtcbiAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG59O1xudmFyIEJhc2VNb2RlbF8xID0gcmVxdWlyZShcIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3RzL21vZGVsL0Jhc2VNb2RlbFwiKTtcbi8qKlxuICogQGNsYXNzIElucHV0TW9kZWxcbiAqIEBleHRlbmRzIEJhc2VNb2RlbFxuICogQGNvbnN0cnVjdG9yXG4gKiovXG52YXIgSW5wdXRNb2RlbCA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKElucHV0TW9kZWwsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gSW5wdXRNb2RlbChkYXRhLCBvcHRzKSB7XG4gICAgICAgIGlmIChkYXRhID09PSB2b2lkIDApIHsgZGF0YSA9IHt9OyB9XG4gICAgICAgIGlmIChvcHRzID09PSB2b2lkIDApIHsgb3B0cyA9IHt9OyB9XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMsIG9wdHMpIHx8IHRoaXM7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAcHJvcGVydHkgaWRcbiAgICAgICAgICogQHR5cGUge3N0cmluZ31cbiAgICAgICAgICogQHB1YmxpY1xuICAgICAgICAgKi9cbiAgICAgICAgX3RoaXMuaWQgPSBudWxsO1xuICAgICAgICBpZiAoZGF0YSkge1xuICAgICAgICAgICAgX3RoaXMudXBkYXRlKGRhdGEpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogQG92ZXJyaWRkZW4gQmFzZU1vZGVsLnVwZGF0ZVxuICAgICAqL1xuICAgIElucHV0TW9kZWwucHJvdG90eXBlLnVwZGF0ZSA9IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgIF9zdXBlci5wcm90b3R5cGUudXBkYXRlLmNhbGwodGhpcywgZGF0YSk7XG4gICAgICAgIC8vIE92ZXJyaWRlIGFueSB2YWx1ZXMgYWZ0ZXIgdGhlIGRlZmF1bHQgc3VwZXIgdXBkYXRlIG1ldGhvZCBoYXMgc2V0IHRoZSB2YWx1ZXMuXG4gICAgfTtcbiAgICByZXR1cm4gSW5wdXRNb2RlbDtcbn0oQmFzZU1vZGVsXzFbXCJkZWZhdWx0XCJdKSk7XG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBJbnB1dE1vZGVsO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9SW5wdXRNb2RlbC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBVdGlsXzEgPSByZXF1aXJlKFwiLi91dGlsL1V0aWxcIik7XG4vKipcbiAqIFRoZSB7eyNjcm9zc0xpbmsgXCJCYXNlT2JqZWN0XCJ9fXt7L2Nyb3NzTGlua319IGNsYXNzIGlzIGFuIGFic3RyYWN0IGNsYXNzIHRoYXQgcHJvdmlkZXMgY29tbW9uIHByb3BlcnRpZXMgYW5kIGZ1bmN0aW9uYWxpdHkgZm9yIGFsbCBTdHJ1Y3R1cmVKUyBjbGFzc2VzLlxuICpcbiAqIEBjbGFzcyBCYXNlT2JqZWN0XG4gKiBAbW9kdWxlIFN0cnVjdHVyZUpTXG4gKiBAc3VibW9kdWxlIGNvcmVcbiAqIEByZXF1aXJlcyBVdGlsXG4gKiBAY29uc3RydWN0b3JcbiAqIEBhdXRob3IgUm9iZXJ0IFMuICh3d3cuY29kZUJlbHQuY29tKVxuICovXG52YXIgQmFzZU9iamVjdCA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gQmFzZU9iamVjdCgpIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSBzanNJZCAoU3RydWN0dXJlSlMgSUQpIGlzIGEgdW5pcXVlIGlkZW50aWZpZXIgYXV0b21hdGljYWxseSBhc3NpZ25lZCB0byBtb3N0IFN0cnVjdHVyZUpTIG9iamVjdHMgdXBvbiBpbnN0YW50aWF0aW9uLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcHJvcGVydHkgc2pzSWRcbiAgICAgICAgICogQHR5cGUge2ludH1cbiAgICAgICAgICogQGRlZmF1bHQgbnVsbFxuICAgICAgICAgKiBAd3JpdGVPbmNlXG4gICAgICAgICAqIEByZWFkT25seVxuICAgICAgICAgKiBAcHVibGljXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLnNqc0lkID0gbnVsbDtcbiAgICAgICAgdGhpcy5zanNJZCA9IFV0aWxfMVtcImRlZmF1bHRcIl0udW5pcXVlSWQoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgZnVsbHkgcXVhbGlmaWVkIGNsYXNzIG5hbWUgb2YgYW4gb2JqZWN0LlxuICAgICAqXG4gICAgICogQG1ldGhvZCBnZXRRdWFsaWZpZWRDbGFzc05hbWVcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSBjbGFzcyBuYW1lLlxuICAgICAqIEBwdWJsaWNcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqICAgICBsZXQgc29tZUNsYXNzID0gbmV3IFNvbWVDbGFzcygpO1xuICAgICAqICAgICBzb21lQ2xhc3MuZ2V0UXVhbGlmaWVkQ2xhc3NOYW1lKCk7XG4gICAgICpcbiAgICAgKiAgICAgLy8gU29tZUNsYXNzXG4gICAgICovXG4gICAgQmFzZU9iamVjdC5wcm90b3R5cGUuZ2V0UXVhbGlmaWVkQ2xhc3NOYW1lID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gVXRpbF8xW1wiZGVmYXVsdFwiXS5nZXROYW1lKHRoaXMpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogVGhlIHB1cnBvc2Ugb2YgdGhlIGRlc3Ryb3kgbWV0aG9kIGlzIHRvIG1ha2UgYW4gb2JqZWN0IHJlYWR5IGZvciBnYXJiYWdlIGNvbGxlY3Rpb24uIFRoaXNcbiAgICAgKiBzaG91bGQgYmUgdGhvdWdodCBvZiBhcyBhIG9uZSB3YXkgZnVuY3Rpb24uIE9uY2UgZGVzdHJveSBpcyBjYWxsZWQgbm8gZnVydGhlciBtZXRob2RzIHNob3VsZCBiZVxuICAgICAqIGNhbGxlZCBvbiB0aGUgb2JqZWN0IG9yIHByb3BlcnRpZXMgYWNjZXNzZWQuIEl0IGlzIHRoZSByZXNwb25zaWJpbGl0eSBvZiB0aG9zZSB3aG8gaW1wbGVtZW50IHRoaXNcbiAgICAgKiBmdW5jdGlvbiB0byBzdG9wIGFsbCBydW5uaW5nIFRpbWVycywgYWxsIHJ1bm5pbmcgU291bmRzLCBhbmQgdGFrZSBhbnkgb3RoZXIgc3RlcHMgbmVjZXNzYXJ5IHRvIG1ha2UgYW5cbiAgICAgKiBvYmplY3QgZWxpZ2libGUgZm9yIGdhcmJhZ2UgY29sbGVjdGlvbi5cbiAgICAgKlxuICAgICAqIEJ5IGRlZmF1bHQgdGhlIGRlc3Ryb3kgbWV0aG9kIHdpbGwgbnVsbCBvdXQgYWxsIHByb3BlcnRpZXMgb2YgdGhlIGNsYXNzIGF1dG9tYXRpY2FsbHkuIFlvdSBzaG91bGQgY2FsbCBkZXN0cm95XG4gICAgICogb24gb3RoZXIgb2JqZWN0cyBiZWZvcmUgY2FsbGluZyB0aGUgc3VwZXIuXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIGRlc3Ryb3lcbiAgICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgICAqIEBwdWJsaWNcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqICAgICBkZXN0cm95KCkge1xuICAgICAqICAgICAgICAgIHRoaXMuZGlzYWJsZSgpO1xuICAgICAqXG4gICAgICogICAgICAgICAgdGhpcy5fY2hpbGRJbnN0YW5jZS5kZXN0cm95KCk7XG4gICAgICpcbiAgICAgKiAgICAgICAgICBzdXBlci5kZXN0cm95KCk7XG4gICAgICogICAgIH1cbiAgICAgKi9cbiAgICBCYXNlT2JqZWN0LnByb3RvdHlwZS5kZXN0cm95ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBmb3IgKHZhciBrZXkgaW4gdGhpcykge1xuICAgICAgICAgICAgaWYgKHRoaXMuaGFzT3duUHJvcGVydHkoa2V5KSAmJiBrZXkgIT09ICdzanNJZCcpIHtcbiAgICAgICAgICAgICAgICB0aGlzW2tleV0gPSBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbiAgICByZXR1cm4gQmFzZU9iamVjdDtcbn0oKSk7XG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBCYXNlT2JqZWN0O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9QmFzZU9iamVjdC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgZnVuY3Rpb24gKGQsIGIpIHtcbiAgICBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTtcbiAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG59O1xudmFyIEJhc2VPYmplY3RfMSA9IHJlcXVpcmUoXCIuLi9CYXNlT2JqZWN0XCIpO1xudmFyIFV0aWxfMSA9IHJlcXVpcmUoXCIuLi91dGlsL1V0aWxcIik7XG4vKipcbiAqICBCYXNlIE1vZGVsIGlzIGEgZGVzaWduIHBhdHRlcm4gdXNlZCB0byB0cmFuc2ZlciBkYXRhIGJldHdlZW4gc29mdHdhcmUgYXBwbGljYXRpb24gc3Vic3lzdGVtcy5cbiAqXG4gKiBOb3RlOiBJZiB0aGUgZGF0YSBkb2Vzbid0IG1hdGNoIHRoZSBwcm9wZXJ0eSBuYW1lcyB5b3UgY2FuIHNldCB0aGUgdmFsdWUgbWFudWFsbHkgYWZ0ZXIgdXBkYXRlIHN1cGVyIG1ldGhvZCBoYXMgYmVlbiBjYWxsZWQuXG4gKiAgQWxzbyBpbiB0aGUgY2xhc3MgeW91IGluaGVyaXQgQmFzZU1vZGVsIGZyb20geW91IGNhbiBvdmVycmlkZSB0aGUgdXBkYXRlIG1ldGhvZCB0byBoYW5kbGUgdGhlIGRhdGEgaG93IHlvdSB3YW50LlxuICpcbiAqIEBjbGFzcyBCYXNlTW9kZWxcbiAqIEBleHRlbmRzIEJhc2VPYmplY3RcbiAqIEBwYXJhbSBbZGF0YV0ge2FueX0gUHJvdmlkZSBhIHdheSB0byB1cGRhdGUgdGhlIGJhc2UgbW9kZWwgdXBvbiBpbml0aWFsaXphdGlvbi5cbiAqIEBwYXJhbSBbb3B0c10ge3sgZXhwYW5kOmJvb2xlYW4gfX0gT3B0aW9ucyBmb3IgdGhlIGJhc2UgbW9kZWwuXG4gKiBAbW9kdWxlIFN0cnVjdHVyZUpTXG4gKiBAc3VibW9kdWxlIG1vZGVsXG4gKiBAcmVxdWlyZXMgRXh0ZW5kXG4gKiBAcmVxdWlyZXMgQmFzZU9iamVjdFxuICogQHJlcXVpcmVzIFV0aWxcbiAqIEBjb25zdHJ1Y3RvclxuICogQGF1dGhvciBSb2JlcnQgUy4gKHd3dy5jb2RlQmVsdC5jb20pXG4gKiBAZXhhbXBsZVxuICogICAgICAvLyBFeGFtcGxlIGhvdyB0byBleHRlbmQgdGhlIEJhc2VNb2RlbCBjbGFzcy5cbiAqICAgICAgbGV0IGRhdGEgPSB7XG4gKiAgICAgICAgICAgICAgbWFrZTogJ1Rlc2xhJyxcbiAqICAgICAgICAgICAgICBtb2RlbDogJ01vZGVsIFMnLFxuICogICAgICAgICAgICAgIFllQXI6IDIwMTQsXG4gKiAgICAgICAgICAgICAgZmVhdHVyZToge1xuICogICAgICAgICAgICAgICAgICBhYnM6IHRydWUsXG4gKiAgICAgICAgICAgICAgICAgIGFpcmJhZ3M6IHRydWVcbiAqICAgICAgICAgICAgICB9XG4gKiAgICAgIH1cbiAqICAgICAgbGV0IGNhck1vZGVsID0gbmV3IENhck1vZGVsKGRhdGEpO1xuICpcbiAqXG4gKiAgICAgIC8vIEV4YW1wbGUgaG93IHRvIGV4dGVuZCB0aGUgQmFzZU1vZGVsIGNsYXNzLlxuICogICAgICBjbGFzcyBDYXJNb2RlbCBleHRlbmRzIEJhc2VNb2RlbCB7XG4gKlxuICogICAgICAgICAgLy8gWW91IG5lZWQgdG8gaGF2ZSBwcm9wZXJ0aWVzIHNvIHRoZSBkYXRhIHdpbGwgZ2V0IGFzc2lnbmVkLlxuICogICAgICAgICAgLy8gSWYgbm90IHRoZSBkYXRhIHdpbGwgbm90IGdldCBhc3NpZ25lZCB0byB0aGUgbW9kZWwuXG4gKiAgICAgICAgICBtYWtlID0gbnVsbDtcbiAqICAgICAgICAgIG1vZGVsID0gbnVsbDtcbiAqICAgICAgICAgIHllYXIgPSBudWxsO1xuICogICAgICAgICAgYWxsV2hlZWwgPSBmYWxzZTsgLy8gU2V0IGEgZGVmYXVsdCB2YWx1ZVxuICpcbiAqICAgICAgICAgIC8vIFlvdSBjYW4gYXNzaWduIEJhc2VNb2RlbCB0byBhIHByb3BlcnR5IHdoaWNoIHdpbGxcbiAqICAgICAgICAgIC8vIGF1dG9tYXRpY2FsbHkgY3JlYXRlZCBpdCBhbmQgcGFzcyB0aGUgZGF0YSB0byBpdC5cbiAqICAgICAgICAgIGZlYXR1cmUgPSBGZWF0dXJlTW9kZWxcbiAqXG4gKiAgICAgICAgICAvLyBJZiB5b3UgaGF2ZSBhbiBhcnJheSBvZiBkYXRhIGFuZCB3YW50IHRoZW0gYXNzaWduIHRvIGEgQmFzZU1vZGVsLlxuICogICAgICAgICAgZmVhdHVyZSA9IFtGZWF0dXJlTW9kZWxdO1xuICpcbiAqICAgICAgICAgIGNvbnN0cnVjdG9yKGRhdGEgPSB7fSwgb3B0cyA9IHt9KSB7XG4gKiAgICAgICAgICAgICAgc3VwZXIob3B0cyk7XG4gKlxuICogICAgICAgICAgICAgIGlmIChkYXRhKSB7XG4gKiAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlKGRhdGEpO1xuICogICAgICAgICAgICAgIH1cbiAqICAgICAgICAgIH1cbiAqXG4gKiAgICAgICAgICAvLyBAb3ZlcnJpZGRlbiBCYXNlTW9kZWwudXBkYXRlXG4gKiAgICAgICAgICB1cGRhdGUoZGF0YSkge1xuICogICAgICAgICAgICAgIHN1cGVyLnVwZGF0ZShkYXRhKTtcbiAqXG4gKiAgICAgICAgICAgICAgLy8gSWYgdGhlIGRhdGEgZG9lc24ndCBtYXRjaCB0aGUgcHJvcGVydHkgbmFtZS5cbiAqICAgICAgICAgICAgICAvLyBZb3UgY2FuIHNldCB0aGUgdmFsdWUocykgbWFudWFsbHkgYWZ0ZXIgdGhlIHVwZGF0ZSBzdXBlciBtZXRob2QgaGFzIGJlZW4gY2FsbGVkLlxuICogICAgICAgICAgICAgIHRoaXMueWVhciA9IGRhdGEuWWVBcjtcbiAqICAgICAgICAgIH1cbiAqICAgICAgfVxuICovXG52YXIgQmFzZU1vZGVsID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoQmFzZU1vZGVsLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIEJhc2VNb2RlbChvcHRzKSB7XG4gICAgICAgIGlmIChvcHRzID09PSB2b2lkIDApIHsgb3B0cyA9IHt9OyB9XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMpIHx8IHRoaXM7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAcHJvcGVydHkgc2pzT3B0aW9uc1xuICAgICAgICAgKiBAdHlwZSB7SUJhc2VNb2RlbE9wdGlvbnN9fVxuICAgICAgICAgKiBAcHVibGljXG4gICAgICAgICAqL1xuICAgICAgICBfdGhpcy5zanNPcHRpb25zID0ge1xuICAgICAgICAgICAgZXhwYW5kOiBmYWxzZVxuICAgICAgICB9O1xuICAgICAgICBfdGhpcy5zanNPcHRpb25zLmV4cGFuZCA9IG9wdHMuZXhwYW5kID09PSB0cnVlO1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFByb3ZpZGUgYSB3YXkgdG8gdXBkYXRlIHRoZSAgQmFzZSBNb2RlbC5cbiAgICAgKlxuICAgICAqIEBtZXRob2QgdXBkYXRlXG4gICAgICogQHBhcmFtIFtkYXRhPXt9XSB7YW55fVxuICAgICAqIEBwdWJsaWNcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqICAgICAvLyBFeGFtcGxlIG9mIHVwZGF0aW5nIHNvbWUgb2YgdGhlIGRhdGE6XG4gICAgICogICAgIGNhck1vZGVsLnVwZGF0ZSh7IHllYXI6IDIwMTUsIGFsbFdoZWVsOiB0cnVlfSk7XG4gICAgICpcbiAgICAgKiAgICAgLy8gT2YgY291cnNlIHlvdSBjYW4gYWxzbyBkbyBpdCB0aGUgZm9sbG93aW5nIHdheTpcbiAgICAgKiAgICAgY2FyTW9kZWwueWVhciA9IDIwMTU7XG4gICAgICogICAgIGNhck1vZGVsLmFsbFdoZWVsID0gZmFsc2U7XG4gICAgICovXG4gICAgQmFzZU1vZGVsLnByb3RvdHlwZS51cGRhdGUgPSBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICBpZiAoZGF0YSA9PT0gdm9pZCAwKSB7IGRhdGEgPSB7fTsgfVxuICAgICAgICBPYmplY3RcbiAgICAgICAgICAgIC5rZXlzKHRoaXMpXG4gICAgICAgICAgICAuZm9yRWFjaChmdW5jdGlvbiAocHJvcGVydHlOYW1lKSB7XG4gICAgICAgICAgICAvLyBJZ25vcmUgdGhlIHNqc0lkIHByb3BlcnR5IGJlY2F1c2UgaXQgaXMgc2V0IGluIHRoZSBCYXNlT2JqZWN0IGNvbnN0cnVjdG9yIGFuZCB3ZSBkb24ndCB3YW50IHRvIHVwZGF0ZSBpdC5cbiAgICAgICAgICAgIGlmIChwcm9wZXJ0eU5hbWUgIT09ICdzanNJZCcpIHtcbiAgICAgICAgICAgICAgICB2YXIgcHJvcGVydHlEYXRhID0gX3RoaXNbcHJvcGVydHlOYW1lXTtcbiAgICAgICAgICAgICAgICB2YXIgdXBkYXRlRGF0YSA9IGRhdGFbcHJvcGVydHlOYW1lXTtcbiAgICAgICAgICAgICAgICB2YXIgZGF0YVRvVXNlID0gKHVwZGF0ZURhdGEgIT09IHZvaWQgMCkgPyB1cGRhdGVEYXRhIDogcHJvcGVydHlEYXRhO1xuICAgICAgICAgICAgICAgIF90aGlzLl91cGRhdGVQcm9wZXJ0eVdpdGhEYXRhUGFzc2VkSW4ocHJvcGVydHlOYW1lLCBkYXRhVG9Vc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBBZGRzIHRoZSB1cGRhdGVEYXRhIHRvIHRoZSBwcm9wZXJ0eVxuICAgICAqXG4gICAgICogQG1ldGhvZCBfdXBkYXRlUHJvcGVydHlXaXRoRGF0YVBhc3NlZEluXG4gICAgICogQHBhcmFtIHByb3BlcnR5TmFtZVxuICAgICAqIEBwYXJhbSB1cGRhdGVEYXRhXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIEJhc2VNb2RlbC5wcm90b3R5cGUuX3VwZGF0ZVByb3BlcnR5V2l0aERhdGFQYXNzZWRJbiA9IGZ1bmN0aW9uIChwcm9wZXJ0eU5hbWUsIHVwZGF0ZURhdGEpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgLy8gSWYgdGhlIGN1cnJlbnQgcHJvcGVydHkgb24gdGhlIG1vZGVsIGlzIGFuIGFycmF5IGFuZCB0aGUgdXBkYXRlRGF0YSBpcyBhbiBhcnJheS5cbiAgICAgICAgaWYgKCh0aGlzW3Byb3BlcnR5TmFtZV0gaW5zdGFuY2VvZiBBcnJheSA9PT0gdHJ1ZSkgJiYgKHVwZGF0ZURhdGEgaW5zdGFuY2VvZiBBcnJheSA9PT0gdHJ1ZSkpIHtcbiAgICAgICAgICAgIHZhciBpc1Byb3BlcnR5RGF0YVZhbHVlQW5Vbmluc3RhbnRpYXRlZEJhc2VNb2RlbCA9ICh0eXBlb2YgdGhpc1twcm9wZXJ0eU5hbWVdWzBdID09PSAnZnVuY3Rpb24nICYmIHRoaXNbcHJvcGVydHlOYW1lXVswXS5JU19CQVNFX01PREVMID09PSB0cnVlKTtcbiAgICAgICAgICAgIHZhciBpc1VwZGF0ZURhdGFWYWx1ZUFuVW5pbnN0YW50aWF0ZWRCYXNlTW9kZWwgPSAodHlwZW9mIHVwZGF0ZURhdGFbMF0gPT09ICdmdW5jdGlvbicgJiYgdXBkYXRlRGF0YVswXS5JU19CQVNFX01PREVMID09PSB0cnVlKTtcbiAgICAgICAgICAgIGlmIChpc1Byb3BlcnR5RGF0YVZhbHVlQW5Vbmluc3RhbnRpYXRlZEJhc2VNb2RlbCA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICB0aGlzW3Byb3BlcnR5TmFtZV0gPSB1cGRhdGVEYXRhLm1hcChmdW5jdGlvbiAoZGF0YSkgeyByZXR1cm4gX3RoaXMuX3VwZGF0ZURhdGEobnVsbCwgZGF0YSk7IH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoaXNQcm9wZXJ0eURhdGFWYWx1ZUFuVW5pbnN0YW50aWF0ZWRCYXNlTW9kZWwgPT09IHRydWUgJiYgaXNVcGRhdGVEYXRhVmFsdWVBblVuaW5zdGFudGlhdGVkQmFzZU1vZGVsID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgIC8vIElmIHRoZSBwcm9wZXJ0eSBkYXRhIGlzIGFuIHVuaW5zdGFudGlhdGVkIEJhc2VNb2RlbCB0aGVuIHdlIGFzc3VtZSB0aGUgdXBkYXRlIGRhdGEgcGFzc2VkIGluXG4gICAgICAgICAgICAgICAgLy8gbmVlZHMgdG8gYmUgY3JlYXRlIGFzIHRoYXQgQmFzZU1vZGVsIENsYXNzLlxuICAgICAgICAgICAgICAgIHZhciBiYXNlTW9kZWxfMSA9IHRoaXNbcHJvcGVydHlOYW1lXVswXTtcbiAgICAgICAgICAgICAgICB0aGlzW3Byb3BlcnR5TmFtZV0gPSB1cGRhdGVEYXRhLm1hcChmdW5jdGlvbiAoZGF0YSkgeyByZXR1cm4gX3RoaXMuX3VwZGF0ZURhdGEoYmFzZU1vZGVsXzEsIGRhdGEpOyB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXNbcHJvcGVydHlOYW1lXSA9IFtdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpc1twcm9wZXJ0eU5hbWVdID0gdGhpcy5fdXBkYXRlRGF0YSh0aGlzW3Byb3BlcnR5TmFtZV0sIHVwZGF0ZURhdGEpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBAbWV0aG9kIF91cGRhdGVEYXRhXG4gICAgICogQHBhcmFtIHByb3BlcnR5RGF0YVxuICAgICAqIEBwYXJhbSB1cGRhdGVEYXRhXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIEJhc2VNb2RlbC5wcm90b3R5cGUuX3VwZGF0ZURhdGEgPSBmdW5jdGlvbiAocHJvcGVydHlEYXRhLCB1cGRhdGVEYXRhKSB7XG4gICAgICAgIHZhciByZXR1cm5EYXRhID0gbnVsbDtcbiAgICAgICAgaWYgKHRoaXMuc2pzT3B0aW9ucy5leHBhbmQgPT09IGZhbHNlICYmIHR5cGVvZiB1cGRhdGVEYXRhID09PSAnZnVuY3Rpb24nICYmIHVwZGF0ZURhdGEuSVNfQkFTRV9NT0RFTCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgLy8gSWYgdXBkYXRlRGF0YSBpcyBhIGZ1bmN0aW9uIGFuZCBoYXMgYW4gSVNfQkFTRV9NT0RFTCBzdGF0aWMgcHJvcGVydHkgdGhlbiBpdCBtdXN0IGJlIGEgY2hpbGQgbW9kZWwgYW5kIHdlIG5lZWQgdG8gcmV0dXJuIG51bGxcbiAgICAgICAgICAgIC8vIHNvIGl0IGNsZWFucyB1cCB0aGUgQmFzZU1vZGVsIGZ1bmN0aW9ucyBvbiB0aGUgcHJvcGVydHkuXG4gICAgICAgICAgICAvLyBUbyBjcmVhdGUgZW1wdHkgbW9kZWwocykgcGFzcyB7IGV4cGFuZDogdHJ1ZSB9IGZvciB0aGUgb3B0aW9ucy5cbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0eXBlb2YgcHJvcGVydHlEYXRhID09PSAnZnVuY3Rpb24nICYmIHByb3BlcnR5RGF0YS5JU19CQVNFX01PREVMID09PSB0cnVlICYmIHVwZGF0ZURhdGEpIHtcbiAgICAgICAgICAgIC8vIElmIHRoZSBwcm9wZXJ0eURhdGEgaXMgYW4gaW5zdGFuY2Ugb2YgYSBCYXNlTW9kZWwgY2xhc3MgYW5kIGhhcyBub3QgYmVlbiBjcmVhdGVkIHlldC5cbiAgICAgICAgICAgIC8vIEluc3RhbnRpYXRlIGl0IGFuZCBwYXNzIGluIHRoZSB1cGRhdGVEYXRhIHRvIHRoZSBjb25zdHJ1Y3Rvci5cbiAgICAgICAgICAgIHJldHVybkRhdGEgPSBuZXcgcHJvcGVydHlEYXRhKHVwZGF0ZURhdGEsIHRoaXMuc2pzT3B0aW9ucyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoKHVwZGF0ZURhdGEgaW5zdGFuY2VvZiBCYXNlTW9kZWwpID09PSB0cnVlKSB7XG4gICAgICAgICAgICByZXR1cm5EYXRhID0gdXBkYXRlRGF0YS5jbG9uZSgpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKChwcm9wZXJ0eURhdGEgaW5zdGFuY2VvZiBCYXNlTW9kZWwpID09PSB0cnVlKSB7XG4gICAgICAgICAgICAvLyBJZiBwcm9wZXJ0eURhdGEgaXMgYW4gaW5zdGFuY2Ugb2YgYSBCYXNlTW9kZWwgY2xhc3MgYW5kIGhhcyBhbHJlYWR5IGJlZW4gY3JlYXRlZC5cbiAgICAgICAgICAgIC8vIENhbGwgdGhlIHVwZGF0ZSBtZXRob2QgYW5kIHBhc3MgaW4gdGhlIHVwZGF0ZURhdGEuXG4gICAgICAgICAgICBwcm9wZXJ0eURhdGEudXBkYXRlKHVwZGF0ZURhdGEpO1xuICAgICAgICAgICAgcmV0dXJuRGF0YSA9IHByb3BlcnR5RGF0YTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIC8vIEVsc2UganVzdCByZXR1cm4gdGhlIHVwZGF0ZURhdGEgdG8gdGhlIHByb3BlcnR5LlxuICAgICAgICAgICAgcmV0dXJuRGF0YSA9IHVwZGF0ZURhdGE7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJldHVybkRhdGE7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBDb252ZXJ0cyB0aGUgQmFzZSBNb2RlbCBkYXRhIGludG8gYSBKU09OIG9iamVjdCBhbmQgZGVsZXRlcyB0aGUgc2pzSWQgcHJvcGVydHkuXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIHRvSlNPTlxuICAgICAqIEByZXR1cm5zIHthbnl9XG4gICAgICogQHB1YmxpY1xuICAgICAqIEBleGFtcGxlXG4gICAgICogICAgIGNvbnN0IG9iaiA9IGNhck1vZGVsLnRvSlNPTigpO1xuICAgICAqL1xuICAgIEJhc2VNb2RlbC5wcm90b3R5cGUudG9KU09OID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgY2xvbmUgPSBVdGlsXzFbXCJkZWZhdWx0XCJdLmNsb25lKHRoaXMpO1xuICAgICAgICByZXR1cm4gVXRpbF8xW1wiZGVmYXVsdFwiXS5kZWxldGVQcm9wZXJ0eUZyb21PYmplY3QoY2xvbmUsIFsnc2pzSWQnLCAnc2pzT3B0aW9ucyddKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIENvbnZlcnRzIGEgIEJhc2UgTW9kZWwgdG8gYSBKU09OIHN0cmluZyxcbiAgICAgKlxuICAgICAqIEBtZXRob2QgdG9KU09OU3RyaW5nXG4gICAgICogQHJldHVybnMge3N0cmluZ31cbiAgICAgKiBAcHVibGljXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiAgICAgY29uc3Qgc3RyID0gY2FyTW9kZWwudG9KU09OU3RyaW5nKCk7XG4gICAgICovXG4gICAgQmFzZU1vZGVsLnByb3RvdHlwZS50b0pTT05TdHJpbmcgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSh0aGlzLnRvSlNPTigpKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIENvbnZlcnRzIHRoZSBzdHJpbmcganNvbiBkYXRhIGludG8gYW4gT2JqZWN0IGFuZCBjYWxscyB0aGUge3sjY3Jvc3NMaW5rIFwiQmFzZU1vZGVsL3VwZGF0ZTptZXRob2RcIn19e3svY3Jvc3NMaW5rfX0gbWV0aG9kIHdpdGggdGhlIGNvbnZlcnRlZCBPYmplY3QuXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIGZyb21KU09OXG4gICAgICogQHBhcmFtIGpzb24ge3N0cmluZ31cbiAgICAgKiBAcHVibGljXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiAgICAgIGNvbnN0IHN0ciA9ICd7XCJtYWtlXCI6XCJUZXNsYVwiLFwibW9kZWxcIjpcIk1vZGVsIFNcIixcInllYXJcIjoyMDE0fSdcbiAgICAgKiAgICAgIGNvbnN0IGNhck1vZGVsID0gbmV3IENhck1vZGVsKCk7XG4gICAgICogICAgICBjYXJNb2RlbC5mcm9tSlNPTihzdHIpO1xuICAgICAqL1xuICAgIEJhc2VNb2RlbC5wcm90b3R5cGUuZnJvbUpTT04gPSBmdW5jdGlvbiAoanNvbikge1xuICAgICAgICB2YXIgcGFyc2VkRGF0YSA9IEpTT04ucGFyc2UoanNvbik7XG4gICAgICAgIHRoaXMudXBkYXRlKHBhcnNlZERhdGEpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIENyZWF0ZSBhIGNsb25lL2NvcHkgb2YgdGhlICBCYXNlIE1vZGVsLlxuICAgICAqXG4gICAgICogQG1ldGhvZCBjbG9uZVxuICAgICAqIEByZXR1cm5zIHtCYXNlTW9kZWx9XG4gICAgICogQHB1YmxpY1xuICAgICAqIEBleGFtcGxlXG4gICAgICogICAgIGNvbnN0IGNsb25lID0gY2FyTW9kZWwuY2xvbmUoKTtcbiAgICAgKi9cbiAgICBCYXNlTW9kZWwucHJvdG90eXBlLmNsb25lID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgY2xvbmVkQmFzZU1vZGVsID0gbmV3IHRoaXMuY29uc3RydWN0b3IodGhpcyk7XG4gICAgICAgIHJldHVybiBjbG9uZWRCYXNlTW9kZWw7XG4gICAgfTtcbiAgICByZXR1cm4gQmFzZU1vZGVsO1xufShCYXNlT2JqZWN0XzFbXCJkZWZhdWx0XCJdKSk7XG4vKipcbiAqIFRoaXMgcHJvcGVydHkgaGVscHMgZGlzdGluZ3Vpc2ggYSBCYXNlTW9kZWwgZnJvbSBvdGhlciBmdW5jdGlvbnMuXG4gKlxuICogQHByb3BlcnR5IElTX0JBU0VfTU9ERUxcbiAqIEB0eXBlIHtib29sZWFufVxuICogQHB1YmxpY1xuICogQHN0YXRpY1xuICogQHJlYWRvbmx5XG4gKi9cbkJhc2VNb2RlbC5JU19CQVNFX01PREVMID0gdHJ1ZTtcbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IEJhc2VNb2RlbDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPUJhc2VNb2RlbC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbi8qKlxuICogQSBVdGlsaXR5IGNsYXNzIHRoYXQgaGFzIHNldmVyYWwgc3RhdGljIG1ldGhvZHMgdG8gYXNzaXN0IGluIGRldmVsb3BtZW50LlxuICpcbiAqIEBjbGFzcyBVdGlsXG4gKiBAbW9kdWxlIFN0cnVjdHVyZUpTXG4gKiBAc3VibW9kdWxlIHV0aWxcbiAqIEBhdXRob3IgUm9iZXJ0IFMuICh3d3cuY29kZUJlbHQuY29tKVxuICogQHN0YXRpY1xuICovXG52YXIgVXRpbCA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gVXRpbCgpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdbVXRpbF0gRG8gbm90IGluc3RhbnRpYXRlIHRoZSBVdGlsIGNsYXNzIGJlY2F1c2UgaXQgaXMgYSBzdGF0aWMgY2xhc3MuJyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEdlbmVyYXRlcyBhIHVuaXF1ZSBJRC4gSWYgYSBwcmVmaXggaXMgcGFzc2VkIGluLCB0aGUgdmFsdWUgd2lsbCBiZSBhcHBlbmRlZCB0byBpdC5cbiAgICAgKlxuICAgICAqIEBtZXRob2QgdW5pcXVlSWRcbiAgICAgKiBAcGFyYW0gW3ByZWZpeF0ge3N0cmluZ30gVGhlIHN0cmluZyB2YWx1ZSB1c2VkIGZvciB0aGUgcHJlZml4LlxuICAgICAqIEByZXR1cm5zIHtpbml0fHN0cmluZ30gUmV0dXJucyB0aGUgdW5pcXVlIGlkZW50aWZpZXIuXG4gICAgICogQHB1YmxpY1xuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqICAgICAgbGV0IHByb3BlcnR5ID0gVXRpbC51bmlxdWVJZCgpO1xuICAgICAqICAgICAgLy8gMVxuICAgICAqXG4gICAgICogICAgICBsZXQgcHJvcGVydHkgPSBVdGlsLnVuaXF1ZUlkKCdwcmVmaXhOYW1lXycpO1xuICAgICAqICAgICAgLy8gcHJlZml4TmFtZV8xXG4gICAgICovXG4gICAgVXRpbC51bmlxdWVJZCA9IGZ1bmN0aW9uIChwcmVmaXgpIHtcbiAgICAgICAgaWYgKHByZWZpeCA9PT0gdm9pZCAwKSB7IHByZWZpeCA9IG51bGw7IH1cbiAgICAgICAgdmFyIGlkID0gKytVdGlsLl9pZENvdW50ZXI7XG4gICAgICAgIGlmIChwcmVmaXggIT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIFN0cmluZyhwcmVmaXggKyBpZCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gaWQ7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFJlbW92ZXMgYSBsaXN0IG9mIHByb3BlcnRpZXMgZnJvbSBhbiBvYmplY3QuXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIGRlbGV0ZVByb3BlcnR5RnJvbU9iamVjdFxuICAgICAqIEBwYXJhbSBvYmplY3Qge09iamVjdH0gVGhlIG9iamVjdCB5b3Ugd2FudCB0byByZW1vdmUgcHJvcGVydGllcyBmcm9tLlxuICAgICAqIEBwYXJhbSB2YWx1ZSB7c3RyaW5nfEFycmF5LjxzdHJpbmc+fSBBIHByb3BlcnR5IG5hbWUgb3IgYW4gYXJyYXkgb2YgcHJvcGVydHkgbmFtZXMgeW91IHdhbnQgdG8gcmVtb3ZlIGZyb20gdGhlIG9iamVjdC5cbiAgICAgKiBAcmV0dXJucyB7YW55fSBSZXR1cm5zIHRoZSBvYmplY3QgcGFzc2VkIGluIHdpdGhvdXQgdGhlIHJlbW92ZWQgdGhlIHByb3BlcnRpZXMuXG4gICAgICogQHB1YmxpY1xuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqICAgICAgbGV0IG9iaiA9IHsgbmFtZTogJ1JvYmVydCcsIGdlbmRlcjogJ21hbGUnLCBwaG9uZTogJzU1NS01NTUtNTU1NScgfVxuICAgICAqXG4gICAgICogICAgICBVdGlsLmRlbGV0ZVByb3BlcnR5RnJvbU9iamVjdChvYmosIFsncGhvbmUnLCAnZ2VuZGVyJ10pO1xuICAgICAqXG4gICAgICogICAgICAvLyB7IG5hbWU6ICdSb2JlcnQnIH1cbiAgICAgKi9cbiAgICBVdGlsLmRlbGV0ZVByb3BlcnR5RnJvbU9iamVjdCA9IGZ1bmN0aW9uIChvYmplY3QsIHZhbHVlKSB7XG4gICAgICAgIC8vIElmIHByb3BlcnRpZXMgaXMgbm90IGFuIGFycmF5IHRoZW4gbWFrZSBpdCBhbiBhcnJheSBvYmplY3QuXG4gICAgICAgIHZhciBsaXN0ID0gKHZhbHVlIGluc3RhbmNlb2YgQXJyYXkpID8gdmFsdWUgOiBbdmFsdWVdO1xuICAgICAgICBPYmplY3RcbiAgICAgICAgICAgIC5rZXlzKG9iamVjdClcbiAgICAgICAgICAgIC5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgICAgICAgIHZhciB2YWx1ZSA9IG9iamVjdFtrZXldO1xuICAgICAgICAgICAgaWYgKGxpc3QuaW5jbHVkZXMoa2V5KSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIGRlbGV0ZSBvYmplY3Rba2V5XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHZhbHVlIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgICAgICAgICAgICB2YWx1ZS5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7IHJldHVybiBVdGlsLmRlbGV0ZVByb3BlcnR5RnJvbU9iamVjdChpdGVtLCBsaXN0KTsgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICh2YWx1ZSBpbnN0YW5jZW9mIE9iamVjdCkge1xuICAgICAgICAgICAgICAgIFV0aWwuZGVsZXRlUHJvcGVydHlGcm9tT2JqZWN0KHZhbHVlLCBsaXN0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBvYmplY3Q7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBSZW5hbWVzIGEgcHJvcGVydHkgbmFtZSBvbiBhbiBvYmplY3QuXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIHJlbmFtZVByb3BlcnR5T25PYmplY3RcbiAgICAgKiBAcGFyYW0gb2JqZWN0IHtPYmplY3R9IFRoZSBvYmplY3QgeW91IHdhbnQgdG8gcmVuYW1lIHByb3BlcnRpZXMgZnJvbS5cbiAgICAgKiBAcGFyYW0gb2xkTmFtZSB7c3RyaW5nfVxuICAgICAqIEBwYXJhbSBuZXdOYW1lIHtzdHJpbmd9XG4gICAgICogQHJldHVybnMge2FueX0gUmV0dXJucyB0aGUgb2JqZWN0IHBhc3NlZCBpbiByZW5hbWVkIHByb3BlcnRpZXMuXG4gICAgICogQHB1YmxpY1xuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqICAgICAgbGV0IG9iaiA9IHsgbmFtZTogJ1JvYmVydCcsIGdlbmRlcjogJ21hbGUnLCBwaG9uZTogJzU1NS01NTUtNTU1NScgfVxuICAgICAqXG4gICAgICogICAgICBVdGlsLnJlbmFtZVByb3BlcnR5T25PYmplY3Qob2JqLCAnZ2VuZGVyJywgJ3NleCcpO1xuICAgICAqXG4gICAgICogICAgICAvLyB7IG5hbWU6ICdSb2JlcnQnLCBzZXg6ICdtYWxlJywgcGhvbmU6ICc1NTUtNTU1LTU1NTUnIH1cbiAgICAgKi9cbiAgICBVdGlsLnJlbmFtZVByb3BlcnR5T25PYmplY3QgPSBmdW5jdGlvbiAob2JqZWN0LCBvbGROYW1lLCBuZXdOYW1lKSB7XG4gICAgICAgIC8vIENoZWNrIGZvciB0aGUgb2xkIHByb3BlcnR5IG5hbWUgdG8gYXZvaWQgYSBSZWZlcmVuY2VFcnJvciBpbiBzdHJpY3QgbW9kZS5cbiAgICAgICAgaWYgKG9iamVjdC5oYXNPd25Qcm9wZXJ0eShvbGROYW1lKSkge1xuICAgICAgICAgICAgb2JqZWN0W25ld05hbWVdID0gb2JqZWN0W29sZE5hbWVdO1xuICAgICAgICAgICAgZGVsZXRlIG9iamVjdFtvbGROYW1lXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gb2JqZWN0O1xuICAgIH07XG4gICAgLyoqXG4gICAgICogTWFrZXMgYSBjbG9uZSBvZiBhbiBvYmplY3QuXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIGNsb25lXG4gICAgICogQHBhcmFtIG9iaiB7T2JqZWN0fSBUaGUgb2JqZWN0IHlvdSB0byBjbG9uZS5cbiAgICAgKiBAcmV0dXJucyB7YW55fSBSZXR1cm5zIGEgY2xvbmUgb2JqZWN0IG9mIHRoZSBvbmUgcGFzc2VkIGluLlxuICAgICAqIEBwdWJsaWNcbiAgICAgKiBAc3RhdGljXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiAgICAgIGxldCBjbG9uZU9mT2JqZWN0ID0gVXRpbC5jbG9uZShvYmopO1xuICAgICAqL1xuICAgIFV0aWwuY2xvbmUgPSBmdW5jdGlvbiAob2JqKSB7XG4gICAgICAgIC8vb3RoZXIgc2NyaXB0czogaHR0cDovL2Rhdmlkd2Fsc2gubmFtZS9qYXZhc2NyaXB0LWNsb25lXG4gICAgICAgIC8vaHR0cDovL29yYW5sb29uZXkuY29tL2Z1bmN0aW9uYWwtamF2YXNjcmlwdC9cbiAgICAgICAgLy9odHRwOi8vb3Jhbmxvb25leS5jb20vZGVlcC1jb3B5LWphdmFzY3JpcHQvXG4gICAgICAgIC8vIEhhbmRsZSB0aGUgMyBzaW1wbGUgdHlwZXMsIGFuZCBudWxsIG9yIHVuZGVmaW5lZFxuICAgICAgICBpZiAobnVsbCA9PSBvYmogfHwgJ29iamVjdCcgIT0gdHlwZW9mIG9iaikge1xuICAgICAgICAgICAgcmV0dXJuIG9iajtcbiAgICAgICAgfVxuICAgICAgICAvLyBIYW5kbGUgRGF0ZVxuICAgICAgICBpZiAob2JqIGluc3RhbmNlb2YgRGF0ZSkge1xuICAgICAgICAgICAgdmFyIGRhdGUgPSBuZXcgRGF0ZSgpO1xuICAgICAgICAgICAgZGF0ZS5zZXRUaW1lKG9iai5nZXRUaW1lKCkpO1xuICAgICAgICAgICAgcmV0dXJuIGRhdGU7XG4gICAgICAgIH1cbiAgICAgICAgLy8gSGFuZGxlIEFycmF5XG4gICAgICAgIGlmIChvYmogaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgICAgICAgdmFyIGFycmF5ID0gW107XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gb2JqLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgICAgICAgYXJyYXlbaV0gPSBVdGlsLmNsb25lKG9ialtpXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gYXJyYXk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gSGFuZGxlIE9iamVjdFxuICAgICAgICBpZiAob2JqIGluc3RhbmNlb2YgT2JqZWN0KSB7XG4gICAgICAgICAgICB2YXIgY29weSA9IHt9O1xuICAgICAgICAgICAgZm9yICh2YXIgYXR0ciBpbiBvYmopIHtcbiAgICAgICAgICAgICAgICBpZiAob2JqLmhhc093blByb3BlcnR5KGF0dHIpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvcHlbYXR0cl0gPSBVdGlsLmNsb25lKG9ialthdHRyXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGNvcHk7XG4gICAgICAgIH1cbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiW1V0aWxdIFVuYWJsZSB0byBjb3B5IG9iaiEgSXRzIHR5cGUgaXNuJ3Qgc3VwcG9ydGVkLlwiKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIENvbnZlcnRzIGEgc3RyaW5nIG9yIG51bWJlciB0byBhIGJvb2xlYW4uXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIHRvQm9vbGVhblxuICAgICAqIEBwYXJhbSBzdHJOdW0ge3N0cmluZ3xudW1iZXJ9XG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICogQHB1YmxpY1xuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqICAgICAgVXRpbC50b0Jvb2xlYW4oXCJUUlVFXCIpO1xuICAgICAqICAgICAgLy8gdHJ1ZVxuICAgICAqXG4gICAgICogICAgICBVdGlsLnRvQm9vbGVhbigwKTtcbiAgICAgKiAgICAgIC8vIGZhbHNlXG4gICAgICpcbiAgICAgKiAgICAgIFV0aWwudG9Cb29sZWFuKHVuZGVmaW5lZCk7XG4gICAgICogICAgICAvLyBmYWxzZVxuICAgICAqL1xuICAgIFV0aWwudG9Cb29sZWFuID0gZnVuY3Rpb24gKHN0ck51bSkge1xuICAgICAgICB2YXIgdmFsdWUgPSAodHlwZW9mIHN0ck51bSA9PT0gJ3N0cmluZycpID8gc3RyTnVtLnRvTG93ZXJDYXNlKCkgOiBzdHJOdW07XG4gICAgICAgIHJldHVybiAodmFsdWUgPiAwIHx8IHZhbHVlID09ICd0cnVlJyB8fCB2YWx1ZSA9PSAneWVzJyk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBuYW1lIG9mIHRoZSBmdW5jdGlvbi9vYmplY3QgcGFzc2VkIGluLlxuICAgICAqXG4gICAgICogQG1ldGhvZCBnZXROYW1lXG4gICAgICogQHBhcmFtIGNsYXNzT2JqZWN0IHthbnl9XG4gICAgICogQHJldHVybnMge3N0cmluZ30gUmV0dXJucyB0aGUgbmFtZSBvZiB0aGUgZnVuY3Rpb24gb3Igb2JqZWN0LlxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqICAgICAgbGV0IHNvbWVDbGFzcyA9IG5ldyBTb21lQ2xhc3MoKTtcbiAgICAgKiAgICAgIFV0aWwuZ2V0TmFtZShzb21lQ2xhc3MpOyAgICAgICAgICAgIC8vICdTb21lQ2xhc3MnXG4gICAgICpcbiAgICAgKiAgICAgIFV0aWwuZ2V0TmFtZShmdW5jdGlvbiBUZXN0KCl7fSk7ICAgIC8vICdUZXN0J1xuICAgICAqICAgICAgVXRpbC5nZXROYW1lKGZ1bmN0aW9uICgpe30pOyAgICAgICAgLy8gJ2Fub255bW91cydcbiAgICAgKi9cbiAgICBVdGlsLmdldE5hbWUgPSBmdW5jdGlvbiAoY2xhc3NPYmplY3QpIHtcbiAgICAgICAgdmFyIHR5cGUgPSB0eXBlb2YgY2xhc3NPYmplY3Q7XG4gICAgICAgIHZhciB2YWx1ZTtcbiAgICAgICAgdmFyIGZ1bmNOYW1lUmVnZXggPSAvZnVuY3Rpb24gKFteXFwoXSspLztcbiAgICAgICAgaWYgKHR5cGUgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICAvLyBHZXRzIHRoZSBuYW1lIG9mIHRoZSBvYmplY3QuXG4gICAgICAgICAgICB2YXIgcmVzdWx0cyA9IGNsYXNzT2JqZWN0LmNvbnN0cnVjdG9yLnRvU3RyaW5nKCkubWF0Y2goZnVuY05hbWVSZWdleCk7XG4gICAgICAgICAgICB2YWx1ZSA9IHJlc3VsdHNbMV07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAvLyBUaGlzIGVsc2UgY29kZSBpcyBtYWlubHkgZm9yIEludGVybmV0IEV4cGxvcmUuXG4gICAgICAgICAgICB2YXIgaXNGdW5jdGlvbiA9ICh0eXBlID09PSAnZnVuY3Rpb24nKTtcbiAgICAgICAgICAgIC8vIFRPRE86IGZpZ3VyZSBvdXQgaG93IHRvIGV4cGxhaW4gdGhpc1xuICAgICAgICAgICAgdmFyIG5hbWVfMSA9IGlzRnVuY3Rpb24gJiYgKChjbGFzc09iamVjdC5uYW1lICYmIFsnJywgY2xhc3NPYmplY3QubmFtZV0pIHx8IGNsYXNzT2JqZWN0LnRvU3RyaW5nKCkubWF0Y2goZnVuY05hbWVSZWdleCkpO1xuICAgICAgICAgICAgaWYgKGlzRnVuY3Rpb24gPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgdmFsdWUgPSB0eXBlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAobmFtZV8xICYmIG5hbWVfMVsxXSkge1xuICAgICAgICAgICAgICAgIHZhbHVlID0gbmFtZV8xWzFdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdmFsdWUgPSAnYW5vbnltb3VzJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGFuZCByZXR1cm5zIGEgbmV3IGRlYm91bmNlZCB2ZXJzaW9uIG9mIHRoZSBwYXNzZWQgZnVuY3Rpb24gd2hpY2ggd2lsbCBwb3N0cG9uZSBpdHMgZXhlY3V0aW9uIHVudGlsIGFmdGVyXG4gICAgICogd2FpdCBtaWxsaXNlY29uZHMgaGF2ZSBlbGFwc2VkIHNpbmNlIHRoZSBsYXN0IHRpbWUgaXQgd2FzIGludm9rZWQuXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIGRlYm91bmNlXG4gICAgICogQHBhcmFtIGNhbGxiYWNrIHtGdW5jdGlvbn0gVGhlIGZ1bmN0aW9uIHRoYXQgc2hvdWxkIGJlIGV4ZWN1dGVkLlxuICAgICAqIEBwYXJhbSB3YWl0IHtudW1iZXJ9IE1pbGxpc2Vjb25kcyB0byBlbGFwc2VkIGJlZm9yZSBpbnZva2luZyB0aGUgY2FsbGJhY2suXG4gICAgICogQHBhcmFtIGltbWVkaWF0ZSB7Ym9vbGVhbn0gUGFzcyB0cnVlIGZvciB0aGUgaW1tZWRpYXRlIHBhcmFtZXRlciB0byBjYXVzZSBkZWJvdW5jZSB0byB0cmlnZ2VyIHRoZSBmdW5jdGlvbiBvbiB0aGUgbGVhZGluZyBpbnN0ZWFkIG9mIHRoZSB0cmFpbGluZyBlZGdlIG9mIHRoZSB3YWl0IGludGVydmFsLiBVc2VmdWwgaW4gY2lyY3Vtc3RhbmNlcyBsaWtlIHByZXZlbnRpbmcgYWNjaWRlbnRhbCBkb3VibGUtY2xpY2tzIG9uIGEgXCJzdWJtaXRcIiBidXR0b24gZnJvbSBmaXJpbmcgYSBzZWNvbmQgdGltZS5cbiAgICAgKiBAcGFyYW0gY2FsbGJhY2tTY29wZSB7YW55fSBUaGUgc2NvcGUgb2YgdGhlIGNhbGxiYWNrIGZ1bmN0aW9uIHRoYXQgc2hvdWxkIGJlIGV4ZWN1dGVkLlxuICAgICAqIEBwdWJsaWNcbiAgICAgKiBAc3RhdGljXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiAgICAgIFV0aWwuZGVib3VuY2UodGhpcy5fb25CcmVha3BvaW50Q2hhbmdlLCAyNTAsIGZhbHNlLCB0aGlzKTtcbiAgICAgKi9cbiAgICBVdGlsLmRlYm91bmNlID0gZnVuY3Rpb24gKGNhbGxiYWNrLCB3YWl0LCBpbW1lZGlhdGUsIGNhbGxiYWNrU2NvcGUpIHtcbiAgICAgICAgdmFyIHRpbWVvdXQ7XG4gICAgICAgIHZhciByZXN1bHQ7XG4gICAgICAgIHZhciBkZWJvdW5jZWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgYXJncyA9IGFyZ3VtZW50cztcbiAgICAgICAgICAgIGZ1bmN0aW9uIGRlbGF5ZWQoKSB7XG4gICAgICAgICAgICAgICAgaWYgKGltbWVkaWF0ZSA9PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSBjYWxsYmFjay5hcHBseShjYWxsYmFja1Njb3BlLCBhcmdzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGltZW91dCA9IG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGltZW91dCkge1xuICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aW1lb3V0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGltbWVkaWF0ZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9IGNhbGxiYWNrLmFwcGx5KGNhbGxiYWNrU2NvcGUsIGFyZ3MpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGltZW91dCA9IHNldFRpbWVvdXQoZGVsYXllZCwgd2FpdCk7XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9O1xuICAgICAgICBkZWJvdW5jZWQuY2FuY2VsID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gZGVib3VuY2VkO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogVE9ETzogWVVJRG9jX2NvbW1lbnRcbiAgICAgKlxuICAgICAqIEBtZXRob2QgYXBwbHlNaXhpbnNcbiAgICAgKiBAcGFyYW0gZGVyaXZlZEN0b3Ige2FueX1cbiAgICAgKiBAcGFyYW0gYmFzZUN0b3JzIHthbnl9XG4gICAgICogQHB1YmxpY1xuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqXG4gICAgIGNsYXNzIEZsaWVzIHtcbiAgICAgICAgICAgICAgICBmbHkoKSB7XG4gICAgICAgICAgICAgICAgICAgIGFsZXJ0KCdJcyBpdCBhIGJpcmQ/IElzIGl0IGEgcGxhbmU/Jyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgIGNsYXNzIENsaW1icyB7XG4gICAgICAgICAgICAgICAgY2xpbWIoKSB7XG4gICAgICAgICAgICAgICAgICAgIGFsZXJ0KCdNeSBzcGlkZXItc2Vuc2UgaXMgdGluZ2xpbmcuJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgIGNsYXNzIEhvcnNlZmx5V29tYW4gaW1wbGVtZW50cyBDbGltYnMsIEZsaWVzIHtcbiAgICAgICAgICAgICAgICBjbGltYjogKCkgPT4gdm9pZDtcbiAgICAgICAgICAgICAgICBmbHk6ICgpID0+IHZvaWQ7XG4gICAgICAgICAgICB9XG5cbiAgICAgVXRpbC5hcHBseU1peGlucyhIb3JzZWZseVdvbWFuLCBbQ2xpbWJzLCBGbGllc10pO1xuICAgICAqL1xuICAgIFV0aWwuYXBwbHlNaXhpbnMgPSBmdW5jdGlvbiAoZGVyaXZlZEN0b3IsIGJhc2VDdG9ycykge1xuICAgICAgICBiYXNlQ3RvcnMuZm9yRWFjaChmdW5jdGlvbiAoYmFzZUN0b3IpIHtcbiAgICAgICAgICAgIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKGJhc2VDdG9yLnByb3RvdHlwZSkuZm9yRWFjaChmdW5jdGlvbiAobmFtZSkge1xuICAgICAgICAgICAgICAgIGRlcml2ZWRDdG9yLnByb3RvdHlwZVtuYW1lXSA9IGJhc2VDdG9yLnByb3RvdHlwZVtuYW1lXTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFJldHVybnMgYSBuZXcgYXJyYXkgd2l0aCBkdXBsaWNhdGVzIHJlbW92ZWQuXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIHVuaXF1ZVxuICAgICAqIEBwYXJhbSBsaXN0IHtBcnJheS48YW55Pn0gVGhlIGFycmF5IHlvdSB3YW50IHRvIHVzZSB0byBnZW5lcmF0ZSB0aGUgdW5pcXVlIGFycmF5LlxuICAgICAqIEByZXR1cm4ge0FycmF5PGFueT59IFJldHVybnMgYSBuZXcgYXJyYXkgbGlzdCBvZiB1bmlxdWUgaXRlbXMuXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIFV0aWwudW5pcXVlID0gZnVuY3Rpb24gKGxpc3QpIHtcbiAgICAgICAgdmFyIHVuaXF1ZUxpc3QgPSBsaXN0LnJlZHVjZShmdW5jdGlvbiAocHJldmlvdXNWYWx1ZSwgY3VycmVudFZhbHVlKSB7XG4gICAgICAgICAgICBpZiAocHJldmlvdXNWYWx1ZS5pbmRleE9mKGN1cnJlbnRWYWx1ZSkgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgcHJldmlvdXNWYWx1ZS5wdXNoKGN1cnJlbnRWYWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcHJldmlvdXNWYWx1ZTtcbiAgICAgICAgfSwgW10pO1xuICAgICAgICByZXR1cm4gdW5pcXVlTGlzdDtcbiAgICB9O1xuICAgIHJldHVybiBVdGlsO1xufSgpKTtcbi8qKlxuICogS2VlcHMgdHJhY2sgb2YgdGhlIGNvdW50IGZvciB0aGUgdW5pcXVlSWQgbWV0aG9kLlxuICpcbiAqIEBwcm9wZXJ0eSBfaWRDb3VudGVyXG4gKiBAdHlwZSB7aW50fVxuICogQHByaXZhdGVcbiAqIEBzdGF0aWNcbiAqL1xuVXRpbC5faWRDb3VudGVyID0gMDtcbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IFV0aWw7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1VdGlsLmpzLm1hcCJdfQ==

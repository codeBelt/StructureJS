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
    // console.log(`CheckoutViewModel`, new CheckoutViewModel().pickHowOptions);
    new CheckoutViewModel_1["default"]().pickHowOptions;
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
         * @readonly
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
                var currentData = _this[propertyName];
                var newData = data[propertyName];
                var propertyData = newData !== void 0 ? newData : currentData;
                _this._updatePropertyWithNewData(propertyName, propertyData);
            }
        });
        return this;
    };
    /**
     * Add the newData to the property
     *
     * @method _updatePropertyWithNewData
     * @param propertyName
     * @param newData
     * @protected
     */
    BaseModel.prototype._updatePropertyWithNewData = function (propertyName, newData) {
        var _this = this;
        console.log("propertyName", propertyName);
        // If the current property on the model is an array and the newData is an array.
        if (this[propertyName] instanceof Array === true && newData instanceof Array === true) {
            var isCurrentValueAnUninstantiatedBaseModel = typeof this[propertyName][0] === 'function' && this[propertyName][0].IS_BASE_MODEL === true;
            var isNewValueAnUninstantiatedBaseModel = typeof newData[0] === 'function' && newData[0].IS_BASE_MODEL === true;
            // console.log(`isCurrentValueAnUninstantiatedBaseModel`, isCurrentValueAnUninstantiatedBaseModel);
            // console.log(`isNewValueAnUninstantiatedBaseModel`, isNewValueAnUninstantiatedBaseModel);
            // If the current data and the new data are both uninstantiated BaseModel we don't want to continue.
            if ((isCurrentValueAnUninstantiatedBaseModel === true && isNewValueAnUninstantiatedBaseModel === true) === false) {
                // console.log(`propertyName`, propertyName);
                var baseModelOrUndefined_1 = this[propertyName][0];
                console.log("baseModelOrUndefined", baseModelOrUndefined_1);
                console.log("newData", newData);
                // debugger;
                this[propertyName] = newData.map(function (data) {
                    return _this._updateData(baseModelOrUndefined_1, data);
                });
            } else {
                this[propertyName] = [];
            }
        } else {
            this[propertyName] = this._updateData(this[propertyName], newData);
        }
    };
    /**
     * TODO: YUIDoc_comment
     *
     * @method _updateData
     * @param keyValue
     * @param newData
     * @protected
     */
    BaseModel.prototype._updateData = function (keyValue, newData) {
        console.log("_updateData", keyValue, newData);
        // debugger;
        if (this.sjsOptions.expand === false && typeof newData === 'function' && newData.IS_BASE_MODEL === true) {
            // If newData is a function and has an IS_BASE_MODEL static property then it must be a child model and we need to return null
            // so it cleans up the BaseModel functions on the property.
            // To create empty model(s) pass { expand: true } for the options.
            return null;
        }
        if (typeof keyValue === 'function' && keyValue.IS_BASE_MODEL === true) {
            console.log("1");
            // If the property is an instance of a BaseModel class and has not been created yet.
            // Instantiate it and pass in the newData to the constructor.
            keyValue = new keyValue(newData, this.sjsOptions);
        } else if (keyValue instanceof BaseModel === true) {
            console.log("2");
            // If property is an instance of a BaseModel class and has already been created.
            // Call the update method and pass in the newData.
            keyValue.update(newData);
        } else {
            console.log("3");
            // Else just assign the newData to the property.
            keyValue = newData;
        }
        return keyValue;
    };
    /**
     * Converts the Base Model data into a JSON object and deletes the sjsId property.
     *
     * @method toJSON
     * @returns {any}
     * @public
     * @example
     *     let obj = carModel.toJSON();
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
     *     let str = carModel.toJSONString();
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
     *      let str = '{"make":"Tesla","model":"Model S","year":2014}'
     *      let carModel = new CarModel();
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
     *     let clone = carModel.clone();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9jb3JlLWpzL29iamVjdC9jcmVhdGUuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9jcmVhdGUuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2EtZnVuY3Rpb24uanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2FuLW9iamVjdC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fYXJyYXktaW5jbHVkZXMuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2NvZi5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fY29yZS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fY3R4LmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19kZWZpbmVkLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19kZXNjcmlwdG9ycy5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZG9tLWNyZWF0ZS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZW51bS1idWcta2V5cy5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZXhwb3J0LmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19mYWlscy5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZ2xvYmFsLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19oYXMuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2hpZGUuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2h0bWwuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2llOC1kb20tZGVmaW5lLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pb2JqZWN0LmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pcy1vYmplY3QuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1jcmVhdGUuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1kcC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWRwcy5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWtleXMtaW50ZXJuYWwuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1rZXlzLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19wcm9wZXJ0eS1kZXNjLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19zaGFyZWQta2V5LmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19zaGFyZWQuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLWluZGV4LmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1pbnRlZ2VyLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1pb2JqZWN0LmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1sZW5ndGguanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLXByaW1pdGl2ZS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdWlkLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5vYmplY3QuY3JlYXRlLmpzIiwic3JjL2Fzc2V0cy9zY3JpcHRzL0FwcC5qcyIsInNyYy9hc3NldHMvc2NyaXB0cy9tYWluLnRzIiwic3JjL2Fzc2V0cy9zY3JpcHRzL21vZGVscy9DaGVja291dFZpZXdNb2RlbC5qcyIsInNyYy9hc3NldHMvc2NyaXB0cy9tb2RlbHMvZm9ybS9JbnB1dE1vZGVsLmpzIiwiLi4vLi4vdHMvQmFzZU9iamVjdC5qcyIsIi4uLy4uL3RzL21vZGVsL0Jhc2VNb2RlbC5qcyIsIi4uLy4uL3RzL3V0aWwvVXRpbC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBOztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDSkE7QUFDQTtBQUNBO0FBQ0E7O0FDSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDSkE7QUFDQTs7QUNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0pBO0FBQ0E7QUFDQTtBQUNBOztBQ0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ05BO0FBQ0E7QUFDQTtBQUNBOztBQ0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNOQTtBQUNBO0FBQ0E7QUFDQTs7QUNIQTtBQUNBO0FBQ0E7QUFDQTs7QUNIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1BBOztBQ0FBO0FBQ0E7QUFDQTs7QUNGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0pBO0FBQ0E7QUFDQTs7QUNGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEJBO0FB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LFlBQXRCLE1BQXdDLENBQUMsQ0FBN0MsRUFBZ0Q7QUFDNUMsOEJBQWMsSUFBZCxDQUFtQixZQUFuQjtBQUNIO0FBQ0QsbUJBQU8sYUFBUDtBQUNILFNBTGdCLEVBS2QsRUFMYyxDQUFqQjtBQU1BLGVBQU8sVUFBUDtBQUNILEtBUkQ7QUFTQSxXQUFPLElBQVA7QUFDSCxDQWpTVyxFQUFaO0FBa1NBOzs7Ozs7OztBQVFBLEtBQUssVUFBTCxHQUFrQixDQUFsQjtBQUNBLFFBQVEsVUFBUixHQUFxQixJQUFyQjtBQUNBLFFBQVEsU0FBUixJQUFxQixJQUFyQjtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIm1vZHVsZS5leHBvcnRzID0geyBcImRlZmF1bHRcIjogcmVxdWlyZShcImNvcmUtanMvbGlicmFyeS9mbi9vYmplY3QvY3JlYXRlXCIpLCBfX2VzTW9kdWxlOiB0cnVlIH07IiwicmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lczYub2JqZWN0LmNyZWF0ZScpO1xudmFyICRPYmplY3QgPSByZXF1aXJlKCcuLi8uLi9tb2R1bGVzL19jb3JlJykuT2JqZWN0O1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBjcmVhdGUoUCwgRCl7XG4gIHJldHVybiAkT2JqZWN0LmNyZWF0ZShQLCBEKTtcbn07IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIGlmKHR5cGVvZiBpdCAhPSAnZnVuY3Rpb24nKXRocm93IFR5cGVFcnJvcihpdCArICcgaXMgbm90IGEgZnVuY3Rpb24hJyk7XG4gIHJldHVybiBpdDtcbn07IiwidmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0Jyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgaWYoIWlzT2JqZWN0KGl0KSl0aHJvdyBUeXBlRXJyb3IoaXQgKyAnIGlzIG5vdCBhbiBvYmplY3QhJyk7XG4gIHJldHVybiBpdDtcbn07IiwiLy8gZmFsc2UgLT4gQXJyYXkjaW5kZXhPZlxuLy8gdHJ1ZSAgLT4gQXJyYXkjaW5jbHVkZXNcbnZhciB0b0lPYmplY3QgPSByZXF1aXJlKCcuL190by1pb2JqZWN0JylcbiAgLCB0b0xlbmd0aCAgPSByZXF1aXJlKCcuL190by1sZW5ndGgnKVxuICAsIHRvSW5kZXggICA9IHJlcXVpcmUoJy4vX3RvLWluZGV4Jyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKElTX0lOQ0xVREVTKXtcbiAgcmV0dXJuIGZ1bmN0aW9uKCR0aGlzLCBlbCwgZnJvbUluZGV4KXtcbiAgICB2YXIgTyAgICAgID0gdG9JT2JqZWN0KCR0aGlzKVxuICAgICAgLCBsZW5ndGggPSB0b0xlbmd0aChPLmxlbmd0aClcbiAgICAgICwgaW5kZXggID0gdG9JbmRleChmcm9tSW5kZXgsIGxlbmd0aClcbiAgICAgICwgdmFsdWU7XG4gICAgLy8gQXJyYXkjaW5jbHVkZXMgdXNlcyBTYW1lVmFsdWVaZXJvIGVxdWFsaXR5IGFsZ29yaXRobVxuICAgIGlmKElTX0lOQ0xVREVTICYmIGVsICE9IGVsKXdoaWxlKGxlbmd0aCA+IGluZGV4KXtcbiAgICAgIHZhbHVlID0gT1tpbmRleCsrXTtcbiAgICAgIGlmKHZhbHVlICE9IHZhbHVlKXJldHVybiB0cnVlO1xuICAgIC8vIEFycmF5I3RvSW5kZXggaWdub3JlcyBob2xlcywgQXJyYXkjaW5jbHVkZXMgLSBub3RcbiAgICB9IGVsc2UgZm9yKDtsZW5ndGggPiBpbmRleDsgaW5kZXgrKylpZihJU19JTkNMVURFUyB8fCBpbmRleCBpbiBPKXtcbiAgICAgIGlmKE9baW5kZXhdID09PSBlbClyZXR1cm4gSVNfSU5DTFVERVMgfHwgaW5kZXggfHwgMDtcbiAgICB9IHJldHVybiAhSVNfSU5DTFVERVMgJiYgLTE7XG4gIH07XG59OyIsInZhciB0b1N0cmluZyA9IHt9LnRvU3RyaW5nO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwoaXQpLnNsaWNlKDgsIC0xKTtcbn07IiwidmFyIGNvcmUgPSBtb2R1bGUuZXhwb3J0cyA9IHt2ZXJzaW9uOiAnMi40LjAnfTtcbmlmKHR5cGVvZiBfX2UgPT0gJ251bWJlcicpX19lID0gY29yZTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bmRlZiIsIi8vIG9wdGlvbmFsIC8gc2ltcGxlIGNvbnRleHQgYmluZGluZ1xudmFyIGFGdW5jdGlvbiA9IHJlcXVpcmUoJy4vX2EtZnVuY3Rpb24nKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oZm4sIHRoYXQsIGxlbmd0aCl7XG4gIGFGdW5jdGlvbihmbik7XG4gIGlmKHRoYXQgPT09IHVuZGVmaW5lZClyZXR1cm4gZm47XG4gIHN3aXRjaChsZW5ndGgpe1xuICAgIGNhc2UgMTogcmV0dXJuIGZ1bmN0aW9uKGEpe1xuICAgICAgcmV0dXJuIGZuLmNhbGwodGhhdCwgYSk7XG4gICAgfTtcbiAgICBjYXNlIDI6IHJldHVybiBmdW5jdGlvbihhLCBiKXtcbiAgICAgIHJldHVybiBmbi5jYWxsKHRoYXQsIGEsIGIpO1xuICAgIH07XG4gICAgY2FzZSAzOiByZXR1cm4gZnVuY3Rpb24oYSwgYiwgYyl7XG4gICAgICByZXR1cm4gZm4uY2FsbCh0aGF0LCBhLCBiLCBjKTtcbiAgICB9O1xuICB9XG4gIHJldHVybiBmdW5jdGlvbigvKiAuLi5hcmdzICovKXtcbiAgICByZXR1cm4gZm4uYXBwbHkodGhhdCwgYXJndW1lbnRzKTtcbiAgfTtcbn07IiwiLy8gNy4yLjEgUmVxdWlyZU9iamVjdENvZXJjaWJsZShhcmd1bWVudClcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICBpZihpdCA9PSB1bmRlZmluZWQpdGhyb3cgVHlwZUVycm9yKFwiQ2FuJ3QgY2FsbCBtZXRob2Qgb24gIFwiICsgaXQpO1xuICByZXR1cm4gaXQ7XG59OyIsIi8vIFRoYW5rJ3MgSUU4IGZvciBoaXMgZnVubnkgZGVmaW5lUHJvcGVydHlcbm1vZHVsZS5leHBvcnRzID0gIXJlcXVpcmUoJy4vX2ZhaWxzJykoZnVuY3Rpb24oKXtcbiAgcmV0dXJuIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh7fSwgJ2EnLCB7Z2V0OiBmdW5jdGlvbigpeyByZXR1cm4gNzsgfX0pLmEgIT0gNztcbn0pOyIsInZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vX2lzLW9iamVjdCcpXG4gICwgZG9jdW1lbnQgPSByZXF1aXJlKCcuL19nbG9iYWwnKS5kb2N1bWVudFxuICAvLyBpbiBvbGQgSUUgdHlwZW9mIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQgaXMgJ29iamVjdCdcbiAgLCBpcyA9IGlzT2JqZWN0KGRvY3VtZW50KSAmJiBpc09iamVjdChkb2N1bWVudC5jcmVhdGVFbGVtZW50KTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gaXMgPyBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGl0KSA6IHt9O1xufTsiLCIvLyBJRSA4LSBkb24ndCBlbnVtIGJ1ZyBrZXlzXG5tb2R1bGUuZXhwb3J0cyA9IChcbiAgJ2NvbnN0cnVjdG9yLGhhc093blByb3BlcnR5LGlzUHJvdG90eXBlT2YscHJvcGVydHlJc0VudW1lcmFibGUsdG9Mb2NhbGVTdHJpbmcsdG9TdHJpbmcsdmFsdWVPZidcbikuc3BsaXQoJywnKTsiLCJ2YXIgZ2xvYmFsICAgID0gcmVxdWlyZSgnLi9fZ2xvYmFsJylcbiAgLCBjb3JlICAgICAgPSByZXF1aXJlKCcuL19jb3JlJylcbiAgLCBjdHggICAgICAgPSByZXF1aXJlKCcuL19jdHgnKVxuICAsIGhpZGUgICAgICA9IHJlcXVpcmUoJy4vX2hpZGUnKVxuICAsIFBST1RPVFlQRSA9ICdwcm90b3R5cGUnO1xuXG52YXIgJGV4cG9ydCA9IGZ1bmN0aW9uKHR5cGUsIG5hbWUsIHNvdXJjZSl7XG4gIHZhciBJU19GT1JDRUQgPSB0eXBlICYgJGV4cG9ydC5GXG4gICAgLCBJU19HTE9CQUwgPSB0eXBlICYgJGV4cG9ydC5HXG4gICAgLCBJU19TVEFUSUMgPSB0eXBlICYgJGV4cG9ydC5TXG4gICAgLCBJU19QUk9UTyAgPSB0eXBlICYgJGV4cG9ydC5QXG4gICAgLCBJU19CSU5EICAgPSB0eXBlICYgJGV4cG9ydC5CXG4gICAgLCBJU19XUkFQICAgPSB0eXBlICYgJGV4cG9ydC5XXG4gICAgLCBleHBvcnRzICAgPSBJU19HTE9CQUwgPyBjb3JlIDogY29yZVtuYW1lXSB8fCAoY29yZVtuYW1lXSA9IHt9KVxuICAgICwgZXhwUHJvdG8gID0gZXhwb3J0c1tQUk9UT1RZUEVdXG4gICAgLCB0YXJnZXQgICAgPSBJU19HTE9CQUwgPyBnbG9iYWwgOiBJU19TVEFUSUMgPyBnbG9iYWxbbmFtZV0gOiAoZ2xvYmFsW25hbWVdIHx8IHt9KVtQUk9UT1RZUEVdXG4gICAgLCBrZXksIG93biwgb3V0O1xuICBpZihJU19HTE9CQUwpc291cmNlID0gbmFtZTtcbiAgZm9yKGtleSBpbiBzb3VyY2Upe1xuICAgIC8vIGNvbnRhaW5zIGluIG5hdGl2ZVxuICAgIG93biA9ICFJU19GT1JDRUQgJiYgdGFyZ2V0ICYmIHRhcmdldFtrZXldICE9PSB1bmRlZmluZWQ7XG4gICAgaWYob3duICYmIGtleSBpbiBleHBvcnRzKWNvbnRpbnVlO1xuICAgIC8vIGV4cG9ydCBuYXRpdmUgb3IgcGFzc2VkXG4gICAgb3V0ID0gb3duID8gdGFyZ2V0W2tleV0gOiBzb3VyY2Vba2V5XTtcbiAgICAvLyBwcmV2ZW50IGdsb2JhbCBwb2xsdXRpb24gZm9yIG5hbWVzcGFjZXNcbiAgICBleHBvcnRzW2tleV0gPSBJU19HTE9CQUwgJiYgdHlwZW9mIHRhcmdldFtrZXldICE9ICdmdW5jdGlvbicgPyBzb3VyY2Vba2V5XVxuICAgIC8vIGJpbmQgdGltZXJzIHRvIGdsb2JhbCBmb3IgY2FsbCBmcm9tIGV4cG9ydCBjb250ZXh0XG4gICAgOiBJU19CSU5EICYmIG93biA/IGN0eChvdXQsIGdsb2JhbClcbiAgICAvLyB3cmFwIGdsb2JhbCBjb25zdHJ1Y3RvcnMgZm9yIHByZXZlbnQgY2hhbmdlIHRoZW0gaW4gbGlicmFyeVxuICAgIDogSVNfV1JBUCAmJiB0YXJnZXRba2V5XSA9PSBvdXQgPyAoZnVuY3Rpb24oQyl7XG4gICAgICB2YXIgRiA9IGZ1bmN0aW9uKGEsIGIsIGMpe1xuICAgICAgICBpZih0aGlzIGluc3RhbmNlb2YgQyl7XG4gICAgICAgICAgc3dpdGNoKGFyZ3VtZW50cy5sZW5ndGgpe1xuICAgICAgICAgICAgY2FzZSAwOiByZXR1cm4gbmV3IEM7XG4gICAgICAgICAgICBjYXNlIDE6IHJldHVybiBuZXcgQyhhKTtcbiAgICAgICAgICAgIGNhc2UgMjogcmV0dXJuIG5ldyBDKGEsIGIpO1xuICAgICAgICAgIH0gcmV0dXJuIG5ldyBDKGEsIGIsIGMpO1xuICAgICAgICB9IHJldHVybiBDLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICB9O1xuICAgICAgRltQUk9UT1RZUEVdID0gQ1tQUk9UT1RZUEVdO1xuICAgICAgcmV0dXJuIEY7XG4gICAgLy8gbWFrZSBzdGF0aWMgdmVyc2lvbnMgZm9yIHByb3RvdHlwZSBtZXRob2RzXG4gICAgfSkob3V0KSA6IElTX1BST1RPICYmIHR5cGVvZiBvdXQgPT0gJ2Z1bmN0aW9uJyA/IGN0eChGdW5jdGlvbi5jYWxsLCBvdXQpIDogb3V0O1xuICAgIC8vIGV4cG9ydCBwcm90byBtZXRob2RzIHRvIGNvcmUuJUNPTlNUUlVDVE9SJS5tZXRob2RzLiVOQU1FJVxuICAgIGlmKElTX1BST1RPKXtcbiAgICAgIChleHBvcnRzLnZpcnR1YWwgfHwgKGV4cG9ydHMudmlydHVhbCA9IHt9KSlba2V5XSA9IG91dDtcbiAgICAgIC8vIGV4cG9ydCBwcm90byBtZXRob2RzIHRvIGNvcmUuJUNPTlNUUlVDVE9SJS5wcm90b3R5cGUuJU5BTUUlXG4gICAgICBpZih0eXBlICYgJGV4cG9ydC5SICYmIGV4cFByb3RvICYmICFleHBQcm90b1trZXldKWhpZGUoZXhwUHJvdG8sIGtleSwgb3V0KTtcbiAgICB9XG4gIH1cbn07XG4vLyB0eXBlIGJpdG1hcFxuJGV4cG9ydC5GID0gMTsgICAvLyBmb3JjZWRcbiRleHBvcnQuRyA9IDI7ICAgLy8gZ2xvYmFsXG4kZXhwb3J0LlMgPSA0OyAgIC8vIHN0YXRpY1xuJGV4cG9ydC5QID0gODsgICAvLyBwcm90b1xuJGV4cG9ydC5CID0gMTY7ICAvLyBiaW5kXG4kZXhwb3J0LlcgPSAzMjsgIC8vIHdyYXBcbiRleHBvcnQuVSA9IDY0OyAgLy8gc2FmZVxuJGV4cG9ydC5SID0gMTI4OyAvLyByZWFsIHByb3RvIG1ldGhvZCBmb3IgYGxpYnJhcnlgIFxubW9kdWxlLmV4cG9ydHMgPSAkZXhwb3J0OyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oZXhlYyl7XG4gIHRyeSB7XG4gICAgcmV0dXJuICEhZXhlYygpO1xuICB9IGNhdGNoKGUpe1xuICAgIHJldHVybiB0cnVlO1xuICB9XG59OyIsIi8vIGh0dHBzOi8vZ2l0aHViLmNvbS96bG9pcm9jay9jb3JlLWpzL2lzc3Vlcy84NiNpc3N1ZWNvbW1lbnQtMTE1NzU5MDI4XG52YXIgZ2xvYmFsID0gbW9kdWxlLmV4cG9ydHMgPSB0eXBlb2Ygd2luZG93ICE9ICd1bmRlZmluZWQnICYmIHdpbmRvdy5NYXRoID09IE1hdGhcbiAgPyB3aW5kb3cgOiB0eXBlb2Ygc2VsZiAhPSAndW5kZWZpbmVkJyAmJiBzZWxmLk1hdGggPT0gTWF0aCA/IHNlbGYgOiBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuaWYodHlwZW9mIF9fZyA9PSAnbnVtYmVyJylfX2cgPSBnbG9iYWw7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW5kZWYiLCJ2YXIgaGFzT3duUHJvcGVydHkgPSB7fS5oYXNPd25Qcm9wZXJ0eTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQsIGtleSl7XG4gIHJldHVybiBoYXNPd25Qcm9wZXJ0eS5jYWxsKGl0LCBrZXkpO1xufTsiLCJ2YXIgZFAgICAgICAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpXG4gICwgY3JlYXRlRGVzYyA9IHJlcXVpcmUoJy4vX3Byb3BlcnR5LWRlc2MnKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKSA/IGZ1bmN0aW9uKG9iamVjdCwga2V5LCB2YWx1ZSl7XG4gIHJldHVybiBkUC5mKG9iamVjdCwga2V5LCBjcmVhdGVEZXNjKDEsIHZhbHVlKSk7XG59IDogZnVuY3Rpb24ob2JqZWN0LCBrZXksIHZhbHVlKXtcbiAgb2JqZWN0W2tleV0gPSB2YWx1ZTtcbiAgcmV0dXJuIG9iamVjdDtcbn07IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL19nbG9iYWwnKS5kb2N1bWVudCAmJiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7IiwibW9kdWxlLmV4cG9ydHMgPSAhcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKSAmJiAhcmVxdWlyZSgnLi9fZmFpbHMnKShmdW5jdGlvbigpe1xuICByZXR1cm4gT2JqZWN0LmRlZmluZVByb3BlcnR5KHJlcXVpcmUoJy4vX2RvbS1jcmVhdGUnKSgnZGl2JyksICdhJywge2dldDogZnVuY3Rpb24oKXsgcmV0dXJuIDc7IH19KS5hICE9IDc7XG59KTsiLCIvLyBmYWxsYmFjayBmb3Igbm9uLWFycmF5LWxpa2UgRVMzIGFuZCBub24tZW51bWVyYWJsZSBvbGQgVjggc3RyaW5nc1xudmFyIGNvZiA9IHJlcXVpcmUoJy4vX2NvZicpO1xubW9kdWxlLmV4cG9ydHMgPSBPYmplY3QoJ3onKS5wcm9wZXJ0eUlzRW51bWVyYWJsZSgwKSA/IE9iamVjdCA6IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIGNvZihpdCkgPT0gJ1N0cmluZycgPyBpdC5zcGxpdCgnJykgOiBPYmplY3QoaXQpO1xufTsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIHR5cGVvZiBpdCA9PT0gJ29iamVjdCcgPyBpdCAhPT0gbnVsbCA6IHR5cGVvZiBpdCA9PT0gJ2Z1bmN0aW9uJztcbn07IiwiLy8gMTkuMS4yLjIgLyAxNS4yLjMuNSBPYmplY3QuY3JlYXRlKE8gWywgUHJvcGVydGllc10pXG52YXIgYW5PYmplY3QgICAgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKVxuICAsIGRQcyAgICAgICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWRwcycpXG4gICwgZW51bUJ1Z0tleXMgPSByZXF1aXJlKCcuL19lbnVtLWJ1Zy1rZXlzJylcbiAgLCBJRV9QUk9UTyAgICA9IHJlcXVpcmUoJy4vX3NoYXJlZC1rZXknKSgnSUVfUFJPVE8nKVxuICAsIEVtcHR5ICAgICAgID0gZnVuY3Rpb24oKXsgLyogZW1wdHkgKi8gfVxuICAsIFBST1RPVFlQRSAgID0gJ3Byb3RvdHlwZSc7XG5cbi8vIENyZWF0ZSBvYmplY3Qgd2l0aCBmYWtlIGBudWxsYCBwcm90b3R5cGU6IHVzZSBpZnJhbWUgT2JqZWN0IHdpdGggY2xlYXJlZCBwcm90b3R5cGVcbnZhciBjcmVhdGVEaWN0ID0gZnVuY3Rpb24oKXtcbiAgLy8gVGhyYXNoLCB3YXN0ZSBhbmQgc29kb215OiBJRSBHQyBidWdcbiAgdmFyIGlmcmFtZSA9IHJlcXVpcmUoJy4vX2RvbS1jcmVhdGUnKSgnaWZyYW1lJylcbiAgICAsIGkgICAgICA9IGVudW1CdWdLZXlzLmxlbmd0aFxuICAgICwgbHQgICAgID0gJzwnXG4gICAgLCBndCAgICAgPSAnPidcbiAgICAsIGlmcmFtZURvY3VtZW50O1xuICBpZnJhbWUuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgcmVxdWlyZSgnLi9faHRtbCcpLmFwcGVuZENoaWxkKGlmcmFtZSk7XG4gIGlmcmFtZS5zcmMgPSAnamF2YXNjcmlwdDonOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXNjcmlwdC11cmxcbiAgLy8gY3JlYXRlRGljdCA9IGlmcmFtZS5jb250ZW50V2luZG93Lk9iamVjdDtcbiAgLy8gaHRtbC5yZW1vdmVDaGlsZChpZnJhbWUpO1xuICBpZnJhbWVEb2N1bWVudCA9IGlmcmFtZS5jb250ZW50V2luZG93LmRvY3VtZW50O1xuICBpZnJhbWVEb2N1bWVudC5vcGVuKCk7XG4gIGlmcmFtZURvY3VtZW50LndyaXRlKGx0ICsgJ3NjcmlwdCcgKyBndCArICdkb2N1bWVudC5GPU9iamVjdCcgKyBsdCArICcvc2NyaXB0JyArIGd0KTtcbiAgaWZyYW1lRG9jdW1lbnQuY2xvc2UoKTtcbiAgY3JlYXRlRGljdCA9IGlmcmFtZURvY3VtZW50LkY7XG4gIHdoaWxlKGktLSlkZWxldGUgY3JlYXRlRGljdFtQUk9UT1RZUEVdW2VudW1CdWdLZXlzW2ldXTtcbiAgcmV0dXJuIGNyZWF0ZURpY3QoKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gT2JqZWN0LmNyZWF0ZSB8fCBmdW5jdGlvbiBjcmVhdGUoTywgUHJvcGVydGllcyl7XG4gIHZhciByZXN1bHQ7XG4gIGlmKE8gIT09IG51bGwpe1xuICAgIEVtcHR5W1BST1RPVFlQRV0gPSBhbk9iamVjdChPKTtcbiAgICByZXN1bHQgPSBuZXcgRW1wdHk7XG4gICAgRW1wdHlbUFJPVE9UWVBFXSA9IG51bGw7XG4gICAgLy8gYWRkIFwiX19wcm90b19fXCIgZm9yIE9iamVjdC5nZXRQcm90b3R5cGVPZiBwb2x5ZmlsbFxuICAgIHJlc3VsdFtJRV9QUk9UT10gPSBPO1xuICB9IGVsc2UgcmVzdWx0ID0gY3JlYXRlRGljdCgpO1xuICByZXR1cm4gUHJvcGVydGllcyA9PT0gdW5kZWZpbmVkID8gcmVzdWx0IDogZFBzKHJlc3VsdCwgUHJvcGVydGllcyk7XG59O1xuIiwidmFyIGFuT2JqZWN0ICAgICAgID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0JylcbiAgLCBJRThfRE9NX0RFRklORSA9IHJlcXVpcmUoJy4vX2llOC1kb20tZGVmaW5lJylcbiAgLCB0b1ByaW1pdGl2ZSAgICA9IHJlcXVpcmUoJy4vX3RvLXByaW1pdGl2ZScpXG4gICwgZFAgICAgICAgICAgICAgPSBPYmplY3QuZGVmaW5lUHJvcGVydHk7XG5cbmV4cG9ydHMuZiA9IHJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJykgPyBPYmplY3QuZGVmaW5lUHJvcGVydHkgOiBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0eShPLCBQLCBBdHRyaWJ1dGVzKXtcbiAgYW5PYmplY3QoTyk7XG4gIFAgPSB0b1ByaW1pdGl2ZShQLCB0cnVlKTtcbiAgYW5PYmplY3QoQXR0cmlidXRlcyk7XG4gIGlmKElFOF9ET01fREVGSU5FKXRyeSB7XG4gICAgcmV0dXJuIGRQKE8sIFAsIEF0dHJpYnV0ZXMpO1xuICB9IGNhdGNoKGUpeyAvKiBlbXB0eSAqLyB9XG4gIGlmKCdnZXQnIGluIEF0dHJpYnV0ZXMgfHwgJ3NldCcgaW4gQXR0cmlidXRlcyl0aHJvdyBUeXBlRXJyb3IoJ0FjY2Vzc29ycyBub3Qgc3VwcG9ydGVkIScpO1xuICBpZigndmFsdWUnIGluIEF0dHJpYnV0ZXMpT1tQXSA9IEF0dHJpYnV0ZXMudmFsdWU7XG4gIHJldHVybiBPO1xufTsiLCJ2YXIgZFAgICAgICAgPSByZXF1aXJlKCcuL19vYmplY3QtZHAnKVxuICAsIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0JylcbiAgLCBnZXRLZXlzICA9IHJlcXVpcmUoJy4vX29iamVjdC1rZXlzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKSA/IE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzIDogZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyhPLCBQcm9wZXJ0aWVzKXtcbiAgYW5PYmplY3QoTyk7XG4gIHZhciBrZXlzICAgPSBnZXRLZXlzKFByb3BlcnRpZXMpXG4gICAgLCBsZW5ndGggPSBrZXlzLmxlbmd0aFxuICAgICwgaSA9IDBcbiAgICAsIFA7XG4gIHdoaWxlKGxlbmd0aCA+IGkpZFAuZihPLCBQID0ga2V5c1tpKytdLCBQcm9wZXJ0aWVzW1BdKTtcbiAgcmV0dXJuIE87XG59OyIsInZhciBoYXMgICAgICAgICAgPSByZXF1aXJlKCcuL19oYXMnKVxuICAsIHRvSU9iamVjdCAgICA9IHJlcXVpcmUoJy4vX3RvLWlvYmplY3QnKVxuICAsIGFycmF5SW5kZXhPZiA9IHJlcXVpcmUoJy4vX2FycmF5LWluY2x1ZGVzJykoZmFsc2UpXG4gICwgSUVfUFJPVE8gICAgID0gcmVxdWlyZSgnLi9fc2hhcmVkLWtleScpKCdJRV9QUk9UTycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG9iamVjdCwgbmFtZXMpe1xuICB2YXIgTyAgICAgID0gdG9JT2JqZWN0KG9iamVjdClcbiAgICAsIGkgICAgICA9IDBcbiAgICAsIHJlc3VsdCA9IFtdXG4gICAgLCBrZXk7XG4gIGZvcihrZXkgaW4gTylpZihrZXkgIT0gSUVfUFJPVE8paGFzKE8sIGtleSkgJiYgcmVzdWx0LnB1c2goa2V5KTtcbiAgLy8gRG9uJ3QgZW51bSBidWcgJiBoaWRkZW4ga2V5c1xuICB3aGlsZShuYW1lcy5sZW5ndGggPiBpKWlmKGhhcyhPLCBrZXkgPSBuYW1lc1tpKytdKSl7XG4gICAgfmFycmF5SW5kZXhPZihyZXN1bHQsIGtleSkgfHwgcmVzdWx0LnB1c2goa2V5KTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufTsiLCIvLyAxOS4xLjIuMTQgLyAxNS4yLjMuMTQgT2JqZWN0LmtleXMoTylcbnZhciAka2V5cyAgICAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1rZXlzLWludGVybmFsJylcbiAgLCBlbnVtQnVnS2V5cyA9IHJlcXVpcmUoJy4vX2VudW0tYnVnLWtleXMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBPYmplY3Qua2V5cyB8fCBmdW5jdGlvbiBrZXlzKE8pe1xuICByZXR1cm4gJGtleXMoTywgZW51bUJ1Z0tleXMpO1xufTsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGJpdG1hcCwgdmFsdWUpe1xuICByZXR1cm4ge1xuICAgIGVudW1lcmFibGUgIDogIShiaXRtYXAgJiAxKSxcbiAgICBjb25maWd1cmFibGU6ICEoYml0bWFwICYgMiksXG4gICAgd3JpdGFibGUgICAgOiAhKGJpdG1hcCAmIDQpLFxuICAgIHZhbHVlICAgICAgIDogdmFsdWVcbiAgfTtcbn07IiwidmFyIHNoYXJlZCA9IHJlcXVpcmUoJy4vX3NoYXJlZCcpKCdrZXlzJylcbiAgLCB1aWQgICAgPSByZXF1aXJlKCcuL191aWQnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oa2V5KXtcbiAgcmV0dXJuIHNoYXJlZFtrZXldIHx8IChzaGFyZWRba2V5XSA9IHVpZChrZXkpKTtcbn07IiwidmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpXG4gICwgU0hBUkVEID0gJ19fY29yZS1qc19zaGFyZWRfXydcbiAgLCBzdG9yZSAgPSBnbG9iYWxbU0hBUkVEXSB8fCAoZ2xvYmFsW1NIQVJFRF0gPSB7fSk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGtleSl7XG4gIHJldHVybiBzdG9yZVtrZXldIHx8IChzdG9yZVtrZXldID0ge30pO1xufTsiLCJ2YXIgdG9JbnRlZ2VyID0gcmVxdWlyZSgnLi9fdG8taW50ZWdlcicpXG4gICwgbWF4ICAgICAgID0gTWF0aC5tYXhcbiAgLCBtaW4gICAgICAgPSBNYXRoLm1pbjtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaW5kZXgsIGxlbmd0aCl7XG4gIGluZGV4ID0gdG9JbnRlZ2VyKGluZGV4KTtcbiAgcmV0dXJuIGluZGV4IDwgMCA/IG1heChpbmRleCArIGxlbmd0aCwgMCkgOiBtaW4oaW5kZXgsIGxlbmd0aCk7XG59OyIsIi8vIDcuMS40IFRvSW50ZWdlclxudmFyIGNlaWwgID0gTWF0aC5jZWlsXG4gICwgZmxvb3IgPSBNYXRoLmZsb29yO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIHJldHVybiBpc05hTihpdCA9ICtpdCkgPyAwIDogKGl0ID4gMCA/IGZsb29yIDogY2VpbCkoaXQpO1xufTsiLCIvLyB0byBpbmRleGVkIG9iamVjdCwgdG9PYmplY3Qgd2l0aCBmYWxsYmFjayBmb3Igbm9uLWFycmF5LWxpa2UgRVMzIHN0cmluZ3NcbnZhciBJT2JqZWN0ID0gcmVxdWlyZSgnLi9faW9iamVjdCcpXG4gICwgZGVmaW5lZCA9IHJlcXVpcmUoJy4vX2RlZmluZWQnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gSU9iamVjdChkZWZpbmVkKGl0KSk7XG59OyIsIi8vIDcuMS4xNSBUb0xlbmd0aFxudmFyIHRvSW50ZWdlciA9IHJlcXVpcmUoJy4vX3RvLWludGVnZXInKVxuICAsIG1pbiAgICAgICA9IE1hdGgubWluO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIHJldHVybiBpdCA+IDAgPyBtaW4odG9JbnRlZ2VyKGl0KSwgMHgxZmZmZmZmZmZmZmZmZikgOiAwOyAvLyBwb3coMiwgNTMpIC0gMSA9PSA5MDA3MTk5MjU0NzQwOTkxXG59OyIsIi8vIDcuMS4xIFRvUHJpbWl0aXZlKGlucHV0IFssIFByZWZlcnJlZFR5cGVdKVxudmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0Jyk7XG4vLyBpbnN0ZWFkIG9mIHRoZSBFUzYgc3BlYyB2ZXJzaW9uLCB3ZSBkaWRuJ3QgaW1wbGVtZW50IEBAdG9QcmltaXRpdmUgY2FzZVxuLy8gYW5kIHRoZSBzZWNvbmQgYXJndW1lbnQgLSBmbGFnIC0gcHJlZmVycmVkIHR5cGUgaXMgYSBzdHJpbmdcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQsIFMpe1xuICBpZighaXNPYmplY3QoaXQpKXJldHVybiBpdDtcbiAgdmFyIGZuLCB2YWw7XG4gIGlmKFMgJiYgdHlwZW9mIChmbiA9IGl0LnRvU3RyaW5nKSA9PSAnZnVuY3Rpb24nICYmICFpc09iamVjdCh2YWwgPSBmbi5jYWxsKGl0KSkpcmV0dXJuIHZhbDtcbiAgaWYodHlwZW9mIChmbiA9IGl0LnZhbHVlT2YpID09ICdmdW5jdGlvbicgJiYgIWlzT2JqZWN0KHZhbCA9IGZuLmNhbGwoaXQpKSlyZXR1cm4gdmFsO1xuICBpZighUyAmJiB0eXBlb2YgKGZuID0gaXQudG9TdHJpbmcpID09ICdmdW5jdGlvbicgJiYgIWlzT2JqZWN0KHZhbCA9IGZuLmNhbGwoaXQpKSlyZXR1cm4gdmFsO1xuICB0aHJvdyBUeXBlRXJyb3IoXCJDYW4ndCBjb252ZXJ0IG9iamVjdCB0byBwcmltaXRpdmUgdmFsdWVcIik7XG59OyIsInZhciBpZCA9IDBcbiAgLCBweCA9IE1hdGgucmFuZG9tKCk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGtleSl7XG4gIHJldHVybiAnU3ltYm9sKCcuY29uY2F0KGtleSA9PT0gdW5kZWZpbmVkID8gJycgOiBrZXksICcpXycsICgrK2lkICsgcHgpLnRvU3RyaW5nKDM2KSk7XG59OyIsInZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jylcbi8vIDE5LjEuMi4yIC8gMTUuMi4zLjUgT2JqZWN0LmNyZWF0ZShPIFssIFByb3BlcnRpZXNdKVxuJGV4cG9ydCgkZXhwb3J0LlMsICdPYmplY3QnLCB7Y3JlYXRlOiByZXF1aXJlKCcuL19vYmplY3QtY3JlYXRlJyl9KTsiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBDaGVja291dFZpZXdNb2RlbF8xID0gcmVxdWlyZShcIi4vbW9kZWxzL0NoZWNrb3V0Vmlld01vZGVsXCIpO1xuLyoqXG4gKiBJbml0aWFsIGFwcGxpY2F0aW9uIHNldHVwLiBSdW5zIG9uY2UgdXBvbiBldmVyeSBwYWdlIGxvYWQuXG4gKlxuICogQGNsYXNzIEFwcFxuICogQGNvbnN0cnVjdG9yXG4gKi9cbnZhciBBcHAgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIEFwcCgpIHtcbiAgICB9XG4gICAgLyoqXG4gICAgICogSW5pdGlhbGl6ZXMgdGhlIGFwcGxpY2F0aW9uIGFuZCBraWNrcyBvZmYgbG9hZGluZyBvZiBwcmVyZXF1aXNpdGVzLlxuICAgICAqXG4gICAgICogQG1ldGhvZCBpbml0XG4gICAgICogQHB1YmxpY1xuICAgICAqL1xuICAgIEFwcC5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgLy8gQ3JlYXRlIHlvdXIgdmlld3MgaGVyZVxuICAgICAgICAvLyBjb25zb2xlLmxvZyhgQ2hlY2tvdXRWaWV3TW9kZWxgLCBuZXcgQ2hlY2tvdXRWaWV3TW9kZWwoKS5waWNrSG93T3B0aW9ucyk7XG4gICAgICAgIG5ldyBDaGVja291dFZpZXdNb2RlbF8xW1wiZGVmYXVsdFwiXSgpLnBpY2tIb3dPcHRpb25zO1xuICAgIH07XG4gICAgcmV0dXJuIEFwcDtcbn0oKSk7XG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBBcHA7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1BcHAuanMubWFwIiwiaW1wb3J0IEFwcCBmcm9tICcuL0FwcCc7XG5cbmNvbnN0IGFwcCA9IG5ldyBBcHAoKTtcbmFwcC5pbml0KCk7XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgZnVuY3Rpb24gKGQsIGIpIHtcbiAgICBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTtcbiAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG59O1xudmFyIEJhc2VNb2RlbF8xID0gcmVxdWlyZShcIi4uLy4uLy4uLy4uLy4uLy4uL3RzL21vZGVsL0Jhc2VNb2RlbFwiKTtcbnZhciBJbnB1dE1vZGVsXzEgPSByZXF1aXJlKFwiLi9mb3JtL0lucHV0TW9kZWxcIik7XG4vKipcbiAqIEBjbGFzcyBDaGVja291dFZpZXdNb2RlbFxuICogQGV4dGVuZHMgQXBpQmFzZU1vZGVsXG4gKiBAY29uc3RydWN0b3JcbiAqKi9cbnZhciBDaGVja291dFZpZXdNb2RlbCA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKENoZWNrb3V0Vmlld01vZGVsLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIENoZWNrb3V0Vmlld01vZGVsKGRhdGEsIG9wdHMpIHtcbiAgICAgICAgaWYgKGRhdGEgPT09IHZvaWQgMCkgeyBkYXRhID0ge307IH1cbiAgICAgICAgaWYgKG9wdHMgPT09IHZvaWQgMCkgeyBvcHRzID0ge307IH1cbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcywgb3B0cykgfHwgdGhpcztcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBwcm9wZXJ0eSBwaWNrSG93T3B0aW9uc1xuICAgICAgICAgKiBAdHlwZSB7QXJyYXk8e30+fVxuICAgICAgICAgKiBAcHVibGljXG4gICAgICAgICAqL1xuICAgICAgICBfdGhpcy5waWNrSG93T3B0aW9ucyA9IFtcbiAgICAgICAgICAgIG5ldyBJbnB1dE1vZGVsXzFbXCJkZWZhdWx0XCJdKHtcbiAgICAgICAgICAgICAgICBpZDogJ29uZSdcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgbmV3IElucHV0TW9kZWxfMVtcImRlZmF1bHRcIl0oe1xuICAgICAgICAgICAgICAgIGlkOiAndHdvJ1xuICAgICAgICAgICAgfSksXG4gICAgICAgIF07XG4gICAgICAgIGlmIChkYXRhKSB7XG4gICAgICAgICAgICBfdGhpcy51cGRhdGUoZGF0YSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBAb3ZlcnJpZGRlbiBBcGlCYXNlTW9kZWwudXBkYXRlXG4gICAgICovXG4gICAgQ2hlY2tvdXRWaWV3TW9kZWwucHJvdG90eXBlLnVwZGF0ZSA9IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgIF9zdXBlci5wcm90b3R5cGUudXBkYXRlLmNhbGwodGhpcywgZGF0YSk7XG4gICAgICAgIC8vIE92ZXJyaWRlIGFueSB2YWx1ZXMgYWZ0ZXIgdGhlIGRlZmF1bHQgc3VwZXIgdXBkYXRlIG1ldGhvZCBoYXMgc2V0IHRoZSB2YWx1ZXMuXG4gICAgfTtcbiAgICByZXR1cm4gQ2hlY2tvdXRWaWV3TW9kZWw7XG59KEJhc2VNb2RlbF8xW1wiZGVmYXVsdFwiXSkpO1xuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gQ2hlY2tvdXRWaWV3TW9kZWw7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1DaGVja291dFZpZXdNb2RlbC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgZnVuY3Rpb24gKGQsIGIpIHtcbiAgICBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTtcbiAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG59O1xudmFyIEJhc2VNb2RlbF8xID0gcmVxdWlyZShcIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3RzL21vZGVsL0Jhc2VNb2RlbFwiKTtcbi8qKlxuICogQGNsYXNzIElucHV0TW9kZWxcbiAqIEBleHRlbmRzIEJhc2VNb2RlbFxuICogQGNvbnN0cnVjdG9yXG4gKiovXG52YXIgSW5wdXRNb2RlbCA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKElucHV0TW9kZWwsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gSW5wdXRNb2RlbChkYXRhLCBvcHRzKSB7XG4gICAgICAgIGlmIChkYXRhID09PSB2b2lkIDApIHsgZGF0YSA9IHt9OyB9XG4gICAgICAgIGlmIChvcHRzID09PSB2b2lkIDApIHsgb3B0cyA9IHt9OyB9XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMsIG9wdHMpIHx8IHRoaXM7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAcHJvcGVydHkgaWRcbiAgICAgICAgICogQHR5cGUge3N0cmluZ31cbiAgICAgICAgICogQHB1YmxpY1xuICAgICAgICAgKi9cbiAgICAgICAgX3RoaXMuaWQgPSBudWxsO1xuICAgICAgICBpZiAoZGF0YSkge1xuICAgICAgICAgICAgX3RoaXMudXBkYXRlKGRhdGEpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogQG92ZXJyaWRkZW4gQmFzZU1vZGVsLnVwZGF0ZVxuICAgICAqL1xuICAgIElucHV0TW9kZWwucHJvdG90eXBlLnVwZGF0ZSA9IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgIF9zdXBlci5wcm90b3R5cGUudXBkYXRlLmNhbGwodGhpcywgZGF0YSk7XG4gICAgICAgIC8vIE92ZXJyaWRlIGFueSB2YWx1ZXMgYWZ0ZXIgdGhlIGRlZmF1bHQgc3VwZXIgdXBkYXRlIG1ldGhvZCBoYXMgc2V0IHRoZSB2YWx1ZXMuXG4gICAgfTtcbiAgICByZXR1cm4gSW5wdXRNb2RlbDtcbn0oQmFzZU1vZGVsXzFbXCJkZWZhdWx0XCJdKSk7XG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBJbnB1dE1vZGVsO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9SW5wdXRNb2RlbC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBVdGlsXzEgPSByZXF1aXJlKFwiLi91dGlsL1V0aWxcIik7XG4vKipcbiAqIFRoZSB7eyNjcm9zc0xpbmsgXCJCYXNlT2JqZWN0XCJ9fXt7L2Nyb3NzTGlua319IGNsYXNzIGlzIGFuIGFic3RyYWN0IGNsYXNzIHRoYXQgcHJvdmlkZXMgY29tbW9uIHByb3BlcnRpZXMgYW5kIGZ1bmN0aW9uYWxpdHkgZm9yIGFsbCBTdHJ1Y3R1cmVKUyBjbGFzc2VzLlxuICpcbiAqIEBjbGFzcyBCYXNlT2JqZWN0XG4gKiBAbW9kdWxlIFN0cnVjdHVyZUpTXG4gKiBAc3VibW9kdWxlIGNvcmVcbiAqIEByZXF1aXJlcyBVdGlsXG4gKiBAY29uc3RydWN0b3JcbiAqIEBhdXRob3IgUm9iZXJ0IFMuICh3d3cuY29kZUJlbHQuY29tKVxuICovXG52YXIgQmFzZU9iamVjdCA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gQmFzZU9iamVjdCgpIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSBzanNJZCAoU3RydWN0dXJlSlMgSUQpIGlzIGEgdW5pcXVlIGlkZW50aWZpZXIgYXV0b21hdGljYWxseSBhc3NpZ25lZCB0byBtb3N0IFN0cnVjdHVyZUpTIG9iamVjdHMgdXBvbiBpbnN0YW50aWF0aW9uLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcHJvcGVydHkgc2pzSWRcbiAgICAgICAgICogQHR5cGUge2ludH1cbiAgICAgICAgICogQGRlZmF1bHQgbnVsbFxuICAgICAgICAgKiBAd3JpdGVPbmNlXG4gICAgICAgICAqIEByZWFkT25seVxuICAgICAgICAgKiBAcHVibGljXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLnNqc0lkID0gbnVsbDtcbiAgICAgICAgdGhpcy5zanNJZCA9IFV0aWxfMVtcImRlZmF1bHRcIl0udW5pcXVlSWQoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgZnVsbHkgcXVhbGlmaWVkIGNsYXNzIG5hbWUgb2YgYW4gb2JqZWN0LlxuICAgICAqXG4gICAgICogQG1ldGhvZCBnZXRRdWFsaWZpZWRDbGFzc05hbWVcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSBjbGFzcyBuYW1lLlxuICAgICAqIEBwdWJsaWNcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqICAgICBsZXQgc29tZUNsYXNzID0gbmV3IFNvbWVDbGFzcygpO1xuICAgICAqICAgICBzb21lQ2xhc3MuZ2V0UXVhbGlmaWVkQ2xhc3NOYW1lKCk7XG4gICAgICpcbiAgICAgKiAgICAgLy8gU29tZUNsYXNzXG4gICAgICovXG4gICAgQmFzZU9iamVjdC5wcm90b3R5cGUuZ2V0UXVhbGlmaWVkQ2xhc3NOYW1lID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gVXRpbF8xW1wiZGVmYXVsdFwiXS5nZXROYW1lKHRoaXMpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogVGhlIHB1cnBvc2Ugb2YgdGhlIGRlc3Ryb3kgbWV0aG9kIGlzIHRvIG1ha2UgYW4gb2JqZWN0IHJlYWR5IGZvciBnYXJiYWdlIGNvbGxlY3Rpb24uIFRoaXNcbiAgICAgKiBzaG91bGQgYmUgdGhvdWdodCBvZiBhcyBhIG9uZSB3YXkgZnVuY3Rpb24uIE9uY2UgZGVzdHJveSBpcyBjYWxsZWQgbm8gZnVydGhlciBtZXRob2RzIHNob3VsZCBiZVxuICAgICAqIGNhbGxlZCBvbiB0aGUgb2JqZWN0IG9yIHByb3BlcnRpZXMgYWNjZXNzZWQuIEl0IGlzIHRoZSByZXNwb25zaWJpbGl0eSBvZiB0aG9zZSB3aG8gaW1wbGVtZW50IHRoaXNcbiAgICAgKiBmdW5jdGlvbiB0byBzdG9wIGFsbCBydW5uaW5nIFRpbWVycywgYWxsIHJ1bm5pbmcgU291bmRzLCBhbmQgdGFrZSBhbnkgb3RoZXIgc3RlcHMgbmVjZXNzYXJ5IHRvIG1ha2UgYW5cbiAgICAgKiBvYmplY3QgZWxpZ2libGUgZm9yIGdhcmJhZ2UgY29sbGVjdGlvbi5cbiAgICAgKlxuICAgICAqIEJ5IGRlZmF1bHQgdGhlIGRlc3Ryb3kgbWV0aG9kIHdpbGwgbnVsbCBvdXQgYWxsIHByb3BlcnRpZXMgb2YgdGhlIGNsYXNzIGF1dG9tYXRpY2FsbHkuIFlvdSBzaG91bGQgY2FsbCBkZXN0cm95XG4gICAgICogb24gb3RoZXIgb2JqZWN0cyBiZWZvcmUgY2FsbGluZyB0aGUgc3VwZXIuXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIGRlc3Ryb3lcbiAgICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgICAqIEBwdWJsaWNcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqICAgICBkZXN0cm95KCkge1xuICAgICAqICAgICAgICAgIHRoaXMuZGlzYWJsZSgpO1xuICAgICAqXG4gICAgICogICAgICAgICAgdGhpcy5fY2hpbGRJbnN0YW5jZS5kZXN0cm95KCk7XG4gICAgICpcbiAgICAgKiAgICAgICAgICBzdXBlci5kZXN0cm95KCk7XG4gICAgICogICAgIH1cbiAgICAgKi9cbiAgICBCYXNlT2JqZWN0LnByb3RvdHlwZS5kZXN0cm95ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBmb3IgKHZhciBrZXkgaW4gdGhpcykge1xuICAgICAgICAgICAgaWYgKHRoaXMuaGFzT3duUHJvcGVydHkoa2V5KSAmJiBrZXkgIT09ICdzanNJZCcpIHtcbiAgICAgICAgICAgICAgICB0aGlzW2tleV0gPSBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbiAgICByZXR1cm4gQmFzZU9iamVjdDtcbn0oKSk7XG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBCYXNlT2JqZWN0O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9QmFzZU9iamVjdC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgZnVuY3Rpb24gKGQsIGIpIHtcbiAgICBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTtcbiAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG59O1xudmFyIEJhc2VPYmplY3RfMSA9IHJlcXVpcmUoXCIuLi9CYXNlT2JqZWN0XCIpO1xudmFyIFV0aWxfMSA9IHJlcXVpcmUoXCIuLi91dGlsL1V0aWxcIik7XG4vKipcbiAqICBCYXNlIE1vZGVsIGlzIGEgZGVzaWduIHBhdHRlcm4gdXNlZCB0byB0cmFuc2ZlciBkYXRhIGJldHdlZW4gc29mdHdhcmUgYXBwbGljYXRpb24gc3Vic3lzdGVtcy5cbiAqXG4gKiBOb3RlOiBJZiB0aGUgZGF0YSBkb2Vzbid0IG1hdGNoIHRoZSBwcm9wZXJ0eSBuYW1lcyB5b3UgY2FuIHNldCB0aGUgdmFsdWUgbWFudWFsbHkgYWZ0ZXIgdXBkYXRlIHN1cGVyIG1ldGhvZCBoYXMgYmVlbiBjYWxsZWQuXG4gKiAgQWxzbyBpbiB0aGUgY2xhc3MgeW91IGluaGVyaXQgQmFzZU1vZGVsIGZyb20geW91IGNhbiBvdmVycmlkZSB0aGUgdXBkYXRlIG1ldGhvZCB0byBoYW5kbGUgdGhlIGRhdGEgaG93IHlvdSB3YW50LlxuICpcbiAqIEBjbGFzcyBCYXNlTW9kZWxcbiAqIEBleHRlbmRzIEJhc2VPYmplY3RcbiAqIEBwYXJhbSBbZGF0YV0ge2FueX0gUHJvdmlkZSBhIHdheSB0byB1cGRhdGUgdGhlIGJhc2UgbW9kZWwgdXBvbiBpbml0aWFsaXphdGlvbi5cbiAqIEBwYXJhbSBbb3B0c10ge3sgZXhwYW5kOmJvb2xlYW4gfX0gT3B0aW9ucyBmb3IgdGhlIGJhc2UgbW9kZWwuXG4gKiBAbW9kdWxlIFN0cnVjdHVyZUpTXG4gKiBAc3VibW9kdWxlIG1vZGVsXG4gKiBAcmVxdWlyZXMgRXh0ZW5kXG4gKiBAcmVxdWlyZXMgQmFzZU9iamVjdFxuICogQHJlcXVpcmVzIFV0aWxcbiAqIEBjb25zdHJ1Y3RvclxuICogQGF1dGhvciBSb2JlcnQgUy4gKHd3dy5jb2RlQmVsdC5jb20pXG4gKiBAZXhhbXBsZVxuICogICAgICAvLyBFeGFtcGxlIGhvdyB0byBleHRlbmQgdGhlIEJhc2VNb2RlbCBjbGFzcy5cbiAqICAgICAgbGV0IGRhdGEgPSB7XG4gKiAgICAgICAgICAgICAgbWFrZTogJ1Rlc2xhJyxcbiAqICAgICAgICAgICAgICBtb2RlbDogJ01vZGVsIFMnLFxuICogICAgICAgICAgICAgIFllQXI6IDIwMTQsXG4gKiAgICAgICAgICAgICAgZmVhdHVyZToge1xuICogICAgICAgICAgICAgICAgICBhYnM6IHRydWUsXG4gKiAgICAgICAgICAgICAgICAgIGFpcmJhZ3M6IHRydWVcbiAqICAgICAgICAgICAgICB9XG4gKiAgICAgIH1cbiAqICAgICAgbGV0IGNhck1vZGVsID0gbmV3IENhck1vZGVsKGRhdGEpO1xuICpcbiAqXG4gKiAgICAgIC8vIEV4YW1wbGUgaG93IHRvIGV4dGVuZCB0aGUgQmFzZU1vZGVsIGNsYXNzLlxuICogICAgICBjbGFzcyBDYXJNb2RlbCBleHRlbmRzIEJhc2VNb2RlbCB7XG4gKlxuICogICAgICAgICAgLy8gWW91IG5lZWQgdG8gaGF2ZSBwcm9wZXJ0aWVzIHNvIHRoZSBkYXRhIHdpbGwgZ2V0IGFzc2lnbmVkLlxuICogICAgICAgICAgLy8gSWYgbm90IHRoZSBkYXRhIHdpbGwgbm90IGdldCBhc3NpZ25lZCB0byB0aGUgbW9kZWwuXG4gKiAgICAgICAgICBtYWtlID0gbnVsbDtcbiAqICAgICAgICAgIG1vZGVsID0gbnVsbDtcbiAqICAgICAgICAgIHllYXIgPSBudWxsO1xuICogICAgICAgICAgYWxsV2hlZWwgPSBmYWxzZTsgLy8gU2V0IGEgZGVmYXVsdCB2YWx1ZVxuICpcbiAqICAgICAgICAgIC8vIFlvdSBjYW4gYXNzaWduIEJhc2VNb2RlbCB0byBhIHByb3BlcnR5IHdoaWNoIHdpbGxcbiAqICAgICAgICAgIC8vIGF1dG9tYXRpY2FsbHkgY3JlYXRlZCBpdCBhbmQgcGFzcyB0aGUgZGF0YSB0byBpdC5cbiAqICAgICAgICAgIGZlYXR1cmUgPSBGZWF0dXJlTW9kZWxcbiAqXG4gKiAgICAgICAgICAvLyBJZiB5b3UgaGF2ZSBhbiBhcnJheSBvZiBkYXRhIGFuZCB3YW50IHRoZW0gYXNzaWduIHRvIGEgQmFzZU1vZGVsLlxuICogICAgICAgICAgZmVhdHVyZSA9IFtGZWF0dXJlTW9kZWxdO1xuICpcbiAqICAgICAgICAgIGNvbnN0cnVjdG9yKGRhdGEgPSB7fSwgb3B0cyA9IHt9KSB7XG4gKiAgICAgICAgICAgICAgc3VwZXIob3B0cyk7XG4gKlxuICogICAgICAgICAgICAgIGlmIChkYXRhKSB7XG4gKiAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlKGRhdGEpO1xuICogICAgICAgICAgICAgIH1cbiAqICAgICAgICAgIH1cbiAqXG4gKiAgICAgICAgICAvLyBAb3ZlcnJpZGRlbiBCYXNlTW9kZWwudXBkYXRlXG4gKiAgICAgICAgICB1cGRhdGUoZGF0YSkge1xuICogICAgICAgICAgICAgIHN1cGVyLnVwZGF0ZShkYXRhKTtcbiAqXG4gKiAgICAgICAgICAgICAgLy8gSWYgdGhlIGRhdGEgZG9lc24ndCBtYXRjaCB0aGUgcHJvcGVydHkgbmFtZS5cbiAqICAgICAgICAgICAgICAvLyBZb3UgY2FuIHNldCB0aGUgdmFsdWUocykgbWFudWFsbHkgYWZ0ZXIgdGhlIHVwZGF0ZSBzdXBlciBtZXRob2QgaGFzIGJlZW4gY2FsbGVkLlxuICogICAgICAgICAgICAgIHRoaXMueWVhciA9IGRhdGEuWWVBcjtcbiAqICAgICAgICAgIH1cbiAqICAgICAgfVxuICovXG52YXIgQmFzZU1vZGVsID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoQmFzZU1vZGVsLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIEJhc2VNb2RlbChvcHRzKSB7XG4gICAgICAgIGlmIChvcHRzID09PSB2b2lkIDApIHsgb3B0cyA9IHt9OyB9XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMpIHx8IHRoaXM7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAcHJvcGVydHkgc2pzT3B0aW9uc1xuICAgICAgICAgKiBAdHlwZSB7SUJhc2VNb2RlbE9wdGlvbnN9fVxuICAgICAgICAgKiBAcmVhZG9ubHlcbiAgICAgICAgICogQHB1YmxpY1xuICAgICAgICAgKi9cbiAgICAgICAgX3RoaXMuc2pzT3B0aW9ucyA9IHtcbiAgICAgICAgICAgIGV4cGFuZDogZmFsc2VcbiAgICAgICAgfTtcbiAgICAgICAgX3RoaXMuc2pzT3B0aW9ucy5leHBhbmQgPSBvcHRzLmV4cGFuZCA9PT0gdHJ1ZTtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBQcm92aWRlIGEgd2F5IHRvIHVwZGF0ZSB0aGUgIEJhc2UgTW9kZWwuXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIHVwZGF0ZVxuICAgICAqIEBwYXJhbSBbZGF0YT17fV0ge2FueX1cbiAgICAgKiBAcHVibGljXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiAgICAgLy8gRXhhbXBsZSBvZiB1cGRhdGluZyBzb21lIG9mIHRoZSBkYXRhOlxuICAgICAqICAgICBjYXJNb2RlbC51cGRhdGUoeyB5ZWFyOiAyMDE1LCBhbGxXaGVlbDogdHJ1ZX0pO1xuICAgICAqXG4gICAgICogICAgIC8vIE9mIGNvdXJzZSB5b3UgY2FuIGFsc28gZG8gaXQgdGhlIGZvbGxvd2luZyB3YXk6XG4gICAgICogICAgIGNhck1vZGVsLnllYXIgPSAyMDE1O1xuICAgICAqICAgICBjYXJNb2RlbC5hbGxXaGVlbCA9IGZhbHNlO1xuICAgICAqL1xuICAgIEJhc2VNb2RlbC5wcm90b3R5cGUudXBkYXRlID0gZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgaWYgKGRhdGEgPT09IHZvaWQgMCkgeyBkYXRhID0ge307IH1cbiAgICAgICAgT2JqZWN0XG4gICAgICAgICAgICAua2V5cyh0aGlzKVxuICAgICAgICAgICAgLmZvckVhY2goZnVuY3Rpb24gKHByb3BlcnR5TmFtZSkge1xuICAgICAgICAgICAgLy8gSWdub3JlIHRoZSBzanNJZCBwcm9wZXJ0eSBiZWNhdXNlIGl0IGlzIHNldCBpbiB0aGUgQmFzZU9iamVjdCBjb25zdHJ1Y3RvciBhbmQgd2UgZG9uJ3Qgd2FudCB0byB1cGRhdGUgaXQuXG4gICAgICAgICAgICBpZiAocHJvcGVydHlOYW1lICE9PSAnc2pzSWQnKSB7XG4gICAgICAgICAgICAgICAgdmFyIGN1cnJlbnREYXRhID0gX3RoaXNbcHJvcGVydHlOYW1lXTtcbiAgICAgICAgICAgICAgICB2YXIgbmV3RGF0YSA9IGRhdGFbcHJvcGVydHlOYW1lXTtcbiAgICAgICAgICAgICAgICB2YXIgcHJvcGVydHlEYXRhID0gKG5ld0RhdGEgIT09IHZvaWQgMCkgPyBuZXdEYXRhIDogY3VycmVudERhdGE7XG4gICAgICAgICAgICAgICAgX3RoaXMuX3VwZGF0ZVByb3BlcnR5V2l0aE5ld0RhdGEocHJvcGVydHlOYW1lLCBwcm9wZXJ0eURhdGEpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBBZGQgdGhlIG5ld0RhdGEgdG8gdGhlIHByb3BlcnR5XG4gICAgICpcbiAgICAgKiBAbWV0aG9kIF91cGRhdGVQcm9wZXJ0eVdpdGhOZXdEYXRhXG4gICAgICogQHBhcmFtIHByb3BlcnR5TmFtZVxuICAgICAqIEBwYXJhbSBuZXdEYXRhXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIEJhc2VNb2RlbC5wcm90b3R5cGUuX3VwZGF0ZVByb3BlcnR5V2l0aE5ld0RhdGEgPSBmdW5jdGlvbiAocHJvcGVydHlOYW1lLCBuZXdEYXRhKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIGNvbnNvbGUubG9nKFwicHJvcGVydHlOYW1lXCIsIHByb3BlcnR5TmFtZSk7XG4gICAgICAgIC8vIElmIHRoZSBjdXJyZW50IHByb3BlcnR5IG9uIHRoZSBtb2RlbCBpcyBhbiBhcnJheSBhbmQgdGhlIG5ld0RhdGEgaXMgYW4gYXJyYXkuXG4gICAgICAgIGlmICgodGhpc1twcm9wZXJ0eU5hbWVdIGluc3RhbmNlb2YgQXJyYXkgPT09IHRydWUpICYmIChuZXdEYXRhIGluc3RhbmNlb2YgQXJyYXkgPT09IHRydWUpKSB7XG4gICAgICAgICAgICB2YXIgaXNDdXJyZW50VmFsdWVBblVuaW5zdGFudGlhdGVkQmFzZU1vZGVsID0gKHR5cGVvZiB0aGlzW3Byb3BlcnR5TmFtZV1bMF0gPT09ICdmdW5jdGlvbicgJiYgdGhpc1twcm9wZXJ0eU5hbWVdWzBdLklTX0JBU0VfTU9ERUwgPT09IHRydWUpO1xuICAgICAgICAgICAgdmFyIGlzTmV3VmFsdWVBblVuaW5zdGFudGlhdGVkQmFzZU1vZGVsID0gKHR5cGVvZiBuZXdEYXRhWzBdID09PSAnZnVuY3Rpb24nICYmIG5ld0RhdGFbMF0uSVNfQkFTRV9NT0RFTCA9PT0gdHJ1ZSk7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhgaXNDdXJyZW50VmFsdWVBblVuaW5zdGFudGlhdGVkQmFzZU1vZGVsYCwgaXNDdXJyZW50VmFsdWVBblVuaW5zdGFudGlhdGVkQmFzZU1vZGVsKTtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGBpc05ld1ZhbHVlQW5Vbmluc3RhbnRpYXRlZEJhc2VNb2RlbGAsIGlzTmV3VmFsdWVBblVuaW5zdGFudGlhdGVkQmFzZU1vZGVsKTtcbiAgICAgICAgICAgIC8vIElmIHRoZSBjdXJyZW50IGRhdGEgYW5kIHRoZSBuZXcgZGF0YSBhcmUgYm90aCB1bmluc3RhbnRpYXRlZCBCYXNlTW9kZWwgd2UgZG9uJ3Qgd2FudCB0byBjb250aW51ZS5cbiAgICAgICAgICAgIGlmICgoaXNDdXJyZW50VmFsdWVBblVuaW5zdGFudGlhdGVkQmFzZU1vZGVsID09PSB0cnVlICYmIGlzTmV3VmFsdWVBblVuaW5zdGFudGlhdGVkQmFzZU1vZGVsID09PSB0cnVlKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhgcHJvcGVydHlOYW1lYCwgcHJvcGVydHlOYW1lKTtcbiAgICAgICAgICAgICAgICB2YXIgYmFzZU1vZGVsT3JVbmRlZmluZWRfMSA9IHRoaXNbcHJvcGVydHlOYW1lXVswXTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImJhc2VNb2RlbE9yVW5kZWZpbmVkXCIsIGJhc2VNb2RlbE9yVW5kZWZpbmVkXzEpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwibmV3RGF0YVwiLCBuZXdEYXRhKTtcbiAgICAgICAgICAgICAgICAvLyBkZWJ1Z2dlcjtcbiAgICAgICAgICAgICAgICB0aGlzW3Byb3BlcnR5TmFtZV0gPSBuZXdEYXRhLm1hcChmdW5jdGlvbiAoZGF0YSkgeyByZXR1cm4gX3RoaXMuX3VwZGF0ZURhdGEoYmFzZU1vZGVsT3JVbmRlZmluZWRfMSwgZGF0YSk7IH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpc1twcm9wZXJ0eU5hbWVdID0gW107XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzW3Byb3BlcnR5TmFtZV0gPSB0aGlzLl91cGRhdGVEYXRhKHRoaXNbcHJvcGVydHlOYW1lXSwgbmV3RGF0YSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFRPRE86IFlVSURvY19jb21tZW50XG4gICAgICpcbiAgICAgKiBAbWV0aG9kIF91cGRhdGVEYXRhXG4gICAgICogQHBhcmFtIGtleVZhbHVlXG4gICAgICogQHBhcmFtIG5ld0RhdGFcbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgQmFzZU1vZGVsLnByb3RvdHlwZS5fdXBkYXRlRGF0YSA9IGZ1bmN0aW9uIChrZXlWYWx1ZSwgbmV3RGF0YSkge1xuICAgICAgICBjb25zb2xlLmxvZyhcIl91cGRhdGVEYXRhXCIsIGtleVZhbHVlLCBuZXdEYXRhKTtcbiAgICAgICAgLy8gZGVidWdnZXI7XG4gICAgICAgIGlmICh0aGlzLnNqc09wdGlvbnMuZXhwYW5kID09PSBmYWxzZSAmJiB0eXBlb2YgbmV3RGF0YSA9PT0gJ2Z1bmN0aW9uJyAmJiBuZXdEYXRhLklTX0JBU0VfTU9ERUwgPT09IHRydWUpIHtcbiAgICAgICAgICAgIC8vIElmIG5ld0RhdGEgaXMgYSBmdW5jdGlvbiBhbmQgaGFzIGFuIElTX0JBU0VfTU9ERUwgc3RhdGljIHByb3BlcnR5IHRoZW4gaXQgbXVzdCBiZSBhIGNoaWxkIG1vZGVsIGFuZCB3ZSBuZWVkIHRvIHJldHVybiBudWxsXG4gICAgICAgICAgICAvLyBzbyBpdCBjbGVhbnMgdXAgdGhlIEJhc2VNb2RlbCBmdW5jdGlvbnMgb24gdGhlIHByb3BlcnR5LlxuICAgICAgICAgICAgLy8gVG8gY3JlYXRlIGVtcHR5IG1vZGVsKHMpIHBhc3MgeyBleHBhbmQ6IHRydWUgfSBmb3IgdGhlIG9wdGlvbnMuXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBpZiAodHlwZW9mIGtleVZhbHVlID09PSAnZnVuY3Rpb24nICYmIGtleVZhbHVlLklTX0JBU0VfTU9ERUwgPT09IHRydWUpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiMVwiKTtcbiAgICAgICAgICAgIC8vIElmIHRoZSBwcm9wZXJ0eSBpcyBhbiBpbnN0YW5jZSBvZiBhIEJhc2VNb2RlbCBjbGFzcyBhbmQgaGFzIG5vdCBiZWVuIGNyZWF0ZWQgeWV0LlxuICAgICAgICAgICAgLy8gSW5zdGFudGlhdGUgaXQgYW5kIHBhc3MgaW4gdGhlIG5ld0RhdGEgdG8gdGhlIGNvbnN0cnVjdG9yLlxuICAgICAgICAgICAga2V5VmFsdWUgPSBuZXcga2V5VmFsdWUobmV3RGF0YSwgdGhpcy5zanNPcHRpb25zKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICgoa2V5VmFsdWUgaW5zdGFuY2VvZiBCYXNlTW9kZWwpID09PSB0cnVlKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIjJcIik7XG4gICAgICAgICAgICAvLyBJZiBwcm9wZXJ0eSBpcyBhbiBpbnN0YW5jZSBvZiBhIEJhc2VNb2RlbCBjbGFzcyBhbmQgaGFzIGFscmVhZHkgYmVlbiBjcmVhdGVkLlxuICAgICAgICAgICAgLy8gQ2FsbCB0aGUgdXBkYXRlIG1ldGhvZCBhbmQgcGFzcyBpbiB0aGUgbmV3RGF0YS5cbiAgICAgICAgICAgIGtleVZhbHVlLnVwZGF0ZShuZXdEYXRhKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiM1wiKTtcbiAgICAgICAgICAgIC8vIEVsc2UganVzdCBhc3NpZ24gdGhlIG5ld0RhdGEgdG8gdGhlIHByb3BlcnR5LlxuICAgICAgICAgICAga2V5VmFsdWUgPSBuZXdEYXRhO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBrZXlWYWx1ZTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIENvbnZlcnRzIHRoZSBCYXNlIE1vZGVsIGRhdGEgaW50byBhIEpTT04gb2JqZWN0IGFuZCBkZWxldGVzIHRoZSBzanNJZCBwcm9wZXJ0eS5cbiAgICAgKlxuICAgICAqIEBtZXRob2QgdG9KU09OXG4gICAgICogQHJldHVybnMge2FueX1cbiAgICAgKiBAcHVibGljXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiAgICAgbGV0IG9iaiA9IGNhck1vZGVsLnRvSlNPTigpO1xuICAgICAqL1xuICAgIEJhc2VNb2RlbC5wcm90b3R5cGUudG9KU09OID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgY2xvbmUgPSBVdGlsXzFbXCJkZWZhdWx0XCJdLmNsb25lKHRoaXMpO1xuICAgICAgICByZXR1cm4gVXRpbF8xW1wiZGVmYXVsdFwiXS5kZWxldGVQcm9wZXJ0eUZyb21PYmplY3QoY2xvbmUsIFsnc2pzSWQnLCAnc2pzT3B0aW9ucyddKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIENvbnZlcnRzIGEgIEJhc2UgTW9kZWwgdG8gYSBKU09OIHN0cmluZyxcbiAgICAgKlxuICAgICAqIEBtZXRob2QgdG9KU09OU3RyaW5nXG4gICAgICogQHJldHVybnMge3N0cmluZ31cbiAgICAgKiBAcHVibGljXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiAgICAgbGV0IHN0ciA9IGNhck1vZGVsLnRvSlNPTlN0cmluZygpO1xuICAgICAqL1xuICAgIEJhc2VNb2RlbC5wcm90b3R5cGUudG9KU09OU3RyaW5nID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkodGhpcy50b0pTT04oKSk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBDb252ZXJ0cyB0aGUgc3RyaW5nIGpzb24gZGF0YSBpbnRvIGFuIE9iamVjdCBhbmQgY2FsbHMgdGhlIHt7I2Nyb3NzTGluayBcIkJhc2VNb2RlbC91cGRhdGU6bWV0aG9kXCJ9fXt7L2Nyb3NzTGlua319IG1ldGhvZCB3aXRoIHRoZSBjb252ZXJ0ZWQgT2JqZWN0LlxuICAgICAqXG4gICAgICogQG1ldGhvZCBmcm9tSlNPTlxuICAgICAqIEBwYXJhbSBqc29uIHtzdHJpbmd9XG4gICAgICogQHB1YmxpY1xuICAgICAqIEBleGFtcGxlXG4gICAgICogICAgICBsZXQgc3RyID0gJ3tcIm1ha2VcIjpcIlRlc2xhXCIsXCJtb2RlbFwiOlwiTW9kZWwgU1wiLFwieWVhclwiOjIwMTR9J1xuICAgICAqICAgICAgbGV0IGNhck1vZGVsID0gbmV3IENhck1vZGVsKCk7XG4gICAgICogICAgICBjYXJNb2RlbC5mcm9tSlNPTihzdHIpO1xuICAgICAqL1xuICAgIEJhc2VNb2RlbC5wcm90b3R5cGUuZnJvbUpTT04gPSBmdW5jdGlvbiAoanNvbikge1xuICAgICAgICB2YXIgcGFyc2VkRGF0YSA9IEpTT04ucGFyc2UoanNvbik7XG4gICAgICAgIHRoaXMudXBkYXRlKHBhcnNlZERhdGEpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIENyZWF0ZSBhIGNsb25lL2NvcHkgb2YgdGhlICBCYXNlIE1vZGVsLlxuICAgICAqXG4gICAgICogQG1ldGhvZCBjbG9uZVxuICAgICAqIEByZXR1cm5zIHtCYXNlTW9kZWx9XG4gICAgICogQHB1YmxpY1xuICAgICAqIEBleGFtcGxlXG4gICAgICogICAgIGxldCBjbG9uZSA9IGNhck1vZGVsLmNsb25lKCk7XG4gICAgICovXG4gICAgQmFzZU1vZGVsLnByb3RvdHlwZS5jbG9uZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGNsb25lZEJhc2VNb2RlbCA9IG5ldyB0aGlzLmNvbnN0cnVjdG9yKHRoaXMpO1xuICAgICAgICByZXR1cm4gY2xvbmVkQmFzZU1vZGVsO1xuICAgIH07XG4gICAgcmV0dXJuIEJhc2VNb2RlbDtcbn0oQmFzZU9iamVjdF8xW1wiZGVmYXVsdFwiXSkpO1xuLyoqXG4gKiBUaGlzIHByb3BlcnR5IGhlbHBzIGRpc3Rpbmd1aXNoIGEgQmFzZU1vZGVsIGZyb20gb3RoZXIgZnVuY3Rpb25zLlxuICpcbiAqIEBwcm9wZXJ0eSBJU19CQVNFX01PREVMXG4gKiBAdHlwZSB7Ym9vbGVhbn1cbiAqIEBwdWJsaWNcbiAqIEBzdGF0aWNcbiAqIEByZWFkb25seVxuICovXG5CYXNlTW9kZWwuSVNfQkFTRV9NT0RFTCA9IHRydWU7XG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBCYXNlTW9kZWw7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1CYXNlTW9kZWwuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG4vKipcbiAqIEEgVXRpbGl0eSBjbGFzcyB0aGF0IGhhcyBzZXZlcmFsIHN0YXRpYyBtZXRob2RzIHRvIGFzc2lzdCBpbiBkZXZlbG9wbWVudC5cbiAqXG4gKiBAY2xhc3MgVXRpbFxuICogQG1vZHVsZSBTdHJ1Y3R1cmVKU1xuICogQHN1Ym1vZHVsZSB1dGlsXG4gKiBAYXV0aG9yIFJvYmVydCBTLiAod3d3LmNvZGVCZWx0LmNvbSlcbiAqIEBzdGF0aWNcbiAqL1xudmFyIFV0aWwgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFV0aWwoKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignW1V0aWxdIERvIG5vdCBpbnN0YW50aWF0ZSB0aGUgVXRpbCBjbGFzcyBiZWNhdXNlIGl0IGlzIGEgc3RhdGljIGNsYXNzLicpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBHZW5lcmF0ZXMgYSB1bmlxdWUgSUQuIElmIGEgcHJlZml4IGlzIHBhc3NlZCBpbiwgdGhlIHZhbHVlIHdpbGwgYmUgYXBwZW5kZWQgdG8gaXQuXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIHVuaXF1ZUlkXG4gICAgICogQHBhcmFtIFtwcmVmaXhdIHtzdHJpbmd9IFRoZSBzdHJpbmcgdmFsdWUgdXNlZCBmb3IgdGhlIHByZWZpeC5cbiAgICAgKiBAcmV0dXJucyB7aW5pdHxzdHJpbmd9IFJldHVybnMgdGhlIHVuaXF1ZSBpZGVudGlmaWVyLlxuICAgICAqIEBwdWJsaWNcbiAgICAgKiBAc3RhdGljXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiAgICAgIGxldCBwcm9wZXJ0eSA9IFV0aWwudW5pcXVlSWQoKTtcbiAgICAgKiAgICAgIC8vIDFcbiAgICAgKlxuICAgICAqICAgICAgbGV0IHByb3BlcnR5ID0gVXRpbC51bmlxdWVJZCgncHJlZml4TmFtZV8nKTtcbiAgICAgKiAgICAgIC8vIHByZWZpeE5hbWVfMVxuICAgICAqL1xuICAgIFV0aWwudW5pcXVlSWQgPSBmdW5jdGlvbiAocHJlZml4KSB7XG4gICAgICAgIGlmIChwcmVmaXggPT09IHZvaWQgMCkgeyBwcmVmaXggPSBudWxsOyB9XG4gICAgICAgIHZhciBpZCA9ICsrVXRpbC5faWRDb3VudGVyO1xuICAgICAgICBpZiAocHJlZml4ICE9IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiBTdHJpbmcocHJlZml4ICsgaWQpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGlkO1xuICAgICAgICB9XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBSZW1vdmVzIGEgbGlzdCBvZiBwcm9wZXJ0aWVzIGZyb20gYW4gb2JqZWN0LlxuICAgICAqXG4gICAgICogQG1ldGhvZCBkZWxldGVQcm9wZXJ0eUZyb21PYmplY3RcbiAgICAgKiBAcGFyYW0gb2JqZWN0IHtPYmplY3R9IFRoZSBvYmplY3QgeW91IHdhbnQgdG8gcmVtb3ZlIHByb3BlcnRpZXMgZnJvbS5cbiAgICAgKiBAcGFyYW0gdmFsdWUge3N0cmluZ3xBcnJheS48c3RyaW5nPn0gQSBwcm9wZXJ0eSBuYW1lIG9yIGFuIGFycmF5IG9mIHByb3BlcnR5IG5hbWVzIHlvdSB3YW50IHRvIHJlbW92ZSBmcm9tIHRoZSBvYmplY3QuXG4gICAgICogQHJldHVybnMge2FueX0gUmV0dXJucyB0aGUgb2JqZWN0IHBhc3NlZCBpbiB3aXRob3V0IHRoZSByZW1vdmVkIHRoZSBwcm9wZXJ0aWVzLlxuICAgICAqIEBwdWJsaWNcbiAgICAgKiBAc3RhdGljXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiAgICAgIGxldCBvYmogPSB7IG5hbWU6ICdSb2JlcnQnLCBnZW5kZXI6ICdtYWxlJywgcGhvbmU6ICc1NTUtNTU1LTU1NTUnIH1cbiAgICAgKlxuICAgICAqICAgICAgVXRpbC5kZWxldGVQcm9wZXJ0eUZyb21PYmplY3Qob2JqLCBbJ3Bob25lJywgJ2dlbmRlciddKTtcbiAgICAgKlxuICAgICAqICAgICAgLy8geyBuYW1lOiAnUm9iZXJ0JyB9XG4gICAgICovXG4gICAgVXRpbC5kZWxldGVQcm9wZXJ0eUZyb21PYmplY3QgPSBmdW5jdGlvbiAob2JqZWN0LCB2YWx1ZSkge1xuICAgICAgICAvLyBJZiBwcm9wZXJ0aWVzIGlzIG5vdCBhbiBhcnJheSB0aGVuIG1ha2UgaXQgYW4gYXJyYXkgb2JqZWN0LlxuICAgICAgICB2YXIgbGlzdCA9ICh2YWx1ZSBpbnN0YW5jZW9mIEFycmF5KSA/IHZhbHVlIDogW3ZhbHVlXTtcbiAgICAgICAgT2JqZWN0XG4gICAgICAgICAgICAua2V5cyhvYmplY3QpXG4gICAgICAgICAgICAuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgICAgICB2YXIgdmFsdWUgPSBvYmplY3Rba2V5XTtcbiAgICAgICAgICAgIGlmIChsaXN0LmluY2x1ZGVzKGtleSkgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICBkZWxldGUgb2JqZWN0W2tleV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICh2YWx1ZSBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICAgICAgICAgICAgdmFsdWUuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkgeyByZXR1cm4gVXRpbC5kZWxldGVQcm9wZXJ0eUZyb21PYmplY3QoaXRlbSwgbGlzdCk7IH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAodmFsdWUgaW5zdGFuY2VvZiBPYmplY3QpIHtcbiAgICAgICAgICAgICAgICBVdGlsLmRlbGV0ZVByb3BlcnR5RnJvbU9iamVjdCh2YWx1ZSwgbGlzdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gb2JqZWN0O1xuICAgIH07XG4gICAgLyoqXG4gICAgICogUmVuYW1lcyBhIHByb3BlcnR5IG5hbWUgb24gYW4gb2JqZWN0LlxuICAgICAqXG4gICAgICogQG1ldGhvZCByZW5hbWVQcm9wZXJ0eU9uT2JqZWN0XG4gICAgICogQHBhcmFtIG9iamVjdCB7T2JqZWN0fSBUaGUgb2JqZWN0IHlvdSB3YW50IHRvIHJlbmFtZSBwcm9wZXJ0aWVzIGZyb20uXG4gICAgICogQHBhcmFtIG9sZE5hbWUge3N0cmluZ31cbiAgICAgKiBAcGFyYW0gbmV3TmFtZSB7c3RyaW5nfVxuICAgICAqIEByZXR1cm5zIHthbnl9IFJldHVybnMgdGhlIG9iamVjdCBwYXNzZWQgaW4gcmVuYW1lZCBwcm9wZXJ0aWVzLlxuICAgICAqIEBwdWJsaWNcbiAgICAgKiBAc3RhdGljXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiAgICAgIGxldCBvYmogPSB7IG5hbWU6ICdSb2JlcnQnLCBnZW5kZXI6ICdtYWxlJywgcGhvbmU6ICc1NTUtNTU1LTU1NTUnIH1cbiAgICAgKlxuICAgICAqICAgICAgVXRpbC5yZW5hbWVQcm9wZXJ0eU9uT2JqZWN0KG9iaiwgJ2dlbmRlcicsICdzZXgnKTtcbiAgICAgKlxuICAgICAqICAgICAgLy8geyBuYW1lOiAnUm9iZXJ0Jywgc2V4OiAnbWFsZScsIHBob25lOiAnNTU1LTU1NS01NTU1JyB9XG4gICAgICovXG4gICAgVXRpbC5yZW5hbWVQcm9wZXJ0eU9uT2JqZWN0ID0gZnVuY3Rpb24gKG9iamVjdCwgb2xkTmFtZSwgbmV3TmFtZSkge1xuICAgICAgICAvLyBDaGVjayBmb3IgdGhlIG9sZCBwcm9wZXJ0eSBuYW1lIHRvIGF2b2lkIGEgUmVmZXJlbmNlRXJyb3IgaW4gc3RyaWN0IG1vZGUuXG4gICAgICAgIGlmIChvYmplY3QuaGFzT3duUHJvcGVydHkob2xkTmFtZSkpIHtcbiAgICAgICAgICAgIG9iamVjdFtuZXdOYW1lXSA9IG9iamVjdFtvbGROYW1lXTtcbiAgICAgICAgICAgIGRlbGV0ZSBvYmplY3Rbb2xkTmFtZV07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG9iamVjdDtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIE1ha2VzIGEgY2xvbmUgb2YgYW4gb2JqZWN0LlxuICAgICAqXG4gICAgICogQG1ldGhvZCBjbG9uZVxuICAgICAqIEBwYXJhbSBvYmoge09iamVjdH0gVGhlIG9iamVjdCB5b3UgdG8gY2xvbmUuXG4gICAgICogQHJldHVybnMge2FueX0gUmV0dXJucyBhIGNsb25lIG9iamVjdCBvZiB0aGUgb25lIHBhc3NlZCBpbi5cbiAgICAgKiBAcHVibGljXG4gICAgICogQHN0YXRpY1xuICAgICAqIEBleGFtcGxlXG4gICAgICogICAgICBsZXQgY2xvbmVPZk9iamVjdCA9IFV0aWwuY2xvbmUob2JqKTtcbiAgICAgKi9cbiAgICBVdGlsLmNsb25lID0gZnVuY3Rpb24gKG9iaikge1xuICAgICAgICAvL290aGVyIHNjcmlwdHM6IGh0dHA6Ly9kYXZpZHdhbHNoLm5hbWUvamF2YXNjcmlwdC1jbG9uZVxuICAgICAgICAvL2h0dHA6Ly9vcmFubG9vbmV5LmNvbS9mdW5jdGlvbmFsLWphdmFzY3JpcHQvXG4gICAgICAgIC8vaHR0cDovL29yYW5sb29uZXkuY29tL2RlZXAtY29weS1qYXZhc2NyaXB0L1xuICAgICAgICAvLyBIYW5kbGUgdGhlIDMgc2ltcGxlIHR5cGVzLCBhbmQgbnVsbCBvciB1bmRlZmluZWRcbiAgICAgICAgaWYgKG51bGwgPT0gb2JqIHx8ICdvYmplY3QnICE9IHR5cGVvZiBvYmopIHtcbiAgICAgICAgICAgIHJldHVybiBvYmo7XG4gICAgICAgIH1cbiAgICAgICAgLy8gSGFuZGxlIERhdGVcbiAgICAgICAgaWYgKG9iaiBpbnN0YW5jZW9mIERhdGUpIHtcbiAgICAgICAgICAgIHZhciBkYXRlID0gbmV3IERhdGUoKTtcbiAgICAgICAgICAgIGRhdGUuc2V0VGltZShvYmouZ2V0VGltZSgpKTtcbiAgICAgICAgICAgIHJldHVybiBkYXRlO1xuICAgICAgICB9XG4gICAgICAgIC8vIEhhbmRsZSBBcnJheVxuICAgICAgICBpZiAob2JqIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgICAgICAgIHZhciBhcnJheSA9IFtdO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IG9iai5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgICAgICAgIGFycmF5W2ldID0gVXRpbC5jbG9uZShvYmpbaV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGFycmF5O1xuICAgICAgICB9XG4gICAgICAgIC8vIEhhbmRsZSBPYmplY3RcbiAgICAgICAgaWYgKG9iaiBpbnN0YW5jZW9mIE9iamVjdCkge1xuICAgICAgICAgICAgdmFyIGNvcHkgPSB7fTtcbiAgICAgICAgICAgIGZvciAodmFyIGF0dHIgaW4gb2JqKSB7XG4gICAgICAgICAgICAgICAgaWYgKG9iai5oYXNPd25Qcm9wZXJ0eShhdHRyKSkge1xuICAgICAgICAgICAgICAgICAgICBjb3B5W2F0dHJdID0gVXRpbC5jbG9uZShvYmpbYXR0cl0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBjb3B5O1xuICAgICAgICB9XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIltVdGlsXSBVbmFibGUgdG8gY29weSBvYmohIEl0cyB0eXBlIGlzbid0IHN1cHBvcnRlZC5cIik7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBDb252ZXJ0cyBhIHN0cmluZyBvciBudW1iZXIgdG8gYSBib29sZWFuLlxuICAgICAqXG4gICAgICogQG1ldGhvZCB0b0Jvb2xlYW5cbiAgICAgKiBAcGFyYW0gc3RyTnVtIHtzdHJpbmd8bnVtYmVyfVxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAqIEBwdWJsaWNcbiAgICAgKiBAc3RhdGljXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiAgICAgIFV0aWwudG9Cb29sZWFuKFwiVFJVRVwiKTtcbiAgICAgKiAgICAgIC8vIHRydWVcbiAgICAgKlxuICAgICAqICAgICAgVXRpbC50b0Jvb2xlYW4oMCk7XG4gICAgICogICAgICAvLyBmYWxzZVxuICAgICAqXG4gICAgICogICAgICBVdGlsLnRvQm9vbGVhbih1bmRlZmluZWQpO1xuICAgICAqICAgICAgLy8gZmFsc2VcbiAgICAgKi9cbiAgICBVdGlsLnRvQm9vbGVhbiA9IGZ1bmN0aW9uIChzdHJOdW0pIHtcbiAgICAgICAgdmFyIHZhbHVlID0gKHR5cGVvZiBzdHJOdW0gPT09ICdzdHJpbmcnKSA/IHN0ck51bS50b0xvd2VyQ2FzZSgpIDogc3RyTnVtO1xuICAgICAgICByZXR1cm4gKHZhbHVlID4gMCB8fCB2YWx1ZSA9PSAndHJ1ZScgfHwgdmFsdWUgPT0gJ3llcycpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgbmFtZSBvZiB0aGUgZnVuY3Rpb24vb2JqZWN0IHBhc3NlZCBpbi5cbiAgICAgKlxuICAgICAqIEBtZXRob2QgZ2V0TmFtZVxuICAgICAqIEBwYXJhbSBjbGFzc09iamVjdCB7YW55fVxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIG5hbWUgb2YgdGhlIGZ1bmN0aW9uIG9yIG9iamVjdC5cbiAgICAgKiBAc3RhdGljXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiAgICAgIGxldCBzb21lQ2xhc3MgPSBuZXcgU29tZUNsYXNzKCk7XG4gICAgICogICAgICBVdGlsLmdldE5hbWUoc29tZUNsYXNzKTsgICAgICAgICAgICAvLyAnU29tZUNsYXNzJ1xuICAgICAqXG4gICAgICogICAgICBVdGlsLmdldE5hbWUoZnVuY3Rpb24gVGVzdCgpe30pOyAgICAvLyAnVGVzdCdcbiAgICAgKiAgICAgIFV0aWwuZ2V0TmFtZShmdW5jdGlvbiAoKXt9KTsgICAgICAgIC8vICdhbm9ueW1vdXMnXG4gICAgICovXG4gICAgVXRpbC5nZXROYW1lID0gZnVuY3Rpb24gKGNsYXNzT2JqZWN0KSB7XG4gICAgICAgIHZhciB0eXBlID0gdHlwZW9mIGNsYXNzT2JqZWN0O1xuICAgICAgICB2YXIgdmFsdWU7XG4gICAgICAgIHZhciBmdW5jTmFtZVJlZ2V4ID0gL2Z1bmN0aW9uIChbXlxcKF0rKS87XG4gICAgICAgIGlmICh0eXBlID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgLy8gR2V0cyB0aGUgbmFtZSBvZiB0aGUgb2JqZWN0LlxuICAgICAgICAgICAgdmFyIHJlc3VsdHMgPSBjbGFzc09iamVjdC5jb25zdHJ1Y3Rvci50b1N0cmluZygpLm1hdGNoKGZ1bmNOYW1lUmVnZXgpO1xuICAgICAgICAgICAgdmFsdWUgPSByZXN1bHRzWzFdO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgLy8gVGhpcyBlbHNlIGNvZGUgaXMgbWFpbmx5IGZvciBJbnRlcm5ldCBFeHBsb3JlLlxuICAgICAgICAgICAgdmFyIGlzRnVuY3Rpb24gPSAodHlwZSA9PT0gJ2Z1bmN0aW9uJyk7XG4gICAgICAgICAgICAvLyBUT0RPOiBmaWd1cmUgb3V0IGhvdyB0byBleHBsYWluIHRoaXNcbiAgICAgICAgICAgIHZhciBuYW1lXzEgPSBpc0Z1bmN0aW9uICYmICgoY2xhc3NPYmplY3QubmFtZSAmJiBbJycsIGNsYXNzT2JqZWN0Lm5hbWVdKSB8fCBjbGFzc09iamVjdC50b1N0cmluZygpLm1hdGNoKGZ1bmNOYW1lUmVnZXgpKTtcbiAgICAgICAgICAgIGlmIChpc0Z1bmN0aW9uID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgIHZhbHVlID0gdHlwZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKG5hbWVfMSAmJiBuYW1lXzFbMV0pIHtcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IG5hbWVfMVsxXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHZhbHVlID0gJ2Fub255bW91cyc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhbmQgcmV0dXJucyBhIG5ldyBkZWJvdW5jZWQgdmVyc2lvbiBvZiB0aGUgcGFzc2VkIGZ1bmN0aW9uIHdoaWNoIHdpbGwgcG9zdHBvbmUgaXRzIGV4ZWN1dGlvbiB1bnRpbCBhZnRlclxuICAgICAqIHdhaXQgbWlsbGlzZWNvbmRzIGhhdmUgZWxhcHNlZCBzaW5jZSB0aGUgbGFzdCB0aW1lIGl0IHdhcyBpbnZva2VkLlxuICAgICAqXG4gICAgICogQG1ldGhvZCBkZWJvdW5jZVxuICAgICAqIEBwYXJhbSBjYWxsYmFjayB7RnVuY3Rpb259IFRoZSBmdW5jdGlvbiB0aGF0IHNob3VsZCBiZSBleGVjdXRlZC5cbiAgICAgKiBAcGFyYW0gd2FpdCB7bnVtYmVyfSBNaWxsaXNlY29uZHMgdG8gZWxhcHNlZCBiZWZvcmUgaW52b2tpbmcgdGhlIGNhbGxiYWNrLlxuICAgICAqIEBwYXJhbSBpbW1lZGlhdGUge2Jvb2xlYW59IFBhc3MgdHJ1ZSBmb3IgdGhlIGltbWVkaWF0ZSBwYXJhbWV0ZXIgdG8gY2F1c2UgZGVib3VuY2UgdG8gdHJpZ2dlciB0aGUgZnVuY3Rpb24gb24gdGhlIGxlYWRpbmcgaW5zdGVhZCBvZiB0aGUgdHJhaWxpbmcgZWRnZSBvZiB0aGUgd2FpdCBpbnRlcnZhbC4gVXNlZnVsIGluIGNpcmN1bXN0YW5jZXMgbGlrZSBwcmV2ZW50aW5nIGFjY2lkZW50YWwgZG91YmxlLWNsaWNrcyBvbiBhIFwic3VibWl0XCIgYnV0dG9uIGZyb20gZmlyaW5nIGEgc2Vjb25kIHRpbWUuXG4gICAgICogQHBhcmFtIGNhbGxiYWNrU2NvcGUge2FueX0gVGhlIHNjb3BlIG9mIHRoZSBjYWxsYmFjayBmdW5jdGlvbiB0aGF0IHNob3VsZCBiZSBleGVjdXRlZC5cbiAgICAgKiBAcHVibGljXG4gICAgICogQHN0YXRpY1xuICAgICAqIEBleGFtcGxlXG4gICAgICogICAgICBVdGlsLmRlYm91bmNlKHRoaXMuX29uQnJlYWtwb2ludENoYW5nZSwgMjUwLCBmYWxzZSwgdGhpcyk7XG4gICAgICovXG4gICAgVXRpbC5kZWJvdW5jZSA9IGZ1bmN0aW9uIChjYWxsYmFjaywgd2FpdCwgaW1tZWRpYXRlLCBjYWxsYmFja1Njb3BlKSB7XG4gICAgICAgIHZhciB0aW1lb3V0O1xuICAgICAgICB2YXIgcmVzdWx0O1xuICAgICAgICB2YXIgZGVib3VuY2VkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIGFyZ3MgPSBhcmd1bWVudHM7XG4gICAgICAgICAgICBmdW5jdGlvbiBkZWxheWVkKCkge1xuICAgICAgICAgICAgICAgIGlmIChpbW1lZGlhdGUgPT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gY2FsbGJhY2suYXBwbHkoY2FsbGJhY2tTY29wZSwgYXJncyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRpbWVvdXQgPSBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRpbWVvdXQpIHtcbiAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQodGltZW91dCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChpbW1lZGlhdGUgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICByZXN1bHQgPSBjYWxsYmFjay5hcHBseShjYWxsYmFja1Njb3BlLCBhcmdzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRpbWVvdXQgPSBzZXRUaW1lb3V0KGRlbGF5ZWQsIHdhaXQpO1xuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfTtcbiAgICAgICAgZGVib3VuY2VkLmNhbmNlbCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aW1lb3V0KTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIGRlYm91bmNlZDtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFRPRE86IFlVSURvY19jb21tZW50XG4gICAgICpcbiAgICAgKiBAbWV0aG9kIGFwcGx5TWl4aW5zXG4gICAgICogQHBhcmFtIGRlcml2ZWRDdG9yIHthbnl9XG4gICAgICogQHBhcmFtIGJhc2VDdG9ycyB7YW55fVxuICAgICAqIEBwdWJsaWNcbiAgICAgKiBAc3RhdGljXG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICBjbGFzcyBGbGllcyB7XG4gICAgICAgICAgICAgICAgZmx5KCkge1xuICAgICAgICAgICAgICAgICAgICBhbGVydCgnSXMgaXQgYSBiaXJkPyBJcyBpdCBhIHBsYW5lPycpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICBjbGFzcyBDbGltYnMge1xuICAgICAgICAgICAgICAgIGNsaW1iKCkge1xuICAgICAgICAgICAgICAgICAgICBhbGVydCgnTXkgc3BpZGVyLXNlbnNlIGlzIHRpbmdsaW5nLicpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICBjbGFzcyBIb3JzZWZseVdvbWFuIGltcGxlbWVudHMgQ2xpbWJzLCBGbGllcyB7XG4gICAgICAgICAgICAgICAgY2xpbWI6ICgpID0+IHZvaWQ7XG4gICAgICAgICAgICAgICAgZmx5OiAoKSA9PiB2b2lkO1xuICAgICAgICAgICAgfVxuXG4gICAgIFV0aWwuYXBwbHlNaXhpbnMoSG9yc2VmbHlXb21hbiwgW0NsaW1icywgRmxpZXNdKTtcbiAgICAgKi9cbiAgICBVdGlsLmFwcGx5TWl4aW5zID0gZnVuY3Rpb24gKGRlcml2ZWRDdG9yLCBiYXNlQ3RvcnMpIHtcbiAgICAgICAgYmFzZUN0b3JzLmZvckVhY2goZnVuY3Rpb24gKGJhc2VDdG9yKSB7XG4gICAgICAgICAgICBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhiYXNlQ3Rvci5wcm90b3R5cGUpLmZvckVhY2goZnVuY3Rpb24gKG5hbWUpIHtcbiAgICAgICAgICAgICAgICBkZXJpdmVkQ3Rvci5wcm90b3R5cGVbbmFtZV0gPSBiYXNlQ3Rvci5wcm90b3R5cGVbbmFtZV07XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGEgbmV3IGFycmF5IHdpdGggZHVwbGljYXRlcyByZW1vdmVkLlxuICAgICAqXG4gICAgICogQG1ldGhvZCB1bmlxdWVcbiAgICAgKiBAcGFyYW0gbGlzdCB7QXJyYXkuPGFueT59IFRoZSBhcnJheSB5b3Ugd2FudCB0byB1c2UgdG8gZ2VuZXJhdGUgdGhlIHVuaXF1ZSBhcnJheS5cbiAgICAgKiBAcmV0dXJuIHtBcnJheTxhbnk+fSBSZXR1cm5zIGEgbmV3IGFycmF5IGxpc3Qgb2YgdW5pcXVlIGl0ZW1zLlxuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICBVdGlsLnVuaXF1ZSA9IGZ1bmN0aW9uIChsaXN0KSB7XG4gICAgICAgIHZhciB1bmlxdWVMaXN0ID0gbGlzdC5yZWR1Y2UoZnVuY3Rpb24gKHByZXZpb3VzVmFsdWUsIGN1cnJlbnRWYWx1ZSkge1xuICAgICAgICAgICAgaWYgKHByZXZpb3VzVmFsdWUuaW5kZXhPZihjdXJyZW50VmFsdWUpID09PSAtMSkge1xuICAgICAgICAgICAgICAgIHByZXZpb3VzVmFsdWUucHVzaChjdXJyZW50VmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHByZXZpb3VzVmFsdWU7XG4gICAgICAgIH0sIFtdKTtcbiAgICAgICAgcmV0dXJuIHVuaXF1ZUxpc3Q7XG4gICAgfTtcbiAgICByZXR1cm4gVXRpbDtcbn0oKSk7XG4vKipcbiAqIEtlZXBzIHRyYWNrIG9mIHRoZSBjb3VudCBmb3IgdGhlIHVuaXF1ZUlkIG1ldGhvZC5cbiAqXG4gKiBAcHJvcGVydHkgX2lkQ291bnRlclxuICogQHR5cGUge2ludH1cbiAqIEBwcml2YXRlXG4gKiBAc3RhdGljXG4gKi9cblV0aWwuX2lkQ291bnRlciA9IDA7XG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBVdGlsO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9VXRpbC5qcy5tYXAiXX0=

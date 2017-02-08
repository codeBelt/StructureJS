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
    var asdf = new CheckoutViewModel_1["default"]({ test: '' }, { expand: false });
    console.log("CheckoutViewModel", asdf);
    console.log("!!!!!!! clone");
    var clone = asdf.clone();
    console.log("clone", clone);
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
        } else if (propertyData instanceof BaseModel === true) {
            // If propertyData is an instance of a BaseModel class and has already been created.
            // Call the update method and pass in the updateData.
            returnData = propertyData.update(updateData);
        } else if (updateData instanceof BaseModel === true) {
            returnData = updateData.clone();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9jb3JlLWpzL29iamVjdC9jcmVhdGUuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9jcmVhdGUuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2EtZnVuY3Rpb24uanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2FuLW9iamVjdC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fYXJyYXktaW5jbHVkZXMuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2NvZi5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fY29yZS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fY3R4LmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19kZWZpbmVkLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19kZXNjcmlwdG9ycy5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZG9tLWNyZWF0ZS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZW51bS1idWcta2V5cy5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZXhwb3J0LmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19mYWlscy5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZ2xvYmFsLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19oYXMuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2hpZGUuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2h0bWwuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2llOC1kb20tZGVmaW5lLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pb2JqZWN0LmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pcy1vYmplY3QuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1jcmVhdGUuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1kcC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWRwcy5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWtleXMtaW50ZXJuYWwuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1rZXlzLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19wcm9wZXJ0eS1kZXNjLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19zaGFyZWQta2V5LmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19zaGFyZWQuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLWluZGV4LmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1pbnRlZ2VyLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1pb2JqZWN0LmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1sZW5ndGguanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLXByaW1pdGl2ZS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdWlkLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5vYmplY3QuY3JlYXRlLmpzIiwic3JjL2Fzc2V0cy9zY3JpcHRzL0FwcC5qcyIsInNyYy9hc3NldHMvc2NyaXB0cy9tYWluLnRzIiwic3JjL2Fzc2V0cy9zY3JpcHRzL21vZGVscy9DaGVja291dFZpZXdNb2RlbC5qcyIsInNyYy9hc3NldHMvc2NyaXB0cy9tb2RlbHMvZm9ybS9JbnB1dE1vZGVsLmpzIiwiLi4vLi4vdHMvQmFzZU9iamVjdC5qcyIsIi4uLy4uL3RzL21vZGVsL0Jhc2VNb2RlbC5qcyIsIi4uLy4uL3RzL3V0aWwvVXRpbC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBOztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDSkE7QUFDQTtBQUNBO0FBQ0E7O0FDSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDSkE7QUFDQTs7QUNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0pBO0FBQ0E7QUFDQTtBQUNBOztBQ0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ05BO0FBQ0E7QUFDQTtBQUNBOztBQ0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNOQTtBQUNBO0FBQ0E7QUFDQTs7QUNIQTtBQUNBO0FBQ0E7QUFDQTs7QUNIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1BBOztBQ0FBO0FBQ0E7QUFDQTs7QUNGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0pBO0FBQ0E7QUFDQTs7QUNGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEJBO0FB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LEVBQStDLE9BQS9DLENBQXVELFVBQVUsSUFBVixFQUFnQjtBQUNuRSw0QkFBWSxTQUFaLENBQXNCLElBQXRCLElBQThCLFNBQVMsU0FBVCxDQUFtQixJQUFuQixDQUE5QjtBQUNILGFBRkQ7QUFHSCxTQUpEO0FBS0gsS0FORDtBQU9BOzs7Ozs7OztBQVFBLFNBQUssTUFBTCxHQUFjLFVBQVUsSUFBVixFQUFnQjtBQUMxQixZQUFJLGFBQWEsS0FBSyxNQUFMLENBQVksVUFBVSxhQUFWLEVBQXlCLFlBQXpCLEVBQXVDO0FBQ2hFLGdCQUFJLGNBQWMsT0FBZCxDQUFzQixZQUF0QixNQUF3QyxDQUFDLENBQTdDLEVBQWdEO0FBQzVDLDhCQUFjLElBQWQsQ0FBbUIsWUFBbkI7QUFDSDtBQUNELG1CQUFPLGFBQVA7QUFDSCxTQUxnQixFQUtkLEVBTGMsQ0FBakI7QUFNQSxlQUFPLFVBQVA7QUFDSCxLQVJEO0FBU0EsV0FBTyxJQUFQO0FBQ0gsQ0FqU1csRUFBWjtBQWtTQTs7Ozs7Ozs7QUFRQSxLQUFLLFVBQUwsR0FBa0IsQ0FBbEI7QUFDQSxRQUFRLFVBQVIsR0FBcUIsSUFBckI7QUFDQSxRQUFRLFNBQVIsSUFBcUIsSUFBckI7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJtb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2NyZWF0ZVwiKSwgX19lc01vZHVsZTogdHJ1ZSB9OyIsInJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM2Lm9iamVjdC5jcmVhdGUnKTtcbnZhciAkT2JqZWN0ID0gcmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9fY29yZScpLk9iamVjdDtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gY3JlYXRlKFAsIEQpe1xuICByZXR1cm4gJE9iamVjdC5jcmVhdGUoUCwgRCk7XG59OyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICBpZih0eXBlb2YgaXQgIT0gJ2Z1bmN0aW9uJyl0aHJvdyBUeXBlRXJyb3IoaXQgKyAnIGlzIG5vdCBhIGZ1bmN0aW9uIScpO1xuICByZXR1cm4gaXQ7XG59OyIsInZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vX2lzLW9iamVjdCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIGlmKCFpc09iamVjdChpdCkpdGhyb3cgVHlwZUVycm9yKGl0ICsgJyBpcyBub3QgYW4gb2JqZWN0IScpO1xuICByZXR1cm4gaXQ7XG59OyIsIi8vIGZhbHNlIC0+IEFycmF5I2luZGV4T2Zcbi8vIHRydWUgIC0+IEFycmF5I2luY2x1ZGVzXG52YXIgdG9JT2JqZWN0ID0gcmVxdWlyZSgnLi9fdG8taW9iamVjdCcpXG4gICwgdG9MZW5ndGggID0gcmVxdWlyZSgnLi9fdG8tbGVuZ3RoJylcbiAgLCB0b0luZGV4ICAgPSByZXF1aXJlKCcuL190by1pbmRleCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihJU19JTkNMVURFUyl7XG4gIHJldHVybiBmdW5jdGlvbigkdGhpcywgZWwsIGZyb21JbmRleCl7XG4gICAgdmFyIE8gICAgICA9IHRvSU9iamVjdCgkdGhpcylcbiAgICAgICwgbGVuZ3RoID0gdG9MZW5ndGgoTy5sZW5ndGgpXG4gICAgICAsIGluZGV4ICA9IHRvSW5kZXgoZnJvbUluZGV4LCBsZW5ndGgpXG4gICAgICAsIHZhbHVlO1xuICAgIC8vIEFycmF5I2luY2x1ZGVzIHVzZXMgU2FtZVZhbHVlWmVybyBlcXVhbGl0eSBhbGdvcml0aG1cbiAgICBpZihJU19JTkNMVURFUyAmJiBlbCAhPSBlbCl3aGlsZShsZW5ndGggPiBpbmRleCl7XG4gICAgICB2YWx1ZSA9IE9baW5kZXgrK107XG4gICAgICBpZih2YWx1ZSAhPSB2YWx1ZSlyZXR1cm4gdHJ1ZTtcbiAgICAvLyBBcnJheSN0b0luZGV4IGlnbm9yZXMgaG9sZXMsIEFycmF5I2luY2x1ZGVzIC0gbm90XG4gICAgfSBlbHNlIGZvcig7bGVuZ3RoID4gaW5kZXg7IGluZGV4KyspaWYoSVNfSU5DTFVERVMgfHwgaW5kZXggaW4gTyl7XG4gICAgICBpZihPW2luZGV4XSA9PT0gZWwpcmV0dXJuIElTX0lOQ0xVREVTIHx8IGluZGV4IHx8IDA7XG4gICAgfSByZXR1cm4gIUlTX0lOQ0xVREVTICYmIC0xO1xuICB9O1xufTsiLCJ2YXIgdG9TdHJpbmcgPSB7fS50b1N0cmluZztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKGl0KS5zbGljZSg4LCAtMSk7XG59OyIsInZhciBjb3JlID0gbW9kdWxlLmV4cG9ydHMgPSB7dmVyc2lvbjogJzIuNC4wJ307XG5pZih0eXBlb2YgX19lID09ICdudW1iZXInKV9fZSA9IGNvcmU7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW5kZWYiLCIvLyBvcHRpb25hbCAvIHNpbXBsZSBjb250ZXh0IGJpbmRpbmdcbnZhciBhRnVuY3Rpb24gPSByZXF1aXJlKCcuL19hLWZ1bmN0aW9uJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGZuLCB0aGF0LCBsZW5ndGgpe1xuICBhRnVuY3Rpb24oZm4pO1xuICBpZih0aGF0ID09PSB1bmRlZmluZWQpcmV0dXJuIGZuO1xuICBzd2l0Y2gobGVuZ3RoKXtcbiAgICBjYXNlIDE6IHJldHVybiBmdW5jdGlvbihhKXtcbiAgICAgIHJldHVybiBmbi5jYWxsKHRoYXQsIGEpO1xuICAgIH07XG4gICAgY2FzZSAyOiByZXR1cm4gZnVuY3Rpb24oYSwgYil7XG4gICAgICByZXR1cm4gZm4uY2FsbCh0aGF0LCBhLCBiKTtcbiAgICB9O1xuICAgIGNhc2UgMzogcmV0dXJuIGZ1bmN0aW9uKGEsIGIsIGMpe1xuICAgICAgcmV0dXJuIGZuLmNhbGwodGhhdCwgYSwgYiwgYyk7XG4gICAgfTtcbiAgfVxuICByZXR1cm4gZnVuY3Rpb24oLyogLi4uYXJncyAqLyl7XG4gICAgcmV0dXJuIGZuLmFwcGx5KHRoYXQsIGFyZ3VtZW50cyk7XG4gIH07XG59OyIsIi8vIDcuMi4xIFJlcXVpcmVPYmplY3RDb2VyY2libGUoYXJndW1lbnQpXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgaWYoaXQgPT0gdW5kZWZpbmVkKXRocm93IFR5cGVFcnJvcihcIkNhbid0IGNhbGwgbWV0aG9kIG9uICBcIiArIGl0KTtcbiAgcmV0dXJuIGl0O1xufTsiLCIvLyBUaGFuaydzIElFOCBmb3IgaGlzIGZ1bm55IGRlZmluZVByb3BlcnR5XG5tb2R1bGUuZXhwb3J0cyA9ICFyZXF1aXJlKCcuL19mYWlscycpKGZ1bmN0aW9uKCl7XG4gIHJldHVybiBPYmplY3QuZGVmaW5lUHJvcGVydHkoe30sICdhJywge2dldDogZnVuY3Rpb24oKXsgcmV0dXJuIDc7IH19KS5hICE9IDc7XG59KTsiLCJ2YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKVxuICAsIGRvY3VtZW50ID0gcmVxdWlyZSgnLi9fZ2xvYmFsJykuZG9jdW1lbnRcbiAgLy8gaW4gb2xkIElFIHR5cGVvZiBkb2N1bWVudC5jcmVhdGVFbGVtZW50IGlzICdvYmplY3QnXG4gICwgaXMgPSBpc09iamVjdChkb2N1bWVudCkgJiYgaXNPYmplY3QoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIGlzID8gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChpdCkgOiB7fTtcbn07IiwiLy8gSUUgOC0gZG9uJ3QgZW51bSBidWcga2V5c1xubW9kdWxlLmV4cG9ydHMgPSAoXG4gICdjb25zdHJ1Y3RvcixoYXNPd25Qcm9wZXJ0eSxpc1Byb3RvdHlwZU9mLHByb3BlcnR5SXNFbnVtZXJhYmxlLHRvTG9jYWxlU3RyaW5nLHRvU3RyaW5nLHZhbHVlT2YnXG4pLnNwbGl0KCcsJyk7IiwidmFyIGdsb2JhbCAgICA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpXG4gICwgY29yZSAgICAgID0gcmVxdWlyZSgnLi9fY29yZScpXG4gICwgY3R4ICAgICAgID0gcmVxdWlyZSgnLi9fY3R4JylcbiAgLCBoaWRlICAgICAgPSByZXF1aXJlKCcuL19oaWRlJylcbiAgLCBQUk9UT1RZUEUgPSAncHJvdG90eXBlJztcblxudmFyICRleHBvcnQgPSBmdW5jdGlvbih0eXBlLCBuYW1lLCBzb3VyY2Upe1xuICB2YXIgSVNfRk9SQ0VEID0gdHlwZSAmICRleHBvcnQuRlxuICAgICwgSVNfR0xPQkFMID0gdHlwZSAmICRleHBvcnQuR1xuICAgICwgSVNfU1RBVElDID0gdHlwZSAmICRleHBvcnQuU1xuICAgICwgSVNfUFJPVE8gID0gdHlwZSAmICRleHBvcnQuUFxuICAgICwgSVNfQklORCAgID0gdHlwZSAmICRleHBvcnQuQlxuICAgICwgSVNfV1JBUCAgID0gdHlwZSAmICRleHBvcnQuV1xuICAgICwgZXhwb3J0cyAgID0gSVNfR0xPQkFMID8gY29yZSA6IGNvcmVbbmFtZV0gfHwgKGNvcmVbbmFtZV0gPSB7fSlcbiAgICAsIGV4cFByb3RvICA9IGV4cG9ydHNbUFJPVE9UWVBFXVxuICAgICwgdGFyZ2V0ICAgID0gSVNfR0xPQkFMID8gZ2xvYmFsIDogSVNfU1RBVElDID8gZ2xvYmFsW25hbWVdIDogKGdsb2JhbFtuYW1lXSB8fCB7fSlbUFJPVE9UWVBFXVxuICAgICwga2V5LCBvd24sIG91dDtcbiAgaWYoSVNfR0xPQkFMKXNvdXJjZSA9IG5hbWU7XG4gIGZvcihrZXkgaW4gc291cmNlKXtcbiAgICAvLyBjb250YWlucyBpbiBuYXRpdmVcbiAgICBvd24gPSAhSVNfRk9SQ0VEICYmIHRhcmdldCAmJiB0YXJnZXRba2V5XSAhPT0gdW5kZWZpbmVkO1xuICAgIGlmKG93biAmJiBrZXkgaW4gZXhwb3J0cyljb250aW51ZTtcbiAgICAvLyBleHBvcnQgbmF0aXZlIG9yIHBhc3NlZFxuICAgIG91dCA9IG93biA/IHRhcmdldFtrZXldIDogc291cmNlW2tleV07XG4gICAgLy8gcHJldmVudCBnbG9iYWwgcG9sbHV0aW9uIGZvciBuYW1lc3BhY2VzXG4gICAgZXhwb3J0c1trZXldID0gSVNfR0xPQkFMICYmIHR5cGVvZiB0YXJnZXRba2V5XSAhPSAnZnVuY3Rpb24nID8gc291cmNlW2tleV1cbiAgICAvLyBiaW5kIHRpbWVycyB0byBnbG9iYWwgZm9yIGNhbGwgZnJvbSBleHBvcnQgY29udGV4dFxuICAgIDogSVNfQklORCAmJiBvd24gPyBjdHgob3V0LCBnbG9iYWwpXG4gICAgLy8gd3JhcCBnbG9iYWwgY29uc3RydWN0b3JzIGZvciBwcmV2ZW50IGNoYW5nZSB0aGVtIGluIGxpYnJhcnlcbiAgICA6IElTX1dSQVAgJiYgdGFyZ2V0W2tleV0gPT0gb3V0ID8gKGZ1bmN0aW9uKEMpe1xuICAgICAgdmFyIEYgPSBmdW5jdGlvbihhLCBiLCBjKXtcbiAgICAgICAgaWYodGhpcyBpbnN0YW5jZW9mIEMpe1xuICAgICAgICAgIHN3aXRjaChhcmd1bWVudHMubGVuZ3RoKXtcbiAgICAgICAgICAgIGNhc2UgMDogcmV0dXJuIG5ldyBDO1xuICAgICAgICAgICAgY2FzZSAxOiByZXR1cm4gbmV3IEMoYSk7XG4gICAgICAgICAgICBjYXNlIDI6IHJldHVybiBuZXcgQyhhLCBiKTtcbiAgICAgICAgICB9IHJldHVybiBuZXcgQyhhLCBiLCBjKTtcbiAgICAgICAgfSByZXR1cm4gQy5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgfTtcbiAgICAgIEZbUFJPVE9UWVBFXSA9IENbUFJPVE9UWVBFXTtcbiAgICAgIHJldHVybiBGO1xuICAgIC8vIG1ha2Ugc3RhdGljIHZlcnNpb25zIGZvciBwcm90b3R5cGUgbWV0aG9kc1xuICAgIH0pKG91dCkgOiBJU19QUk9UTyAmJiB0eXBlb2Ygb3V0ID09ICdmdW5jdGlvbicgPyBjdHgoRnVuY3Rpb24uY2FsbCwgb3V0KSA6IG91dDtcbiAgICAvLyBleHBvcnQgcHJvdG8gbWV0aG9kcyB0byBjb3JlLiVDT05TVFJVQ1RPUiUubWV0aG9kcy4lTkFNRSVcbiAgICBpZihJU19QUk9UTyl7XG4gICAgICAoZXhwb3J0cy52aXJ0dWFsIHx8IChleHBvcnRzLnZpcnR1YWwgPSB7fSkpW2tleV0gPSBvdXQ7XG4gICAgICAvLyBleHBvcnQgcHJvdG8gbWV0aG9kcyB0byBjb3JlLiVDT05TVFJVQ1RPUiUucHJvdG90eXBlLiVOQU1FJVxuICAgICAgaWYodHlwZSAmICRleHBvcnQuUiAmJiBleHBQcm90byAmJiAhZXhwUHJvdG9ba2V5XSloaWRlKGV4cFByb3RvLCBrZXksIG91dCk7XG4gICAgfVxuICB9XG59O1xuLy8gdHlwZSBiaXRtYXBcbiRleHBvcnQuRiA9IDE7ICAgLy8gZm9yY2VkXG4kZXhwb3J0LkcgPSAyOyAgIC8vIGdsb2JhbFxuJGV4cG9ydC5TID0gNDsgICAvLyBzdGF0aWNcbiRleHBvcnQuUCA9IDg7ICAgLy8gcHJvdG9cbiRleHBvcnQuQiA9IDE2OyAgLy8gYmluZFxuJGV4cG9ydC5XID0gMzI7ICAvLyB3cmFwXG4kZXhwb3J0LlUgPSA2NDsgIC8vIHNhZmVcbiRleHBvcnQuUiA9IDEyODsgLy8gcmVhbCBwcm90byBtZXRob2QgZm9yIGBsaWJyYXJ5YCBcbm1vZHVsZS5leHBvcnRzID0gJGV4cG9ydDsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGV4ZWMpe1xuICB0cnkge1xuICAgIHJldHVybiAhIWV4ZWMoKTtcbiAgfSBjYXRjaChlKXtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxufTsiLCIvLyBodHRwczovL2dpdGh1Yi5jb20vemxvaXJvY2svY29yZS1qcy9pc3N1ZXMvODYjaXNzdWVjb21tZW50LTExNTc1OTAyOFxudmFyIGdsb2JhbCA9IG1vZHVsZS5leHBvcnRzID0gdHlwZW9mIHdpbmRvdyAhPSAndW5kZWZpbmVkJyAmJiB3aW5kb3cuTWF0aCA9PSBNYXRoXG4gID8gd2luZG93IDogdHlwZW9mIHNlbGYgIT0gJ3VuZGVmaW5lZCcgJiYgc2VsZi5NYXRoID09IE1hdGggPyBzZWxmIDogRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcbmlmKHR5cGVvZiBfX2cgPT0gJ251bWJlcicpX19nID0gZ2xvYmFsOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVuZGVmIiwidmFyIGhhc093blByb3BlcnR5ID0ge30uaGFzT3duUHJvcGVydHk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0LCBrZXkpe1xuICByZXR1cm4gaGFzT3duUHJvcGVydHkuY2FsbChpdCwga2V5KTtcbn07IiwidmFyIGRQICAgICAgICAgPSByZXF1aXJlKCcuL19vYmplY3QtZHAnKVxuICAsIGNyZWF0ZURlc2MgPSByZXF1aXJlKCcuL19wcm9wZXJ0eS1kZXNjJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJykgPyBmdW5jdGlvbihvYmplY3QsIGtleSwgdmFsdWUpe1xuICByZXR1cm4gZFAuZihvYmplY3QsIGtleSwgY3JlYXRlRGVzYygxLCB2YWx1ZSkpO1xufSA6IGZ1bmN0aW9uKG9iamVjdCwga2V5LCB2YWx1ZSl7XG4gIG9iamVjdFtrZXldID0gdmFsdWU7XG4gIHJldHVybiBvYmplY3Q7XG59OyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9fZ2xvYmFsJykuZG9jdW1lbnQgJiYgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50OyIsIm1vZHVsZS5leHBvcnRzID0gIXJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJykgJiYgIXJlcXVpcmUoJy4vX2ZhaWxzJykoZnVuY3Rpb24oKXtcbiAgcmV0dXJuIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShyZXF1aXJlKCcuL19kb20tY3JlYXRlJykoJ2RpdicpLCAnYScsIHtnZXQ6IGZ1bmN0aW9uKCl7IHJldHVybiA3OyB9fSkuYSAhPSA3O1xufSk7IiwiLy8gZmFsbGJhY2sgZm9yIG5vbi1hcnJheS1saWtlIEVTMyBhbmQgbm9uLWVudW1lcmFibGUgb2xkIFY4IHN0cmluZ3NcbnZhciBjb2YgPSByZXF1aXJlKCcuL19jb2YnKTtcbm1vZHVsZS5leHBvcnRzID0gT2JqZWN0KCd6JykucHJvcGVydHlJc0VudW1lcmFibGUoMCkgPyBPYmplY3QgOiBmdW5jdGlvbihpdCl7XG4gIHJldHVybiBjb2YoaXQpID09ICdTdHJpbmcnID8gaXQuc3BsaXQoJycpIDogT2JqZWN0KGl0KTtcbn07IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIHJldHVybiB0eXBlb2YgaXQgPT09ICdvYmplY3QnID8gaXQgIT09IG51bGwgOiB0eXBlb2YgaXQgPT09ICdmdW5jdGlvbic7XG59OyIsIi8vIDE5LjEuMi4yIC8gMTUuMi4zLjUgT2JqZWN0LmNyZWF0ZShPIFssIFByb3BlcnRpZXNdKVxudmFyIGFuT2JqZWN0ICAgID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0JylcbiAgLCBkUHMgICAgICAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1kcHMnKVxuICAsIGVudW1CdWdLZXlzID0gcmVxdWlyZSgnLi9fZW51bS1idWcta2V5cycpXG4gICwgSUVfUFJPVE8gICAgPSByZXF1aXJlKCcuL19zaGFyZWQta2V5JykoJ0lFX1BST1RPJylcbiAgLCBFbXB0eSAgICAgICA9IGZ1bmN0aW9uKCl7IC8qIGVtcHR5ICovIH1cbiAgLCBQUk9UT1RZUEUgICA9ICdwcm90b3R5cGUnO1xuXG4vLyBDcmVhdGUgb2JqZWN0IHdpdGggZmFrZSBgbnVsbGAgcHJvdG90eXBlOiB1c2UgaWZyYW1lIE9iamVjdCB3aXRoIGNsZWFyZWQgcHJvdG90eXBlXG52YXIgY3JlYXRlRGljdCA9IGZ1bmN0aW9uKCl7XG4gIC8vIFRocmFzaCwgd2FzdGUgYW5kIHNvZG9teTogSUUgR0MgYnVnXG4gIHZhciBpZnJhbWUgPSByZXF1aXJlKCcuL19kb20tY3JlYXRlJykoJ2lmcmFtZScpXG4gICAgLCBpICAgICAgPSBlbnVtQnVnS2V5cy5sZW5ndGhcbiAgICAsIGx0ICAgICA9ICc8J1xuICAgICwgZ3QgICAgID0gJz4nXG4gICAgLCBpZnJhbWVEb2N1bWVudDtcbiAgaWZyYW1lLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gIHJlcXVpcmUoJy4vX2h0bWwnKS5hcHBlbmRDaGlsZChpZnJhbWUpO1xuICBpZnJhbWUuc3JjID0gJ2phdmFzY3JpcHQ6JzsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1zY3JpcHQtdXJsXG4gIC8vIGNyZWF0ZURpY3QgPSBpZnJhbWUuY29udGVudFdpbmRvdy5PYmplY3Q7XG4gIC8vIGh0bWwucmVtb3ZlQ2hpbGQoaWZyYW1lKTtcbiAgaWZyYW1lRG9jdW1lbnQgPSBpZnJhbWUuY29udGVudFdpbmRvdy5kb2N1bWVudDtcbiAgaWZyYW1lRG9jdW1lbnQub3BlbigpO1xuICBpZnJhbWVEb2N1bWVudC53cml0ZShsdCArICdzY3JpcHQnICsgZ3QgKyAnZG9jdW1lbnQuRj1PYmplY3QnICsgbHQgKyAnL3NjcmlwdCcgKyBndCk7XG4gIGlmcmFtZURvY3VtZW50LmNsb3NlKCk7XG4gIGNyZWF0ZURpY3QgPSBpZnJhbWVEb2N1bWVudC5GO1xuICB3aGlsZShpLS0pZGVsZXRlIGNyZWF0ZURpY3RbUFJPVE9UWVBFXVtlbnVtQnVnS2V5c1tpXV07XG4gIHJldHVybiBjcmVhdGVEaWN0KCk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IE9iamVjdC5jcmVhdGUgfHwgZnVuY3Rpb24gY3JlYXRlKE8sIFByb3BlcnRpZXMpe1xuICB2YXIgcmVzdWx0O1xuICBpZihPICE9PSBudWxsKXtcbiAgICBFbXB0eVtQUk9UT1RZUEVdID0gYW5PYmplY3QoTyk7XG4gICAgcmVzdWx0ID0gbmV3IEVtcHR5O1xuICAgIEVtcHR5W1BST1RPVFlQRV0gPSBudWxsO1xuICAgIC8vIGFkZCBcIl9fcHJvdG9fX1wiIGZvciBPYmplY3QuZ2V0UHJvdG90eXBlT2YgcG9seWZpbGxcbiAgICByZXN1bHRbSUVfUFJPVE9dID0gTztcbiAgfSBlbHNlIHJlc3VsdCA9IGNyZWF0ZURpY3QoKTtcbiAgcmV0dXJuIFByb3BlcnRpZXMgPT09IHVuZGVmaW5lZCA/IHJlc3VsdCA6IGRQcyhyZXN1bHQsIFByb3BlcnRpZXMpO1xufTtcbiIsInZhciBhbk9iamVjdCAgICAgICA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpXG4gICwgSUU4X0RPTV9ERUZJTkUgPSByZXF1aXJlKCcuL19pZTgtZG9tLWRlZmluZScpXG4gICwgdG9QcmltaXRpdmUgICAgPSByZXF1aXJlKCcuL190by1wcmltaXRpdmUnKVxuICAsIGRQICAgICAgICAgICAgID0gT2JqZWN0LmRlZmluZVByb3BlcnR5O1xuXG5leHBvcnRzLmYgPSByZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpID8gT2JqZWN0LmRlZmluZVByb3BlcnR5IDogZnVuY3Rpb24gZGVmaW5lUHJvcGVydHkoTywgUCwgQXR0cmlidXRlcyl7XG4gIGFuT2JqZWN0KE8pO1xuICBQID0gdG9QcmltaXRpdmUoUCwgdHJ1ZSk7XG4gIGFuT2JqZWN0KEF0dHJpYnV0ZXMpO1xuICBpZihJRThfRE9NX0RFRklORSl0cnkge1xuICAgIHJldHVybiBkUChPLCBQLCBBdHRyaWJ1dGVzKTtcbiAgfSBjYXRjaChlKXsgLyogZW1wdHkgKi8gfVxuICBpZignZ2V0JyBpbiBBdHRyaWJ1dGVzIHx8ICdzZXQnIGluIEF0dHJpYnV0ZXMpdGhyb3cgVHlwZUVycm9yKCdBY2Nlc3NvcnMgbm90IHN1cHBvcnRlZCEnKTtcbiAgaWYoJ3ZhbHVlJyBpbiBBdHRyaWJ1dGVzKU9bUF0gPSBBdHRyaWJ1dGVzLnZhbHVlO1xuICByZXR1cm4gTztcbn07IiwidmFyIGRQICAgICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWRwJylcbiAgLCBhbk9iamVjdCA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpXG4gICwgZ2V0S2V5cyAgPSByZXF1aXJlKCcuL19vYmplY3Qta2V5cycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJykgPyBPYmplY3QuZGVmaW5lUHJvcGVydGllcyA6IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXMoTywgUHJvcGVydGllcyl7XG4gIGFuT2JqZWN0KE8pO1xuICB2YXIga2V5cyAgID0gZ2V0S2V5cyhQcm9wZXJ0aWVzKVxuICAgICwgbGVuZ3RoID0ga2V5cy5sZW5ndGhcbiAgICAsIGkgPSAwXG4gICAgLCBQO1xuICB3aGlsZShsZW5ndGggPiBpKWRQLmYoTywgUCA9IGtleXNbaSsrXSwgUHJvcGVydGllc1tQXSk7XG4gIHJldHVybiBPO1xufTsiLCJ2YXIgaGFzICAgICAgICAgID0gcmVxdWlyZSgnLi9faGFzJylcbiAgLCB0b0lPYmplY3QgICAgPSByZXF1aXJlKCcuL190by1pb2JqZWN0JylcbiAgLCBhcnJheUluZGV4T2YgPSByZXF1aXJlKCcuL19hcnJheS1pbmNsdWRlcycpKGZhbHNlKVxuICAsIElFX1BST1RPICAgICA9IHJlcXVpcmUoJy4vX3NoYXJlZC1rZXknKSgnSUVfUFJPVE8nKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihvYmplY3QsIG5hbWVzKXtcbiAgdmFyIE8gICAgICA9IHRvSU9iamVjdChvYmplY3QpXG4gICAgLCBpICAgICAgPSAwXG4gICAgLCByZXN1bHQgPSBbXVxuICAgICwga2V5O1xuICBmb3Ioa2V5IGluIE8paWYoa2V5ICE9IElFX1BST1RPKWhhcyhPLCBrZXkpICYmIHJlc3VsdC5wdXNoKGtleSk7XG4gIC8vIERvbid0IGVudW0gYnVnICYgaGlkZGVuIGtleXNcbiAgd2hpbGUobmFtZXMubGVuZ3RoID4gaSlpZihoYXMoTywga2V5ID0gbmFtZXNbaSsrXSkpe1xuICAgIH5hcnJheUluZGV4T2YocmVzdWx0LCBrZXkpIHx8IHJlc3VsdC5wdXNoKGtleSk7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn07IiwiLy8gMTkuMS4yLjE0IC8gMTUuMi4zLjE0IE9iamVjdC5rZXlzKE8pXG52YXIgJGtleXMgICAgICAgPSByZXF1aXJlKCcuL19vYmplY3Qta2V5cy1pbnRlcm5hbCcpXG4gICwgZW51bUJ1Z0tleXMgPSByZXF1aXJlKCcuL19lbnVtLWJ1Zy1rZXlzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gT2JqZWN0LmtleXMgfHwgZnVuY3Rpb24ga2V5cyhPKXtcbiAgcmV0dXJuICRrZXlzKE8sIGVudW1CdWdLZXlzKTtcbn07IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihiaXRtYXAsIHZhbHVlKXtcbiAgcmV0dXJuIHtcbiAgICBlbnVtZXJhYmxlICA6ICEoYml0bWFwICYgMSksXG4gICAgY29uZmlndXJhYmxlOiAhKGJpdG1hcCAmIDIpLFxuICAgIHdyaXRhYmxlICAgIDogIShiaXRtYXAgJiA0KSxcbiAgICB2YWx1ZSAgICAgICA6IHZhbHVlXG4gIH07XG59OyIsInZhciBzaGFyZWQgPSByZXF1aXJlKCcuL19zaGFyZWQnKSgna2V5cycpXG4gICwgdWlkICAgID0gcmVxdWlyZSgnLi9fdWlkJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGtleSl7XG4gIHJldHVybiBzaGFyZWRba2V5XSB8fCAoc2hhcmVkW2tleV0gPSB1aWQoa2V5KSk7XG59OyIsInZhciBnbG9iYWwgPSByZXF1aXJlKCcuL19nbG9iYWwnKVxuICAsIFNIQVJFRCA9ICdfX2NvcmUtanNfc2hhcmVkX18nXG4gICwgc3RvcmUgID0gZ2xvYmFsW1NIQVJFRF0gfHwgKGdsb2JhbFtTSEFSRURdID0ge30pO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihrZXkpe1xuICByZXR1cm4gc3RvcmVba2V5XSB8fCAoc3RvcmVba2V5XSA9IHt9KTtcbn07IiwidmFyIHRvSW50ZWdlciA9IHJlcXVpcmUoJy4vX3RvLWludGVnZXInKVxuICAsIG1heCAgICAgICA9IE1hdGgubWF4XG4gICwgbWluICAgICAgID0gTWF0aC5taW47XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGluZGV4LCBsZW5ndGgpe1xuICBpbmRleCA9IHRvSW50ZWdlcihpbmRleCk7XG4gIHJldHVybiBpbmRleCA8IDAgPyBtYXgoaW5kZXggKyBsZW5ndGgsIDApIDogbWluKGluZGV4LCBsZW5ndGgpO1xufTsiLCIvLyA3LjEuNCBUb0ludGVnZXJcbnZhciBjZWlsICA9IE1hdGguY2VpbFxuICAsIGZsb29yID0gTWF0aC5mbG9vcjtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gaXNOYU4oaXQgPSAraXQpID8gMCA6IChpdCA+IDAgPyBmbG9vciA6IGNlaWwpKGl0KTtcbn07IiwiLy8gdG8gaW5kZXhlZCBvYmplY3QsIHRvT2JqZWN0IHdpdGggZmFsbGJhY2sgZm9yIG5vbi1hcnJheS1saWtlIEVTMyBzdHJpbmdzXG52YXIgSU9iamVjdCA9IHJlcXVpcmUoJy4vX2lvYmplY3QnKVxuICAsIGRlZmluZWQgPSByZXF1aXJlKCcuL19kZWZpbmVkJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIElPYmplY3QoZGVmaW5lZChpdCkpO1xufTsiLCIvLyA3LjEuMTUgVG9MZW5ndGhcbnZhciB0b0ludGVnZXIgPSByZXF1aXJlKCcuL190by1pbnRlZ2VyJylcbiAgLCBtaW4gICAgICAgPSBNYXRoLm1pbjtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gaXQgPiAwID8gbWluKHRvSW50ZWdlcihpdCksIDB4MWZmZmZmZmZmZmZmZmYpIDogMDsgLy8gcG93KDIsIDUzKSAtIDEgPT0gOTAwNzE5OTI1NDc0MDk5MVxufTsiLCIvLyA3LjEuMSBUb1ByaW1pdGl2ZShpbnB1dCBbLCBQcmVmZXJyZWRUeXBlXSlcbnZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vX2lzLW9iamVjdCcpO1xuLy8gaW5zdGVhZCBvZiB0aGUgRVM2IHNwZWMgdmVyc2lvbiwgd2UgZGlkbid0IGltcGxlbWVudCBAQHRvUHJpbWl0aXZlIGNhc2Vcbi8vIGFuZCB0aGUgc2Vjb25kIGFyZ3VtZW50IC0gZmxhZyAtIHByZWZlcnJlZCB0eXBlIGlzIGEgc3RyaW5nXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0LCBTKXtcbiAgaWYoIWlzT2JqZWN0KGl0KSlyZXR1cm4gaXQ7XG4gIHZhciBmbiwgdmFsO1xuICBpZihTICYmIHR5cGVvZiAoZm4gPSBpdC50b1N0cmluZykgPT0gJ2Z1bmN0aW9uJyAmJiAhaXNPYmplY3QodmFsID0gZm4uY2FsbChpdCkpKXJldHVybiB2YWw7XG4gIGlmKHR5cGVvZiAoZm4gPSBpdC52YWx1ZU9mKSA9PSAnZnVuY3Rpb24nICYmICFpc09iamVjdCh2YWwgPSBmbi5jYWxsKGl0KSkpcmV0dXJuIHZhbDtcbiAgaWYoIVMgJiYgdHlwZW9mIChmbiA9IGl0LnRvU3RyaW5nKSA9PSAnZnVuY3Rpb24nICYmICFpc09iamVjdCh2YWwgPSBmbi5jYWxsKGl0KSkpcmV0dXJuIHZhbDtcbiAgdGhyb3cgVHlwZUVycm9yKFwiQ2FuJ3QgY29udmVydCBvYmplY3QgdG8gcHJpbWl0aXZlIHZhbHVlXCIpO1xufTsiLCJ2YXIgaWQgPSAwXG4gICwgcHggPSBNYXRoLnJhbmRvbSgpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihrZXkpe1xuICByZXR1cm4gJ1N5bWJvbCgnLmNvbmNhdChrZXkgPT09IHVuZGVmaW5lZCA/ICcnIDoga2V5LCAnKV8nLCAoKytpZCArIHB4KS50b1N0cmluZygzNikpO1xufTsiLCJ2YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpXG4vLyAxOS4xLjIuMiAvIDE1LjIuMy41IE9iamVjdC5jcmVhdGUoTyBbLCBQcm9wZXJ0aWVzXSlcbiRleHBvcnQoJGV4cG9ydC5TLCAnT2JqZWN0Jywge2NyZWF0ZTogcmVxdWlyZSgnLi9fb2JqZWN0LWNyZWF0ZScpfSk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgQ2hlY2tvdXRWaWV3TW9kZWxfMSA9IHJlcXVpcmUoXCIuL21vZGVscy9DaGVja291dFZpZXdNb2RlbFwiKTtcbi8qKlxuICogSW5pdGlhbCBhcHBsaWNhdGlvbiBzZXR1cC4gUnVucyBvbmNlIHVwb24gZXZlcnkgcGFnZSBsb2FkLlxuICpcbiAqIEBjbGFzcyBBcHBcbiAqIEBjb25zdHJ1Y3RvclxuICovXG52YXIgQXBwID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBBcHAoKSB7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEluaXRpYWxpemVzIHRoZSBhcHBsaWNhdGlvbiBhbmQga2lja3Mgb2ZmIGxvYWRpbmcgb2YgcHJlcmVxdWlzaXRlcy5cbiAgICAgKlxuICAgICAqIEBtZXRob2QgaW5pdFxuICAgICAqIEBwdWJsaWNcbiAgICAgKi9cbiAgICBBcHAucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIC8vIENyZWF0ZSB5b3VyIHZpZXdzIGhlcmVcbiAgICAgICAgdmFyIGFzZGYgPSBuZXcgQ2hlY2tvdXRWaWV3TW9kZWxfMVtcImRlZmF1bHRcIl0oeyB0ZXN0OiAnJyB9LCB7IGV4cGFuZDogZmFsc2UgfSk7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiQ2hlY2tvdXRWaWV3TW9kZWxcIiwgYXNkZik7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiISEhISEhISBjbG9uZVwiKTtcbiAgICAgICAgdmFyIGNsb25lID0gYXNkZi5jbG9uZSgpO1xuICAgICAgICBjb25zb2xlLmxvZyhcImNsb25lXCIsIGNsb25lKTtcbiAgICB9O1xuICAgIHJldHVybiBBcHA7XG59KCkpO1xuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gQXBwO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9QXBwLmpzLm1hcCIsImltcG9ydCBBcHAgZnJvbSAnLi9BcHAnO1xuXG5jb25zdCBhcHAgPSBuZXcgQXBwKCk7XG5hcHAuaW5pdCgpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07XG4gICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xufTtcbnZhciBCYXNlTW9kZWxfMSA9IHJlcXVpcmUoXCIuLi8uLi8uLi8uLi8uLi8uLi90cy9tb2RlbC9CYXNlTW9kZWxcIik7XG52YXIgSW5wdXRNb2RlbF8xID0gcmVxdWlyZShcIi4vZm9ybS9JbnB1dE1vZGVsXCIpO1xuLyoqXG4gKiBAY2xhc3MgQ2hlY2tvdXRWaWV3TW9kZWxcbiAqIEBleHRlbmRzIEFwaUJhc2VNb2RlbFxuICogQGNvbnN0cnVjdG9yXG4gKiovXG52YXIgQ2hlY2tvdXRWaWV3TW9kZWwgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhDaGVja291dFZpZXdNb2RlbCwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBDaGVja291dFZpZXdNb2RlbChkYXRhLCBvcHRzKSB7XG4gICAgICAgIGlmIChkYXRhID09PSB2b2lkIDApIHsgZGF0YSA9IHt9OyB9XG4gICAgICAgIGlmIChvcHRzID09PSB2b2lkIDApIHsgb3B0cyA9IHt9OyB9XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMsIG9wdHMpIHx8IHRoaXM7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAcHJvcGVydHkgcGlja0hvd09wdGlvbnNcbiAgICAgICAgICogQHR5cGUge0FycmF5PHt9Pn1cbiAgICAgICAgICogQHB1YmxpY1xuICAgICAgICAgKi9cbiAgICAgICAgX3RoaXMucGlja0hvd09wdGlvbnMgPSBbXG4gICAgICAgICAgICBuZXcgSW5wdXRNb2RlbF8xW1wiZGVmYXVsdFwiXSh7XG4gICAgICAgICAgICAgICAgaWQ6ICdvbmUnXG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIG5ldyBJbnB1dE1vZGVsXzFbXCJkZWZhdWx0XCJdKHtcbiAgICAgICAgICAgICAgICBpZDogJ3R3bydcbiAgICAgICAgICAgIH0pLFxuICAgICAgICBdO1xuICAgICAgICBfdGhpcy50ZXN0ID0gSW5wdXRNb2RlbF8xW1wiZGVmYXVsdFwiXTtcbiAgICAgICAgX3RoaXMudGVzdEFycmF5ID0gW0lucHV0TW9kZWxfMVtcImRlZmF1bHRcIl1dO1xuICAgICAgICBpZiAoZGF0YSkge1xuICAgICAgICAgICAgX3RoaXMudXBkYXRlKGRhdGEpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogQG92ZXJyaWRkZW4gQXBpQmFzZU1vZGVsLnVwZGF0ZVxuICAgICAqL1xuICAgIENoZWNrb3V0Vmlld01vZGVsLnByb3RvdHlwZS51cGRhdGUgPSBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICBfc3VwZXIucHJvdG90eXBlLnVwZGF0ZS5jYWxsKHRoaXMsIGRhdGEpO1xuICAgICAgICAvLyBPdmVycmlkZSBhbnkgdmFsdWVzIGFmdGVyIHRoZSBkZWZhdWx0IHN1cGVyIHVwZGF0ZSBtZXRob2QgaGFzIHNldCB0aGUgdmFsdWVzLlxuICAgIH07XG4gICAgcmV0dXJuIENoZWNrb3V0Vmlld01vZGVsO1xufShCYXNlTW9kZWxfMVtcImRlZmF1bHRcIl0pKTtcbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IENoZWNrb3V0Vmlld01vZGVsO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Q2hlY2tvdXRWaWV3TW9kZWwuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07XG4gICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xufTtcbnZhciBCYXNlTW9kZWxfMSA9IHJlcXVpcmUoXCIuLi8uLi8uLi8uLi8uLi8uLi8uLi90cy9tb2RlbC9CYXNlTW9kZWxcIik7XG4vKipcbiAqIEBjbGFzcyBJbnB1dE1vZGVsXG4gKiBAZXh0ZW5kcyBCYXNlTW9kZWxcbiAqIEBjb25zdHJ1Y3RvclxuICoqL1xudmFyIElucHV0TW9kZWwgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhJbnB1dE1vZGVsLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIElucHV0TW9kZWwoZGF0YSwgb3B0cykge1xuICAgICAgICBpZiAoZGF0YSA9PT0gdm9pZCAwKSB7IGRhdGEgPSB7fTsgfVxuICAgICAgICBpZiAob3B0cyA9PT0gdm9pZCAwKSB7IG9wdHMgPSB7fTsgfVxuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzLCBvcHRzKSB8fCB0aGlzO1xuICAgICAgICAvKipcbiAgICAgICAgICogQHByb3BlcnR5IGlkXG4gICAgICAgICAqIEB0eXBlIHtzdHJpbmd9XG4gICAgICAgICAqIEBwdWJsaWNcbiAgICAgICAgICovXG4gICAgICAgIF90aGlzLmlkID0gbnVsbDtcbiAgICAgICAgaWYgKGRhdGEpIHtcbiAgICAgICAgICAgIF90aGlzLnVwZGF0ZShkYXRhKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEBvdmVycmlkZGVuIEJhc2VNb2RlbC51cGRhdGVcbiAgICAgKi9cbiAgICBJbnB1dE1vZGVsLnByb3RvdHlwZS51cGRhdGUgPSBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICBfc3VwZXIucHJvdG90eXBlLnVwZGF0ZS5jYWxsKHRoaXMsIGRhdGEpO1xuICAgICAgICAvLyBPdmVycmlkZSBhbnkgdmFsdWVzIGFmdGVyIHRoZSBkZWZhdWx0IHN1cGVyIHVwZGF0ZSBtZXRob2QgaGFzIHNldCB0aGUgdmFsdWVzLlxuICAgIH07XG4gICAgcmV0dXJuIElucHV0TW9kZWw7XG59KEJhc2VNb2RlbF8xW1wiZGVmYXVsdFwiXSkpO1xuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gSW5wdXRNb2RlbDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPUlucHV0TW9kZWwuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgVXRpbF8xID0gcmVxdWlyZShcIi4vdXRpbC9VdGlsXCIpO1xuLyoqXG4gKiBUaGUge3sjY3Jvc3NMaW5rIFwiQmFzZU9iamVjdFwifX17ey9jcm9zc0xpbmt9fSBjbGFzcyBpcyBhbiBhYnN0cmFjdCBjbGFzcyB0aGF0IHByb3ZpZGVzIGNvbW1vbiBwcm9wZXJ0aWVzIGFuZCBmdW5jdGlvbmFsaXR5IGZvciBhbGwgU3RydWN0dXJlSlMgY2xhc3Nlcy5cbiAqXG4gKiBAY2xhc3MgQmFzZU9iamVjdFxuICogQG1vZHVsZSBTdHJ1Y3R1cmVKU1xuICogQHN1Ym1vZHVsZSBjb3JlXG4gKiBAcmVxdWlyZXMgVXRpbFxuICogQGNvbnN0cnVjdG9yXG4gKiBAYXV0aG9yIFJvYmVydCBTLiAod3d3LmNvZGVCZWx0LmNvbSlcbiAqL1xudmFyIEJhc2VPYmplY3QgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIEJhc2VPYmplY3QoKSB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgc2pzSWQgKFN0cnVjdHVyZUpTIElEKSBpcyBhIHVuaXF1ZSBpZGVudGlmaWVyIGF1dG9tYXRpY2FsbHkgYXNzaWduZWQgdG8gbW9zdCBTdHJ1Y3R1cmVKUyBvYmplY3RzIHVwb24gaW5zdGFudGlhdGlvbi5cbiAgICAgICAgICpcbiAgICAgICAgICogQHByb3BlcnR5IHNqc0lkXG4gICAgICAgICAqIEB0eXBlIHtpbnR9XG4gICAgICAgICAqIEBkZWZhdWx0IG51bGxcbiAgICAgICAgICogQHdyaXRlT25jZVxuICAgICAgICAgKiBAcmVhZE9ubHlcbiAgICAgICAgICogQHB1YmxpY1xuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5zanNJZCA9IG51bGw7XG4gICAgICAgIHRoaXMuc2pzSWQgPSBVdGlsXzFbXCJkZWZhdWx0XCJdLnVuaXF1ZUlkKCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIGZ1bGx5IHF1YWxpZmllZCBjbGFzcyBuYW1lIG9mIGFuIG9iamVjdC5cbiAgICAgKlxuICAgICAqIEBtZXRob2QgZ2V0UXVhbGlmaWVkQ2xhc3NOYW1lXG4gICAgICogQHJldHVybnMge3N0cmluZ30gUmV0dXJucyB0aGUgY2xhc3MgbmFtZS5cbiAgICAgKiBAcHVibGljXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiAgICAgbGV0IHNvbWVDbGFzcyA9IG5ldyBTb21lQ2xhc3MoKTtcbiAgICAgKiAgICAgc29tZUNsYXNzLmdldFF1YWxpZmllZENsYXNzTmFtZSgpO1xuICAgICAqXG4gICAgICogICAgIC8vIFNvbWVDbGFzc1xuICAgICAqL1xuICAgIEJhc2VPYmplY3QucHJvdG90eXBlLmdldFF1YWxpZmllZENsYXNzTmFtZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIFV0aWxfMVtcImRlZmF1bHRcIl0uZ2V0TmFtZSh0aGlzKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFRoZSBwdXJwb3NlIG9mIHRoZSBkZXN0cm95IG1ldGhvZCBpcyB0byBtYWtlIGFuIG9iamVjdCByZWFkeSBmb3IgZ2FyYmFnZSBjb2xsZWN0aW9uLiBUaGlzXG4gICAgICogc2hvdWxkIGJlIHRob3VnaHQgb2YgYXMgYSBvbmUgd2F5IGZ1bmN0aW9uLiBPbmNlIGRlc3Ryb3kgaXMgY2FsbGVkIG5vIGZ1cnRoZXIgbWV0aG9kcyBzaG91bGQgYmVcbiAgICAgKiBjYWxsZWQgb24gdGhlIG9iamVjdCBvciBwcm9wZXJ0aWVzIGFjY2Vzc2VkLiBJdCBpcyB0aGUgcmVzcG9uc2liaWxpdHkgb2YgdGhvc2Ugd2hvIGltcGxlbWVudCB0aGlzXG4gICAgICogZnVuY3Rpb24gdG8gc3RvcCBhbGwgcnVubmluZyBUaW1lcnMsIGFsbCBydW5uaW5nIFNvdW5kcywgYW5kIHRha2UgYW55IG90aGVyIHN0ZXBzIG5lY2Vzc2FyeSB0byBtYWtlIGFuXG4gICAgICogb2JqZWN0IGVsaWdpYmxlIGZvciBnYXJiYWdlIGNvbGxlY3Rpb24uXG4gICAgICpcbiAgICAgKiBCeSBkZWZhdWx0IHRoZSBkZXN0cm95IG1ldGhvZCB3aWxsIG51bGwgb3V0IGFsbCBwcm9wZXJ0aWVzIG9mIHRoZSBjbGFzcyBhdXRvbWF0aWNhbGx5LiBZb3Ugc2hvdWxkIGNhbGwgZGVzdHJveVxuICAgICAqIG9uIG90aGVyIG9iamVjdHMgYmVmb3JlIGNhbGxpbmcgdGhlIHN1cGVyLlxuICAgICAqXG4gICAgICogQG1ldGhvZCBkZXN0cm95XG4gICAgICogQHJldHVybiB7dm9pZH1cbiAgICAgKiBAcHVibGljXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiAgICAgZGVzdHJveSgpIHtcbiAgICAgKiAgICAgICAgICB0aGlzLmRpc2FibGUoKTtcbiAgICAgKlxuICAgICAqICAgICAgICAgIHRoaXMuX2NoaWxkSW5zdGFuY2UuZGVzdHJveSgpO1xuICAgICAqXG4gICAgICogICAgICAgICAgc3VwZXIuZGVzdHJveSgpO1xuICAgICAqICAgICB9XG4gICAgICovXG4gICAgQmFzZU9iamVjdC5wcm90b3R5cGUuZGVzdHJveSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZm9yICh2YXIga2V5IGluIHRoaXMpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmhhc093blByb3BlcnR5KGtleSkgJiYga2V5ICE9PSAnc2pzSWQnKSB7XG4gICAgICAgICAgICAgICAgdGhpc1trZXldID0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIEJhc2VPYmplY3Q7XG59KCkpO1xuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gQmFzZU9iamVjdDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPUJhc2VPYmplY3QuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07XG4gICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xufTtcbnZhciBCYXNlT2JqZWN0XzEgPSByZXF1aXJlKFwiLi4vQmFzZU9iamVjdFwiKTtcbnZhciBVdGlsXzEgPSByZXF1aXJlKFwiLi4vdXRpbC9VdGlsXCIpO1xuLyoqXG4gKiAgQmFzZSBNb2RlbCBpcyBhIGRlc2lnbiBwYXR0ZXJuIHVzZWQgdG8gdHJhbnNmZXIgZGF0YSBiZXR3ZWVuIHNvZnR3YXJlIGFwcGxpY2F0aW9uIHN1YnN5c3RlbXMuXG4gKlxuICogTm90ZTogSWYgdGhlIGRhdGEgZG9lc24ndCBtYXRjaCB0aGUgcHJvcGVydHkgbmFtZXMgeW91IGNhbiBzZXQgdGhlIHZhbHVlIG1hbnVhbGx5IGFmdGVyIHVwZGF0ZSBzdXBlciBtZXRob2QgaGFzIGJlZW4gY2FsbGVkLlxuICogIEFsc28gaW4gdGhlIGNsYXNzIHlvdSBpbmhlcml0IEJhc2VNb2RlbCBmcm9tIHlvdSBjYW4gb3ZlcnJpZGUgdGhlIHVwZGF0ZSBtZXRob2QgdG8gaGFuZGxlIHRoZSBkYXRhIGhvdyB5b3Ugd2FudC5cbiAqXG4gKiBAY2xhc3MgQmFzZU1vZGVsXG4gKiBAZXh0ZW5kcyBCYXNlT2JqZWN0XG4gKiBAcGFyYW0gW2RhdGFdIHthbnl9IFByb3ZpZGUgYSB3YXkgdG8gdXBkYXRlIHRoZSBiYXNlIG1vZGVsIHVwb24gaW5pdGlhbGl6YXRpb24uXG4gKiBAcGFyYW0gW29wdHNdIHt7IGV4cGFuZDpib29sZWFuIH19IE9wdGlvbnMgZm9yIHRoZSBiYXNlIG1vZGVsLlxuICogQG1vZHVsZSBTdHJ1Y3R1cmVKU1xuICogQHN1Ym1vZHVsZSBtb2RlbFxuICogQHJlcXVpcmVzIEV4dGVuZFxuICogQHJlcXVpcmVzIEJhc2VPYmplY3RcbiAqIEByZXF1aXJlcyBVdGlsXG4gKiBAY29uc3RydWN0b3JcbiAqIEBhdXRob3IgUm9iZXJ0IFMuICh3d3cuY29kZUJlbHQuY29tKVxuICogQGV4YW1wbGVcbiAqICAgICAgLy8gRXhhbXBsZSBob3cgdG8gZXh0ZW5kIHRoZSBCYXNlTW9kZWwgY2xhc3MuXG4gKiAgICAgIGxldCBkYXRhID0ge1xuICogICAgICAgICAgICAgIG1ha2U6ICdUZXNsYScsXG4gKiAgICAgICAgICAgICAgbW9kZWw6ICdNb2RlbCBTJyxcbiAqICAgICAgICAgICAgICBZZUFyOiAyMDE0LFxuICogICAgICAgICAgICAgIGZlYXR1cmU6IHtcbiAqICAgICAgICAgICAgICAgICAgYWJzOiB0cnVlLFxuICogICAgICAgICAgICAgICAgICBhaXJiYWdzOiB0cnVlXG4gKiAgICAgICAgICAgICAgfVxuICogICAgICB9XG4gKiAgICAgIGxldCBjYXJNb2RlbCA9IG5ldyBDYXJNb2RlbChkYXRhKTtcbiAqXG4gKlxuICogICAgICAvLyBFeGFtcGxlIGhvdyB0byBleHRlbmQgdGhlIEJhc2VNb2RlbCBjbGFzcy5cbiAqICAgICAgY2xhc3MgQ2FyTW9kZWwgZXh0ZW5kcyBCYXNlTW9kZWwge1xuICpcbiAqICAgICAgICAgIC8vIFlvdSBuZWVkIHRvIGhhdmUgcHJvcGVydGllcyBzbyB0aGUgZGF0YSB3aWxsIGdldCBhc3NpZ25lZC5cbiAqICAgICAgICAgIC8vIElmIG5vdCB0aGUgZGF0YSB3aWxsIG5vdCBnZXQgYXNzaWduZWQgdG8gdGhlIG1vZGVsLlxuICogICAgICAgICAgbWFrZSA9IG51bGw7XG4gKiAgICAgICAgICBtb2RlbCA9IG51bGw7XG4gKiAgICAgICAgICB5ZWFyID0gbnVsbDtcbiAqICAgICAgICAgIGFsbFdoZWVsID0gZmFsc2U7IC8vIFNldCBhIGRlZmF1bHQgdmFsdWVcbiAqXG4gKiAgICAgICAgICAvLyBZb3UgY2FuIGFzc2lnbiBCYXNlTW9kZWwgdG8gYSBwcm9wZXJ0eSB3aGljaCB3aWxsXG4gKiAgICAgICAgICAvLyBhdXRvbWF0aWNhbGx5IGNyZWF0ZWQgaXQgYW5kIHBhc3MgdGhlIGRhdGEgdG8gaXQuXG4gKiAgICAgICAgICBmZWF0dXJlID0gRmVhdHVyZU1vZGVsXG4gKlxuICogICAgICAgICAgLy8gSWYgeW91IGhhdmUgYW4gYXJyYXkgb2YgZGF0YSBhbmQgd2FudCB0aGVtIGFzc2lnbiB0byBhIEJhc2VNb2RlbC5cbiAqICAgICAgICAgIGZlYXR1cmUgPSBbRmVhdHVyZU1vZGVsXTtcbiAqXG4gKiAgICAgICAgICBjb25zdHJ1Y3RvcihkYXRhID0ge30sIG9wdHMgPSB7fSkge1xuICogICAgICAgICAgICAgIHN1cGVyKG9wdHMpO1xuICpcbiAqICAgICAgICAgICAgICBpZiAoZGF0YSkge1xuICogICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZShkYXRhKTtcbiAqICAgICAgICAgICAgICB9XG4gKiAgICAgICAgICB9XG4gKlxuICogICAgICAgICAgLy8gQG92ZXJyaWRkZW4gQmFzZU1vZGVsLnVwZGF0ZVxuICogICAgICAgICAgdXBkYXRlKGRhdGEpIHtcbiAqICAgICAgICAgICAgICBzdXBlci51cGRhdGUoZGF0YSk7XG4gKlxuICogICAgICAgICAgICAgIC8vIElmIHRoZSBkYXRhIGRvZXNuJ3QgbWF0Y2ggdGhlIHByb3BlcnR5IG5hbWUuXG4gKiAgICAgICAgICAgICAgLy8gWW91IGNhbiBzZXQgdGhlIHZhbHVlKHMpIG1hbnVhbGx5IGFmdGVyIHRoZSB1cGRhdGUgc3VwZXIgbWV0aG9kIGhhcyBiZWVuIGNhbGxlZC5cbiAqICAgICAgICAgICAgICB0aGlzLnllYXIgPSBkYXRhLlllQXI7XG4gKiAgICAgICAgICB9XG4gKiAgICAgIH1cbiAqL1xudmFyIEJhc2VNb2RlbCA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKEJhc2VNb2RlbCwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBCYXNlTW9kZWwob3B0cykge1xuICAgICAgICBpZiAob3B0cyA9PT0gdm9pZCAwKSB7IG9wdHMgPSB7fTsgfVxuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzKSB8fCB0aGlzO1xuICAgICAgICAvKipcbiAgICAgICAgICogQHByb3BlcnR5IHNqc09wdGlvbnNcbiAgICAgICAgICogQHR5cGUge0lCYXNlTW9kZWxPcHRpb25zfX1cbiAgICAgICAgICogQHB1YmxpY1xuICAgICAgICAgKi9cbiAgICAgICAgX3RoaXMuc2pzT3B0aW9ucyA9IHtcbiAgICAgICAgICAgIGV4cGFuZDogZmFsc2VcbiAgICAgICAgfTtcbiAgICAgICAgX3RoaXMuc2pzT3B0aW9ucy5leHBhbmQgPSBvcHRzLmV4cGFuZCA9PT0gdHJ1ZTtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBQcm92aWRlIGEgd2F5IHRvIHVwZGF0ZSB0aGUgIEJhc2UgTW9kZWwuXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIHVwZGF0ZVxuICAgICAqIEBwYXJhbSBbZGF0YT17fV0ge2FueX1cbiAgICAgKiBAcHVibGljXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiAgICAgLy8gRXhhbXBsZSBvZiB1cGRhdGluZyBzb21lIG9mIHRoZSBkYXRhOlxuICAgICAqICAgICBjYXJNb2RlbC51cGRhdGUoeyB5ZWFyOiAyMDE1LCBhbGxXaGVlbDogdHJ1ZX0pO1xuICAgICAqXG4gICAgICogICAgIC8vIE9mIGNvdXJzZSB5b3UgY2FuIGFsc28gZG8gaXQgdGhlIGZvbGxvd2luZyB3YXk6XG4gICAgICogICAgIGNhck1vZGVsLnllYXIgPSAyMDE1O1xuICAgICAqICAgICBjYXJNb2RlbC5hbGxXaGVlbCA9IGZhbHNlO1xuICAgICAqL1xuICAgIEJhc2VNb2RlbC5wcm90b3R5cGUudXBkYXRlID0gZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgaWYgKGRhdGEgPT09IHZvaWQgMCkgeyBkYXRhID0ge307IH1cbiAgICAgICAgT2JqZWN0XG4gICAgICAgICAgICAua2V5cyh0aGlzKVxuICAgICAgICAgICAgLmZvckVhY2goZnVuY3Rpb24gKHByb3BlcnR5TmFtZSkge1xuICAgICAgICAgICAgLy8gSWdub3JlIHRoZSBzanNJZCBwcm9wZXJ0eSBiZWNhdXNlIGl0IGlzIHNldCBpbiB0aGUgQmFzZU9iamVjdCBjb25zdHJ1Y3RvciBhbmQgd2UgZG9uJ3Qgd2FudCB0byB1cGRhdGUgaXQuXG4gICAgICAgICAgICBpZiAocHJvcGVydHlOYW1lICE9PSAnc2pzSWQnKSB7XG4gICAgICAgICAgICAgICAgdmFyIHByb3BlcnR5RGF0YSA9IF90aGlzW3Byb3BlcnR5TmFtZV07XG4gICAgICAgICAgICAgICAgdmFyIHVwZGF0ZURhdGEgPSBkYXRhW3Byb3BlcnR5TmFtZV07XG4gICAgICAgICAgICAgICAgdmFyIGRhdGFUb1VzZSA9ICh1cGRhdGVEYXRhICE9PSB2b2lkIDApID8gdXBkYXRlRGF0YSA6IHByb3BlcnR5RGF0YTtcbiAgICAgICAgICAgICAgICBfdGhpcy5fdXBkYXRlUHJvcGVydHlXaXRoRGF0YVBhc3NlZEluKHByb3BlcnR5TmFtZSwgZGF0YVRvVXNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogQWRkcyB0aGUgdXBkYXRlRGF0YSB0byB0aGUgcHJvcGVydHlcbiAgICAgKlxuICAgICAqIEBtZXRob2QgX3VwZGF0ZVByb3BlcnR5V2l0aERhdGFQYXNzZWRJblxuICAgICAqIEBwYXJhbSBwcm9wZXJ0eU5hbWVcbiAgICAgKiBAcGFyYW0gdXBkYXRlRGF0YVxuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICBCYXNlTW9kZWwucHJvdG90eXBlLl91cGRhdGVQcm9wZXJ0eVdpdGhEYXRhUGFzc2VkSW4gPSBmdW5jdGlvbiAocHJvcGVydHlOYW1lLCB1cGRhdGVEYXRhKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIC8vIElmIHRoZSBjdXJyZW50IHByb3BlcnR5IG9uIHRoZSBtb2RlbCBpcyBhbiBhcnJheSBhbmQgdGhlIHVwZGF0ZURhdGEgaXMgYW4gYXJyYXkuXG4gICAgICAgIGlmICgodGhpc1twcm9wZXJ0eU5hbWVdIGluc3RhbmNlb2YgQXJyYXkgPT09IHRydWUpICYmICh1cGRhdGVEYXRhIGluc3RhbmNlb2YgQXJyYXkgPT09IHRydWUpKSB7XG4gICAgICAgICAgICB2YXIgaXNQcm9wZXJ0eURhdGFWYWx1ZUFuVW5pbnN0YW50aWF0ZWRCYXNlTW9kZWwgPSAodHlwZW9mIHRoaXNbcHJvcGVydHlOYW1lXVswXSA9PT0gJ2Z1bmN0aW9uJyAmJiB0aGlzW3Byb3BlcnR5TmFtZV1bMF0uSVNfQkFTRV9NT0RFTCA9PT0gdHJ1ZSk7XG4gICAgICAgICAgICB2YXIgaXNVcGRhdGVEYXRhVmFsdWVBblVuaW5zdGFudGlhdGVkQmFzZU1vZGVsID0gKHR5cGVvZiB1cGRhdGVEYXRhWzBdID09PSAnZnVuY3Rpb24nICYmIHVwZGF0ZURhdGFbMF0uSVNfQkFTRV9NT0RFTCA9PT0gdHJ1ZSk7XG4gICAgICAgICAgICBpZiAoaXNQcm9wZXJ0eURhdGFWYWx1ZUFuVW5pbnN0YW50aWF0ZWRCYXNlTW9kZWwgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgdGhpc1twcm9wZXJ0eU5hbWVdID0gdXBkYXRlRGF0YS5tYXAoZnVuY3Rpb24gKGRhdGEpIHsgcmV0dXJuIF90aGlzLl91cGRhdGVEYXRhKG51bGwsIGRhdGEpOyB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGlzUHJvcGVydHlEYXRhVmFsdWVBblVuaW5zdGFudGlhdGVkQmFzZU1vZGVsID09PSB0cnVlICYmIGlzVXBkYXRlRGF0YVZhbHVlQW5Vbmluc3RhbnRpYXRlZEJhc2VNb2RlbCA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICAvLyBJZiB0aGUgcHJvcGVydHkgZGF0YSBpcyBhbiB1bmluc3RhbnRpYXRlZCBCYXNlTW9kZWwgdGhlbiB3ZSBhc3N1bWUgdGhlIHVwZGF0ZSBkYXRhIHBhc3NlZCBpblxuICAgICAgICAgICAgICAgIC8vIG5lZWRzIHRvIGJlIGNyZWF0ZSBhcyB0aGF0IEJhc2VNb2RlbCBDbGFzcy5cbiAgICAgICAgICAgICAgICB2YXIgYmFzZU1vZGVsXzEgPSB0aGlzW3Byb3BlcnR5TmFtZV1bMF07XG4gICAgICAgICAgICAgICAgdGhpc1twcm9wZXJ0eU5hbWVdID0gdXBkYXRlRGF0YS5tYXAoZnVuY3Rpb24gKGRhdGEpIHsgcmV0dXJuIF90aGlzLl91cGRhdGVEYXRhKGJhc2VNb2RlbF8xLCBkYXRhKTsgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzW3Byb3BlcnR5TmFtZV0gPSBbXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXNbcHJvcGVydHlOYW1lXSA9IHRoaXMuX3VwZGF0ZURhdGEodGhpc1twcm9wZXJ0eU5hbWVdLCB1cGRhdGVEYXRhKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgLyoqXG4gICAgICogQG1ldGhvZCBfdXBkYXRlRGF0YVxuICAgICAqIEBwYXJhbSBwcm9wZXJ0eURhdGFcbiAgICAgKiBAcGFyYW0gdXBkYXRlRGF0YVxuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICBCYXNlTW9kZWwucHJvdG90eXBlLl91cGRhdGVEYXRhID0gZnVuY3Rpb24gKHByb3BlcnR5RGF0YSwgdXBkYXRlRGF0YSkge1xuICAgICAgICB2YXIgcmV0dXJuRGF0YSA9IG51bGw7XG4gICAgICAgIGlmICh0aGlzLnNqc09wdGlvbnMuZXhwYW5kID09PSBmYWxzZSAmJiB0eXBlb2YgdXBkYXRlRGF0YSA9PT0gJ2Z1bmN0aW9uJyAmJiB1cGRhdGVEYXRhLklTX0JBU0VfTU9ERUwgPT09IHRydWUpIHtcbiAgICAgICAgICAgIC8vIElmIHVwZGF0ZURhdGEgaXMgYSBmdW5jdGlvbiBhbmQgaGFzIGFuIElTX0JBU0VfTU9ERUwgc3RhdGljIHByb3BlcnR5IHRoZW4gaXQgbXVzdCBiZSBhIGNoaWxkIG1vZGVsIGFuZCB3ZSBuZWVkIHRvIHJldHVybiBudWxsXG4gICAgICAgICAgICAvLyBzbyBpdCBjbGVhbnMgdXAgdGhlIEJhc2VNb2RlbCBmdW5jdGlvbnMgb24gdGhlIHByb3BlcnR5LlxuICAgICAgICAgICAgLy8gVG8gY3JlYXRlIGVtcHR5IG1vZGVsKHMpIHBhc3MgeyBleHBhbmQ6IHRydWUgfSBmb3IgdGhlIG9wdGlvbnMuXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBpZiAodHlwZW9mIHByb3BlcnR5RGF0YSA9PT0gJ2Z1bmN0aW9uJyAmJiBwcm9wZXJ0eURhdGEuSVNfQkFTRV9NT0RFTCA9PT0gdHJ1ZSAmJiB1cGRhdGVEYXRhKSB7XG4gICAgICAgICAgICAvLyBJZiB0aGUgcHJvcGVydHlEYXRhIGlzIGFuIGluc3RhbmNlIG9mIGEgQmFzZU1vZGVsIGNsYXNzIGFuZCBoYXMgbm90IGJlZW4gY3JlYXRlZCB5ZXQuXG4gICAgICAgICAgICAvLyBJbnN0YW50aWF0ZSBpdCBhbmQgcGFzcyBpbiB0aGUgdXBkYXRlRGF0YSB0byB0aGUgY29uc3RydWN0b3IuXG4gICAgICAgICAgICByZXR1cm5EYXRhID0gbmV3IHByb3BlcnR5RGF0YSh1cGRhdGVEYXRhLCB0aGlzLnNqc09wdGlvbnMpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKChwcm9wZXJ0eURhdGEgaW5zdGFuY2VvZiBCYXNlTW9kZWwpID09PSB0cnVlKSB7XG4gICAgICAgICAgICAvLyBJZiBwcm9wZXJ0eURhdGEgaXMgYW4gaW5zdGFuY2Ugb2YgYSBCYXNlTW9kZWwgY2xhc3MgYW5kIGhhcyBhbHJlYWR5IGJlZW4gY3JlYXRlZC5cbiAgICAgICAgICAgIC8vIENhbGwgdGhlIHVwZGF0ZSBtZXRob2QgYW5kIHBhc3MgaW4gdGhlIHVwZGF0ZURhdGEuXG4gICAgICAgICAgICByZXR1cm5EYXRhID0gcHJvcGVydHlEYXRhLnVwZGF0ZSh1cGRhdGVEYXRhKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICgodXBkYXRlRGF0YSBpbnN0YW5jZW9mIEJhc2VNb2RlbCkgPT09IHRydWUpIHtcbiAgICAgICAgICAgIHJldHVybkRhdGEgPSB1cGRhdGVEYXRhLmNsb25lKCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAvLyBFbHNlIGp1c3QgcmV0dXJuIHRoZSB1cGRhdGVEYXRhIHRvIHRoZSBwcm9wZXJ0eS5cbiAgICAgICAgICAgIHJldHVybkRhdGEgPSB1cGRhdGVEYXRhO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXR1cm5EYXRhO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogQ29udmVydHMgdGhlIEJhc2UgTW9kZWwgZGF0YSBpbnRvIGEgSlNPTiBvYmplY3QgYW5kIGRlbGV0ZXMgdGhlIHNqc0lkIHByb3BlcnR5LlxuICAgICAqXG4gICAgICogQG1ldGhvZCB0b0pTT05cbiAgICAgKiBAcmV0dXJucyB7YW55fVxuICAgICAqIEBwdWJsaWNcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqICAgICBjb25zdCBvYmogPSBjYXJNb2RlbC50b0pTT04oKTtcbiAgICAgKi9cbiAgICBCYXNlTW9kZWwucHJvdG90eXBlLnRvSlNPTiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGNsb25lID0gVXRpbF8xW1wiZGVmYXVsdFwiXS5jbG9uZSh0aGlzKTtcbiAgICAgICAgcmV0dXJuIFV0aWxfMVtcImRlZmF1bHRcIl0uZGVsZXRlUHJvcGVydHlGcm9tT2JqZWN0KGNsb25lLCBbJ3Nqc0lkJywgJ3Nqc09wdGlvbnMnXSk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBDb252ZXJ0cyBhICBCYXNlIE1vZGVsIHRvIGEgSlNPTiBzdHJpbmcsXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIHRvSlNPTlN0cmluZ1xuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XG4gICAgICogQHB1YmxpY1xuICAgICAqIEBleGFtcGxlXG4gICAgICogICAgIGNvbnN0IHN0ciA9IGNhck1vZGVsLnRvSlNPTlN0cmluZygpO1xuICAgICAqL1xuICAgIEJhc2VNb2RlbC5wcm90b3R5cGUudG9KU09OU3RyaW5nID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkodGhpcy50b0pTT04oKSk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBDb252ZXJ0cyB0aGUgc3RyaW5nIGpzb24gZGF0YSBpbnRvIGFuIE9iamVjdCBhbmQgY2FsbHMgdGhlIHt7I2Nyb3NzTGluayBcIkJhc2VNb2RlbC91cGRhdGU6bWV0aG9kXCJ9fXt7L2Nyb3NzTGlua319IG1ldGhvZCB3aXRoIHRoZSBjb252ZXJ0ZWQgT2JqZWN0LlxuICAgICAqXG4gICAgICogQG1ldGhvZCBmcm9tSlNPTlxuICAgICAqIEBwYXJhbSBqc29uIHtzdHJpbmd9XG4gICAgICogQHB1YmxpY1xuICAgICAqIEBleGFtcGxlXG4gICAgICogICAgICBjb25zdCBzdHIgPSAne1wibWFrZVwiOlwiVGVzbGFcIixcIm1vZGVsXCI6XCJNb2RlbCBTXCIsXCJ5ZWFyXCI6MjAxNH0nXG4gICAgICogICAgICBjb25zdCBjYXJNb2RlbCA9IG5ldyBDYXJNb2RlbCgpO1xuICAgICAqICAgICAgY2FyTW9kZWwuZnJvbUpTT04oc3RyKTtcbiAgICAgKi9cbiAgICBCYXNlTW9kZWwucHJvdG90eXBlLmZyb21KU09OID0gZnVuY3Rpb24gKGpzb24pIHtcbiAgICAgICAgdmFyIHBhcnNlZERhdGEgPSBKU09OLnBhcnNlKGpzb24pO1xuICAgICAgICB0aGlzLnVwZGF0ZShwYXJzZWREYXRhKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBDcmVhdGUgYSBjbG9uZS9jb3B5IG9mIHRoZSAgQmFzZSBNb2RlbC5cbiAgICAgKlxuICAgICAqIEBtZXRob2QgY2xvbmVcbiAgICAgKiBAcmV0dXJucyB7QmFzZU1vZGVsfVxuICAgICAqIEBwdWJsaWNcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqICAgICBjb25zdCBjbG9uZSA9IGNhck1vZGVsLmNsb25lKCk7XG4gICAgICovXG4gICAgQmFzZU1vZGVsLnByb3RvdHlwZS5jbG9uZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGNsb25lZEJhc2VNb2RlbCA9IG5ldyB0aGlzLmNvbnN0cnVjdG9yKHRoaXMpO1xuICAgICAgICByZXR1cm4gY2xvbmVkQmFzZU1vZGVsO1xuICAgIH07XG4gICAgcmV0dXJuIEJhc2VNb2RlbDtcbn0oQmFzZU9iamVjdF8xW1wiZGVmYXVsdFwiXSkpO1xuLyoqXG4gKiBUaGlzIHByb3BlcnR5IGhlbHBzIGRpc3Rpbmd1aXNoIGEgQmFzZU1vZGVsIGZyb20gb3RoZXIgZnVuY3Rpb25zLlxuICpcbiAqIEBwcm9wZXJ0eSBJU19CQVNFX01PREVMXG4gKiBAdHlwZSB7Ym9vbGVhbn1cbiAqIEBwdWJsaWNcbiAqIEBzdGF0aWNcbiAqIEByZWFkb25seVxuICovXG5CYXNlTW9kZWwuSVNfQkFTRV9NT0RFTCA9IHRydWU7XG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBCYXNlTW9kZWw7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1CYXNlTW9kZWwuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG4vKipcbiAqIEEgVXRpbGl0eSBjbGFzcyB0aGF0IGhhcyBzZXZlcmFsIHN0YXRpYyBtZXRob2RzIHRvIGFzc2lzdCBpbiBkZXZlbG9wbWVudC5cbiAqXG4gKiBAY2xhc3MgVXRpbFxuICogQG1vZHVsZSBTdHJ1Y3R1cmVKU1xuICogQHN1Ym1vZHVsZSB1dGlsXG4gKiBAYXV0aG9yIFJvYmVydCBTLiAod3d3LmNvZGVCZWx0LmNvbSlcbiAqIEBzdGF0aWNcbiAqL1xudmFyIFV0aWwgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFV0aWwoKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignW1V0aWxdIERvIG5vdCBpbnN0YW50aWF0ZSB0aGUgVXRpbCBjbGFzcyBiZWNhdXNlIGl0IGlzIGEgc3RhdGljIGNsYXNzLicpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBHZW5lcmF0ZXMgYSB1bmlxdWUgSUQuIElmIGEgcHJlZml4IGlzIHBhc3NlZCBpbiwgdGhlIHZhbHVlIHdpbGwgYmUgYXBwZW5kZWQgdG8gaXQuXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIHVuaXF1ZUlkXG4gICAgICogQHBhcmFtIFtwcmVmaXhdIHtzdHJpbmd9IFRoZSBzdHJpbmcgdmFsdWUgdXNlZCBmb3IgdGhlIHByZWZpeC5cbiAgICAgKiBAcmV0dXJucyB7aW5pdHxzdHJpbmd9IFJldHVybnMgdGhlIHVuaXF1ZSBpZGVudGlmaWVyLlxuICAgICAqIEBwdWJsaWNcbiAgICAgKiBAc3RhdGljXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiAgICAgIGxldCBwcm9wZXJ0eSA9IFV0aWwudW5pcXVlSWQoKTtcbiAgICAgKiAgICAgIC8vIDFcbiAgICAgKlxuICAgICAqICAgICAgbGV0IHByb3BlcnR5ID0gVXRpbC51bmlxdWVJZCgncHJlZml4TmFtZV8nKTtcbiAgICAgKiAgICAgIC8vIHByZWZpeE5hbWVfMVxuICAgICAqL1xuICAgIFV0aWwudW5pcXVlSWQgPSBmdW5jdGlvbiAocHJlZml4KSB7XG4gICAgICAgIGlmIChwcmVmaXggPT09IHZvaWQgMCkgeyBwcmVmaXggPSBudWxsOyB9XG4gICAgICAgIHZhciBpZCA9ICsrVXRpbC5faWRDb3VudGVyO1xuICAgICAgICBpZiAocHJlZml4ICE9IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiBTdHJpbmcocHJlZml4ICsgaWQpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGlkO1xuICAgICAgICB9XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBSZW1vdmVzIGEgbGlzdCBvZiBwcm9wZXJ0aWVzIGZyb20gYW4gb2JqZWN0LlxuICAgICAqXG4gICAgICogQG1ldGhvZCBkZWxldGVQcm9wZXJ0eUZyb21PYmplY3RcbiAgICAgKiBAcGFyYW0gb2JqZWN0IHtPYmplY3R9IFRoZSBvYmplY3QgeW91IHdhbnQgdG8gcmVtb3ZlIHByb3BlcnRpZXMgZnJvbS5cbiAgICAgKiBAcGFyYW0gdmFsdWUge3N0cmluZ3xBcnJheS48c3RyaW5nPn0gQSBwcm9wZXJ0eSBuYW1lIG9yIGFuIGFycmF5IG9mIHByb3BlcnR5IG5hbWVzIHlvdSB3YW50IHRvIHJlbW92ZSBmcm9tIHRoZSBvYmplY3QuXG4gICAgICogQHJldHVybnMge2FueX0gUmV0dXJucyB0aGUgb2JqZWN0IHBhc3NlZCBpbiB3aXRob3V0IHRoZSByZW1vdmVkIHRoZSBwcm9wZXJ0aWVzLlxuICAgICAqIEBwdWJsaWNcbiAgICAgKiBAc3RhdGljXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiAgICAgIGxldCBvYmogPSB7IG5hbWU6ICdSb2JlcnQnLCBnZW5kZXI6ICdtYWxlJywgcGhvbmU6ICc1NTUtNTU1LTU1NTUnIH1cbiAgICAgKlxuICAgICAqICAgICAgVXRpbC5kZWxldGVQcm9wZXJ0eUZyb21PYmplY3Qob2JqLCBbJ3Bob25lJywgJ2dlbmRlciddKTtcbiAgICAgKlxuICAgICAqICAgICAgLy8geyBuYW1lOiAnUm9iZXJ0JyB9XG4gICAgICovXG4gICAgVXRpbC5kZWxldGVQcm9wZXJ0eUZyb21PYmplY3QgPSBmdW5jdGlvbiAob2JqZWN0LCB2YWx1ZSkge1xuICAgICAgICAvLyBJZiBwcm9wZXJ0aWVzIGlzIG5vdCBhbiBhcnJheSB0aGVuIG1ha2UgaXQgYW4gYXJyYXkgb2JqZWN0LlxuICAgICAgICB2YXIgbGlzdCA9ICh2YWx1ZSBpbnN0YW5jZW9mIEFycmF5KSA/IHZhbHVlIDogW3ZhbHVlXTtcbiAgICAgICAgT2JqZWN0XG4gICAgICAgICAgICAua2V5cyhvYmplY3QpXG4gICAgICAgICAgICAuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgICAgICB2YXIgdmFsdWUgPSBvYmplY3Rba2V5XTtcbiAgICAgICAgICAgIGlmIChsaXN0LmluY2x1ZGVzKGtleSkgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICBkZWxldGUgb2JqZWN0W2tleV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICh2YWx1ZSBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICAgICAgICAgICAgdmFsdWUuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkgeyByZXR1cm4gVXRpbC5kZWxldGVQcm9wZXJ0eUZyb21PYmplY3QoaXRlbSwgbGlzdCk7IH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAodmFsdWUgaW5zdGFuY2VvZiBPYmplY3QpIHtcbiAgICAgICAgICAgICAgICBVdGlsLmRlbGV0ZVByb3BlcnR5RnJvbU9iamVjdCh2YWx1ZSwgbGlzdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gb2JqZWN0O1xuICAgIH07XG4gICAgLyoqXG4gICAgICogUmVuYW1lcyBhIHByb3BlcnR5IG5hbWUgb24gYW4gb2JqZWN0LlxuICAgICAqXG4gICAgICogQG1ldGhvZCByZW5hbWVQcm9wZXJ0eU9uT2JqZWN0XG4gICAgICogQHBhcmFtIG9iamVjdCB7T2JqZWN0fSBUaGUgb2JqZWN0IHlvdSB3YW50IHRvIHJlbmFtZSBwcm9wZXJ0aWVzIGZyb20uXG4gICAgICogQHBhcmFtIG9sZE5hbWUge3N0cmluZ31cbiAgICAgKiBAcGFyYW0gbmV3TmFtZSB7c3RyaW5nfVxuICAgICAqIEByZXR1cm5zIHthbnl9IFJldHVybnMgdGhlIG9iamVjdCBwYXNzZWQgaW4gcmVuYW1lZCBwcm9wZXJ0aWVzLlxuICAgICAqIEBwdWJsaWNcbiAgICAgKiBAc3RhdGljXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiAgICAgIGxldCBvYmogPSB7IG5hbWU6ICdSb2JlcnQnLCBnZW5kZXI6ICdtYWxlJywgcGhvbmU6ICc1NTUtNTU1LTU1NTUnIH1cbiAgICAgKlxuICAgICAqICAgICAgVXRpbC5yZW5hbWVQcm9wZXJ0eU9uT2JqZWN0KG9iaiwgJ2dlbmRlcicsICdzZXgnKTtcbiAgICAgKlxuICAgICAqICAgICAgLy8geyBuYW1lOiAnUm9iZXJ0Jywgc2V4OiAnbWFsZScsIHBob25lOiAnNTU1LTU1NS01NTU1JyB9XG4gICAgICovXG4gICAgVXRpbC5yZW5hbWVQcm9wZXJ0eU9uT2JqZWN0ID0gZnVuY3Rpb24gKG9iamVjdCwgb2xkTmFtZSwgbmV3TmFtZSkge1xuICAgICAgICAvLyBDaGVjayBmb3IgdGhlIG9sZCBwcm9wZXJ0eSBuYW1lIHRvIGF2b2lkIGEgUmVmZXJlbmNlRXJyb3IgaW4gc3RyaWN0IG1vZGUuXG4gICAgICAgIGlmIChvYmplY3QuaGFzT3duUHJvcGVydHkob2xkTmFtZSkpIHtcbiAgICAgICAgICAgIG9iamVjdFtuZXdOYW1lXSA9IG9iamVjdFtvbGROYW1lXTtcbiAgICAgICAgICAgIGRlbGV0ZSBvYmplY3Rbb2xkTmFtZV07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG9iamVjdDtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIE1ha2VzIGEgY2xvbmUgb2YgYW4gb2JqZWN0LlxuICAgICAqXG4gICAgICogQG1ldGhvZCBjbG9uZVxuICAgICAqIEBwYXJhbSBvYmoge09iamVjdH0gVGhlIG9iamVjdCB5b3UgdG8gY2xvbmUuXG4gICAgICogQHJldHVybnMge2FueX0gUmV0dXJucyBhIGNsb25lIG9iamVjdCBvZiB0aGUgb25lIHBhc3NlZCBpbi5cbiAgICAgKiBAcHVibGljXG4gICAgICogQHN0YXRpY1xuICAgICAqIEBleGFtcGxlXG4gICAgICogICAgICBsZXQgY2xvbmVPZk9iamVjdCA9IFV0aWwuY2xvbmUob2JqKTtcbiAgICAgKi9cbiAgICBVdGlsLmNsb25lID0gZnVuY3Rpb24gKG9iaikge1xuICAgICAgICAvL290aGVyIHNjcmlwdHM6IGh0dHA6Ly9kYXZpZHdhbHNoLm5hbWUvamF2YXNjcmlwdC1jbG9uZVxuICAgICAgICAvL2h0dHA6Ly9vcmFubG9vbmV5LmNvbS9mdW5jdGlvbmFsLWphdmFzY3JpcHQvXG4gICAgICAgIC8vaHR0cDovL29yYW5sb29uZXkuY29tL2RlZXAtY29weS1qYXZhc2NyaXB0L1xuICAgICAgICAvLyBIYW5kbGUgdGhlIDMgc2ltcGxlIHR5cGVzLCBhbmQgbnVsbCBvciB1bmRlZmluZWRcbiAgICAgICAgaWYgKG51bGwgPT0gb2JqIHx8ICdvYmplY3QnICE9IHR5cGVvZiBvYmopIHtcbiAgICAgICAgICAgIHJldHVybiBvYmo7XG4gICAgICAgIH1cbiAgICAgICAgLy8gSGFuZGxlIERhdGVcbiAgICAgICAgaWYgKG9iaiBpbnN0YW5jZW9mIERhdGUpIHtcbiAgICAgICAgICAgIHZhciBkYXRlID0gbmV3IERhdGUoKTtcbiAgICAgICAgICAgIGRhdGUuc2V0VGltZShvYmouZ2V0VGltZSgpKTtcbiAgICAgICAgICAgIHJldHVybiBkYXRlO1xuICAgICAgICB9XG4gICAgICAgIC8vIEhhbmRsZSBBcnJheVxuICAgICAgICBpZiAob2JqIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgICAgICAgIHZhciBhcnJheSA9IFtdO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IG9iai5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgICAgICAgIGFycmF5W2ldID0gVXRpbC5jbG9uZShvYmpbaV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGFycmF5O1xuICAgICAgICB9XG4gICAgICAgIC8vIEhhbmRsZSBPYmplY3RcbiAgICAgICAgaWYgKG9iaiBpbnN0YW5jZW9mIE9iamVjdCkge1xuICAgICAgICAgICAgdmFyIGNvcHkgPSB7fTtcbiAgICAgICAgICAgIGZvciAodmFyIGF0dHIgaW4gb2JqKSB7XG4gICAgICAgICAgICAgICAgaWYgKG9iai5oYXNPd25Qcm9wZXJ0eShhdHRyKSkge1xuICAgICAgICAgICAgICAgICAgICBjb3B5W2F0dHJdID0gVXRpbC5jbG9uZShvYmpbYXR0cl0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBjb3B5O1xuICAgICAgICB9XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIltVdGlsXSBVbmFibGUgdG8gY29weSBvYmohIEl0cyB0eXBlIGlzbid0IHN1cHBvcnRlZC5cIik7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBDb252ZXJ0cyBhIHN0cmluZyBvciBudW1iZXIgdG8gYSBib29sZWFuLlxuICAgICAqXG4gICAgICogQG1ldGhvZCB0b0Jvb2xlYW5cbiAgICAgKiBAcGFyYW0gc3RyTnVtIHtzdHJpbmd8bnVtYmVyfVxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAqIEBwdWJsaWNcbiAgICAgKiBAc3RhdGljXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiAgICAgIFV0aWwudG9Cb29sZWFuKFwiVFJVRVwiKTtcbiAgICAgKiAgICAgIC8vIHRydWVcbiAgICAgKlxuICAgICAqICAgICAgVXRpbC50b0Jvb2xlYW4oMCk7XG4gICAgICogICAgICAvLyBmYWxzZVxuICAgICAqXG4gICAgICogICAgICBVdGlsLnRvQm9vbGVhbih1bmRlZmluZWQpO1xuICAgICAqICAgICAgLy8gZmFsc2VcbiAgICAgKi9cbiAgICBVdGlsLnRvQm9vbGVhbiA9IGZ1bmN0aW9uIChzdHJOdW0pIHtcbiAgICAgICAgdmFyIHZhbHVlID0gKHR5cGVvZiBzdHJOdW0gPT09ICdzdHJpbmcnKSA/IHN0ck51bS50b0xvd2VyQ2FzZSgpIDogc3RyTnVtO1xuICAgICAgICByZXR1cm4gKHZhbHVlID4gMCB8fCB2YWx1ZSA9PSAndHJ1ZScgfHwgdmFsdWUgPT0gJ3llcycpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgbmFtZSBvZiB0aGUgZnVuY3Rpb24vb2JqZWN0IHBhc3NlZCBpbi5cbiAgICAgKlxuICAgICAqIEBtZXRob2QgZ2V0TmFtZVxuICAgICAqIEBwYXJhbSBjbGFzc09iamVjdCB7YW55fVxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIG5hbWUgb2YgdGhlIGZ1bmN0aW9uIG9yIG9iamVjdC5cbiAgICAgKiBAc3RhdGljXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiAgICAgIGxldCBzb21lQ2xhc3MgPSBuZXcgU29tZUNsYXNzKCk7XG4gICAgICogICAgICBVdGlsLmdldE5hbWUoc29tZUNsYXNzKTsgICAgICAgICAgICAvLyAnU29tZUNsYXNzJ1xuICAgICAqXG4gICAgICogICAgICBVdGlsLmdldE5hbWUoZnVuY3Rpb24gVGVzdCgpe30pOyAgICAvLyAnVGVzdCdcbiAgICAgKiAgICAgIFV0aWwuZ2V0TmFtZShmdW5jdGlvbiAoKXt9KTsgICAgICAgIC8vICdhbm9ueW1vdXMnXG4gICAgICovXG4gICAgVXRpbC5nZXROYW1lID0gZnVuY3Rpb24gKGNsYXNzT2JqZWN0KSB7XG4gICAgICAgIHZhciB0eXBlID0gdHlwZW9mIGNsYXNzT2JqZWN0O1xuICAgICAgICB2YXIgdmFsdWU7XG4gICAgICAgIHZhciBmdW5jTmFtZVJlZ2V4ID0gL2Z1bmN0aW9uIChbXlxcKF0rKS87XG4gICAgICAgIGlmICh0eXBlID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgLy8gR2V0cyB0aGUgbmFtZSBvZiB0aGUgb2JqZWN0LlxuICAgICAgICAgICAgdmFyIHJlc3VsdHMgPSBjbGFzc09iamVjdC5jb25zdHJ1Y3Rvci50b1N0cmluZygpLm1hdGNoKGZ1bmNOYW1lUmVnZXgpO1xuICAgICAgICAgICAgdmFsdWUgPSByZXN1bHRzWzFdO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgLy8gVGhpcyBlbHNlIGNvZGUgaXMgbWFpbmx5IGZvciBJbnRlcm5ldCBFeHBsb3JlLlxuICAgICAgICAgICAgdmFyIGlzRnVuY3Rpb24gPSAodHlwZSA9PT0gJ2Z1bmN0aW9uJyk7XG4gICAgICAgICAgICAvLyBUT0RPOiBmaWd1cmUgb3V0IGhvdyB0byBleHBsYWluIHRoaXNcbiAgICAgICAgICAgIHZhciBuYW1lXzEgPSBpc0Z1bmN0aW9uICYmICgoY2xhc3NPYmplY3QubmFtZSAmJiBbJycsIGNsYXNzT2JqZWN0Lm5hbWVdKSB8fCBjbGFzc09iamVjdC50b1N0cmluZygpLm1hdGNoKGZ1bmNOYW1lUmVnZXgpKTtcbiAgICAgICAgICAgIGlmIChpc0Z1bmN0aW9uID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgIHZhbHVlID0gdHlwZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKG5hbWVfMSAmJiBuYW1lXzFbMV0pIHtcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IG5hbWVfMVsxXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHZhbHVlID0gJ2Fub255bW91cyc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhbmQgcmV0dXJucyBhIG5ldyBkZWJvdW5jZWQgdmVyc2lvbiBvZiB0aGUgcGFzc2VkIGZ1bmN0aW9uIHdoaWNoIHdpbGwgcG9zdHBvbmUgaXRzIGV4ZWN1dGlvbiB1bnRpbCBhZnRlclxuICAgICAqIHdhaXQgbWlsbGlzZWNvbmRzIGhhdmUgZWxhcHNlZCBzaW5jZSB0aGUgbGFzdCB0aW1lIGl0IHdhcyBpbnZva2VkLlxuICAgICAqXG4gICAgICogQG1ldGhvZCBkZWJvdW5jZVxuICAgICAqIEBwYXJhbSBjYWxsYmFjayB7RnVuY3Rpb259IFRoZSBmdW5jdGlvbiB0aGF0IHNob3VsZCBiZSBleGVjdXRlZC5cbiAgICAgKiBAcGFyYW0gd2FpdCB7bnVtYmVyfSBNaWxsaXNlY29uZHMgdG8gZWxhcHNlZCBiZWZvcmUgaW52b2tpbmcgdGhlIGNhbGxiYWNrLlxuICAgICAqIEBwYXJhbSBpbW1lZGlhdGUge2Jvb2xlYW59IFBhc3MgdHJ1ZSBmb3IgdGhlIGltbWVkaWF0ZSBwYXJhbWV0ZXIgdG8gY2F1c2UgZGVib3VuY2UgdG8gdHJpZ2dlciB0aGUgZnVuY3Rpb24gb24gdGhlIGxlYWRpbmcgaW5zdGVhZCBvZiB0aGUgdHJhaWxpbmcgZWRnZSBvZiB0aGUgd2FpdCBpbnRlcnZhbC4gVXNlZnVsIGluIGNpcmN1bXN0YW5jZXMgbGlrZSBwcmV2ZW50aW5nIGFjY2lkZW50YWwgZG91YmxlLWNsaWNrcyBvbiBhIFwic3VibWl0XCIgYnV0dG9uIGZyb20gZmlyaW5nIGEgc2Vjb25kIHRpbWUuXG4gICAgICogQHBhcmFtIGNhbGxiYWNrU2NvcGUge2FueX0gVGhlIHNjb3BlIG9mIHRoZSBjYWxsYmFjayBmdW5jdGlvbiB0aGF0IHNob3VsZCBiZSBleGVjdXRlZC5cbiAgICAgKiBAcHVibGljXG4gICAgICogQHN0YXRpY1xuICAgICAqIEBleGFtcGxlXG4gICAgICogICAgICBVdGlsLmRlYm91bmNlKHRoaXMuX29uQnJlYWtwb2ludENoYW5nZSwgMjUwLCBmYWxzZSwgdGhpcyk7XG4gICAgICovXG4gICAgVXRpbC5kZWJvdW5jZSA9IGZ1bmN0aW9uIChjYWxsYmFjaywgd2FpdCwgaW1tZWRpYXRlLCBjYWxsYmFja1Njb3BlKSB7XG4gICAgICAgIHZhciB0aW1lb3V0O1xuICAgICAgICB2YXIgcmVzdWx0O1xuICAgICAgICB2YXIgZGVib3VuY2VkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIGFyZ3MgPSBhcmd1bWVudHM7XG4gICAgICAgICAgICBmdW5jdGlvbiBkZWxheWVkKCkge1xuICAgICAgICAgICAgICAgIGlmIChpbW1lZGlhdGUgPT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gY2FsbGJhY2suYXBwbHkoY2FsbGJhY2tTY29wZSwgYXJncyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRpbWVvdXQgPSBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRpbWVvdXQpIHtcbiAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQodGltZW91dCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChpbW1lZGlhdGUgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICByZXN1bHQgPSBjYWxsYmFjay5hcHBseShjYWxsYmFja1Njb3BlLCBhcmdzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRpbWVvdXQgPSBzZXRUaW1lb3V0KGRlbGF5ZWQsIHdhaXQpO1xuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfTtcbiAgICAgICAgZGVib3VuY2VkLmNhbmNlbCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aW1lb3V0KTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIGRlYm91bmNlZDtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFRPRE86IFlVSURvY19jb21tZW50XG4gICAgICpcbiAgICAgKiBAbWV0aG9kIGFwcGx5TWl4aW5zXG4gICAgICogQHBhcmFtIGRlcml2ZWRDdG9yIHthbnl9XG4gICAgICogQHBhcmFtIGJhc2VDdG9ycyB7YW55fVxuICAgICAqIEBwdWJsaWNcbiAgICAgKiBAc3RhdGljXG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICBjbGFzcyBGbGllcyB7XG4gICAgICAgICAgICAgICAgZmx5KCkge1xuICAgICAgICAgICAgICAgICAgICBhbGVydCgnSXMgaXQgYSBiaXJkPyBJcyBpdCBhIHBsYW5lPycpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICBjbGFzcyBDbGltYnMge1xuICAgICAgICAgICAgICAgIGNsaW1iKCkge1xuICAgICAgICAgICAgICAgICAgICBhbGVydCgnTXkgc3BpZGVyLXNlbnNlIGlzIHRpbmdsaW5nLicpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICBjbGFzcyBIb3JzZWZseVdvbWFuIGltcGxlbWVudHMgQ2xpbWJzLCBGbGllcyB7XG4gICAgICAgICAgICAgICAgY2xpbWI6ICgpID0+IHZvaWQ7XG4gICAgICAgICAgICAgICAgZmx5OiAoKSA9PiB2b2lkO1xuICAgICAgICAgICAgfVxuXG4gICAgIFV0aWwuYXBwbHlNaXhpbnMoSG9yc2VmbHlXb21hbiwgW0NsaW1icywgRmxpZXNdKTtcbiAgICAgKi9cbiAgICBVdGlsLmFwcGx5TWl4aW5zID0gZnVuY3Rpb24gKGRlcml2ZWRDdG9yLCBiYXNlQ3RvcnMpIHtcbiAgICAgICAgYmFzZUN0b3JzLmZvckVhY2goZnVuY3Rpb24gKGJhc2VDdG9yKSB7XG4gICAgICAgICAgICBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhiYXNlQ3Rvci5wcm90b3R5cGUpLmZvckVhY2goZnVuY3Rpb24gKG5hbWUpIHtcbiAgICAgICAgICAgICAgICBkZXJpdmVkQ3Rvci5wcm90b3R5cGVbbmFtZV0gPSBiYXNlQ3Rvci5wcm90b3R5cGVbbmFtZV07XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGEgbmV3IGFycmF5IHdpdGggZHVwbGljYXRlcyByZW1vdmVkLlxuICAgICAqXG4gICAgICogQG1ldGhvZCB1bmlxdWVcbiAgICAgKiBAcGFyYW0gbGlzdCB7QXJyYXkuPGFueT59IFRoZSBhcnJheSB5b3Ugd2FudCB0byB1c2UgdG8gZ2VuZXJhdGUgdGhlIHVuaXF1ZSBhcnJheS5cbiAgICAgKiBAcmV0dXJuIHtBcnJheTxhbnk+fSBSZXR1cm5zIGEgbmV3IGFycmF5IGxpc3Qgb2YgdW5pcXVlIGl0ZW1zLlxuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICBVdGlsLnVuaXF1ZSA9IGZ1bmN0aW9uIChsaXN0KSB7XG4gICAgICAgIHZhciB1bmlxdWVMaXN0ID0gbGlzdC5yZWR1Y2UoZnVuY3Rpb24gKHByZXZpb3VzVmFsdWUsIGN1cnJlbnRWYWx1ZSkge1xuICAgICAgICAgICAgaWYgKHByZXZpb3VzVmFsdWUuaW5kZXhPZihjdXJyZW50VmFsdWUpID09PSAtMSkge1xuICAgICAgICAgICAgICAgIHByZXZpb3VzVmFsdWUucHVzaChjdXJyZW50VmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHByZXZpb3VzVmFsdWU7XG4gICAgICAgIH0sIFtdKTtcbiAgICAgICAgcmV0dXJuIHVuaXF1ZUxpc3Q7XG4gICAgfTtcbiAgICByZXR1cm4gVXRpbDtcbn0oKSk7XG4vKipcbiAqIEtlZXBzIHRyYWNrIG9mIHRoZSBjb3VudCBmb3IgdGhlIHVuaXF1ZUlkIG1ldGhvZC5cbiAqXG4gKiBAcHJvcGVydHkgX2lkQ291bnRlclxuICogQHR5cGUge2ludH1cbiAqIEBwcml2YXRlXG4gKiBAc3RhdGljXG4gKi9cblV0aWwuX2lkQ291bnRlciA9IDA7XG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBVdGlsO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9VXRpbC5qcy5tYXAiXX0=

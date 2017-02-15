(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/object/create"), __esModule: true };
},{"core-js/library/fn/object/create":3}],2:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/object/keys"), __esModule: true };
},{"core-js/library/fn/object/keys":4}],3:[function(require,module,exports){
require('../../modules/es6.object.create');
var $Object = require('../../modules/_core').Object;
module.exports = function create(P, D){
  return $Object.create(P, D);
};
},{"../../modules/_core":9,"../../modules/es6.object.create":40}],4:[function(require,module,exports){
require('../../modules/es6.object.keys');
module.exports = require('../../modules/_core').Object.keys;
},{"../../modules/_core":9,"../../modules/es6.object.keys":41}],5:[function(require,module,exports){
module.exports = function(it){
  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
  return it;
};
},{}],6:[function(require,module,exports){
var isObject = require('./_is-object');
module.exports = function(it){
  if(!isObject(it))throw TypeError(it + ' is not an object!');
  return it;
};
},{"./_is-object":23}],7:[function(require,module,exports){
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
},{"./_to-index":33,"./_to-iobject":35,"./_to-length":36}],8:[function(require,module,exports){
var toString = {}.toString;

module.exports = function(it){
  return toString.call(it).slice(8, -1);
};
},{}],9:[function(require,module,exports){
var core = module.exports = {version: '2.4.0'};
if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef
},{}],10:[function(require,module,exports){
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
},{"./_a-function":5}],11:[function(require,module,exports){
// 7.2.1 RequireObjectCoercible(argument)
module.exports = function(it){
  if(it == undefined)throw TypeError("Can't call method on  " + it);
  return it;
};
},{}],12:[function(require,module,exports){
// Thank's IE8 for his funny defineProperty
module.exports = !require('./_fails')(function(){
  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
});
},{"./_fails":16}],13:[function(require,module,exports){
var isObject = require('./_is-object')
  , document = require('./_global').document
  // in old IE typeof document.createElement is 'object'
  , is = isObject(document) && isObject(document.createElement);
module.exports = function(it){
  return is ? document.createElement(it) : {};
};
},{"./_global":17,"./_is-object":23}],14:[function(require,module,exports){
// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');
},{}],15:[function(require,module,exports){
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
},{"./_core":9,"./_ctx":10,"./_global":17,"./_hide":19}],16:[function(require,module,exports){
module.exports = function(exec){
  try {
    return !!exec();
  } catch(e){
    return true;
  }
};
},{}],17:[function(require,module,exports){
// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef
},{}],18:[function(require,module,exports){
var hasOwnProperty = {}.hasOwnProperty;
module.exports = function(it, key){
  return hasOwnProperty.call(it, key);
};
},{}],19:[function(require,module,exports){
var dP         = require('./_object-dp')
  , createDesc = require('./_property-desc');
module.exports = require('./_descriptors') ? function(object, key, value){
  return dP.f(object, key, createDesc(1, value));
} : function(object, key, value){
  object[key] = value;
  return object;
};
},{"./_descriptors":12,"./_object-dp":25,"./_property-desc":30}],20:[function(require,module,exports){
module.exports = require('./_global').document && document.documentElement;
},{"./_global":17}],21:[function(require,module,exports){
module.exports = !require('./_descriptors') && !require('./_fails')(function(){
  return Object.defineProperty(require('./_dom-create')('div'), 'a', {get: function(){ return 7; }}).a != 7;
});
},{"./_descriptors":12,"./_dom-create":13,"./_fails":16}],22:[function(require,module,exports){
// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = require('./_cof');
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
  return cof(it) == 'String' ? it.split('') : Object(it);
};
},{"./_cof":8}],23:[function(require,module,exports){
module.exports = function(it){
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};
},{}],24:[function(require,module,exports){
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

},{"./_an-object":6,"./_dom-create":13,"./_enum-bug-keys":14,"./_html":20,"./_object-dps":26,"./_shared-key":31}],25:[function(require,module,exports){
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
},{"./_an-object":6,"./_descriptors":12,"./_ie8-dom-define":21,"./_to-primitive":38}],26:[function(require,module,exports){
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
},{"./_an-object":6,"./_descriptors":12,"./_object-dp":25,"./_object-keys":28}],27:[function(require,module,exports){
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
},{"./_array-includes":7,"./_has":18,"./_shared-key":31,"./_to-iobject":35}],28:[function(require,module,exports){
// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys       = require('./_object-keys-internal')
  , enumBugKeys = require('./_enum-bug-keys');

module.exports = Object.keys || function keys(O){
  return $keys(O, enumBugKeys);
};
},{"./_enum-bug-keys":14,"./_object-keys-internal":27}],29:[function(require,module,exports){
// most Object methods by ES6 should accept primitives
var $export = require('./_export')
  , core    = require('./_core')
  , fails   = require('./_fails');
module.exports = function(KEY, exec){
  var fn  = (core.Object || {})[KEY] || Object[KEY]
    , exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function(){ fn(1); }), 'Object', exp);
};
},{"./_core":9,"./_export":15,"./_fails":16}],30:[function(require,module,exports){
module.exports = function(bitmap, value){
  return {
    enumerable  : !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable    : !(bitmap & 4),
    value       : value
  };
};
},{}],31:[function(require,module,exports){
var shared = require('./_shared')('keys')
  , uid    = require('./_uid');
module.exports = function(key){
  return shared[key] || (shared[key] = uid(key));
};
},{"./_shared":32,"./_uid":39}],32:[function(require,module,exports){
var global = require('./_global')
  , SHARED = '__core-js_shared__'
  , store  = global[SHARED] || (global[SHARED] = {});
module.exports = function(key){
  return store[key] || (store[key] = {});
};
},{"./_global":17}],33:[function(require,module,exports){
var toInteger = require('./_to-integer')
  , max       = Math.max
  , min       = Math.min;
module.exports = function(index, length){
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};
},{"./_to-integer":34}],34:[function(require,module,exports){
// 7.1.4 ToInteger
var ceil  = Math.ceil
  , floor = Math.floor;
module.exports = function(it){
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};
},{}],35:[function(require,module,exports){
// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = require('./_iobject')
  , defined = require('./_defined');
module.exports = function(it){
  return IObject(defined(it));
};
},{"./_defined":11,"./_iobject":22}],36:[function(require,module,exports){
// 7.1.15 ToLength
var toInteger = require('./_to-integer')
  , min       = Math.min;
module.exports = function(it){
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};
},{"./_to-integer":34}],37:[function(require,module,exports){
// 7.1.13 ToObject(argument)
var defined = require('./_defined');
module.exports = function(it){
  return Object(defined(it));
};
},{"./_defined":11}],38:[function(require,module,exports){
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
},{"./_is-object":23}],39:[function(require,module,exports){
var id = 0
  , px = Math.random();
module.exports = function(key){
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};
},{}],40:[function(require,module,exports){
var $export = require('./_export')
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
$export($export.S, 'Object', {create: require('./_object-create')});
},{"./_export":15,"./_object-create":24}],41:[function(require,module,exports){
// 19.1.2.14 Object.keys(O)
var toObject = require('./_to-object')
  , $keys    = require('./_object-keys');

require('./_object-sap')('keys', function(){
  return function keys(it){
    return $keys(toObject(it));
  };
});
},{"./_object-keys":28,"./_object-sap":29,"./_to-object":37}],42:[function(require,module,exports){
"use strict";

var GuestViewModel_1 = require("./models/GuestViewModel");
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
        // let checkoutViewModel = new CheckoutViewModel({test: {id:-1}}, { expand: false });
        // console.log(`1`, checkoutViewModel);
        //
        // checkoutViewModel = <CheckoutViewModel>checkoutViewModel.clone();
        // console.log(`2`, checkoutViewModel);
        //
        // checkoutViewModel = <CheckoutViewModel>checkoutViewModel.clone();
        // checkoutViewModel.update({pick: {id: 'asdfasdfas'}});
        // console.log(`3`, checkoutViewModel);
        var guestViewModel = new GuestViewModel_1["default"]();
        guestViewModel.validate();
        console.log("guestViewModel", guestViewModel);
        console.log("clone", guestViewModel.clone());
    };
    return App;
}();
exports.__esModule = true;
exports["default"] = App;


},{"./models/GuestViewModel":46}],43:[function(require,module,exports){
"use strict";

var App_1 = require("./App");
var app = new App_1.default();
app.init();

},{"./App":42}],44:[function(require,module,exports){
"use strict";

var _create = require("babel-runtime/core-js/object/create");

var _create2 = _interopRequireDefault(_create);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var __extends = undefined && undefined.__extends || function (d, b) {
    for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
    }function __() {
        this.constructor = d;
    }
    d.prototype = b === null ? (0, _create2.default)(b) : (__.prototype = b.prototype, new __());
};
var BaseModel_1 = require("../../../../../../ts/model/BaseModel");
var FormInputModel = function (_super) {
    __extends(FormInputModel, _super);
    function FormInputModel(data, opts) {
        if (data === void 0) {
            data = {};
        }
        if (opts === void 0) {
            opts = {};
        }
        var _this = _super.call(this, opts) || this;
        _this.value = null;
        _this.errorMessage = '';
        _this.isValid = true;
        _this.validators = [];
        _this.ignoreValidation = false;
        _this.update(data);
        return _this;
    }
    /**
     * @overridden BaseModel.update
     */
    FormInputModel.prototype.update = function (data) {
        _super.prototype.update.call(this, data);
        // Override any values after the default super update method has set the values.
    };
    FormInputModel.prototype.validate = function () {
        var _this = this;
        this.isValid = this.validators.map(function (validationFunction) {
            return validationFunction(_this.value);
        }).every(function (value) {
            return value === true;
        });
    };
    return FormInputModel;
}(BaseModel_1["default"]);
exports.__esModule = true;
exports["default"] = FormInputModel;


},{"../../../../../../ts/model/BaseModel":49,"babel-runtime/core-js/object/create":1}],45:[function(require,module,exports){
"use strict";

var _keys = require("babel-runtime/core-js/object/keys");

var _keys2 = _interopRequireDefault(_keys);

var _create = require("babel-runtime/core-js/object/create");

var _create2 = _interopRequireDefault(_create);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var __extends = undefined && undefined.__extends || function (d, b) {
    for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
    }function __() {
        this.constructor = d;
    }
    d.prototype = b === null ? (0, _create2.default)(b) : (__.prototype = b.prototype, new __());
};
var BaseModel_1 = require("../../../../../../ts/model/BaseModel");
var FormInputModel_1 = require("./FormInputModel");
var FormViewModel = function (_super) {
    __extends(FormViewModel, _super);
    function FormViewModel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.isValid = true;
        _this.generalError = null;
        _this.isSubmittingForm = false;
        return _this;
    }
    FormViewModel.prototype.validate = function () {
        var _this = this;
        var validationList = [];
        (0, _keys2.default)(this).forEach(function (propertyName) {
            var property = _this[propertyName];
            if (property instanceof FormInputModel_1["default"] === true && property.ignoreValidation === false) {
                var formInputModel = property;
                formInputModel.validate();
                validationList.push(formInputModel.isValid);
            }
        });
        this.isValid = validationList.every(function (value) {
            return value === true;
        });
        this.generalError = null;
    };
    FormViewModel.prototype.reset = function () {
        var _this = this;
        (0, _keys2.default)(this).forEach(function (propertyName) {
            var property = _this[propertyName];
            if (property instanceof FormInputModel_1["default"] === true && property.ignoreValidation === false) {
                var formInputModel = property;
                formInputModel.value = null;
                formInputModel.isValid = true;
            }
        });
        this.isValid = true;
        this.generalError = null;
    };
    return FormViewModel;
}(BaseModel_1["default"]);
exports.__esModule = true;
exports["default"] = FormViewModel;


},{"../../../../../../ts/model/BaseModel":49,"./FormInputModel":44,"babel-runtime/core-js/object/create":1,"babel-runtime/core-js/object/keys":2}],46:[function(require,module,exports){
"use strict";

var _create = require("babel-runtime/core-js/object/create");

var _create2 = _interopRequireDefault(_create);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var __extends = undefined && undefined.__extends || function (d, b) {
    for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
    }function __() {
        this.constructor = d;
    }
    d.prototype = b === null ? (0, _create2.default)(b) : (__.prototype = b.prototype, new __());
};
var FormViewModel_1 = require("./FormViewModel");
var ValidateService_1 = require("../services/ValidateService");
var FormInputModel_1 = require("./FormInputModel");
var GuestViewModel = function (_super) {
    __extends(GuestViewModel, _super);
    function GuestViewModel(data, opts) {
        if (data === void 0) {
            data = {};
        }
        if (opts === void 0) {
            opts = {};
        }
        var _this = _super.call(this, opts) || this;
        _this.firstName = new FormInputModel_1["default"]({
            validators: [ValidateService_1["default"].isNotEmpty],
            errorMessage: 'Please enter a first name.'
        });
        _this.lastName = new FormInputModel_1["default"]({
            validators: [ValidateService_1["default"].isNotEmpty],
            errorMessage: 'Please enter a last name.'
        });
        _this.email = new FormInputModel_1["default"]({
            validators: [ValidateService_1["default"].isValidEmail, ValidateService_1["default"].maxLength(100)],
            errorMessage: 'Please enter a valid email address'
        });
        if (data) {
            _this.update(data);
        }
        return _this;
    }
    /**
     * @overridden BaseModel.update
     */
    GuestViewModel.prototype.update = function (data) {
        return _super.prototype.update.call(this, data);
        // Override any values after the default super update method has set the values.
    };
    return GuestViewModel;
}(FormViewModel_1["default"]);
exports.__esModule = true;
exports["default"] = GuestViewModel;


},{"../services/ValidateService":47,"./FormInputModel":44,"./FormViewModel":45,"babel-runtime/core-js/object/create":1}],47:[function(require,module,exports){
"use strict";

var ValidationUtil_1 = require("../../../../../../ts/util/ValidationUtil");
var ValidateService = function () {
    function ValidateService() {}
    ValidateService.isValidEmail = function (email) {
        return ValidationUtil_1["default"].isValidEmailAddress(email);
    };
    ValidateService.isNotEmpty = function (value) {
        return ValidationUtil_1["default"].isEmpty(value) === false;
    };
    ValidateService.maxLength = function (num) {
        return function (value) {
            if (num == null) {
                return false;
            }
            return String(value).length <= num;
        };
    };
    ValidateService.isValidPassword = function (password) {
        if (password == null) {
            return false;
        }
        var isValid =
        // Must be greater than 8 characters
        password.length >= 8 && password.match(/\s/) === null && [
        // Must contain a number
        password.match(/\d/) !== null,
        // Must contain an uppercase letter
        password.match(/[A-Z]/) !== null,
        // Must contain an lowercase letter
        password.match(/[a-z]/) !== null,
        // Must contain a special character
        password.match(/\W/) !== null].filter(Boolean).length >= 3;
        return isValid;
    };
    ValidateService.isValidZipcode = function (zipCode) {
        return (/^\d{5}(?:[-\s]\d{4})?$/.test(zipCode)
        );
    };
    ValidateService.isValidPhoneNumber = function (phoneNumber) {
        return (/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/.test(phoneNumber)
        );
    };
    return ValidateService;
}();
exports.__esModule = true;
exports["default"] = ValidateService;


},{"../../../../../../ts/util/ValidationUtil":51}],48:[function(require,module,exports){
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


},{"./util/Util":50}],49:[function(require,module,exports){
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


},{"../BaseObject":48,"../util/Util":50}],50:[function(require,module,exports){
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


},{}],51:[function(require,module,exports){
"use strict";
/**
 * A ValidationUtility class that has several static methods to assist in development.
 *
 * @class ValidationUtil
 * @module StructureJS
 * @submodule util
 * @author Robert S. (www.codeBelt.com)
 * @static
 */

var ValidationUtil = function () {
    function ValidationUtil() {
        throw new Error('[ValidationUtil] Do not instantiate the ValidationUtil class because it is a static class.');
    }
    /**
     * Determines if the String passed has a length.
     *
     * @method isEmpty
     * @param value {string}
     * @returns {boolean}
     * @public
     * @static
     * @example
     *      ValidationUtil.isEmpty('sometext');
     *      // false
     */
    ValidationUtil.isEmpty = function (value) {
        if (value != null) {
            return value.length < 1;
        }
        return true;
    };
    /**
     * Determines if the two values passed in are the same.
     *
     * @method isMatch
     * @param value1 {any}
     * @param value2 {any}
     * @returns {boolean}
     * @public
     * @static
     * @example
     *      ValidationUtil.isMatch('one@email.com', 'two@email.com');
     *      // false
     */
    ValidationUtil.isMatch = function (value1, value2) {
        return value1 === value2;
    };
    /**
     * Determines if the String passed in is a valid email address.
     *
     * @method isValidEmailAddress
     * @param email {string}
     * @returns {boolean}
     * @public
     * @static
     * @example
     *      ValidationUtil.isValidEmailAddress('someemail@address.com');
     *      // true
     */
    ValidationUtil.isValidEmailAddress = function (email) {
        var expression = /^[-a-zA-Z0-9+_\'][-.a-zA-Z0-9+_\']*@[-.a-zA-Z0-9]+(\.[-.a-zA-Z0-9]+)*\.([a-zA-Z]{2,})$/;
        return expression.test(email);
    };
    /**
     * Determines if the String passed in is a phone number.
     *
     * @method isValidPhoneNumber
     * @param phoneNumber {string}
     * @returns {boolean}
     * @public
     * @static
     * @example
     *      ValidationUtil.isValidPhoneNumber('123 456 7899');
     *      // true
     */
    ValidationUtil.isValidPhoneNumber = function (phoneNumber) {
        var expression = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})$/;
        return expression.test(phoneNumber);
    };
    /**
     * Determines if the String passed in is a zip code.
     *
     * @method isZipCode
     * @param zipCode {string}
     * @returns {boolean}
     * @public
     * @static
     * @example
     *      ValidationUtil.isZipCode('55067 4434');
     *      // true
     */
    ValidationUtil.isZipCode = function (zipCode) {
        var expression = /^([0-9]{5})(?:[-\s]*([0-9]{4}))?$/;
        return expression.test(zipCode);
    };
    /**
     * Determines if the String passed in is a postal code.
     *
     * @method isPostalCode
     * @param postalCode {string}
     * @returns {boolean}
     * @public
     * @static
     * @example
     *      ValidationUtil.isPostalCode('p8n3h3');
     *      // true
     */
    ValidationUtil.isPostalCode = function (postalCode) {
        var expression = /^([A-Z][0-9][A-Z])\s*([0-9][A-Z][0-9])$/i;
        return expression.test(postalCode);
    };
    /**
     * Determines if the String passed in is a Social Security Number.
     *
     * @method isSocialSecurityNumber
     * @param ssn {string}
     * @returns {boolean}
     * @public
     * @static
     * @example
     *      ValidationUtil.isSocialSecurityNumber('178051120');
     *      // true
     */
    ValidationUtil.isSocialSecurityNumber = function (ssn) {
        var expression = /^\d{3}-?\d{2}-?\d{4}$/;
        return expression.test(ssn);
    };
    return ValidationUtil;
}();
exports.__esModule = true;
exports["default"] = ValidationUtil;


},{}]},{},[43])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9jb3JlLWpzL29iamVjdC9jcmVhdGUuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9jb3JlLWpzL29iamVjdC9rZXlzLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9mbi9vYmplY3QvY3JlYXRlLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9mbi9vYmplY3Qva2V5cy5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fYS1mdW5jdGlvbi5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fYW4tb2JqZWN0LmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19hcnJheS1pbmNsdWRlcy5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fY29mLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19jb3JlLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19jdHguanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2RlZmluZWQuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2Rlc2NyaXB0b3JzLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19kb20tY3JlYXRlLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19lbnVtLWJ1Zy1rZXlzLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19leHBvcnQuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2ZhaWxzLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19nbG9iYWwuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2hhcy5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faGlkZS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faHRtbC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faWU4LWRvbS1kZWZpbmUuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2lvYmplY3QuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2lzLW9iamVjdC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWNyZWF0ZS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWRwLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtZHBzLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3Qta2V5cy1pbnRlcm5hbC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWtleXMuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1zYXAuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3Byb3BlcnR5LWRlc2MuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3NoYXJlZC1rZXkuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3NoYXJlZC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8taW5kZXguanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLWludGVnZXIuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLWlvYmplY3QuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLWxlbmd0aC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8tb2JqZWN0LmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1wcmltaXRpdmUuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3VpZC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYub2JqZWN0LmNyZWF0ZS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYub2JqZWN0LmtleXMuanMiLCJzcmMvYXNzZXRzL3NjcmlwdHMvQXBwLmpzIiwic3JjL2Fzc2V0cy9zY3JpcHRzL21haW4udHMiLCJzcmMvYXNzZXRzL3NjcmlwdHMvbW9kZWxzL0Zvcm1JbnB1dE1vZGVsLmpzIiwic3JjL2Fzc2V0cy9zY3JpcHRzL21vZGVscy9Gb3JtVmlld01vZGVsLmpzIiwic3JjL2Fzc2V0cy9zY3JpcHRzL21vZGVscy9HdWVzdFZpZXdNb2RlbC5qcyIsInNyYy9hc3NldHMvc2NyaXB0cy9zZXJ2aWNlcy9WYWxpZGF0ZVNlcnZpY2UuanMiLCIuLi8uLi90cy9CYXNlT2JqZWN0LmpzIiwiLi4vLi4vdHMvbW9kZWwvQmFzZU1vZGVsLmpzIiwiLi4vLi4vdHMvdXRpbC9VdGlsLmpzIiwiLi4vLi4vdHMvdXRpbC9WYWxpZGF0aW9uVXRpbC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBOztBQ0FBOztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDSkE7QUFDQTs7QUNEQTtBQUNBO0FBQ0E7QUFDQTs7QUNIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNKQTtBQUNBOztBQ0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDSkE7QUFDQTtBQUNBO0FBQ0E7O0FDSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7O0FDSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNURBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ05BO0FBQ0E7QUFDQTtBQUNBOztBQ0hBO0FBQ0E7QUFDQTtBQUNBOztBQ0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUEE7O0FDQUE7QUFDQTtBQUNBOztBQ0ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDSkE7QUFDQTtBQUNBOztBQ0ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0pBO0FBQ0E7QUFDQTs7QUNGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUkE7O0FBQ0Es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Z2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwibW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiByZXF1aXJlKFwiY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9jcmVhdGVcIiksIF9fZXNNb2R1bGU6IHRydWUgfTsiLCJtb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2tleXNcIiksIF9fZXNNb2R1bGU6IHRydWUgfTsiLCJyZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzNi5vYmplY3QuY3JlYXRlJyk7XG52YXIgJE9iamVjdCA9IHJlcXVpcmUoJy4uLy4uL21vZHVsZXMvX2NvcmUnKS5PYmplY3Q7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGNyZWF0ZShQLCBEKXtcbiAgcmV0dXJuICRPYmplY3QuY3JlYXRlKFAsIEQpO1xufTsiLCJyZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzNi5vYmplY3Qua2V5cycpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLi8uLi9tb2R1bGVzL19jb3JlJykuT2JqZWN0LmtleXM7IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIGlmKHR5cGVvZiBpdCAhPSAnZnVuY3Rpb24nKXRocm93IFR5cGVFcnJvcihpdCArICcgaXMgbm90IGEgZnVuY3Rpb24hJyk7XG4gIHJldHVybiBpdDtcbn07IiwidmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0Jyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgaWYoIWlzT2JqZWN0KGl0KSl0aHJvdyBUeXBlRXJyb3IoaXQgKyAnIGlzIG5vdCBhbiBvYmplY3QhJyk7XG4gIHJldHVybiBpdDtcbn07IiwiLy8gZmFsc2UgLT4gQXJyYXkjaW5kZXhPZlxuLy8gdHJ1ZSAgLT4gQXJyYXkjaW5jbHVkZXNcbnZhciB0b0lPYmplY3QgPSByZXF1aXJlKCcuL190by1pb2JqZWN0JylcbiAgLCB0b0xlbmd0aCAgPSByZXF1aXJlKCcuL190by1sZW5ndGgnKVxuICAsIHRvSW5kZXggICA9IHJlcXVpcmUoJy4vX3RvLWluZGV4Jyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKElTX0lOQ0xVREVTKXtcbiAgcmV0dXJuIGZ1bmN0aW9uKCR0aGlzLCBlbCwgZnJvbUluZGV4KXtcbiAgICB2YXIgTyAgICAgID0gdG9JT2JqZWN0KCR0aGlzKVxuICAgICAgLCBsZW5ndGggPSB0b0xlbmd0aChPLmxlbmd0aClcbiAgICAgICwgaW5kZXggID0gdG9JbmRleChmcm9tSW5kZXgsIGxlbmd0aClcbiAgICAgICwgdmFsdWU7XG4gICAgLy8gQXJyYXkjaW5jbHVkZXMgdXNlcyBTYW1lVmFsdWVaZXJvIGVxdWFsaXR5IGFsZ29yaXRobVxuICAgIGlmKElTX0lOQ0xVREVTICYmIGVsICE9IGVsKXdoaWxlKGxlbmd0aCA+IGluZGV4KXtcbiAgICAgIHZhbHVlID0gT1tpbmRleCsrXTtcbiAgICAgIGlmKHZhbHVlICE9IHZhbHVlKXJldHVybiB0cnVlO1xuICAgIC8vIEFycmF5I3RvSW5kZXggaWdub3JlcyBob2xlcywgQXJyYXkjaW5jbHVkZXMgLSBub3RcbiAgICB9IGVsc2UgZm9yKDtsZW5ndGggPiBpbmRleDsgaW5kZXgrKylpZihJU19JTkNMVURFUyB8fCBpbmRleCBpbiBPKXtcbiAgICAgIGlmKE9baW5kZXhdID09PSBlbClyZXR1cm4gSVNfSU5DTFVERVMgfHwgaW5kZXggfHwgMDtcbiAgICB9IHJldHVybiAhSVNfSU5DTFVERVMgJiYgLTE7XG4gIH07XG59OyIsInZhciB0b1N0cmluZyA9IHt9LnRvU3RyaW5nO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwoaXQpLnNsaWNlKDgsIC0xKTtcbn07IiwidmFyIGNvcmUgPSBtb2R1bGUuZXhwb3J0cyA9IHt2ZXJzaW9uOiAnMi40LjAnfTtcbmlmKHR5cGVvZiBfX2UgPT0gJ251bWJlcicpX19lID0gY29yZTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bmRlZiIsIi8vIG9wdGlvbmFsIC8gc2ltcGxlIGNvbnRleHQgYmluZGluZ1xudmFyIGFGdW5jdGlvbiA9IHJlcXVpcmUoJy4vX2EtZnVuY3Rpb24nKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oZm4sIHRoYXQsIGxlbmd0aCl7XG4gIGFGdW5jdGlvbihmbik7XG4gIGlmKHRoYXQgPT09IHVuZGVmaW5lZClyZXR1cm4gZm47XG4gIHN3aXRjaChsZW5ndGgpe1xuICAgIGNhc2UgMTogcmV0dXJuIGZ1bmN0aW9uKGEpe1xuICAgICAgcmV0dXJuIGZuLmNhbGwodGhhdCwgYSk7XG4gICAgfTtcbiAgICBjYXNlIDI6IHJldHVybiBmdW5jdGlvbihhLCBiKXtcbiAgICAgIHJldHVybiBmbi5jYWxsKHRoYXQsIGEsIGIpO1xuICAgIH07XG4gICAgY2FzZSAzOiByZXR1cm4gZnVuY3Rpb24oYSwgYiwgYyl7XG4gICAgICByZXR1cm4gZm4uY2FsbCh0aGF0LCBhLCBiLCBjKTtcbiAgICB9O1xuICB9XG4gIHJldHVybiBmdW5jdGlvbigvKiAuLi5hcmdzICovKXtcbiAgICByZXR1cm4gZm4uYXBwbHkodGhhdCwgYXJndW1lbnRzKTtcbiAgfTtcbn07IiwiLy8gNy4yLjEgUmVxdWlyZU9iamVjdENvZXJjaWJsZShhcmd1bWVudClcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICBpZihpdCA9PSB1bmRlZmluZWQpdGhyb3cgVHlwZUVycm9yKFwiQ2FuJ3QgY2FsbCBtZXRob2Qgb24gIFwiICsgaXQpO1xuICByZXR1cm4gaXQ7XG59OyIsIi8vIFRoYW5rJ3MgSUU4IGZvciBoaXMgZnVubnkgZGVmaW5lUHJvcGVydHlcbm1vZHVsZS5leHBvcnRzID0gIXJlcXVpcmUoJy4vX2ZhaWxzJykoZnVuY3Rpb24oKXtcbiAgcmV0dXJuIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh7fSwgJ2EnLCB7Z2V0OiBmdW5jdGlvbigpeyByZXR1cm4gNzsgfX0pLmEgIT0gNztcbn0pOyIsInZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vX2lzLW9iamVjdCcpXG4gICwgZG9jdW1lbnQgPSByZXF1aXJlKCcuL19nbG9iYWwnKS5kb2N1bWVudFxuICAvLyBpbiBvbGQgSUUgdHlwZW9mIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQgaXMgJ29iamVjdCdcbiAgLCBpcyA9IGlzT2JqZWN0KGRvY3VtZW50KSAmJiBpc09iamVjdChkb2N1bWVudC5jcmVhdGVFbGVtZW50KTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gaXMgPyBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGl0KSA6IHt9O1xufTsiLCIvLyBJRSA4LSBkb24ndCBlbnVtIGJ1ZyBrZXlzXG5tb2R1bGUuZXhwb3J0cyA9IChcbiAgJ2NvbnN0cnVjdG9yLGhhc093blByb3BlcnR5LGlzUHJvdG90eXBlT2YscHJvcGVydHlJc0VudW1lcmFibGUsdG9Mb2NhbGVTdHJpbmcsdG9TdHJpbmcsdmFsdWVPZidcbikuc3BsaXQoJywnKTsiLCJ2YXIgZ2xvYmFsICAgID0gcmVxdWlyZSgnLi9fZ2xvYmFsJylcbiAgLCBjb3JlICAgICAgPSByZXF1aXJlKCcuL19jb3JlJylcbiAgLCBjdHggICAgICAgPSByZXF1aXJlKCcuL19jdHgnKVxuICAsIGhpZGUgICAgICA9IHJlcXVpcmUoJy4vX2hpZGUnKVxuICAsIFBST1RPVFlQRSA9ICdwcm90b3R5cGUnO1xuXG52YXIgJGV4cG9ydCA9IGZ1bmN0aW9uKHR5cGUsIG5hbWUsIHNvdXJjZSl7XG4gIHZhciBJU19GT1JDRUQgPSB0eXBlICYgJGV4cG9ydC5GXG4gICAgLCBJU19HTE9CQUwgPSB0eXBlICYgJGV4cG9ydC5HXG4gICAgLCBJU19TVEFUSUMgPSB0eXBlICYgJGV4cG9ydC5TXG4gICAgLCBJU19QUk9UTyAgPSB0eXBlICYgJGV4cG9ydC5QXG4gICAgLCBJU19CSU5EICAgPSB0eXBlICYgJGV4cG9ydC5CXG4gICAgLCBJU19XUkFQICAgPSB0eXBlICYgJGV4cG9ydC5XXG4gICAgLCBleHBvcnRzICAgPSBJU19HTE9CQUwgPyBjb3JlIDogY29yZVtuYW1lXSB8fCAoY29yZVtuYW1lXSA9IHt9KVxuICAgICwgZXhwUHJvdG8gID0gZXhwb3J0c1tQUk9UT1RZUEVdXG4gICAgLCB0YXJnZXQgICAgPSBJU19HTE9CQUwgPyBnbG9iYWwgOiBJU19TVEFUSUMgPyBnbG9iYWxbbmFtZV0gOiAoZ2xvYmFsW25hbWVdIHx8IHt9KVtQUk9UT1RZUEVdXG4gICAgLCBrZXksIG93biwgb3V0O1xuICBpZihJU19HTE9CQUwpc291cmNlID0gbmFtZTtcbiAgZm9yKGtleSBpbiBzb3VyY2Upe1xuICAgIC8vIGNvbnRhaW5zIGluIG5hdGl2ZVxuICAgIG93biA9ICFJU19GT1JDRUQgJiYgdGFyZ2V0ICYmIHRhcmdldFtrZXldICE9PSB1bmRlZmluZWQ7XG4gICAgaWYob3duICYmIGtleSBpbiBleHBvcnRzKWNvbnRpbnVlO1xuICAgIC8vIGV4cG9ydCBuYXRpdmUgb3IgcGFzc2VkXG4gICAgb3V0ID0gb3duID8gdGFyZ2V0W2tleV0gOiBzb3VyY2Vba2V5XTtcbiAgICAvLyBwcmV2ZW50IGdsb2JhbCBwb2xsdXRpb24gZm9yIG5hbWVzcGFjZXNcbiAgICBleHBvcnRzW2tleV0gPSBJU19HTE9CQUwgJiYgdHlwZW9mIHRhcmdldFtrZXldICE9ICdmdW5jdGlvbicgPyBzb3VyY2Vba2V5XVxuICAgIC8vIGJpbmQgdGltZXJzIHRvIGdsb2JhbCBmb3IgY2FsbCBmcm9tIGV4cG9ydCBjb250ZXh0XG4gICAgOiBJU19CSU5EICYmIG93biA/IGN0eChvdXQsIGdsb2JhbClcbiAgICAvLyB3cmFwIGdsb2JhbCBjb25zdHJ1Y3RvcnMgZm9yIHByZXZlbnQgY2hhbmdlIHRoZW0gaW4gbGlicmFyeVxuICAgIDogSVNfV1JBUCAmJiB0YXJnZXRba2V5XSA9PSBvdXQgPyAoZnVuY3Rpb24oQyl7XG4gICAgICB2YXIgRiA9IGZ1bmN0aW9uKGEsIGIsIGMpe1xuICAgICAgICBpZih0aGlzIGluc3RhbmNlb2YgQyl7XG4gICAgICAgICAgc3dpdGNoKGFyZ3VtZW50cy5sZW5ndGgpe1xuICAgICAgICAgICAgY2FzZSAwOiByZXR1cm4gbmV3IEM7XG4gICAgICAgICAgICBjYXNlIDE6IHJldHVybiBuZXcgQyhhKTtcbiAgICAgICAgICAgIGNhc2UgMjogcmV0dXJuIG5ldyBDKGEsIGIpO1xuICAgICAgICAgIH0gcmV0dXJuIG5ldyBDKGEsIGIsIGMpO1xuICAgICAgICB9IHJldHVybiBDLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICB9O1xuICAgICAgRltQUk9UT1RZUEVdID0gQ1tQUk9UT1RZUEVdO1xuICAgICAgcmV0dXJuIEY7XG4gICAgLy8gbWFrZSBzdGF0aWMgdmVyc2lvbnMgZm9yIHByb3RvdHlwZSBtZXRob2RzXG4gICAgfSkob3V0KSA6IElTX1BST1RPICYmIHR5cGVvZiBvdXQgPT0gJ2Z1bmN0aW9uJyA/IGN0eChGdW5jdGlvbi5jYWxsLCBvdXQpIDogb3V0O1xuICAgIC8vIGV4cG9ydCBwcm90byBtZXRob2RzIHRvIGNvcmUuJUNPTlNUUlVDVE9SJS5tZXRob2RzLiVOQU1FJVxuICAgIGlmKElTX1BST1RPKXtcbiAgICAgIChleHBvcnRzLnZpcnR1YWwgfHwgKGV4cG9ydHMudmlydHVhbCA9IHt9KSlba2V5XSA9IG91dDtcbiAgICAgIC8vIGV4cG9ydCBwcm90byBtZXRob2RzIHRvIGNvcmUuJUNPTlNUUlVDVE9SJS5wcm90b3R5cGUuJU5BTUUlXG4gICAgICBpZih0eXBlICYgJGV4cG9ydC5SICYmIGV4cFByb3RvICYmICFleHBQcm90b1trZXldKWhpZGUoZXhwUHJvdG8sIGtleSwgb3V0KTtcbiAgICB9XG4gIH1cbn07XG4vLyB0eXBlIGJpdG1hcFxuJGV4cG9ydC5GID0gMTsgICAvLyBmb3JjZWRcbiRleHBvcnQuRyA9IDI7ICAgLy8gZ2xvYmFsXG4kZXhwb3J0LlMgPSA0OyAgIC8vIHN0YXRpY1xuJGV4cG9ydC5QID0gODsgICAvLyBwcm90b1xuJGV4cG9ydC5CID0gMTY7ICAvLyBiaW5kXG4kZXhwb3J0LlcgPSAzMjsgIC8vIHdyYXBcbiRleHBvcnQuVSA9IDY0OyAgLy8gc2FmZVxuJGV4cG9ydC5SID0gMTI4OyAvLyByZWFsIHByb3RvIG1ldGhvZCBmb3IgYGxpYnJhcnlgIFxubW9kdWxlLmV4cG9ydHMgPSAkZXhwb3J0OyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oZXhlYyl7XG4gIHRyeSB7XG4gICAgcmV0dXJuICEhZXhlYygpO1xuICB9IGNhdGNoKGUpe1xuICAgIHJldHVybiB0cnVlO1xuICB9XG59OyIsIi8vIGh0dHBzOi8vZ2l0aHViLmNvbS96bG9pcm9jay9jb3JlLWpzL2lzc3Vlcy84NiNpc3N1ZWNvbW1lbnQtMTE1NzU5MDI4XG52YXIgZ2xvYmFsID0gbW9kdWxlLmV4cG9ydHMgPSB0eXBlb2Ygd2luZG93ICE9ICd1bmRlZmluZWQnICYmIHdpbmRvdy5NYXRoID09IE1hdGhcbiAgPyB3aW5kb3cgOiB0eXBlb2Ygc2VsZiAhPSAndW5kZWZpbmVkJyAmJiBzZWxmLk1hdGggPT0gTWF0aCA/IHNlbGYgOiBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuaWYodHlwZW9mIF9fZyA9PSAnbnVtYmVyJylfX2cgPSBnbG9iYWw7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW5kZWYiLCJ2YXIgaGFzT3duUHJvcGVydHkgPSB7fS5oYXNPd25Qcm9wZXJ0eTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQsIGtleSl7XG4gIHJldHVybiBoYXNPd25Qcm9wZXJ0eS5jYWxsKGl0LCBrZXkpO1xufTsiLCJ2YXIgZFAgICAgICAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpXG4gICwgY3JlYXRlRGVzYyA9IHJlcXVpcmUoJy4vX3Byb3BlcnR5LWRlc2MnKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKSA/IGZ1bmN0aW9uKG9iamVjdCwga2V5LCB2YWx1ZSl7XG4gIHJldHVybiBkUC5mKG9iamVjdCwga2V5LCBjcmVhdGVEZXNjKDEsIHZhbHVlKSk7XG59IDogZnVuY3Rpb24ob2JqZWN0LCBrZXksIHZhbHVlKXtcbiAgb2JqZWN0W2tleV0gPSB2YWx1ZTtcbiAgcmV0dXJuIG9iamVjdDtcbn07IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL19nbG9iYWwnKS5kb2N1bWVudCAmJiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7IiwibW9kdWxlLmV4cG9ydHMgPSAhcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKSAmJiAhcmVxdWlyZSgnLi9fZmFpbHMnKShmdW5jdGlvbigpe1xuICByZXR1cm4gT2JqZWN0LmRlZmluZVByb3BlcnR5KHJlcXVpcmUoJy4vX2RvbS1jcmVhdGUnKSgnZGl2JyksICdhJywge2dldDogZnVuY3Rpb24oKXsgcmV0dXJuIDc7IH19KS5hICE9IDc7XG59KTsiLCIvLyBmYWxsYmFjayBmb3Igbm9uLWFycmF5LWxpa2UgRVMzIGFuZCBub24tZW51bWVyYWJsZSBvbGQgVjggc3RyaW5nc1xudmFyIGNvZiA9IHJlcXVpcmUoJy4vX2NvZicpO1xubW9kdWxlLmV4cG9ydHMgPSBPYmplY3QoJ3onKS5wcm9wZXJ0eUlzRW51bWVyYWJsZSgwKSA/IE9iamVjdCA6IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIGNvZihpdCkgPT0gJ1N0cmluZycgPyBpdC5zcGxpdCgnJykgOiBPYmplY3QoaXQpO1xufTsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIHR5cGVvZiBpdCA9PT0gJ29iamVjdCcgPyBpdCAhPT0gbnVsbCA6IHR5cGVvZiBpdCA9PT0gJ2Z1bmN0aW9uJztcbn07IiwiLy8gMTkuMS4yLjIgLyAxNS4yLjMuNSBPYmplY3QuY3JlYXRlKE8gWywgUHJvcGVydGllc10pXG52YXIgYW5PYmplY3QgICAgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKVxuICAsIGRQcyAgICAgICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWRwcycpXG4gICwgZW51bUJ1Z0tleXMgPSByZXF1aXJlKCcuL19lbnVtLWJ1Zy1rZXlzJylcbiAgLCBJRV9QUk9UTyAgICA9IHJlcXVpcmUoJy4vX3NoYXJlZC1rZXknKSgnSUVfUFJPVE8nKVxuICAsIEVtcHR5ICAgICAgID0gZnVuY3Rpb24oKXsgLyogZW1wdHkgKi8gfVxuICAsIFBST1RPVFlQRSAgID0gJ3Byb3RvdHlwZSc7XG5cbi8vIENyZWF0ZSBvYmplY3Qgd2l0aCBmYWtlIGBudWxsYCBwcm90b3R5cGU6IHVzZSBpZnJhbWUgT2JqZWN0IHdpdGggY2xlYXJlZCBwcm90b3R5cGVcbnZhciBjcmVhdGVEaWN0ID0gZnVuY3Rpb24oKXtcbiAgLy8gVGhyYXNoLCB3YXN0ZSBhbmQgc29kb215OiBJRSBHQyBidWdcbiAgdmFyIGlmcmFtZSA9IHJlcXVpcmUoJy4vX2RvbS1jcmVhdGUnKSgnaWZyYW1lJylcbiAgICAsIGkgICAgICA9IGVudW1CdWdLZXlzLmxlbmd0aFxuICAgICwgbHQgICAgID0gJzwnXG4gICAgLCBndCAgICAgPSAnPidcbiAgICAsIGlmcmFtZURvY3VtZW50O1xuICBpZnJhbWUuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgcmVxdWlyZSgnLi9faHRtbCcpLmFwcGVuZENoaWxkKGlmcmFtZSk7XG4gIGlmcmFtZS5zcmMgPSAnamF2YXNjcmlwdDonOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXNjcmlwdC11cmxcbiAgLy8gY3JlYXRlRGljdCA9IGlmcmFtZS5jb250ZW50V2luZG93Lk9iamVjdDtcbiAgLy8gaHRtbC5yZW1vdmVDaGlsZChpZnJhbWUpO1xuICBpZnJhbWVEb2N1bWVudCA9IGlmcmFtZS5jb250ZW50V2luZG93LmRvY3VtZW50O1xuICBpZnJhbWVEb2N1bWVudC5vcGVuKCk7XG4gIGlmcmFtZURvY3VtZW50LndyaXRlKGx0ICsgJ3NjcmlwdCcgKyBndCArICdkb2N1bWVudC5GPU9iamVjdCcgKyBsdCArICcvc2NyaXB0JyArIGd0KTtcbiAgaWZyYW1lRG9jdW1lbnQuY2xvc2UoKTtcbiAgY3JlYXRlRGljdCA9IGlmcmFtZURvY3VtZW50LkY7XG4gIHdoaWxlKGktLSlkZWxldGUgY3JlYXRlRGljdFtQUk9UT1RZUEVdW2VudW1CdWdLZXlzW2ldXTtcbiAgcmV0dXJuIGNyZWF0ZURpY3QoKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gT2JqZWN0LmNyZWF0ZSB8fCBmdW5jdGlvbiBjcmVhdGUoTywgUHJvcGVydGllcyl7XG4gIHZhciByZXN1bHQ7XG4gIGlmKE8gIT09IG51bGwpe1xuICAgIEVtcHR5W1BST1RPVFlQRV0gPSBhbk9iamVjdChPKTtcbiAgICByZXN1bHQgPSBuZXcgRW1wdHk7XG4gICAgRW1wdHlbUFJPVE9UWVBFXSA9IG51bGw7XG4gICAgLy8gYWRkIFwiX19wcm90b19fXCIgZm9yIE9iamVjdC5nZXRQcm90b3R5cGVPZiBwb2x5ZmlsbFxuICAgIHJlc3VsdFtJRV9QUk9UT10gPSBPO1xuICB9IGVsc2UgcmVzdWx0ID0gY3JlYXRlRGljdCgpO1xuICByZXR1cm4gUHJvcGVydGllcyA9PT0gdW5kZWZpbmVkID8gcmVzdWx0IDogZFBzKHJlc3VsdCwgUHJvcGVydGllcyk7XG59O1xuIiwidmFyIGFuT2JqZWN0ICAgICAgID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0JylcbiAgLCBJRThfRE9NX0RFRklORSA9IHJlcXVpcmUoJy4vX2llOC1kb20tZGVmaW5lJylcbiAgLCB0b1ByaW1pdGl2ZSAgICA9IHJlcXVpcmUoJy4vX3RvLXByaW1pdGl2ZScpXG4gICwgZFAgICAgICAgICAgICAgPSBPYmplY3QuZGVmaW5lUHJvcGVydHk7XG5cbmV4cG9ydHMuZiA9IHJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJykgPyBPYmplY3QuZGVmaW5lUHJvcGVydHkgOiBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0eShPLCBQLCBBdHRyaWJ1dGVzKXtcbiAgYW5PYmplY3QoTyk7XG4gIFAgPSB0b1ByaW1pdGl2ZShQLCB0cnVlKTtcbiAgYW5PYmplY3QoQXR0cmlidXRlcyk7XG4gIGlmKElFOF9ET01fREVGSU5FKXRyeSB7XG4gICAgcmV0dXJuIGRQKE8sIFAsIEF0dHJpYnV0ZXMpO1xuICB9IGNhdGNoKGUpeyAvKiBlbXB0eSAqLyB9XG4gIGlmKCdnZXQnIGluIEF0dHJpYnV0ZXMgfHwgJ3NldCcgaW4gQXR0cmlidXRlcyl0aHJvdyBUeXBlRXJyb3IoJ0FjY2Vzc29ycyBub3Qgc3VwcG9ydGVkIScpO1xuICBpZigndmFsdWUnIGluIEF0dHJpYnV0ZXMpT1tQXSA9IEF0dHJpYnV0ZXMudmFsdWU7XG4gIHJldHVybiBPO1xufTsiLCJ2YXIgZFAgICAgICAgPSByZXF1aXJlKCcuL19vYmplY3QtZHAnKVxuICAsIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0JylcbiAgLCBnZXRLZXlzICA9IHJlcXVpcmUoJy4vX29iamVjdC1rZXlzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKSA/IE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzIDogZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyhPLCBQcm9wZXJ0aWVzKXtcbiAgYW5PYmplY3QoTyk7XG4gIHZhciBrZXlzICAgPSBnZXRLZXlzKFByb3BlcnRpZXMpXG4gICAgLCBsZW5ndGggPSBrZXlzLmxlbmd0aFxuICAgICwgaSA9IDBcbiAgICAsIFA7XG4gIHdoaWxlKGxlbmd0aCA+IGkpZFAuZihPLCBQID0ga2V5c1tpKytdLCBQcm9wZXJ0aWVzW1BdKTtcbiAgcmV0dXJuIE87XG59OyIsInZhciBoYXMgICAgICAgICAgPSByZXF1aXJlKCcuL19oYXMnKVxuICAsIHRvSU9iamVjdCAgICA9IHJlcXVpcmUoJy4vX3RvLWlvYmplY3QnKVxuICAsIGFycmF5SW5kZXhPZiA9IHJlcXVpcmUoJy4vX2FycmF5LWluY2x1ZGVzJykoZmFsc2UpXG4gICwgSUVfUFJPVE8gICAgID0gcmVxdWlyZSgnLi9fc2hhcmVkLWtleScpKCdJRV9QUk9UTycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG9iamVjdCwgbmFtZXMpe1xuICB2YXIgTyAgICAgID0gdG9JT2JqZWN0KG9iamVjdClcbiAgICAsIGkgICAgICA9IDBcbiAgICAsIHJlc3VsdCA9IFtdXG4gICAgLCBrZXk7XG4gIGZvcihrZXkgaW4gTylpZihrZXkgIT0gSUVfUFJPVE8paGFzKE8sIGtleSkgJiYgcmVzdWx0LnB1c2goa2V5KTtcbiAgLy8gRG9uJ3QgZW51bSBidWcgJiBoaWRkZW4ga2V5c1xuICB3aGlsZShuYW1lcy5sZW5ndGggPiBpKWlmKGhhcyhPLCBrZXkgPSBuYW1lc1tpKytdKSl7XG4gICAgfmFycmF5SW5kZXhPZihyZXN1bHQsIGtleSkgfHwgcmVzdWx0LnB1c2goa2V5KTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufTsiLCIvLyAxOS4xLjIuMTQgLyAxNS4yLjMuMTQgT2JqZWN0LmtleXMoTylcbnZhciAka2V5cyAgICAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1rZXlzLWludGVybmFsJylcbiAgLCBlbnVtQnVnS2V5cyA9IHJlcXVpcmUoJy4vX2VudW0tYnVnLWtleXMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBPYmplY3Qua2V5cyB8fCBmdW5jdGlvbiBrZXlzKE8pe1xuICByZXR1cm4gJGtleXMoTywgZW51bUJ1Z0tleXMpO1xufTsiLCIvLyBtb3N0IE9iamVjdCBtZXRob2RzIGJ5IEVTNiBzaG91bGQgYWNjZXB0IHByaW1pdGl2ZXNcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0JylcbiAgLCBjb3JlICAgID0gcmVxdWlyZSgnLi9fY29yZScpXG4gICwgZmFpbHMgICA9IHJlcXVpcmUoJy4vX2ZhaWxzJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKEtFWSwgZXhlYyl7XG4gIHZhciBmbiAgPSAoY29yZS5PYmplY3QgfHwge30pW0tFWV0gfHwgT2JqZWN0W0tFWV1cbiAgICAsIGV4cCA9IHt9O1xuICBleHBbS0VZXSA9IGV4ZWMoZm4pO1xuICAkZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiAqIGZhaWxzKGZ1bmN0aW9uKCl7IGZuKDEpOyB9KSwgJ09iamVjdCcsIGV4cCk7XG59OyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oYml0bWFwLCB2YWx1ZSl7XG4gIHJldHVybiB7XG4gICAgZW51bWVyYWJsZSAgOiAhKGJpdG1hcCAmIDEpLFxuICAgIGNvbmZpZ3VyYWJsZTogIShiaXRtYXAgJiAyKSxcbiAgICB3cml0YWJsZSAgICA6ICEoYml0bWFwICYgNCksXG4gICAgdmFsdWUgICAgICAgOiB2YWx1ZVxuICB9O1xufTsiLCJ2YXIgc2hhcmVkID0gcmVxdWlyZSgnLi9fc2hhcmVkJykoJ2tleXMnKVxuICAsIHVpZCAgICA9IHJlcXVpcmUoJy4vX3VpZCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihrZXkpe1xuICByZXR1cm4gc2hhcmVkW2tleV0gfHwgKHNoYXJlZFtrZXldID0gdWlkKGtleSkpO1xufTsiLCJ2YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi9fZ2xvYmFsJylcbiAgLCBTSEFSRUQgPSAnX19jb3JlLWpzX3NoYXJlZF9fJ1xuICAsIHN0b3JlICA9IGdsb2JhbFtTSEFSRURdIHx8IChnbG9iYWxbU0hBUkVEXSA9IHt9KTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oa2V5KXtcbiAgcmV0dXJuIHN0b3JlW2tleV0gfHwgKHN0b3JlW2tleV0gPSB7fSk7XG59OyIsInZhciB0b0ludGVnZXIgPSByZXF1aXJlKCcuL190by1pbnRlZ2VyJylcbiAgLCBtYXggICAgICAgPSBNYXRoLm1heFxuICAsIG1pbiAgICAgICA9IE1hdGgubWluO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpbmRleCwgbGVuZ3RoKXtcbiAgaW5kZXggPSB0b0ludGVnZXIoaW5kZXgpO1xuICByZXR1cm4gaW5kZXggPCAwID8gbWF4KGluZGV4ICsgbGVuZ3RoLCAwKSA6IG1pbihpbmRleCwgbGVuZ3RoKTtcbn07IiwiLy8gNy4xLjQgVG9JbnRlZ2VyXG52YXIgY2VpbCAgPSBNYXRoLmNlaWxcbiAgLCBmbG9vciA9IE1hdGguZmxvb3I7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIGlzTmFOKGl0ID0gK2l0KSA/IDAgOiAoaXQgPiAwID8gZmxvb3IgOiBjZWlsKShpdCk7XG59OyIsIi8vIHRvIGluZGV4ZWQgb2JqZWN0LCB0b09iamVjdCB3aXRoIGZhbGxiYWNrIGZvciBub24tYXJyYXktbGlrZSBFUzMgc3RyaW5nc1xudmFyIElPYmplY3QgPSByZXF1aXJlKCcuL19pb2JqZWN0JylcbiAgLCBkZWZpbmVkID0gcmVxdWlyZSgnLi9fZGVmaW5lZCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIHJldHVybiBJT2JqZWN0KGRlZmluZWQoaXQpKTtcbn07IiwiLy8gNy4xLjE1IFRvTGVuZ3RoXG52YXIgdG9JbnRlZ2VyID0gcmVxdWlyZSgnLi9fdG8taW50ZWdlcicpXG4gICwgbWluICAgICAgID0gTWF0aC5taW47XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIGl0ID4gMCA/IG1pbih0b0ludGVnZXIoaXQpLCAweDFmZmZmZmZmZmZmZmZmKSA6IDA7IC8vIHBvdygyLCA1MykgLSAxID09IDkwMDcxOTkyNTQ3NDA5OTFcbn07IiwiLy8gNy4xLjEzIFRvT2JqZWN0KGFyZ3VtZW50KVxudmFyIGRlZmluZWQgPSByZXF1aXJlKCcuL19kZWZpbmVkJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIE9iamVjdChkZWZpbmVkKGl0KSk7XG59OyIsIi8vIDcuMS4xIFRvUHJpbWl0aXZlKGlucHV0IFssIFByZWZlcnJlZFR5cGVdKVxudmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0Jyk7XG4vLyBpbnN0ZWFkIG9mIHRoZSBFUzYgc3BlYyB2ZXJzaW9uLCB3ZSBkaWRuJ3QgaW1wbGVtZW50IEBAdG9QcmltaXRpdmUgY2FzZVxuLy8gYW5kIHRoZSBzZWNvbmQgYXJndW1lbnQgLSBmbGFnIC0gcHJlZmVycmVkIHR5cGUgaXMgYSBzdHJpbmdcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQsIFMpe1xuICBpZighaXNPYmplY3QoaXQpKXJldHVybiBpdDtcbiAgdmFyIGZuLCB2YWw7XG4gIGlmKFMgJiYgdHlwZW9mIChmbiA9IGl0LnRvU3RyaW5nKSA9PSAnZnVuY3Rpb24nICYmICFpc09iamVjdCh2YWwgPSBmbi5jYWxsKGl0KSkpcmV0dXJuIHZhbDtcbiAgaWYodHlwZW9mIChmbiA9IGl0LnZhbHVlT2YpID09ICdmdW5jdGlvbicgJiYgIWlzT2JqZWN0KHZhbCA9IGZuLmNhbGwoaXQpKSlyZXR1cm4gdmFsO1xuICBpZighUyAmJiB0eXBlb2YgKGZuID0gaXQudG9TdHJpbmcpID09ICdmdW5jdGlvbicgJiYgIWlzT2JqZWN0KHZhbCA9IGZuLmNhbGwoaXQpKSlyZXR1cm4gdmFsO1xuICB0aHJvdyBUeXBlRXJyb3IoXCJDYW4ndCBjb252ZXJ0IG9iamVjdCB0byBwcmltaXRpdmUgdmFsdWVcIik7XG59OyIsInZhciBpZCA9IDBcbiAgLCBweCA9IE1hdGgucmFuZG9tKCk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGtleSl7XG4gIHJldHVybiAnU3ltYm9sKCcuY29uY2F0KGtleSA9PT0gdW5kZWZpbmVkID8gJycgOiBrZXksICcpXycsICgrK2lkICsgcHgpLnRvU3RyaW5nKDM2KSk7XG59OyIsInZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jylcbi8vIDE5LjEuMi4yIC8gMTUuMi4zLjUgT2JqZWN0LmNyZWF0ZShPIFssIFByb3BlcnRpZXNdKVxuJGV4cG9ydCgkZXhwb3J0LlMsICdPYmplY3QnLCB7Y3JlYXRlOiByZXF1aXJlKCcuL19vYmplY3QtY3JlYXRlJyl9KTsiLCIvLyAxOS4xLjIuMTQgT2JqZWN0LmtleXMoTylcbnZhciB0b09iamVjdCA9IHJlcXVpcmUoJy4vX3RvLW9iamVjdCcpXG4gICwgJGtleXMgICAgPSByZXF1aXJlKCcuL19vYmplY3Qta2V5cycpO1xuXG5yZXF1aXJlKCcuL19vYmplY3Qtc2FwJykoJ2tleXMnLCBmdW5jdGlvbigpe1xuICByZXR1cm4gZnVuY3Rpb24ga2V5cyhpdCl7XG4gICAgcmV0dXJuICRrZXlzKHRvT2JqZWN0KGl0KSk7XG4gIH07XG59KTsiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBHdWVzdFZpZXdNb2RlbF8xID0gcmVxdWlyZShcIi4vbW9kZWxzL0d1ZXN0Vmlld01vZGVsXCIpO1xuLyoqXG4gKiBJbml0aWFsIGFwcGxpY2F0aW9uIHNldHVwLiBSdW5zIG9uY2UgdXBvbiBldmVyeSBwYWdlIGxvYWQuXG4gKlxuICogQGNsYXNzIEFwcFxuICogQGNvbnN0cnVjdG9yXG4gKi9cbnZhciBBcHAgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIEFwcCgpIHtcbiAgICB9XG4gICAgLyoqXG4gICAgICogSW5pdGlhbGl6ZXMgdGhlIGFwcGxpY2F0aW9uIGFuZCBraWNrcyBvZmYgbG9hZGluZyBvZiBwcmVyZXF1aXNpdGVzLlxuICAgICAqXG4gICAgICogQG1ldGhvZCBpbml0XG4gICAgICogQHB1YmxpY1xuICAgICAqL1xuICAgIEFwcC5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgLy8gQ3JlYXRlIHlvdXIgdmlld3MgaGVyZVxuICAgICAgICAvLyBsZXQgY2hlY2tvdXRWaWV3TW9kZWwgPSBuZXcgQ2hlY2tvdXRWaWV3TW9kZWwoe3Rlc3Q6IHtpZDotMX19LCB7IGV4cGFuZDogZmFsc2UgfSk7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGAxYCwgY2hlY2tvdXRWaWV3TW9kZWwpO1xuICAgICAgICAvL1xuICAgICAgICAvLyBjaGVja291dFZpZXdNb2RlbCA9IDxDaGVja291dFZpZXdNb2RlbD5jaGVja291dFZpZXdNb2RlbC5jbG9uZSgpO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhgMmAsIGNoZWNrb3V0Vmlld01vZGVsKTtcbiAgICAgICAgLy9cbiAgICAgICAgLy8gY2hlY2tvdXRWaWV3TW9kZWwgPSA8Q2hlY2tvdXRWaWV3TW9kZWw+Y2hlY2tvdXRWaWV3TW9kZWwuY2xvbmUoKTtcbiAgICAgICAgLy8gY2hlY2tvdXRWaWV3TW9kZWwudXBkYXRlKHtwaWNrOiB7aWQ6ICdhc2RmYXNkZmFzJ319KTtcbiAgICAgICAgLy8gY29uc29sZS5sb2coYDNgLCBjaGVja291dFZpZXdNb2RlbCk7XG4gICAgICAgIHZhciBndWVzdFZpZXdNb2RlbCA9IG5ldyBHdWVzdFZpZXdNb2RlbF8xW1wiZGVmYXVsdFwiXSgpO1xuICAgICAgICBndWVzdFZpZXdNb2RlbC52YWxpZGF0ZSgpO1xuICAgICAgICBjb25zb2xlLmxvZyhcImd1ZXN0Vmlld01vZGVsXCIsIGd1ZXN0Vmlld01vZGVsKTtcbiAgICAgICAgY29uc29sZS5sb2coXCJjbG9uZVwiLCBndWVzdFZpZXdNb2RlbC5jbG9uZSgpKTtcbiAgICB9O1xuICAgIHJldHVybiBBcHA7XG59KCkpO1xuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gQXBwO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9QXBwLmpzLm1hcCIsImltcG9ydCBBcHAgZnJvbSAnLi9BcHAnO1xuXG5jb25zdCBhcHAgPSBuZXcgQXBwKCk7XG5hcHAuaW5pdCgpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07XG4gICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xufTtcbnZhciBCYXNlTW9kZWxfMSA9IHJlcXVpcmUoXCIuLi8uLi8uLi8uLi8uLi8uLi90cy9tb2RlbC9CYXNlTW9kZWxcIik7XG52YXIgRm9ybUlucHV0TW9kZWwgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhGb3JtSW5wdXRNb2RlbCwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBGb3JtSW5wdXRNb2RlbChkYXRhLCBvcHRzKSB7XG4gICAgICAgIGlmIChkYXRhID09PSB2b2lkIDApIHsgZGF0YSA9IHt9OyB9XG4gICAgICAgIGlmIChvcHRzID09PSB2b2lkIDApIHsgb3B0cyA9IHt9OyB9XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMsIG9wdHMpIHx8IHRoaXM7XG4gICAgICAgIF90aGlzLnZhbHVlID0gbnVsbDtcbiAgICAgICAgX3RoaXMuZXJyb3JNZXNzYWdlID0gJyc7XG4gICAgICAgIF90aGlzLmlzVmFsaWQgPSB0cnVlO1xuICAgICAgICBfdGhpcy52YWxpZGF0b3JzID0gW107XG4gICAgICAgIF90aGlzLmlnbm9yZVZhbGlkYXRpb24gPSBmYWxzZTtcbiAgICAgICAgX3RoaXMudXBkYXRlKGRhdGEpO1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEBvdmVycmlkZGVuIEJhc2VNb2RlbC51cGRhdGVcbiAgICAgKi9cbiAgICBGb3JtSW5wdXRNb2RlbC5wcm90b3R5cGUudXBkYXRlID0gZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgX3N1cGVyLnByb3RvdHlwZS51cGRhdGUuY2FsbCh0aGlzLCBkYXRhKTtcbiAgICAgICAgLy8gT3ZlcnJpZGUgYW55IHZhbHVlcyBhZnRlciB0aGUgZGVmYXVsdCBzdXBlciB1cGRhdGUgbWV0aG9kIGhhcyBzZXQgdGhlIHZhbHVlcy5cbiAgICB9O1xuICAgIEZvcm1JbnB1dE1vZGVsLnByb3RvdHlwZS52YWxpZGF0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdGhpcy5pc1ZhbGlkID0gdGhpc1xuICAgICAgICAgICAgLnZhbGlkYXRvcnNcbiAgICAgICAgICAgIC5tYXAoZnVuY3Rpb24gKHZhbGlkYXRpb25GdW5jdGlvbikgeyByZXR1cm4gdmFsaWRhdGlvbkZ1bmN0aW9uKF90aGlzLnZhbHVlKTsgfSlcbiAgICAgICAgICAgIC5ldmVyeShmdW5jdGlvbiAodmFsdWUpIHsgcmV0dXJuIHZhbHVlID09PSB0cnVlOyB9KTtcbiAgICB9O1xuICAgIHJldHVybiBGb3JtSW5wdXRNb2RlbDtcbn0oQmFzZU1vZGVsXzFbXCJkZWZhdWx0XCJdKSk7XG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBGb3JtSW5wdXRNb2RlbDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPUZvcm1JbnB1dE1vZGVsLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCBmdW5jdGlvbiAoZCwgYikge1xuICAgIGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdO1xuICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbn07XG52YXIgQmFzZU1vZGVsXzEgPSByZXF1aXJlKFwiLi4vLi4vLi4vLi4vLi4vLi4vdHMvbW9kZWwvQmFzZU1vZGVsXCIpO1xudmFyIEZvcm1JbnB1dE1vZGVsXzEgPSByZXF1aXJlKFwiLi9Gb3JtSW5wdXRNb2RlbFwiKTtcbnZhciBGb3JtVmlld01vZGVsID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoRm9ybVZpZXdNb2RlbCwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBGb3JtVmlld01vZGVsKCkge1xuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIgIT09IG51bGwgJiYgX3N1cGVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgfHwgdGhpcztcbiAgICAgICAgX3RoaXMuaXNWYWxpZCA9IHRydWU7XG4gICAgICAgIF90aGlzLmdlbmVyYWxFcnJvciA9IG51bGw7XG4gICAgICAgIF90aGlzLmlzU3VibWl0dGluZ0Zvcm0gPSBmYWxzZTtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICBGb3JtVmlld01vZGVsLnByb3RvdHlwZS52YWxpZGF0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdmFyIHZhbGlkYXRpb25MaXN0ID0gW107XG4gICAgICAgIE9iamVjdFxuICAgICAgICAgICAgLmtleXModGhpcylcbiAgICAgICAgICAgIC5mb3JFYWNoKGZ1bmN0aW9uIChwcm9wZXJ0eU5hbWUpIHtcbiAgICAgICAgICAgIHZhciBwcm9wZXJ0eSA9IF90aGlzW3Byb3BlcnR5TmFtZV07XG4gICAgICAgICAgICBpZiAocHJvcGVydHkgaW5zdGFuY2VvZiBGb3JtSW5wdXRNb2RlbF8xW1wiZGVmYXVsdFwiXSA9PT0gdHJ1ZSAmJiBwcm9wZXJ0eS5pZ25vcmVWYWxpZGF0aW9uID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgIHZhciBmb3JtSW5wdXRNb2RlbCA9IHByb3BlcnR5O1xuICAgICAgICAgICAgICAgIGZvcm1JbnB1dE1vZGVsLnZhbGlkYXRlKCk7XG4gICAgICAgICAgICAgICAgdmFsaWRhdGlvbkxpc3QucHVzaChmb3JtSW5wdXRNb2RlbC5pc1ZhbGlkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuaXNWYWxpZCA9IHZhbGlkYXRpb25MaXN0LmV2ZXJ5KGZ1bmN0aW9uICh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgPT09IHRydWU7IH0pO1xuICAgICAgICB0aGlzLmdlbmVyYWxFcnJvciA9IG51bGw7XG4gICAgfTtcbiAgICBGb3JtVmlld01vZGVsLnByb3RvdHlwZS5yZXNldCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgT2JqZWN0XG4gICAgICAgICAgICAua2V5cyh0aGlzKVxuICAgICAgICAgICAgLmZvckVhY2goZnVuY3Rpb24gKHByb3BlcnR5TmFtZSkge1xuICAgICAgICAgICAgdmFyIHByb3BlcnR5ID0gX3RoaXNbcHJvcGVydHlOYW1lXTtcbiAgICAgICAgICAgIGlmIChwcm9wZXJ0eSBpbnN0YW5jZW9mIEZvcm1JbnB1dE1vZGVsXzFbXCJkZWZhdWx0XCJdID09PSB0cnVlICYmIHByb3BlcnR5Lmlnbm9yZVZhbGlkYXRpb24gPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgdmFyIGZvcm1JbnB1dE1vZGVsID0gcHJvcGVydHk7XG4gICAgICAgICAgICAgICAgZm9ybUlucHV0TW9kZWwudmFsdWUgPSBudWxsO1xuICAgICAgICAgICAgICAgIGZvcm1JbnB1dE1vZGVsLmlzVmFsaWQgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5pc1ZhbGlkID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5nZW5lcmFsRXJyb3IgPSBudWxsO1xuICAgIH07XG4gICAgcmV0dXJuIEZvcm1WaWV3TW9kZWw7XG59KEJhc2VNb2RlbF8xW1wiZGVmYXVsdFwiXSkpO1xuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gRm9ybVZpZXdNb2RlbDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPUZvcm1WaWV3TW9kZWwuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07XG4gICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xufTtcbnZhciBGb3JtVmlld01vZGVsXzEgPSByZXF1aXJlKFwiLi9Gb3JtVmlld01vZGVsXCIpO1xudmFyIFZhbGlkYXRlU2VydmljZV8xID0gcmVxdWlyZShcIi4uL3NlcnZpY2VzL1ZhbGlkYXRlU2VydmljZVwiKTtcbnZhciBGb3JtSW5wdXRNb2RlbF8xID0gcmVxdWlyZShcIi4vRm9ybUlucHV0TW9kZWxcIik7XG52YXIgR3Vlc3RWaWV3TW9kZWwgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhHdWVzdFZpZXdNb2RlbCwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBHdWVzdFZpZXdNb2RlbChkYXRhLCBvcHRzKSB7XG4gICAgICAgIGlmIChkYXRhID09PSB2b2lkIDApIHsgZGF0YSA9IHt9OyB9XG4gICAgICAgIGlmIChvcHRzID09PSB2b2lkIDApIHsgb3B0cyA9IHt9OyB9XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMsIG9wdHMpIHx8IHRoaXM7XG4gICAgICAgIF90aGlzLmZpcnN0TmFtZSA9IG5ldyBGb3JtSW5wdXRNb2RlbF8xW1wiZGVmYXVsdFwiXSh7XG4gICAgICAgICAgICB2YWxpZGF0b3JzOiBbXG4gICAgICAgICAgICAgICAgVmFsaWRhdGVTZXJ2aWNlXzFbXCJkZWZhdWx0XCJdLmlzTm90RW1wdHksXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgZXJyb3JNZXNzYWdlOiAnUGxlYXNlIGVudGVyIGEgZmlyc3QgbmFtZS4nXG4gICAgICAgIH0pO1xuICAgICAgICBfdGhpcy5sYXN0TmFtZSA9IG5ldyBGb3JtSW5wdXRNb2RlbF8xW1wiZGVmYXVsdFwiXSh7XG4gICAgICAgICAgICB2YWxpZGF0b3JzOiBbXG4gICAgICAgICAgICAgICAgVmFsaWRhdGVTZXJ2aWNlXzFbXCJkZWZhdWx0XCJdLmlzTm90RW1wdHksXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgZXJyb3JNZXNzYWdlOiAnUGxlYXNlIGVudGVyIGEgbGFzdCBuYW1lLidcbiAgICAgICAgfSk7XG4gICAgICAgIF90aGlzLmVtYWlsID0gbmV3IEZvcm1JbnB1dE1vZGVsXzFbXCJkZWZhdWx0XCJdKHtcbiAgICAgICAgICAgIHZhbGlkYXRvcnM6IFtcbiAgICAgICAgICAgICAgICBWYWxpZGF0ZVNlcnZpY2VfMVtcImRlZmF1bHRcIl0uaXNWYWxpZEVtYWlsLFxuICAgICAgICAgICAgICAgIFZhbGlkYXRlU2VydmljZV8xW1wiZGVmYXVsdFwiXS5tYXhMZW5ndGgoMTAwKSxcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBlcnJvck1lc3NhZ2U6ICdQbGVhc2UgZW50ZXIgYSB2YWxpZCBlbWFpbCBhZGRyZXNzJ1xuICAgICAgICB9KTtcbiAgICAgICAgaWYgKGRhdGEpIHtcbiAgICAgICAgICAgIF90aGlzLnVwZGF0ZShkYXRhKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEBvdmVycmlkZGVuIEJhc2VNb2RlbC51cGRhdGVcbiAgICAgKi9cbiAgICBHdWVzdFZpZXdNb2RlbC5wcm90b3R5cGUudXBkYXRlID0gZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgcmV0dXJuIF9zdXBlci5wcm90b3R5cGUudXBkYXRlLmNhbGwodGhpcywgZGF0YSk7XG4gICAgICAgIC8vIE92ZXJyaWRlIGFueSB2YWx1ZXMgYWZ0ZXIgdGhlIGRlZmF1bHQgc3VwZXIgdXBkYXRlIG1ldGhvZCBoYXMgc2V0IHRoZSB2YWx1ZXMuXG4gICAgfTtcbiAgICByZXR1cm4gR3Vlc3RWaWV3TW9kZWw7XG59KEZvcm1WaWV3TW9kZWxfMVtcImRlZmF1bHRcIl0pKTtcbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IEd1ZXN0Vmlld01vZGVsO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9R3Vlc3RWaWV3TW9kZWwuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgVmFsaWRhdGlvblV0aWxfMSA9IHJlcXVpcmUoXCIuLi8uLi8uLi8uLi8uLi8uLi90cy91dGlsL1ZhbGlkYXRpb25VdGlsXCIpO1xudmFyIFZhbGlkYXRlU2VydmljZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gVmFsaWRhdGVTZXJ2aWNlKCkge1xuICAgIH1cbiAgICBWYWxpZGF0ZVNlcnZpY2UuaXNWYWxpZEVtYWlsID0gZnVuY3Rpb24gKGVtYWlsKSB7XG4gICAgICAgIHJldHVybiBWYWxpZGF0aW9uVXRpbF8xW1wiZGVmYXVsdFwiXS5pc1ZhbGlkRW1haWxBZGRyZXNzKGVtYWlsKTtcbiAgICB9O1xuICAgIFZhbGlkYXRlU2VydmljZS5pc05vdEVtcHR5ID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIHJldHVybiBWYWxpZGF0aW9uVXRpbF8xW1wiZGVmYXVsdFwiXS5pc0VtcHR5KHZhbHVlKSA9PT0gZmFsc2U7XG4gICAgfTtcbiAgICBWYWxpZGF0ZVNlcnZpY2UubWF4TGVuZ3RoID0gZnVuY3Rpb24gKG51bSkge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICBpZiAobnVtID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gU3RyaW5nKHZhbHVlKS5sZW5ndGggPD0gbnVtO1xuICAgICAgICB9O1xuICAgIH07XG4gICAgVmFsaWRhdGVTZXJ2aWNlLmlzVmFsaWRQYXNzd29yZCA9IGZ1bmN0aW9uIChwYXNzd29yZCkge1xuICAgICAgICBpZiAocGFzc3dvcmQgPT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHZhciBpc1ZhbGlkID0gXG4gICAgICAgIC8vIE11c3QgYmUgZ3JlYXRlciB0aGFuIDggY2hhcmFjdGVyc1xuICAgICAgICBwYXNzd29yZC5sZW5ndGggPj0gOFxuICAgICAgICAgICAgJiYgcGFzc3dvcmQubWF0Y2goL1xccy8pID09PSBudWxsXG4gICAgICAgICAgICAmJiBbXG4gICAgICAgICAgICAgICAgLy8gTXVzdCBjb250YWluIGEgbnVtYmVyXG4gICAgICAgICAgICAgICAgcGFzc3dvcmQubWF0Y2goL1xcZC8pICE9PSBudWxsLFxuICAgICAgICAgICAgICAgIC8vIE11c3QgY29udGFpbiBhbiB1cHBlcmNhc2UgbGV0dGVyXG4gICAgICAgICAgICAgICAgcGFzc3dvcmQubWF0Y2goL1tBLVpdLykgIT09IG51bGwsXG4gICAgICAgICAgICAgICAgLy8gTXVzdCBjb250YWluIGFuIGxvd2VyY2FzZSBsZXR0ZXJcbiAgICAgICAgICAgICAgICBwYXNzd29yZC5tYXRjaCgvW2Etel0vKSAhPT0gbnVsbCxcbiAgICAgICAgICAgICAgICAvLyBNdXN0IGNvbnRhaW4gYSBzcGVjaWFsIGNoYXJhY3RlclxuICAgICAgICAgICAgICAgIHBhc3N3b3JkLm1hdGNoKC9cXFcvKSAhPT0gbnVsbCxcbiAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAuZmlsdGVyKEJvb2xlYW4pXG4gICAgICAgICAgICAgICAgLmxlbmd0aCA+PSAzO1xuICAgICAgICByZXR1cm4gaXNWYWxpZDtcbiAgICB9O1xuICAgIFZhbGlkYXRlU2VydmljZS5pc1ZhbGlkWmlwY29kZSA9IGZ1bmN0aW9uICh6aXBDb2RlKSB7XG4gICAgICAgIHJldHVybiAvXlxcZHs1fSg/OlstXFxzXVxcZHs0fSk/JC8udGVzdCh6aXBDb2RlKTtcbiAgICB9O1xuICAgIFZhbGlkYXRlU2VydmljZS5pc1ZhbGlkUGhvbmVOdW1iZXIgPSBmdW5jdGlvbiAocGhvbmVOdW1iZXIpIHtcbiAgICAgICAgcmV0dXJuIC9eKFxcK1xcZHsxLDJ9XFxzKT9cXCg/XFxkezN9XFwpP1tcXHMuLV0/XFxkezN9W1xccy4tXT9cXGR7NH0kLy50ZXN0KHBob25lTnVtYmVyKTtcbiAgICB9O1xuICAgIHJldHVybiBWYWxpZGF0ZVNlcnZpY2U7XG59KCkpO1xuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gVmFsaWRhdGVTZXJ2aWNlO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9VmFsaWRhdGVTZXJ2aWNlLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xudmFyIFV0aWxfMSA9IHJlcXVpcmUoXCIuL3V0aWwvVXRpbFwiKTtcbi8qKlxuICogVGhlIHt7I2Nyb3NzTGluayBcIkJhc2VPYmplY3RcIn19e3svY3Jvc3NMaW5rfX0gY2xhc3MgaXMgYW4gYWJzdHJhY3QgY2xhc3MgdGhhdCBwcm92aWRlcyBjb21tb24gcHJvcGVydGllcyBhbmQgZnVuY3Rpb25hbGl0eSBmb3IgYWxsIFN0cnVjdHVyZUpTIGNsYXNzZXMuXG4gKlxuICogQGNsYXNzIEJhc2VPYmplY3RcbiAqIEBtb2R1bGUgU3RydWN0dXJlSlNcbiAqIEBzdWJtb2R1bGUgY29yZVxuICogQHJlcXVpcmVzIFV0aWxcbiAqIEBjb25zdHJ1Y3RvclxuICogQGF1dGhvciBSb2JlcnQgUy4gKHd3dy5jb2RlQmVsdC5jb20pXG4gKi9cbnZhciBCYXNlT2JqZWN0ID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBCYXNlT2JqZWN0KCkge1xuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIHNqc0lkIChTdHJ1Y3R1cmVKUyBJRCkgaXMgYSB1bmlxdWUgaWRlbnRpZmllciBhdXRvbWF0aWNhbGx5IGFzc2lnbmVkIHRvIG1vc3QgU3RydWN0dXJlSlMgb2JqZWN0cyB1cG9uIGluc3RhbnRpYXRpb24uXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwcm9wZXJ0eSBzanNJZFxuICAgICAgICAgKiBAdHlwZSB7aW50fVxuICAgICAgICAgKiBAZGVmYXVsdCBudWxsXG4gICAgICAgICAqIEB3cml0ZU9uY2VcbiAgICAgICAgICogQHJlYWRPbmx5XG4gICAgICAgICAqIEBwdWJsaWNcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuc2pzSWQgPSBudWxsO1xuICAgICAgICB0aGlzLnNqc0lkID0gVXRpbF8xW1wiZGVmYXVsdFwiXS51bmlxdWVJZCgpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBmdWxseSBxdWFsaWZpZWQgY2xhc3MgbmFtZSBvZiBhbiBvYmplY3QuXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIGdldFF1YWxpZmllZENsYXNzTmFtZVxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIGNsYXNzIG5hbWUuXG4gICAgICogQHB1YmxpY1xuICAgICAqIEBleGFtcGxlXG4gICAgICogICAgIGxldCBzb21lQ2xhc3MgPSBuZXcgU29tZUNsYXNzKCk7XG4gICAgICogICAgIHNvbWVDbGFzcy5nZXRRdWFsaWZpZWRDbGFzc05hbWUoKTtcbiAgICAgKlxuICAgICAqICAgICAvLyBTb21lQ2xhc3NcbiAgICAgKi9cbiAgICBCYXNlT2JqZWN0LnByb3RvdHlwZS5nZXRRdWFsaWZpZWRDbGFzc05hbWUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBVdGlsXzFbXCJkZWZhdWx0XCJdLmdldE5hbWUodGhpcyk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBUaGUgcHVycG9zZSBvZiB0aGUgZGVzdHJveSBtZXRob2QgaXMgdG8gbWFrZSBhbiBvYmplY3QgcmVhZHkgZm9yIGdhcmJhZ2UgY29sbGVjdGlvbi4gVGhpc1xuICAgICAqIHNob3VsZCBiZSB0aG91Z2h0IG9mIGFzIGEgb25lIHdheSBmdW5jdGlvbi4gT25jZSBkZXN0cm95IGlzIGNhbGxlZCBubyBmdXJ0aGVyIG1ldGhvZHMgc2hvdWxkIGJlXG4gICAgICogY2FsbGVkIG9uIHRoZSBvYmplY3Qgb3IgcHJvcGVydGllcyBhY2Nlc3NlZC4gSXQgaXMgdGhlIHJlc3BvbnNpYmlsaXR5IG9mIHRob3NlIHdobyBpbXBsZW1lbnQgdGhpc1xuICAgICAqIGZ1bmN0aW9uIHRvIHN0b3AgYWxsIHJ1bm5pbmcgVGltZXJzLCBhbGwgcnVubmluZyBTb3VuZHMsIGFuZCB0YWtlIGFueSBvdGhlciBzdGVwcyBuZWNlc3NhcnkgdG8gbWFrZSBhblxuICAgICAqIG9iamVjdCBlbGlnaWJsZSBmb3IgZ2FyYmFnZSBjb2xsZWN0aW9uLlxuICAgICAqXG4gICAgICogQnkgZGVmYXVsdCB0aGUgZGVzdHJveSBtZXRob2Qgd2lsbCBudWxsIG91dCBhbGwgcHJvcGVydGllcyBvZiB0aGUgY2xhc3MgYXV0b21hdGljYWxseS4gWW91IHNob3VsZCBjYWxsIGRlc3Ryb3lcbiAgICAgKiBvbiBvdGhlciBvYmplY3RzIGJlZm9yZSBjYWxsaW5nIHRoZSBzdXBlci5cbiAgICAgKlxuICAgICAqIEBtZXRob2QgZGVzdHJveVxuICAgICAqIEByZXR1cm4ge3ZvaWR9XG4gICAgICogQHB1YmxpY1xuICAgICAqIEBleGFtcGxlXG4gICAgICogICAgIGRlc3Ryb3koKSB7XG4gICAgICogICAgICAgICAgdGhpcy5kaXNhYmxlKCk7XG4gICAgICpcbiAgICAgKiAgICAgICAgICB0aGlzLl9jaGlsZEluc3RhbmNlLmRlc3Ryb3koKTtcbiAgICAgKlxuICAgICAqICAgICAgICAgIHN1cGVyLmRlc3Ryb3koKTtcbiAgICAgKiAgICAgfVxuICAgICAqL1xuICAgIEJhc2VPYmplY3QucHJvdG90eXBlLmRlc3Ryb3kgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGZvciAodmFyIGtleSBpbiB0aGlzKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5oYXNPd25Qcm9wZXJ0eShrZXkpICYmIGtleSAhPT0gJ3Nqc0lkJykge1xuICAgICAgICAgICAgICAgIHRoaXNba2V5XSA9IG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiBCYXNlT2JqZWN0O1xufSgpKTtcbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IEJhc2VPYmplY3Q7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1CYXNlT2JqZWN0LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCBmdW5jdGlvbiAoZCwgYikge1xuICAgIGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdO1xuICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbn07XG52YXIgQmFzZU9iamVjdF8xID0gcmVxdWlyZShcIi4uL0Jhc2VPYmplY3RcIik7XG52YXIgVXRpbF8xID0gcmVxdWlyZShcIi4uL3V0aWwvVXRpbFwiKTtcbi8qKlxuICogIEJhc2UgTW9kZWwgaXMgYSBkZXNpZ24gcGF0dGVybiB1c2VkIHRvIHRyYW5zZmVyIGRhdGEgYmV0d2VlbiBzb2Z0d2FyZSBhcHBsaWNhdGlvbiBzdWJzeXN0ZW1zLlxuICpcbiAqIE5vdGU6IElmIHRoZSBkYXRhIGRvZXNuJ3QgbWF0Y2ggdGhlIHByb3BlcnR5IG5hbWVzIHlvdSBjYW4gc2V0IHRoZSB2YWx1ZSBtYW51YWxseSBhZnRlciB1cGRhdGUgc3VwZXIgbWV0aG9kIGhhcyBiZWVuIGNhbGxlZC5cbiAqICBBbHNvIGluIHRoZSBjbGFzcyB5b3UgaW5oZXJpdCBCYXNlTW9kZWwgZnJvbSB5b3UgY2FuIG92ZXJyaWRlIHRoZSB1cGRhdGUgbWV0aG9kIHRvIGhhbmRsZSB0aGUgZGF0YSBob3cgeW91IHdhbnQuXG4gKlxuICogQGNsYXNzIEJhc2VNb2RlbFxuICogQGV4dGVuZHMgQmFzZU9iamVjdFxuICogQHBhcmFtIFtkYXRhXSB7YW55fSBQcm92aWRlIGEgd2F5IHRvIHVwZGF0ZSB0aGUgYmFzZSBtb2RlbCB1cG9uIGluaXRpYWxpemF0aW9uLlxuICogQHBhcmFtIFtvcHRzXSB7eyBleHBhbmQ6Ym9vbGVhbiB9fSBPcHRpb25zIGZvciB0aGUgYmFzZSBtb2RlbC5cbiAqIEBtb2R1bGUgU3RydWN0dXJlSlNcbiAqIEBzdWJtb2R1bGUgbW9kZWxcbiAqIEByZXF1aXJlcyBFeHRlbmRcbiAqIEByZXF1aXJlcyBCYXNlT2JqZWN0XG4gKiBAcmVxdWlyZXMgVXRpbFxuICogQGNvbnN0cnVjdG9yXG4gKiBAYXV0aG9yIFJvYmVydCBTLiAod3d3LmNvZGVCZWx0LmNvbSlcbiAqIEBleGFtcGxlXG4gKiAgICAgIC8vIEV4YW1wbGUgaG93IHRvIGV4dGVuZCB0aGUgQmFzZU1vZGVsIGNsYXNzLlxuICogICAgICBsZXQgZGF0YSA9IHtcbiAqICAgICAgICAgICAgICBtYWtlOiAnVGVzbGEnLFxuICogICAgICAgICAgICAgIG1vZGVsOiAnTW9kZWwgUycsXG4gKiAgICAgICAgICAgICAgWWVBcjogMjAxNCxcbiAqICAgICAgICAgICAgICBmZWF0dXJlOiB7XG4gKiAgICAgICAgICAgICAgICAgIGFiczogdHJ1ZSxcbiAqICAgICAgICAgICAgICAgICAgYWlyYmFnczogdHJ1ZVxuICogICAgICAgICAgICAgIH1cbiAqICAgICAgfVxuICogICAgICBsZXQgY2FyTW9kZWwgPSBuZXcgQ2FyTW9kZWwoZGF0YSk7XG4gKlxuICpcbiAqICAgICAgLy8gRXhhbXBsZSBob3cgdG8gZXh0ZW5kIHRoZSBCYXNlTW9kZWwgY2xhc3MuXG4gKiAgICAgIGNsYXNzIENhck1vZGVsIGV4dGVuZHMgQmFzZU1vZGVsIHtcbiAqXG4gKiAgICAgICAgICAvLyBZb3UgbmVlZCB0byBoYXZlIHByb3BlcnRpZXMgc28gdGhlIGRhdGEgd2lsbCBnZXQgYXNzaWduZWQuXG4gKiAgICAgICAgICAvLyBJZiBub3QgdGhlIGRhdGEgd2lsbCBub3QgZ2V0IGFzc2lnbmVkIHRvIHRoZSBtb2RlbC5cbiAqICAgICAgICAgIG1ha2UgPSBudWxsO1xuICogICAgICAgICAgbW9kZWwgPSBudWxsO1xuICogICAgICAgICAgeWVhciA9IG51bGw7XG4gKiAgICAgICAgICBhbGxXaGVlbCA9IGZhbHNlOyAvLyBTZXQgYSBkZWZhdWx0IHZhbHVlXG4gKlxuICogICAgICAgICAgLy8gWW91IGNhbiBhc3NpZ24gQmFzZU1vZGVsIHRvIGEgcHJvcGVydHkgd2hpY2ggd2lsbFxuICogICAgICAgICAgLy8gYXV0b21hdGljYWxseSBjcmVhdGVkIGl0IGFuZCBwYXNzIHRoZSBkYXRhIHRvIGl0LlxuICogICAgICAgICAgZmVhdHVyZSA9IEZlYXR1cmVNb2RlbFxuICpcbiAqICAgICAgICAgIC8vIElmIHlvdSBoYXZlIGFuIGFycmF5IG9mIGRhdGEgYW5kIHdhbnQgdGhlbSBhc3NpZ24gdG8gYSBCYXNlTW9kZWwuXG4gKiAgICAgICAgICBmZWF0dXJlID0gW0ZlYXR1cmVNb2RlbF07XG4gKlxuICogICAgICAgICAgY29uc3RydWN0b3IoZGF0YSA9IHt9LCBvcHRzID0ge30pIHtcbiAqICAgICAgICAgICAgICBzdXBlcihvcHRzKTtcbiAqXG4gKiAgICAgICAgICAgICAgaWYgKGRhdGEpIHtcbiAqICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGUoZGF0YSk7XG4gKiAgICAgICAgICAgICAgfVxuICogICAgICAgICAgfVxuICpcbiAqICAgICAgICAgIC8vIEBvdmVycmlkZGVuIEJhc2VNb2RlbC51cGRhdGVcbiAqICAgICAgICAgIHVwZGF0ZShkYXRhKSB7XG4gKiAgICAgICAgICAgICAgc3VwZXIudXBkYXRlKGRhdGEpO1xuICpcbiAqICAgICAgICAgICAgICAvLyBJZiB0aGUgZGF0YSBkb2Vzbid0IG1hdGNoIHRoZSBwcm9wZXJ0eSBuYW1lLlxuICogICAgICAgICAgICAgIC8vIFlvdSBjYW4gc2V0IHRoZSB2YWx1ZShzKSBtYW51YWxseSBhZnRlciB0aGUgdXBkYXRlIHN1cGVyIG1ldGhvZCBoYXMgYmVlbiBjYWxsZWQuXG4gKiAgICAgICAgICAgICAgdGhpcy55ZWFyID0gZGF0YS5ZZUFyO1xuICogICAgICAgICAgfVxuICogICAgICB9XG4gKi9cbnZhciBCYXNlTW9kZWwgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhCYXNlTW9kZWwsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gQmFzZU1vZGVsKG9wdHMpIHtcbiAgICAgICAgaWYgKG9wdHMgPT09IHZvaWQgMCkgeyBvcHRzID0ge307IH1cbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcykgfHwgdGhpcztcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBwcm9wZXJ0eSBzanNPcHRpb25zXG4gICAgICAgICAqIEB0eXBlIHtJQmFzZU1vZGVsT3B0aW9uc319XG4gICAgICAgICAqIEBwdWJsaWNcbiAgICAgICAgICovXG4gICAgICAgIF90aGlzLnNqc09wdGlvbnMgPSB7XG4gICAgICAgICAgICBleHBhbmQ6IGZhbHNlXG4gICAgICAgIH07XG4gICAgICAgIF90aGlzLnNqc09wdGlvbnMuZXhwYW5kID0gb3B0cy5leHBhbmQgPT09IHRydWU7XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogUHJvdmlkZSBhIHdheSB0byB1cGRhdGUgdGhlICBCYXNlIE1vZGVsLlxuICAgICAqXG4gICAgICogQG1ldGhvZCB1cGRhdGVcbiAgICAgKiBAcGFyYW0gW2RhdGE9e31dIHthbnl9XG4gICAgICogQHB1YmxpY1xuICAgICAqIEBleGFtcGxlXG4gICAgICogICAgIC8vIEV4YW1wbGUgb2YgdXBkYXRpbmcgc29tZSBvZiB0aGUgZGF0YTpcbiAgICAgKiAgICAgY2FyTW9kZWwudXBkYXRlKHsgeWVhcjogMjAxNSwgYWxsV2hlZWw6IHRydWV9KTtcbiAgICAgKlxuICAgICAqICAgICAvLyBPZiBjb3Vyc2UgeW91IGNhbiBhbHNvIGRvIGl0IHRoZSBmb2xsb3dpbmcgd2F5OlxuICAgICAqICAgICBjYXJNb2RlbC55ZWFyID0gMjAxNTtcbiAgICAgKiAgICAgY2FyTW9kZWwuYWxsV2hlZWwgPSBmYWxzZTtcbiAgICAgKi9cbiAgICBCYXNlTW9kZWwucHJvdG90eXBlLnVwZGF0ZSA9IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIGlmIChkYXRhID09PSB2b2lkIDApIHsgZGF0YSA9IHt9OyB9XG4gICAgICAgIE9iamVjdFxuICAgICAgICAgICAgLmtleXModGhpcylcbiAgICAgICAgICAgIC5mb3JFYWNoKGZ1bmN0aW9uIChwcm9wZXJ0eU5hbWUpIHtcbiAgICAgICAgICAgIC8vIElnbm9yZSB0aGUgc2pzSWQgcHJvcGVydHkgYmVjYXVzZSBpdCBpcyBzZXQgaW4gdGhlIEJhc2VPYmplY3QgY29uc3RydWN0b3IgYW5kIHdlIGRvbid0IHdhbnQgdG8gdXBkYXRlIGl0LlxuICAgICAgICAgICAgaWYgKHByb3BlcnR5TmFtZSAhPT0gJ3Nqc0lkJykge1xuICAgICAgICAgICAgICAgIHZhciBwcm9wZXJ0eURhdGEgPSBfdGhpc1twcm9wZXJ0eU5hbWVdO1xuICAgICAgICAgICAgICAgIHZhciB1cGRhdGVEYXRhID0gZGF0YVtwcm9wZXJ0eU5hbWVdO1xuICAgICAgICAgICAgICAgIHZhciBkYXRhVG9Vc2UgPSAodXBkYXRlRGF0YSAhPT0gdm9pZCAwKSA/IHVwZGF0ZURhdGEgOiBwcm9wZXJ0eURhdGE7XG4gICAgICAgICAgICAgICAgX3RoaXMuX3VwZGF0ZVByb3BlcnR5V2l0aERhdGFQYXNzZWRJbihwcm9wZXJ0eU5hbWUsIGRhdGFUb1VzZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEFkZHMgdGhlIHVwZGF0ZURhdGEgdG8gdGhlIHByb3BlcnR5XG4gICAgICpcbiAgICAgKiBAbWV0aG9kIF91cGRhdGVQcm9wZXJ0eVdpdGhEYXRhUGFzc2VkSW5cbiAgICAgKiBAcGFyYW0gcHJvcGVydHlOYW1lXG4gICAgICogQHBhcmFtIHVwZGF0ZURhdGFcbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgQmFzZU1vZGVsLnByb3RvdHlwZS5fdXBkYXRlUHJvcGVydHlXaXRoRGF0YVBhc3NlZEluID0gZnVuY3Rpb24gKHByb3BlcnR5TmFtZSwgdXBkYXRlRGF0YSkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICAvLyBJZiB0aGUgY3VycmVudCBwcm9wZXJ0eSBvbiB0aGUgbW9kZWwgaXMgYW4gYXJyYXkgYW5kIHRoZSB1cGRhdGVEYXRhIGlzIGFuIGFycmF5LlxuICAgICAgICBpZiAoKHRoaXNbcHJvcGVydHlOYW1lXSBpbnN0YW5jZW9mIEFycmF5ID09PSB0cnVlKSAmJiAodXBkYXRlRGF0YSBpbnN0YW5jZW9mIEFycmF5ID09PSB0cnVlKSkge1xuICAgICAgICAgICAgdmFyIGlzUHJvcGVydHlEYXRhVmFsdWVBblVuaW5zdGFudGlhdGVkQmFzZU1vZGVsID0gKHR5cGVvZiB0aGlzW3Byb3BlcnR5TmFtZV1bMF0gPT09ICdmdW5jdGlvbicgJiYgdGhpc1twcm9wZXJ0eU5hbWVdWzBdLklTX0JBU0VfTU9ERUwgPT09IHRydWUpO1xuICAgICAgICAgICAgdmFyIGlzVXBkYXRlRGF0YVZhbHVlQW5Vbmluc3RhbnRpYXRlZEJhc2VNb2RlbCA9ICh0eXBlb2YgdXBkYXRlRGF0YVswXSA9PT0gJ2Z1bmN0aW9uJyAmJiB1cGRhdGVEYXRhWzBdLklTX0JBU0VfTU9ERUwgPT09IHRydWUpO1xuICAgICAgICAgICAgaWYgKGlzUHJvcGVydHlEYXRhVmFsdWVBblVuaW5zdGFudGlhdGVkQmFzZU1vZGVsID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgIHRoaXNbcHJvcGVydHlOYW1lXSA9IHVwZGF0ZURhdGEubWFwKGZ1bmN0aW9uIChkYXRhKSB7IHJldHVybiBfdGhpcy5fdXBkYXRlRGF0YShudWxsLCBkYXRhKTsgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChpc1Byb3BlcnR5RGF0YVZhbHVlQW5Vbmluc3RhbnRpYXRlZEJhc2VNb2RlbCA9PT0gdHJ1ZSAmJiBpc1VwZGF0ZURhdGFWYWx1ZUFuVW5pbnN0YW50aWF0ZWRCYXNlTW9kZWwgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgLy8gSWYgdGhlIHByb3BlcnR5IGRhdGEgaXMgYW4gdW5pbnN0YW50aWF0ZWQgQmFzZU1vZGVsIHRoZW4gd2UgYXNzdW1lIHRoZSB1cGRhdGUgZGF0YSBwYXNzZWQgaW5cbiAgICAgICAgICAgICAgICAvLyBuZWVkcyB0byBiZSBjcmVhdGUgYXMgdGhhdCBCYXNlTW9kZWwgQ2xhc3MuXG4gICAgICAgICAgICAgICAgdmFyIGJhc2VNb2RlbF8xID0gdGhpc1twcm9wZXJ0eU5hbWVdWzBdO1xuICAgICAgICAgICAgICAgIHRoaXNbcHJvcGVydHlOYW1lXSA9IHVwZGF0ZURhdGEubWFwKGZ1bmN0aW9uIChkYXRhKSB7IHJldHVybiBfdGhpcy5fdXBkYXRlRGF0YShiYXNlTW9kZWxfMSwgZGF0YSk7IH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpc1twcm9wZXJ0eU5hbWVdID0gW107XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzW3Byb3BlcnR5TmFtZV0gPSB0aGlzLl91cGRhdGVEYXRhKHRoaXNbcHJvcGVydHlOYW1lXSwgdXBkYXRlRGF0YSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEBtZXRob2QgX3VwZGF0ZURhdGFcbiAgICAgKiBAcGFyYW0gcHJvcGVydHlEYXRhXG4gICAgICogQHBhcmFtIHVwZGF0ZURhdGFcbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgQmFzZU1vZGVsLnByb3RvdHlwZS5fdXBkYXRlRGF0YSA9IGZ1bmN0aW9uIChwcm9wZXJ0eURhdGEsIHVwZGF0ZURhdGEpIHtcbiAgICAgICAgdmFyIHJldHVybkRhdGEgPSBudWxsO1xuICAgICAgICBpZiAodGhpcy5zanNPcHRpb25zLmV4cGFuZCA9PT0gZmFsc2UgJiYgdHlwZW9mIHVwZGF0ZURhdGEgPT09ICdmdW5jdGlvbicgJiYgdXBkYXRlRGF0YS5JU19CQVNFX01PREVMID09PSB0cnVlKSB7XG4gICAgICAgICAgICAvLyBJZiB1cGRhdGVEYXRhIGlzIGEgZnVuY3Rpb24gYW5kIGhhcyBhbiBJU19CQVNFX01PREVMIHN0YXRpYyBwcm9wZXJ0eSB0aGVuIGl0IG11c3QgYmUgYSBjaGlsZCBtb2RlbCBhbmQgd2UgbmVlZCB0byByZXR1cm4gbnVsbFxuICAgICAgICAgICAgLy8gc28gaXQgY2xlYW5zIHVwIHRoZSBCYXNlTW9kZWwgZnVuY3Rpb25zIG9uIHRoZSBwcm9wZXJ0eS5cbiAgICAgICAgICAgIC8vIFRvIGNyZWF0ZSBlbXB0eSBtb2RlbChzKSBwYXNzIHsgZXhwYW5kOiB0cnVlIH0gZm9yIHRoZSBvcHRpb25zLlxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHR5cGVvZiBwcm9wZXJ0eURhdGEgPT09ICdmdW5jdGlvbicgJiYgcHJvcGVydHlEYXRhLklTX0JBU0VfTU9ERUwgPT09IHRydWUgJiYgdXBkYXRlRGF0YSkge1xuICAgICAgICAgICAgLy8gSWYgdGhlIHByb3BlcnR5RGF0YSBpcyBhbiBpbnN0YW5jZSBvZiBhIEJhc2VNb2RlbCBjbGFzcyBhbmQgaGFzIG5vdCBiZWVuIGNyZWF0ZWQgeWV0LlxuICAgICAgICAgICAgLy8gSW5zdGFudGlhdGUgaXQgYW5kIHBhc3MgaW4gdGhlIHVwZGF0ZURhdGEgdG8gdGhlIGNvbnN0cnVjdG9yLlxuICAgICAgICAgICAgcmV0dXJuRGF0YSA9IG5ldyBwcm9wZXJ0eURhdGEodXBkYXRlRGF0YSwgdGhpcy5zanNPcHRpb25zKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICgocHJvcGVydHlEYXRhIGluc3RhbmNlb2YgQmFzZU1vZGVsKSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgLy8gSWYgcHJvcGVydHlEYXRhIGlzIGFuIGluc3RhbmNlIG9mIGEgQmFzZU1vZGVsIGNsYXNzIGFuZCBoYXMgYWxyZWFkeSBiZWVuIGNyZWF0ZWQuXG4gICAgICAgICAgICAvLyBDYWxsIHRoZSB1cGRhdGUgbWV0aG9kIGFuZCBwYXNzIGluIHRoZSB1cGRhdGVEYXRhLlxuICAgICAgICAgICAgcHJvcGVydHlEYXRhLnVwZGF0ZSh1cGRhdGVEYXRhKTtcbiAgICAgICAgICAgIHJldHVybkRhdGEgPSBwcm9wZXJ0eURhdGE7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAvLyBFbHNlIGp1c3QgcmV0dXJuIHRoZSB1cGRhdGVEYXRhIHRvIHRoZSBwcm9wZXJ0eS5cbiAgICAgICAgICAgIHJldHVybkRhdGEgPSB1cGRhdGVEYXRhO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXR1cm5EYXRhO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogQ29udmVydHMgdGhlIEJhc2UgTW9kZWwgZGF0YSBpbnRvIGEgSlNPTiBvYmplY3QgYW5kIGRlbGV0ZXMgdGhlIHNqc0lkIHByb3BlcnR5LlxuICAgICAqXG4gICAgICogQG1ldGhvZCB0b0pTT05cbiAgICAgKiBAcmV0dXJucyB7YW55fVxuICAgICAqIEBwdWJsaWNcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqICAgICBjb25zdCBvYmogPSBjYXJNb2RlbC50b0pTT04oKTtcbiAgICAgKi9cbiAgICBCYXNlTW9kZWwucHJvdG90eXBlLnRvSlNPTiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGNsb25lID0gVXRpbF8xW1wiZGVmYXVsdFwiXS5jbG9uZSh0aGlzKTtcbiAgICAgICAgcmV0dXJuIFV0aWxfMVtcImRlZmF1bHRcIl0uZGVsZXRlUHJvcGVydHlGcm9tT2JqZWN0KGNsb25lLCBbJ3Nqc0lkJywgJ3Nqc09wdGlvbnMnXSk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBDb252ZXJ0cyBhICBCYXNlIE1vZGVsIHRvIGEgSlNPTiBzdHJpbmcsXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIHRvSlNPTlN0cmluZ1xuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XG4gICAgICogQHB1YmxpY1xuICAgICAqIEBleGFtcGxlXG4gICAgICogICAgIGNvbnN0IHN0ciA9IGNhck1vZGVsLnRvSlNPTlN0cmluZygpO1xuICAgICAqL1xuICAgIEJhc2VNb2RlbC5wcm90b3R5cGUudG9KU09OU3RyaW5nID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkodGhpcy50b0pTT04oKSk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBDb252ZXJ0cyB0aGUgc3RyaW5nIGpzb24gZGF0YSBpbnRvIGFuIE9iamVjdCBhbmQgY2FsbHMgdGhlIHt7I2Nyb3NzTGluayBcIkJhc2VNb2RlbC91cGRhdGU6bWV0aG9kXCJ9fXt7L2Nyb3NzTGlua319IG1ldGhvZCB3aXRoIHRoZSBjb252ZXJ0ZWQgT2JqZWN0LlxuICAgICAqXG4gICAgICogQG1ldGhvZCBmcm9tSlNPTlxuICAgICAqIEBwYXJhbSBqc29uIHtzdHJpbmd9XG4gICAgICogQHB1YmxpY1xuICAgICAqIEBleGFtcGxlXG4gICAgICogICAgICBjb25zdCBzdHIgPSAne1wibWFrZVwiOlwiVGVzbGFcIixcIm1vZGVsXCI6XCJNb2RlbCBTXCIsXCJ5ZWFyXCI6MjAxNH0nXG4gICAgICogICAgICBjb25zdCBjYXJNb2RlbCA9IG5ldyBDYXJNb2RlbCgpO1xuICAgICAqICAgICAgY2FyTW9kZWwuZnJvbUpTT04oc3RyKTtcbiAgICAgKi9cbiAgICBCYXNlTW9kZWwucHJvdG90eXBlLmZyb21KU09OID0gZnVuY3Rpb24gKGpzb24pIHtcbiAgICAgICAgdmFyIHBhcnNlZERhdGEgPSBKU09OLnBhcnNlKGpzb24pO1xuICAgICAgICB0aGlzLnVwZGF0ZShwYXJzZWREYXRhKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBDcmVhdGUgYSBjbG9uZS9jb3B5IG9mIHRoZSAgQmFzZSBNb2RlbC5cbiAgICAgKlxuICAgICAqIEBtZXRob2QgY2xvbmVcbiAgICAgKiBAcmV0dXJucyB7QmFzZU1vZGVsfVxuICAgICAqIEBwdWJsaWNcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqICAgICBjb25zdCBjbG9uZSA9IGNhck1vZGVsLmNsb25lKCk7XG4gICAgICovXG4gICAgQmFzZU1vZGVsLnByb3RvdHlwZS5jbG9uZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGNsb25lZEJhc2VNb2RlbCA9IG5ldyB0aGlzLmNvbnN0cnVjdG9yKHRoaXMpO1xuICAgICAgICByZXR1cm4gY2xvbmVkQmFzZU1vZGVsO1xuICAgIH07XG4gICAgcmV0dXJuIEJhc2VNb2RlbDtcbn0oQmFzZU9iamVjdF8xW1wiZGVmYXVsdFwiXSkpO1xuLyoqXG4gKiBUaGlzIHByb3BlcnR5IGhlbHBzIGRpc3Rpbmd1aXNoIGEgQmFzZU1vZGVsIGZyb20gb3RoZXIgZnVuY3Rpb25zLlxuICpcbiAqIEBwcm9wZXJ0eSBJU19CQVNFX01PREVMXG4gKiBAdHlwZSB7Ym9vbGVhbn1cbiAqIEBwdWJsaWNcbiAqIEBzdGF0aWNcbiAqIEByZWFkb25seVxuICovXG5CYXNlTW9kZWwuSVNfQkFTRV9NT0RFTCA9IHRydWU7XG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBCYXNlTW9kZWw7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1CYXNlTW9kZWwuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG4vKipcbiAqIEEgVXRpbGl0eSBjbGFzcyB0aGF0IGhhcyBzZXZlcmFsIHN0YXRpYyBtZXRob2RzIHRvIGFzc2lzdCBpbiBkZXZlbG9wbWVudC5cbiAqXG4gKiBAY2xhc3MgVXRpbFxuICogQG1vZHVsZSBTdHJ1Y3R1cmVKU1xuICogQHN1Ym1vZHVsZSB1dGlsXG4gKiBAYXV0aG9yIFJvYmVydCBTLiAod3d3LmNvZGVCZWx0LmNvbSlcbiAqIEBzdGF0aWNcbiAqL1xudmFyIFV0aWwgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFV0aWwoKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignW1V0aWxdIERvIG5vdCBpbnN0YW50aWF0ZSB0aGUgVXRpbCBjbGFzcyBiZWNhdXNlIGl0IGlzIGEgc3RhdGljIGNsYXNzLicpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBHZW5lcmF0ZXMgYSB1bmlxdWUgSUQuIElmIGEgcHJlZml4IGlzIHBhc3NlZCBpbiwgdGhlIHZhbHVlIHdpbGwgYmUgYXBwZW5kZWQgdG8gaXQuXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIHVuaXF1ZUlkXG4gICAgICogQHBhcmFtIFtwcmVmaXhdIHtzdHJpbmd9IFRoZSBzdHJpbmcgdmFsdWUgdXNlZCBmb3IgdGhlIHByZWZpeC5cbiAgICAgKiBAcmV0dXJucyB7aW5pdHxzdHJpbmd9IFJldHVybnMgdGhlIHVuaXF1ZSBpZGVudGlmaWVyLlxuICAgICAqIEBwdWJsaWNcbiAgICAgKiBAc3RhdGljXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiAgICAgIGxldCBwcm9wZXJ0eSA9IFV0aWwudW5pcXVlSWQoKTtcbiAgICAgKiAgICAgIC8vIDFcbiAgICAgKlxuICAgICAqICAgICAgbGV0IHByb3BlcnR5ID0gVXRpbC51bmlxdWVJZCgncHJlZml4TmFtZV8nKTtcbiAgICAgKiAgICAgIC8vIHByZWZpeE5hbWVfMVxuICAgICAqL1xuICAgIFV0aWwudW5pcXVlSWQgPSBmdW5jdGlvbiAocHJlZml4KSB7XG4gICAgICAgIGlmIChwcmVmaXggPT09IHZvaWQgMCkgeyBwcmVmaXggPSBudWxsOyB9XG4gICAgICAgIHZhciBpZCA9ICsrVXRpbC5faWRDb3VudGVyO1xuICAgICAgICBpZiAocHJlZml4ICE9IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiBTdHJpbmcocHJlZml4ICsgaWQpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGlkO1xuICAgICAgICB9XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBSZW1vdmVzIGEgbGlzdCBvZiBwcm9wZXJ0aWVzIGZyb20gYW4gb2JqZWN0LlxuICAgICAqXG4gICAgICogQG1ldGhvZCBkZWxldGVQcm9wZXJ0eUZyb21PYmplY3RcbiAgICAgKiBAcGFyYW0gb2JqZWN0IHtPYmplY3R9IFRoZSBvYmplY3QgeW91IHdhbnQgdG8gcmVtb3ZlIHByb3BlcnRpZXMgZnJvbS5cbiAgICAgKiBAcGFyYW0gdmFsdWUge3N0cmluZ3xBcnJheS48c3RyaW5nPn0gQSBwcm9wZXJ0eSBuYW1lIG9yIGFuIGFycmF5IG9mIHByb3BlcnR5IG5hbWVzIHlvdSB3YW50IHRvIHJlbW92ZSBmcm9tIHRoZSBvYmplY3QuXG4gICAgICogQHJldHVybnMge2FueX0gUmV0dXJucyB0aGUgb2JqZWN0IHBhc3NlZCBpbiB3aXRob3V0IHRoZSByZW1vdmVkIHRoZSBwcm9wZXJ0aWVzLlxuICAgICAqIEBwdWJsaWNcbiAgICAgKiBAc3RhdGljXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiAgICAgIGxldCBvYmogPSB7IG5hbWU6ICdSb2JlcnQnLCBnZW5kZXI6ICdtYWxlJywgcGhvbmU6ICc1NTUtNTU1LTU1NTUnIH1cbiAgICAgKlxuICAgICAqICAgICAgVXRpbC5kZWxldGVQcm9wZXJ0eUZyb21PYmplY3Qob2JqLCBbJ3Bob25lJywgJ2dlbmRlciddKTtcbiAgICAgKlxuICAgICAqICAgICAgLy8geyBuYW1lOiAnUm9iZXJ0JyB9XG4gICAgICovXG4gICAgVXRpbC5kZWxldGVQcm9wZXJ0eUZyb21PYmplY3QgPSBmdW5jdGlvbiAob2JqZWN0LCB2YWx1ZSkge1xuICAgICAgICAvLyBJZiBwcm9wZXJ0aWVzIGlzIG5vdCBhbiBhcnJheSB0aGVuIG1ha2UgaXQgYW4gYXJyYXkgb2JqZWN0LlxuICAgICAgICB2YXIgbGlzdCA9ICh2YWx1ZSBpbnN0YW5jZW9mIEFycmF5KSA/IHZhbHVlIDogW3ZhbHVlXTtcbiAgICAgICAgT2JqZWN0XG4gICAgICAgICAgICAua2V5cyhvYmplY3QpXG4gICAgICAgICAgICAuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgICAgICB2YXIgdmFsdWUgPSBvYmplY3Rba2V5XTtcbiAgICAgICAgICAgIGlmIChsaXN0LmluY2x1ZGVzKGtleSkgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICBkZWxldGUgb2JqZWN0W2tleV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICh2YWx1ZSBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICAgICAgICAgICAgdmFsdWUuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkgeyByZXR1cm4gVXRpbC5kZWxldGVQcm9wZXJ0eUZyb21PYmplY3QoaXRlbSwgbGlzdCk7IH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAodmFsdWUgaW5zdGFuY2VvZiBPYmplY3QpIHtcbiAgICAgICAgICAgICAgICBVdGlsLmRlbGV0ZVByb3BlcnR5RnJvbU9iamVjdCh2YWx1ZSwgbGlzdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gb2JqZWN0O1xuICAgIH07XG4gICAgLyoqXG4gICAgICogUmVuYW1lcyBhIHByb3BlcnR5IG5hbWUgb24gYW4gb2JqZWN0LlxuICAgICAqXG4gICAgICogQG1ldGhvZCByZW5hbWVQcm9wZXJ0eU9uT2JqZWN0XG4gICAgICogQHBhcmFtIG9iamVjdCB7T2JqZWN0fSBUaGUgb2JqZWN0IHlvdSB3YW50IHRvIHJlbmFtZSBwcm9wZXJ0aWVzIGZyb20uXG4gICAgICogQHBhcmFtIG9sZE5hbWUge3N0cmluZ31cbiAgICAgKiBAcGFyYW0gbmV3TmFtZSB7c3RyaW5nfVxuICAgICAqIEByZXR1cm5zIHthbnl9IFJldHVybnMgdGhlIG9iamVjdCBwYXNzZWQgaW4gcmVuYW1lZCBwcm9wZXJ0aWVzLlxuICAgICAqIEBwdWJsaWNcbiAgICAgKiBAc3RhdGljXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiAgICAgIGxldCBvYmogPSB7IG5hbWU6ICdSb2JlcnQnLCBnZW5kZXI6ICdtYWxlJywgcGhvbmU6ICc1NTUtNTU1LTU1NTUnIH1cbiAgICAgKlxuICAgICAqICAgICAgVXRpbC5yZW5hbWVQcm9wZXJ0eU9uT2JqZWN0KG9iaiwgJ2dlbmRlcicsICdzZXgnKTtcbiAgICAgKlxuICAgICAqICAgICAgLy8geyBuYW1lOiAnUm9iZXJ0Jywgc2V4OiAnbWFsZScsIHBob25lOiAnNTU1LTU1NS01NTU1JyB9XG4gICAgICovXG4gICAgVXRpbC5yZW5hbWVQcm9wZXJ0eU9uT2JqZWN0ID0gZnVuY3Rpb24gKG9iamVjdCwgb2xkTmFtZSwgbmV3TmFtZSkge1xuICAgICAgICAvLyBDaGVjayBmb3IgdGhlIG9sZCBwcm9wZXJ0eSBuYW1lIHRvIGF2b2lkIGEgUmVmZXJlbmNlRXJyb3IgaW4gc3RyaWN0IG1vZGUuXG4gICAgICAgIGlmIChvYmplY3QuaGFzT3duUHJvcGVydHkob2xkTmFtZSkpIHtcbiAgICAgICAgICAgIG9iamVjdFtuZXdOYW1lXSA9IG9iamVjdFtvbGROYW1lXTtcbiAgICAgICAgICAgIGRlbGV0ZSBvYmplY3Rbb2xkTmFtZV07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG9iamVjdDtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIE1ha2VzIGEgY2xvbmUgb2YgYW4gb2JqZWN0LlxuICAgICAqXG4gICAgICogQG1ldGhvZCBjbG9uZVxuICAgICAqIEBwYXJhbSBvYmoge09iamVjdH0gVGhlIG9iamVjdCB5b3UgdG8gY2xvbmUuXG4gICAgICogQHJldHVybnMge2FueX0gUmV0dXJucyBhIGNsb25lIG9iamVjdCBvZiB0aGUgb25lIHBhc3NlZCBpbi5cbiAgICAgKiBAcHVibGljXG4gICAgICogQHN0YXRpY1xuICAgICAqIEBleGFtcGxlXG4gICAgICogICAgICBsZXQgY2xvbmVPZk9iamVjdCA9IFV0aWwuY2xvbmUob2JqKTtcbiAgICAgKi9cbiAgICBVdGlsLmNsb25lID0gZnVuY3Rpb24gKG9iaikge1xuICAgICAgICAvL290aGVyIHNjcmlwdHM6IGh0dHA6Ly9kYXZpZHdhbHNoLm5hbWUvamF2YXNjcmlwdC1jbG9uZVxuICAgICAgICAvL2h0dHA6Ly9vcmFubG9vbmV5LmNvbS9mdW5jdGlvbmFsLWphdmFzY3JpcHQvXG4gICAgICAgIC8vaHR0cDovL29yYW5sb29uZXkuY29tL2RlZXAtY29weS1qYXZhc2NyaXB0L1xuICAgICAgICAvLyBIYW5kbGUgdGhlIDMgc2ltcGxlIHR5cGVzLCBhbmQgbnVsbCBvciB1bmRlZmluZWRcbiAgICAgICAgaWYgKG51bGwgPT0gb2JqIHx8ICdvYmplY3QnICE9IHR5cGVvZiBvYmopIHtcbiAgICAgICAgICAgIHJldHVybiBvYmo7XG4gICAgICAgIH1cbiAgICAgICAgLy8gSGFuZGxlIERhdGVcbiAgICAgICAgaWYgKG9iaiBpbnN0YW5jZW9mIERhdGUpIHtcbiAgICAgICAgICAgIHZhciBkYXRlID0gbmV3IERhdGUoKTtcbiAgICAgICAgICAgIGRhdGUuc2V0VGltZShvYmouZ2V0VGltZSgpKTtcbiAgICAgICAgICAgIHJldHVybiBkYXRlO1xuICAgICAgICB9XG4gICAgICAgIC8vIEhhbmRsZSBBcnJheVxuICAgICAgICBpZiAob2JqIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgICAgICAgIHZhciBhcnJheSA9IFtdO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IG9iai5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgICAgICAgIGFycmF5W2ldID0gVXRpbC5jbG9uZShvYmpbaV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGFycmF5O1xuICAgICAgICB9XG4gICAgICAgIC8vIEhhbmRsZSBPYmplY3RcbiAgICAgICAgaWYgKG9iaiBpbnN0YW5jZW9mIE9iamVjdCkge1xuICAgICAgICAgICAgdmFyIGNvcHkgPSB7fTtcbiAgICAgICAgICAgIGZvciAodmFyIGF0dHIgaW4gb2JqKSB7XG4gICAgICAgICAgICAgICAgaWYgKG9iai5oYXNPd25Qcm9wZXJ0eShhdHRyKSkge1xuICAgICAgICAgICAgICAgICAgICBjb3B5W2F0dHJdID0gVXRpbC5jbG9uZShvYmpbYXR0cl0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBjb3B5O1xuICAgICAgICB9XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIltVdGlsXSBVbmFibGUgdG8gY29weSBvYmohIEl0cyB0eXBlIGlzbid0IHN1cHBvcnRlZC5cIik7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBDb252ZXJ0cyBhIHN0cmluZyBvciBudW1iZXIgdG8gYSBib29sZWFuLlxuICAgICAqXG4gICAgICogQG1ldGhvZCB0b0Jvb2xlYW5cbiAgICAgKiBAcGFyYW0gc3RyTnVtIHtzdHJpbmd8bnVtYmVyfVxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAqIEBwdWJsaWNcbiAgICAgKiBAc3RhdGljXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiAgICAgIFV0aWwudG9Cb29sZWFuKFwiVFJVRVwiKTtcbiAgICAgKiAgICAgIC8vIHRydWVcbiAgICAgKlxuICAgICAqICAgICAgVXRpbC50b0Jvb2xlYW4oMCk7XG4gICAgICogICAgICAvLyBmYWxzZVxuICAgICAqXG4gICAgICogICAgICBVdGlsLnRvQm9vbGVhbih1bmRlZmluZWQpO1xuICAgICAqICAgICAgLy8gZmFsc2VcbiAgICAgKi9cbiAgICBVdGlsLnRvQm9vbGVhbiA9IGZ1bmN0aW9uIChzdHJOdW0pIHtcbiAgICAgICAgdmFyIHZhbHVlID0gKHR5cGVvZiBzdHJOdW0gPT09ICdzdHJpbmcnKSA/IHN0ck51bS50b0xvd2VyQ2FzZSgpIDogc3RyTnVtO1xuICAgICAgICByZXR1cm4gKHZhbHVlID4gMCB8fCB2YWx1ZSA9PSAndHJ1ZScgfHwgdmFsdWUgPT0gJ3llcycpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgbmFtZSBvZiB0aGUgZnVuY3Rpb24vb2JqZWN0IHBhc3NlZCBpbi5cbiAgICAgKlxuICAgICAqIEBtZXRob2QgZ2V0TmFtZVxuICAgICAqIEBwYXJhbSBjbGFzc09iamVjdCB7YW55fVxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIG5hbWUgb2YgdGhlIGZ1bmN0aW9uIG9yIG9iamVjdC5cbiAgICAgKiBAc3RhdGljXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiAgICAgIGxldCBzb21lQ2xhc3MgPSBuZXcgU29tZUNsYXNzKCk7XG4gICAgICogICAgICBVdGlsLmdldE5hbWUoc29tZUNsYXNzKTsgICAgICAgICAgICAvLyAnU29tZUNsYXNzJ1xuICAgICAqXG4gICAgICogICAgICBVdGlsLmdldE5hbWUoZnVuY3Rpb24gVGVzdCgpe30pOyAgICAvLyAnVGVzdCdcbiAgICAgKiAgICAgIFV0aWwuZ2V0TmFtZShmdW5jdGlvbiAoKXt9KTsgICAgICAgIC8vICdhbm9ueW1vdXMnXG4gICAgICovXG4gICAgVXRpbC5nZXROYW1lID0gZnVuY3Rpb24gKGNsYXNzT2JqZWN0KSB7XG4gICAgICAgIHZhciB0eXBlID0gdHlwZW9mIGNsYXNzT2JqZWN0O1xuICAgICAgICB2YXIgdmFsdWU7XG4gICAgICAgIHZhciBmdW5jTmFtZVJlZ2V4ID0gL2Z1bmN0aW9uIChbXlxcKF0rKS87XG4gICAgICAgIGlmICh0eXBlID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgLy8gR2V0cyB0aGUgbmFtZSBvZiB0aGUgb2JqZWN0LlxuICAgICAgICAgICAgdmFyIHJlc3VsdHMgPSBjbGFzc09iamVjdC5jb25zdHJ1Y3Rvci50b1N0cmluZygpLm1hdGNoKGZ1bmNOYW1lUmVnZXgpO1xuICAgICAgICAgICAgdmFsdWUgPSByZXN1bHRzWzFdO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgLy8gVGhpcyBlbHNlIGNvZGUgaXMgbWFpbmx5IGZvciBJbnRlcm5ldCBFeHBsb3JlLlxuICAgICAgICAgICAgdmFyIGlzRnVuY3Rpb24gPSAodHlwZSA9PT0gJ2Z1bmN0aW9uJyk7XG4gICAgICAgICAgICAvLyBUT0RPOiBmaWd1cmUgb3V0IGhvdyB0byBleHBsYWluIHRoaXNcbiAgICAgICAgICAgIHZhciBuYW1lXzEgPSBpc0Z1bmN0aW9uICYmICgoY2xhc3NPYmplY3QubmFtZSAmJiBbJycsIGNsYXNzT2JqZWN0Lm5hbWVdKSB8fCBjbGFzc09iamVjdC50b1N0cmluZygpLm1hdGNoKGZ1bmNOYW1lUmVnZXgpKTtcbiAgICAgICAgICAgIGlmIChpc0Z1bmN0aW9uID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgIHZhbHVlID0gdHlwZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKG5hbWVfMSAmJiBuYW1lXzFbMV0pIHtcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IG5hbWVfMVsxXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHZhbHVlID0gJ2Fub255bW91cyc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhbmQgcmV0dXJucyBhIG5ldyBkZWJvdW5jZWQgdmVyc2lvbiBvZiB0aGUgcGFzc2VkIGZ1bmN0aW9uIHdoaWNoIHdpbGwgcG9zdHBvbmUgaXRzIGV4ZWN1dGlvbiB1bnRpbCBhZnRlclxuICAgICAqIHdhaXQgbWlsbGlzZWNvbmRzIGhhdmUgZWxhcHNlZCBzaW5jZSB0aGUgbGFzdCB0aW1lIGl0IHdhcyBpbnZva2VkLlxuICAgICAqXG4gICAgICogQG1ldGhvZCBkZWJvdW5jZVxuICAgICAqIEBwYXJhbSBjYWxsYmFjayB7RnVuY3Rpb259IFRoZSBmdW5jdGlvbiB0aGF0IHNob3VsZCBiZSBleGVjdXRlZC5cbiAgICAgKiBAcGFyYW0gd2FpdCB7bnVtYmVyfSBNaWxsaXNlY29uZHMgdG8gZWxhcHNlZCBiZWZvcmUgaW52b2tpbmcgdGhlIGNhbGxiYWNrLlxuICAgICAqIEBwYXJhbSBpbW1lZGlhdGUge2Jvb2xlYW59IFBhc3MgdHJ1ZSBmb3IgdGhlIGltbWVkaWF0ZSBwYXJhbWV0ZXIgdG8gY2F1c2UgZGVib3VuY2UgdG8gdHJpZ2dlciB0aGUgZnVuY3Rpb24gb24gdGhlIGxlYWRpbmcgaW5zdGVhZCBvZiB0aGUgdHJhaWxpbmcgZWRnZSBvZiB0aGUgd2FpdCBpbnRlcnZhbC4gVXNlZnVsIGluIGNpcmN1bXN0YW5jZXMgbGlrZSBwcmV2ZW50aW5nIGFjY2lkZW50YWwgZG91YmxlLWNsaWNrcyBvbiBhIFwic3VibWl0XCIgYnV0dG9uIGZyb20gZmlyaW5nIGEgc2Vjb25kIHRpbWUuXG4gICAgICogQHBhcmFtIGNhbGxiYWNrU2NvcGUge2FueX0gVGhlIHNjb3BlIG9mIHRoZSBjYWxsYmFjayBmdW5jdGlvbiB0aGF0IHNob3VsZCBiZSBleGVjdXRlZC5cbiAgICAgKiBAcHVibGljXG4gICAgICogQHN0YXRpY1xuICAgICAqIEBleGFtcGxlXG4gICAgICogICAgICBVdGlsLmRlYm91bmNlKHRoaXMuX29uQnJlYWtwb2ludENoYW5nZSwgMjUwLCBmYWxzZSwgdGhpcyk7XG4gICAgICovXG4gICAgVXRpbC5kZWJvdW5jZSA9IGZ1bmN0aW9uIChjYWxsYmFjaywgd2FpdCwgaW1tZWRpYXRlLCBjYWxsYmFja1Njb3BlKSB7XG4gICAgICAgIHZhciB0aW1lb3V0O1xuICAgICAgICB2YXIgcmVzdWx0O1xuICAgICAgICB2YXIgZGVib3VuY2VkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIGFyZ3MgPSBhcmd1bWVudHM7XG4gICAgICAgICAgICBmdW5jdGlvbiBkZWxheWVkKCkge1xuICAgICAgICAgICAgICAgIGlmIChpbW1lZGlhdGUgPT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gY2FsbGJhY2suYXBwbHkoY2FsbGJhY2tTY29wZSwgYXJncyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRpbWVvdXQgPSBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRpbWVvdXQpIHtcbiAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQodGltZW91dCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChpbW1lZGlhdGUgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICByZXN1bHQgPSBjYWxsYmFjay5hcHBseShjYWxsYmFja1Njb3BlLCBhcmdzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRpbWVvdXQgPSBzZXRUaW1lb3V0KGRlbGF5ZWQsIHdhaXQpO1xuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfTtcbiAgICAgICAgZGVib3VuY2VkLmNhbmNlbCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aW1lb3V0KTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIGRlYm91bmNlZDtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFRPRE86IFlVSURvY19jb21tZW50XG4gICAgICpcbiAgICAgKiBAbWV0aG9kIGFwcGx5TWl4aW5zXG4gICAgICogQHBhcmFtIGRlcml2ZWRDdG9yIHthbnl9XG4gICAgICogQHBhcmFtIGJhc2VDdG9ycyB7YW55fVxuICAgICAqIEBwdWJsaWNcbiAgICAgKiBAc3RhdGljXG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICBjbGFzcyBGbGllcyB7XG4gICAgICAgICAgICAgICAgZmx5KCkge1xuICAgICAgICAgICAgICAgICAgICBhbGVydCgnSXMgaXQgYSBiaXJkPyBJcyBpdCBhIHBsYW5lPycpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICBjbGFzcyBDbGltYnMge1xuICAgICAgICAgICAgICAgIGNsaW1iKCkge1xuICAgICAgICAgICAgICAgICAgICBhbGVydCgnTXkgc3BpZGVyLXNlbnNlIGlzIHRpbmdsaW5nLicpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICBjbGFzcyBIb3JzZWZseVdvbWFuIGltcGxlbWVudHMgQ2xpbWJzLCBGbGllcyB7XG4gICAgICAgICAgICAgICAgY2xpbWI6ICgpID0+IHZvaWQ7XG4gICAgICAgICAgICAgICAgZmx5OiAoKSA9PiB2b2lkO1xuICAgICAgICAgICAgfVxuXG4gICAgIFV0aWwuYXBwbHlNaXhpbnMoSG9yc2VmbHlXb21hbiwgW0NsaW1icywgRmxpZXNdKTtcbiAgICAgKi9cbiAgICBVdGlsLmFwcGx5TWl4aW5zID0gZnVuY3Rpb24gKGRlcml2ZWRDdG9yLCBiYXNlQ3RvcnMpIHtcbiAgICAgICAgYmFzZUN0b3JzLmZvckVhY2goZnVuY3Rpb24gKGJhc2VDdG9yKSB7XG4gICAgICAgICAgICBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhiYXNlQ3Rvci5wcm90b3R5cGUpLmZvckVhY2goZnVuY3Rpb24gKG5hbWUpIHtcbiAgICAgICAgICAgICAgICBkZXJpdmVkQ3Rvci5wcm90b3R5cGVbbmFtZV0gPSBiYXNlQ3Rvci5wcm90b3R5cGVbbmFtZV07XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGEgbmV3IGFycmF5IHdpdGggZHVwbGljYXRlcyByZW1vdmVkLlxuICAgICAqXG4gICAgICogQG1ldGhvZCB1bmlxdWVcbiAgICAgKiBAcGFyYW0gbGlzdCB7QXJyYXkuPGFueT59IFRoZSBhcnJheSB5b3Ugd2FudCB0byB1c2UgdG8gZ2VuZXJhdGUgdGhlIHVuaXF1ZSBhcnJheS5cbiAgICAgKiBAcmV0dXJuIHtBcnJheTxhbnk+fSBSZXR1cm5zIGEgbmV3IGFycmF5IGxpc3Qgb2YgdW5pcXVlIGl0ZW1zLlxuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICBVdGlsLnVuaXF1ZSA9IGZ1bmN0aW9uIChsaXN0KSB7XG4gICAgICAgIHZhciB1bmlxdWVMaXN0ID0gbGlzdC5yZWR1Y2UoZnVuY3Rpb24gKHByZXZpb3VzVmFsdWUsIGN1cnJlbnRWYWx1ZSkge1xuICAgICAgICAgICAgaWYgKHByZXZpb3VzVmFsdWUuaW5kZXhPZihjdXJyZW50VmFsdWUpID09PSAtMSkge1xuICAgICAgICAgICAgICAgIHByZXZpb3VzVmFsdWUucHVzaChjdXJyZW50VmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHByZXZpb3VzVmFsdWU7XG4gICAgICAgIH0sIFtdKTtcbiAgICAgICAgcmV0dXJuIHVuaXF1ZUxpc3Q7XG4gICAgfTtcbiAgICByZXR1cm4gVXRpbDtcbn0oKSk7XG4vKipcbiAqIEtlZXBzIHRyYWNrIG9mIHRoZSBjb3VudCBmb3IgdGhlIHVuaXF1ZUlkIG1ldGhvZC5cbiAqXG4gKiBAcHJvcGVydHkgX2lkQ291bnRlclxuICogQHR5cGUge2ludH1cbiAqIEBwcml2YXRlXG4gKiBAc3RhdGljXG4gKi9cblV0aWwuX2lkQ291bnRlciA9IDA7XG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBVdGlsO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9VXRpbC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbi8qKlxuICogQSBWYWxpZGF0aW9uVXRpbGl0eSBjbGFzcyB0aGF0IGhhcyBzZXZlcmFsIHN0YXRpYyBtZXRob2RzIHRvIGFzc2lzdCBpbiBkZXZlbG9wbWVudC5cbiAqXG4gKiBAY2xhc3MgVmFsaWRhdGlvblV0aWxcbiAqIEBtb2R1bGUgU3RydWN0dXJlSlNcbiAqIEBzdWJtb2R1bGUgdXRpbFxuICogQGF1dGhvciBSb2JlcnQgUy4gKHd3dy5jb2RlQmVsdC5jb20pXG4gKiBAc3RhdGljXG4gKi9cbnZhciBWYWxpZGF0aW9uVXRpbCA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gVmFsaWRhdGlvblV0aWwoKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignW1ZhbGlkYXRpb25VdGlsXSBEbyBub3QgaW5zdGFudGlhdGUgdGhlIFZhbGlkYXRpb25VdGlsIGNsYXNzIGJlY2F1c2UgaXQgaXMgYSBzdGF0aWMgY2xhc3MuJyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIERldGVybWluZXMgaWYgdGhlIFN0cmluZyBwYXNzZWQgaGFzIGEgbGVuZ3RoLlxuICAgICAqXG4gICAgICogQG1ldGhvZCBpc0VtcHR5XG4gICAgICogQHBhcmFtIHZhbHVlIHtzdHJpbmd9XG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICogQHB1YmxpY1xuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqICAgICAgVmFsaWRhdGlvblV0aWwuaXNFbXB0eSgnc29tZXRleHQnKTtcbiAgICAgKiAgICAgIC8vIGZhbHNlXG4gICAgICovXG4gICAgVmFsaWRhdGlvblV0aWwuaXNFbXB0eSA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICBpZiAodmFsdWUgIT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIHZhbHVlLmxlbmd0aCA8IDE7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBEZXRlcm1pbmVzIGlmIHRoZSB0d28gdmFsdWVzIHBhc3NlZCBpbiBhcmUgdGhlIHNhbWUuXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIGlzTWF0Y2hcbiAgICAgKiBAcGFyYW0gdmFsdWUxIHthbnl9XG4gICAgICogQHBhcmFtIHZhbHVlMiB7YW55fVxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAqIEBwdWJsaWNcbiAgICAgKiBAc3RhdGljXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiAgICAgIFZhbGlkYXRpb25VdGlsLmlzTWF0Y2goJ29uZUBlbWFpbC5jb20nLCAndHdvQGVtYWlsLmNvbScpO1xuICAgICAqICAgICAgLy8gZmFsc2VcbiAgICAgKi9cbiAgICBWYWxpZGF0aW9uVXRpbC5pc01hdGNoID0gZnVuY3Rpb24gKHZhbHVlMSwgdmFsdWUyKSB7XG4gICAgICAgIHJldHVybiB2YWx1ZTEgPT09IHZhbHVlMjtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIERldGVybWluZXMgaWYgdGhlIFN0cmluZyBwYXNzZWQgaW4gaXMgYSB2YWxpZCBlbWFpbCBhZGRyZXNzLlxuICAgICAqXG4gICAgICogQG1ldGhvZCBpc1ZhbGlkRW1haWxBZGRyZXNzXG4gICAgICogQHBhcmFtIGVtYWlsIHtzdHJpbmd9XG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICogQHB1YmxpY1xuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqICAgICAgVmFsaWRhdGlvblV0aWwuaXNWYWxpZEVtYWlsQWRkcmVzcygnc29tZWVtYWlsQGFkZHJlc3MuY29tJyk7XG4gICAgICogICAgICAvLyB0cnVlXG4gICAgICovXG4gICAgVmFsaWRhdGlvblV0aWwuaXNWYWxpZEVtYWlsQWRkcmVzcyA9IGZ1bmN0aW9uIChlbWFpbCkge1xuICAgICAgICB2YXIgZXhwcmVzc2lvbiA9IC9eWy1hLXpBLVowLTkrX1xcJ11bLS5hLXpBLVowLTkrX1xcJ10qQFstLmEtekEtWjAtOV0rKFxcLlstLmEtekEtWjAtOV0rKSpcXC4oW2EtekEtWl17Mix9KSQvO1xuICAgICAgICByZXR1cm4gZXhwcmVzc2lvbi50ZXN0KGVtYWlsKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIERldGVybWluZXMgaWYgdGhlIFN0cmluZyBwYXNzZWQgaW4gaXMgYSBwaG9uZSBudW1iZXIuXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIGlzVmFsaWRQaG9uZU51bWJlclxuICAgICAqIEBwYXJhbSBwaG9uZU51bWJlciB7c3RyaW5nfVxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAqIEBwdWJsaWNcbiAgICAgKiBAc3RhdGljXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiAgICAgIFZhbGlkYXRpb25VdGlsLmlzVmFsaWRQaG9uZU51bWJlcignMTIzIDQ1NiA3ODk5Jyk7XG4gICAgICogICAgICAvLyB0cnVlXG4gICAgICovXG4gICAgVmFsaWRhdGlvblV0aWwuaXNWYWxpZFBob25lTnVtYmVyID0gZnVuY3Rpb24gKHBob25lTnVtYmVyKSB7XG4gICAgICAgIHZhciBleHByZXNzaW9uID0gL1xcKD8oWzAtOV17M30pXFwpPyhbIC4tXT8pKFswLTldezN9KVxcMihbMC05XXs0fSkkLztcbiAgICAgICAgcmV0dXJuIGV4cHJlc3Npb24udGVzdChwaG9uZU51bWJlcik7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBEZXRlcm1pbmVzIGlmIHRoZSBTdHJpbmcgcGFzc2VkIGluIGlzIGEgemlwIGNvZGUuXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIGlzWmlwQ29kZVxuICAgICAqIEBwYXJhbSB6aXBDb2RlIHtzdHJpbmd9XG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICogQHB1YmxpY1xuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqICAgICAgVmFsaWRhdGlvblV0aWwuaXNaaXBDb2RlKCc1NTA2NyA0NDM0Jyk7XG4gICAgICogICAgICAvLyB0cnVlXG4gICAgICovXG4gICAgVmFsaWRhdGlvblV0aWwuaXNaaXBDb2RlID0gZnVuY3Rpb24gKHppcENvZGUpIHtcbiAgICAgICAgdmFyIGV4cHJlc3Npb24gPSAvXihbMC05XXs1fSkoPzpbLVxcc10qKFswLTldezR9KSk/JC87XG4gICAgICAgIHJldHVybiBleHByZXNzaW9uLnRlc3QoemlwQ29kZSk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBEZXRlcm1pbmVzIGlmIHRoZSBTdHJpbmcgcGFzc2VkIGluIGlzIGEgcG9zdGFsIGNvZGUuXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIGlzUG9zdGFsQ29kZVxuICAgICAqIEBwYXJhbSBwb3N0YWxDb2RlIHtzdHJpbmd9XG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICogQHB1YmxpY1xuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqICAgICAgVmFsaWRhdGlvblV0aWwuaXNQb3N0YWxDb2RlKCdwOG4zaDMnKTtcbiAgICAgKiAgICAgIC8vIHRydWVcbiAgICAgKi9cbiAgICBWYWxpZGF0aW9uVXRpbC5pc1Bvc3RhbENvZGUgPSBmdW5jdGlvbiAocG9zdGFsQ29kZSkge1xuICAgICAgICB2YXIgZXhwcmVzc2lvbiA9IC9eKFtBLVpdWzAtOV1bQS1aXSlcXHMqKFswLTldW0EtWl1bMC05XSkkL2k7XG4gICAgICAgIHJldHVybiBleHByZXNzaW9uLnRlc3QocG9zdGFsQ29kZSk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBEZXRlcm1pbmVzIGlmIHRoZSBTdHJpbmcgcGFzc2VkIGluIGlzIGEgU29jaWFsIFNlY3VyaXR5IE51bWJlci5cbiAgICAgKlxuICAgICAqIEBtZXRob2QgaXNTb2NpYWxTZWN1cml0eU51bWJlclxuICAgICAqIEBwYXJhbSBzc24ge3N0cmluZ31cbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgKiBAcHVibGljXG4gICAgICogQHN0YXRpY1xuICAgICAqIEBleGFtcGxlXG4gICAgICogICAgICBWYWxpZGF0aW9uVXRpbC5pc1NvY2lhbFNlY3VyaXR5TnVtYmVyKCcxNzgwNTExMjAnKTtcbiAgICAgKiAgICAgIC8vIHRydWVcbiAgICAgKi9cbiAgICBWYWxpZGF0aW9uVXRpbC5pc1NvY2lhbFNlY3VyaXR5TnVtYmVyID0gZnVuY3Rpb24gKHNzbikge1xuICAgICAgICB2YXIgZXhwcmVzc2lvbiA9IC9eXFxkezN9LT9cXGR7Mn0tP1xcZHs0fSQvO1xuICAgICAgICByZXR1cm4gZXhwcmVzc2lvbi50ZXN0KHNzbik7XG4gICAgfTtcbiAgICByZXR1cm4gVmFsaWRhdGlvblV0aWw7XG59KCkpO1xuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gVmFsaWRhdGlvblV0aWw7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1WYWxpZGF0aW9uVXRpbC5qcy5tYXAiXX0=

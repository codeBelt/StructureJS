(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _structurejsDisplayStage = require('structurejs/display/Stage');

var _structurejsDisplayStage2 = _interopRequireDefault(_structurejsDisplayStage);

var _viewsPageControlView = require('./views/PageControlView');

var _viewsPageControlView2 = _interopRequireDefault(_viewsPageControlView);

var _viewsListView = require('./views/ListView');

var _viewsListView2 = _interopRequireDefault(_viewsListView);

var _viewsModalsErrorModal = require('./views/modals/ErrorModal');

var _viewsModalsErrorModal2 = _interopRequireDefault(_viewsModalsErrorModal);

var _servicesRequestService = require('./services/RequestService');

var _servicesRequestService2 = _interopRequireDefault(_servicesRequestService);

var _collectionsMovieCollection = require('./collections/MovieCollection');

var _collectionsMovieCollection2 = _interopRequireDefault(_collectionsMovieCollection);

var _modelsMovieModel = require('./models/MovieModel');

var _modelsMovieModel2 = _interopRequireDefault(_modelsMovieModel);

/**
 * TODO: YUIDoc_comment
 *
 * @class App
 * @extends Stage
 * @constructor
 **/

var App = (function (_Stage) {
    _inherits(App, _Stage);

    function App() {
        _classCallCheck(this, App);

        _get(Object.getPrototypeOf(App.prototype), 'constructor', this).call(this);
        this._pageControls = null;
        this._movieCollection = null;
    }

    /**
     * @overridden DOMElement.create
     */

    _createClass(App, [{
        key: 'create',
        value: function create() {
            var _this = this;

            _get(Object.getPrototypeOf(App.prototype), 'create', this).call(this);

            this._pageControls = new _viewsPageControlView2['default'](this.$element.find('.js-pageControlView'));
            this.addChild(this._pageControls);
            this._pageControls.disable(); // Disable right away because by default the view is enabled once passed to the addChild method.

            this._listContainer = new _viewsListView2['default'](this.$element.find('.js-listView'));
            this.addChild(this._listContainer);

            //let modal = new ErrorModal();
            //this.addChildAt(modal, 0);

            _servicesRequestService2['default'].get('assets/data/movies.json').done(function (data) {
                return _this._onMovieRequestComplete(data);
            });
        }

        /**
         * @overridden DOMElement.enable
         */
    }, {
        key: 'enable',
        value: function enable() {
            if (this.isEnabled === true) {
                return;
            }

            this._pageControls.addEventListener('update', this._onUpdate, this);

            return _get(Object.getPrototypeOf(App.prototype), 'enable', this).call(this);
        }

        /**
         * @overridden DOMElement.disable
         */
    }, {
        key: 'disable',
        value: function disable() {
            if (this.isEnabled === false) {
                return;
            }

            this._pageControls.removeEventListener('update', this._onUpdate, this);

            return _get(Object.getPrototypeOf(App.prototype), 'disable', this).call(this);
        }

        /**
         * @overridden DOMElement.layout
         */
    }, {
        key: 'layout',
        value: function layout() {}
        // Layout or update the objects in this parent class.

        /**
         * @overridden DOMElement.destroy
         */

    }, {
        key: 'destroy',
        value: function destroy() {
            this.disable();

            // Call destroy on any child objects.
            // This super method will also null out your properties for garbage collection.

            _get(Object.getPrototypeOf(App.prototype), 'destroy', this).call(this);
        }

        //////////////////////////////////////////////////////////////////////////////////
        // HELPER METHOD
        //////////////////////////////////////////////////////////////////////////////////

        /**
         * TODO: YUIDoc_comment
         *
         * @method _updateList
         * @private
         */
    }, {
        key: '_updateList',
        value: function _updateList() {
            var sortType = this._pageControls.sortType;
            var displayLimit = this._pageControls.displayLimit;

            var isAscending = sortType.indexOf('-asc') > -1 ? true : false;

            var models = undefined;
            switch (sortType) {
                case 'critic-desc':
                case 'critic-asc':
                    models = this._movieCollection.sortByCriticsScore(isAscending);
                    break;
                case 'audience-desc':
                case 'audience-asc':
                    models = this._movieCollection.sortByAudienceScore(isAscending);
                    break;
                case 'theater-asc':
                case 'theater-desc':
                    models = this._movieCollection.sortByTheaterReleaseDate(isAscending);
                    break;
                default:
                    models = this._movieCollection.models;
            }

            // Slice of the first set of models.
            models = models.slice(0, displayLimit);

            this._listContainer.updateList(models);
        }

        //////////////////////////////////////////////////////////////////////////////////
        // EVENT HANDLERS
        //////////////////////////////////////////////////////////////////////////////////

        /**
         * TODO: YUIDoc_comment
         *
         * @method _onMovieRequestComplete
         * @private
         */
    }, {
        key: '_onMovieRequestComplete',
        value: function _onMovieRequestComplete(data) {
            this._movieCollection = new _collectionsMovieCollection2['default'](_modelsMovieModel2['default']);
            this._movieCollection.add(data.movies);

            this._updateList();

            this._pageControls.enable();
        }

        /**
         * TODO: YUIDoc_comment
         *
         * @method _onUpdate
         * @param event {BaseEvent}
         * @private
         */
    }, {
        key: '_onUpdate',
        value: function _onUpdate(event) {
            this._updateList();
        }
    }]);

    return App;
})(_structurejsDisplayStage2['default']);

exports['default'] = App;
module.exports = exports['default'];

/**
 * @property _pageControls
 * @type {PageControlView}
 * @private
 */

/**
 * @property _movieCollection
 * @type {MovieCollection}
 * @private
 */

},{"./collections/MovieCollection":2,"./models/MovieModel":4,"./services/RequestService":5,"./views/ListView":7,"./views/PageControlView":8,"./views/modals/ErrorModal":9,"structurejs/display/Stage":15}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x4, _x5, _x6) { var _again = true; _function: while (_again) { var object = _x4, property = _x5, receiver = _x6; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x4 = parent; _x5 = property; _x6 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _structurejsModelCollection = require('structurejs/model/Collection');

var _structurejsModelCollection2 = _interopRequireDefault(_structurejsModelCollection);

/**
 * TODO: YUIDoc_comment
 *
 * @class MovieCollection
 * @extends Collection
 * @constructor
 **/

var MovieCollection = (function (_Collection) {
    _inherits(MovieCollection, _Collection);

    function MovieCollection() {
        _classCallCheck(this, MovieCollection);

        _get(Object.getPrototypeOf(MovieCollection.prototype), 'constructor', this).call(this);
    }

    /**
     * TODO: YUIDoc_comment
     *
     * @method sortByCriticsScore
     * @param [sortAscending=true] {boolean}
     * @public
     */

    _createClass(MovieCollection, [{
        key: 'sortByCriticsScore',
        value: function sortByCriticsScore() {
            var sortAscending = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];

            var models = this.getMoviesWithValidScores();

            models = models.sort(function (a, b) {
                return b.ratings.criticsScore - a.ratings.criticsScore;
            });

            if (sortAscending === false) {
                models.reverse();
            }
            return models;
        }

        /**
         * TODO: YUIDoc_comment
         *
         * @method sortByAudienceScore
         * @param [sortAscending=true] {boolean}
         * @public
         */
    }, {
        key: 'sortByAudienceScore',
        value: function sortByAudienceScore() {
            var sortAscending = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];

            var models = this.getMoviesWithValidScores();

            models = models.sort(function (a, b) {
                return b.ratings.audienceScore - a.ratings.audienceScore;
            });

            if (sortAscending === false) {
                models.reverse();
            }
            return models;
        }

        /**
         * TODO: YUIDoc_comment
         *
         * @method sortByTheaterReleaseDate
         * @param [sortAscending=true] {boolean}
         * @public
         */
    }, {
        key: 'sortByTheaterReleaseDate',
        value: function sortByTheaterReleaseDate() {
            var sortAscending = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];

            var models = this.getMoviesWithValidScores();

            models = models.sort(function (a, b) {
                // Subtract the dates to get a value that is either negative, positive, or zero.
                return new Date(b.releaseDates.theater) - new Date(a.releaseDates.theater);
            });

            if (sortAscending === false) {
                models.reverse();
            }
            return models;
        }

        /**
         * TODO: YUIDoc_comment
         *
         * @method getMoviesWithValidScores
         * @public
         */
    }, {
        key: 'getMoviesWithValidScores',
        value: function getMoviesWithValidScores() {
            return this.filter(this._removeMoviesWithNoScore);
        }

        /**
         * TODO: YUIDoc_comment
         *
         * @method _removeMoviesWithNoScore
         * @private
         */
    }, {
        key: '_removeMoviesWithNoScore',
        value: function _removeMoviesWithNoScore(movieModel) {
            return movieModel.ratings.criticsScore > 0 && movieModel.ratings.audienceScore > 0;
        }
    }]);

    return MovieCollection;
})(_structurejsModelCollection2['default']);

exports['default'] = MovieCollection;
module.exports = exports['default'];

},{"structurejs/model/Collection":19}],3:[function(require,module,exports){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _utilsHandlebarsHelpers = require('./utils/HandlebarsHelpers');

var _utilsHandlebarsHelpers2 = _interopRequireDefault(_utilsHandlebarsHelpers);

var _App = require('./App');

var _App2 = _interopRequireDefault(_App);

var app = new _App2['default']();
app.appendTo('body'); // Need to specify what area our code has control over.
// The App.js class extends Stage which has the appendTo method.

},{"./App":1,"./utils/HandlebarsHelpers":6}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _structurejsModelBaseModel = require('structurejs/model/BaseModel');

var _structurejsModelBaseModel2 = _interopRequireDefault(_structurejsModelBaseModel);

/**
 * TODO: YUIDoc_comment
 *
 * @class MovieModel
 * @extends BaseModel
 * @constructor
 **/

var MovieModel = (function (_BaseModel) {
    _inherits(MovieModel, _BaseModel);

    function MovieModel(data) {
        _classCallCheck(this, MovieModel);

        _get(Object.getPrototypeOf(MovieModel.prototype), 'constructor', this).call(this);

        this.id = null;
        this.title = null;
        this.year = null;
        this.mpaaRating = null;
        this.runtime = null;
        this.ratings = RatingsModel;
        this.synopsis = null;
        this.posters = PosterModel;
        this.releaseDates = ReleaseDateModel;
        this.abridgedCast = [CastModel];
        if (data) {
            this.update(data);
        }
    }

    /**
     * @overridden BaseModel.update
     */

    _createClass(MovieModel, [{
        key: 'update',
        value: function update(data) {
            _get(Object.getPrototypeOf(MovieModel.prototype), 'update', this).call(this, data);

            this.runtime = parseInt(data.runtime);
        }
    }]);

    return MovieModel;
})(_structurejsModelBaseModel2['default']);

exports['default'] = MovieModel;
module.exports = exports['default'];

},{"structurejs/model/BaseModel":18}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x7, _x8, _x9) { var _again = true; _function: while (_again) { var object = _x7, property = _x8, receiver = _x9; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x7 = parent; _x8 = property; _x9 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _structurejsEventEventDispatcher = require('structurejs/event/EventDispatcher');

var _structurejsEventEventDispatcher2 = _interopRequireDefault(_structurejsEventEventDispatcher);

/**
 * A Singleton Class that handles all ajax requests.
 *
 * @class RequestService
 * @extends EventBroker
 * @constructor
 **/

var RequestService = (function (_EventDispatcher) {
    _inherits(RequestService, _EventDispatcher);

    function RequestService() {
        _classCallCheck(this, RequestService);

        _get(Object.getPrototypeOf(RequestService.prototype), 'constructor', this).call(this);
    }

    /**
     * Send data to an endpoint
     *
     * @method send
     * @param endPoint {string}
     * @param requestType {string} The type of the request: GET, POST, PUT, DELETE, etc.
     * @param [data=null]
     * @return {JQueryXHR}
     * @public
     */

    _createClass(RequestService, [{
        key: 'send',
        value: function send(endPoint, requestType) {
            var data = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];

            return this._createAjaxRequest({
                type: requestType,
                url: endPoint,
                data: data
            });
        }

        /**
         * Gets data from an endpoint
         *
         * @method get
         * @param endPoint {string}
         * @param [data=null]
         * @return {JQueryXHR}
         * @public
         */
    }, {
        key: 'get',
        value: function get(endPoint) {
            var data = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];
            var type = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];

            return this._createAjaxRequest({
                type: 'GET',
                url: endPoint,
                dataType: 'json',
                data: data
            });
        }

        /**
         * Post data to an endpoint
         *
         * @method post
         * @param endPoint {string}
         * @param [data=null]
         * @return {JQueryXHR}
         * @public
         */
    }, {
        key: 'post',
        value: function post(endPoint) {
            var data = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

            return this._createAjaxRequest({
                type: 'POST',
                url: endPoint,
                dataType: 'json',
                contentType: 'application/json',
                data: JSON.stringify(data)
            });
        }

        /**
         * Update the data to an endpoint
         *
         * @method put
         * @param endPoint {string}
         * @param [data=null]
         * @return {JQueryXHR}
         * @public
         */
    }, {
        key: 'put',
        value: function put(endPoint) {
            var data = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

            return this._createAjaxRequest({
                type: 'PUT',
                url: endPoint,
                data: data
            });
        }

        /**
         * Delete data on an endpoint
         *
         * @method delete
         * @param endPoint {string}
         * @param [data=null]
         * @return {JQueryXHR}
         * @public
         */
    }, {
        key: 'delete',
        value: function _delete(endPoint) {
            var data = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

            return this._createAjaxRequest({
                type: 'DELETE',
                url: endPoint,
                data: data
            });
        }

        /**
         * Post form data to an endpoint
         *
         * @method postFormData
         * @param endPoint {string}
         * @param formData {FormData} https://developer.mozilla.org/en-US/docs/Web/API/FormData
         * @return {JQueryXHR}
         * @public
         */
    }, {
        key: 'postFormData',
        value: function postFormData(endPoint, formData) {
            return this._createAjaxRequest({
                type: 'POST',
                url: endPoint,
                data: formData,
                contentType: false,
                processData: false
            });
        }

        /**
         * Put form data to an endpoint
         *
         * @method putFormData
         * @param endPoint {string}
         * @param formData {FormData} https://developer.mozilla.org/en-US/docs/Web/API/FormData
         * @return {JQueryXHR}
         * @public
         */
    }, {
        key: 'putFormData',
        value: function putFormData(endPoint, formData) {
            return this._createAjaxRequest({
                type: 'PUT',
                url: endPoint,
                data: formData,
                contentType: false,
                processData: false
            });
        }

        /**
         * Creates a jQuery xhr with a parameter object
         *
         * @method _createAjaxRequest
         * @param obj {Object} the options for the jQuery ajax request.
         * @return {jQueryXHR}
         * @protected
         */
    }, {
        key: '_createAjaxRequest',
        value: function _createAjaxRequest(obj) {
            // Assign the url so we can get if the request fails.
            obj.beforeSend = function (jqXHR, settings) {
                jqXHR.url = settings.url;
            };

            obj.xhr = (function () {
                var xhr = $.ajaxSettings.xhr();
                // handle upload progress events
                xhr.upload.addEventListener('progress', (function (event) {
                    if (event.lengthComputable) {
                        var percent = event.loaded / event.total * 100;
                        this.dispatchEvent('progress', percent);
                    }
                }).bind(this), false);

                return xhr;
            }).bind(this);

            var request = $.ajax(obj);

            // Global successes:
            request.done(function (data, textStatus, jqXHR) {
                //console.info(data);
            });

            // Global fails:
            request.fail(function (jqXHR, textStatus, errorThrown) {
                console.warn('fail jqXHR: ', jqXHR);
            });

            return request;
        }
    }]);

    return RequestService;
})(_structurejsEventEventDispatcher2['default']);

exports['default'] = new RequestService();
// Singleton Class
module.exports = exports['default'];

},{"structurejs/event/EventDispatcher":17}],6:[function(require,module,exports){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _structurejsUtilNumberUtil = require('structurejs/util/NumberUtil');

var _structurejsUtilNumberUtil2 = _interopRequireDefault(_structurejsUtilNumberUtil);

/**
 * removeSpaces
 */
Handlebars.registerHelper('removeSpaces', function (ratings) {
    if (ratings) {
        return ratings.replace(/\s+/g, '');
    } else {
        return ratings;
    }
});

/**
 * convertToHHMMSS
 */
Handlebars.registerHelper('convertToHHMMSS', function (minutes) {
    if (minutes) {
        return _structurejsUtilNumberUtil2['default'].convertToHHMMSS(minutes);
    } else {
        return minutes;
    }
});

},{"structurejs/util/NumberUtil":22}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _structurejsDisplayDOMElement = require('structurejs/display/DOMElement');

var _structurejsDisplayDOMElement2 = _interopRequireDefault(_structurejsDisplayDOMElement);

var _structurejsUtilTemplateFactory = require('structurejs/util/TemplateFactory');

var _structurejsUtilTemplateFactory2 = _interopRequireDefault(_structurejsUtilTemplateFactory);

/**
 * TODO: YUIDoc_comment
 *
 * @class ListView
 * @extends DOMElement
 * @constructor
 **/

var ListView = (function (_DOMElement) {
    _inherits(ListView, _DOMElement);

    function ListView($element) {
        _classCallCheck(this, ListView);

        _get(Object.getPrototypeOf(ListView.prototype), 'constructor', this).call(this, $element);
    }

    //////////////////////////////////////////////////////////////////////////////////
    // HELPER METHOD
    //////////////////////////////////////////////////////////////////////////////////

    /**
     * TODO: YUIDoc_comment
     *
     * @method updateList
     * @public
     */

    _createClass(ListView, [{
        key: 'updateList',
        value: function updateList(movieModels) {
            var templateHtml = _structurejsUtilTemplateFactory2['default'].create('templates/precompile/ItemTemplate', movieModels);

            this.$element.html(templateHtml);
        }
    }]);

    return ListView;
})(_structurejsDisplayDOMElement2['default']);

exports['default'] = ListView;
module.exports = exports['default'];

},{"structurejs/display/DOMElement":12,"structurejs/util/TemplateFactory":24}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _structurejsDisplayDOMElement = require('structurejs/display/DOMElement');

var _structurejsDisplayDOMElement2 = _interopRequireDefault(_structurejsDisplayDOMElement);

/**
 * TODO: YUIDoc_comment
 *
 * @class PageControlView
 * @extends DOMElement
 * @constructor
 **/

var PageControlView = (function (_DOMElement) {
  _inherits(PageControlView, _DOMElement);

  function PageControlView($element) {
    _classCallCheck(this, PageControlView);

    _get(Object.getPrototypeOf(PageControlView.prototype), 'constructor', this).call(this, $element);
    this.sortType = null;
    this.displayLimit = null;
    this._$listSort = null;
    this._$listLimit = null;
    this._$listUpdate = null;
  }

  /**
   * @overridden DOMElement.create
   */

  _createClass(PageControlView, [{
    key: 'create',
    value: function create() {
      _get(Object.getPrototypeOf(PageControlView.prototype), 'create', this).call(this);

      this._$listSort = this.$element.find('.js-pageControlView-listSort');
      this._$listLimit = this.$element.find('.js-pageControlView-listLimit');
      this._$listUpdate = this.$element.find('.js-pageControlView-listUpdate');
    }

    /**
     * @overridden DOMElement.enable
     */
  }, {
    key: 'enable',
    value: function enable() {
      if (this.isEnabled === true) {
        return;
      }

      this._$listSort.prop('disabled', false);
      this._$listLimit.prop('disabled', false);
      this._$listUpdate.prop('disabled', false);

      this._$listSort.addEventListener('change', this._onSortChange, this);
      this._$listLimit.addEventListener('change', this._onLimitChange, this);
      this._$listUpdate.addEventListener('click', this._onUpdateClick, this);

      return _get(Object.getPrototypeOf(PageControlView.prototype), 'enable', this).call(this);
    }

    /**
     * @overridden DOMElement.disable
     */
  }, {
    key: 'disable',
    value: function disable() {
      if (this.isEnabled === false) {
        return;
      }

      this._$listSort.prop('disabled', true);
      this._$listLimit.prop('disabled', true);
      this._$listUpdate.prop('disabled', true);

      this._$listSort.removeEventListener('change', this._onSortChange, this);
      this._$listLimit.removeEventListener('change', this._onLimitChange, this);
      this._$listUpdate.removeEventListener('click', this._onUpdateClick, this);

      return _get(Object.getPrototypeOf(PageControlView.prototype), 'disable', this).call(this);
    }

    /**
     * @overridden DOMElement.layout
     */
  }, {
    key: 'layout',
    value: function layout() {
      this.sortType = this._$listSort.val();
      this.displayLimit = parseInt(this._$listLimit.val());
    }

    /**
     * @overridden DOMElement.destroy
     */
  }, {
    key: 'destroy',
    value: function destroy() {
      this.disable();

      // Call destroy on any child objects.
      // This super method will also null out your properties for garbage collection.

      _get(Object.getPrototypeOf(PageControlView.prototype), 'destroy', this).call(this);
    }

    //////////////////////////////////////////////////////////////////////////////////
    // EVENT HANDLERS
    //////////////////////////////////////////////////////////////////////////////////

    /**
     * TODO: YUIDoc_comment
     *
     * @method _onSortChange
     * @param event {jQueryEventObject}
     * @private
     */
  }, {
    key: '_onSortChange',
    value: function _onSortChange(event) {
      event.preventDefault();

      this.layout();
    }

    /**
     * TODO: YUIDoc_comment
     *
     * @method _onLimitChange
     * @param event {jQueryEventObject}
     * @private
     */
  }, {
    key: '_onLimitChange',
    value: function _onLimitChange(event) {
      event.preventDefault();

      this.layout();
    }

    /**
     * TODO: YUIDoc_comment
     *
     * @method _onUpdateClick
     * @param event {jQueryEventObject}
     * @private
     */
  }, {
    key: '_onUpdateClick',
    value: function _onUpdateClick(event) {
      event.preventDefault();

      this.dispatchEvent('update', { sortType: this.sortType, displayLimit: this.displayLimit });
    }
  }]);

  return PageControlView;
})(_structurejsDisplayDOMElement2['default']);

exports['default'] = PageControlView;
module.exports = exports['default'];

/**
 * @property sortType
 * @type {string}
 * @public
 */

/**
 * @property displayLimit
 * @type {int}
 * @public
 */

/**
 * @property _$listSort
 * @type {jQuery}
 * @private
 */

/**
 * @property _$listLimit
 * @type {jQuery}
 * @private
 */

/**
 * @property _$listUpdate
 * @type {jQuery}
 * @private
 */

},{"structurejs/display/DOMElement":12}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _structurejsDisplayDOMElement = require('structurejs/display/DOMElement');

var _structurejsDisplayDOMElement2 = _interopRequireDefault(_structurejsDisplayDOMElement);

/**
 * TODO: YUIDoc_comment
 *
 * @class ErrorModal
 * @extends DOMElement
 * @constructor
 **/

var ErrorModal = (function (_DOMElement) {
    _inherits(ErrorModal, _DOMElement);

    function ErrorModal() {
        _classCallCheck(this, ErrorModal);

        _get(Object.getPrototypeOf(ErrorModal.prototype), 'constructor', this).call(this);
    }

    /**
     * @overridden DOMElement.create
     */

    _createClass(ErrorModal, [{
        key: 'create',
        value: function create() {
            _get(Object.getPrototypeOf(ErrorModal.prototype), 'create', this).call(this, 'templates/precompile/ModalTemplate', { error: 'Robert is cool' });

            // Create or setup objects in this parent class.
        }

        /**
         * @overridden DOMElement.enable
         */
    }, {
        key: 'enable',
        value: function enable() {
            if (this.isEnabled === true) {
                return;
            }

            // Enable the child objects and/or add any event listeners.

            return _get(Object.getPrototypeOf(ErrorModal.prototype), 'enable', this).call(this);
        }

        /**
         * @overridden DOMElement.disable
         */
    }, {
        key: 'disable',
        value: function disable() {
            if (this.isEnabled === false) {
                return;
            }

            // Disable the child objects and/or remove any event listeners.

            return _get(Object.getPrototypeOf(ErrorModal.prototype), 'disable', this).call(this);
        }

        /**
         * @overridden DOMElement.layout
         */
    }, {
        key: 'layout',
        value: function layout() {}
        // Layout or update the objects in this parent class.

        /**
         * @overridden DOMElement.destroy
         */

    }, {
        key: 'destroy',
        value: function destroy() {
            this.disable();

            // Call destroy on any child objects.
            // This super method will also null out your properties for garbage collection.

            _get(Object.getPrototypeOf(ErrorModal.prototype), 'destroy', this).call(this);
        }
    }]);

    return ErrorModal;
})(_structurejsDisplayDOMElement2['default']);

exports['default'] = ErrorModal;
module.exports = exports['default'];

},{"structurejs/display/DOMElement":12}],10:[function(require,module,exports){
'use strict';

(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports);if (v !== undefined) module.exports = v;
    } else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", './util/Util'], factory);
    }
})(function (require, exports) {
    ///<reference path='_declare/jquery.d.ts'/>
    ///<reference path='_declare/handlebars.d.ts'/>
    ///<reference path='_declare/greensock.d.ts'/>
    ///<reference path='_declare/jquery.eventListener.d.ts'/>
    ///<reference path='_declare/log.d.ts'/>
    var Util_1 = require('./util/Util');
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
    var BaseObject = (function () {
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
            this.sjsId = Util_1['default'].uniqueId();
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
            return Util_1['default'].getName(this);
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
                if (this.hasOwnProperty(key)) {
                    this[key] = null;
                }
            }
        };
        return BaseObject;
    })();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports['default'] = BaseObject;
});

},{"./util/Util":25}],11:[function(require,module,exports){
'use strict';

var __extends = undefined && undefined.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() {
        this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports);if (v !== undefined) module.exports = v;
    } else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", './BaseObject'], factory);
    }
})(function (require, exports) {
    var BaseObject_1 = require('./BaseObject');
    /**
     * The {{#crossLink "ObjectManager"}}{{/crossLink}} class is an abstract class that provides enabling and disabling functionality for most StructureJS classes.
     *
     * @class ObjectManager
     * @module StructureJS
     * @extends BaseObject
     * @submodule core
     * @requires Extend
     * @requires BaseObject
     * @constructor
     * @author Robert S. (www.codeBelt.com)
     */
    var ObjectManager = (function (_super) {
        __extends(ObjectManager, _super);
        function ObjectManager() {
            _super.call(this);
            /**
             * The isEnabled property is used to keep track of the enabled state of the object.
             *
             * @property isEnabled
             * @type {boolean}
             * @default false
             * @public
             */
            this.isEnabled = false;
        }
        /**
         * The enable method is responsible for enabling event listeners and/or children of the containing objects.
         *
         * @method enable
         * @public
         * @chainable
         * @example
         *     enable() {
         *          if (this.isEnabled === true) { return this; }
         *
         *          this._childInstance.addEventListener(BaseEvent.CHANGE, this.handlerMethod, this);
         *          this._childInstance.enable();
         *
         *          return super.enable();
         *     }
         */
        ObjectManager.prototype.enable = function () {
            if (this.isEnabled === true) {
                return this;
            }
            this.isEnabled = true;
            return this;
        };
        /**
         * The disable method is responsible for disabling event listeners and/or children of the containing objects.
         *
         * @method disable
         * @public
         * @chainable
         * @example
         *      disable() {
         *          if (this.isEnabled === false) { return this; }
         *
         *          this._childInstance.removeEventListener(BaseEvent.CHANGE, this.handlerMethod, this);
         *          this._childInstance.disable();
         *
         *          return super.disable();
         *      }
         */
        ObjectManager.prototype.disable = function () {
            if (this.isEnabled === false) {
                return this;
            }
            this.isEnabled = false;
            return this;
        };
        return ObjectManager;
    })(BaseObject_1['default']);
    Object.defineProperty(exports, "__esModule", { value: true });
    exports['default'] = ObjectManager;
});

},{"./BaseObject":10}],12:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", './DisplayObjectContainer', '../event/BaseEvent', '../util/TemplateFactory', '../util/ComponentFactory', '../plugin/jquery.eventListener'], factory);
    }
})(function (require, exports) {
    var DisplayObjectContainer_1 = require('./DisplayObjectContainer');
    var BaseEvent_1 = require('../event/BaseEvent');
    var TemplateFactory_1 = require('../util/TemplateFactory');
    var ComponentFactory_1 = require('../util/ComponentFactory');
    var jquery_eventListener_1 = require('../plugin/jquery.eventListener');
    /**
     * The {{#crossLink "DOMElement"}}{{/crossLink}} class is the base view class for all objects that can be placed into the HTML DOM.
     *
     * @class DOMElement
     * @param type [any=null] Either a jQuery object or JavaScript template string reference you want to use as the view. Check out the examples below.
     * @param params [any=null] Any data you would like to pass into the jQuery element or template that is being created.
     * @extends DisplayObjectContainer
     * @module StructureJS
     * @submodule view
     * @requires Extend
     * @requires DisplayObjectContainer
     * @requires BaseEvent
     * @requires TemplateFactory
     * @requires ComponentFactory
     * @requires jQuery
     * @constructor
     * @author Robert S. (www.codeBelt.com)
     * @example
     *     // Example: Using DOMElement without extending it.
     *     let aLink = new DOMElement('a', {text: 'Google', href: 'http://www.google.com', 'class': 'externalLink'});
     *     this.addChild(aLink);
     *
     *     // Example: A view passing in a jQuery object.
     *     let view = new CustomView($('.selector'));
     *     this.addChild(view);
     *
     *     // Example: A view extending DOMElement while passing in a jQuery object.
     *     class ClassName extends DOMElement {
     *
     *          constructor($element) {
     *              super($element);
     *          }
     *
     *          create() {
     *              super.create();
     *
     *              // Create and add your child objects to this parent class.
     *          }
     *
     *          enable() {
     *              if (this.isEnabled === true) { return this; }
     *
     *              // Enable the child objects and add any event listeners.
     *
     *              return super.enable();
     *          }
     *
     *          disable() {
     *              if (this.isEnabled === false) { return this; }
     *
     *              // Disable the child objects and remove any event listeners.
     *
     *              return super.disable();
     *          }
     *
     *          layout() {
     *              // Layout or update the child objects in this parent class.
     *
     *              return this;
     *          }
     *
     *          destroy() {
     *              this.disable();
     *
     *              // Destroy the child objects and references in this parent class to prevent memory leaks.
     *
     *              super.destroy();
     *          }
     *
     *     }
     *
     *     // Example: A view extending DOMElement with a precompiled JavaScript template reference passed in.
     *     class ClassName extends DOMElement {
     *
     *          constructor() {
     *              _super();
     *          }
     *
     *          create() {
     *              super.create('templates/home/homeTemplate', {data: 'some data'});
     *
     *              // Create and add your child objects to this parent class.
     *          }
     *
     *          enable() {
     *              if (this.isEnabled === true) { return this; }
     *
     *              // Enable the child objects and add any event listeners.
     *
     *              return super.enable();
     *          }
     *
     *          disable() {
     *              if (this.isEnabled === false) { return this; }
     *
     *              // Disable the child objects and remove any event listeners.
     *
     *              return super.disable();
     *          }
     *
     *          layout() {
     *              // Layout or update the child objects in this parent class.
     *
     *              return this;
     *          }
     *
     *          destroy() {
     *              this.disable();
     *
     *              // Destroy the child objects and references in this parent class to prepare for garbage collection.
     *
     *              super.destroy();
     *          }
     *
     *     }
     */
    var DOMElement = (function (_super) {
        __extends(DOMElement, _super);
        function DOMElement(type, params) {
            if (type === void 0) { type = null; }
            if (params === void 0) { params = null; }
            _super.call(this);
            /**
             * Tracks number of times an element's width has been checked
             * in order to determine if the element has been added
             * to the DOM.
             *
             * @property checkCount
             * @type {number}
             * @public
             */
            this.checkCount = 0;
            /**
             * A cached reference to the DOM Element
             *
             * @property element
             * @type {HTMLElement}
             * @default null
             * @public
             */
            this.element = null;
            /**
             * A cached reference to the jQuery DOM element
             *
             * @property $element
             * @type {JQuery}
             * @default null
             * @public
             */
            this.$element = null;
            /**
             * If a jQuery object was passed into the constructor this will be set as true and
             * this class will not try to add the view to the DOM since it already exists.
             *
             * @property _isReference
             * @type {boolean}
             * @protected
             */
            this._isReference = false;
            /**
             * Holds onto the value passed into the constructor.
             *
             * @property _type
             * @type {string}
             * @default null
             * @protected
             */
            this._type = null;
            /**
             * Holds onto the value passed into the constructor.
             *
             * @property _params
             * @type {any}
             * @default null
             * @protected
             */
            this._params = null;
            if (type instanceof jquery_eventListener_1.default) {
                this.$element = type;
                this.element = this.$element[0];
                this._isReference = true;
            }
            else if (type) {
                this._type = type;
                this._params = params;
            }
        }
        /**
         * The create function is intended to provide a consistent place for the creation and adding
         * of children to the view. It will automatically be called the first time that the view is added
         * to another DisplayObjectContainer. It is critical that all subclasses call the super for this function in
         * their overridden methods.
         *
         * This method gets called once when the child view is added to another view. If the child view is removed
         * and added to another view the create method will not be called again.
         *
         * @method create
         * @param type [string=div] The HTML tag you want to create or the id/class selector of the template or the pre-compiled path to a template.
         * @param params [any=null] Any data you would like to pass into the jQuery element or template that is being created.
         * @returns {any} Returns an instance of itself.
         * @public
         * @chainable
         * @example
         *     // EXAMPLE 1: By default your view class will be a div element:
         *     create() {
         *          super.create();
         *
         *          this._childInstance = new DOMElement();
         *          this.addChild(this._childInstance);
         *     }
         *
         *     // EXAMPLE 2: But lets say you wanted the view to be a ul element:
         *     create() {
         *          super.create('ul');
         *     }
         *
         *     // Then you could nest other elements inside this base view/element.
         *     create() {
         *          super.create('ul', {id: 'myId', 'class': 'myClass anotherClass'});
         *
         *          let li = new DOMElement('li', {text: 'Robert is cool'});
         *          this.addChild(li);
         *     }
         *
         *     // EXAMPLE 3: So that's cool but what if you wanted a block of html to be your view. Let's say you had the below
         *     // inline Handlebar template in your html file.
         *     <script id="todoTemplate" type="text/template">
         *          <div id="htmlTemplate" class="js-todo">
         *              <div id="input-wrapper">
         *                  <input type="text" class="list-input" placeholder="{{ data.text }}">
         *                  <input type="button" class="list-item-submit" value="Add">
         *              </div>
         *          </div>
         *     </script>
         *
         *     // You would just pass in the id or class selector of the template which in this case is "#todoTemplate".
         *     // There is a second optional argument where you can pass data for the Handlebar template to use.
         *     create() {
         *          super.create('#todoTemplate', { data: this.viewData });
         *
         *     }
         *
         *     // EXAMPLE 4: Or maybe you're using grunt-contrib-handlebars, or similar, to precompile hbs templates
         *     create() {
         *          super.create('templates/HomeTemplate', {data: "some data"});
         *
         *     }
         */
        DOMElement.prototype.create = function (type, params) {
            if (type === void 0) { type = 'div'; }
            if (params === void 0) { params = null; }
            // Use the data passed into the constructor first else use the arguments from create.
            type = this._type || type;
            params = this._params || params;
            if (this.isCreated === true) {
                throw new Error('[' + this.getQualifiedClassName() + '] You cannot call the create method manually. It is only called once automatically during the view lifecycle and should only be called once.');
            }
            if (this.$element == null) {
                var html_1 = TemplateFactory_1.default.create(type, params);
                if (html_1) {
                    this.$element = jquery_eventListener_1.default(html_1);
                }
                else {
                    this.$element = jquery_eventListener_1.default("<" + type + "/>", params);
                }
            }
            this.element = this.$element[0];
            this.width = this.$element.width();
            this.height = this.$element.height();
            this.setSize(this.width, this.height);
            return this;
        };
        /**
         * @overridden DisplayObjectContainer.addChild
         * @method addChild
         * @param child {DOMElement} The DOMElement instance to add as a child of this object instance.
         * @returns {any} Returns an instance of itself.
         * @chainable
         * @example
         *     this.addChild(domElementInstance);
         */
        DOMElement.prototype.addChild = function (child) {
            if (this.$element == null) {
                throw new Error('[' + this.getQualifiedClassName() + '] You cannot use the addChild method if the parent object is not added to the DOM.');
            }
            _super.prototype.addChild.call(this, child);
            // If an empty jQuery object is passed into the constructor then don't run the code below.
            if (child._isReference === true && child.$element.length === 0) {
                return this;
            }
            if (child.isCreated === false) {
                child.create(); // Render the item before adding to the DOM
                child.isCreated = true;
            }
            // If the child object is not a reference of a jQuery object in the DOM then append it.
            if (child._isReference === false) {
                this.$element.append(child.$element);
            }
            this._onAddedToDom(child);
            return this;
        };
        /**
         * Adds the sjsId to the DOM element so we can know what what Class object the HTMLElement belongs too.
         *
         * @method _addClientSideId
         * @param child {DOMElement} The DOMElement instance to add the sjsId too.
         * @protected
         */
        DOMElement.prototype._addClientSideId = function (child) {
            var type = child.$element.attr('data-sjs-type');
            var id = child.$element.attr('data-sjs-id');
            if (type === void 0) {
                // Make them array's so the join method will work.
                type = [child.getQualifiedClassName()];
                id = [child.sjsId];
            }
            else {
                // Split them so we can push/add the new values.
                type = type.split(',');
                id = id.split(',');
                type.push(child.getQualifiedClassName());
                id.push(child.sjsId);
            }
            // Updated list of id's and types
            child.$element.attr('data-sjs-id', id.join(','));
            child.$element.attr('data-sjs-type', type.join(','));
        };
        /**
         * Removes the sjsId and class type from the HTMLElement.
         *
         * @method _removeClientSideId
         * @param child {DOMElement} The DOMElement instance to add the sjsId too.
         * @protected
         * @return {boolean}
         */
        DOMElement.prototype._removeClientSideId = function (child) {
            var type = child.$element.attr('data-sjs-type');
            var id = child.$element.attr('data-sjs-id');
            // Split them so we can remove the child sjsId and type.
            var typeList = type.split(',');
            var idList = id.split(',').map(Number); // Convert each item into a number.
            var index = idList.indexOf(child.sjsId);
            if (index > -1) {
                // Remove the id and type from the array.
                typeList.splice(index, 1);
                idList.splice(index, 1);
                // Updated list of id's and types
                child.$element.attr('data-sjs-type', typeList.join(','));
                child.$element.attr('data-sjs-id', idList.join(','));
            }
            return idList.length === 0;
        };
        /**
         * Called when the child object is added to the DOM.
         * The method will call {{#crossLink "DOMElement/layout:method"}}{{/crossLink}} and dispatch the BaseEvent.ADDED_TO_STAGE event.
         *
         * @method _onAddedToDom
         * @protected
         */
        DOMElement.prototype._onAddedToDom = function (child) {
            var _this = this;
            child.checkCount++;
            if (child.$element.width() === 0 && child.checkCount < 5) {
                setTimeout(function () {
                    _this._onAddedToDom(child);
                }, 100);
                return;
            }
            this._addClientSideId(child);
            child.width = child.$element.width();
            child.height = child.$element.height();
            child.setSize(child.width, child.height);
            child.enable();
            child.layout();
            child.dispatchEvent(new BaseEvent_1.default(BaseEvent_1.default.ADDED_TO_STAGE));
        };
        /**
         * @overridden DisplayObjectContainer.addChildAt
         */
        DOMElement.prototype.addChildAt = function (child, index) {
            var children = this.$element.children();
            var length = children.length;
            // If an empty jQuery object is passed into the constructor then don't run the code below.
            if (child._isReference === true && child.$element.length === 0) {
                return this;
            }
            if (index < 0 || index >= length) {
                // If the index passed in is less than 0 and greater than the total number of children then place the item at the end.
                this.addChild(child);
            }
            else {
                // Else get the child in the children array by the index passed in and place the item before that child.
                if (child.isCreated === false) {
                    child.create(); // Render the item before adding to the DOM
                    child.isCreated = true;
                }
                // Adds the child at a specific index but also will remove the child from another parent object if one exists.
                if (child.parent) {
                    child.parent.removeChild(child, false);
                }
                this.children.splice(index, 0, child);
                this.numChildren = this.children.length;
                child.parent = this;
                // Adds the child before any child already added in the DOM.
                jquery_eventListener_1.default(children.get(index)).before(child.$element);
                this._onAddedToDom(child);
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
         * @overridden DisplayObjectContainer.getChildAt
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
         * @public
         */
        DOMElement.prototype.getChild = function (selector) {
            // Get the first match from the selector passed in.
            var jQueryElement = this.$element.find(selector).first();
            if (jQueryElement.length === 0) {
                throw new TypeError('[' + this.getQualifiedClassName() + '] getChild(' + selector + ') Cannot find DOM $element');
            }
            // Check to see if the element has a sjsId value and is a child of this parent object.
            var sjsId = parseInt(jQueryElement.attr('data-sjs-id'));
            var domElement = this.getChildByCid(sjsId);
            // Creates a DOMElement from the jQueryElement.
            if (domElement == null) {
                // Create a new DOMElement and assign the jQuery element to it.
                domElement = new DOMElement();
                domElement.$element = jQueryElement;
                this._addClientSideId(domElement);
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
         * @param [selector] {string} You can pass in any type of jQuery selector. If there is no selector passed in it will get all the children of this parent element.
         * @returns {Array.<DOMElement>} Returns a list of DOMElement's. It will grab all children HTML DOM elements of this object and will create a DOMElement for each DOM child.
         * If the 'data-sjs-id' property exists is on an HTML element a DOMElement will not be created for that element because it will be assumed it already exists as a DOMElement.
         * @public
         */
        DOMElement.prototype.getChildren = function (selector) {
            if (selector === void 0) { selector = ''; }
            //TODO: Make sure the index of the children added is the same as the what is in the actual DOM.
            var $child;
            var domElement;
            var $list = this.$element.children(selector);
            var listLength = $list.length;
            for (var i_1 = 0; i_1 < listLength; i_1++) {
                $child = $list.eq(i_1);
                // If the jQuery element already has sjsId data property then it must be an existing DisplayObjectContainer (DOMElement) in the children array.
                if ($child.attr('data-sjs-id') === void 0) {
                    domElement = new DOMElement();
                    domElement.$element = $child;
                    this._addClientSideId(domElement);
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
         * The parent property of the removed child is set to null and the object is garbage collected if there are no other references
         * to the child. The index positions of any objects above the child in the parent object are decreased by 1.
         *
         * @method removeChild
         * @param child {DOMElement} The DisplayObjectContainer instance to remove.
         * @returns {any} Returns an instance of itself.
         * @override
         * @public
         * @chainable
         */
        DOMElement.prototype.removeChild = function (child, destroy) {
            if (destroy === void 0) { destroy = true; }
            var remove = this._removeClientSideId(child);
            child.disable();
            // Checks if destroy was called before removeChild so it doesn't error.
            if (remove === true && child.$element != null) {
                child.$element.unbind();
                child.$element.remove();
            }
            if (destroy === true) {
                child.destroy();
            }
            _super.prototype.removeChild.call(this, child);
            return this;
        };
        /**
         * Removes the child display object instance that exists at the specified index.
         *
         * @method removeChildAt
         * @param index {int} The index position of the child object.
         * @public
         * @chainable
         */
        DOMElement.prototype.removeChildAt = function (index, destroy) {
            if (destroy === void 0) { destroy = true; }
            this.removeChild(this.getChildAt(index), destroy);
            return this;
        };
        /**
         * Removes all child object instances from the child list of the parent object instance.
         * The parent property of the removed children is set to null and the objects are garbage collected if no other
         * references to the children exist.
         *
         * @method removeChildren
         * @returns {DOMElement} Returns an instance of itself.
         * @override
         * @public
         * @chainable
         */
        DOMElement.prototype.removeChildren = function (destroy) {
            if (destroy === void 0) { destroy = true; }
            while (this.children.length > 0) {
                this.removeChild(this.children.pop(), destroy);
            }
            this.$element.empty();
            return this;
        };
        /**
         * @overridden DisplayObjectContainer.destroy
         */
        DOMElement.prototype.destroy = function () {
            // Note: we can't just call destroy to remove the HTMLElement because there could be other views managing the same HTMLElement.
            /*if (this.$element != null) {
                 this.$element.unbind();
                 this.$element.remove();
             }*/
            _super.prototype.destroy.call(this);
        };
        /**
         * A way to instantiate view classes by found html selectors.
         *
         * Example: It will find all children elements of the {{#crossLink "DOMElement/$element:property"}}{{/crossLink}} property with the 'js-shareEmail' selector.
         * If any selectors are found the EmailShareComponent class will be instantiated and pass the found jQuery element into the contructor.
         *
         * @method createComponents
         * @param componentList (Array.<{ selector: string; component: DOMElement }>
         * @return {Array.<DOMElement>} Returns all the items created from this createComponents method.
         * @public
         * @chainable
         * @example
         *      create() {
         *          super.create();
         *
         *          this.createComponents([
         *              {selector: '.js-shareEmail', component: EmailShareComponent},
         *              {selector: '.js-pagination', component: PaginationComponent},
         *              {selector: '.js-carousel', component: CarouselComponent}
         *          ]);
         *      }
         */
        DOMElement.prototype.createComponents = function (componentList) {
            var list;
            var createdChildren = [];
            var length = componentList.length;
            var obj;
            for (var i_2 = 0; i_2 < length; i_2++) {
                obj = componentList[i_2];
                list = ComponentFactory_1.default.create(this.$element.find(obj.selector), obj.component, this);
                createdChildren = createdChildren.concat(list);
            }
            return createdChildren;
        };
        return DOMElement;
    })(DisplayObjectContainer_1.default);
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = DOMElement;
});

},{"../event/BaseEvent":16,"../plugin/jquery.eventListener":20,"../util/ComponentFactory":21,"../util/TemplateFactory":24,"./DisplayObjectContainer":14}],13:[function(require,module,exports){
'use strict';

var __extends = undefined && undefined.__extends || function (d, b) {
  for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
  function __() {
    this.constructor = d;
  }
  d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
(function (factory) {
  if (typeof module === 'object' && typeof module.exports === 'object') {
    var v = factory(require, exports);if (v !== undefined) module.exports = v;
  } else if (typeof define === 'function' && define.amd) {
    define(["require", "exports", '../event/EventDispatcher'], factory);
  }
})(function (require, exports) {
  var EventDispatcher_1 = require('../event/EventDispatcher');
  /**
   * The {{#crossLink "DisplayObject"}}{{/crossLink}} class is the base class for all objects that can be placed on the display list.
   *
   * @class DisplayObject
   * @extends EventDispatcher
   * @module StructureJS
   * @submodule view
   * @requires Extend
   * @requires EventDispatcher
   * @constructor
   * @author Robert S. (www.codeBelt.com)
   */
  var DisplayObject = (function (_super) {
    __extends(DisplayObject, _super);
    function DisplayObject() {
      _super.call(this);
      /**
       * The Stage of the display object.
       *
       * @property stage
       * @type {any}
       * @public
       */
      this.stage = null;
      /**
       * The CanvasRenderingContext2D interface provides the 2D rendering context for the drawing surface of a canvas element.
       * This property is only used with the canvas specific display objects.
       *
       * @property ctx
       * @type {CanvasRenderingContext2D}
       * @public
       */
      this.ctx = null;
      /**
       * A property providing access to the x position.
       *
       * @property x
       * @type {number}
       * @default 0
       * @public
       */
      this.x = 0;
      /**
       * A property providing access to the y position.
       *
       * @property y
       * @type {number}
       * @default 0
       * @public
       */
      this.y = 0;
      /**
       * Indicates the width of the display object, in pixels.
       *
       * @property width
       * @type {number}
       * @default 0
       * @public
       */
      this.width = 0;
      /**
       * Indicates the height of the display object, in pixels.
       *
       * @property height
       * @type {number}
       * @default 0
       * @public
       */
      this.height = 0;
      /**
       * A property providing access to the unscaledWidth.
       *
       * @property unscaledWidth
       * @type {number}
       * @default 100
       * @public
       */
      this.unscaledWidth = 100;
      /**
       * A property providing access to the unscaledHeight.
       *
       * @property unscaledHeight
       * @type {number}
       * @default 100
       * @public
       */
      this.unscaledHeight = 100;
      /**
       * Indicates the horizontal scale (percentage) of the object as applied from the registration point.
       *
       * @property scaleX
       * @type {number}
       * @public
       */
      this.scaleX = 1;
      /**
       * Indicates the vertical scale (percentage) of an object as applied from the registration point of the object.
       *
       * @property scaleY
       * @type {number}
       * @public
       */
      this.scaleY = 1;
      /**
       * Indicates the rotation of the DisplayObject instance, in degrees, from its original orientation.
       *
       * @property rotation
       * @type {number}
       * @public
       */
      this.rotation = 0;
      /**
       * Indicates the alpha transparency value of the object specified.
       *
       * @property alpha
       * @type {number}
       * @public
       */
      this.alpha = 1;
      /**
       * Whether or not the display object is visible.
       *
       * @property visible
       * @type {boolean}
       * @public
       */
      this.visible = true;
      /**
       * Specifies whether this object receives mouse
       *
       * @property mouseEnabled
       * @type {boolean}
       * @public
       */
      this.mouseEnabled = false;
      /**
       * A Boolean value that indicates whether the pointing hand (hand cursor) appears when the pointer rolls over a display object.
       *
       * @property useHandCursor
       * @type {boolean}
       * @public
       */
      this.useHandCursor = false;
      /**
       * The isCreated property is used to keep track if it is the first time this DisplayObject is created.
       *
       * @property isCreated
       * @type {boolean}
       * @default false
       * @public
       */
      this.isCreated = false;
      /**
       * Indicates the instance name of the DisplayObject.
       *
       * @property name
       * @type {string}
       * @public
       */
      this.name = null;
    }
    /**
     * The create function is intended to provide a consistent place for the creation or initializing the view.
     * It will automatically be called the first time that the view is added to a DisplayObjectContainer.
     * It is critical that all subclasses call the super for this function in their overridden methods.
     *
     * @method create
     * @returns {DisplayObject} Returns an instance of itself.
     * @public
     * @chainable
     */
    DisplayObject.prototype.create = function () {
      this.isCreated = true;
      return this;
    };
    /**
     * The layout method provides a common function to handle updating objects in the view.
     *
     * @method layout
     * @returns {DisplayObject} Returns an instance of itself.
     * @public
     * @chainable
     */
    DisplayObject.prototype.layout = function () {
      return this;
    };
    /**
     * The setSize method sets the bounds within which the containing DisplayObject would like that component to lay itself out.
     *
     * @param unscaledWidth {number} The width within which the component should lay itself out.
     * @param unscaledHeight {number} The height within which the component should lay itself out.
     * @returns {DisplayObject} Returns an instance of itself.
     * @public
     * @chainable
     */
    DisplayObject.prototype.setSize = function (unscaledWidth, unscaledHeight) {
      this.unscaledWidth = unscaledWidth;
      this.unscaledHeight = unscaledHeight;
      return this;
    };
    DisplayObject.prototype._readerStart = function () {
      this.ctx.save();
    };
    DisplayObject.prototype.renderCanvas = function () {
      if (this.ctx === null || this.alpha <= 0 || this.visible === false) return false;
      this._readerStart();
      this.ctx.globalAlpha = this.alpha;
      this.layout();
      this._renderEnd();
    };
    DisplayObject.prototype._renderEnd = function () {
      this.ctx.restore();
    };
    return DisplayObject;
  })(EventDispatcher_1['default']);
  Object.defineProperty(exports, "__esModule", { value: true });
  exports['default'] = DisplayObject;
});

},{"../event/EventDispatcher":17}],14:[function(require,module,exports){
'use strict';

var __extends = undefined && undefined.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() {
        this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports);if (v !== undefined) module.exports = v;
    } else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", './DisplayObject'], factory);
    }
})(function (require, exports) {
    var DisplayObject_1 = require('./DisplayObject');
    /**
     * The {{#crossLink "DisplayObjectContainer"}}{{/crossLink}} class is the base class for all objects that can be placed on the display list.
     *
     * @class DisplayObjectContainer
     * @extends DisplayObject
     * @module StructureJS
     * @submodule view
     * @requires Extend
     * @requires DisplayObject
     * @constructor
     * @author Robert S. (www.codeBelt.com)
     */
    var DisplayObjectContainer = (function (_super) {
        __extends(DisplayObjectContainer, _super);
        function DisplayObjectContainer() {
            _super.call(this);
            /**
             * Returns the number of children of this object.
             *
             * @property numChildren
             * @type {int}
             * @default 0
             * @readOnly
             * @public
             */
            this.numChildren = 0;
            /**
             * A reference to the child DisplayObject instances to this parent object instance.
             *
             * @property children
             * @type {Array.<DisplayObject>}
             * @readOnly
             * @public
             */
            this.children = [];
            /**
             * Determines whether or not the children of the object are mouse enabled.
             *
             * @property mouseChildren
             * @type {boolean}
             * @public
             */
            this.mouseChildren = false;
        }
        /**
         * Adds a child DisplayObject instance to this parent object instance. The child is added to the front (top) of all other
         * children in this parent object instance. (To add a child to a specific index position, use the addChildAt() method.)
         *
         * If you add a child object that already has a different parent, the object is removed from the child
         * list of the other parent object.
         *
         * @method addChild
         * @param child {DisplayObject} The DisplayObject instance to add as a child of this DisplayObjectContainer instance.
         * @returns {DisplayObjectContainer} Returns an instance of itself.
         * @public
         * @chainable
         */
        DisplayObjectContainer.prototype.addChild = function (child) {
            //If the child being passed in already has a parent then remove the reference from there.
            if (child.parent) {
                child.parent.removeChild(child);
            }
            this.children.push(child);
            this.numChildren = this.children.length;
            child.parent = this;
            return this;
        };
        /**
         * Adds a child DisplayObject instance to this DisplayObjectContainerContainer instance.
         * The child is added at the index position specified. An index of 0 represents the back
         * (bottom) of the display list for this DisplayObjectContainerContainer object.
         *
         * @method addChildAt
         * @param child {DisplayObject} The DisplayObject instance to add as a child of this object instance.
         * @param index {int} The index position to which the child is added. If you specify a currently occupied index position, the child object that exists at that position and all higher positions are moved up one position in the child list.
         * @returns {DisplayObjectContainer} Returns an instance of itself.
         * @public
         * @chainable
         */
        DisplayObjectContainer.prototype.addChildAt = function (child, index) {
            //If the child being passed in already has a parent then remove the reference from there.
            if (child.parent) {
                child.parent.removeChild(child);
            }
            this.children.splice(index, 0, child);
            this.numChildren = this.children.length;
            child.parent = this;
            return this;
        };
        /**
         * Removes the specified child object instance from the child list of the parent object instance.
         * The parent property of the removed child is set to null , and the object is garbage collected if no other references
         * to the child exist. The index positions of any objects above the child in the parent object are decreased by 1.
         *
         * @method removeChild
         * @param child {DisplayObject} The DisplayObject instance to remove.
         * @returns {DisplayObjectContainer} Returns an instance of itself.
         * @public
         * @chainable
         */
        DisplayObjectContainer.prototype.removeChild = function (child) {
            var index = this.getChildIndex(child);
            if (index !== -1) {
                // Removes the child object from the parent.
                this.children.splice(index, 1);
            }
            this.numChildren = this.children.length;
            child.parent = null;
            return this;
        };
        /**
         * Removes all child DisplayObject instances from the child list of the DisplayObjectContainerContainer instance.
         * The parent property of the removed children is set to null , and the objects are garbage collected if
         * no other references to the children exist.
         *
         * @method removeChildren
         * @returns {DisplayObjectContainer} Returns an instance of itself.
         * @public
         * @chainable
         */
        DisplayObjectContainer.prototype.removeChildren = function () {
            while (this.children.length > 0) {
                this.removeChild(this.children.pop());
            }
            return this;
        };
        /**
         * Swaps two DisplayObject's with each other.
         *
         * @method swapChildren
         * @param child1 {DisplayObject} The DisplayObject instance to be swap.
         * @param child2 {DisplayObject} The DisplayObject instance to be swap.
         * @returns {DisplayObjectContainer} Returns an instance of itself.
         * @public
         * @chainable
         */
        DisplayObjectContainer.prototype.swapChildren = function (child1, child2) {
            var child1Index = this.getChildIndex(child1);
            var child2Index = this.getChildIndex(child2);
            this.addChildAt(child1, child2Index);
            this.addChildAt(child2, child1Index);
        };
        /**
         * Swaps child objects at the two specified index positions in the child list. All other child objects in the display object container remain in the same index positions.
         *
         * @method swapChildrenAt
         * @param index1 {int} The index position of the first child object.
         * @param index2 {int} The index position of the second child object.
         * @returns {DisplayObjectContainer} Returns an instance of itself.
         * @public
         * @chainable
         */
        DisplayObjectContainer.prototype.swapChildrenAt = function (index1, index2) {
            if (index1 < 0 || index1 < 0 || index1 >= this.numChildren || index2 >= this.numChildren) {
                throw new TypeError('[' + this.getQualifiedClassName() + '] index value(s) cannot be out of bounds. index1 value is ' + index1 + ' index2 value is ' + index2);
            }
            var child1 = this.getChildAt(index1);
            var child2 = this.getChildAt(index2);
            this.swapChildren(child1, child2);
            return this;
        };
        /**
         * Returns the index position of a child DisplayObject instance.
         *
         * @method getChildIndex
         * @param child {DisplayObject} The DisplayObject instance to identify.
         * @returns {int} The index position of the child display object to identify.
         * @public
         */
        DisplayObjectContainer.prototype.getChildIndex = function (child) {
            return this.children.indexOf(child);
        };
        /**
         * Determines whether the specified display object is a child of the DisplayObject instance or the instance itself. The search includes the entire display list including this DisplayObject instance.
         *
         * @method contains
         * @param child {DisplayObject} The child object to test.
         * @returns {boolean}  true if the child object is a child of the DisplayObject or the container itself; otherwise false.
         * @public
         */
        DisplayObjectContainer.prototype.contains = function (child) {
            return this.children.indexOf(child) >= 0;
        };
        /**
         * Returns the child display object instance that exists at the specified index.
         *
         * @method getChildAt
         * @param index {int} The index position of the child object.
         * @returns {DisplayObject} The child display object at the specified index position.
         */
        DisplayObjectContainer.prototype.getChildAt = function (index) {
            return this.children[index];
        };
        /**
         * Gets a DisplayObject by its sjsId.
         *
         * @method getChildByCid
         * @param sjsId {number}
         * @returns {DisplayObject|null}
         * @override
         * @public
         */
        DisplayObjectContainer.prototype.getChildByCid = function (sjsId) {
            var child = null;
            for (var i_1 = this.numChildren - 1; i_1 >= 0; i_1--) {
                if (this.children[i_1].sjsId == sjsId) {
                    child = this.children[i_1];
                    break;
                }
            }
            return child;
        };
        return DisplayObjectContainer;
    })(DisplayObject_1['default']);
    Object.defineProperty(exports, "__esModule", { value: true });
    exports['default'] = DisplayObjectContainer;
});

},{"./DisplayObject":13}],15:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", './DOMElement'], factory);
    }
})(function (require, exports) {
    var DOMElement_1 = require('./DOMElement');
    /**
     * The {{#crossLink "Stage"}}{{/crossLink}} class should be extended by your main application or root class.
     *
     * @class Stage
     * @extends DOMElement
     * @module StructureJS
     * @submodule view
     * @constructor
     * @author Robert S. (www.codeBelt.com)
     * @requires Extend
     * @requires DOMElement
     * @requires jQuery
     * @example
     *     // This example illustrates how to setup your main application or root class when extending the {{#crossLink "Stage"}}{{/crossLink}} class.
     *         class MainClass extends Stage {
     *
     *             constructor() {
     *                 super();
     *             }
     *
     *             create() {
     *                 super.create();
     *
     *                 // Create and add your child objects to this parent class.
     *             }
     *
     *             layout() {
     *                 // Layout or update the child objects in this parent class.
     *
     *                 return this;
     *             }
     *
     *             enable() {
     *                 if (this.isEnabled === true) { return this };
     *
     *                 // Enable the child objects and add any event listeners.
     *
     *                 return super.enable();
     *             }
     *
     *             disable() {
     *                 if (this.isEnabled === false) { return this };
     *
     *                 // Disable the child objects and remove any event listeners.
     *
     *                 return super.disable();
     *             }
     *
     *             destroy() {
     *                 this.disable();
     *
     *                 // Destroy the child objects and references in this parent class to prepare for garbage collection.
     *
     *                 super.destroy();
     *             }
     *
     *         }
     *
     *
     * <b>Instantiation Example</b><br>
     * This example illustrates how to instantiate your main application or root class.
     *
     *      let app = new MainClass();
     *      app.appendTo('body');
     *
     */
    var Stage = (function (_super) {
        __extends(Stage, _super);
        function Stage() {
            _super.call(this);
        }
        /**
         * The selected HTML element where the child elements will be created. This method starts the lifecycle of the application.
         *
         * @method appendTo
         * @param type {any} A string value where your application will be appended. This can be an element id (#some-id), element class (.some-class) or a element tag (body).
         * @param [enabled=true] {boolean} Sets the enabled state of the object.
         * @chainable
         */
        Stage.prototype.appendTo = function (type, enabled) {
            if (enabled === void 0) { enabled = true; }
            this.$element = (type instanceof jQuery) ? type : jQuery(type);
            this._addClientSideId(this);
            if (this.isCreated === false) {
                this.create();
                this.isCreated = true;
                if (enabled === false) {
                    this.disable();
                }
                else {
                    this.enable();
                }
                this.layout();
            }
            return this;
        };
        return Stage;
    })(DOMElement_1.default);
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = Stage;
});

},{"./DOMElement":12}],16:[function(require,module,exports){
'use strict';

var __extends = undefined && undefined.__extends || function (d, b) {
  for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
  function __() {
    this.constructor = d;
  }
  d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
(function (factory) {
  if (typeof module === 'object' && typeof module.exports === 'object') {
    var v = factory(require, exports);if (v !== undefined) module.exports = v;
  } else if (typeof define === 'function' && define.amd) {
    define(["require", "exports", '../BaseObject'], factory);
  }
})(function (require, exports) {
  var BaseObject_1 = require('../BaseObject');
  /**
   * The {{#crossLink "BaseEvent"}}{{/crossLink}} class is used as the base class for the creation of Event objects, which are passed as parameters to event listeners when an event occurs.
   *
   * The properties of the {{#crossLink "BaseEvent"}}{{/crossLink}} class carry basic information about an event, such as the event's type or whether the event's default behavior can be canceled.
   *
   * For many events, such as the events represented by the Event class constants, this basic information is sufficient. Other events, however, may require more
   * detailed information.
   * @class BaseEvent
   * @extends BaseObject
   * @param type {string} The type of event. The type is case-sensitive.
   * @param [bubbles=false] {boolean} Indicates whether an event is a bubbling event. If the event can bubble, this value is true; otherwise it is false.
   * Note: With event-bubbling you can let one Event subsequently call on every ancestor ({{#crossLink "EventDispatcher/parent:property"}}{{/crossLink}})
   * (containers of containers of etc.) of the {{#crossLink "DisplayObjectContainer"}}{{/crossLink}} that originally dispatched the Event, all the way up to the surface ({{#crossLink "Stage"}}{{/crossLink}}). Any classes that do not have a parent cannot bubble.
   * @param [cancelable=false] {boolean} Indicates whether the behavior associated with the event can be prevented. If the behavior can be canceled, this value is true; otherwise it is false.
   * @param [data=null] {any} Use to pass any type of data with the event.
   * @module StructureJS
   * @submodule event
   * @requires Extend
   * @requires BaseObject
   * @constructor
   * @author Robert S. (www.codeBelt.com)
   * @example
   *     // Example: how to create a custom event by extending BaseEvent.
   *
   *     class CountryEvent extends BaseEvent {
   *
   *          CHANGE_COUNTRY = 'CountryEvent.changeCountry';
   *
   *          constructor(type, bubbles = false, cancelable = false, data = null) {
   *              super(type, bubbles, cancelable, data);
   *
   *              this.countryName = null;
   *          }
   *      }
   *
   *     // Example: how to use the custom event.
   *     let event = new CountryEvent(CountryEvent.CHANGE_COUNTRY);
   *     event.countryName = 'Canada';
   *     this.dispatchEvent(event);
   */
  var BaseEvent = (function (_super) {
    __extends(BaseEvent, _super);
    function BaseEvent(type, bubbles, cancelable, data) {
      if (bubbles === void 0) {
        bubbles = false;
      }
      if (cancelable === void 0) {
        cancelable = false;
      }
      if (data === void 0) {
        data = null;
      }
      _super.call(this);
      /**
       * The type of event.
       *
       * @property type
       * @type {string}
       * @default null
       * @public
       * @readOnly
       */
      this.type = null;
      /**
       * A reference to the object that originally dispatched the event.
       *
       * @property target
       * @type {any}
       * @default null
       * @public
       * @readOnly
       */
      this.target = null;
      /**
       * The currentTarget property always points to the {{#crossLink "DisplayObjectContainer"}}{{/crossLink}} that the event is currently processing (i.e. bubbling at).
       *
       * @property currentTarget
       * @type {any}
       * @default null
       * @public
       * @readOnly
       */
      this.currentTarget = null;
      /**
       * Used to pass any type of data with the event.
       *
       * @property data
       * @type {any}
       * @public
       * @default null
       */
      this.data = null;
      /**
       * Indicates whether an event is a bubbling event.
       *
       * @property bubbles
       * @type {boolean}
       * @public
       * @default false
       */
      this.bubbles = false;
      /**
       * Indicates whether the behavior associated with the event can be prevented.
       *
       * @property cancelable
       * @type {boolean}
       * @public
       * @default false
       */
      this.cancelable = false;
      /**
       * Indicates if the {{#crossLink "BaseEvent/stopPropagation:method"}}{{/crossLink}} was called on the event object.
       *
       * @property isPropagationStopped
       * @type {boolean}
       * @default false
       * @public
       * @readOnly
       */
      this.isPropagationStopped = false;
      /**
       * Indicates if the {{#crossLink "BaseEvent/stopImmediatePropagation:method"}}{{/crossLink}} was called on the event object.
       *
       * @property isImmediatePropagationStopped
       * @type {boolean}
       * @default false
       * @public
       * @readOnly
       */
      this.isImmediatePropagationStopped = false;
      this.type = type;
      this.bubbles = bubbles;
      this.cancelable = cancelable;
      this.data = data;
    }
    /**
     * Prevents processing of any event listeners in nodes subsequent to the current node in the event flow.
     * This method does not affect any event listeners in the current node (currentTarget). In contrast,
     * the {{#crossLink "BaseEvent/stopImmediatePropagation:method"}}{{/crossLink}} method prevents processing
     * of event listeners in both the current node and subsequent nodes. Additional calls to this method have no effect.
     *
     * @method stopPropagation
     * @public
     * @example
     *     event.stopPropagation();
     */
    BaseEvent.prototype.stopPropagation = function () {
      this.isPropagationStopped = true;
    };
    /**
     * Prevents processing of any event listeners in the current node and any subsequent nodes in the event flow.
     * This method takes effect immediately, and it affects event listeners in the current node. In contrast,
     * the {{#crossLink "BaseEvent/stopPropagation:method"}}{{/crossLink}} method doesn't take effect until
     * all the event listeners in the current node finish processing.
     *
     * @method stopImmediatePropagation
     * @public
     * @example
     *     event.stopImmediatePropagation();
     */
    BaseEvent.prototype.stopImmediatePropagation = function () {
      this.stopPropagation();
      this.isImmediatePropagationStopped = true;
    };
    /**
     * Duplicates an instance of an BaseEvent subclass.
     *
     * Returns a new BaseEvent object that is a copy of the original instance of the BaseEvent object.
     *
     * The new BaseEvent object includes all the properties of the original.
     *
     * @method clone
     * @returns {BaseEvent}
     * @public
     * @example
     *     let cloneOfEvent = event.clone();
     */
    BaseEvent.prototype.clone = function () {
      var clonedBaseModel = new this.constructor(this.type, this.bubbles, this.cancelable, this.data);
      for (var key in this) {
        if (this.hasOwnProperty(key)) {
          clonedBaseModel[key] = this[key];
        }
      }
      return clonedBaseModel;
    };
    /**
     * The BaseEvent.ACTIVATE constant defines the value of the type property of an activate event object.
     *
     * @event ACTIVATE
     * @type {string}
     * @public
     * @static
     */
    BaseEvent.ACTIVATE = 'BaseEvent.activate';
    /**
     * The BaseEvent.ADDED constant defines the value of the type property of an added event object.
     *
     * @event ADDED
     * @type {string}
     * @public
     * @static
     */
    BaseEvent.ADDED = 'BaseEvent.added';
    /**
     * The BaseEvent.ADDED_TO_STAGE constant defines the value of the type property of an addedToStage event object.
     *
     * @event ADDED_TO_STAGE
     * @type {string}
     * @public
     * @static
     */
    BaseEvent.ADDED_TO_STAGE = 'BaseEvent.addedToStage';
    /**
     * The BaseEvent.CANCEL constant defines the value of the type property of a cancel event object.
     *
     * @event CANCEL
     * @type {string}
     * @public
     * @static
     */
    BaseEvent.CANCEL = 'BaseEvent.cancel';
    /**
     * The BaseEvent.CHANGE constant defines the value of the type property of a change event object.
     *
     * @event CHANGE
     * @type {string}
     * @public
     * @static
     */
    BaseEvent.CHANGE = 'BaseEvent.change';
    /**
     * The BaseEvent.CLEAR constant defines the value of the type property of a clear event object.
     *
     * @event CLEAR
     * @type {string}
     * @public
     * @static
     */
    BaseEvent.CLEAR = 'BaseEvent.clear';
    /**
     * The BaseEvent.CLOSE constant defines the value of the type property of a close event object.
     *
     * @event CLOSE
     * @type {string}
     * @public
     * @static
     */
    BaseEvent.CLOSE = 'BaseEvent.close';
    /**
     * The BaseEvent.CLOSING constant defines the value of the type property of a closing event object.
     *
     * @event CLOSING
     * @type {string}
     * @public
     * @static
     */
    BaseEvent.CLOSING = 'BaseEvent.closing';
    /**
     * The BaseEvent.COMPLETE constant defines the value of the type property of a complete event object.
     *
     * @event COMPLETE
     * @type {string}
     * @public
     * @static
     */
    BaseEvent.COMPLETE = 'BaseEvent.complete';
    /**
     * The BaseEvent.CONNECT constant defines the value of the type property of a connect event object.
     *
     * @event CONNECT
     * @type {string}
     * @public
     * @static
     */
    BaseEvent.CONNECT = 'BaseEvent.connect';
    /**
     * Defines the value of the type property of a copy event object.
     *
     * @event COPY
     * @type {string}
     * @public
     * @static
     */
    BaseEvent.COPY = 'BaseEvent.copy';
    /**
     * Defines the value of the type property of a cut event object.
     *
     * @event CUT
     * @type {string}
     * @public
     * @static
     */
    BaseEvent.CUT = 'BaseEvent.cut';
    /**
     * The BaseEvent.DEACTIVATE constant defines the value of the type property of a deactivate event object.
     *
     * @event DEACTIVATE
     * @type {string}
     * @public
     * @static
     */
    BaseEvent.DEACTIVATE = 'BaseEvent.deactivate';
    /**
     * The BaseEvent.DISPLAYING constant defines the value of the type property of a displaying event object.
     *
     * @event DISPLAYING
     * @type {string}
     * @public
     * @static
     */
    BaseEvent.DISPLAYING = 'BaseEvent.displaying';
    /**
     * The BaseEvent.ENTER_FRAME constant defines the value of the type property of an enterFrame event object.
     *
     * @event ENTER_FRAME
     * @type {string}
     * @public
     * @static
     */
    BaseEvent.ENTER_FRAME = 'BaseEvent.enterFrame';
    /**
     * The BaseEvent.EXIT_FRAME constant defines the value of the type property of an exitFrame event object.
     *
     * @event EXIT_FRAME
     * @type {string}
     * @public
     * @static
     */
    BaseEvent.EXIT_FRAME = 'BaseEvent.exitFrame';
    /**
     * The BaseEvent.EXITING constant defines the value of the type property of an exiting event object.
     *
     * @event EXITING
     * @type {string}
     * @public
     * @static
     */
    BaseEvent.EXITING = 'BaseEvent.exiting';
    /**
     * The BaseEvent.FULL_SCREEN constant defines the value of the type property of a fullScreen event object.
     *
     * @event FULLSCREEN
     * @type {string}
     * @public
     * @static
     */
    BaseEvent.FULLSCREEN = 'BaseEvent.fullScreen';
    /**
     * The BaseEvent.INIT constant defines the value of the type property of an init event object.
     *
     * @event INIT
     * @type {string}
     * @public
     * @static
     */
    BaseEvent.INIT = 'BaseEvent.init';
    /**
     * The BaseEvent.NETWORK_CHANGE constant defines the value of the type property of a networkChange event object.
     *
     * @event NETWORK_CHANGE
     * @type {string}
     * @public
     * @static
     */
    BaseEvent.NETWORK_CHANGE = 'BaseEvent.networkChange';
    /**
     * The BaseEvent.OPEN constant defines the value of the type property of an open event object.
     *
     * @event OPEN
     * @type {string}
     * @public
     * @static
     */
    BaseEvent.OPEN = 'BaseEvent.open';
    /**
     * The BaseEvent.PASTE constant defines the value of the type property of a paste event object.
     *
     * @event PASTE
     * @type {string}
     * @public
     * @static
     */
    BaseEvent.PASTE = 'BaseEvent.paste';
    /**
     * The BaseEvent.PREPARING constant defines the value of the type property of a preparing event object.
     *
     * @event PREPARING
     * @type {string}
     * @public
     * @static
     */
    BaseEvent.PREPARING = 'BaseEvent.preparing';
    /**
     * The BaseEvent.REMOVED constant defines the value of the type property of a removed event object.
     *
     * @event REMOVED
     * @type {string}
     * @public
     * @static
     */
    BaseEvent.REMOVED = 'BaseEvent.removed';
    /**
     * The BaseEvent.RENDER constant defines the value of the type property of a render event object.
     *
     * @event RENDER
     * @type {string}
     * @public
     * @static
     */
    BaseEvent.RENDER = 'BaseEvent.render';
    /**
     * The BaseEvent.RESIZE constant defines the value of the type property of a resize event object.
     *
     * @event RESIZE
     * @type {string}
     * @public
     * @static
     */
    BaseEvent.RESIZE = 'BaseEvent.resize';
    /**
     * The BaseEvent.SELECTED constant defines the value of the type property of a selected event object.
     *
     * @event SELECTED
     * @type {string}
     * @public
     * @static
     */
    BaseEvent.SELECTED = 'BaseEvent.selected';
    return BaseEvent;
  })(BaseObject_1['default']);
  Object.defineProperty(exports, "__esModule", { value: true });
  exports['default'] = BaseEvent;
});

},{"../BaseObject":10}],17:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", '../ObjectManager', './BaseEvent'], factory);
    }
})(function (require, exports) {
    var ObjectManager_1 = require('../ObjectManager');
    var BaseEvent_1 = require('./BaseEvent');
    /**
     * EventDispatcher is the base class for all classes that dispatch events. It is the base class for the {{#crossLink "DisplayObjectContainer"}}{{/crossLink}} class.
     * EventDispatcher provides methods for managing prioritized queues of event listeners and dispatching events.
     *
     * @class EventDispatcher
     * @extends ObjectManager
     * @module StructureJS
     * @submodule event
     * @requires Extend
     * @requires ObjectManager
     * @requires BaseEvent
     * @constructor
     * @author Robert S. (www.codeBelt.com)
     * @example
     *      // Another way to use the EventDispatcher.
     *      let eventDispatcher = new EventDispatcher();
     *      eventDispatcher.addEventListener('change', this._handlerMethod, this);
     *      eventDispatcher.dispatchEvent('change');
     */
    var EventDispatcher = (function (_super) {
        __extends(EventDispatcher, _super);
        function EventDispatcher() {
            _super.call(this);
            /**
             * Holds a reference to added listeners.
             *
             * @property _listeners
             * @type {Array.<any>}
             * @protected
             */
            this._listeners = null;
            /**
             * Indicates the object that contains a child object. Uses the parent property
             * to specify a relative path to display objects that are above the current display object in the display
             * list hierarchy and helps facilitate event bubbling.
             *
             * @property parent
             * @type {any}
             * @public
             */
            this.parent = null;
            this._listeners = [];
        }
        /**
         * Registers an event listener object with an EventDispatcher object so the listener receives notification of an event.
         *
         * @method addEventListener
         * @param type {String} The type of event.
         * @param callback {Function} The listener function that processes the event. This function must accept an Event object as its only parameter and must return nothing, as this example shows. @example function(event:Event):void
         * @param scope {any} Binds the scope to a particular object (scope is basically what "this" refers to in your function). This can be very useful in JavaScript because scope isn't generally maintained.
         * @param [priority=0] {int} Influences the order in which the listeners are called. Listeners with lower priorities are called after ones with higher priorities.
         * @public
         * @chainable
         * @example
         *      this.addEventListener(BaseEvent.CHANGE, this._handlerMethod, this);
         *
         *      _handlerMethod(event) {
         *          console.log(event.target + " sent the event.");
         *          console.log(event.type, event.data);
         *      }
         */
        EventDispatcher.prototype.addEventListener = function (type, callback, scope, priority) {
            if (priority === void 0) { priority = 0; }
            // Get the list of event listeners by the associated type value that is passed in.
            var list = this._listeners[type];
            if (list == null) {
                // If a list of event listeners do not exist for the type value passed in then create a new empty array.
                this._listeners[type] = list = [];
            }
            var index = 0;
            var listener;
            var i = list.length;
            while (--i > -1) {
                listener = list[i];
                if (listener.callback === callback && listener.scope === scope) {
                    // If the same callback and scope are found then remove it and add the current one below.
                    list.splice(i, 1);
                }
                else if (index === 0 && listener.priority < priority) {
                    index = i + 1;
                }
            }
            // Add the event listener to the list array at the index value.
            list.splice(index, 0, { callback: callback, scope: scope, priority: priority, once: false });
            return this;
        };
        /**
         * Registers an event listener object once with an EventDispatcher object so the listener will receive the notification of an event.
         *
         * @method addEventListenerOnce
         * @param type {String} The type of event.
         * @param callback {Function} The listener function that processes the event. This function must accept an Event object as its only parameter and must return nothing, as this example shows. @example function(event:Event):void
         * @param scope {any} Binds the scope to a particular object (scope is basically what "this" refers to in your function). This can be very useful in JavaScript because scope isn't generally maintained.
         * @param [priority=0] {int} Influences the order in which the listeners are called. Listeners with lower priorities are called after ones with higher priorities.
         * @public
         * @chainable
         * @example
         *      this.addEventListenerOnce(BaseEvent.CHANGE, this._handlerMethod, this);
         *
         *      _handlerMethod(event) {
         *          console.log(event.target + " sent the event.");
         *          console.log(event.type, event.data);
         *      }
         */
        EventDispatcher.prototype.addEventListenerOnce = function (type, callback, scope, priority) {
            if (priority === void 0) { priority = 0; }
            // Add the event listener the normal way.
            this.addEventListener(type, callback, scope, priority);
            // Get the event listeners we just added.
            var list = this._listeners[type];
            var listener = list[0];
            // Change the value to true so it will be remove after dispatchEvent is called.
            listener.once = true;
            return this;
        };
        /**
         * Removes a specified listener from the EventDispatcher object.
         *
         * @method removeEventListener
         * @param type {String} The type of event.
         * @param callback {Function} The listener object to remove.
         * @param scope {any} The scope of the listener object to be removed.
         * @hide This was added because it was needed for the {{#crossLink "EventBroker"}}{{/crossLink}} class. To keep things consistent this parameter is required.
         * @public
         * @chainable
         * @example
         *      this.removeEventListener(BaseEvent.CHANGE, this._handlerMethod, this);
         */
        EventDispatcher.prototype.removeEventListener = function (type, callback, scope) {
            // Get the list of event listeners by the associated type value that is passed in.
            var list = this._listeners[type];
            if (list !== void 0) {
                var i_1 = list.length;
                while (--i_1 > -1) {
                    // If the callback and scope are the same then remove the event listener.
                    if (list[i_1].callback === callback && list[i_1].scope === scope) {
                        list.splice(i_1, 1);
                        break;
                    }
                }
            }
            return this;
        };
        /**
         * <p>Dispatches an event into the event flow. The event target is the EventDispatcher object upon which the dispatchEvent() method is called.</p>
         *
         * @method dispatchEvent
         * @param event {string|BaseEvent} The Event object or event type string you want to dispatch. You can create custom events, the only requirement is all events must extend {{#crossLink "BaseEvent"}}{{/crossLink}}.
         * @param [data=null] {any} The optional data you want to send with the event. Do not use this parameter if you are passing in a {{#crossLink "BaseEvent"}}{{/crossLink}}.
         * @public
         * @chainable
         * @example
         *      this.dispatchEvent('change');
         *
         *      // Example: Sending data with the event:
         *      this.dispatchEvent('change', {some: 'data'});
         *
         *      // Example: With an event object
         *      // (event type, bubbling set to true, cancelable set to true and passing data) :
         *      let event = new BaseEvent(BaseEvent.CHANGE, true, true, {some: 'data'});
         *      this.dispatchEvent(event);
         *
         *      // Here is a common inline event object being dispatched:
         *      this.dispatchEvent(new BaseEvent(BaseEvent.CHANGE));
         */
        EventDispatcher.prototype.dispatchEvent = function (type, data) {
            if (data === void 0) { data = null; }
            var event = type;
            if (typeof event === 'string') {
                event = new BaseEvent_1.default(type, false, true, data);
            }
            // If target is null then set it to the object that dispatched the event.
            if (event.target == null) {
                event.target = this;
                event.currentTarget = this;
            }
            // Get the list of event listener by the associated type value.
            var list = this._listeners[event.type];
            if (list !== void 0) {
                var i_2 = list.length;
                var listener;
                while (--i_2 > -1) {
                    // If cancelable and isImmediatePropagationStopped are true then break out of the while loop.
                    if (event.cancelable === true && event.isImmediatePropagationStopped === true) {
                        break;
                    }
                    listener = list[i_2];
                    listener.callback.call(listener.scope, event);
                    // If the once value is true we want to remove the listener right after this callback was called.
                    if (listener.once === true) {
                        this.removeEventListener(event.type, listener.callback, listener.scope);
                    }
                }
            }
            //Dispatches up the chain of classes that have a parent.
            if (this.parent != null && event.bubbles === true) {
                // If cancelable and isPropagationStopped are true then don't dispatch the event on the parent object.
                if (event.cancelable === true && event.isPropagationStopped === true) {
                    return this;
                }
                // Assign the current object that is currently processing the event (i.e. event bubbling at).
                event.currentTarget = this;
                // Pass the event to the parent (event bubbling).
                this.parent.dispatchEvent(event);
            }
            return this;
        };
        /**
         * Check if an object has a specific event listener already added.
         *
         * @method hasEventListener
         * @param type {String} The type of event.
         * @param callback {Function} The listener method to call.
         * @param scope {any} The scope of the listener object.
         * @return {boolean}
         * @public
         * @example
         *      this.hasEventListener(BaseEvent.CHANGE, this._handlerMethod, this);
         */
        EventDispatcher.prototype.hasEventListener = function (type, callback, scope) {
            if (this._listeners[type] !== void 0) {
                var listener;
                var numOfCallbacks = this._listeners[type].length;
                for (var i_3 = 0; i_3 < numOfCallbacks; i_3++) {
                    listener = this._listeners[type][i_3];
                    if (listener.callback === callback && listener.scope === scope) {
                        return true;
                    }
                }
            }
            return false;
        };
        /**
         * Generates a string output of event listeners for a given object.
         *
         * @method getEventListeners
         * @return {string}
         * @public
         * @example
         *      this.getEventListeners();
         *
         *      // [ClassName] is listening for the 'BaseEvent.change' event.
         */
        EventDispatcher.prototype.getEventListeners = function () {
            var str = '';
            var numOfCallbacks;
            var listener;
            for (var type in this._listeners) {
                numOfCallbacks = this._listeners[type].length;
                for (var i_4 = 0; i_4 < numOfCallbacks; i_4++) {
                    listener = this._listeners[type][i_4];
                    if (listener.scope && (typeof listener.scope.getQualifiedClassName === 'function')) {
                        str += '[' + listener.scope.getQualifiedClassName() + ']';
                    }
                    else {
                        str += '[Unknown]';
                    }
                    str += " is listen for '" + type + "' event.\n";
                }
            }
            return str;
        };
        /**
         * @overridden BaseObject.destroy
         */
        EventDispatcher.prototype.destroy = function () {
            this.disable();
            _super.prototype.destroy.call(this);
        };
        return EventDispatcher;
    })(ObjectManager_1.default);
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = EventDispatcher;
});

},{"../ObjectManager":11,"./BaseEvent":16}],18:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", '../BaseObject', '../util/Util'], factory);
    }
})(function (require, exports) {
    var BaseObject_1 = require('../BaseObject');
    var Util_1 = require('../util/Util');
    /**
     *  Base Model is a design pattern used to transfer data between software application subsystems.
     *
     * Note: If the data doesn't match the property names you can set the value manually after update super method has been called.
     *  Also in the class you inherit BaseModel from you can override the update method to handle the data how you want.
     *
     * @class BaseModel
     * @extends BaseObject
     * @param [data] {any} Provide a way to update the  Base Model upon initialization.
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
     *          constructor(data) {
     *              super();
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
    var BaseModel = (function (_super) {
        __extends(BaseModel, _super);
        function BaseModel() {
            _super.call(this);
        }
        /**
         * Provide a way to update the  Base Model.
         *
         * @method update
         * @param data {any}
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
            var propertyData;
            for (var propertyKey in this) {
                // If this class has a property that matches a property on the data being passed in then set it.
                // Also don't set the sjsId data value because it is automatically set in the constructor and
                // we do want it to be overridden when the clone method has been called.
                if (this.hasOwnProperty(propertyKey) && propertyKey !== 'sjsId') {
                    // If the data passed in does not have a property that matches a property on the  Base Model then
                    // use the default value/data that was assigned to the property.
                    // Else use the data that was passed in.
                    propertyData = (data[propertyKey] === void 0) ? this[propertyKey] : data[propertyKey];
                    this._setData(propertyKey, propertyData);
                }
            }
            return this;
        };
        /**
         * TODO: YUIDoc_comment
         *
         * @method _setData
         * @param key
         * @param data
         * @protected
         */
        BaseModel.prototype._setData = function (key, data) {
            // If the data is an array and if the property its being assigned to is an array.
            if (data instanceof Array && this[key] instanceof Array) {
                var temp = [];
                var len = data.length;
                if ((this[key][0] instanceof BaseModel.constructor && data[0] instanceof BaseModel.constructor) === false) {
                    var baseModelOrOther = (this[key] instanceof Array) ? this[key][0] : this[key];
                    for (var i_1 = 0; i_1 < len; i_1++) {
                        temp[i_1] = this._updateData(baseModelOrOther, data[i_1]);
                    }
                }
                this[key] = temp;
            }
            else {
                this[key] = this._updateData(this[key], data);
            }
        };
        /**
         * TODO: YUIDoc_comment
         *
         * @method _updateData
         * @param keyValue
         * @param data
         * @protected
         */
        BaseModel.prototype._updateData = function (keyValue, data) {
            if (keyValue instanceof BaseModel.constructor) {
                // If the property is an instance of a BaseModel class and has not been created yet.
                // Then instantiate it and pass in the data to the constructor.
                keyValue = new keyValue(data);
            }
            else if (keyValue instanceof BaseModel) {
                // If property is an instance of a BaseModel class and has already been created.
                // Then call the update method and pass in the data.
                keyValue.update(data);
            }
            else {
                // Else just assign the data to the property.
                keyValue = data;
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
            var clone = Util_1.default.clone(this);
            return Util_1.default.deletePropertyFromObject(clone, ['sjsId']);
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
    })(BaseObject_1.default);
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = BaseModel;
});

},{"../BaseObject":10,"../util/Util":25}],19:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", '../event/EventDispatcher', '../event/BaseEvent', '../util/Util'], factory);
    }
})(function (require, exports) {
    var EventDispatcher_1 = require('../event/EventDispatcher');
    var BaseEvent_1 = require('../event/BaseEvent');
    var Util_1 = require('../util/Util');
    /**
     * The Collection class provides a way for you to manage your models.
     *
     * @class Collection
     * @extends EventDispatcher
     * @module StructureJS
     * @submodule model
     * @requires Extend
     * @requires EventDispatcher
     * @requires BaseEvent
     * @constructor
     * @param baseModelType {BaseModel} Pass a class that extends BaseModel and the data added to the collection will be created as that type.
     * @author Robert S. (www.codeBelt.com)
     * @example
     *     let data = [{ make: 'Tesla', model: 'Model S', year: 2014 }, { make: 'Tesla', model: 'Model X', year: 2016 }];
     *
     *     // Example of adding data to a collection
     *     let collection = new Collection();
     *     collection.add(data);
     *
     *     // Example of adding data to a collection that will create a CarModel model for each data object passed in.
     *     let collection = new Collection(CarModel);
     *     collection.add(data);
     */
    var Collection = (function (_super) {
        __extends(Collection, _super);
        function Collection(baseModelType) {
            if (baseModelType === void 0) { baseModelType = null; }
            _super.call(this);
            /**
             * The list of models in the collection.
             *
             * @property models
             * @type {Array.<any>}
             * @readOnly
             */
            this.models = [];
            /**
             * The count of how many models are in the collection.
             *
             * @property length
             * @type {int}
             * @default 0
             * @readOnly
             * @public
             */
            this.length = 0;
            /**
             * A reference to a BaseModel type that will be used in the collection.
             *
             * @property _modelType
             * @type {any}
             * @protected
             */
            this._modelType = null;
            this._modelType = baseModelType;
        }
        /**
         * Adds model or an array of models to the collection.
         *
         * @method add
         * @param model {Any|Array} Single or an array of models to add to the current collection.
         * @param [silent=false] {boolean} If you'd like to prevent the event from being dispatched.
         * @public
         * @chainable
         * @example
         *      collection.add(model);
         *
         *      collection.add([model, model, model, model]);
         *
         *      collection.add(model, true);
         */
        Collection.prototype.add = function (model, silent) {
            if (silent === void 0) { silent = false; }
            // If the model passed in is not an array then make it.
            var models = (model instanceof Array) ? model : [model];
            var len = models.length;
            for (var i_1 = 0; i_1 < len; i_1++) {
                // Only add the model if it does not exist in the the collection.
                if (this.has(models[i_1]) === false) {
                    if (this._modelType !== null && (models[i_1] instanceof this._modelType) === false) {
                        // If the modelType is set and the data is not already a instance of the modelType
                        // then instantiate it and pass the data into the constructor.
                        this.models.push(new this._modelType(models[i_1]));
                    }
                    else {
                        // Pass the data object to the array.
                        this.models.push(models[i_1]);
                    }
                    this.length = this.models.length;
                }
            }
            if (silent === false) {
                this.dispatchEvent(new BaseEvent_1.default(BaseEvent_1.default.ADDED));
            }
            return this;
        };
        /**
         * Removes a model or an array of models from the collection.
         *
         * @method remove
         * @param model {Object|Array} Model(s) to remove
         * @param [silent=false] {boolean} If you'd like to prevent the event from being dispatched.
         * @public
         * @chainable
         * @example
         *      collection.remove(model);
         *
         *      collection.remove([model, model, model, model]);
         *
         *      collection.remove(model, true);
         */
        Collection.prototype.remove = function (model, silent) {
            if (silent === void 0) { silent = false; }
            // If the model passed in is not an array then make it.
            var models = (model instanceof Array) ? model : [model];
            for (var i_2 = models.length - 1; i_2 >= 0; i_2--) {
                // Only remove the model if it exists in the the collection.
                if (this.has(models[i_2]) === true) {
                    this.models.splice(this.indexOf(models[i_2]), 1);
                    this.length = this.models.length;
                }
            }
            if (silent === false) {
                this.dispatchEvent(new BaseEvent_1.default(BaseEvent_1.default.REMOVED));
            }
            return this;
        };
        /**
         * Checks if a collection has an model.
         *
         * @method has
         * @param model {Object} Item to check
         * @return {boolean}
         * @public
         * @example
         *      collection.has(model);
         */
        Collection.prototype.has = function (model) {
            return this.indexOf(model) > -1;
        };
        /**
         * Returns the array index position of the  Base Model.
         *
         * @method indexOf
         * @param model {Object} get the index of.
         * @return {int}
         * @public
         * @example
         *      collection.indexOf(model);
         */
        Collection.prototype.indexOf = function (model) {
            return this.models.indexOf(model);
        };
        /**
         * Finds an object by an index value.
         *
         * @method get
         * @param index {int} The index integer of the model to get
         * @return {Object} the model
         * @public
         * @example
         *      let model = collection.get(1);
         */
        Collection.prototype.get = function (index) {
            return this.models[index] || null;
        };
        /**
         * Examines each element in a collection, returning an array of all elements that have the given properties.
         * When checking properties, this method performs a deep comparison between values to determine if they are equivalent to each other.
         * @method findBy
         * @param arg {Object|Array}
         * @return {Array.<any>} Returns a list of found object's.
         * @public
         * @example
         *      // Finds all  Base Model that has 'Robert' in it.
         *      collection.findBy("Robert");
         *      // Finds any  Base Model that has 'Robert' or 'Heater' or 23 in it.
         *      collection.findBy(["Robert", "Heather", 32]);
         *
         *      // Finds all  Base Models that same key and value you are searching for.
         *      collection.findBy({ name: 'apple', organic: false, type: 'fruit' });
         *      collection.findBy([{ type: 'vegetable' }, { name: 'apple', 'organic: false, type': 'fruit' }]);
         */
        Collection.prototype.findBy = function (arg) {
            // If properties is not an array then make it an array object.
            var list = (arg instanceof Array) ? arg : [arg];
            var foundItems = [];
            var len = list.length;
            var prop;
            for (var i_3 = 0; i_3 < len; i_3++) {
                prop = list[i_3];
                // Adds found  Base Model to the foundItems array.
                if ((typeof prop === 'string') || (typeof prop === 'number') || (typeof prop === 'boolean')) {
                    // If the model is not an object.
                    foundItems = foundItems.concat(this._findPropertyValue(prop));
                }
                else {
                    // If the model is an object.
                    foundItems = foundItems.concat(this._where(prop));
                }
            }
            // Removes all duplicated objects found in the temp array.
            return Util_1.default.unique(foundItems);
        };
        /**
         * Loops through the models array and creates a new array of models that match all the properties on the object passed in.
         *
         * @method _where
         * @param propList {Object|Array}
         * @return {Array.<any>} Returns a list of found object's.
         * @protected
         */
        Collection.prototype._where = function (propList) {
            // If properties is not an array then make it an array object.
            var list = (propList instanceof Array) ? propList : [propList];
            var foundItems = [];
            var itemsLength = this.models.length;
            var itemsToFindLength = list.length;
            var hasMatchingProperty = false;
            var doesModelMatch = false;
            var model;
            var obj;
            var key;
            var j;
            for (var i_4 = 0; i_4 < itemsToFindLength; i_4++) {
                obj = list[i_4];
                for (j = 0; j < itemsLength; j++) {
                    hasMatchingProperty = false;
                    doesModelMatch = true;
                    model = this.models[j];
                    for (key in obj) {
                        // Check if the key value is a property.
                        if (obj.hasOwnProperty(key) && model.hasOwnProperty(key)) {
                            hasMatchingProperty = true;
                            if (obj[key] !== model[key]) {
                                doesModelMatch = false;
                                break;
                            }
                        }
                    }
                    if (doesModelMatch === true && hasMatchingProperty === true) {
                        foundItems.push(model);
                    }
                }
            }
            return foundItems;
        };
        /**
         * Loops through all properties of an object and check to see if the value matches the argument passed in.
         *
         * @method _findPropertyValue
         * @param arg {String|Number|Boolean>}
         * @return {Array.<any>} Returns a list of found object's.
         * @protected
         */
        Collection.prototype._findPropertyValue = function (arg) {
            // If properties is not an array then make it an array object.
            var list = (arg instanceof Array) ? arg : [arg];
            var foundItems = [];
            var itemsLength = this.models.length;
            var itemsToFindLength = list.length;
            var propertyValue;
            var value;
            var model;
            var key;
            var j;
            for (var i_5 = 0; i_5 < itemsLength; i_5++) {
                model = this.models[i_5];
                for (key in model) {
                    // Check if the key value is a property.
                    if (model.hasOwnProperty(key)) {
                        propertyValue = model[key];
                        for (j = 0; j < itemsToFindLength; j++) {
                            value = list[j];
                            // If the  Base Model property equals the string value then keep a reference to that  Base Model.
                            if (propertyValue === value) {
                                // Add found  Base Model to the foundItems array.
                                foundItems.push(model);
                                break;
                            }
                        }
                    }
                }
            }
            return foundItems;
        };
        /**
         * Clears or remove all the models from the collection.
         *
         * @method clear
         * @param [silent=false] {boolean} If you'd like to prevent the event from being dispatched.
         * @public
         * @chainable
         * @example
         *      collection.clear();
         */
        Collection.prototype.clear = function (silent) {
            if (silent === void 0) { silent = false; }
            this.models = [];
            this.length = 0;
            if (silent === false) {
                this.dispatchEvent(new BaseEvent_1.default(BaseEvent_1.default.CLEAR));
            }
            return this;
        };
        /**
         * Creates and returns a new collection object that contains a reference to the models in the collection cloned from.
         *
         * @method clone
         * @returns {Collection}
         * @public
         * @example
         *     let clone = collection.clone();
         */
        Collection.prototype.clone = function () {
            var clonedBaseModel = new this.constructor(this._modelType);
            clonedBaseModel.add(this.models.slice(0));
            return clonedBaseModel;
        };
        /**
         * Creates a JSON object of the collection.
         *
         * @method toJSON
         * @returns {Array.<any>}
         * @public
         * @example
         *     let arrayOfObjects = collection.toJSON();
         */
        Collection.prototype.toJSON = function () {
            if (this._modelType !== null) {
                var list = [];
                var len = this.length;
                for (var i_6 = 0; i_6 < len; i_6++) {
                    list[i_6] = this.models[i_6].toJSON();
                }
                return list;
            }
            else {
                return Util_1.default.clone(this.models);
            }
        };
        /**
         * Creates a JSON string of the collection.
         *
         * @method toJSONString
         * @returns {string}
         * @public
         * @example
         *     let str = collection.toJSONString();
         */
        Collection.prototype.toJSONString = function () {
            return JSON.stringify(this.toJSON());
        };
        /**
         * Converts the string json data into an Objects and calls the {{#crossLink "Collection/add:method"}}{{/crossLink}} method to add the objects to the collection.
         *
         * @method fromJSON
         * @param json {string}
         * @public
         * @chainable
         * @example
         *      collection.fromJSON(str);
         */
        Collection.prototype.fromJSON = function (json) {
            var parsedData = JSON.parse(json);
            this.add(parsedData);
            return this;
        };
        /**
         * Allows you to sort models that have one or more common properties, specifying the property or properties to use as the sort keys
         *
         * @method sortOn
         * @param propertyName {string}
         * @param [sortAscending=true] {boolean}
         * @public
         * @return {Array<any>} Returns the list of models in the collection.
         * @example
         *      collection.sortOn('name');
         *      collection.sortOn('name', false);
         */
        Collection.prototype.sortOn = function (propertyName, sortAscending) {
            if (sortAscending === void 0) { sortAscending = true; }
            if (sortAscending === false) {
                return this.sort(function (a, b) {
                    if (a[propertyName] < b[propertyName]) {
                        return 1;
                    }
                    if (a[propertyName] > b[propertyName]) {
                        return -1;
                    }
                    return 0;
                });
            }
            else {
                return this.sort(function (a, b) {
                    if (a[propertyName] > b[propertyName]) {
                        return 1;
                    }
                    if (a[propertyName] < b[propertyName]) {
                        return -1;
                    }
                    return 0;
                });
            }
        };
        /**
         * Specifies a function that defines the sort order. If omitted, the array is sorted according to each character's Unicode code
         * point value, according to the string conversion of each element.
         *
         * @method sort
         * @param [sortFunction=null] {Function}
         * @public
         * @return {Array.<any>} Returns the list of models in the collection.
         * @example
         *      let sortByDate = function(a, b){
         *          return new Date(a.date) - new Date(b.date)
         *      }
         *
         *      collection.sort(sortByDate);
         */
        Collection.prototype.sort = function (sortFunction) {
            if (sortFunction === void 0) { sortFunction = null; }
            this.models.sort(sortFunction);
            return this.models;
        };
        /**
         * The filter method creates a new array with all elements that pass the test implemented by the provided function.
         *
         * @method filter
         * @param callback {Function} Function to test each element of the array. Invoked with arguments (element, index, array). Return true to keep the element, false otherwise.
         * @param [callbackScope=null] Optional. Value to use as this when executing callback.
         * @public
         * @return {Array.<any>} Returns the list of models in the collection.
         * @example
         *      let isOldEnough = function(model){
         *          return model.age >= 21;
         *      }
         *
         *      let list = collection.filter(isOldEnough);
         */
        Collection.prototype.filter = function (callback, callbackScope) {
            if (callbackScope === void 0) { callbackScope = null; }
            return this.models.filter(callback, callbackScope);
        };
        /**
         * Convenient way to get a list of property values.
         *
         * @method pluck
         * @param propertyName {string} The property name you want the values from.
         * @param [unique=false] {string} Pass in true to remove duplicates.
         * @return {Array.<any>}
         * @public
         * @example
         *      collection.add([{name: 'Robert'}, {name: 'Robert'}, {name: 'Chris'}]);
         *
         *      let list = collection.pluck('name');
         *      // ['Robert', 'Robert', 'Chris']
         *
         *      let list = collection.pluck('name', true);
         *      // ['Robert', 'Chris']
         */
        Collection.prototype.pluck = function (propertyName, unique) {
            if (unique === void 0) { unique = false; }
            var list = [];
            for (var i_7 = 0; i_7 < this.length; i_7++) {
                if (this.models[i_7].hasOwnProperty(propertyName) === true) {
                    list[i_7] = this.models[i_7][propertyName];
                }
            }
            if (unique === true) {
                list = Util_1.default.unique(list);
            }
            return list;
        };
        /**
         * Convenient way to group models into categories/groups by a property name.
         *
         * @method groupBy
         * @param propertyName {string} The string value of the property you want to group with.
         * @return {any} Returns an object that is categorized by the property name.
         * @public
         * @example
         *      collection.add([{name: 'Robert', id: 0}, {name: 'Robert', id: 1}, {name: 'Chris', id: 2}]);
         *
         *      let list = collection.groupBy('name');
         *
         *      // {
         *      //    Robert: [{name: 'Robert', id: 0}, {name: 'Robert', id: 1}]
         *      //    Chris: [{name: 'Chris', id: 2}]
         *      // }
         */
        Collection.prototype.groupBy = function (propertyName) {
            var model;
            var groupName;
            var groupList = {};
            // Loop through all the models in this collection.
            for (var i_8 = 0; i_8 < this.length; i_8++) {
                model = this.models[i_8];
                // Get the value from the property name passed in and uses that as the group name.
                groupName = model[propertyName];
                if (groupList[groupName] == null) {
                    groupList[groupName] = [];
                }
                groupList[groupName].push(model);
            }
            return groupList;
        };
        /**
         * Changes the order of the models so that the last model becomes the first model, the penultimate model becomes the second, and so on.
         *
         * @method reverse
         * @public
         * @return {Array.<any>} Returns the list of models in the collection.
         * @example
         *      collection.reverse();
         */
        Collection.prototype.reverse = function () {
            return this.models.reverse();
        };
        return Collection;
    })(EventDispatcher_1.default);
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = Collection;
});

},{"../event/BaseEvent":16,"../event/EventDispatcher":17,"../util/Util":25}],20:[function(require,module,exports){
(function (global){
'use strict';

(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports);if (v !== undefined) module.exports = v;
    } else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", 'jquery'], factory);
    }
})(function (require, exports) {
    var $ = (typeof window !== "undefined" ? window['$'] : typeof global !== "undefined" ? global['$'] : null);
    var $eventListener = $;
    /**
     * A bind polyfill for browsers that don't support the bind method.
     */
    if (!Function.prototype.bind) {
        Function.prototype.bind = function (oThis) {
            if (typeof this !== 'function') {
                // closest thing possible to the ECMAScript 5 internal IsCallable function
                throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
            }
            var aArgs = Array.prototype.slice.call(arguments, 1),
                fToBind = this,
                fNOP = function fNOP() {},
                fBound = function fBound() {
                return fToBind.apply(this instanceof fNOP && oThis ? this : oThis, aArgs.concat(Array.prototype.slice.call(arguments)));
            };
            fNOP.prototype = this.prototype;
            fBound.prototype = new fNOP();
            return fBound;
        };
    }
    /**
     * Generates a hash string from the string being passed in. In this case it is a function that is casted as string value.
     *
     * @param str
     * @returns {String}
     */
    var hashCode = function hashCode(str) {
        str = String(str);
        // http://erlycoder.com/49/javascript-hash-functions-to-convert-string-into-integer-hash-
        var character;
        var hash = null;
        var strLength = str.length;
        if (strLength == 0) return hash;
        for (var i_1 = 0; i_1 < strLength; i_1++) {
            character = str.charCodeAt(i_1);
            hash = (hash << 5) - hash + character;
            hash = hash & hash; // Convert to 32bit integer
        }
        return String(Math.abs(hash));
    };
    /**
     * The jQuery addEventListener plugin
     */
    $eventListener.fn.addEventListener = function (type, selector, data, callback, scope) {
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
    /**
     * The jQuery removeEventListener plugin
     */
    $eventListener.fn.removeEventListener = function (type, selector, callback, scope) {
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
    Object.defineProperty(exports, "__esModule", { value: true });
    exports['default'] = $eventListener;
});

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],21:[function(require,module,exports){
'use strict';

(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports);if (v !== undefined) module.exports = v;
    } else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", '../util/Util'], factory);
    }
})(function (require, exports) {
    var Util_1 = require('../util/Util');
    /**
     * A helper class to create multiple instances of the same Component Class from jQuery object that has one or more elements in it.
     *
     * @class ComponentFactory
     * @module StructureJS
     * @submodule util
     * @author Robert S. (www.codeBelt.com)
     * @static
     */
    var ComponentFactory = (function () {
        function ComponentFactory() {
            throw new Error('[ComponentFactory] Do not instantiate the ComponentFactory class because it is a static class.');
        }
        /**
         * Takes a jQuery object that has one or more elements in it and passes a single jQuery element into the constructor of the class that is also being passed in.
         *
         * @method create
         * @param $element {jQuery} One or more jQuery referenced DOM elements.
         * @param ComponentClass {any} The class that you want instantiated.
         * @param [scope=null] {DisplayObjectContainer} This scope (parent object) is needed to instantiate the component/view with the use of the {{#crossLink "DisplayObjectContainer/addChild:method"}}{{/crossLink}} method.
         * @return {Array.<any>} Returns a list of instantiated components/views so you can manage them within the Class that created them.
         * @public
         * @static
         * @example
         *      ComponentFactory.create($('.js-list'), SomeClass, this);
         */
        ComponentFactory.create = function ($elements, ComponentClass, scope) {
            if (scope === void 0) {
                scope = null;
            }
            var list = [];
            var component;
            var $element;
            var length = $elements.length;
            var types;
            var componentName;
            for (var i_1 = 0; i_1 < length; i_1++) {
                $element = $elements.eq(i_1);
                types = $element.attr('data-sjs-type');
                if (types === void 0) {
                    // Create the component if there is not a 'data-sjs-type' attribute on the element.
                    component = ComponentFactory._createComponent($element, ComponentClass, scope);
                    list.push(component);
                } else {
                    // Else if there is already a 'data-sjs-type' attribute then get the type(s).
                    types = types.split(',');
                    componentName = Util_1['default'].getName(ComponentClass);
                    // Only create the component if the component type does not already exist.
                    if (types.indexOf(componentName) === -1) {
                        component = ComponentFactory._createComponent($element, ComponentClass, scope);
                        list.push(component);
                    }
                }
            }
            return list;
        };
        /**
         * Helper method to create the component.
         *
         * @method _createComponent
         * @private
         */
        ComponentFactory._createComponent = function ($element, ComponentClass, scope) {
            var component = new ComponentClass($element);
            // If the class object has the sjsId property then I am assuming it is an instance of the DisplayObject class.
            if (scope !== null && component.hasOwnProperty('sjsId') === true) {
                scope.addChild(component);
            }
            return component;
        };
        return ComponentFactory;
    })();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports['default'] = ComponentFactory;
});

},{"../util/Util":25}],22:[function(require,module,exports){
(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    /**
     * The NumberUtil class has many helper methods to work with number data.
     *
     * @class NumberUtil
     * @module StructureJS
     * @submodule util
     * @author Robert S. (www.codeBelt.com)
     * @static
     */
    var NumberUtil = (function () {
        function NumberUtil() {
            throw new Error('[NumberUtil] Do not instantiate the NumberUtil class because it is a static class.');
        }
        /**
         * Converts bytes into megabytes.
         *
         * @method bytesToMegabytes
         * @param bytes {number}
         * @returns {number}
         * @public
         * @static
         * @example
         *
         */
        NumberUtil.bytesToMegabytes = function (bytes) {
            return bytes / 1048576;
        };
        /**
         * Converts centimeters into inches.
         *
         * @method centimeterToInch
         * @param cm {number}
         * @public
         * @static
         * @returns {number}
         * @example
         *     NumberUtil.centimeterToInch(1);
         *     // 0.3937
         */
        NumberUtil.centimeterToInch = function (cm) {
            return cm * 0.39370;
        };
        /**
         * Converts inches into centimeters.
         *
         * @method inchToCentimeter
         * @param inch {number}
         * @public
         * @static
         * @returns {number}
         * @example
         *     NumberUtil.inchToCentimeter(1);
         *     // 2.54
         */
        NumberUtil.inchToCentimeter = function (inch) {
            return inch * 2.54;
        };
        /**
         * Converts feet into meters.
         *
         * @method feetToMeter
         * @param feet {number}
         * @public
         * @static
         * @returns {number}
         * @example
         *     NumberUtil.feetToMeter(1);
         *     // 0.3048
         *
         */
        NumberUtil.feetToMeter = function (feet) {
            return feet / 3.2808;
        };
        /**
         * Converts seconds into hour, minutes, seconds.
         *
         * @method convertToHHMMSS
         * @param seconds {number}
         * @param showHours [boolean=true] By default if the time does not pass one hour it will show 00:05:34. Pass false to display the time as 05:34 until it gets pass one hour and then it will show 01:00:00
         * @returns {string}
         * @public
         * @static
         * @example
         *     NumberUtil.convertToHHMMSS(33333);
         *     // '09:15:33'
         */
        NumberUtil.convertToHHMMSS = function (seconds, showHours) {
            if (showHours === void 0) { showHours = true; }
            var sec = isNaN(seconds) ? 0 : seconds; //Changes NaN to 0
            var s = sec % 60;
            var m = Math.floor((sec % 3600) / 60);
            var h = Math.floor(sec / (60 * 60));
            var hourStr;
            if (showHours === false) {
                hourStr = (h == 0) ? '' : NumberUtil.doubleDigitFormat(h) + ':';
            }
            else {
                hourStr = NumberUtil.doubleDigitFormat(h) + ':';
            }
            var minuteStr = NumberUtil.doubleDigitFormat(m) + ':';
            var secondsStr = NumberUtil.doubleDigitFormat(s);
            return hourStr + minuteStr + secondsStr;
        };
        /**
         * Formats a number from 0-9 to display with 2 digits.
         *
         * @method doubleDigitFormat
         * @param num {number}
         * @returns {string}
         * @public
         * @static
         * @example
         *     NumberUtil.doubleDigitFormat(0);
         *     // '00'
         *
         *     NumberUtil.doubleDigitFormat(5);
         *     // '05'
         *
         *     NumberUtil.doubleDigitFormat(9);
         *     // '09'
         */
        NumberUtil.doubleDigitFormat = function (num) {
            if (num < 10) {
                return ('0' + num);
            }
            return String(num);
        };
        /**
         * Formats a currency string as a number.
         *
         * @method unformatUnit
         * @param value {string} The string currency that you want converted into a number.
         * @returns {number} Returns the number value of the currency string.
         * @public
         * @static
         * @example
         *     NumberUtil.unformatUnit('$1,234,567.89');
         *     // 1234567.89
         *
         *     NumberUtil.unformatUnit('1.234.567,89 €');
         *     // 1234567.89
         *
         *     NumberUtil.unformatUnit('$-123,456,789.99');
         *     // -123456789.99
         */
        NumberUtil.unformatUnit = function (value) {
            // Removes all characters and spaces except the period (.), comma (,) and the negative symbol (-).
            var withoutSpecialCharacters = value.replace(/[^\d.,-]/g, '');
            // Gets the index where the decimal placement is located.
            var decimalIndex = withoutSpecialCharacters.length - 3;
            var decimalSeparator = withoutSpecialCharacters.charAt(decimalIndex);
            if (decimalSeparator === '.') {
                // Removes all comma (,) characters and leaves the period (.) and the negative symbol (-).
                withoutSpecialCharacters = value.replace(/[^\d.-]/g, '');
            }
            else {
                // Removes all period (.) characters and leaves the comma (,) and the negative symbol (-).
                withoutSpecialCharacters = value.replace(/[^\d,-]/g, '');
                decimalIndex = withoutSpecialCharacters.length - 3;
                //Replaces the comma (,) to a period (.).
                withoutSpecialCharacters = withoutSpecialCharacters.replace(',', '.');
            }
            return parseFloat(withoutSpecialCharacters);
        };
        /**
         * Formats a number as a currency string.
         *
         * @method formatUnit
         * @param value {number} The number value you want formatted.
         * @param [decimalPlacement=2] {number} How many decimal placements you want to show.
         * @param [decimalSeparator='.'] {string} The character you want to use as the thousands separator.
         * @param [thousandsSeparator=','] {string} The character you want to use as the thousands separator.
         * @param [currencySymbol=''] {string} The symbol you would like to add.
         * @param [currencySymbolPlacement=0] {number} The placement of the symbol. Use 0 to place in front or 1 to place at the end.
         * @returns {string} Returns the formatted currency.
         * @public
         * @static
         * @example
         *     NumberUtil.formatUnit(1234567.89, 2, ".", ",", "$", 0);
         *     // '$1,234,567.89'
         *
         *     NumberUtil.formatUnit(12341234.56, 2, "*", ",", " €", 1);
         *     // '12,341,234*56 €'
         *
         *     NumberUtil.formatUnit(-1900.24, 1);
         *     // '-1,900.2'
         */
        NumberUtil.formatUnit = function (value, decimalPlacement, decimalSeparator, thousandsSeparator, currencySymbol, currencySymbolPlacement) {
            if (decimalPlacement === void 0) { decimalPlacement = 2; }
            if (decimalSeparator === void 0) { decimalSeparator = '.'; }
            if (thousandsSeparator === void 0) { thousandsSeparator = ','; }
            if (currencySymbol === void 0) { currencySymbol = ''; }
            if (currencySymbolPlacement === void 0) { currencySymbolPlacement = 0; }
            var str = String(Number(value).toFixed(decimalPlacement));
            var result = '';
            if (decimalPlacement != 0) {
                result = str.slice(-1 - decimalPlacement);
                result = result.replace('.', decimalSeparator);
                str = str.slice(0, str.length - 1 - decimalPlacement);
            }
            while (str.length > 3) {
                result = thousandsSeparator + str.slice(-3) + result;
                str = str.slice(0, str.length - 3);
            }
            if (str.length > 0) {
                if (currencySymbolPlacement === 0) {
                    result = currencySymbol + str + result;
                }
                else if (currencySymbolPlacement === 1) {
                    result = str + result + currencySymbol;
                }
                else {
                    result = str + result;
                }
            }
            return result;
        };
        /**
         * Convert Fahrenheit to Celsius.
         *
         * @method fahrenheitToCelsius
         * @param fahrenheit {number} The fahrenheit value.
         * @param decimals {number} The number of decimals.
         * @return {number}
         * @example
         *      MathUtil.fahrenheitToCelsius(32);
         *      // 0
         *
         *      MathUtil.fahrenheitToCelsius(212);
         *      // 100
         */
        NumberUtil.fahrenheitToCelsius = function (fahrenheit, decimals) {
            if (decimals === void 0) { decimals = 2; }
            var d = '';
            var r = (5 / 9) * (fahrenheit - 32);
            var s = r.toString().split('.');
            if (s[1] != undefined) {
                d = s[1].substr(0, decimals);
            }
            else {
                var i_1 = decimals;
                while (i_1 > 0) {
                    d += '0';
                    i_1--;
                }
            }
            var c = s[0] + '.' + d;
            return Number(c);
        };
        /**
         * Convert Celsius to Fahrenheit.
         *
         * @method celsiusToFahrenheit
         * @param celsius {number} The celsius value.
         * @param decimals {number} The number of decimals.
         * @return {number}
         * @example
         *      MathUtil.celsiusToFahrenheit(0);
         *      // 32
         *
         *      MathUtil.celsiusToFahrenheit(100);
         *      // 212
         */
        NumberUtil.celsiusToFahrenheit = function (celsius, decimals) {
            if (decimals === void 0) { decimals = 2; }
            var d = '';
            var r = (celsius / (5 / 9)) + 32;
            var s = r.toString().split('.');
            if (s[1] != undefined) {
                d = s[1].substr(0, decimals);
            }
            else {
                var i_2 = decimals;
                while (i_2 > 0) {
                    d += '0';
                    i_2--;
                }
            }
            var f = s[0] + '.' + d;
            return Number(f);
        };
        return NumberUtil;
    })();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = NumberUtil;
});

},{}],23:[function(require,module,exports){
'use strict';

(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports);if (v !== undefined) module.exports = v;
    } else if (typeof define === 'function' && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    /**
     * The StringUtil...
     *
     * @class StringUtil
     * @module StructureJS
     * @submodule util
     * @author Robert S. (www.codeBelt.com)
     * @static
     */
    var StringUtil = (function () {
        function StringUtil() {
            throw new Error('[StringUtil] Do not instantiate the StringUtil class because it is a static class.');
        }
        /**
         * Gets the extension name off the string being passed in.
         *
         * @method getExtension
         * @param filename {string}
         * @param withDot {boolean} If you want the period to be included in the extension name.
         * @returns {string}
         * @public
         * @static
         * @example
         *      StringUtil.getExtension('file.exe');
         *      // 'exe'
         *
         *      StringUtil.getExtension('file.exe', true);
         *      // '.exe'
         */
        StringUtil.getExtension = function (filename, withDot) {
            if (withDot === void 0) {
                withDot = false;
            }
            var num = withDot === true ? 0 : 1;
            return filename.slice(filename.lastIndexOf('.') + num, filename.length);
        };
        /**
         * Converts a string to a sentence case string.
         *
         * @method toSentence
         * @param str {string}
         * @param [separator] {string} Can be any string you want to use as a separator.
         * @returns {string}
         * @public
         * @static
         * @example
         *      StringUtil.toSentence("liveDown_by-the.River");
         *      // 'live down by the river'
         *
         *      StringUtil.toSentence("liveDown_by-the.River", '-');
         *      // 'live-down-by-the-river'
         *
         *      StringUtil.toSentence("liveDown_by-the.River", '_');
         *      // 'live_down_by_the_river'
         *
         *      StringUtil.toSentence("liveDown_by-the.River", '/');
         *      // 'live/down/by/the/river'
         */
        StringUtil.toSentence = function (str, separator) {
            if (separator === void 0) {
                separator = ' ';
            }
            return String(str).replace(/(\d)/g, '$1 ').replace(/([a-z](?=[A-Z]))/g, '$1 ').replace(/[^a-zA-Z0-9 ]/g, ' ').replace(/\s{2,}/g, ' ').replace(/^ | $/g, '').toLowerCase().replace(/\s+/g, separator);
        };
        /**
         * Converts a string to a camel case string.
         *
         * @method toCamelCase
         * @param str {string}
         * @returns {string}
         * @public
         * @static
         * @example
         *      StringUtil.toCamelCase("liveDown_by-the.River");
         *      // 'liveDownByTheRiver'
         */
        StringUtil.toCamelCase = function (str) {
            return StringUtil.toSentence(str).replace(/ (\w)/g, function (_, $1) {
                return $1.toUpperCase();
            });
        };
        /**
         * Converts a hyphen string to a pascal case string.
         *
         * @method toPascalCase
         * @param str {string}
         * @returns {string}
         * @public
         * @static
         * @example
         *      StringUtil.toPascalCase("liveDown_by-the.River");
         *      // 'LiveDownByTheRiver'
         */
        StringUtil.toPascalCase = function (str) {
            return StringUtil.toCamelCase(str).replace(/^[a-zA-Z]/, function (a, b, c) {
                return a.toUpperCase();
            });
        };
        /**
         * Converts a string to a constant case string.
         *
         * @method toConstantCase
         * @param str {string}
         * @returns {string}
         * @public
         * @static
         * @example
         *      StringUtil.toConstantCase("liveDown_by-the.River");
         *      // 'LIVE_DOWN_BY_THE_RIVER'
         */
        StringUtil.toConstantCase = function (str) {
            return StringUtil.toSentence(str, '_').toUpperCase();
        };
        /**
         * Creates a universally unique identifier.
         *
         * @method createUUID
         * @returns {string}
         * @public
         * @static
         * @example
         *      StringUtil.createUUID();
         *      // 'a95d7134-3342-4001-bcea-cc0371b70dec'
         */
        StringUtil.createUUID = function () {
            var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                var r = Math.random() * 16 | 0;
                var v = c == 'x' ? r : r & 0x3 | 0x8;
                return v.toString(16);
            });
            return uuid;
        };
        /**
         * Converts a query string to an object.
         *
         * @method queryStringToObject
         * @param queryString {string}
         * @param [useParseFloat=false] {boolean} If true converts strings to numbers.
         * @returns {Object|Null}
         * @public
         * @static
         * @example
         *      StringUtil.queryStringToObject('?name=Robert&age=23&gender=male');
         *      // {name: 'Robert', age: '23', gender: 'male'}
         *
         *      StringUtil.queryStringToObject('?name=Robert&age=23&gender=male', true);
         *      // {name: 'Robert', age: 23, gender: 'male'}
         */
        StringUtil.queryStringToObject = function (queryString, useParseFloat) {
            if (useParseFloat === void 0) {
                useParseFloat = false;
            }
            var params = {};
            var temp = null;
            var str = queryString.substring(queryString.indexOf('?') + 1);
            if (str === '') {
                return null;
            }
            // Split into key/value pairs
            var queries = str.split('&');
            // Convert the array of strings into an object
            var len = queries.length;
            for (var i_1 = 0; i_1 < len; i_1++) {
                temp = queries[i_1].split('=');
                params[temp[0]] = useParseFloat === true && isNaN(parseFloat(temp[1])) === false ? parseFloat(temp[1]) : temp[1];
            }
            return params;
        };
        /**
         * Remove all whitespace from the string passed in.
         *
         * @method removeAllWhitespace
         * @param str {string}
         * @returns {string}
         * @public
         * @static
         * @example
         *      let str = '   a b    c d e f g ';
         *      StringUtil.removeAllWhitespace(str);
         *      // 'abcdefg'
         */
        StringUtil.removeAllWhitespace = function (str) {
            return str.replace(/\s+/g, '');
        };
        /**
         * Remove leading and trailing whitespace.
         *
         * @method removeLeadingTrailingWhitespace
         * @param str {string}
         * @returns {string}
         * @public
         * @static
         * @example
         *      let str = '   a b    c d e f g ';
         *      StringUtil.removeLeadingTrailingWhitespace(str);
         *      // 'a b    c d e f g'
         */
        StringUtil.removeLeadingTrailingWhitespace = function (str) {
            return str.replace(/(^\s+|\s+$)/g, '');
        };
        /**
         *
         * @method truncate
         * @param text {string}
         * @param length {int}
         * @param indicator {string}
         * @returns {string}
         * @public
         * @static
         * @example
         *      StringUtil.truncate('Robert is cool and he likes bruschetta.', 14));
         *      // 'Robert is cool...'
         *
         *      StringUtil.truncate('Robert is cool and he likes bruschetta.', 14, '!!!'));
         *      // 'Robert is cool!!!'
         */
        StringUtil.truncate = function (text, length, indicator) {
            if (indicator === void 0) {
                indicator = '...';
            }
            if (text.length <= length) {
                return text;
            } else {
                return text.substr(0, length) + indicator;
            }
        };
        /**
         * Replaces each format item in a specified string with the text equivalent of a corresponding object's value.
         *
         * @method format
         * @returns {string}
         * @param str {string}
         * @param ...rest {Array.<any>}
         * @public
         * @static
         * @example
         *      StringUtil.format('Robert is {0}. Very {0} and {1}!', 'cool', 'smart');
         *      // 'Robert is cool. Very cool and smart!'
         */
        StringUtil.format = function (str) {
            var rest = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                rest[_i - 1] = arguments[_i];
            }
            var length = rest.length;
            var value = str;
            for (var i_2 = 0; i_2 < length; i_2++) {
                var reg = new RegExp('\\{' + i_2 + '\\}', 'gm');
                value = value.replace(reg, rest[i_2]);
            }
            return value;
        };
        /**
         * Updates a value in the query string by its key name.
         *
         * @method paramReplace
         * @param queryString
         * @param name
         * @param value
         * @returns {string|void}
         * @example
         *      StringUtil.paramReplace('?name=Robert&age=23&gender=male', 'gender', 'female');
         *      // '?name=Robert&age=23&gender=female'
         */
        StringUtil.paramReplace = function (queryString, name, value) {
            // Find the param with regex
            // Grab the first character in the returned string (should be ? or &)
            // Replace our href string with our new value, passing on the name and delimiter
            var re = new RegExp('[\\?&]' + name + '=([^&#]*)');
            var delimiter = re.exec(queryString)[0].charAt(0);
            return queryString.replace(re, delimiter + name + '=' + value);
        };
        return StringUtil;
    })();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports['default'] = StringUtil;
});

},{}],24:[function(require,module,exports){
(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", './StringUtil'], factory);
    }
})(function (require, exports) {
    var StringUtil_1 = require('./StringUtil');
    /**
     * A helper class to provide a convenient and consistent way to render templates.
     *
     * @class TemplateFactory
     * @module StructureJS
     * @submodule util
     * @requires StringUtil
     * @requires Handlebars
     * @author Robert S. (www.codeBelt.com)
     * @static
     */
    var TemplateFactory = (function () {
        function TemplateFactory() {
            throw new Error('[TemplateFactory] Do not instantiate the TemplateFactory class because it is a static class.');
        }
        /**
         * Creates a template.
         *
         * @method create
         * @param templatePath {any}
         * @param [data=any]
         * @returns {string}
         * @public
         * @static
         * @example
         *      TemplateFactory.create('templateName', {some: 'data'});
         */
        TemplateFactory.create = function (templatePath, data) {
            if (data === void 0) { data = null; }
            //Checks the first character to see if it is a '.' or '#'.
            var regex = /^([.#])(.+)/;
            var template = null;
            var isFunctionTemplate = typeof templatePath === 'function';
            var isClassOrIdName = regex.test(templatePath);
            if (isFunctionTemplate) {
                template = templatePath(data);
            }
            else if (isClassOrIdName) {
                // Remove pound sign from the id name.
                templatePath = templatePath.substring(1);
                var htmlString = document.getElementById(templatePath).innerHTML;
                htmlString = StringUtil_1.default.removeLeadingTrailingWhitespace(htmlString);
                if (TemplateFactory.templateEngine == TemplateFactory.UNDERSCORE) {
                    // Underscore Template:
                    var templateMethod = window['_'].template(htmlString);
                    template = templateMethod(data);
                }
                else {
                    // Handlebars Template
                    var templateMethod = Handlebars.compile(htmlString);
                    template = templateMethod(data);
                }
            }
            else {
                var templateObj = window[TemplateFactory.templateNamespace];
                if (!templateObj) {
                    // Returns null because the template namespace is not found.
                    return null;
                }
                var templateFunction = templateObj[templatePath];
                if (templateFunction) {
                    // The templatePath gets a function storage in the associative array.
                    // We call the function by passing in the data as the argument.
                    template = templateFunction(data);
                }
            }
            return template;
        };
        /**
         * A constant value for using Underscore or Lodash templates.
         *
         * @property UNDERSCORE
         * @type {string}
         * @public
         * @final
         * @static
         */
        TemplateFactory.UNDERSCORE = 'underscore';
        /**
         * A constant value for using Handlebars templates. This is the default template engine.
         *
         * @property HANDLEBARS
         * @type {string}
         * @public
         * @final
         * @static
         */
        TemplateFactory.HANDLEBARS = 'handlebars';
        /**
         * Sets the template engine type for this TemplateFactory class. The default is TemplateFactory.HANDLEBARS
         *
         * @property templateEngine
         * @type {string}
         * @default TemplateFactory.HANDLEBARS
         * @public
         * @static
         */
        TemplateFactory.templateEngine = TemplateFactory.HANDLEBARS;
        /**
         * The global namespace for pre-compiled templates.
         *
         * @property templateNamespace
         * @type {string}
         * @default 'JST'
         * @public
         * @static
         */
        TemplateFactory.templateNamespace = 'JST';
        return TemplateFactory;
    })();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = TemplateFactory;
});

},{"./StringUtil":23}],25:[function(require,module,exports){
'use strict';

(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports);if (v !== undefined) module.exports = v;
    } else if (typeof define === 'function' && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    /**
     * A Utility class that has several static methods to assist in development.
     *
     * @class Util
     * @module StructureJS
     * @submodule util
     * @author Robert S. (www.codeBelt.com)
     * @static
     */
    var Util = (function () {
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
            // Loop through the object properties.
            for (var key in object) {
                // If the key is a property and not function.
                if (object.hasOwnProperty(key)) {
                    var value_1 = object[key];
                    // If the property is an Array.
                    if (value_1 instanceof Array) {
                        // Loop through the Array and call the Util.deletePropertyFromObject method on each object in the array.
                        var array = value_1;
                        for (var index in array) {
                            // Recursive function call.
                            Util.deletePropertyFromObject(array[index], list);
                        }
                    } else if (value_1 instanceof Object) {
                        Util.deletePropertyFromObject(value_1, list);
                    } else {
                        // Loop through the list of property name.
                        for (var listIndex in list) {
                            // If the key(property name) equals the property name in the list array.
                            if (key === list[listIndex]) {
                                // Delete the property from the object.
                                delete object[key];
                            }
                        }
                    }
                }
            }
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
                for (var i_1 = 0, len = obj.length; i_1 < len; i_1++) {
                    array[i_1] = Util.clone(obj[i_1]);
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
            var debounced = function debounced() {
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
        /**
         * Keeps track of the count for the uniqueId method.
         *
         * @property _idCounter
         * @type {int}
         * @private
         * @static
         */
        Util._idCounter = 0;
        return Util;
    })();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports['default'] = Util;
});

},{}]},{},[3])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9ncnVudC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvcm9iZXJ0c2F2aWFuL1NpdGVzL1N0cnVjdHVyZUpTL2V4YW1wbGVzL01vdmllQ29sbGVjdGlvbi9zcmMvYXNzZXRzL3NjcmlwdHMvQXBwLmpzIiwiL1VzZXJzL3JvYmVydHNhdmlhbi9TaXRlcy9TdHJ1Y3R1cmVKUy9leGFtcGxlcy9Nb3ZpZUNvbGxlY3Rpb24vc3JjL2Fzc2V0cy9zY3JpcHRzL2NvbGxlY3Rpb25zL01vdmllQ29sbGVjdGlvbi5qcyIsIi9Vc2Vycy9yb2JlcnRzYXZpYW4vU2l0ZXMvU3RydWN0dXJlSlMvZXhhbXBsZXMvTW92aWVDb2xsZWN0aW9uL3NyYy9hc3NldHMvc2NyaXB0cy9tYWluLmpzIiwiL1VzZXJzL3JvYmVydHNhdmlhbi9TaXRlcy9TdHJ1Y3R1cmVKUy9leGFtcGxlcy9Nb3ZpZUNvbGxlY3Rpb24vc3JjL2Fzc2V0cy9zY3JpcHRzL21vZGVscy9Nb3ZpZU1vZGVsLmpzIiwiL1VzZXJzL3JvYmVydHNhdmlhbi9TaXRlcy9TdHJ1Y3R1cmVKUy9leGFtcGxlcy9Nb3ZpZUNvbGxlY3Rpb24vc3JjL2Fzc2V0cy9zY3JpcHRzL3NlcnZpY2VzL1JlcXVlc3RTZXJ2aWNlLmpzIiwiL1VzZXJzL3JvYmVydHNhdmlhbi9TaXRlcy9TdHJ1Y3R1cmVKUy9leGFtcGxlcy9Nb3ZpZUNvbGxlY3Rpb24vc3JjL2Fzc2V0cy9zY3JpcHRzL3V0aWxzL0hhbmRsZWJhcnNIZWxwZXJzLmpzIiwiL1VzZXJzL3JvYmVydHNhdmlhbi9TaXRlcy9TdHJ1Y3R1cmVKUy9leGFtcGxlcy9Nb3ZpZUNvbGxlY3Rpb24vc3JjL2Fzc2V0cy9zY3JpcHRzL3ZpZXdzL0xpc3RWaWV3LmpzIiwiL1VzZXJzL3JvYmVydHNhdmlhbi9TaXRlcy9TdHJ1Y3R1cmVKUy9leGFtcGxlcy9Nb3ZpZUNvbGxlY3Rpb24vc3JjL2Fzc2V0cy9zY3JpcHRzL3ZpZXdzL1BhZ2VDb250cm9sVmlldy5qcyIsIi9Vc2Vycy9yb2JlcnRzYXZpYW4vU2l0ZXMvU3RydWN0dXJlSlMvZXhhbXBsZXMvTW92aWVDb2xsZWN0aW9uL3NyYy9hc3NldHMvc2NyaXB0cy92aWV3cy9tb2RhbHMvRXJyb3JNb2RhbC5qcyIsIi9Vc2Vycy9yb2JlcnRzYXZpYW4vU2l0ZXMvU3RydWN0dXJlSlMvZXhhbXBsZXMvTW92aWVDb2xsZWN0aW9uL3NyYy9hc3NldHMvdmVuZG9yL3N0cnVjdHVyZWpzL2pzL0Jhc2VPYmplY3QuanMiLCIvVXNlcnMvcm9iZXJ0c2F2aWFuL1NpdGVzL1N0cnVjdHVyZUpTL2V4YW1wbGVzL01vdmllQ29sbGVjdGlvbi9zcmMvYXNzZXRzL3ZlbmRvci9zdHJ1Y3R1cmVqcy9qcy9PYmplY3RNYW5hZ2VyLmpzIiwic3JjL2Fzc2V0cy92ZW5kb3Ivc3RydWN0dXJlanMvanMvZGlzcGxheS9ET01FbGVtZW50LmpzIiwiL1VzZXJzL3JvYmVydHNhdmlhbi9TaXRlcy9TdHJ1Y3R1cmVKUy9leGFtcGxlcy9Nb3ZpZUNvbGxlY3Rpb24vc3JjL2Fzc2V0cy92ZW5kb3Ivc3RydWN0dXJlanMvanMvZGlzcGxheS9EaXNwbGF5T2JqZWN0LmpzIiwiL1VzZXJzL3JvYmVydHNhdmlhbi9TaXRlcy9TdHJ1Y3R1cmVKUy9leGFtcGxlcy9Nb3ZpZUNvbGxlY3Rpb24vc3JjL2Fzc2V0cy92ZW5kb3Ivc3RydWN0dXJlanMvanMvZGlzcGxheS9EaXNwbGF5T2JqZWN0Q29udGFpbmVyLmpzIiwic3JjL2Fzc2V0cy92ZW5kb3Ivc3RydWN0dXJlanMvanMvZGlzcGxheS9TdGFnZS5qcyIsIi9Vc2Vycy9yb2JlcnRzYXZpYW4vU2l0ZXMvU3RydWN0dXJlSlMvZXhhbXBsZXMvTW92aWVDb2xsZWN0aW9uL3NyYy9hc3NldHMvdmVuZG9yL3N0cnVjdHVyZWpzL2pzL2V2ZW50L0Jhc2VFdmVudC5qcyIsInNyYy9hc3NldHMvdmVuZG9yL3N0cnVjdHVyZWpzL2pzL2V2ZW50L0V2ZW50RGlzcGF0Y2hlci5qcyIsInNyYy9hc3NldHMvdmVuZG9yL3N0cnVjdHVyZWpzL2pzL21vZGVsL0Jhc2VNb2RlbC5qcyIsInNyYy9hc3NldHMvdmVuZG9yL3N0cnVjdHVyZWpzL2pzL21vZGVsL0NvbGxlY3Rpb24uanMiLCIvVXNlcnMvcm9iZXJ0c2F2aWFuL1NpdGVzL1N0cnVjdHVyZUpTL2V4YW1wbGVzL01vdmllQ29sbGVjdGlvbi9zcmMvYXNzZXRzL3ZlbmRvci9zdHJ1Y3R1cmVqcy9qcy9wbHVnaW4vanF1ZXJ5LmV2ZW50TGlzdGVuZXIuanMiLCIvVXNlcnMvcm9iZXJ0c2F2aWFuL1NpdGVzL1N0cnVjdHVyZUpTL2V4YW1wbGVzL01vdmllQ29sbGVjdGlvbi9zcmMvYXNzZXRzL3ZlbmRvci9zdHJ1Y3R1cmVqcy9qcy91dGlsL0NvbXBvbmVudEZhY3RvcnkuanMiLCJzcmMvYXNzZXRzL3ZlbmRvci9zdHJ1Y3R1cmVqcy9qcy91dGlsL051bWJlclV0aWwuanMiLCIvVXNlcnMvcm9iZXJ0c2F2aWFuL1NpdGVzL1N0cnVjdHVyZUpTL2V4YW1wbGVzL01vdmllQ29sbGVjdGlvbi9zcmMvYXNzZXRzL3ZlbmRvci9zdHJ1Y3R1cmVqcy9qcy91dGlsL1N0cmluZ1V0aWwuanMiLCJzcmMvYXNzZXRzL3ZlbmRvci9zdHJ1Y3R1cmVqcy9qcy91dGlsL1RlbXBsYXRlRmFjdG9yeS5qcyIsIi9Vc2Vycy9yb2JlcnRzYXZpYW4vU2l0ZXMvU3RydWN0dXJlSlMvZXhhbXBsZXMvTW92aWVDb2xsZWN0aW9uL3NyYy9hc3NldHMvdmVuZG9yL3N0cnVjdHVyZWpzL2pzL3V0aWwvVXRpbC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7dUNDQWtCLDJCQUEyQjs7OztvQ0FFakIseUJBQXlCOzs7OzZCQUNoQyxrQkFBa0I7Ozs7cUNBQ2hCLDJCQUEyQjs7OztzQ0FDdkIsMkJBQTJCOzs7OzBDQUMxQiwrQkFBK0I7Ozs7Z0NBQ3BDLHFCQUFxQjs7Ozs7Ozs7Ozs7O0lBU3RDLEdBQUc7Y0FBSCxH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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDbkhBLElBQUksU0FBUyxHQUFHLEFBQUMsYUFBUSxVQUFLLFNBQVMsSUFBSyxVQUFVLENBQUMsRUFBRSxDQUFDLEVBQUU7QUFDeEQsT0FBSyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDdEQsV0FBUyxFQUFFLEdBQUc7QUFBRSxRQUFJLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQztHQUFFO0FBQ3ZDLEdBQUMsQ0FBQyxTQUFTLEdBQUcsQ0FBQyxLQUFLLElBQUksR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDLFNBQVMsRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFBLEFBQUMsQ0FBQztDQUN4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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqU0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hPQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQzdoQkEsQ0FBQyxVQUFVLE9BQU8sRUFBRTtBQUNoQixRQUFJLE9BQU8sTUFBTSxLQUFLLFFBQVEsSUFBSSxPQUFPLE1BQU0sQ0FBQyxPQUFPLEtBQUssUUFBUSxFQUFFO0FBQ2xFLFlBQUksQ0FBQyxHQUFHLE9BQU8sQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUMsQUFBQyxJQUFJLENBQUMsS0FBSyxTQUFTLEVBQUUsTUFBTSxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUM7S0FDOUUsTUFDSSxJQUFJLE9BQU8sTUFBTSxLQUFLLFVBQVUsSUFBSSxNQUFNLENBQUMsR0FBRyxFQUFFO0FBQ2pELGNBQU0sQ0FBQyxDQUFDLFNBQVMsRUFB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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDdFNBLENBQUMsVUFBVSxPQUFPLEVBQUU7QUFDaEIsUUFBSSxPQUFPLE1BQU0sS0FBSyxRQUFRLElBQUksT0FBTyxNQUFNLENBQUMsT0FBTyxLQUFLLFFBQVEsRUFBRTtBQUNs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QUFPLFdBQVEsR0FBRyxVQUFVLENBQUM7Q0FDaEMsQ0FBQyxDQUFDOzs7QUMvUkg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDMUhBLENBQUMsVUFBVSxPQUFPLEVBQUU7QUFDaEIsUUFBSSxPQUFPLE1BQU0sS0FBSyxRQUFRLElBQUksT0FBTyxNQUFNLENBQUMsT0FBTyxLQUFLLFFBQVEsRUFBRTtBQUNsRSxZQUFJLENBQUMsR0FBRyxPQUFPLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDLEFBQUMsSUFBSSxDQUFDLEtBQUssU0FBUyxFQUFFLE1BQU0sQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDO0tBQzlFLE1BQ0ksSUFBSSxPQUFPLE1BQU0s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QUU7QUFDMUIsZ0JBQUksVUFBVSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxhQUFhLEVBQUUsWUFBWSxFQUFFO0FBQ2hFLG9CQUFJLGFBQWEsQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7QUFDNUMsaUNBQWEsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7aUJBQ3BDO0FBQ0QsdUJBQU8sYUFBYSxDQUFDO2FBQ3hCLEVBQUUsRUFBRSxDQUFDLENBQUM7QUFDUCxtQkFBTyxVQUFVLENBQUM7U0FDckIsQ0FBQzs7Ozs7Ozs7O0FBU0YsWUFBSSxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUM7QUFDcEIsZUFBTyxJQUFJLENBQUM7S0FDZixDQUFBLEVBQUcsQ0FBQztBQUNMLFVBQU0sQ0FBQyxjQUFjLENBQUMsT0FBTyxFQUFFLFlBQVksRUFBRSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO0FBQzlELFdBQU8sV0FBUSxHQUFHLElBQUksQ0FBQztDQUMxQixDQUFDLENBQUMiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiaW1wb3J0IFN0YWdlIGZyb20gJ3N0cnVjdHVyZWpzL2Rpc3BsYXkvU3RhZ2UnO1xuXG5pbXBvcnQgUGFnZUNvbnRyb2xWaWV3IGZyb20gJy4vdmlld3MvUGFnZUNvbnRyb2xWaWV3JztcbmltcG9ydCBMaXN0VmlldyBmcm9tICcuL3ZpZXdzL0xpc3RWaWV3JztcbmltcG9ydCBFcnJvck1vZGFsIGZyb20gJy4vdmlld3MvbW9kYWxzL0Vycm9yTW9kYWwnO1xuaW1wb3J0IFJlcXVlc3RTZXJ2aWNlIGZyb20gJy4vc2VydmljZXMvUmVxdWVzdFNlcnZpY2UnO1xuaW1wb3J0IE1vdmllQ29sbGVjdGlvbiBmcm9tICcuL2NvbGxlY3Rpb25zL01vdmllQ29sbGVjdGlvbic7XG5pbXBvcnQgTW92aWVNb2RlbCBmcm9tICcuL21vZGVscy9Nb3ZpZU1vZGVsJztcblxuLyoqXG4gKiBUT0RPOiBZVUlEb2NfY29tbWVudFxuICpcbiAqIEBjbGFzcyBBcHBcbiAqIEBleHRlbmRzIFN0YWdlXG4gKiBAY29uc3RydWN0b3JcbiAqKi9cbmNsYXNzIEFwcCBleHRlbmRzIFN0YWdlIHtcblxuICAgIC8qKlxuICAgICAqIEBwcm9wZXJ0eSBfcGFnZUNvbnRyb2xzXG4gICAgICogQHR5cGUge1BhZ2VDb250cm9sVmlld31cbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIF9wYWdlQ29udHJvbHMgPSBudWxsO1xuXG4gICAgLyoqXG4gICAgICogQHByb3BlcnR5IF9tb3ZpZUNvbGxlY3Rpb25cbiAgICAgKiBAdHlwZSB7TW92aWVDb2xsZWN0aW9ufVxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgX21vdmllQ29sbGVjdGlvbiA9IG51bGw7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAb3ZlcnJpZGRlbiBET01FbGVtZW50LmNyZWF0ZVxuICAgICAqL1xuICAgIGNyZWF0ZSgpIHtcbiAgICAgICAgc3VwZXIuY3JlYXRlKCk7XG5cbiAgICAgICAgdGhpcy5fcGFnZUNvbnRyb2xzID0gbmV3IFBhZ2VDb250cm9sVmlldyh0aGlzLiRlbGVtZW50LmZpbmQoJy5qcy1wYWdlQ29udHJvbFZpZXcnKSk7XG4gICAgICAgIHRoaXMuYWRkQ2hpbGQodGhpcy5fcGFnZUNvbnRyb2xzKTtcbiAgICAgICAgdGhpcy5fcGFnZUNvbnRyb2xzLmRpc2FibGUoKTsvLyBEaXNhYmxlIHJpZ2h0IGF3YXkgYmVjYXVzZSBieSBkZWZhdWx0IHRoZSB2aWV3IGlzIGVuYWJsZWQgb25jZSBwYXNzZWQgdG8gdGhlIGFkZENoaWxkIG1ldGhvZC5cblxuICAgICAgICB0aGlzLl9saXN0Q29udGFpbmVyID0gbmV3IExpc3RWaWV3KHRoaXMuJGVsZW1lbnQuZmluZCgnLmpzLWxpc3RWaWV3JykpO1xuICAgICAgICB0aGlzLmFkZENoaWxkKHRoaXMuX2xpc3RDb250YWluZXIpO1xuXG4gICAgICAgIC8vbGV0IG1vZGFsID0gbmV3IEVycm9yTW9kYWwoKTtcbiAgICAgICAgLy90aGlzLmFkZENoaWxkQXQobW9kYWwsIDApO1xuXG4gICAgICAgIFJlcXVlc3RTZXJ2aWNlLmdldCgnYXNzZXRzL2RhdGEvbW92aWVzLmpzb24nKVxuICAgICAgICAgICAgLmRvbmUoKGRhdGEpID0+IHRoaXMuX29uTW92aWVSZXF1ZXN0Q29tcGxldGUoZGF0YSkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBvdmVycmlkZGVuIERPTUVsZW1lbnQuZW5hYmxlXG4gICAgICovXG4gICAgZW5hYmxlKCkge1xuICAgICAgICBpZiAodGhpcy5pc0VuYWJsZWQgPT09IHRydWUpIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgdGhpcy5fcGFnZUNvbnRyb2xzLmFkZEV2ZW50TGlzdGVuZXIoJ3VwZGF0ZScsIHRoaXMuX29uVXBkYXRlLCB0aGlzKTtcblxuICAgICAgICByZXR1cm4gc3VwZXIuZW5hYmxlKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQG92ZXJyaWRkZW4gRE9NRWxlbWVudC5kaXNhYmxlXG4gICAgICovXG4gICAgZGlzYWJsZSgpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNFbmFibGVkID09PSBmYWxzZSkgeyByZXR1cm47IH1cblxuICAgICAgICB0aGlzLl9wYWdlQ29udHJvbHMucmVtb3ZlRXZlbnRMaXN0ZW5lcigndXBkYXRlJywgdGhpcy5fb25VcGRhdGUsIHRoaXMpO1xuXG4gICAgICAgIHJldHVybiBzdXBlci5kaXNhYmxlKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQG92ZXJyaWRkZW4gRE9NRWxlbWVudC5sYXlvdXRcbiAgICAgKi9cbiAgICBsYXlvdXQoKSB7XG4gICAgICAgIC8vIExheW91dCBvciB1cGRhdGUgdGhlIG9iamVjdHMgaW4gdGhpcyBwYXJlbnQgY2xhc3MuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQG92ZXJyaWRkZW4gRE9NRWxlbWVudC5kZXN0cm95XG4gICAgICovXG4gICAgZGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy5kaXNhYmxlKCk7XG5cbiAgICAgICAgLy8gQ2FsbCBkZXN0cm95IG9uIGFueSBjaGlsZCBvYmplY3RzLlxuICAgICAgICAvLyBUaGlzIHN1cGVyIG1ldGhvZCB3aWxsIGFsc28gbnVsbCBvdXQgeW91ciBwcm9wZXJ0aWVzIGZvciBnYXJiYWdlIGNvbGxlY3Rpb24uXG5cbiAgICAgICAgc3VwZXIuZGVzdHJveSgpO1xuICAgIH1cblxuICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbiAgICAvLyBIRUxQRVIgTUVUSE9EXG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG4gICAgLyoqXG4gICAgICogVE9ETzogWVVJRG9jX2NvbW1lbnRcbiAgICAgKlxuICAgICAqIEBtZXRob2QgX3VwZGF0ZUxpc3RcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIF91cGRhdGVMaXN0KCkge1xuICAgICAgICBsZXQgc29ydFR5cGUgPSB0aGlzLl9wYWdlQ29udHJvbHMuc29ydFR5cGU7XG4gICAgICAgIGxldCBkaXNwbGF5TGltaXQgPSB0aGlzLl9wYWdlQ29udHJvbHMuZGlzcGxheUxpbWl0O1xuXG4gICAgICAgIGxldCBpc0FzY2VuZGluZyA9IChzb3J0VHlwZS5pbmRleE9mKCctYXNjJykgPiAtMSkgPyB0cnVlIDogZmFsc2U7XG5cbiAgICAgICAgbGV0IG1vZGVscztcbiAgICAgICAgc3dpdGNoIChzb3J0VHlwZSkge1xuICAgICAgICAgICAgY2FzZSAnY3JpdGljLWRlc2MnOlxuICAgICAgICAgICAgY2FzZSAnY3JpdGljLWFzYyc6XG4gICAgICAgICAgICAgICAgbW9kZWxzID0gdGhpcy5fbW92aWVDb2xsZWN0aW9uLnNvcnRCeUNyaXRpY3NTY29yZShpc0FzY2VuZGluZyk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdhdWRpZW5jZS1kZXNjJzpcbiAgICAgICAgICAgIGNhc2UgJ2F1ZGllbmNlLWFzYyc6XG4gICAgICAgICAgICAgICAgbW9kZWxzID0gdGhpcy5fbW92aWVDb2xsZWN0aW9uLnNvcnRCeUF1ZGllbmNlU2NvcmUoaXNBc2NlbmRpbmcpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAndGhlYXRlci1hc2MnOlxuICAgICAgICAgICAgY2FzZSAndGhlYXRlci1kZXNjJzpcbiAgICAgICAgICAgICAgICBtb2RlbHMgPSB0aGlzLl9tb3ZpZUNvbGxlY3Rpb24uc29ydEJ5VGhlYXRlclJlbGVhc2VEYXRlKGlzQXNjZW5kaW5nKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgbW9kZWxzID0gdGhpcy5fbW92aWVDb2xsZWN0aW9uLm1vZGVscztcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFNsaWNlIG9mIHRoZSBmaXJzdCBzZXQgb2YgbW9kZWxzLlxuICAgICAgICBtb2RlbHMgPSBtb2RlbHMuc2xpY2UoMCwgZGlzcGxheUxpbWl0KTtcblxuICAgICAgICB0aGlzLl9saXN0Q29udGFpbmVyLnVwZGF0ZUxpc3QobW9kZWxzKTtcbiAgICB9XG5cbiAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4gICAgLy8gRVZFTlQgSEFORExFUlNcbiAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cbiAgICAvKipcbiAgICAgKiBUT0RPOiBZVUlEb2NfY29tbWVudFxuICAgICAqXG4gICAgICogQG1ldGhvZCBfb25Nb3ZpZVJlcXVlc3RDb21wbGV0ZVxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgX29uTW92aWVSZXF1ZXN0Q29tcGxldGUoZGF0YSkge1xuICAgICAgICB0aGlzLl9tb3ZpZUNvbGxlY3Rpb24gPSBuZXcgTW92aWVDb2xsZWN0aW9uKE1vdmllTW9kZWwpO1xuICAgICAgICB0aGlzLl9tb3ZpZUNvbGxlY3Rpb24uYWRkKGRhdGEubW92aWVzKTtcblxuICAgICAgICB0aGlzLl91cGRhdGVMaXN0KCk7XG5cbiAgICAgICAgdGhpcy5fcGFnZUNvbnRyb2xzLmVuYWJsZSgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRPRE86IFlVSURvY19jb21tZW50XG4gICAgICpcbiAgICAgKiBAbWV0aG9kIF9vblVwZGF0ZVxuICAgICAqIEBwYXJhbSBldmVudCB7QmFzZUV2ZW50fVxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgX29uVXBkYXRlKGV2ZW50KSB7XG4gICAgICAgIHRoaXMuX3VwZGF0ZUxpc3QoKTtcbiAgICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgQXBwO1xuIiwiaW1wb3J0IENvbGxlY3Rpb24gZnJvbSAnc3RydWN0dXJlanMvbW9kZWwvQ29sbGVjdGlvbic7XG5cbi8qKlxuICogVE9ETzogWVVJRG9jX2NvbW1lbnRcbiAqXG4gKiBAY2xhc3MgTW92aWVDb2xsZWN0aW9uXG4gKiBAZXh0ZW5kcyBDb2xsZWN0aW9uXG4gKiBAY29uc3RydWN0b3JcbiAqKi9cbmNsYXNzIE1vdmllQ29sbGVjdGlvbiBleHRlbmRzIENvbGxlY3Rpb24ge1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVE9ETzogWVVJRG9jX2NvbW1lbnRcbiAgICAgKlxuICAgICAqIEBtZXRob2Qgc29ydEJ5Q3JpdGljc1Njb3JlXG4gICAgICogQHBhcmFtIFtzb3J0QXNjZW5kaW5nPXRydWVdIHtib29sZWFufVxuICAgICAqIEBwdWJsaWNcbiAgICAgKi9cbiAgICBzb3J0QnlDcml0aWNzU2NvcmUoc29ydEFzY2VuZGluZyA9IHRydWUpIHtcbiAgICAgICAgbGV0IG1vZGVscyA9IHRoaXMuZ2V0TW92aWVzV2l0aFZhbGlkU2NvcmVzKCk7XG5cbiAgICAgICAgbW9kZWxzID0gbW9kZWxzLnNvcnQoZnVuY3Rpb24oYSwgYikge1xuICAgICAgICAgICAgcmV0dXJuIGIucmF0aW5ncy5jcml0aWNzU2NvcmUgLSBhLnJhdGluZ3MuY3JpdGljc1Njb3JlO1xuICAgICAgICB9KTtcblxuICAgICAgICBpZiAoc29ydEFzY2VuZGluZyA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIG1vZGVscy5yZXZlcnNlKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG1vZGVscztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUT0RPOiBZVUlEb2NfY29tbWVudFxuICAgICAqXG4gICAgICogQG1ldGhvZCBzb3J0QnlBdWRpZW5jZVNjb3JlXG4gICAgICogQHBhcmFtIFtzb3J0QXNjZW5kaW5nPXRydWVdIHtib29sZWFufVxuICAgICAqIEBwdWJsaWNcbiAgICAgKi9cbiAgICBzb3J0QnlBdWRpZW5jZVNjb3JlKHNvcnRBc2NlbmRpbmcgPSB0cnVlKSB7XG4gICAgICAgIGxldCBtb2RlbHMgPSB0aGlzLmdldE1vdmllc1dpdGhWYWxpZFNjb3JlcygpO1xuXG4gICAgICAgIG1vZGVscyA9IG1vZGVscy5zb3J0KGZ1bmN0aW9uKGEsIGIpIHtcbiAgICAgICAgICAgIHJldHVybiBiLnJhdGluZ3MuYXVkaWVuY2VTY29yZSAtIGEucmF0aW5ncy5hdWRpZW5jZVNjb3JlO1xuICAgICAgICB9KTtcblxuICAgICAgICBpZiAoc29ydEFzY2VuZGluZyA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIG1vZGVscy5yZXZlcnNlKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG1vZGVscztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUT0RPOiBZVUlEb2NfY29tbWVudFxuICAgICAqXG4gICAgICogQG1ldGhvZCBzb3J0QnlUaGVhdGVyUmVsZWFzZURhdGVcbiAgICAgKiBAcGFyYW0gW3NvcnRBc2NlbmRpbmc9dHJ1ZV0ge2Jvb2xlYW59XG4gICAgICogQHB1YmxpY1xuICAgICAqL1xuICAgIHNvcnRCeVRoZWF0ZXJSZWxlYXNlRGF0ZShzb3J0QXNjZW5kaW5nID0gdHJ1ZSkge1xuICAgICAgICBsZXQgbW9kZWxzID0gdGhpcy5nZXRNb3ZpZXNXaXRoVmFsaWRTY29yZXMoKTtcblxuICAgICAgICBtb2RlbHMgPSBtb2RlbHMuc29ydChmdW5jdGlvbihhLCBiKXtcbiAgICAgICAgICAgIC8vIFN1YnRyYWN0IHRoZSBkYXRlcyB0byBnZXQgYSB2YWx1ZSB0aGF0IGlzIGVpdGhlciBuZWdhdGl2ZSwgcG9zaXRpdmUsIG9yIHplcm8uXG4gICAgICAgICAgICByZXR1cm4gbmV3IERhdGUoYi5yZWxlYXNlRGF0ZXMudGhlYXRlcikgLSBuZXcgRGF0ZShhLnJlbGVhc2VEYXRlcy50aGVhdGVyKVxuICAgICAgICB9KTtcblxuICAgICAgICBpZiAoc29ydEFzY2VuZGluZyA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIG1vZGVscy5yZXZlcnNlKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG1vZGVscztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUT0RPOiBZVUlEb2NfY29tbWVudFxuICAgICAqXG4gICAgICogQG1ldGhvZCBnZXRNb3ZpZXNXaXRoVmFsaWRTY29yZXNcbiAgICAgKiBAcHVibGljXG4gICAgICovXG4gICAgZ2V0TW92aWVzV2l0aFZhbGlkU2NvcmVzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5maWx0ZXIodGhpcy5fcmVtb3ZlTW92aWVzV2l0aE5vU2NvcmUpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRPRE86IFlVSURvY19jb21tZW50XG4gICAgICpcbiAgICAgKiBAbWV0aG9kIF9yZW1vdmVNb3ZpZXNXaXRoTm9TY29yZVxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgX3JlbW92ZU1vdmllc1dpdGhOb1Njb3JlKG1vdmllTW9kZWwpIHtcbiAgICAgICAgcmV0dXJuIG1vdmllTW9kZWwucmF0aW5ncy5jcml0aWNzU2NvcmUgPiAwICYmIG1vdmllTW9kZWwucmF0aW5ncy5hdWRpZW5jZVNjb3JlID4gMDtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IE1vdmllQ29sbGVjdGlvbjtcbiIsImltcG9ydCBIYW5kbGViYXJzSGVscGVycyBmcm9tICcuL3V0aWxzL0hhbmRsZWJhcnNIZWxwZXJzJztcbmltcG9ydCBBcHAgZnJvbSAnLi9BcHAnO1xuXG5sZXQgYXBwID0gbmV3IEFwcCgpO1xuYXBwLmFwcGVuZFRvKCdib2R5Jyk7ICAgLy8gTmVlZCB0byBzcGVjaWZ5IHdoYXQgYXJlYSBvdXIgY29kZSBoYXMgY29udHJvbCBvdmVyLlxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gVGhlIEFwcC5qcyBjbGFzcyBleHRlbmRzIFN0YWdlIHdoaWNoIGhhcyB0aGUgYXBwZW5kVG8gbWV0aG9kLlxuXG4iLCJpbXBvcnQgQmFzZU1vZGVsIGZyb20gJ3N0cnVjdHVyZWpzL21vZGVsL0Jhc2VNb2RlbCc7XG5cbi8qKlxuICogVE9ETzogWVVJRG9jX2NvbW1lbnRcbiAqXG4gKiBAY2xhc3MgTW92aWVNb2RlbFxuICogQGV4dGVuZHMgQmFzZU1vZGVsXG4gKiBAY29uc3RydWN0b3JcbiAqKi9cbmNsYXNzIE1vdmllTW9kZWwgZXh0ZW5kcyBCYXNlTW9kZWwge1xuXG4gICAgaWQgPSBudWxsO1xuICAgIHRpdGxlID0gbnVsbDtcbiAgICB5ZWFyID0gbnVsbDtcbiAgICBtcGFhUmF0aW5nID0gbnVsbDtcbiAgICBydW50aW1lID0gbnVsbDtcbiAgICByYXRpbmdzID0gUmF0aW5nc01vZGVsO1xuICAgIHN5bm9wc2lzID0gbnVsbDtcbiAgICBwb3N0ZXJzID0gUG9zdGVyTW9kZWw7XG4gICAgcmVsZWFzZURhdGVzID0gUmVsZWFzZURhdGVNb2RlbDtcbiAgICBhYnJpZGdlZENhc3QgPSBbQ2FzdE1vZGVsXTtcblxuICAgIGNvbnN0cnVjdG9yKGRhdGEpIHtcbiAgICAgICAgc3VwZXIoKTtcblxuICAgICAgICBpZiAoZGF0YSkge1xuICAgICAgICAgICAgdGhpcy51cGRhdGUoZGF0YSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAb3ZlcnJpZGRlbiBCYXNlTW9kZWwudXBkYXRlXG4gICAgICovXG4gICAgdXBkYXRlKGRhdGEpIHtcbiAgICAgICAgc3VwZXIudXBkYXRlKGRhdGEpO1xuXG4gICAgICAgIHRoaXMucnVudGltZSA9IHBhcnNlSW50KGRhdGEucnVudGltZSk7XG4gICAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IE1vdmllTW9kZWw7XG4iLCJpbXBvcnQgRXZlbnREaXNwYXRjaGVyIGZyb20gJ3N0cnVjdHVyZWpzL2V2ZW50L0V2ZW50RGlzcGF0Y2hlcic7XG5cbi8qKlxuICogQSBTaW5nbGV0b24gQ2xhc3MgdGhhdCBoYW5kbGVzIGFsbCBhamF4IHJlcXVlc3RzLlxuICpcbiAqIEBjbGFzcyBSZXF1ZXN0U2VydmljZVxuICogQGV4dGVuZHMgRXZlbnRCcm9rZXJcbiAqIEBjb25zdHJ1Y3RvclxuICoqL1xuY2xhc3MgUmVxdWVzdFNlcnZpY2UgZXh0ZW5kcyBFdmVudERpc3BhdGNoZXIge1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2VuZCBkYXRhIHRvIGFuIGVuZHBvaW50XG4gICAgICpcbiAgICAgKiBAbWV0aG9kIHNlbmRcbiAgICAgKiBAcGFyYW0gZW5kUG9pbnQge3N0cmluZ31cbiAgICAgKiBAcGFyYW0gcmVxdWVzdFR5cGUge3N0cmluZ30gVGhlIHR5cGUgb2YgdGhlIHJlcXVlc3Q6IEdFVCwgUE9TVCwgUFVULCBERUxFVEUsIGV0Yy5cbiAgICAgKiBAcGFyYW0gW2RhdGE9bnVsbF1cbiAgICAgKiBAcmV0dXJuIHtKUXVlcnlYSFJ9XG4gICAgICogQHB1YmxpY1xuICAgICAqL1xuICAgIHNlbmQoZW5kUG9pbnQsIHJlcXVlc3RUeXBlLCBkYXRhID0gbnVsbCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fY3JlYXRlQWpheFJlcXVlc3Qoe1xuICAgICAgICAgICAgdHlwZTogcmVxdWVzdFR5cGUsXG4gICAgICAgICAgICB1cmw6IGVuZFBvaW50LFxuICAgICAgICAgICAgZGF0YTogZGF0YVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIGRhdGEgZnJvbSBhbiBlbmRwb2ludFxuICAgICAqXG4gICAgICogQG1ldGhvZCBnZXRcbiAgICAgKiBAcGFyYW0gZW5kUG9pbnQge3N0cmluZ31cbiAgICAgKiBAcGFyYW0gW2RhdGE9bnVsbF1cbiAgICAgKiBAcmV0dXJuIHtKUXVlcnlYSFJ9XG4gICAgICogQHB1YmxpY1xuICAgICAqL1xuICAgIGdldChlbmRQb2ludCwgZGF0YSA9IG51bGwsIHR5cGUgPSBudWxsKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jcmVhdGVBamF4UmVxdWVzdCh7XG4gICAgICAgICAgICB0eXBlOiAnR0VUJyxcbiAgICAgICAgICAgIHVybDogZW5kUG9pbnQsXG4gICAgICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxuICAgICAgICAgICAgZGF0YTogZGF0YVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBQb3N0IGRhdGEgdG8gYW4gZW5kcG9pbnRcbiAgICAgKlxuICAgICAqIEBtZXRob2QgcG9zdFxuICAgICAqIEBwYXJhbSBlbmRQb2ludCB7c3RyaW5nfVxuICAgICAqIEBwYXJhbSBbZGF0YT1udWxsXVxuICAgICAqIEByZXR1cm4ge0pRdWVyeVhIUn1cbiAgICAgKiBAcHVibGljXG4gICAgICovXG4gICAgcG9zdChlbmRQb2ludCwgZGF0YSA9IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NyZWF0ZUFqYXhSZXF1ZXN0KHtcbiAgICAgICAgICAgIHR5cGU6ICdQT1NUJyxcbiAgICAgICAgICAgIHVybDogZW5kUG9pbnQsXG4gICAgICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxuICAgICAgICAgICAgY29udGVudFR5cGU6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KGRhdGEpXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFVwZGF0ZSB0aGUgZGF0YSB0byBhbiBlbmRwb2ludFxuICAgICAqXG4gICAgICogQG1ldGhvZCBwdXRcbiAgICAgKiBAcGFyYW0gZW5kUG9pbnQge3N0cmluZ31cbiAgICAgKiBAcGFyYW0gW2RhdGE9bnVsbF1cbiAgICAgKiBAcmV0dXJuIHtKUXVlcnlYSFJ9XG4gICAgICogQHB1YmxpY1xuICAgICAqL1xuICAgIHB1dChlbmRQb2ludCwgZGF0YSA9IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NyZWF0ZUFqYXhSZXF1ZXN0KHtcbiAgICAgICAgICAgIHR5cGU6ICdQVVQnLFxuICAgICAgICAgICAgdXJsOiBlbmRQb2ludCxcbiAgICAgICAgICAgIGRhdGE6IGRhdGFcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRGVsZXRlIGRhdGEgb24gYW4gZW5kcG9pbnRcbiAgICAgKlxuICAgICAqIEBtZXRob2QgZGVsZXRlXG4gICAgICogQHBhcmFtIGVuZFBvaW50IHtzdHJpbmd9XG4gICAgICogQHBhcmFtIFtkYXRhPW51bGxdXG4gICAgICogQHJldHVybiB7SlF1ZXJ5WEhSfVxuICAgICAqIEBwdWJsaWNcbiAgICAgKi9cbiAgICBkZWxldGUoZW5kUG9pbnQsIGRhdGEgPSBudWxsKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jcmVhdGVBamF4UmVxdWVzdCh7XG4gICAgICAgICAgICB0eXBlOiAnREVMRVRFJyxcbiAgICAgICAgICAgIHVybDogZW5kUG9pbnQsXG4gICAgICAgICAgICBkYXRhOiBkYXRhXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFBvc3QgZm9ybSBkYXRhIHRvIGFuIGVuZHBvaW50XG4gICAgICpcbiAgICAgKiBAbWV0aG9kIHBvc3RGb3JtRGF0YVxuICAgICAqIEBwYXJhbSBlbmRQb2ludCB7c3RyaW5nfVxuICAgICAqIEBwYXJhbSBmb3JtRGF0YSB7Rm9ybURhdGF9IGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9Gb3JtRGF0YVxuICAgICAqIEByZXR1cm4ge0pRdWVyeVhIUn1cbiAgICAgKiBAcHVibGljXG4gICAgICovXG4gICAgcG9zdEZvcm1EYXRhKGVuZFBvaW50LCBmb3JtRGF0YSkge1xuICAgICAgICByZXR1cm4gdGhpcy5fY3JlYXRlQWpheFJlcXVlc3Qoe1xuICAgICAgICAgICAgdHlwZTogJ1BPU1QnLFxuICAgICAgICAgICAgdXJsOiBlbmRQb2ludCxcbiAgICAgICAgICAgIGRhdGE6IGZvcm1EYXRhLFxuICAgICAgICAgICAgY29udGVudFR5cGU6IGZhbHNlLFxuICAgICAgICAgICAgcHJvY2Vzc0RhdGE6IGZhbHNlXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFB1dCBmb3JtIGRhdGEgdG8gYW4gZW5kcG9pbnRcbiAgICAgKlxuICAgICAqIEBtZXRob2QgcHV0Rm9ybURhdGFcbiAgICAgKiBAcGFyYW0gZW5kUG9pbnQge3N0cmluZ31cbiAgICAgKiBAcGFyYW0gZm9ybURhdGEge0Zvcm1EYXRhfSBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvRm9ybURhdGFcbiAgICAgKiBAcmV0dXJuIHtKUXVlcnlYSFJ9XG4gICAgICogQHB1YmxpY1xuICAgICAqL1xuICAgIHB1dEZvcm1EYXRhKGVuZFBvaW50LCBmb3JtRGF0YSkge1xuICAgICAgICByZXR1cm4gdGhpcy5fY3JlYXRlQWpheFJlcXVlc3Qoe1xuICAgICAgICAgICAgdHlwZTogJ1BVVCcsXG4gICAgICAgICAgICB1cmw6IGVuZFBvaW50LFxuICAgICAgICAgICAgZGF0YTogZm9ybURhdGEsXG4gICAgICAgICAgICBjb250ZW50VHlwZTogZmFsc2UsXG4gICAgICAgICAgICBwcm9jZXNzRGF0YTogZmFsc2VcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIGpRdWVyeSB4aHIgd2l0aCBhIHBhcmFtZXRlciBvYmplY3RcbiAgICAgKlxuICAgICAqIEBtZXRob2QgX2NyZWF0ZUFqYXhSZXF1ZXN0XG4gICAgICogQHBhcmFtIG9iaiB7T2JqZWN0fSB0aGUgb3B0aW9ucyBmb3IgdGhlIGpRdWVyeSBhamF4IHJlcXVlc3QuXG4gICAgICogQHJldHVybiB7alF1ZXJ5WEhSfVxuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICBfY3JlYXRlQWpheFJlcXVlc3Qob2JqKSB7XG4gICAgICAgIC8vIEFzc2lnbiB0aGUgdXJsIHNvIHdlIGNhbiBnZXQgaWYgdGhlIHJlcXVlc3QgZmFpbHMuXG4gICAgICAgIG9iai5iZWZvcmVTZW5kID0gZnVuY3Rpb24oanFYSFIsIHNldHRpbmdzKSB7XG4gICAgICAgICAgICBqcVhIUi51cmwgPSBzZXR0aW5ncy51cmw7XG4gICAgICAgIH07XG5cbiAgICAgICAgb2JqLnhociA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGxldCB4aHIgPSAkLmFqYXhTZXR0aW5ncy54aHIoKTtcbiAgICAgICAgICAgIC8vIGhhbmRsZSB1cGxvYWQgcHJvZ3Jlc3MgZXZlbnRzXG4gICAgICAgICAgICB4aHIudXBsb2FkLmFkZEV2ZW50TGlzdGVuZXIoJ3Byb2dyZXNzJywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICAgICAgICBpZiAoZXZlbnQubGVuZ3RoQ29tcHV0YWJsZSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBwZXJjZW50ID0gKGV2ZW50LmxvYWRlZCAvIGV2ZW50LnRvdGFsKSAqIDEwMDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KCdwcm9ncmVzcycsIHBlcmNlbnQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0uYmluZCh0aGlzKSwgZmFsc2UpO1xuXG4gICAgICAgICAgICByZXR1cm4geGhyO1xuICAgICAgICB9LmJpbmQodGhpcyk7XG5cbiAgICAgICAgY29uc3QgcmVxdWVzdCA9ICQuYWpheChvYmopO1xuXG4gICAgICAgIC8vIEdsb2JhbCBzdWNjZXNzZXM6XG4gICAgICAgIHJlcXVlc3QuZG9uZSgoZGF0YSwgdGV4dFN0YXR1cywganFYSFIpID0+IHtcbiAgICAgICAgICAgIC8vY29uc29sZS5pbmZvKGRhdGEpO1xuICAgICAgICB9KTtcblxuICAgICAgICAvLyBHbG9iYWwgZmFpbHM6XG4gICAgICAgIHJlcXVlc3QuZmFpbCgoanFYSFIsIHRleHRTdGF0dXMsIGVycm9yVGhyb3duKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oJ2ZhaWwganFYSFI6ICcsIGpxWEhSKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHJlcXVlc3Q7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBuZXcgUmVxdWVzdFNlcnZpY2UoKTsgLy8gU2luZ2xldG9uIENsYXNzXG4iLCJpbXBvcnQgTnVtYmVyVXRpbCBmcm9tICdzdHJ1Y3R1cmVqcy91dGlsL051bWJlclV0aWwnO1xuXG4vKipcbiAqIHJlbW92ZVNwYWNlc1xuICovXG5IYW5kbGViYXJzLnJlZ2lzdGVySGVscGVyKCdyZW1vdmVTcGFjZXMnLCBmdW5jdGlvbihyYXRpbmdzKSB7XG4gICAgaWYgKHJhdGluZ3MpIHtcbiAgICAgICAgcmV0dXJuIHJhdGluZ3MucmVwbGFjZSgvXFxzKy9nLCAnJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHJhdGluZ3M7XG4gICAgfVxufSk7XG5cbi8qKlxuICogY29udmVydFRvSEhNTVNTXG4gKi9cbkhhbmRsZWJhcnMucmVnaXN0ZXJIZWxwZXIoJ2NvbnZlcnRUb0hITU1TUycsIGZ1bmN0aW9uKG1pbnV0ZXMpIHtcbiAgICBpZiAobWludXRlcykge1xuICAgICAgICByZXR1cm4gIE51bWJlclV0aWwuY29udmVydFRvSEhNTVNTKG1pbnV0ZXMpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBtaW51dGVzO1xuICAgIH1cbn0pO1xuIiwiaW1wb3J0IERPTUVsZW1lbnQgZnJvbSAnc3RydWN0dXJlanMvZGlzcGxheS9ET01FbGVtZW50JztcbmltcG9ydCBUZW1wbGF0ZUZhY3RvcnkgZnJvbSAnc3RydWN0dXJlanMvdXRpbC9UZW1wbGF0ZUZhY3RvcnknO1xuXG4vKipcbiAqIFRPRE86IFlVSURvY19jb21tZW50XG4gKlxuICogQGNsYXNzIExpc3RWaWV3XG4gKiBAZXh0ZW5kcyBET01FbGVtZW50XG4gKiBAY29uc3RydWN0b3JcbiAqKi9cbmNsYXNzIExpc3RWaWV3IGV4dGVuZHMgRE9NRWxlbWVudCB7XG5cbiAgICBjb25zdHJ1Y3RvcigkZWxlbWVudCkge1xuICAgICAgICBzdXBlcigkZWxlbWVudCk7XG4gICAgfVxuXG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuICAgIC8vIEhFTFBFUiBNRVRIT0RcbiAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cbiAgICAvKipcbiAgICAgKiBUT0RPOiBZVUlEb2NfY29tbWVudFxuICAgICAqXG4gICAgICogQG1ldGhvZCB1cGRhdGVMaXN0XG4gICAgICogQHB1YmxpY1xuICAgICAqL1xuICAgIHVwZGF0ZUxpc3QobW92aWVNb2RlbHMpIHtcbiAgICAgICAgbGV0IHRlbXBsYXRlSHRtbCA9IFRlbXBsYXRlRmFjdG9yeS5jcmVhdGUoJ3RlbXBsYXRlcy9wcmVjb21waWxlL0l0ZW1UZW1wbGF0ZScsIG1vdmllTW9kZWxzKTtcblxuICAgICAgICB0aGlzLiRlbGVtZW50Lmh0bWwodGVtcGxhdGVIdG1sKTtcblxuICAgIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBMaXN0VmlldztcbiIsImltcG9ydCBET01FbGVtZW50IGZyb20gJ3N0cnVjdHVyZWpzL2Rpc3BsYXkvRE9NRWxlbWVudCc7XG5cbi8qKlxuICogVE9ETzogWVVJRG9jX2NvbW1lbnRcbiAqXG4gKiBAY2xhc3MgUGFnZUNvbnRyb2xWaWV3XG4gKiBAZXh0ZW5kcyBET01FbGVtZW50XG4gKiBAY29uc3RydWN0b3JcbiAqKi9cbmNsYXNzIFBhZ2VDb250cm9sVmlldyBleHRlbmRzIERPTUVsZW1lbnQge1xuXG4gICAgLyoqXG4gICAgICogQHByb3BlcnR5IHNvcnRUeXBlXG4gICAgICogQHR5cGUge3N0cmluZ31cbiAgICAgKiBAcHVibGljXG4gICAgICovXG4gICAgc29ydFR5cGUgPSBudWxsO1xuXG4gICAgLyoqXG4gICAgICogQHByb3BlcnR5IGRpc3BsYXlMaW1pdFxuICAgICAqIEB0eXBlIHtpbnR9XG4gICAgICogQHB1YmxpY1xuICAgICAqL1xuICAgIGRpc3BsYXlMaW1pdCA9IG51bGw7XG5cbiAgICAvKipcbiAgICAgKiBAcHJvcGVydHkgXyRsaXN0U29ydFxuICAgICAqIEB0eXBlIHtqUXVlcnl9XG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBfJGxpc3RTb3J0ID0gbnVsbDtcblxuICAgIC8qKlxuICAgICAqIEBwcm9wZXJ0eSBfJGxpc3RMaW1pdFxuICAgICAqIEB0eXBlIHtqUXVlcnl9XG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBfJGxpc3RMaW1pdCA9IG51bGw7XG5cbiAgICAvKipcbiAgICAgKiBAcHJvcGVydHkgXyRsaXN0VXBkYXRlXG4gICAgICogQHR5cGUge2pRdWVyeX1cbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIF8kbGlzdFVwZGF0ZSA9IG51bGw7XG5cbiAgICBjb25zdHJ1Y3RvcigkZWxlbWVudCkge1xuICAgICAgICBzdXBlcigkZWxlbWVudCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQG92ZXJyaWRkZW4gRE9NRWxlbWVudC5jcmVhdGVcbiAgICAgKi9cbiAgICBjcmVhdGUoKSB7XG4gICAgICAgIHN1cGVyLmNyZWF0ZSgpO1xuXG4gICAgICAgIHRoaXMuXyRsaXN0U29ydCA9IHRoaXMuJGVsZW1lbnQuZmluZCgnLmpzLXBhZ2VDb250cm9sVmlldy1saXN0U29ydCcpO1xuICAgICAgICB0aGlzLl8kbGlzdExpbWl0ID0gdGhpcy4kZWxlbWVudC5maW5kKCcuanMtcGFnZUNvbnRyb2xWaWV3LWxpc3RMaW1pdCcpO1xuICAgICAgICB0aGlzLl8kbGlzdFVwZGF0ZSA9IHRoaXMuJGVsZW1lbnQuZmluZCgnLmpzLXBhZ2VDb250cm9sVmlldy1saXN0VXBkYXRlJyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQG92ZXJyaWRkZW4gRE9NRWxlbWVudC5lbmFibGVcbiAgICAgKi9cbiAgICBlbmFibGUoKSB7XG4gICAgICAgIGlmICh0aGlzLmlzRW5hYmxlZCA9PT0gdHJ1ZSkgeyByZXR1cm47IH1cblxuICAgICAgICB0aGlzLl8kbGlzdFNvcnQucHJvcCgnZGlzYWJsZWQnLCBmYWxzZSk7XG4gICAgICAgIHRoaXMuXyRsaXN0TGltaXQucHJvcCgnZGlzYWJsZWQnLCBmYWxzZSk7XG4gICAgICAgIHRoaXMuXyRsaXN0VXBkYXRlLnByb3AoJ2Rpc2FibGVkJywgZmFsc2UpO1xuXG4gICAgICAgIHRoaXMuXyRsaXN0U29ydC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCB0aGlzLl9vblNvcnRDaGFuZ2UsIHRoaXMpO1xuICAgICAgICB0aGlzLl8kbGlzdExpbWl0LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIHRoaXMuX29uTGltaXRDaGFuZ2UsIHRoaXMpO1xuICAgICAgICB0aGlzLl8kbGlzdFVwZGF0ZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuX29uVXBkYXRlQ2xpY2ssIHRoaXMpO1xuXG5cbiAgICAgICAgcmV0dXJuIHN1cGVyLmVuYWJsZSgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBvdmVycmlkZGVuIERPTUVsZW1lbnQuZGlzYWJsZVxuICAgICAqL1xuICAgIGRpc2FibGUoKSB7XG4gICAgICAgIGlmICh0aGlzLmlzRW5hYmxlZCA9PT0gZmFsc2UpIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgdGhpcy5fJGxpc3RTb3J0LnByb3AoJ2Rpc2FibGVkJywgdHJ1ZSk7XG4gICAgICAgIHRoaXMuXyRsaXN0TGltaXQucHJvcCgnZGlzYWJsZWQnLCB0cnVlKTtcbiAgICAgICAgdGhpcy5fJGxpc3RVcGRhdGUucHJvcCgnZGlzYWJsZWQnLCB0cnVlKTtcblxuICAgICAgICB0aGlzLl8kbGlzdFNvcnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgdGhpcy5fb25Tb3J0Q2hhbmdlLCB0aGlzKTtcbiAgICAgICAgdGhpcy5fJGxpc3RMaW1pdC5yZW1vdmVFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCB0aGlzLl9vbkxpbWl0Q2hhbmdlLCB0aGlzKTtcbiAgICAgICAgdGhpcy5fJGxpc3RVcGRhdGUucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLl9vblVwZGF0ZUNsaWNrLCB0aGlzKTtcblxuICAgICAgICByZXR1cm4gc3VwZXIuZGlzYWJsZSgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBvdmVycmlkZGVuIERPTUVsZW1lbnQubGF5b3V0XG4gICAgICovXG4gICAgbGF5b3V0KCkge1xuICAgICAgICB0aGlzLnNvcnRUeXBlID0gdGhpcy5fJGxpc3RTb3J0LnZhbCgpO1xuICAgICAgICB0aGlzLmRpc3BsYXlMaW1pdCA9IHBhcnNlSW50KHRoaXMuXyRsaXN0TGltaXQudmFsKCkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBvdmVycmlkZGVuIERPTUVsZW1lbnQuZGVzdHJveVxuICAgICAqL1xuICAgIGRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMuZGlzYWJsZSgpO1xuXG4gICAgICAgIC8vIENhbGwgZGVzdHJveSBvbiBhbnkgY2hpbGQgb2JqZWN0cy5cbiAgICAgICAgLy8gVGhpcyBzdXBlciBtZXRob2Qgd2lsbCBhbHNvIG51bGwgb3V0IHlvdXIgcHJvcGVydGllcyBmb3IgZ2FyYmFnZSBjb2xsZWN0aW9uLlxuXG4gICAgICAgIHN1cGVyLmRlc3Ryb3koKTtcbiAgICB9XG5cbiAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4gICAgLy8gRVZFTlQgSEFORExFUlNcbiAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cbiAgICAvKipcbiAgICAgKiBUT0RPOiBZVUlEb2NfY29tbWVudFxuICAgICAqXG4gICAgICogQG1ldGhvZCBfb25Tb3J0Q2hhbmdlXG4gICAgICogQHBhcmFtIGV2ZW50IHtqUXVlcnlFdmVudE9iamVjdH1cbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIF9vblNvcnRDaGFuZ2UoZXZlbnQpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICB0aGlzLmxheW91dCgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRPRE86IFlVSURvY19jb21tZW50XG4gICAgICpcbiAgICAgKiBAbWV0aG9kIF9vbkxpbWl0Q2hhbmdlXG4gICAgICogQHBhcmFtIGV2ZW50IHtqUXVlcnlFdmVudE9iamVjdH1cbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIF9vbkxpbWl0Q2hhbmdlKGV2ZW50KSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgdGhpcy5sYXlvdXQoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUT0RPOiBZVUlEb2NfY29tbWVudFxuICAgICAqXG4gICAgICogQG1ldGhvZCBfb25VcGRhdGVDbGlja1xuICAgICAqIEBwYXJhbSBldmVudCB7alF1ZXJ5RXZlbnRPYmplY3R9XG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBfb25VcGRhdGVDbGljayhldmVudCkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudCgndXBkYXRlJywge3NvcnRUeXBlOiB0aGlzLnNvcnRUeXBlLCBkaXNwbGF5TGltaXQ6IHRoaXMuZGlzcGxheUxpbWl0fSk7XG4gICAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IFBhZ2VDb250cm9sVmlldztcbiIsImltcG9ydCBET01FbGVtZW50IGZyb20gJ3N0cnVjdHVyZWpzL2Rpc3BsYXkvRE9NRWxlbWVudCc7XG5cbi8qKlxuICogVE9ETzogWVVJRG9jX2NvbW1lbnRcbiAqXG4gKiBAY2xhc3MgRXJyb3JNb2RhbFxuICogQGV4dGVuZHMgRE9NRWxlbWVudFxuICogQGNvbnN0cnVjdG9yXG4gKiovXG5jbGFzcyBFcnJvck1vZGFsIGV4dGVuZHMgRE9NRWxlbWVudCB7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAb3ZlcnJpZGRlbiBET01FbGVtZW50LmNyZWF0ZVxuICAgICAqL1xuICAgIGNyZWF0ZSgpIHtcbiAgICAgICAgc3VwZXIuY3JlYXRlKCd0ZW1wbGF0ZXMvcHJlY29tcGlsZS9Nb2RhbFRlbXBsYXRlJywge2Vycm9yOiAnUm9iZXJ0IGlzIGNvb2wnfSk7XG5cbiAgICAgICAgLy8gQ3JlYXRlIG9yIHNldHVwIG9iamVjdHMgaW4gdGhpcyBwYXJlbnQgY2xhc3MuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQG92ZXJyaWRkZW4gRE9NRWxlbWVudC5lbmFibGVcbiAgICAgKi9cbiAgICBlbmFibGUoKSB7XG4gICAgICAgIGlmICh0aGlzLmlzRW5hYmxlZCA9PT0gdHJ1ZSkgeyByZXR1cm47IH1cblxuICAgICAgICAvLyBFbmFibGUgdGhlIGNoaWxkIG9iamVjdHMgYW5kL29yIGFkZCBhbnkgZXZlbnQgbGlzdGVuZXJzLlxuXG4gICAgICAgIHJldHVybiBzdXBlci5lbmFibGUoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAb3ZlcnJpZGRlbiBET01FbGVtZW50LmRpc2FibGVcbiAgICAgKi9cbiAgICBkaXNhYmxlKCkge1xuICAgICAgICBpZiAodGhpcy5pc0VuYWJsZWQgPT09IGZhbHNlKSB7IHJldHVybjsgfVxuXG4gICAgICAgIC8vIERpc2FibGUgdGhlIGNoaWxkIG9iamVjdHMgYW5kL29yIHJlbW92ZSBhbnkgZXZlbnQgbGlzdGVuZXJzLlxuXG4gICAgICAgIHJldHVybiBzdXBlci5kaXNhYmxlKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQG92ZXJyaWRkZW4gRE9NRWxlbWVudC5sYXlvdXRcbiAgICAgKi9cbiAgICBsYXlvdXQoKSB7XG4gICAgICAgIC8vIExheW91dCBvciB1cGRhdGUgdGhlIG9iamVjdHMgaW4gdGhpcyBwYXJlbnQgY2xhc3MuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQG92ZXJyaWRkZW4gRE9NRWxlbWVudC5kZXN0cm95XG4gICAgICovXG4gICAgZGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy5kaXNhYmxlKCk7XG5cbiAgICAgICAgLy8gQ2FsbCBkZXN0cm95IG9uIGFueSBjaGlsZCBvYmplY3RzLlxuICAgICAgICAvLyBUaGlzIHN1cGVyIG1ldGhvZCB3aWxsIGFsc28gbnVsbCBvdXQgeW91ciBwcm9wZXJ0aWVzIGZvciBnYXJiYWdlIGNvbGxlY3Rpb24uXG5cbiAgICAgICAgc3VwZXIuZGVzdHJveSgpO1xuICAgIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBFcnJvck1vZGFsO1xuIiwiKGZ1bmN0aW9uIChmYWN0b3J5KSB7XG4gICAgaWYgKHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUuZXhwb3J0cyA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgdmFyIHYgPSBmYWN0b3J5KHJlcXVpcmUsIGV4cG9ydHMpOyBpZiAodiAhPT0gdW5kZWZpbmVkKSBtb2R1bGUuZXhwb3J0cyA9IHY7XG4gICAgfVxuICAgIGVsc2UgaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkge1xuICAgICAgICBkZWZpbmUoW1wicmVxdWlyZVwiLCBcImV4cG9ydHNcIiwgJy4vdXRpbC9VdGlsJ10sIGZhY3RvcnkpO1xuICAgIH1cbn0pKGZ1bmN0aW9uIChyZXF1aXJlLCBleHBvcnRzKSB7XG4gICAgLy8vPHJlZmVyZW5jZSBwYXRoPSdfZGVjbGFyZS9qcXVlcnkuZC50cycvPlxuICAgIC8vLzxyZWZlcmVuY2UgcGF0aD0nX2RlY2xhcmUvaGFuZGxlYmFycy5kLnRzJy8+XG4gICAgLy8vPHJlZmVyZW5jZSBwYXRoPSdfZGVjbGFyZS9ncmVlbnNvY2suZC50cycvPlxuICAgIC8vLzxyZWZlcmVuY2UgcGF0aD0nX2RlY2xhcmUvanF1ZXJ5LmV2ZW50TGlzdGVuZXIuZC50cycvPlxuICAgIC8vLzxyZWZlcmVuY2UgcGF0aD0nX2RlY2xhcmUvbG9nLmQudHMnLz5cbiAgICB2YXIgVXRpbF8xID0gcmVxdWlyZSgnLi91dGlsL1V0aWwnKTtcbiAgICAvKipcbiAgICAgKiBUaGUge3sjY3Jvc3NMaW5rIFwiQmFzZU9iamVjdFwifX17ey9jcm9zc0xpbmt9fSBjbGFzcyBpcyBhbiBhYnN0cmFjdCBjbGFzcyB0aGF0IHByb3ZpZGVzIGNvbW1vbiBwcm9wZXJ0aWVzIGFuZCBmdW5jdGlvbmFsaXR5IGZvciBhbGwgU3RydWN0dXJlSlMgY2xhc3Nlcy5cbiAgICAgKlxuICAgICAqIEBjbGFzcyBCYXNlT2JqZWN0XG4gICAgICogQG1vZHVsZSBTdHJ1Y3R1cmVKU1xuICAgICAqIEBzdWJtb2R1bGUgY29yZVxuICAgICAqIEByZXF1aXJlcyBVdGlsXG4gICAgICogQGNvbnN0cnVjdG9yXG4gICAgICogQGF1dGhvciBSb2JlcnQgUy4gKHd3dy5jb2RlQmVsdC5jb20pXG4gICAgICovXG4gICAgdmFyIEJhc2VPYmplY3QgPSAoZnVuY3Rpb24gKCkge1xuICAgICAgICBmdW5jdGlvbiBCYXNlT2JqZWN0KCkge1xuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBUaGUgc2pzSWQgKFN0cnVjdHVyZUpTIElEKSBpcyBhIHVuaXF1ZSBpZGVudGlmaWVyIGF1dG9tYXRpY2FsbHkgYXNzaWduZWQgdG8gbW9zdCBTdHJ1Y3R1cmVKUyBvYmplY3RzIHVwb24gaW5zdGFudGlhdGlvbi5cbiAgICAgICAgICAgICAqXG4gICAgICAgICAgICAgKiBAcHJvcGVydHkgc2pzSWRcbiAgICAgICAgICAgICAqIEB0eXBlIHtpbnR9XG4gICAgICAgICAgICAgKiBAZGVmYXVsdCBudWxsXG4gICAgICAgICAgICAgKiBAd3JpdGVPbmNlXG4gICAgICAgICAgICAgKiBAcmVhZE9ubHlcbiAgICAgICAgICAgICAqIEBwdWJsaWNcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgdGhpcy5zanNJZCA9IG51bGw7XG4gICAgICAgICAgICB0aGlzLnNqc0lkID0gVXRpbF8xLmRlZmF1bHQudW5pcXVlSWQoKTtcbiAgICAgICAgfVxuICAgICAgICAvKipcbiAgICAgICAgICogUmV0dXJucyB0aGUgZnVsbHkgcXVhbGlmaWVkIGNsYXNzIG5hbWUgb2YgYW4gb2JqZWN0LlxuICAgICAgICAgKlxuICAgICAgICAgKiBAbWV0aG9kIGdldFF1YWxpZmllZENsYXNzTmFtZVxuICAgICAgICAgKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSBjbGFzcyBuYW1lLlxuICAgICAgICAgKiBAcHVibGljXG4gICAgICAgICAqIEBleGFtcGxlXG4gICAgICAgICAqICAgICBsZXQgc29tZUNsYXNzID0gbmV3IFNvbWVDbGFzcygpO1xuICAgICAgICAgKiAgICAgc29tZUNsYXNzLmdldFF1YWxpZmllZENsYXNzTmFtZSgpO1xuICAgICAgICAgKlxuICAgICAgICAgKiAgICAgLy8gU29tZUNsYXNzXG4gICAgICAgICAqL1xuICAgICAgICBCYXNlT2JqZWN0LnByb3RvdHlwZS5nZXRRdWFsaWZpZWRDbGFzc05hbWUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gVXRpbF8xLmRlZmF1bHQuZ2V0TmFtZSh0aGlzKTtcbiAgICAgICAgfTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSBwdXJwb3NlIG9mIHRoZSBkZXN0cm95IG1ldGhvZCBpcyB0byBtYWtlIGFuIG9iamVjdCByZWFkeSBmb3IgZ2FyYmFnZSBjb2xsZWN0aW9uLiBUaGlzXG4gICAgICAgICAqIHNob3VsZCBiZSB0aG91Z2h0IG9mIGFzIGEgb25lIHdheSBmdW5jdGlvbi4gT25jZSBkZXN0cm95IGlzIGNhbGxlZCBubyBmdXJ0aGVyIG1ldGhvZHMgc2hvdWxkIGJlXG4gICAgICAgICAqIGNhbGxlZCBvbiB0aGUgb2JqZWN0IG9yIHByb3BlcnRpZXMgYWNjZXNzZWQuIEl0IGlzIHRoZSByZXNwb25zaWJpbGl0eSBvZiB0aG9zZSB3aG8gaW1wbGVtZW50IHRoaXNcbiAgICAgICAgICogZnVuY3Rpb24gdG8gc3RvcCBhbGwgcnVubmluZyBUaW1lcnMsIGFsbCBydW5uaW5nIFNvdW5kcywgYW5kIHRha2UgYW55IG90aGVyIHN0ZXBzIG5lY2Vzc2FyeSB0byBtYWtlIGFuXG4gICAgICAgICAqIG9iamVjdCBlbGlnaWJsZSBmb3IgZ2FyYmFnZSBjb2xsZWN0aW9uLlxuICAgICAgICAgKlxuICAgICAgICAgKiBCeSBkZWZhdWx0IHRoZSBkZXN0cm95IG1ldGhvZCB3aWxsIG51bGwgb3V0IGFsbCBwcm9wZXJ0aWVzIG9mIHRoZSBjbGFzcyBhdXRvbWF0aWNhbGx5LiBZb3Ugc2hvdWxkIGNhbGwgZGVzdHJveVxuICAgICAgICAgKiBvbiBvdGhlciBvYmplY3RzIGJlZm9yZSBjYWxsaW5nIHRoZSBzdXBlci5cbiAgICAgICAgICpcbiAgICAgICAgICogQG1ldGhvZCBkZXN0cm95XG4gICAgICAgICAqIEByZXR1cm4ge3ZvaWR9XG4gICAgICAgICAqIEBwdWJsaWNcbiAgICAgICAgICogQGV4YW1wbGVcbiAgICAgICAgICogICAgIGRlc3Ryb3koKSB7XG4gICAgICAgICAqICAgICAgICAgIHRoaXMuZGlzYWJsZSgpO1xuICAgICAgICAgKlxuICAgICAgICAgKiAgICAgICAgICB0aGlzLl9jaGlsZEluc3RhbmNlLmRlc3Ryb3koKTtcbiAgICAgICAgICpcbiAgICAgICAgICogICAgICAgICAgc3VwZXIuZGVzdHJveSgpO1xuICAgICAgICAgKiAgICAgfVxuICAgICAgICAgKi9cbiAgICAgICAgQmFzZU9iamVjdC5wcm90b3R5cGUuZGVzdHJveSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGZvciAodmFyIGtleSBpbiB0aGlzKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzW2tleV0gPSBudWxsO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIEJhc2VPYmplY3Q7XG4gICAgfSkoKTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG4gICAgZXhwb3J0cy5kZWZhdWx0ID0gQmFzZU9iamVjdDtcbn0pO1xuIiwidmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCBmdW5jdGlvbiAoZCwgYikge1xuICAgIGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdO1xuICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbn07XG4oZnVuY3Rpb24gKGZhY3RvcnkpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZS5leHBvcnRzID09PSAnb2JqZWN0Jykge1xuICAgICAgICB2YXIgdiA9IGZhY3RvcnkocmVxdWlyZSwgZXhwb3J0cyk7IGlmICh2ICE9PSB1bmRlZmluZWQpIG1vZHVsZS5leHBvcnRzID0gdjtcbiAgICB9XG4gICAgZWxzZSBpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSB7XG4gICAgICAgIGRlZmluZShbXCJyZXF1aXJlXCIsIFwiZXhwb3J0c1wiLCAnLi9CYXNlT2JqZWN0J10sIGZhY3RvcnkpO1xuICAgIH1cbn0pKGZ1bmN0aW9uIChyZXF1aXJlLCBleHBvcnRzKSB7XG4gICAgdmFyIEJhc2VPYmplY3RfMSA9IHJlcXVpcmUoJy4vQmFzZU9iamVjdCcpO1xuICAgIC8qKlxuICAgICAqIFRoZSB7eyNjcm9zc0xpbmsgXCJPYmplY3RNYW5hZ2VyXCJ9fXt7L2Nyb3NzTGlua319IGNsYXNzIGlzIGFuIGFic3RyYWN0IGNsYXNzIHRoYXQgcHJvdmlkZXMgZW5hYmxpbmcgYW5kIGRpc2FibGluZyBmdW5jdGlvbmFsaXR5IGZvciBtb3N0IFN0cnVjdHVyZUpTIGNsYXNzZXMuXG4gICAgICpcbiAgICAgKiBAY2xhc3MgT2JqZWN0TWFuYWdlclxuICAgICAqIEBtb2R1bGUgU3RydWN0dXJlSlNcbiAgICAgKiBAZXh0ZW5kcyBCYXNlT2JqZWN0XG4gICAgICogQHN1Ym1vZHVsZSBjb3JlXG4gICAgICogQHJlcXVpcmVzIEV4dGVuZFxuICAgICAqIEByZXF1aXJlcyBCYXNlT2JqZWN0XG4gICAgICogQGNvbnN0cnVjdG9yXG4gICAgICogQGF1dGhvciBSb2JlcnQgUy4gKHd3dy5jb2RlQmVsdC5jb20pXG4gICAgICovXG4gICAgdmFyIE9iamVjdE1hbmFnZXIgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgICAgICBfX2V4dGVuZHMoT2JqZWN0TWFuYWdlciwgX3N1cGVyKTtcbiAgICAgICAgZnVuY3Rpb24gT2JqZWN0TWFuYWdlcigpIHtcbiAgICAgICAgICAgIF9zdXBlci5jYWxsKHRoaXMpO1xuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBUaGUgaXNFbmFibGVkIHByb3BlcnR5IGlzIHVzZWQgdG8ga2VlcCB0cmFjayBvZiB0aGUgZW5hYmxlZCBzdGF0ZSBvZiB0aGUgb2JqZWN0LlxuICAgICAgICAgICAgICpcbiAgICAgICAgICAgICAqIEBwcm9wZXJ0eSBpc0VuYWJsZWRcbiAgICAgICAgICAgICAqIEB0eXBlIHtib29sZWFufVxuICAgICAgICAgICAgICogQGRlZmF1bHQgZmFsc2VcbiAgICAgICAgICAgICAqIEBwdWJsaWNcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgdGhpcy5pc0VuYWJsZWQgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIGVuYWJsZSBtZXRob2QgaXMgcmVzcG9uc2libGUgZm9yIGVuYWJsaW5nIGV2ZW50IGxpc3RlbmVycyBhbmQvb3IgY2hpbGRyZW4gb2YgdGhlIGNvbnRhaW5pbmcgb2JqZWN0cy5cbiAgICAgICAgICpcbiAgICAgICAgICogQG1ldGhvZCBlbmFibGVcbiAgICAgICAgICogQHB1YmxpY1xuICAgICAgICAgKiBAY2hhaW5hYmxlXG4gICAgICAgICAqIEBleGFtcGxlXG4gICAgICAgICAqICAgICBlbmFibGUoKSB7XG4gICAgICAgICAqICAgICAgICAgIGlmICh0aGlzLmlzRW5hYmxlZCA9PT0gdHJ1ZSkgeyByZXR1cm4gdGhpczsgfVxuICAgICAgICAgKlxuICAgICAgICAgKiAgICAgICAgICB0aGlzLl9jaGlsZEluc3RhbmNlLmFkZEV2ZW50TGlzdGVuZXIoQmFzZUV2ZW50LkNIQU5HRSwgdGhpcy5oYW5kbGVyTWV0aG9kLCB0aGlzKTtcbiAgICAgICAgICogICAgICAgICAgdGhpcy5fY2hpbGRJbnN0YW5jZS5lbmFibGUoKTtcbiAgICAgICAgICpcbiAgICAgICAgICogICAgICAgICAgcmV0dXJuIHN1cGVyLmVuYWJsZSgpO1xuICAgICAgICAgKiAgICAgfVxuICAgICAgICAgKi9cbiAgICAgICAgT2JqZWN0TWFuYWdlci5wcm90b3R5cGUuZW5hYmxlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuaXNFbmFibGVkID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmlzRW5hYmxlZCA9IHRydWU7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSBkaXNhYmxlIG1ldGhvZCBpcyByZXNwb25zaWJsZSBmb3IgZGlzYWJsaW5nIGV2ZW50IGxpc3RlbmVycyBhbmQvb3IgY2hpbGRyZW4gb2YgdGhlIGNvbnRhaW5pbmcgb2JqZWN0cy5cbiAgICAgICAgICpcbiAgICAgICAgICogQG1ldGhvZCBkaXNhYmxlXG4gICAgICAgICAqIEBwdWJsaWNcbiAgICAgICAgICogQGNoYWluYWJsZVxuICAgICAgICAgKiBAZXhhbXBsZVxuICAgICAgICAgKiAgICAgIGRpc2FibGUoKSB7XG4gICAgICAgICAqICAgICAgICAgIGlmICh0aGlzLmlzRW5hYmxlZCA9PT0gZmFsc2UpIHsgcmV0dXJuIHRoaXM7IH1cbiAgICAgICAgICpcbiAgICAgICAgICogICAgICAgICAgdGhpcy5fY2hpbGRJbnN0YW5jZS5yZW1vdmVFdmVudExpc3RlbmVyKEJhc2VFdmVudC5DSEFOR0UsIHRoaXMuaGFuZGxlck1ldGhvZCwgdGhpcyk7XG4gICAgICAgICAqICAgICAgICAgIHRoaXMuX2NoaWxkSW5zdGFuY2UuZGlzYWJsZSgpO1xuICAgICAgICAgKlxuICAgICAgICAgKiAgICAgICAgICByZXR1cm4gc3VwZXIuZGlzYWJsZSgpO1xuICAgICAgICAgKiAgICAgIH1cbiAgICAgICAgICovXG4gICAgICAgIE9iamVjdE1hbmFnZXIucHJvdG90eXBlLmRpc2FibGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5pc0VuYWJsZWQgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmlzRW5hYmxlZCA9IGZhbHNlO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBPYmplY3RNYW5hZ2VyO1xuICAgIH0pKEJhc2VPYmplY3RfMS5kZWZhdWx0KTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG4gICAgZXhwb3J0cy5kZWZhdWx0ID0gT2JqZWN0TWFuYWdlcjtcbn0pO1xuIiwidmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCBmdW5jdGlvbiAoZCwgYikge1xuICAgIGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdO1xuICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbn07XG4oZnVuY3Rpb24gKGZhY3RvcnkpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZS5leHBvcnRzID09PSAnb2JqZWN0Jykge1xuICAgICAgICB2YXIgdiA9IGZhY3RvcnkocmVxdWlyZSwgZXhwb3J0cyk7IGlmICh2ICE9PSB1bmRlZmluZWQpIG1vZHVsZS5leHBvcnRzID0gdjtcbiAgICB9XG4gICAgZWxzZSBpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSB7XG4gICAgICAgIGRlZmluZShbXCJyZXF1aXJlXCIsIFwiZXhwb3J0c1wiLCAnLi9EaXNwbGF5T2JqZWN0Q29udGFpbmVyJywgJy4uL2V2ZW50L0Jhc2VFdmVudCcsICcuLi91dGlsL1RlbXBsYXRlRmFjdG9yeScsICcuLi91dGlsL0NvbXBvbmVudEZhY3RvcnknLCAnLi4vcGx1Z2luL2pxdWVyeS5ldmVudExpc3RlbmVyJ10sIGZhY3RvcnkpO1xuICAgIH1cbn0pKGZ1bmN0aW9uIChyZXF1aXJlLCBleHBvcnRzKSB7XG4gICAgdmFyIERpc3BsYXlPYmplY3RDb250YWluZXJfMSA9IHJlcXVpcmUoJy4vRGlzcGxheU9iamVjdENvbnRhaW5lcicpO1xuICAgIHZhciBCYXNlRXZlbnRfMSA9IHJlcXVpcmUoJy4uL2V2ZW50L0Jhc2VFdmVudCcpO1xuICAgIHZhciBUZW1wbGF0ZUZhY3RvcnlfMSA9IHJlcXVpcmUoJy4uL3V0aWwvVGVtcGxhdGVGYWN0b3J5Jyk7XG4gICAgdmFyIENvbXBvbmVudEZhY3RvcnlfMSA9IHJlcXVpcmUoJy4uL3V0aWwvQ29tcG9uZW50RmFjdG9yeScpO1xuICAgIHZhciBqcXVlcnlfZXZlbnRMaXN0ZW5lcl8xID0gcmVxdWlyZSgnLi4vcGx1Z2luL2pxdWVyeS5ldmVudExpc3RlbmVyJyk7XG4gICAgLyoqXG4gICAgICogVGhlIHt7I2Nyb3NzTGluayBcIkRPTUVsZW1lbnRcIn19e3svY3Jvc3NMaW5rfX0gY2xhc3MgaXMgdGhlIGJhc2UgdmlldyBjbGFzcyBmb3IgYWxsIG9iamVjdHMgdGhhdCBjYW4gYmUgcGxhY2VkIGludG8gdGhlIEhUTUwgRE9NLlxuICAgICAqXG4gICAgICogQGNsYXNzIERPTUVsZW1lbnRcbiAgICAgKiBAcGFyYW0gdHlwZSBbYW55PW51bGxdIEVpdGhlciBhIGpRdWVyeSBvYmplY3Qgb3IgSmF2YVNjcmlwdCB0ZW1wbGF0ZSBzdHJpbmcgcmVmZXJlbmNlIHlvdSB3YW50IHRvIHVzZSBhcyB0aGUgdmlldy4gQ2hlY2sgb3V0IHRoZSBleGFtcGxlcyBiZWxvdy5cbiAgICAgKiBAcGFyYW0gcGFyYW1zIFthbnk9bnVsbF0gQW55IGRhdGEgeW91IHdvdWxkIGxpa2UgdG8gcGFzcyBpbnRvIHRoZSBqUXVlcnkgZWxlbWVudCBvciB0ZW1wbGF0ZSB0aGF0IGlzIGJlaW5nIGNyZWF0ZWQuXG4gICAgICogQGV4dGVuZHMgRGlzcGxheU9iamVjdENvbnRhaW5lclxuICAgICAqIEBtb2R1bGUgU3RydWN0dXJlSlNcbiAgICAgKiBAc3VibW9kdWxlIHZpZXdcbiAgICAgKiBAcmVxdWlyZXMgRXh0ZW5kXG4gICAgICogQHJlcXVpcmVzIERpc3BsYXlPYmplY3RDb250YWluZXJcbiAgICAgKiBAcmVxdWlyZXMgQmFzZUV2ZW50XG4gICAgICogQHJlcXVpcmVzIFRlbXBsYXRlRmFjdG9yeVxuICAgICAqIEByZXF1aXJlcyBDb21wb25lbnRGYWN0b3J5XG4gICAgICogQHJlcXVpcmVzIGpRdWVyeVxuICAgICAqIEBjb25zdHJ1Y3RvclxuICAgICAqIEBhdXRob3IgUm9iZXJ0IFMuICh3d3cuY29kZUJlbHQuY29tKVxuICAgICAqIEBleGFtcGxlXG4gICAgICogICAgIC8vIEV4YW1wbGU6IFVzaW5nIERPTUVsZW1lbnQgd2l0aG91dCBleHRlbmRpbmcgaXQuXG4gICAgICogICAgIGxldCBhTGluayA9IG5ldyBET01FbGVtZW50KCdhJywge3RleHQ6ICdHb29nbGUnLCBocmVmOiAnaHR0cDovL3d3dy5nb29nbGUuY29tJywgJ2NsYXNzJzogJ2V4dGVybmFsTGluayd9KTtcbiAgICAgKiAgICAgdGhpcy5hZGRDaGlsZChhTGluayk7XG4gICAgICpcbiAgICAgKiAgICAgLy8gRXhhbXBsZTogQSB2aWV3IHBhc3NpbmcgaW4gYSBqUXVlcnkgb2JqZWN0LlxuICAgICAqICAgICBsZXQgdmlldyA9IG5ldyBDdXN0b21WaWV3KCQoJy5zZWxlY3RvcicpKTtcbiAgICAgKiAgICAgdGhpcy5hZGRDaGlsZCh2aWV3KTtcbiAgICAgKlxuICAgICAqICAgICAvLyBFeGFtcGxlOiBBIHZpZXcgZXh0ZW5kaW5nIERPTUVsZW1lbnQgd2hpbGUgcGFzc2luZyBpbiBhIGpRdWVyeSBvYmplY3QuXG4gICAgICogICAgIGNsYXNzIENsYXNzTmFtZSBleHRlbmRzIERPTUVsZW1lbnQge1xuICAgICAqXG4gICAgICogICAgICAgICAgY29uc3RydWN0b3IoJGVsZW1lbnQpIHtcbiAgICAgKiAgICAgICAgICAgICAgc3VwZXIoJGVsZW1lbnQpO1xuICAgICAqICAgICAgICAgIH1cbiAgICAgKlxuICAgICAqICAgICAgICAgIGNyZWF0ZSgpIHtcbiAgICAgKiAgICAgICAgICAgICAgc3VwZXIuY3JlYXRlKCk7XG4gICAgICpcbiAgICAgKiAgICAgICAgICAgICAgLy8gQ3JlYXRlIGFuZCBhZGQgeW91ciBjaGlsZCBvYmplY3RzIHRvIHRoaXMgcGFyZW50IGNsYXNzLlxuICAgICAqICAgICAgICAgIH1cbiAgICAgKlxuICAgICAqICAgICAgICAgIGVuYWJsZSgpIHtcbiAgICAgKiAgICAgICAgICAgICAgaWYgKHRoaXMuaXNFbmFibGVkID09PSB0cnVlKSB7IHJldHVybiB0aGlzOyB9XG4gICAgICpcbiAgICAgKiAgICAgICAgICAgICAgLy8gRW5hYmxlIHRoZSBjaGlsZCBvYmplY3RzIGFuZCBhZGQgYW55IGV2ZW50IGxpc3RlbmVycy5cbiAgICAgKlxuICAgICAqICAgICAgICAgICAgICByZXR1cm4gc3VwZXIuZW5hYmxlKCk7XG4gICAgICogICAgICAgICAgfVxuICAgICAqXG4gICAgICogICAgICAgICAgZGlzYWJsZSgpIHtcbiAgICAgKiAgICAgICAgICAgICAgaWYgKHRoaXMuaXNFbmFibGVkID09PSBmYWxzZSkgeyByZXR1cm4gdGhpczsgfVxuICAgICAqXG4gICAgICogICAgICAgICAgICAgIC8vIERpc2FibGUgdGhlIGNoaWxkIG9iamVjdHMgYW5kIHJlbW92ZSBhbnkgZXZlbnQgbGlzdGVuZXJzLlxuICAgICAqXG4gICAgICogICAgICAgICAgICAgIHJldHVybiBzdXBlci5kaXNhYmxlKCk7XG4gICAgICogICAgICAgICAgfVxuICAgICAqXG4gICAgICogICAgICAgICAgbGF5b3V0KCkge1xuICAgICAqICAgICAgICAgICAgICAvLyBMYXlvdXQgb3IgdXBkYXRlIHRoZSBjaGlsZCBvYmplY3RzIGluIHRoaXMgcGFyZW50IGNsYXNzLlxuICAgICAqXG4gICAgICogICAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAqICAgICAgICAgIH1cbiAgICAgKlxuICAgICAqICAgICAgICAgIGRlc3Ryb3koKSB7XG4gICAgICogICAgICAgICAgICAgIHRoaXMuZGlzYWJsZSgpO1xuICAgICAqXG4gICAgICogICAgICAgICAgICAgIC8vIERlc3Ryb3kgdGhlIGNoaWxkIG9iamVjdHMgYW5kIHJlZmVyZW5jZXMgaW4gdGhpcyBwYXJlbnQgY2xhc3MgdG8gcHJldmVudCBtZW1vcnkgbGVha3MuXG4gICAgICpcbiAgICAgKiAgICAgICAgICAgICAgc3VwZXIuZGVzdHJveSgpO1xuICAgICAqICAgICAgICAgIH1cbiAgICAgKlxuICAgICAqICAgICB9XG4gICAgICpcbiAgICAgKiAgICAgLy8gRXhhbXBsZTogQSB2aWV3IGV4dGVuZGluZyBET01FbGVtZW50IHdpdGggYSBwcmVjb21waWxlZCBKYXZhU2NyaXB0IHRlbXBsYXRlIHJlZmVyZW5jZSBwYXNzZWQgaW4uXG4gICAgICogICAgIGNsYXNzIENsYXNzTmFtZSBleHRlbmRzIERPTUVsZW1lbnQge1xuICAgICAqXG4gICAgICogICAgICAgICAgY29uc3RydWN0b3IoKSB7XG4gICAgICogICAgICAgICAgICAgIF9zdXBlcigpO1xuICAgICAqICAgICAgICAgIH1cbiAgICAgKlxuICAgICAqICAgICAgICAgIGNyZWF0ZSgpIHtcbiAgICAgKiAgICAgICAgICAgICAgc3VwZXIuY3JlYXRlKCd0ZW1wbGF0ZXMvaG9tZS9ob21lVGVtcGxhdGUnLCB7ZGF0YTogJ3NvbWUgZGF0YSd9KTtcbiAgICAgKlxuICAgICAqICAgICAgICAgICAgICAvLyBDcmVhdGUgYW5kIGFkZCB5b3VyIGNoaWxkIG9iamVjdHMgdG8gdGhpcyBwYXJlbnQgY2xhc3MuXG4gICAgICogICAgICAgICAgfVxuICAgICAqXG4gICAgICogICAgICAgICAgZW5hYmxlKCkge1xuICAgICAqICAgICAgICAgICAgICBpZiAodGhpcy5pc0VuYWJsZWQgPT09IHRydWUpIHsgcmV0dXJuIHRoaXM7IH1cbiAgICAgKlxuICAgICAqICAgICAgICAgICAgICAvLyBFbmFibGUgdGhlIGNoaWxkIG9iamVjdHMgYW5kIGFkZCBhbnkgZXZlbnQgbGlzdGVuZXJzLlxuICAgICAqXG4gICAgICogICAgICAgICAgICAgIHJldHVybiBzdXBlci5lbmFibGUoKTtcbiAgICAgKiAgICAgICAgICB9XG4gICAgICpcbiAgICAgKiAgICAgICAgICBkaXNhYmxlKCkge1xuICAgICAqICAgICAgICAgICAgICBpZiAodGhpcy5pc0VuYWJsZWQgPT09IGZhbHNlKSB7IHJldHVybiB0aGlzOyB9XG4gICAgICpcbiAgICAgKiAgICAgICAgICAgICAgLy8gRGlzYWJsZSB0aGUgY2hpbGQgb2JqZWN0cyBhbmQgcmVtb3ZlIGFueSBldmVudCBsaXN0ZW5lcnMuXG4gICAgICpcbiAgICAgKiAgICAgICAgICAgICAgcmV0dXJuIHN1cGVyLmRpc2FibGUoKTtcbiAgICAgKiAgICAgICAgICB9XG4gICAgICpcbiAgICAgKiAgICAgICAgICBsYXlvdXQoKSB7XG4gICAgICogICAgICAgICAgICAgIC8vIExheW91dCBvciB1cGRhdGUgdGhlIGNoaWxkIG9iamVjdHMgaW4gdGhpcyBwYXJlbnQgY2xhc3MuXG4gICAgICpcbiAgICAgKiAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICogICAgICAgICAgfVxuICAgICAqXG4gICAgICogICAgICAgICAgZGVzdHJveSgpIHtcbiAgICAgKiAgICAgICAgICAgICAgdGhpcy5kaXNhYmxlKCk7XG4gICAgICpcbiAgICAgKiAgICAgICAgICAgICAgLy8gRGVzdHJveSB0aGUgY2hpbGQgb2JqZWN0cyBhbmQgcmVmZXJlbmNlcyBpbiB0aGlzIHBhcmVudCBjbGFzcyB0byBwcmVwYXJlIGZvciBnYXJiYWdlIGNvbGxlY3Rpb24uXG4gICAgICpcbiAgICAgKiAgICAgICAgICAgICAgc3VwZXIuZGVzdHJveSgpO1xuICAgICAqICAgICAgICAgIH1cbiAgICAgKlxuICAgICAqICAgICB9XG4gICAgICovXG4gICAgdmFyIERPTUVsZW1lbnQgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgICAgICBfX2V4dGVuZHMoRE9NRWxlbWVudCwgX3N1cGVyKTtcbiAgICAgICAgZnVuY3Rpb24gRE9NRWxlbWVudCh0eXBlLCBwYXJhbXMpIHtcbiAgICAgICAgICAgIGlmICh0eXBlID09PSB2b2lkIDApIHsgdHlwZSA9IG51bGw7IH1cbiAgICAgICAgICAgIGlmIChwYXJhbXMgPT09IHZvaWQgMCkgeyBwYXJhbXMgPSBudWxsOyB9XG4gICAgICAgICAgICBfc3VwZXIuY2FsbCh0aGlzKTtcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogVHJhY2tzIG51bWJlciBvZiB0aW1lcyBhbiBlbGVtZW50J3Mgd2lkdGggaGFzIGJlZW4gY2hlY2tlZFxuICAgICAgICAgICAgICogaW4gb3JkZXIgdG8gZGV0ZXJtaW5lIGlmIHRoZSBlbGVtZW50IGhhcyBiZWVuIGFkZGVkXG4gICAgICAgICAgICAgKiB0byB0aGUgRE9NLlxuICAgICAgICAgICAgICpcbiAgICAgICAgICAgICAqIEBwcm9wZXJ0eSBjaGVja0NvdW50XG4gICAgICAgICAgICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgICAgICAgICAgICogQHB1YmxpY1xuICAgICAgICAgICAgICovXG4gICAgICAgICAgICB0aGlzLmNoZWNrQ291bnQgPSAwO1xuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBBIGNhY2hlZCByZWZlcmVuY2UgdG8gdGhlIERPTSBFbGVtZW50XG4gICAgICAgICAgICAgKlxuICAgICAgICAgICAgICogQHByb3BlcnR5IGVsZW1lbnRcbiAgICAgICAgICAgICAqIEB0eXBlIHtIVE1MRWxlbWVudH1cbiAgICAgICAgICAgICAqIEBkZWZhdWx0IG51bGxcbiAgICAgICAgICAgICAqIEBwdWJsaWNcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgdGhpcy5lbGVtZW50ID0gbnVsbDtcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogQSBjYWNoZWQgcmVmZXJlbmNlIHRvIHRoZSBqUXVlcnkgRE9NIGVsZW1lbnRcbiAgICAgICAgICAgICAqXG4gICAgICAgICAgICAgKiBAcHJvcGVydHkgJGVsZW1lbnRcbiAgICAgICAgICAgICAqIEB0eXBlIHtKUXVlcnl9XG4gICAgICAgICAgICAgKiBAZGVmYXVsdCBudWxsXG4gICAgICAgICAgICAgKiBAcHVibGljXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHRoaXMuJGVsZW1lbnQgPSBudWxsO1xuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBJZiBhIGpRdWVyeSBvYmplY3Qgd2FzIHBhc3NlZCBpbnRvIHRoZSBjb25zdHJ1Y3RvciB0aGlzIHdpbGwgYmUgc2V0IGFzIHRydWUgYW5kXG4gICAgICAgICAgICAgKiB0aGlzIGNsYXNzIHdpbGwgbm90IHRyeSB0byBhZGQgdGhlIHZpZXcgdG8gdGhlIERPTSBzaW5jZSBpdCBhbHJlYWR5IGV4aXN0cy5cbiAgICAgICAgICAgICAqXG4gICAgICAgICAgICAgKiBAcHJvcGVydHkgX2lzUmVmZXJlbmNlXG4gICAgICAgICAgICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICAgICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgdGhpcy5faXNSZWZlcmVuY2UgPSBmYWxzZTtcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogSG9sZHMgb250byB0aGUgdmFsdWUgcGFzc2VkIGludG8gdGhlIGNvbnN0cnVjdG9yLlxuICAgICAgICAgICAgICpcbiAgICAgICAgICAgICAqIEBwcm9wZXJ0eSBfdHlwZVxuICAgICAgICAgICAgICogQHR5cGUge3N0cmluZ31cbiAgICAgICAgICAgICAqIEBkZWZhdWx0IG51bGxcbiAgICAgICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgdGhpcy5fdHlwZSA9IG51bGw7XG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIEhvbGRzIG9udG8gdGhlIHZhbHVlIHBhc3NlZCBpbnRvIHRoZSBjb25zdHJ1Y3Rvci5cbiAgICAgICAgICAgICAqXG4gICAgICAgICAgICAgKiBAcHJvcGVydHkgX3BhcmFtc1xuICAgICAgICAgICAgICogQHR5cGUge2FueX1cbiAgICAgICAgICAgICAqIEBkZWZhdWx0IG51bGxcbiAgICAgICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgdGhpcy5fcGFyYW1zID0gbnVsbDtcbiAgICAgICAgICAgIGlmICh0eXBlIGluc3RhbmNlb2YganF1ZXJ5X2V2ZW50TGlzdGVuZXJfMS5kZWZhdWx0KSB7XG4gICAgICAgICAgICAgICAgdGhpcy4kZWxlbWVudCA9IHR5cGU7XG4gICAgICAgICAgICAgICAgdGhpcy5lbGVtZW50ID0gdGhpcy4kZWxlbWVudFswXTtcbiAgICAgICAgICAgICAgICB0aGlzLl9pc1JlZmVyZW5jZSA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICh0eXBlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fdHlwZSA9IHR5cGU7XG4gICAgICAgICAgICAgICAgdGhpcy5fcGFyYW1zID0gcGFyYW1zO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgY3JlYXRlIGZ1bmN0aW9uIGlzIGludGVuZGVkIHRvIHByb3ZpZGUgYSBjb25zaXN0ZW50IHBsYWNlIGZvciB0aGUgY3JlYXRpb24gYW5kIGFkZGluZ1xuICAgICAgICAgKiBvZiBjaGlsZHJlbiB0byB0aGUgdmlldy4gSXQgd2lsbCBhdXRvbWF0aWNhbGx5IGJlIGNhbGxlZCB0aGUgZmlyc3QgdGltZSB0aGF0IHRoZSB2aWV3IGlzIGFkZGVkXG4gICAgICAgICAqIHRvIGFub3RoZXIgRGlzcGxheU9iamVjdENvbnRhaW5lci4gSXQgaXMgY3JpdGljYWwgdGhhdCBhbGwgc3ViY2xhc3NlcyBjYWxsIHRoZSBzdXBlciBmb3IgdGhpcyBmdW5jdGlvbiBpblxuICAgICAgICAgKiB0aGVpciBvdmVycmlkZGVuIG1ldGhvZHMuXG4gICAgICAgICAqXG4gICAgICAgICAqIFRoaXMgbWV0aG9kIGdldHMgY2FsbGVkIG9uY2Ugd2hlbiB0aGUgY2hpbGQgdmlldyBpcyBhZGRlZCB0byBhbm90aGVyIHZpZXcuIElmIHRoZSBjaGlsZCB2aWV3IGlzIHJlbW92ZWRcbiAgICAgICAgICogYW5kIGFkZGVkIHRvIGFub3RoZXIgdmlldyB0aGUgY3JlYXRlIG1ldGhvZCB3aWxsIG5vdCBiZSBjYWxsZWQgYWdhaW4uXG4gICAgICAgICAqXG4gICAgICAgICAqIEBtZXRob2QgY3JlYXRlXG4gICAgICAgICAqIEBwYXJhbSB0eXBlIFtzdHJpbmc9ZGl2XSBUaGUgSFRNTCB0YWcgeW91IHdhbnQgdG8gY3JlYXRlIG9yIHRoZSBpZC9jbGFzcyBzZWxlY3RvciBvZiB0aGUgdGVtcGxhdGUgb3IgdGhlIHByZS1jb21waWxlZCBwYXRoIHRvIGEgdGVtcGxhdGUuXG4gICAgICAgICAqIEBwYXJhbSBwYXJhbXMgW2FueT1udWxsXSBBbnkgZGF0YSB5b3Ugd291bGQgbGlrZSB0byBwYXNzIGludG8gdGhlIGpRdWVyeSBlbGVtZW50IG9yIHRlbXBsYXRlIHRoYXQgaXMgYmVpbmcgY3JlYXRlZC5cbiAgICAgICAgICogQHJldHVybnMge2FueX0gUmV0dXJucyBhbiBpbnN0YW5jZSBvZiBpdHNlbGYuXG4gICAgICAgICAqIEBwdWJsaWNcbiAgICAgICAgICogQGNoYWluYWJsZVxuICAgICAgICAgKiBAZXhhbXBsZVxuICAgICAgICAgKiAgICAgLy8gRVhBTVBMRSAxOiBCeSBkZWZhdWx0IHlvdXIgdmlldyBjbGFzcyB3aWxsIGJlIGEgZGl2IGVsZW1lbnQ6XG4gICAgICAgICAqICAgICBjcmVhdGUoKSB7XG4gICAgICAgICAqICAgICAgICAgIHN1cGVyLmNyZWF0ZSgpO1xuICAgICAgICAgKlxuICAgICAgICAgKiAgICAgICAgICB0aGlzLl9jaGlsZEluc3RhbmNlID0gbmV3IERPTUVsZW1lbnQoKTtcbiAgICAgICAgICogICAgICAgICAgdGhpcy5hZGRDaGlsZCh0aGlzLl9jaGlsZEluc3RhbmNlKTtcbiAgICAgICAgICogICAgIH1cbiAgICAgICAgICpcbiAgICAgICAgICogICAgIC8vIEVYQU1QTEUgMjogQnV0IGxldHMgc2F5IHlvdSB3YW50ZWQgdGhlIHZpZXcgdG8gYmUgYSB1bCBlbGVtZW50OlxuICAgICAgICAgKiAgICAgY3JlYXRlKCkge1xuICAgICAgICAgKiAgICAgICAgICBzdXBlci5jcmVhdGUoJ3VsJyk7XG4gICAgICAgICAqICAgICB9XG4gICAgICAgICAqXG4gICAgICAgICAqICAgICAvLyBUaGVuIHlvdSBjb3VsZCBuZXN0IG90aGVyIGVsZW1lbnRzIGluc2lkZSB0aGlzIGJhc2Ugdmlldy9lbGVtZW50LlxuICAgICAgICAgKiAgICAgY3JlYXRlKCkge1xuICAgICAgICAgKiAgICAgICAgICBzdXBlci5jcmVhdGUoJ3VsJywge2lkOiAnbXlJZCcsICdjbGFzcyc6ICdteUNsYXNzIGFub3RoZXJDbGFzcyd9KTtcbiAgICAgICAgICpcbiAgICAgICAgICogICAgICAgICAgbGV0IGxpID0gbmV3IERPTUVsZW1lbnQoJ2xpJywge3RleHQ6ICdSb2JlcnQgaXMgY29vbCd9KTtcbiAgICAgICAgICogICAgICAgICAgdGhpcy5hZGRDaGlsZChsaSk7XG4gICAgICAgICAqICAgICB9XG4gICAgICAgICAqXG4gICAgICAgICAqICAgICAvLyBFWEFNUExFIDM6IFNvIHRoYXQncyBjb29sIGJ1dCB3aGF0IGlmIHlvdSB3YW50ZWQgYSBibG9jayBvZiBodG1sIHRvIGJlIHlvdXIgdmlldy4gTGV0J3Mgc2F5IHlvdSBoYWQgdGhlIGJlbG93XG4gICAgICAgICAqICAgICAvLyBpbmxpbmUgSGFuZGxlYmFyIHRlbXBsYXRlIGluIHlvdXIgaHRtbCBmaWxlLlxuICAgICAgICAgKiAgICAgPHNjcmlwdCBpZD1cInRvZG9UZW1wbGF0ZVwiIHR5cGU9XCJ0ZXh0L3RlbXBsYXRlXCI+XG4gICAgICAgICAqICAgICAgICAgIDxkaXYgaWQ9XCJodG1sVGVtcGxhdGVcIiBjbGFzcz1cImpzLXRvZG9cIj5cbiAgICAgICAgICogICAgICAgICAgICAgIDxkaXYgaWQ9XCJpbnB1dC13cmFwcGVyXCI+XG4gICAgICAgICAqICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgY2xhc3M9XCJsaXN0LWlucHV0XCIgcGxhY2Vob2xkZXI9XCJ7eyBkYXRhLnRleHQgfX1cIj5cbiAgICAgICAgICogICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwibGlzdC1pdGVtLXN1Ym1pdFwiIHZhbHVlPVwiQWRkXCI+XG4gICAgICAgICAqICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICogICAgICAgICAgPC9kaXY+XG4gICAgICAgICAqICAgICA8L3NjcmlwdD5cbiAgICAgICAgICpcbiAgICAgICAgICogICAgIC8vIFlvdSB3b3VsZCBqdXN0IHBhc3MgaW4gdGhlIGlkIG9yIGNsYXNzIHNlbGVjdG9yIG9mIHRoZSB0ZW1wbGF0ZSB3aGljaCBpbiB0aGlzIGNhc2UgaXMgXCIjdG9kb1RlbXBsYXRlXCIuXG4gICAgICAgICAqICAgICAvLyBUaGVyZSBpcyBhIHNlY29uZCBvcHRpb25hbCBhcmd1bWVudCB3aGVyZSB5b3UgY2FuIHBhc3MgZGF0YSBmb3IgdGhlIEhhbmRsZWJhciB0ZW1wbGF0ZSB0byB1c2UuXG4gICAgICAgICAqICAgICBjcmVhdGUoKSB7XG4gICAgICAgICAqICAgICAgICAgIHN1cGVyLmNyZWF0ZSgnI3RvZG9UZW1wbGF0ZScsIHsgZGF0YTogdGhpcy52aWV3RGF0YSB9KTtcbiAgICAgICAgICpcbiAgICAgICAgICogICAgIH1cbiAgICAgICAgICpcbiAgICAgICAgICogICAgIC8vIEVYQU1QTEUgNDogT3IgbWF5YmUgeW91J3JlIHVzaW5nIGdydW50LWNvbnRyaWItaGFuZGxlYmFycywgb3Igc2ltaWxhciwgdG8gcHJlY29tcGlsZSBoYnMgdGVtcGxhdGVzXG4gICAgICAgICAqICAgICBjcmVhdGUoKSB7XG4gICAgICAgICAqICAgICAgICAgIHN1cGVyLmNyZWF0ZSgndGVtcGxhdGVzL0hvbWVUZW1wbGF0ZScsIHtkYXRhOiBcInNvbWUgZGF0YVwifSk7XG4gICAgICAgICAqXG4gICAgICAgICAqICAgICB9XG4gICAgICAgICAqL1xuICAgICAgICBET01FbGVtZW50LnByb3RvdHlwZS5jcmVhdGUgPSBmdW5jdGlvbiAodHlwZSwgcGFyYW1zKSB7XG4gICAgICAgICAgICBpZiAodHlwZSA9PT0gdm9pZCAwKSB7IHR5cGUgPSAnZGl2JzsgfVxuICAgICAgICAgICAgaWYgKHBhcmFtcyA9PT0gdm9pZCAwKSB7IHBhcmFtcyA9IG51bGw7IH1cbiAgICAgICAgICAgIC8vIFVzZSB0aGUgZGF0YSBwYXNzZWQgaW50byB0aGUgY29uc3RydWN0b3IgZmlyc3QgZWxzZSB1c2UgdGhlIGFyZ3VtZW50cyBmcm9tIGNyZWF0ZS5cbiAgICAgICAgICAgIHR5cGUgPSB0aGlzLl90eXBlIHx8IHR5cGU7XG4gICAgICAgICAgICBwYXJhbXMgPSB0aGlzLl9wYXJhbXMgfHwgcGFyYW1zO1xuICAgICAgICAgICAgaWYgKHRoaXMuaXNDcmVhdGVkID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdbJyArIHRoaXMuZ2V0UXVhbGlmaWVkQ2xhc3NOYW1lKCkgKyAnXSBZb3UgY2Fubm90IGNhbGwgdGhlIGNyZWF0ZSBtZXRob2QgbWFudWFsbHkuIEl0IGlzIG9ubHkgY2FsbGVkIG9uY2UgYXV0b21hdGljYWxseSBkdXJpbmcgdGhlIHZpZXcgbGlmZWN5Y2xlIGFuZCBzaG91bGQgb25seSBiZSBjYWxsZWQgb25jZS4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLiRlbGVtZW50ID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICB2YXIgaHRtbF8xID0gVGVtcGxhdGVGYWN0b3J5XzEuZGVmYXVsdC5jcmVhdGUodHlwZSwgcGFyYW1zKTtcbiAgICAgICAgICAgICAgICBpZiAoaHRtbF8xKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuJGVsZW1lbnQgPSBqcXVlcnlfZXZlbnRMaXN0ZW5lcl8xLmRlZmF1bHQoaHRtbF8xKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuJGVsZW1lbnQgPSBqcXVlcnlfZXZlbnRMaXN0ZW5lcl8xLmRlZmF1bHQoXCI8XCIgKyB0eXBlICsgXCIvPlwiLCBwYXJhbXMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuZWxlbWVudCA9IHRoaXMuJGVsZW1lbnRbMF07XG4gICAgICAgICAgICB0aGlzLndpZHRoID0gdGhpcy4kZWxlbWVudC53aWR0aCgpO1xuICAgICAgICAgICAgdGhpcy5oZWlnaHQgPSB0aGlzLiRlbGVtZW50LmhlaWdodCgpO1xuICAgICAgICAgICAgdGhpcy5zZXRTaXplKHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9O1xuICAgICAgICAvKipcbiAgICAgICAgICogQG92ZXJyaWRkZW4gRGlzcGxheU9iamVjdENvbnRhaW5lci5hZGRDaGlsZFxuICAgICAgICAgKiBAbWV0aG9kIGFkZENoaWxkXG4gICAgICAgICAqIEBwYXJhbSBjaGlsZCB7RE9NRWxlbWVudH0gVGhlIERPTUVsZW1lbnQgaW5zdGFuY2UgdG8gYWRkIGFzIGEgY2hpbGQgb2YgdGhpcyBvYmplY3QgaW5zdGFuY2UuXG4gICAgICAgICAqIEByZXR1cm5zIHthbnl9IFJldHVybnMgYW4gaW5zdGFuY2Ugb2YgaXRzZWxmLlxuICAgICAgICAgKiBAY2hhaW5hYmxlXG4gICAgICAgICAqIEBleGFtcGxlXG4gICAgICAgICAqICAgICB0aGlzLmFkZENoaWxkKGRvbUVsZW1lbnRJbnN0YW5jZSk7XG4gICAgICAgICAqL1xuICAgICAgICBET01FbGVtZW50LnByb3RvdHlwZS5hZGRDaGlsZCA9IGZ1bmN0aW9uIChjaGlsZCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuJGVsZW1lbnQgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignWycgKyB0aGlzLmdldFF1YWxpZmllZENsYXNzTmFtZSgpICsgJ10gWW91IGNhbm5vdCB1c2UgdGhlIGFkZENoaWxkIG1ldGhvZCBpZiB0aGUgcGFyZW50IG9iamVjdCBpcyBub3QgYWRkZWQgdG8gdGhlIERPTS4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF9zdXBlci5wcm90b3R5cGUuYWRkQ2hpbGQuY2FsbCh0aGlzLCBjaGlsZCk7XG4gICAgICAgICAgICAvLyBJZiBhbiBlbXB0eSBqUXVlcnkgb2JqZWN0IGlzIHBhc3NlZCBpbnRvIHRoZSBjb25zdHJ1Y3RvciB0aGVuIGRvbid0IHJ1biB0aGUgY29kZSBiZWxvdy5cbiAgICAgICAgICAgIGlmIChjaGlsZC5faXNSZWZlcmVuY2UgPT09IHRydWUgJiYgY2hpbGQuJGVsZW1lbnQubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoY2hpbGQuaXNDcmVhdGVkID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgIGNoaWxkLmNyZWF0ZSgpOyAvLyBSZW5kZXIgdGhlIGl0ZW0gYmVmb3JlIGFkZGluZyB0byB0aGUgRE9NXG4gICAgICAgICAgICAgICAgY2hpbGQuaXNDcmVhdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIElmIHRoZSBjaGlsZCBvYmplY3QgaXMgbm90IGEgcmVmZXJlbmNlIG9mIGEgalF1ZXJ5IG9iamVjdCBpbiB0aGUgRE9NIHRoZW4gYXBwZW5kIGl0LlxuICAgICAgICAgICAgaWYgKGNoaWxkLl9pc1JlZmVyZW5jZSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICB0aGlzLiRlbGVtZW50LmFwcGVuZChjaGlsZC4kZWxlbWVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl9vbkFkZGVkVG9Eb20oY2hpbGQpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH07XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBBZGRzIHRoZSBzanNJZCB0byB0aGUgRE9NIGVsZW1lbnQgc28gd2UgY2FuIGtub3cgd2hhdCB3aGF0IENsYXNzIG9iamVjdCB0aGUgSFRNTEVsZW1lbnQgYmVsb25ncyB0b28uXG4gICAgICAgICAqXG4gICAgICAgICAqIEBtZXRob2QgX2FkZENsaWVudFNpZGVJZFxuICAgICAgICAgKiBAcGFyYW0gY2hpbGQge0RPTUVsZW1lbnR9IFRoZSBET01FbGVtZW50IGluc3RhbmNlIHRvIGFkZCB0aGUgc2pzSWQgdG9vLlxuICAgICAgICAgKiBAcHJvdGVjdGVkXG4gICAgICAgICAqL1xuICAgICAgICBET01FbGVtZW50LnByb3RvdHlwZS5fYWRkQ2xpZW50U2lkZUlkID0gZnVuY3Rpb24gKGNoaWxkKSB7XG4gICAgICAgICAgICB2YXIgdHlwZSA9IGNoaWxkLiRlbGVtZW50LmF0dHIoJ2RhdGEtc2pzLXR5cGUnKTtcbiAgICAgICAgICAgIHZhciBpZCA9IGNoaWxkLiRlbGVtZW50LmF0dHIoJ2RhdGEtc2pzLWlkJyk7XG4gICAgICAgICAgICBpZiAodHlwZSA9PT0gdm9pZCAwKSB7XG4gICAgICAgICAgICAgICAgLy8gTWFrZSB0aGVtIGFycmF5J3Mgc28gdGhlIGpvaW4gbWV0aG9kIHdpbGwgd29yay5cbiAgICAgICAgICAgICAgICB0eXBlID0gW2NoaWxkLmdldFF1YWxpZmllZENsYXNzTmFtZSgpXTtcbiAgICAgICAgICAgICAgICBpZCA9IFtjaGlsZC5zanNJZF07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBTcGxpdCB0aGVtIHNvIHdlIGNhbiBwdXNoL2FkZCB0aGUgbmV3IHZhbHVlcy5cbiAgICAgICAgICAgICAgICB0eXBlID0gdHlwZS5zcGxpdCgnLCcpO1xuICAgICAgICAgICAgICAgIGlkID0gaWQuc3BsaXQoJywnKTtcbiAgICAgICAgICAgICAgICB0eXBlLnB1c2goY2hpbGQuZ2V0UXVhbGlmaWVkQ2xhc3NOYW1lKCkpO1xuICAgICAgICAgICAgICAgIGlkLnB1c2goY2hpbGQuc2pzSWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gVXBkYXRlZCBsaXN0IG9mIGlkJ3MgYW5kIHR5cGVzXG4gICAgICAgICAgICBjaGlsZC4kZWxlbWVudC5hdHRyKCdkYXRhLXNqcy1pZCcsIGlkLmpvaW4oJywnKSk7XG4gICAgICAgICAgICBjaGlsZC4kZWxlbWVudC5hdHRyKCdkYXRhLXNqcy10eXBlJywgdHlwZS5qb2luKCcsJykpO1xuICAgICAgICB9O1xuICAgICAgICAvKipcbiAgICAgICAgICogUmVtb3ZlcyB0aGUgc2pzSWQgYW5kIGNsYXNzIHR5cGUgZnJvbSB0aGUgSFRNTEVsZW1lbnQuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBtZXRob2QgX3JlbW92ZUNsaWVudFNpZGVJZFxuICAgICAgICAgKiBAcGFyYW0gY2hpbGQge0RPTUVsZW1lbnR9IFRoZSBET01FbGVtZW50IGluc3RhbmNlIHRvIGFkZCB0aGUgc2pzSWQgdG9vLlxuICAgICAgICAgKiBAcHJvdGVjdGVkXG4gICAgICAgICAqIEByZXR1cm4ge2Jvb2xlYW59XG4gICAgICAgICAqL1xuICAgICAgICBET01FbGVtZW50LnByb3RvdHlwZS5fcmVtb3ZlQ2xpZW50U2lkZUlkID0gZnVuY3Rpb24gKGNoaWxkKSB7XG4gICAgICAgICAgICB2YXIgdHlwZSA9IGNoaWxkLiRlbGVtZW50LmF0dHIoJ2RhdGEtc2pzLXR5cGUnKTtcbiAgICAgICAgICAgIHZhciBpZCA9IGNoaWxkLiRlbGVtZW50LmF0dHIoJ2RhdGEtc2pzLWlkJyk7XG4gICAgICAgICAgICAvLyBTcGxpdCB0aGVtIHNvIHdlIGNhbiByZW1vdmUgdGhlIGNoaWxkIHNqc0lkIGFuZCB0eXBlLlxuICAgICAgICAgICAgdmFyIHR5cGVMaXN0ID0gdHlwZS5zcGxpdCgnLCcpO1xuICAgICAgICAgICAgdmFyIGlkTGlzdCA9IGlkLnNwbGl0KCcsJykubWFwKE51bWJlcik7IC8vIENvbnZlcnQgZWFjaCBpdGVtIGludG8gYSBudW1iZXIuXG4gICAgICAgICAgICB2YXIgaW5kZXggPSBpZExpc3QuaW5kZXhPZihjaGlsZC5zanNJZCk7XG4gICAgICAgICAgICBpZiAoaW5kZXggPiAtMSkge1xuICAgICAgICAgICAgICAgIC8vIFJlbW92ZSB0aGUgaWQgYW5kIHR5cGUgZnJvbSB0aGUgYXJyYXkuXG4gICAgICAgICAgICAgICAgdHlwZUxpc3Quc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgICAgICAgICBpZExpc3Quc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgICAgICAgICAvLyBVcGRhdGVkIGxpc3Qgb2YgaWQncyBhbmQgdHlwZXNcbiAgICAgICAgICAgICAgICBjaGlsZC4kZWxlbWVudC5hdHRyKCdkYXRhLXNqcy10eXBlJywgdHlwZUxpc3Quam9pbignLCcpKTtcbiAgICAgICAgICAgICAgICBjaGlsZC4kZWxlbWVudC5hdHRyKCdkYXRhLXNqcy1pZCcsIGlkTGlzdC5qb2luKCcsJykpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGlkTGlzdC5sZW5ndGggPT09IDA7XG4gICAgICAgIH07XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDYWxsZWQgd2hlbiB0aGUgY2hpbGQgb2JqZWN0IGlzIGFkZGVkIHRvIHRoZSBET00uXG4gICAgICAgICAqIFRoZSBtZXRob2Qgd2lsbCBjYWxsIHt7I2Nyb3NzTGluayBcIkRPTUVsZW1lbnQvbGF5b3V0Om1ldGhvZFwifX17ey9jcm9zc0xpbmt9fSBhbmQgZGlzcGF0Y2ggdGhlIEJhc2VFdmVudC5BRERFRF9UT19TVEFHRSBldmVudC5cbiAgICAgICAgICpcbiAgICAgICAgICogQG1ldGhvZCBfb25BZGRlZFRvRG9tXG4gICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICovXG4gICAgICAgIERPTUVsZW1lbnQucHJvdG90eXBlLl9vbkFkZGVkVG9Eb20gPSBmdW5jdGlvbiAoY2hpbGQpIHtcbiAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgICAgICBjaGlsZC5jaGVja0NvdW50Kys7XG4gICAgICAgICAgICBpZiAoY2hpbGQuJGVsZW1lbnQud2lkdGgoKSA9PT0gMCAmJiBjaGlsZC5jaGVja0NvdW50IDwgNSkge1xuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBfdGhpcy5fb25BZGRlZFRvRG9tKGNoaWxkKTtcbiAgICAgICAgICAgICAgICB9LCAxMDApO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuX2FkZENsaWVudFNpZGVJZChjaGlsZCk7XG4gICAgICAgICAgICBjaGlsZC53aWR0aCA9IGNoaWxkLiRlbGVtZW50LndpZHRoKCk7XG4gICAgICAgICAgICBjaGlsZC5oZWlnaHQgPSBjaGlsZC4kZWxlbWVudC5oZWlnaHQoKTtcbiAgICAgICAgICAgIGNoaWxkLnNldFNpemUoY2hpbGQud2lkdGgsIGNoaWxkLmhlaWdodCk7XG4gICAgICAgICAgICBjaGlsZC5lbmFibGUoKTtcbiAgICAgICAgICAgIGNoaWxkLmxheW91dCgpO1xuICAgICAgICAgICAgY2hpbGQuZGlzcGF0Y2hFdmVudChuZXcgQmFzZUV2ZW50XzEuZGVmYXVsdChCYXNlRXZlbnRfMS5kZWZhdWx0LkFEREVEX1RPX1NUQUdFKSk7XG4gICAgICAgIH07XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAb3ZlcnJpZGRlbiBEaXNwbGF5T2JqZWN0Q29udGFpbmVyLmFkZENoaWxkQXRcbiAgICAgICAgICovXG4gICAgICAgIERPTUVsZW1lbnQucHJvdG90eXBlLmFkZENoaWxkQXQgPSBmdW5jdGlvbiAoY2hpbGQsIGluZGV4KSB7XG4gICAgICAgICAgICB2YXIgY2hpbGRyZW4gPSB0aGlzLiRlbGVtZW50LmNoaWxkcmVuKCk7XG4gICAgICAgICAgICB2YXIgbGVuZ3RoID0gY2hpbGRyZW4ubGVuZ3RoO1xuICAgICAgICAgICAgLy8gSWYgYW4gZW1wdHkgalF1ZXJ5IG9iamVjdCBpcyBwYXNzZWQgaW50byB0aGUgY29uc3RydWN0b3IgdGhlbiBkb24ndCBydW4gdGhlIGNvZGUgYmVsb3cuXG4gICAgICAgICAgICBpZiAoY2hpbGQuX2lzUmVmZXJlbmNlID09PSB0cnVlICYmIGNoaWxkLiRlbGVtZW50Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGluZGV4IDwgMCB8fCBpbmRleCA+PSBsZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAvLyBJZiB0aGUgaW5kZXggcGFzc2VkIGluIGlzIGxlc3MgdGhhbiAwIGFuZCBncmVhdGVyIHRoYW4gdGhlIHRvdGFsIG51bWJlciBvZiBjaGlsZHJlbiB0aGVuIHBsYWNlIHRoZSBpdGVtIGF0IHRoZSBlbmQuXG4gICAgICAgICAgICAgICAgdGhpcy5hZGRDaGlsZChjaGlsZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBFbHNlIGdldCB0aGUgY2hpbGQgaW4gdGhlIGNoaWxkcmVuIGFycmF5IGJ5IHRoZSBpbmRleCBwYXNzZWQgaW4gYW5kIHBsYWNlIHRoZSBpdGVtIGJlZm9yZSB0aGF0IGNoaWxkLlxuICAgICAgICAgICAgICAgIGlmIChjaGlsZC5pc0NyZWF0ZWQgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNoaWxkLmNyZWF0ZSgpOyAvLyBSZW5kZXIgdGhlIGl0ZW0gYmVmb3JlIGFkZGluZyB0byB0aGUgRE9NXG4gICAgICAgICAgICAgICAgICAgIGNoaWxkLmlzQ3JlYXRlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIEFkZHMgdGhlIGNoaWxkIGF0IGEgc3BlY2lmaWMgaW5kZXggYnV0IGFsc28gd2lsbCByZW1vdmUgdGhlIGNoaWxkIGZyb20gYW5vdGhlciBwYXJlbnQgb2JqZWN0IGlmIG9uZSBleGlzdHMuXG4gICAgICAgICAgICAgICAgaWYgKGNoaWxkLnBhcmVudCkge1xuICAgICAgICAgICAgICAgICAgICBjaGlsZC5wYXJlbnQucmVtb3ZlQ2hpbGQoY2hpbGQsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5jaGlsZHJlbi5zcGxpY2UoaW5kZXgsIDAsIGNoaWxkKTtcbiAgICAgICAgICAgICAgICB0aGlzLm51bUNoaWxkcmVuID0gdGhpcy5jaGlsZHJlbi5sZW5ndGg7XG4gICAgICAgICAgICAgICAgY2hpbGQucGFyZW50ID0gdGhpcztcbiAgICAgICAgICAgICAgICAvLyBBZGRzIHRoZSBjaGlsZCBiZWZvcmUgYW55IGNoaWxkIGFscmVhZHkgYWRkZWQgaW4gdGhlIERPTS5cbiAgICAgICAgICAgICAgICBqcXVlcnlfZXZlbnRMaXN0ZW5lcl8xLmRlZmF1bHQoY2hpbGRyZW4uZ2V0KGluZGV4KSkuYmVmb3JlKGNoaWxkLiRlbGVtZW50KTtcbiAgICAgICAgICAgICAgICB0aGlzLl9vbkFkZGVkVG9Eb20oY2hpbGQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH07XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAb3ZlcnJpZGRlbiBEaXNwbGF5T2JqZWN0Q29udGFpbmVyLnN3YXBDaGlsZHJlblxuICAgICAgICAgKi9cbiAgICAgICAgRE9NRWxlbWVudC5wcm90b3R5cGUuc3dhcENoaWxkcmVuID0gZnVuY3Rpb24gKGNoaWxkMSwgY2hpbGQyKSB7XG4gICAgICAgICAgICB2YXIgY2hpbGQxSW5kZXggPSBjaGlsZDEuJGVsZW1lbnQuaW5kZXgoKTtcbiAgICAgICAgICAgIHZhciBjaGlsZDJJbmRleCA9IGNoaWxkMi4kZWxlbWVudC5pbmRleCgpO1xuICAgICAgICAgICAgdGhpcy5hZGRDaGlsZEF0KGNoaWxkMSwgY2hpbGQySW5kZXgpO1xuICAgICAgICAgICAgdGhpcy5hZGRDaGlsZEF0KGNoaWxkMiwgY2hpbGQxSW5kZXgpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH07XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAb3ZlcnJpZGRlbiBEaXNwbGF5T2JqZWN0Q29udGFpbmVyLmdldENoaWxkQXRcbiAgICAgICAgICovXG4gICAgICAgIERPTUVsZW1lbnQucHJvdG90eXBlLmdldENoaWxkQXQgPSBmdW5jdGlvbiAoaW5kZXgpIHtcbiAgICAgICAgICAgIHJldHVybiBfc3VwZXIucHJvdG90eXBlLmdldENoaWxkQXQuY2FsbCh0aGlzLCBpbmRleCk7XG4gICAgICAgIH07XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBSZXR1cm5zIGEgRE9NRWxlbWVudCBvYmplY3Qgd2l0aCB0aGUgZmlyc3QgZm91bmQgRE9NIGVsZW1lbnQgYnkgdGhlIHBhc3NlZCBpbiBzZWxlY3Rvci5cbiAgICAgICAgICpcbiAgICAgICAgICogQG1ldGhvZCBnZXRDaGlsZFxuICAgICAgICAgKiBAcGFyYW0gc2VsZWN0b3Ige3N0cmluZ30gRE9NIGlkIG5hbWUsIERPTSBjbGFzcyBuYW1lIG9yIGEgRE9NIHRhZyBuYW1lLlxuICAgICAgICAgKiBAcmV0dXJucyB7RE9NRWxlbWVudH1cbiAgICAgICAgICogQHB1YmxpY1xuICAgICAgICAgKi9cbiAgICAgICAgRE9NRWxlbWVudC5wcm90b3R5cGUuZ2V0Q2hpbGQgPSBmdW5jdGlvbiAoc2VsZWN0b3IpIHtcbiAgICAgICAgICAgIC8vIEdldCB0aGUgZmlyc3QgbWF0Y2ggZnJvbSB0aGUgc2VsZWN0b3IgcGFzc2VkIGluLlxuICAgICAgICAgICAgdmFyIGpRdWVyeUVsZW1lbnQgPSB0aGlzLiRlbGVtZW50LmZpbmQoc2VsZWN0b3IpLmZpcnN0KCk7XG4gICAgICAgICAgICBpZiAoalF1ZXJ5RWxlbWVudC5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdbJyArIHRoaXMuZ2V0UXVhbGlmaWVkQ2xhc3NOYW1lKCkgKyAnXSBnZXRDaGlsZCgnICsgc2VsZWN0b3IgKyAnKSBDYW5ub3QgZmluZCBET00gJGVsZW1lbnQnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIENoZWNrIHRvIHNlZSBpZiB0aGUgZWxlbWVudCBoYXMgYSBzanNJZCB2YWx1ZSBhbmQgaXMgYSBjaGlsZCBvZiB0aGlzIHBhcmVudCBvYmplY3QuXG4gICAgICAgICAgICB2YXIgc2pzSWQgPSBwYXJzZUludChqUXVlcnlFbGVtZW50LmF0dHIoJ2RhdGEtc2pzLWlkJykpO1xuICAgICAgICAgICAgdmFyIGRvbUVsZW1lbnQgPSB0aGlzLmdldENoaWxkQnlDaWQoc2pzSWQpO1xuICAgICAgICAgICAgLy8gQ3JlYXRlcyBhIERPTUVsZW1lbnQgZnJvbSB0aGUgalF1ZXJ5RWxlbWVudC5cbiAgICAgICAgICAgIGlmIChkb21FbGVtZW50ID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAvLyBDcmVhdGUgYSBuZXcgRE9NRWxlbWVudCBhbmQgYXNzaWduIHRoZSBqUXVlcnkgZWxlbWVudCB0byBpdC5cbiAgICAgICAgICAgICAgICBkb21FbGVtZW50ID0gbmV3IERPTUVsZW1lbnQoKTtcbiAgICAgICAgICAgICAgICBkb21FbGVtZW50LiRlbGVtZW50ID0galF1ZXJ5RWxlbWVudDtcbiAgICAgICAgICAgICAgICB0aGlzLl9hZGRDbGllbnRTaWRlSWQoZG9tRWxlbWVudCk7XG4gICAgICAgICAgICAgICAgZG9tRWxlbWVudC5lbGVtZW50ID0galF1ZXJ5RWxlbWVudFswXTtcbiAgICAgICAgICAgICAgICBkb21FbGVtZW50LmlzQ3JlYXRlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgLy8gQWRkZWQgdG8gdGhlIHN1cGVyIGFkZENoaWxkIG1ldGhvZCBiZWNhdXNlIHdlIGRvbid0IG5lZWQgdG8gYXBwZW5kIHRoZSBlbGVtZW50IHRvIHRoZSBET00uXG4gICAgICAgICAgICAgICAgLy8gQXQgdGhpcyBwb2ludCBpdCBhbHJlYWR5IGV4aXN0cyBhbmQgd2UgYXJlIGp1c3QgZ2V0dGluZyBhIHJlZmVyZW5jZSB0byB0aGUgRE9NIGVsZW1lbnQuXG4gICAgICAgICAgICAgICAgX3N1cGVyLnByb3RvdHlwZS5hZGRDaGlsZC5jYWxsKHRoaXMsIGRvbUVsZW1lbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGRvbUVsZW1lbnQ7XG4gICAgICAgIH07XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBHZXRzIGFsbCB0aGUgSFRNTCBlbGVtZW50cyBjaGlsZHJlbiBvZiB0aGlzIG9iamVjdC5cbiAgICAgICAgICpcbiAgICAgICAgICogQG1ldGhvZCBnZXRDaGlsZHJlblxuICAgICAgICAgKiBAcGFyYW0gW3NlbGVjdG9yXSB7c3RyaW5nfSBZb3UgY2FuIHBhc3MgaW4gYW55IHR5cGUgb2YgalF1ZXJ5IHNlbGVjdG9yLiBJZiB0aGVyZSBpcyBubyBzZWxlY3RvciBwYXNzZWQgaW4gaXQgd2lsbCBnZXQgYWxsIHRoZSBjaGlsZHJlbiBvZiB0aGlzIHBhcmVudCBlbGVtZW50LlxuICAgICAgICAgKiBAcmV0dXJucyB7QXJyYXkuPERPTUVsZW1lbnQ+fSBSZXR1cm5zIGEgbGlzdCBvZiBET01FbGVtZW50J3MuIEl0IHdpbGwgZ3JhYiBhbGwgY2hpbGRyZW4gSFRNTCBET00gZWxlbWVudHMgb2YgdGhpcyBvYmplY3QgYW5kIHdpbGwgY3JlYXRlIGEgRE9NRWxlbWVudCBmb3IgZWFjaCBET00gY2hpbGQuXG4gICAgICAgICAqIElmIHRoZSAnZGF0YS1zanMtaWQnIHByb3BlcnR5IGV4aXN0cyBpcyBvbiBhbiBIVE1MIGVsZW1lbnQgYSBET01FbGVtZW50IHdpbGwgbm90IGJlIGNyZWF0ZWQgZm9yIHRoYXQgZWxlbWVudCBiZWNhdXNlIGl0IHdpbGwgYmUgYXNzdW1lZCBpdCBhbHJlYWR5IGV4aXN0cyBhcyBhIERPTUVsZW1lbnQuXG4gICAgICAgICAqIEBwdWJsaWNcbiAgICAgICAgICovXG4gICAgICAgIERPTUVsZW1lbnQucHJvdG90eXBlLmdldENoaWxkcmVuID0gZnVuY3Rpb24gKHNlbGVjdG9yKSB7XG4gICAgICAgICAgICBpZiAoc2VsZWN0b3IgPT09IHZvaWQgMCkgeyBzZWxlY3RvciA9ICcnOyB9XG4gICAgICAgICAgICAvL1RPRE86IE1ha2Ugc3VyZSB0aGUgaW5kZXggb2YgdGhlIGNoaWxkcmVuIGFkZGVkIGlzIHRoZSBzYW1lIGFzIHRoZSB3aGF0IGlzIGluIHRoZSBhY3R1YWwgRE9NLlxuICAgICAgICAgICAgdmFyICRjaGlsZDtcbiAgICAgICAgICAgIHZhciBkb21FbGVtZW50O1xuICAgICAgICAgICAgdmFyICRsaXN0ID0gdGhpcy4kZWxlbWVudC5jaGlsZHJlbihzZWxlY3Rvcik7XG4gICAgICAgICAgICB2YXIgbGlzdExlbmd0aCA9ICRsaXN0Lmxlbmd0aDtcbiAgICAgICAgICAgIGZvciAodmFyIGlfMSA9IDA7IGlfMSA8IGxpc3RMZW5ndGg7IGlfMSsrKSB7XG4gICAgICAgICAgICAgICAgJGNoaWxkID0gJGxpc3QuZXEoaV8xKTtcbiAgICAgICAgICAgICAgICAvLyBJZiB0aGUgalF1ZXJ5IGVsZW1lbnQgYWxyZWFkeSBoYXMgc2pzSWQgZGF0YSBwcm9wZXJ0eSB0aGVuIGl0IG11c3QgYmUgYW4gZXhpc3RpbmcgRGlzcGxheU9iamVjdENvbnRhaW5lciAoRE9NRWxlbWVudCkgaW4gdGhlIGNoaWxkcmVuIGFycmF5LlxuICAgICAgICAgICAgICAgIGlmICgkY2hpbGQuYXR0cignZGF0YS1zanMtaWQnKSA9PT0gdm9pZCAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGRvbUVsZW1lbnQgPSBuZXcgRE9NRWxlbWVudCgpO1xuICAgICAgICAgICAgICAgICAgICBkb21FbGVtZW50LiRlbGVtZW50ID0gJGNoaWxkO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9hZGRDbGllbnRTaWRlSWQoZG9tRWxlbWVudCk7XG4gICAgICAgICAgICAgICAgICAgIGRvbUVsZW1lbnQuZWxlbWVudCA9ICRjaGlsZC5nZXQoMCk7XG4gICAgICAgICAgICAgICAgICAgIGRvbUVsZW1lbnQuaXNDcmVhdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgLy8gQWRkZWQgdG8gdGhlIHN1cGVyIGFkZENoaWxkIG1ldGhvZCBiZWNhdXNlIHdlIGRvbid0IG5lZWQgdG8gYXBwZW5kIHRoZSBlbGVtZW50IHRvIHRoZSBET00uXG4gICAgICAgICAgICAgICAgICAgIC8vIEF0IHRoaXMgcG9pbnQgaXQgYWxyZWFkeSBleGlzdHMgYW5kIHdlIGFyZSBqdXN0IGdldHRpbmcgYSByZWZlcmVuY2UgdG8gdGhlIERPTSBlbGVtZW50LlxuICAgICAgICAgICAgICAgICAgICBfc3VwZXIucHJvdG90eXBlLmFkZENoaWxkLmNhbGwodGhpcywgZG9tRWxlbWVudCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2hpbGRyZW47XG4gICAgICAgIH07XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBSZW1vdmVzIHRoZSBzcGVjaWZpZWQgY2hpbGQgb2JqZWN0IGluc3RhbmNlIGZyb20gdGhlIGNoaWxkIGxpc3Qgb2YgdGhlIHBhcmVudCBvYmplY3QgaW5zdGFuY2UuXG4gICAgICAgICAqIFRoZSBwYXJlbnQgcHJvcGVydHkgb2YgdGhlIHJlbW92ZWQgY2hpbGQgaXMgc2V0IHRvIG51bGwgYW5kIHRoZSBvYmplY3QgaXMgZ2FyYmFnZSBjb2xsZWN0ZWQgaWYgdGhlcmUgYXJlIG5vIG90aGVyIHJlZmVyZW5jZXNcbiAgICAgICAgICogdG8gdGhlIGNoaWxkLiBUaGUgaW5kZXggcG9zaXRpb25zIG9mIGFueSBvYmplY3RzIGFib3ZlIHRoZSBjaGlsZCBpbiB0aGUgcGFyZW50IG9iamVjdCBhcmUgZGVjcmVhc2VkIGJ5IDEuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBtZXRob2QgcmVtb3ZlQ2hpbGRcbiAgICAgICAgICogQHBhcmFtIGNoaWxkIHtET01FbGVtZW50fSBUaGUgRGlzcGxheU9iamVjdENvbnRhaW5lciBpbnN0YW5jZSB0byByZW1vdmUuXG4gICAgICAgICAqIEByZXR1cm5zIHthbnl9IFJldHVybnMgYW4gaW5zdGFuY2Ugb2YgaXRzZWxmLlxuICAgICAgICAgKiBAb3ZlcnJpZGVcbiAgICAgICAgICogQHB1YmxpY1xuICAgICAgICAgKiBAY2hhaW5hYmxlXG4gICAgICAgICAqL1xuICAgICAgICBET01FbGVtZW50LnByb3RvdHlwZS5yZW1vdmVDaGlsZCA9IGZ1bmN0aW9uIChjaGlsZCwgZGVzdHJveSkge1xuICAgICAgICAgICAgaWYgKGRlc3Ryb3kgPT09IHZvaWQgMCkgeyBkZXN0cm95ID0gdHJ1ZTsgfVxuICAgICAgICAgICAgdmFyIHJlbW92ZSA9IHRoaXMuX3JlbW92ZUNsaWVudFNpZGVJZChjaGlsZCk7XG4gICAgICAgICAgICBjaGlsZC5kaXNhYmxlKCk7XG4gICAgICAgICAgICAvLyBDaGVja3MgaWYgZGVzdHJveSB3YXMgY2FsbGVkIGJlZm9yZSByZW1vdmVDaGlsZCBzbyBpdCBkb2Vzbid0IGVycm9yLlxuICAgICAgICAgICAgaWYgKHJlbW92ZSA9PT0gdHJ1ZSAmJiBjaGlsZC4kZWxlbWVudCAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgY2hpbGQuJGVsZW1lbnQudW5iaW5kKCk7XG4gICAgICAgICAgICAgICAgY2hpbGQuJGVsZW1lbnQucmVtb3ZlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZGVzdHJveSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIGNoaWxkLmRlc3Ryb3koKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF9zdXBlci5wcm90b3R5cGUucmVtb3ZlQ2hpbGQuY2FsbCh0aGlzLCBjaGlsZCk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFJlbW92ZXMgdGhlIGNoaWxkIGRpc3BsYXkgb2JqZWN0IGluc3RhbmNlIHRoYXQgZXhpc3RzIGF0IHRoZSBzcGVjaWZpZWQgaW5kZXguXG4gICAgICAgICAqXG4gICAgICAgICAqIEBtZXRob2QgcmVtb3ZlQ2hpbGRBdFxuICAgICAgICAgKiBAcGFyYW0gaW5kZXgge2ludH0gVGhlIGluZGV4IHBvc2l0aW9uIG9mIHRoZSBjaGlsZCBvYmplY3QuXG4gICAgICAgICAqIEBwdWJsaWNcbiAgICAgICAgICogQGNoYWluYWJsZVxuICAgICAgICAgKi9cbiAgICAgICAgRE9NRWxlbWVudC5wcm90b3R5cGUucmVtb3ZlQ2hpbGRBdCA9IGZ1bmN0aW9uIChpbmRleCwgZGVzdHJveSkge1xuICAgICAgICAgICAgaWYgKGRlc3Ryb3kgPT09IHZvaWQgMCkgeyBkZXN0cm95ID0gdHJ1ZTsgfVxuICAgICAgICAgICAgdGhpcy5yZW1vdmVDaGlsZCh0aGlzLmdldENoaWxkQXQoaW5kZXgpLCBkZXN0cm95KTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9O1xuICAgICAgICAvKipcbiAgICAgICAgICogUmVtb3ZlcyBhbGwgY2hpbGQgb2JqZWN0IGluc3RhbmNlcyBmcm9tIHRoZSBjaGlsZCBsaXN0IG9mIHRoZSBwYXJlbnQgb2JqZWN0IGluc3RhbmNlLlxuICAgICAgICAgKiBUaGUgcGFyZW50IHByb3BlcnR5IG9mIHRoZSByZW1vdmVkIGNoaWxkcmVuIGlzIHNldCB0byBudWxsIGFuZCB0aGUgb2JqZWN0cyBhcmUgZ2FyYmFnZSBjb2xsZWN0ZWQgaWYgbm8gb3RoZXJcbiAgICAgICAgICogcmVmZXJlbmNlcyB0byB0aGUgY2hpbGRyZW4gZXhpc3QuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBtZXRob2QgcmVtb3ZlQ2hpbGRyZW5cbiAgICAgICAgICogQHJldHVybnMge0RPTUVsZW1lbnR9IFJldHVybnMgYW4gaW5zdGFuY2Ugb2YgaXRzZWxmLlxuICAgICAgICAgKiBAb3ZlcnJpZGVcbiAgICAgICAgICogQHB1YmxpY1xuICAgICAgICAgKiBAY2hhaW5hYmxlXG4gICAgICAgICAqL1xuICAgICAgICBET01FbGVtZW50LnByb3RvdHlwZS5yZW1vdmVDaGlsZHJlbiA9IGZ1bmN0aW9uIChkZXN0cm95KSB7XG4gICAgICAgICAgICBpZiAoZGVzdHJveSA9PT0gdm9pZCAwKSB7IGRlc3Ryb3kgPSB0cnVlOyB9XG4gICAgICAgICAgICB3aGlsZSAodGhpcy5jaGlsZHJlbi5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVDaGlsZCh0aGlzLmNoaWxkcmVuLnBvcCgpLCBkZXN0cm95KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuJGVsZW1lbnQuZW1wdHkoKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9O1xuICAgICAgICAvKipcbiAgICAgICAgICogQG92ZXJyaWRkZW4gRGlzcGxheU9iamVjdENvbnRhaW5lci5kZXN0cm95XG4gICAgICAgICAqL1xuICAgICAgICBET01FbGVtZW50LnByb3RvdHlwZS5kZXN0cm95ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgLy8gTm90ZTogd2UgY2FuJ3QganVzdCBjYWxsIGRlc3Ryb3kgdG8gcmVtb3ZlIHRoZSBIVE1MRWxlbWVudCBiZWNhdXNlIHRoZXJlIGNvdWxkIGJlIG90aGVyIHZpZXdzIG1hbmFnaW5nIHRoZSBzYW1lIEhUTUxFbGVtZW50LlxuICAgICAgICAgICAgLyppZiAodGhpcy4kZWxlbWVudCAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgIHRoaXMuJGVsZW1lbnQudW5iaW5kKCk7XG4gICAgICAgICAgICAgICAgIHRoaXMuJGVsZW1lbnQucmVtb3ZlKCk7XG4gICAgICAgICAgICAgfSovXG4gICAgICAgICAgICBfc3VwZXIucHJvdG90eXBlLmRlc3Ryb3kuY2FsbCh0aGlzKTtcbiAgICAgICAgfTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEEgd2F5IHRvIGluc3RhbnRpYXRlIHZpZXcgY2xhc3NlcyBieSBmb3VuZCBodG1sIHNlbGVjdG9ycy5cbiAgICAgICAgICpcbiAgICAgICAgICogRXhhbXBsZTogSXQgd2lsbCBmaW5kIGFsbCBjaGlsZHJlbiBlbGVtZW50cyBvZiB0aGUge3sjY3Jvc3NMaW5rIFwiRE9NRWxlbWVudC8kZWxlbWVudDpwcm9wZXJ0eVwifX17ey9jcm9zc0xpbmt9fSBwcm9wZXJ0eSB3aXRoIHRoZSAnanMtc2hhcmVFbWFpbCcgc2VsZWN0b3IuXG4gICAgICAgICAqIElmIGFueSBzZWxlY3RvcnMgYXJlIGZvdW5kIHRoZSBFbWFpbFNoYXJlQ29tcG9uZW50IGNsYXNzIHdpbGwgYmUgaW5zdGFudGlhdGVkIGFuZCBwYXNzIHRoZSBmb3VuZCBqUXVlcnkgZWxlbWVudCBpbnRvIHRoZSBjb250cnVjdG9yLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAbWV0aG9kIGNyZWF0ZUNvbXBvbmVudHNcbiAgICAgICAgICogQHBhcmFtIGNvbXBvbmVudExpc3QgKEFycmF5Ljx7IHNlbGVjdG9yOiBzdHJpbmc7IGNvbXBvbmVudDogRE9NRWxlbWVudCB9PlxuICAgICAgICAgKiBAcmV0dXJuIHtBcnJheS48RE9NRWxlbWVudD59IFJldHVybnMgYWxsIHRoZSBpdGVtcyBjcmVhdGVkIGZyb20gdGhpcyBjcmVhdGVDb21wb25lbnRzIG1ldGhvZC5cbiAgICAgICAgICogQHB1YmxpY1xuICAgICAgICAgKiBAY2hhaW5hYmxlXG4gICAgICAgICAqIEBleGFtcGxlXG4gICAgICAgICAqICAgICAgY3JlYXRlKCkge1xuICAgICAgICAgKiAgICAgICAgICBzdXBlci5jcmVhdGUoKTtcbiAgICAgICAgICpcbiAgICAgICAgICogICAgICAgICAgdGhpcy5jcmVhdGVDb21wb25lbnRzKFtcbiAgICAgICAgICogICAgICAgICAgICAgIHtzZWxlY3RvcjogJy5qcy1zaGFyZUVtYWlsJywgY29tcG9uZW50OiBFbWFpbFNoYXJlQ29tcG9uZW50fSxcbiAgICAgICAgICogICAgICAgICAgICAgIHtzZWxlY3RvcjogJy5qcy1wYWdpbmF0aW9uJywgY29tcG9uZW50OiBQYWdpbmF0aW9uQ29tcG9uZW50fSxcbiAgICAgICAgICogICAgICAgICAgICAgIHtzZWxlY3RvcjogJy5qcy1jYXJvdXNlbCcsIGNvbXBvbmVudDogQ2Fyb3VzZWxDb21wb25lbnR9XG4gICAgICAgICAqICAgICAgICAgIF0pO1xuICAgICAgICAgKiAgICAgIH1cbiAgICAgICAgICovXG4gICAgICAgIERPTUVsZW1lbnQucHJvdG90eXBlLmNyZWF0ZUNvbXBvbmVudHMgPSBmdW5jdGlvbiAoY29tcG9uZW50TGlzdCkge1xuICAgICAgICAgICAgdmFyIGxpc3Q7XG4gICAgICAgICAgICB2YXIgY3JlYXRlZENoaWxkcmVuID0gW107XG4gICAgICAgICAgICB2YXIgbGVuZ3RoID0gY29tcG9uZW50TGlzdC5sZW5ndGg7XG4gICAgICAgICAgICB2YXIgb2JqO1xuICAgICAgICAgICAgZm9yICh2YXIgaV8yID0gMDsgaV8yIDwgbGVuZ3RoOyBpXzIrKykge1xuICAgICAgICAgICAgICAgIG9iaiA9IGNvbXBvbmVudExpc3RbaV8yXTtcbiAgICAgICAgICAgICAgICBsaXN0ID0gQ29tcG9uZW50RmFjdG9yeV8xLmRlZmF1bHQuY3JlYXRlKHRoaXMuJGVsZW1lbnQuZmluZChvYmouc2VsZWN0b3IpLCBvYmouY29tcG9uZW50LCB0aGlzKTtcbiAgICAgICAgICAgICAgICBjcmVhdGVkQ2hpbGRyZW4gPSBjcmVhdGVkQ2hpbGRyZW4uY29uY2F0KGxpc3QpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGNyZWF0ZWRDaGlsZHJlbjtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIERPTUVsZW1lbnQ7XG4gICAgfSkoRGlzcGxheU9iamVjdENvbnRhaW5lcl8xLmRlZmF1bHQpO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbiAgICBleHBvcnRzLmRlZmF1bHQgPSBET01FbGVtZW50O1xufSk7XG4iLCJ2YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07XG4gICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xufTtcbihmdW5jdGlvbiAoZmFjdG9yeSkge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlLmV4cG9ydHMgPT09ICdvYmplY3QnKSB7XG4gICAgICAgIHZhciB2ID0gZmFjdG9yeShyZXF1aXJlLCBleHBvcnRzKTsgaWYgKHYgIT09IHVuZGVmaW5lZCkgbW9kdWxlLmV4cG9ydHMgPSB2O1xuICAgIH1cbiAgICBlbHNlIGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHtcbiAgICAgICAgZGVmaW5lKFtcInJlcXVpcmVcIiwgXCJleHBvcnRzXCIsICcuLi9ldmVudC9FdmVudERpc3BhdGNoZXInXSwgZmFjdG9yeSk7XG4gICAgfVxufSkoZnVuY3Rpb24gKHJlcXVpcmUsIGV4cG9ydHMpIHtcbiAgICB2YXIgRXZlbnREaXNwYXRjaGVyXzEgPSByZXF1aXJlKCcuLi9ldmVudC9FdmVudERpc3BhdGNoZXInKTtcbiAgICAvKipcbiAgICAgKiBUaGUge3sjY3Jvc3NMaW5rIFwiRGlzcGxheU9iamVjdFwifX17ey9jcm9zc0xpbmt9fSBjbGFzcyBpcyB0aGUgYmFzZSBjbGFzcyBmb3IgYWxsIG9iamVjdHMgdGhhdCBjYW4gYmUgcGxhY2VkIG9uIHRoZSBkaXNwbGF5IGxpc3QuXG4gICAgICpcbiAgICAgKiBAY2xhc3MgRGlzcGxheU9iamVjdFxuICAgICAqIEBleHRlbmRzIEV2ZW50RGlzcGF0Y2hlclxuICAgICAqIEBtb2R1bGUgU3RydWN0dXJlSlNcbiAgICAgKiBAc3VibW9kdWxlIHZpZXdcbiAgICAgKiBAcmVxdWlyZXMgRXh0ZW5kXG4gICAgICogQHJlcXVpcmVzIEV2ZW50RGlzcGF0Y2hlclxuICAgICAqIEBjb25zdHJ1Y3RvclxuICAgICAqIEBhdXRob3IgUm9iZXJ0IFMuICh3d3cuY29kZUJlbHQuY29tKVxuICAgICAqL1xuICAgIHZhciBEaXNwbGF5T2JqZWN0ID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICAgICAgX19leHRlbmRzKERpc3BsYXlPYmplY3QsIF9zdXBlcik7XG4gICAgICAgIGZ1bmN0aW9uIERpc3BsYXlPYmplY3QoKSB7XG4gICAgICAgICAgICBfc3VwZXIuY2FsbCh0aGlzKTtcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogVGhlIFN0YWdlIG9mIHRoZSBkaXNwbGF5IG9iamVjdC5cbiAgICAgICAgICAgICAqXG4gICAgICAgICAgICAgKiBAcHJvcGVydHkgc3RhZ2VcbiAgICAgICAgICAgICAqIEB0eXBlIHthbnl9XG4gICAgICAgICAgICAgKiBAcHVibGljXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHRoaXMuc3RhZ2UgPSBudWxsO1xuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBUaGUgQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEIGludGVyZmFjZSBwcm92aWRlcyB0aGUgMkQgcmVuZGVyaW5nIGNvbnRleHQgZm9yIHRoZSBkcmF3aW5nIHN1cmZhY2Ugb2YgYSBjYW52YXMgZWxlbWVudC5cbiAgICAgICAgICAgICAqIFRoaXMgcHJvcGVydHkgaXMgb25seSB1c2VkIHdpdGggdGhlIGNhbnZhcyBzcGVjaWZpYyBkaXNwbGF5IG9iamVjdHMuXG4gICAgICAgICAgICAgKlxuICAgICAgICAgICAgICogQHByb3BlcnR5IGN0eFxuICAgICAgICAgICAgICogQHR5cGUge0NhbnZhc1JlbmRlcmluZ0NvbnRleHQyRH1cbiAgICAgICAgICAgICAqIEBwdWJsaWNcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgdGhpcy5jdHggPSBudWxsO1xuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBBIHByb3BlcnR5IHByb3ZpZGluZyBhY2Nlc3MgdG8gdGhlIHggcG9zaXRpb24uXG4gICAgICAgICAgICAgKlxuICAgICAgICAgICAgICogQHByb3BlcnR5IHhcbiAgICAgICAgICAgICAqIEB0eXBlIHtudW1iZXJ9XG4gICAgICAgICAgICAgKiBAZGVmYXVsdCAwXG4gICAgICAgICAgICAgKiBAcHVibGljXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHRoaXMueCA9IDA7XG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIEEgcHJvcGVydHkgcHJvdmlkaW5nIGFjY2VzcyB0byB0aGUgeSBwb3NpdGlvbi5cbiAgICAgICAgICAgICAqXG4gICAgICAgICAgICAgKiBAcHJvcGVydHkgeVxuICAgICAgICAgICAgICogQHR5cGUge251bWJlcn1cbiAgICAgICAgICAgICAqIEBkZWZhdWx0IDBcbiAgICAgICAgICAgICAqIEBwdWJsaWNcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgdGhpcy55ID0gMDtcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogSW5kaWNhdGVzIHRoZSB3aWR0aCBvZiB0aGUgZGlzcGxheSBvYmplY3QsIGluIHBpeGVscy5cbiAgICAgICAgICAgICAqXG4gICAgICAgICAgICAgKiBAcHJvcGVydHkgd2lkdGhcbiAgICAgICAgICAgICAqIEB0eXBlIHtudW1iZXJ9XG4gICAgICAgICAgICAgKiBAZGVmYXVsdCAwXG4gICAgICAgICAgICAgKiBAcHVibGljXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHRoaXMud2lkdGggPSAwO1xuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBJbmRpY2F0ZXMgdGhlIGhlaWdodCBvZiB0aGUgZGlzcGxheSBvYmplY3QsIGluIHBpeGVscy5cbiAgICAgICAgICAgICAqXG4gICAgICAgICAgICAgKiBAcHJvcGVydHkgaGVpZ2h0XG4gICAgICAgICAgICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgICAgICAgICAgICogQGRlZmF1bHQgMFxuICAgICAgICAgICAgICogQHB1YmxpY1xuICAgICAgICAgICAgICovXG4gICAgICAgICAgICB0aGlzLmhlaWdodCA9IDA7XG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIEEgcHJvcGVydHkgcHJvdmlkaW5nIGFjY2VzcyB0byB0aGUgdW5zY2FsZWRXaWR0aC5cbiAgICAgICAgICAgICAqXG4gICAgICAgICAgICAgKiBAcHJvcGVydHkgdW5zY2FsZWRXaWR0aFxuICAgICAgICAgICAgICogQHR5cGUge251bWJlcn1cbiAgICAgICAgICAgICAqIEBkZWZhdWx0IDEwMFxuICAgICAgICAgICAgICogQHB1YmxpY1xuICAgICAgICAgICAgICovXG4gICAgICAgICAgICB0aGlzLnVuc2NhbGVkV2lkdGggPSAxMDA7XG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIEEgcHJvcGVydHkgcHJvdmlkaW5nIGFjY2VzcyB0byB0aGUgdW5zY2FsZWRIZWlnaHQuXG4gICAgICAgICAgICAgKlxuICAgICAgICAgICAgICogQHByb3BlcnR5IHVuc2NhbGVkSGVpZ2h0XG4gICAgICAgICAgICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgICAgICAgICAgICogQGRlZmF1bHQgMTAwXG4gICAgICAgICAgICAgKiBAcHVibGljXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHRoaXMudW5zY2FsZWRIZWlnaHQgPSAxMDA7XG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIEluZGljYXRlcyB0aGUgaG9yaXpvbnRhbCBzY2FsZSAocGVyY2VudGFnZSkgb2YgdGhlIG9iamVjdCBhcyBhcHBsaWVkIGZyb20gdGhlIHJlZ2lzdHJhdGlvbiBwb2ludC5cbiAgICAgICAgICAgICAqXG4gICAgICAgICAgICAgKiBAcHJvcGVydHkgc2NhbGVYXG4gICAgICAgICAgICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgICAgICAgICAgICogQHB1YmxpY1xuICAgICAgICAgICAgICovXG4gICAgICAgICAgICB0aGlzLnNjYWxlWCA9IDE7XG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIEluZGljYXRlcyB0aGUgdmVydGljYWwgc2NhbGUgKHBlcmNlbnRhZ2UpIG9mIGFuIG9iamVjdCBhcyBhcHBsaWVkIGZyb20gdGhlIHJlZ2lzdHJhdGlvbiBwb2ludCBvZiB0aGUgb2JqZWN0LlxuICAgICAgICAgICAgICpcbiAgICAgICAgICAgICAqIEBwcm9wZXJ0eSBzY2FsZVlcbiAgICAgICAgICAgICAqIEB0eXBlIHtudW1iZXJ9XG4gICAgICAgICAgICAgKiBAcHVibGljXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHRoaXMuc2NhbGVZID0gMTtcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogSW5kaWNhdGVzIHRoZSByb3RhdGlvbiBvZiB0aGUgRGlzcGxheU9iamVjdCBpbnN0YW5jZSwgaW4gZGVncmVlcywgZnJvbSBpdHMgb3JpZ2luYWwgb3JpZW50YXRpb24uXG4gICAgICAgICAgICAgKlxuICAgICAgICAgICAgICogQHByb3BlcnR5IHJvdGF0aW9uXG4gICAgICAgICAgICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgICAgICAgICAgICogQHB1YmxpY1xuICAgICAgICAgICAgICovXG4gICAgICAgICAgICB0aGlzLnJvdGF0aW9uID0gMDtcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogSW5kaWNhdGVzIHRoZSBhbHBoYSB0cmFuc3BhcmVuY3kgdmFsdWUgb2YgdGhlIG9iamVjdCBzcGVjaWZpZWQuXG4gICAgICAgICAgICAgKlxuICAgICAgICAgICAgICogQHByb3BlcnR5IGFscGhhXG4gICAgICAgICAgICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgICAgICAgICAgICogQHB1YmxpY1xuICAgICAgICAgICAgICovXG4gICAgICAgICAgICB0aGlzLmFscGhhID0gMTtcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogV2hldGhlciBvciBub3QgdGhlIGRpc3BsYXkgb2JqZWN0IGlzIHZpc2libGUuXG4gICAgICAgICAgICAgKlxuICAgICAgICAgICAgICogQHByb3BlcnR5IHZpc2libGVcbiAgICAgICAgICAgICAqIEB0eXBlIHtib29sZWFufVxuICAgICAgICAgICAgICogQHB1YmxpY1xuICAgICAgICAgICAgICovXG4gICAgICAgICAgICB0aGlzLnZpc2libGUgPSB0cnVlO1xuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBTcGVjaWZpZXMgd2hldGhlciB0aGlzIG9iamVjdCByZWNlaXZlcyBtb3VzZVxuICAgICAgICAgICAgICpcbiAgICAgICAgICAgICAqIEBwcm9wZXJ0eSBtb3VzZUVuYWJsZWRcbiAgICAgICAgICAgICAqIEB0eXBlIHtib29sZWFufVxuICAgICAgICAgICAgICogQHB1YmxpY1xuICAgICAgICAgICAgICovXG4gICAgICAgICAgICB0aGlzLm1vdXNlRW5hYmxlZCA9IGZhbHNlO1xuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBBIEJvb2xlYW4gdmFsdWUgdGhhdCBpbmRpY2F0ZXMgd2hldGhlciB0aGUgcG9pbnRpbmcgaGFuZCAoaGFuZCBjdXJzb3IpIGFwcGVhcnMgd2hlbiB0aGUgcG9pbnRlciByb2xscyBvdmVyIGEgZGlzcGxheSBvYmplY3QuXG4gICAgICAgICAgICAgKlxuICAgICAgICAgICAgICogQHByb3BlcnR5IHVzZUhhbmRDdXJzb3JcbiAgICAgICAgICAgICAqIEB0eXBlIHtib29sZWFufVxuICAgICAgICAgICAgICogQHB1YmxpY1xuICAgICAgICAgICAgICovXG4gICAgICAgICAgICB0aGlzLnVzZUhhbmRDdXJzb3IgPSBmYWxzZTtcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogVGhlIGlzQ3JlYXRlZCBwcm9wZXJ0eSBpcyB1c2VkIHRvIGtlZXAgdHJhY2sgaWYgaXQgaXMgdGhlIGZpcnN0IHRpbWUgdGhpcyBEaXNwbGF5T2JqZWN0IGlzIGNyZWF0ZWQuXG4gICAgICAgICAgICAgKlxuICAgICAgICAgICAgICogQHByb3BlcnR5IGlzQ3JlYXRlZFxuICAgICAgICAgICAgICogQHR5cGUge2Jvb2xlYW59XG4gICAgICAgICAgICAgKiBAZGVmYXVsdCBmYWxzZVxuICAgICAgICAgICAgICogQHB1YmxpY1xuICAgICAgICAgICAgICovXG4gICAgICAgICAgICB0aGlzLmlzQ3JlYXRlZCA9IGZhbHNlO1xuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBJbmRpY2F0ZXMgdGhlIGluc3RhbmNlIG5hbWUgb2YgdGhlIERpc3BsYXlPYmplY3QuXG4gICAgICAgICAgICAgKlxuICAgICAgICAgICAgICogQHByb3BlcnR5IG5hbWVcbiAgICAgICAgICAgICAqIEB0eXBlIHtzdHJpbmd9XG4gICAgICAgICAgICAgKiBAcHVibGljXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHRoaXMubmFtZSA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSBjcmVhdGUgZnVuY3Rpb24gaXMgaW50ZW5kZWQgdG8gcHJvdmlkZSBhIGNvbnNpc3RlbnQgcGxhY2UgZm9yIHRoZSBjcmVhdGlvbiBvciBpbml0aWFsaXppbmcgdGhlIHZpZXcuXG4gICAgICAgICAqIEl0IHdpbGwgYXV0b21hdGljYWxseSBiZSBjYWxsZWQgdGhlIGZpcnN0IHRpbWUgdGhhdCB0aGUgdmlldyBpcyBhZGRlZCB0byBhIERpc3BsYXlPYmplY3RDb250YWluZXIuXG4gICAgICAgICAqIEl0IGlzIGNyaXRpY2FsIHRoYXQgYWxsIHN1YmNsYXNzZXMgY2FsbCB0aGUgc3VwZXIgZm9yIHRoaXMgZnVuY3Rpb24gaW4gdGhlaXIgb3ZlcnJpZGRlbiBtZXRob2RzLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAbWV0aG9kIGNyZWF0ZVxuICAgICAgICAgKiBAcmV0dXJucyB7RGlzcGxheU9iamVjdH0gUmV0dXJucyBhbiBpbnN0YW5jZSBvZiBpdHNlbGYuXG4gICAgICAgICAqIEBwdWJsaWNcbiAgICAgICAgICogQGNoYWluYWJsZVxuICAgICAgICAgKi9cbiAgICAgICAgRGlzcGxheU9iamVjdC5wcm90b3R5cGUuY3JlYXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy5pc0NyZWF0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH07XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgbGF5b3V0IG1ldGhvZCBwcm92aWRlcyBhIGNvbW1vbiBmdW5jdGlvbiB0byBoYW5kbGUgdXBkYXRpbmcgb2JqZWN0cyBpbiB0aGUgdmlldy5cbiAgICAgICAgICpcbiAgICAgICAgICogQG1ldGhvZCBsYXlvdXRcbiAgICAgICAgICogQHJldHVybnMge0Rpc3BsYXlPYmplY3R9IFJldHVybnMgYW4gaW5zdGFuY2Ugb2YgaXRzZWxmLlxuICAgICAgICAgKiBAcHVibGljXG4gICAgICAgICAqIEBjaGFpbmFibGVcbiAgICAgICAgICovXG4gICAgICAgIERpc3BsYXlPYmplY3QucHJvdG90eXBlLmxheW91dCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9O1xuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIHNldFNpemUgbWV0aG9kIHNldHMgdGhlIGJvdW5kcyB3aXRoaW4gd2hpY2ggdGhlIGNvbnRhaW5pbmcgRGlzcGxheU9iamVjdCB3b3VsZCBsaWtlIHRoYXQgY29tcG9uZW50IHRvIGxheSBpdHNlbGYgb3V0LlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0gdW5zY2FsZWRXaWR0aCB7bnVtYmVyfSBUaGUgd2lkdGggd2l0aGluIHdoaWNoIHRoZSBjb21wb25lbnQgc2hvdWxkIGxheSBpdHNlbGYgb3V0LlxuICAgICAgICAgKiBAcGFyYW0gdW5zY2FsZWRIZWlnaHQge251bWJlcn0gVGhlIGhlaWdodCB3aXRoaW4gd2hpY2ggdGhlIGNvbXBvbmVudCBzaG91bGQgbGF5IGl0c2VsZiBvdXQuXG4gICAgICAgICAqIEByZXR1cm5zIHtEaXNwbGF5T2JqZWN0fSBSZXR1cm5zIGFuIGluc3RhbmNlIG9mIGl0c2VsZi5cbiAgICAgICAgICogQHB1YmxpY1xuICAgICAgICAgKiBAY2hhaW5hYmxlXG4gICAgICAgICAqL1xuICAgICAgICBEaXNwbGF5T2JqZWN0LnByb3RvdHlwZS5zZXRTaXplID0gZnVuY3Rpb24gKHVuc2NhbGVkV2lkdGgsIHVuc2NhbGVkSGVpZ2h0KSB7XG4gICAgICAgICAgICB0aGlzLnVuc2NhbGVkV2lkdGggPSB1bnNjYWxlZFdpZHRoO1xuICAgICAgICAgICAgdGhpcy51bnNjYWxlZEhlaWdodCA9IHVuc2NhbGVkSGVpZ2h0O1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH07XG4gICAgICAgIERpc3BsYXlPYmplY3QucHJvdG90eXBlLl9yZWFkZXJTdGFydCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMuY3R4LnNhdmUoKTtcbiAgICAgICAgfTtcbiAgICAgICAgRGlzcGxheU9iamVjdC5wcm90b3R5cGUucmVuZGVyQ2FudmFzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuY3R4ID09PSBudWxsIHx8IHRoaXMuYWxwaGEgPD0gMCB8fCB0aGlzLnZpc2libGUgPT09IGZhbHNlKVxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuX3JlYWRlclN0YXJ0KCk7XG4gICAgICAgICAgICB0aGlzLmN0eC5nbG9iYWxBbHBoYSA9IHRoaXMuYWxwaGE7XG4gICAgICAgICAgICB0aGlzLmxheW91dCgpO1xuICAgICAgICAgICAgdGhpcy5fcmVuZGVyRW5kKCk7XG4gICAgICAgIH07XG4gICAgICAgIERpc3BsYXlPYmplY3QucHJvdG90eXBlLl9yZW5kZXJFbmQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLmN0eC5yZXN0b3JlKCk7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBEaXNwbGF5T2JqZWN0O1xuICAgIH0pKEV2ZW50RGlzcGF0Y2hlcl8xLmRlZmF1bHQpO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbiAgICBleHBvcnRzLmRlZmF1bHQgPSBEaXNwbGF5T2JqZWN0O1xufSk7XG4iLCJ2YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07XG4gICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xufTtcbihmdW5jdGlvbiAoZmFjdG9yeSkge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlLmV4cG9ydHMgPT09ICdvYmplY3QnKSB7XG4gICAgICAgIHZhciB2ID0gZmFjdG9yeShyZXF1aXJlLCBleHBvcnRzKTsgaWYgKHYgIT09IHVuZGVmaW5lZCkgbW9kdWxlLmV4cG9ydHMgPSB2O1xuICAgIH1cbiAgICBlbHNlIGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHtcbiAgICAgICAgZGVmaW5lKFtcInJlcXVpcmVcIiwgXCJleHBvcnRzXCIsICcuL0Rpc3BsYXlPYmplY3QnXSwgZmFjdG9yeSk7XG4gICAgfVxufSkoZnVuY3Rpb24gKHJlcXVpcmUsIGV4cG9ydHMpIHtcbiAgICB2YXIgRGlzcGxheU9iamVjdF8xID0gcmVxdWlyZSgnLi9EaXNwbGF5T2JqZWN0Jyk7XG4gICAgLyoqXG4gICAgICogVGhlIHt7I2Nyb3NzTGluayBcIkRpc3BsYXlPYmplY3RDb250YWluZXJcIn19e3svY3Jvc3NMaW5rfX0gY2xhc3MgaXMgdGhlIGJhc2UgY2xhc3MgZm9yIGFsbCBvYmplY3RzIHRoYXQgY2FuIGJlIHBsYWNlZCBvbiB0aGUgZGlzcGxheSBsaXN0LlxuICAgICAqXG4gICAgICogQGNsYXNzIERpc3BsYXlPYmplY3RDb250YWluZXJcbiAgICAgKiBAZXh0ZW5kcyBEaXNwbGF5T2JqZWN0XG4gICAgICogQG1vZHVsZSBTdHJ1Y3R1cmVKU1xuICAgICAqIEBzdWJtb2R1bGUgdmlld1xuICAgICAqIEByZXF1aXJlcyBFeHRlbmRcbiAgICAgKiBAcmVxdWlyZXMgRGlzcGxheU9iamVjdFxuICAgICAqIEBjb25zdHJ1Y3RvclxuICAgICAqIEBhdXRob3IgUm9iZXJ0IFMuICh3d3cuY29kZUJlbHQuY29tKVxuICAgICAqL1xuICAgIHZhciBEaXNwbGF5T2JqZWN0Q29udGFpbmVyID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICAgICAgX19leHRlbmRzKERpc3BsYXlPYmplY3RDb250YWluZXIsIF9zdXBlcik7XG4gICAgICAgIGZ1bmN0aW9uIERpc3BsYXlPYmplY3RDb250YWluZXIoKSB7XG4gICAgICAgICAgICBfc3VwZXIuY2FsbCh0aGlzKTtcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogUmV0dXJucyB0aGUgbnVtYmVyIG9mIGNoaWxkcmVuIG9mIHRoaXMgb2JqZWN0LlxuICAgICAgICAgICAgICpcbiAgICAgICAgICAgICAqIEBwcm9wZXJ0eSBudW1DaGlsZHJlblxuICAgICAgICAgICAgICogQHR5cGUge2ludH1cbiAgICAgICAgICAgICAqIEBkZWZhdWx0IDBcbiAgICAgICAgICAgICAqIEByZWFkT25seVxuICAgICAgICAgICAgICogQHB1YmxpY1xuICAgICAgICAgICAgICovXG4gICAgICAgICAgICB0aGlzLm51bUNoaWxkcmVuID0gMDtcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogQSByZWZlcmVuY2UgdG8gdGhlIGNoaWxkIERpc3BsYXlPYmplY3QgaW5zdGFuY2VzIHRvIHRoaXMgcGFyZW50IG9iamVjdCBpbnN0YW5jZS5cbiAgICAgICAgICAgICAqXG4gICAgICAgICAgICAgKiBAcHJvcGVydHkgY2hpbGRyZW5cbiAgICAgICAgICAgICAqIEB0eXBlIHtBcnJheS48RGlzcGxheU9iamVjdD59XG4gICAgICAgICAgICAgKiBAcmVhZE9ubHlcbiAgICAgICAgICAgICAqIEBwdWJsaWNcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgdGhpcy5jaGlsZHJlbiA9IFtdO1xuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBEZXRlcm1pbmVzIHdoZXRoZXIgb3Igbm90IHRoZSBjaGlsZHJlbiBvZiB0aGUgb2JqZWN0IGFyZSBtb3VzZSBlbmFibGVkLlxuICAgICAgICAgICAgICpcbiAgICAgICAgICAgICAqIEBwcm9wZXJ0eSBtb3VzZUNoaWxkcmVuXG4gICAgICAgICAgICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICAgICAgICAgICAqIEBwdWJsaWNcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgdGhpcy5tb3VzZUNoaWxkcmVuID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEFkZHMgYSBjaGlsZCBEaXNwbGF5T2JqZWN0IGluc3RhbmNlIHRvIHRoaXMgcGFyZW50IG9iamVjdCBpbnN0YW5jZS4gVGhlIGNoaWxkIGlzIGFkZGVkIHRvIHRoZSBmcm9udCAodG9wKSBvZiBhbGwgb3RoZXJcbiAgICAgICAgICogY2hpbGRyZW4gaW4gdGhpcyBwYXJlbnQgb2JqZWN0IGluc3RhbmNlLiAoVG8gYWRkIGEgY2hpbGQgdG8gYSBzcGVjaWZpYyBpbmRleCBwb3NpdGlvbiwgdXNlIHRoZSBhZGRDaGlsZEF0KCkgbWV0aG9kLilcbiAgICAgICAgICpcbiAgICAgICAgICogSWYgeW91IGFkZCBhIGNoaWxkIG9iamVjdCB0aGF0IGFscmVhZHkgaGFzIGEgZGlmZmVyZW50IHBhcmVudCwgdGhlIG9iamVjdCBpcyByZW1vdmVkIGZyb20gdGhlIGNoaWxkXG4gICAgICAgICAqIGxpc3Qgb2YgdGhlIG90aGVyIHBhcmVudCBvYmplY3QuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBtZXRob2QgYWRkQ2hpbGRcbiAgICAgICAgICogQHBhcmFtIGNoaWxkIHtEaXNwbGF5T2JqZWN0fSBUaGUgRGlzcGxheU9iamVjdCBpbnN0YW5jZSB0byBhZGQgYXMgYSBjaGlsZCBvZiB0aGlzIERpc3BsYXlPYmplY3RDb250YWluZXIgaW5zdGFuY2UuXG4gICAgICAgICAqIEByZXR1cm5zIHtEaXNwbGF5T2JqZWN0Q29udGFpbmVyfSBSZXR1cm5zIGFuIGluc3RhbmNlIG9mIGl0c2VsZi5cbiAgICAgICAgICogQHB1YmxpY1xuICAgICAgICAgKiBAY2hhaW5hYmxlXG4gICAgICAgICAqL1xuICAgICAgICBEaXNwbGF5T2JqZWN0Q29udGFpbmVyLnByb3RvdHlwZS5hZGRDaGlsZCA9IGZ1bmN0aW9uIChjaGlsZCkge1xuICAgICAgICAgICAgLy9JZiB0aGUgY2hpbGQgYmVpbmcgcGFzc2VkIGluIGFscmVhZHkgaGFzIGEgcGFyZW50IHRoZW4gcmVtb3ZlIHRoZSByZWZlcmVuY2UgZnJvbSB0aGVyZS5cbiAgICAgICAgICAgIGlmIChjaGlsZC5wYXJlbnQpIHtcbiAgICAgICAgICAgICAgICBjaGlsZC5wYXJlbnQucmVtb3ZlQ2hpbGQoY2hpbGQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5jaGlsZHJlbi5wdXNoKGNoaWxkKTtcbiAgICAgICAgICAgIHRoaXMubnVtQ2hpbGRyZW4gPSB0aGlzLmNoaWxkcmVuLmxlbmd0aDtcbiAgICAgICAgICAgIGNoaWxkLnBhcmVudCA9IHRoaXM7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEFkZHMgYSBjaGlsZCBEaXNwbGF5T2JqZWN0IGluc3RhbmNlIHRvIHRoaXMgRGlzcGxheU9iamVjdENvbnRhaW5lckNvbnRhaW5lciBpbnN0YW5jZS5cbiAgICAgICAgICogVGhlIGNoaWxkIGlzIGFkZGVkIGF0IHRoZSBpbmRleCBwb3NpdGlvbiBzcGVjaWZpZWQuIEFuIGluZGV4IG9mIDAgcmVwcmVzZW50cyB0aGUgYmFja1xuICAgICAgICAgKiAoYm90dG9tKSBvZiB0aGUgZGlzcGxheSBsaXN0IGZvciB0aGlzIERpc3BsYXlPYmplY3RDb250YWluZXJDb250YWluZXIgb2JqZWN0LlxuICAgICAgICAgKlxuICAgICAgICAgKiBAbWV0aG9kIGFkZENoaWxkQXRcbiAgICAgICAgICogQHBhcmFtIGNoaWxkIHtEaXNwbGF5T2JqZWN0fSBUaGUgRGlzcGxheU9iamVjdCBpbnN0YW5jZSB0byBhZGQgYXMgYSBjaGlsZCBvZiB0aGlzIG9iamVjdCBpbnN0YW5jZS5cbiAgICAgICAgICogQHBhcmFtIGluZGV4IHtpbnR9IFRoZSBpbmRleCBwb3NpdGlvbiB0byB3aGljaCB0aGUgY2hpbGQgaXMgYWRkZWQuIElmIHlvdSBzcGVjaWZ5IGEgY3VycmVudGx5IG9jY3VwaWVkIGluZGV4IHBvc2l0aW9uLCB0aGUgY2hpbGQgb2JqZWN0IHRoYXQgZXhpc3RzIGF0IHRoYXQgcG9zaXRpb24gYW5kIGFsbCBoaWdoZXIgcG9zaXRpb25zIGFyZSBtb3ZlZCB1cCBvbmUgcG9zaXRpb24gaW4gdGhlIGNoaWxkIGxpc3QuXG4gICAgICAgICAqIEByZXR1cm5zIHtEaXNwbGF5T2JqZWN0Q29udGFpbmVyfSBSZXR1cm5zIGFuIGluc3RhbmNlIG9mIGl0c2VsZi5cbiAgICAgICAgICogQHB1YmxpY1xuICAgICAgICAgKiBAY2hhaW5hYmxlXG4gICAgICAgICAqL1xuICAgICAgICBEaXNwbGF5T2JqZWN0Q29udGFpbmVyLnByb3RvdHlwZS5hZGRDaGlsZEF0ID0gZnVuY3Rpb24gKGNoaWxkLCBpbmRleCkge1xuICAgICAgICAgICAgLy9JZiB0aGUgY2hpbGQgYmVpbmcgcGFzc2VkIGluIGFscmVhZHkgaGFzIGEgcGFyZW50IHRoZW4gcmVtb3ZlIHRoZSByZWZlcmVuY2UgZnJvbSB0aGVyZS5cbiAgICAgICAgICAgIGlmIChjaGlsZC5wYXJlbnQpIHtcbiAgICAgICAgICAgICAgICBjaGlsZC5wYXJlbnQucmVtb3ZlQ2hpbGQoY2hpbGQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5jaGlsZHJlbi5zcGxpY2UoaW5kZXgsIDAsIGNoaWxkKTtcbiAgICAgICAgICAgIHRoaXMubnVtQ2hpbGRyZW4gPSB0aGlzLmNoaWxkcmVuLmxlbmd0aDtcbiAgICAgICAgICAgIGNoaWxkLnBhcmVudCA9IHRoaXM7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFJlbW92ZXMgdGhlIHNwZWNpZmllZCBjaGlsZCBvYmplY3QgaW5zdGFuY2UgZnJvbSB0aGUgY2hpbGQgbGlzdCBvZiB0aGUgcGFyZW50IG9iamVjdCBpbnN0YW5jZS5cbiAgICAgICAgICogVGhlIHBhcmVudCBwcm9wZXJ0eSBvZiB0aGUgcmVtb3ZlZCBjaGlsZCBpcyBzZXQgdG8gbnVsbCAsIGFuZCB0aGUgb2JqZWN0IGlzIGdhcmJhZ2UgY29sbGVjdGVkIGlmIG5vIG90aGVyIHJlZmVyZW5jZXNcbiAgICAgICAgICogdG8gdGhlIGNoaWxkIGV4aXN0LiBUaGUgaW5kZXggcG9zaXRpb25zIG9mIGFueSBvYmplY3RzIGFib3ZlIHRoZSBjaGlsZCBpbiB0aGUgcGFyZW50IG9iamVjdCBhcmUgZGVjcmVhc2VkIGJ5IDEuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBtZXRob2QgcmVtb3ZlQ2hpbGRcbiAgICAgICAgICogQHBhcmFtIGNoaWxkIHtEaXNwbGF5T2JqZWN0fSBUaGUgRGlzcGxheU9iamVjdCBpbnN0YW5jZSB0byByZW1vdmUuXG4gICAgICAgICAqIEByZXR1cm5zIHtEaXNwbGF5T2JqZWN0Q29udGFpbmVyfSBSZXR1cm5zIGFuIGluc3RhbmNlIG9mIGl0c2VsZi5cbiAgICAgICAgICogQHB1YmxpY1xuICAgICAgICAgKiBAY2hhaW5hYmxlXG4gICAgICAgICAqL1xuICAgICAgICBEaXNwbGF5T2JqZWN0Q29udGFpbmVyLnByb3RvdHlwZS5yZW1vdmVDaGlsZCA9IGZ1bmN0aW9uIChjaGlsZCkge1xuICAgICAgICAgICAgdmFyIGluZGV4ID0gdGhpcy5nZXRDaGlsZEluZGV4KGNoaWxkKTtcbiAgICAgICAgICAgIGlmIChpbmRleCAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICAvLyBSZW1vdmVzIHRoZSBjaGlsZCBvYmplY3QgZnJvbSB0aGUgcGFyZW50LlxuICAgICAgICAgICAgICAgIHRoaXMuY2hpbGRyZW4uc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMubnVtQ2hpbGRyZW4gPSB0aGlzLmNoaWxkcmVuLmxlbmd0aDtcbiAgICAgICAgICAgIGNoaWxkLnBhcmVudCA9IG51bGw7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFJlbW92ZXMgYWxsIGNoaWxkIERpc3BsYXlPYmplY3QgaW5zdGFuY2VzIGZyb20gdGhlIGNoaWxkIGxpc3Qgb2YgdGhlIERpc3BsYXlPYmplY3RDb250YWluZXJDb250YWluZXIgaW5zdGFuY2UuXG4gICAgICAgICAqIFRoZSBwYXJlbnQgcHJvcGVydHkgb2YgdGhlIHJlbW92ZWQgY2hpbGRyZW4gaXMgc2V0IHRvIG51bGwgLCBhbmQgdGhlIG9iamVjdHMgYXJlIGdhcmJhZ2UgY29sbGVjdGVkIGlmXG4gICAgICAgICAqIG5vIG90aGVyIHJlZmVyZW5jZXMgdG8gdGhlIGNoaWxkcmVuIGV4aXN0LlxuICAgICAgICAgKlxuICAgICAgICAgKiBAbWV0aG9kIHJlbW92ZUNoaWxkcmVuXG4gICAgICAgICAqIEByZXR1cm5zIHtEaXNwbGF5T2JqZWN0Q29udGFpbmVyfSBSZXR1cm5zIGFuIGluc3RhbmNlIG9mIGl0c2VsZi5cbiAgICAgICAgICogQHB1YmxpY1xuICAgICAgICAgKiBAY2hhaW5hYmxlXG4gICAgICAgICAqL1xuICAgICAgICBEaXNwbGF5T2JqZWN0Q29udGFpbmVyLnByb3RvdHlwZS5yZW1vdmVDaGlsZHJlbiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHdoaWxlICh0aGlzLmNoaWxkcmVuLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZUNoaWxkKHRoaXMuY2hpbGRyZW4ucG9wKCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH07XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBTd2FwcyB0d28gRGlzcGxheU9iamVjdCdzIHdpdGggZWFjaCBvdGhlci5cbiAgICAgICAgICpcbiAgICAgICAgICogQG1ldGhvZCBzd2FwQ2hpbGRyZW5cbiAgICAgICAgICogQHBhcmFtIGNoaWxkMSB7RGlzcGxheU9iamVjdH0gVGhlIERpc3BsYXlPYmplY3QgaW5zdGFuY2UgdG8gYmUgc3dhcC5cbiAgICAgICAgICogQHBhcmFtIGNoaWxkMiB7RGlzcGxheU9iamVjdH0gVGhlIERpc3BsYXlPYmplY3QgaW5zdGFuY2UgdG8gYmUgc3dhcC5cbiAgICAgICAgICogQHJldHVybnMge0Rpc3BsYXlPYmplY3RDb250YWluZXJ9IFJldHVybnMgYW4gaW5zdGFuY2Ugb2YgaXRzZWxmLlxuICAgICAgICAgKiBAcHVibGljXG4gICAgICAgICAqIEBjaGFpbmFibGVcbiAgICAgICAgICovXG4gICAgICAgIERpc3BsYXlPYmplY3RDb250YWluZXIucHJvdG90eXBlLnN3YXBDaGlsZHJlbiA9IGZ1bmN0aW9uIChjaGlsZDEsIGNoaWxkMikge1xuICAgICAgICAgICAgdmFyIGNoaWxkMUluZGV4ID0gdGhpcy5nZXRDaGlsZEluZGV4KGNoaWxkMSk7XG4gICAgICAgICAgICB2YXIgY2hpbGQySW5kZXggPSB0aGlzLmdldENoaWxkSW5kZXgoY2hpbGQyKTtcbiAgICAgICAgICAgIHRoaXMuYWRkQ2hpbGRBdChjaGlsZDEsIGNoaWxkMkluZGV4KTtcbiAgICAgICAgICAgIHRoaXMuYWRkQ2hpbGRBdChjaGlsZDIsIGNoaWxkMUluZGV4KTtcbiAgICAgICAgfTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFN3YXBzIGNoaWxkIG9iamVjdHMgYXQgdGhlIHR3byBzcGVjaWZpZWQgaW5kZXggcG9zaXRpb25zIGluIHRoZSBjaGlsZCBsaXN0LiBBbGwgb3RoZXIgY2hpbGQgb2JqZWN0cyBpbiB0aGUgZGlzcGxheSBvYmplY3QgY29udGFpbmVyIHJlbWFpbiBpbiB0aGUgc2FtZSBpbmRleCBwb3NpdGlvbnMuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBtZXRob2Qgc3dhcENoaWxkcmVuQXRcbiAgICAgICAgICogQHBhcmFtIGluZGV4MSB7aW50fSBUaGUgaW5kZXggcG9zaXRpb24gb2YgdGhlIGZpcnN0IGNoaWxkIG9iamVjdC5cbiAgICAgICAgICogQHBhcmFtIGluZGV4MiB7aW50fSBUaGUgaW5kZXggcG9zaXRpb24gb2YgdGhlIHNlY29uZCBjaGlsZCBvYmplY3QuXG4gICAgICAgICAqIEByZXR1cm5zIHtEaXNwbGF5T2JqZWN0Q29udGFpbmVyfSBSZXR1cm5zIGFuIGluc3RhbmNlIG9mIGl0c2VsZi5cbiAgICAgICAgICogQHB1YmxpY1xuICAgICAgICAgKiBAY2hhaW5hYmxlXG4gICAgICAgICAqL1xuICAgICAgICBEaXNwbGF5T2JqZWN0Q29udGFpbmVyLnByb3RvdHlwZS5zd2FwQ2hpbGRyZW5BdCA9IGZ1bmN0aW9uIChpbmRleDEsIGluZGV4Mikge1xuICAgICAgICAgICAgaWYgKGluZGV4MSA8IDAgfHwgaW5kZXgxIDwgMCB8fCBpbmRleDEgPj0gdGhpcy5udW1DaGlsZHJlbiB8fCBpbmRleDIgPj0gdGhpcy5udW1DaGlsZHJlbikge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1snICsgdGhpcy5nZXRRdWFsaWZpZWRDbGFzc05hbWUoKSArICddIGluZGV4IHZhbHVlKHMpIGNhbm5vdCBiZSBvdXQgb2YgYm91bmRzLiBpbmRleDEgdmFsdWUgaXMgJyArIGluZGV4MSArICcgaW5kZXgyIHZhbHVlIGlzICcgKyBpbmRleDIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIGNoaWxkMSA9IHRoaXMuZ2V0Q2hpbGRBdChpbmRleDEpO1xuICAgICAgICAgICAgdmFyIGNoaWxkMiA9IHRoaXMuZ2V0Q2hpbGRBdChpbmRleDIpO1xuICAgICAgICAgICAgdGhpcy5zd2FwQ2hpbGRyZW4oY2hpbGQxLCBjaGlsZDIpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH07XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBSZXR1cm5zIHRoZSBpbmRleCBwb3NpdGlvbiBvZiBhIGNoaWxkIERpc3BsYXlPYmplY3QgaW5zdGFuY2UuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBtZXRob2QgZ2V0Q2hpbGRJbmRleFxuICAgICAgICAgKiBAcGFyYW0gY2hpbGQge0Rpc3BsYXlPYmplY3R9IFRoZSBEaXNwbGF5T2JqZWN0IGluc3RhbmNlIHRvIGlkZW50aWZ5LlxuICAgICAgICAgKiBAcmV0dXJucyB7aW50fSBUaGUgaW5kZXggcG9zaXRpb24gb2YgdGhlIGNoaWxkIGRpc3BsYXkgb2JqZWN0IHRvIGlkZW50aWZ5LlxuICAgICAgICAgKiBAcHVibGljXG4gICAgICAgICAqL1xuICAgICAgICBEaXNwbGF5T2JqZWN0Q29udGFpbmVyLnByb3RvdHlwZS5nZXRDaGlsZEluZGV4ID0gZnVuY3Rpb24gKGNoaWxkKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jaGlsZHJlbi5pbmRleE9mKGNoaWxkKTtcbiAgICAgICAgfTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIERldGVybWluZXMgd2hldGhlciB0aGUgc3BlY2lmaWVkIGRpc3BsYXkgb2JqZWN0IGlzIGEgY2hpbGQgb2YgdGhlIERpc3BsYXlPYmplY3QgaW5zdGFuY2Ugb3IgdGhlIGluc3RhbmNlIGl0c2VsZi4gVGhlIHNlYXJjaCBpbmNsdWRlcyB0aGUgZW50aXJlIGRpc3BsYXkgbGlzdCBpbmNsdWRpbmcgdGhpcyBEaXNwbGF5T2JqZWN0IGluc3RhbmNlLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAbWV0aG9kIGNvbnRhaW5zXG4gICAgICAgICAqIEBwYXJhbSBjaGlsZCB7RGlzcGxheU9iamVjdH0gVGhlIGNoaWxkIG9iamVjdCB0byB0ZXN0LlxuICAgICAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gIHRydWUgaWYgdGhlIGNoaWxkIG9iamVjdCBpcyBhIGNoaWxkIG9mIHRoZSBEaXNwbGF5T2JqZWN0IG9yIHRoZSBjb250YWluZXIgaXRzZWxmOyBvdGhlcndpc2UgZmFsc2UuXG4gICAgICAgICAqIEBwdWJsaWNcbiAgICAgICAgICovXG4gICAgICAgIERpc3BsYXlPYmplY3RDb250YWluZXIucHJvdG90eXBlLmNvbnRhaW5zID0gZnVuY3Rpb24gKGNoaWxkKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jaGlsZHJlbi5pbmRleE9mKGNoaWxkKSA+PSAwO1xuICAgICAgICB9O1xuICAgICAgICAvKipcbiAgICAgICAgICogUmV0dXJucyB0aGUgY2hpbGQgZGlzcGxheSBvYmplY3QgaW5zdGFuY2UgdGhhdCBleGlzdHMgYXQgdGhlIHNwZWNpZmllZCBpbmRleC5cbiAgICAgICAgICpcbiAgICAgICAgICogQG1ldGhvZCBnZXRDaGlsZEF0XG4gICAgICAgICAqIEBwYXJhbSBpbmRleCB7aW50fSBUaGUgaW5kZXggcG9zaXRpb24gb2YgdGhlIGNoaWxkIG9iamVjdC5cbiAgICAgICAgICogQHJldHVybnMge0Rpc3BsYXlPYmplY3R9IFRoZSBjaGlsZCBkaXNwbGF5IG9iamVjdCBhdCB0aGUgc3BlY2lmaWVkIGluZGV4IHBvc2l0aW9uLlxuICAgICAgICAgKi9cbiAgICAgICAgRGlzcGxheU9iamVjdENvbnRhaW5lci5wcm90b3R5cGUuZ2V0Q2hpbGRBdCA9IGZ1bmN0aW9uIChpbmRleCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2hpbGRyZW5baW5kZXhdO1xuICAgICAgICB9O1xuICAgICAgICAvKipcbiAgICAgICAgICogR2V0cyBhIERpc3BsYXlPYmplY3QgYnkgaXRzIHNqc0lkLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAbWV0aG9kIGdldENoaWxkQnlDaWRcbiAgICAgICAgICogQHBhcmFtIHNqc0lkIHtudW1iZXJ9XG4gICAgICAgICAqIEByZXR1cm5zIHtEaXNwbGF5T2JqZWN0fG51bGx9XG4gICAgICAgICAqIEBvdmVycmlkZVxuICAgICAgICAgKiBAcHVibGljXG4gICAgICAgICAqL1xuICAgICAgICBEaXNwbGF5T2JqZWN0Q29udGFpbmVyLnByb3RvdHlwZS5nZXRDaGlsZEJ5Q2lkID0gZnVuY3Rpb24gKHNqc0lkKSB7XG4gICAgICAgICAgICB2YXIgY2hpbGQgPSBudWxsO1xuICAgICAgICAgICAgZm9yICh2YXIgaV8xID0gdGhpcy5udW1DaGlsZHJlbiAtIDE7IGlfMSA+PSAwOyBpXzEtLSkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmNoaWxkcmVuW2lfMV0uc2pzSWQgPT0gc2pzSWQpIHtcbiAgICAgICAgICAgICAgICAgICAgY2hpbGQgPSB0aGlzLmNoaWxkcmVuW2lfMV07XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBjaGlsZDtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIERpc3BsYXlPYmplY3RDb250YWluZXI7XG4gICAgfSkoRGlzcGxheU9iamVjdF8xLmRlZmF1bHQpO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbiAgICBleHBvcnRzLmRlZmF1bHQgPSBEaXNwbGF5T2JqZWN0Q29udGFpbmVyO1xufSk7XG4iLCJ2YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07XG4gICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xufTtcbihmdW5jdGlvbiAoZmFjdG9yeSkge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlLmV4cG9ydHMgPT09ICdvYmplY3QnKSB7XG4gICAgICAgIHZhciB2ID0gZmFjdG9yeShyZXF1aXJlLCBleHBvcnRzKTsgaWYgKHYgIT09IHVuZGVmaW5lZCkgbW9kdWxlLmV4cG9ydHMgPSB2O1xuICAgIH1cbiAgICBlbHNlIGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHtcbiAgICAgICAgZGVmaW5lKFtcInJlcXVpcmVcIiwgXCJleHBvcnRzXCIsICcuL0RPTUVsZW1lbnQnXSwgZmFjdG9yeSk7XG4gICAgfVxufSkoZnVuY3Rpb24gKHJlcXVpcmUsIGV4cG9ydHMpIHtcbiAgICB2YXIgRE9NRWxlbWVudF8xID0gcmVxdWlyZSgnLi9ET01FbGVtZW50Jyk7XG4gICAgLyoqXG4gICAgICogVGhlIHt7I2Nyb3NzTGluayBcIlN0YWdlXCJ9fXt7L2Nyb3NzTGlua319IGNsYXNzIHNob3VsZCBiZSBleHRlbmRlZCBieSB5b3VyIG1haW4gYXBwbGljYXRpb24gb3Igcm9vdCBjbGFzcy5cbiAgICAgKlxuICAgICAqIEBjbGFzcyBTdGFnZVxuICAgICAqIEBleHRlbmRzIERPTUVsZW1lbnRcbiAgICAgKiBAbW9kdWxlIFN0cnVjdHVyZUpTXG4gICAgICogQHN1Ym1vZHVsZSB2aWV3XG4gICAgICogQGNvbnN0cnVjdG9yXG4gICAgICogQGF1dGhvciBSb2JlcnQgUy4gKHd3dy5jb2RlQmVsdC5jb20pXG4gICAgICogQHJlcXVpcmVzIEV4dGVuZFxuICAgICAqIEByZXF1aXJlcyBET01FbGVtZW50XG4gICAgICogQHJlcXVpcmVzIGpRdWVyeVxuICAgICAqIEBleGFtcGxlXG4gICAgICogICAgIC8vIFRoaXMgZXhhbXBsZSBpbGx1c3RyYXRlcyBob3cgdG8gc2V0dXAgeW91ciBtYWluIGFwcGxpY2F0aW9uIG9yIHJvb3QgY2xhc3Mgd2hlbiBleHRlbmRpbmcgdGhlIHt7I2Nyb3NzTGluayBcIlN0YWdlXCJ9fXt7L2Nyb3NzTGlua319IGNsYXNzLlxuICAgICAqICAgICAgICAgY2xhc3MgTWFpbkNsYXNzIGV4dGVuZHMgU3RhZ2Uge1xuICAgICAqXG4gICAgICogICAgICAgICAgICAgY29uc3RydWN0b3IoKSB7XG4gICAgICogICAgICAgICAgICAgICAgIHN1cGVyKCk7XG4gICAgICogICAgICAgICAgICAgfVxuICAgICAqXG4gICAgICogICAgICAgICAgICAgY3JlYXRlKCkge1xuICAgICAqICAgICAgICAgICAgICAgICBzdXBlci5jcmVhdGUoKTtcbiAgICAgKlxuICAgICAqICAgICAgICAgICAgICAgICAvLyBDcmVhdGUgYW5kIGFkZCB5b3VyIGNoaWxkIG9iamVjdHMgdG8gdGhpcyBwYXJlbnQgY2xhc3MuXG4gICAgICogICAgICAgICAgICAgfVxuICAgICAqXG4gICAgICogICAgICAgICAgICAgbGF5b3V0KCkge1xuICAgICAqICAgICAgICAgICAgICAgICAvLyBMYXlvdXQgb3IgdXBkYXRlIHRoZSBjaGlsZCBvYmplY3RzIGluIHRoaXMgcGFyZW50IGNsYXNzLlxuICAgICAqXG4gICAgICogICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAqICAgICAgICAgICAgIH1cbiAgICAgKlxuICAgICAqICAgICAgICAgICAgIGVuYWJsZSgpIHtcbiAgICAgKiAgICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNFbmFibGVkID09PSB0cnVlKSB7IHJldHVybiB0aGlzIH07XG4gICAgICpcbiAgICAgKiAgICAgICAgICAgICAgICAgLy8gRW5hYmxlIHRoZSBjaGlsZCBvYmplY3RzIGFuZCBhZGQgYW55IGV2ZW50IGxpc3RlbmVycy5cbiAgICAgKlxuICAgICAqICAgICAgICAgICAgICAgICByZXR1cm4gc3VwZXIuZW5hYmxlKCk7XG4gICAgICogICAgICAgICAgICAgfVxuICAgICAqXG4gICAgICogICAgICAgICAgICAgZGlzYWJsZSgpIHtcbiAgICAgKiAgICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNFbmFibGVkID09PSBmYWxzZSkgeyByZXR1cm4gdGhpcyB9O1xuICAgICAqXG4gICAgICogICAgICAgICAgICAgICAgIC8vIERpc2FibGUgdGhlIGNoaWxkIG9iamVjdHMgYW5kIHJlbW92ZSBhbnkgZXZlbnQgbGlzdGVuZXJzLlxuICAgICAqXG4gICAgICogICAgICAgICAgICAgICAgIHJldHVybiBzdXBlci5kaXNhYmxlKCk7XG4gICAgICogICAgICAgICAgICAgfVxuICAgICAqXG4gICAgICogICAgICAgICAgICAgZGVzdHJveSgpIHtcbiAgICAgKiAgICAgICAgICAgICAgICAgdGhpcy5kaXNhYmxlKCk7XG4gICAgICpcbiAgICAgKiAgICAgICAgICAgICAgICAgLy8gRGVzdHJveSB0aGUgY2hpbGQgb2JqZWN0cyBhbmQgcmVmZXJlbmNlcyBpbiB0aGlzIHBhcmVudCBjbGFzcyB0byBwcmVwYXJlIGZvciBnYXJiYWdlIGNvbGxlY3Rpb24uXG4gICAgICpcbiAgICAgKiAgICAgICAgICAgICAgICAgc3VwZXIuZGVzdHJveSgpO1xuICAgICAqICAgICAgICAgICAgIH1cbiAgICAgKlxuICAgICAqICAgICAgICAgfVxuICAgICAqXG4gICAgICpcbiAgICAgKiA8Yj5JbnN0YW50aWF0aW9uIEV4YW1wbGU8L2I+PGJyPlxuICAgICAqIFRoaXMgZXhhbXBsZSBpbGx1c3RyYXRlcyBob3cgdG8gaW5zdGFudGlhdGUgeW91ciBtYWluIGFwcGxpY2F0aW9uIG9yIHJvb3QgY2xhc3MuXG4gICAgICpcbiAgICAgKiAgICAgIGxldCBhcHAgPSBuZXcgTWFpbkNsYXNzKCk7XG4gICAgICogICAgICBhcHAuYXBwZW5kVG8oJ2JvZHknKTtcbiAgICAgKlxuICAgICAqL1xuICAgIHZhciBTdGFnZSA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgICAgIF9fZXh0ZW5kcyhTdGFnZSwgX3N1cGVyKTtcbiAgICAgICAgZnVuY3Rpb24gU3RhZ2UoKSB7XG4gICAgICAgICAgICBfc3VwZXIuY2FsbCh0aGlzKTtcbiAgICAgICAgfVxuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIHNlbGVjdGVkIEhUTUwgZWxlbWVudCB3aGVyZSB0aGUgY2hpbGQgZWxlbWVudHMgd2lsbCBiZSBjcmVhdGVkLiBUaGlzIG1ldGhvZCBzdGFydHMgdGhlIGxpZmVjeWNsZSBvZiB0aGUgYXBwbGljYXRpb24uXG4gICAgICAgICAqXG4gICAgICAgICAqIEBtZXRob2QgYXBwZW5kVG9cbiAgICAgICAgICogQHBhcmFtIHR5cGUge2FueX0gQSBzdHJpbmcgdmFsdWUgd2hlcmUgeW91ciBhcHBsaWNhdGlvbiB3aWxsIGJlIGFwcGVuZGVkLiBUaGlzIGNhbiBiZSBhbiBlbGVtZW50IGlkICgjc29tZS1pZCksIGVsZW1lbnQgY2xhc3MgKC5zb21lLWNsYXNzKSBvciBhIGVsZW1lbnQgdGFnIChib2R5KS5cbiAgICAgICAgICogQHBhcmFtIFtlbmFibGVkPXRydWVdIHtib29sZWFufSBTZXRzIHRoZSBlbmFibGVkIHN0YXRlIG9mIHRoZSBvYmplY3QuXG4gICAgICAgICAqIEBjaGFpbmFibGVcbiAgICAgICAgICovXG4gICAgICAgIFN0YWdlLnByb3RvdHlwZS5hcHBlbmRUbyA9IGZ1bmN0aW9uICh0eXBlLCBlbmFibGVkKSB7XG4gICAgICAgICAgICBpZiAoZW5hYmxlZCA9PT0gdm9pZCAwKSB7IGVuYWJsZWQgPSB0cnVlOyB9XG4gICAgICAgICAgICB0aGlzLiRlbGVtZW50ID0gKHR5cGUgaW5zdGFuY2VvZiBqUXVlcnkpID8gdHlwZSA6IGpRdWVyeSh0eXBlKTtcbiAgICAgICAgICAgIHRoaXMuX2FkZENsaWVudFNpZGVJZCh0aGlzKTtcbiAgICAgICAgICAgIGlmICh0aGlzLmlzQ3JlYXRlZCA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNyZWF0ZSgpO1xuICAgICAgICAgICAgICAgIHRoaXMuaXNDcmVhdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBpZiAoZW5hYmxlZCA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kaXNhYmxlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmVuYWJsZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLmxheW91dCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBTdGFnZTtcbiAgICB9KShET01FbGVtZW50XzEuZGVmYXVsdCk7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuICAgIGV4cG9ydHMuZGVmYXVsdCA9IFN0YWdlO1xufSk7XG4iLCJ2YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07XG4gICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xufTtcbihmdW5jdGlvbiAoZmFjdG9yeSkge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlLmV4cG9ydHMgPT09ICdvYmplY3QnKSB7XG4gICAgICAgIHZhciB2ID0gZmFjdG9yeShyZXF1aXJlLCBleHBvcnRzKTsgaWYgKHYgIT09IHVuZGVmaW5lZCkgbW9kdWxlLmV4cG9ydHMgPSB2O1xuICAgIH1cbiAgICBlbHNlIGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHtcbiAgICAgICAgZGVmaW5lKFtcInJlcXVpcmVcIiwgXCJleHBvcnRzXCIsICcuLi9CYXNlT2JqZWN0J10sIGZhY3RvcnkpO1xuICAgIH1cbn0pKGZ1bmN0aW9uIChyZXF1aXJlLCBleHBvcnRzKSB7XG4gICAgdmFyIEJhc2VPYmplY3RfMSA9IHJlcXVpcmUoJy4uL0Jhc2VPYmplY3QnKTtcbiAgICAvKipcbiAgICAgKiBUaGUge3sjY3Jvc3NMaW5rIFwiQmFzZUV2ZW50XCJ9fXt7L2Nyb3NzTGlua319IGNsYXNzIGlzIHVzZWQgYXMgdGhlIGJhc2UgY2xhc3MgZm9yIHRoZSBjcmVhdGlvbiBvZiBFdmVudCBvYmplY3RzLCB3aGljaCBhcmUgcGFzc2VkIGFzIHBhcmFtZXRlcnMgdG8gZXZlbnQgbGlzdGVuZXJzIHdoZW4gYW4gZXZlbnQgb2NjdXJzLlxuICAgICAqXG4gICAgICogVGhlIHByb3BlcnRpZXMgb2YgdGhlIHt7I2Nyb3NzTGluayBcIkJhc2VFdmVudFwifX17ey9jcm9zc0xpbmt9fSBjbGFzcyBjYXJyeSBiYXNpYyBpbmZvcm1hdGlvbiBhYm91dCBhbiBldmVudCwgc3VjaCBhcyB0aGUgZXZlbnQncyB0eXBlIG9yIHdoZXRoZXIgdGhlIGV2ZW50J3MgZGVmYXVsdCBiZWhhdmlvciBjYW4gYmUgY2FuY2VsZWQuXG4gICAgICpcbiAgICAgKiBGb3IgbWFueSBldmVudHMsIHN1Y2ggYXMgdGhlIGV2ZW50cyByZXByZXNlbnRlZCBieSB0aGUgRXZlbnQgY2xhc3MgY29uc3RhbnRzLCB0aGlzIGJhc2ljIGluZm9ybWF0aW9uIGlzIHN1ZmZpY2llbnQuIE90aGVyIGV2ZW50cywgaG93ZXZlciwgbWF5IHJlcXVpcmUgbW9yZVxuICAgICAqIGRldGFpbGVkIGluZm9ybWF0aW9uLlxuICAgICAqIEBjbGFzcyBCYXNlRXZlbnRcbiAgICAgKiBAZXh0ZW5kcyBCYXNlT2JqZWN0XG4gICAgICogQHBhcmFtIHR5cGUge3N0cmluZ30gVGhlIHR5cGUgb2YgZXZlbnQuIFRoZSB0eXBlIGlzIGNhc2Utc2Vuc2l0aXZlLlxuICAgICAqIEBwYXJhbSBbYnViYmxlcz1mYWxzZV0ge2Jvb2xlYW59IEluZGljYXRlcyB3aGV0aGVyIGFuIGV2ZW50IGlzIGEgYnViYmxpbmcgZXZlbnQuIElmIHRoZSBldmVudCBjYW4gYnViYmxlLCB0aGlzIHZhbHVlIGlzIHRydWU7IG90aGVyd2lzZSBpdCBpcyBmYWxzZS5cbiAgICAgKiBOb3RlOiBXaXRoIGV2ZW50LWJ1YmJsaW5nIHlvdSBjYW4gbGV0IG9uZSBFdmVudCBzdWJzZXF1ZW50bHkgY2FsbCBvbiBldmVyeSBhbmNlc3RvciAoe3sjY3Jvc3NMaW5rIFwiRXZlbnREaXNwYXRjaGVyL3BhcmVudDpwcm9wZXJ0eVwifX17ey9jcm9zc0xpbmt9fSlcbiAgICAgKiAoY29udGFpbmVycyBvZiBjb250YWluZXJzIG9mIGV0Yy4pIG9mIHRoZSB7eyNjcm9zc0xpbmsgXCJEaXNwbGF5T2JqZWN0Q29udGFpbmVyXCJ9fXt7L2Nyb3NzTGlua319IHRoYXQgb3JpZ2luYWxseSBkaXNwYXRjaGVkIHRoZSBFdmVudCwgYWxsIHRoZSB3YXkgdXAgdG8gdGhlIHN1cmZhY2UgKHt7I2Nyb3NzTGluayBcIlN0YWdlXCJ9fXt7L2Nyb3NzTGlua319KS4gQW55IGNsYXNzZXMgdGhhdCBkbyBub3QgaGF2ZSBhIHBhcmVudCBjYW5ub3QgYnViYmxlLlxuICAgICAqIEBwYXJhbSBbY2FuY2VsYWJsZT1mYWxzZV0ge2Jvb2xlYW59IEluZGljYXRlcyB3aGV0aGVyIHRoZSBiZWhhdmlvciBhc3NvY2lhdGVkIHdpdGggdGhlIGV2ZW50IGNhbiBiZSBwcmV2ZW50ZWQuIElmIHRoZSBiZWhhdmlvciBjYW4gYmUgY2FuY2VsZWQsIHRoaXMgdmFsdWUgaXMgdHJ1ZTsgb3RoZXJ3aXNlIGl0IGlzIGZhbHNlLlxuICAgICAqIEBwYXJhbSBbZGF0YT1udWxsXSB7YW55fSBVc2UgdG8gcGFzcyBhbnkgdHlwZSBvZiBkYXRhIHdpdGggdGhlIGV2ZW50LlxuICAgICAqIEBtb2R1bGUgU3RydWN0dXJlSlNcbiAgICAgKiBAc3VibW9kdWxlIGV2ZW50XG4gICAgICogQHJlcXVpcmVzIEV4dGVuZFxuICAgICAqIEByZXF1aXJlcyBCYXNlT2JqZWN0XG4gICAgICogQGNvbnN0cnVjdG9yXG4gICAgICogQGF1dGhvciBSb2JlcnQgUy4gKHd3dy5jb2RlQmVsdC5jb20pXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiAgICAgLy8gRXhhbXBsZTogaG93IHRvIGNyZWF0ZSBhIGN1c3RvbSBldmVudCBieSBleHRlbmRpbmcgQmFzZUV2ZW50LlxuICAgICAqXG4gICAgICogICAgIGNsYXNzIENvdW50cnlFdmVudCBleHRlbmRzIEJhc2VFdmVudCB7XG4gICAgICpcbiAgICAgKiAgICAgICAgICBDSEFOR0VfQ09VTlRSWSA9ICdDb3VudHJ5RXZlbnQuY2hhbmdlQ291bnRyeSc7XG4gICAgICpcbiAgICAgKiAgICAgICAgICBjb25zdHJ1Y3Rvcih0eXBlLCBidWJibGVzID0gZmFsc2UsIGNhbmNlbGFibGUgPSBmYWxzZSwgZGF0YSA9IG51bGwpIHtcbiAgICAgKiAgICAgICAgICAgICAgc3VwZXIodHlwZSwgYnViYmxlcywgY2FuY2VsYWJsZSwgZGF0YSk7XG4gICAgICpcbiAgICAgKiAgICAgICAgICAgICAgdGhpcy5jb3VudHJ5TmFtZSA9IG51bGw7XG4gICAgICogICAgICAgICAgfVxuICAgICAqICAgICAgfVxuICAgICAqXG4gICAgICogICAgIC8vIEV4YW1wbGU6IGhvdyB0byB1c2UgdGhlIGN1c3RvbSBldmVudC5cbiAgICAgKiAgICAgbGV0IGV2ZW50ID0gbmV3IENvdW50cnlFdmVudChDb3VudHJ5RXZlbnQuQ0hBTkdFX0NPVU5UUlkpO1xuICAgICAqICAgICBldmVudC5jb3VudHJ5TmFtZSA9ICdDYW5hZGEnO1xuICAgICAqICAgICB0aGlzLmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xuICAgICAqL1xuICAgIHZhciBCYXNlRXZlbnQgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgICAgICBfX2V4dGVuZHMoQmFzZUV2ZW50LCBfc3VwZXIpO1xuICAgICAgICBmdW5jdGlvbiBCYXNlRXZlbnQodHlwZSwgYnViYmxlcywgY2FuY2VsYWJsZSwgZGF0YSkge1xuICAgICAgICAgICAgaWYgKGJ1YmJsZXMgPT09IHZvaWQgMCkgeyBidWJibGVzID0gZmFsc2U7IH1cbiAgICAgICAgICAgIGlmIChjYW5jZWxhYmxlID09PSB2b2lkIDApIHsgY2FuY2VsYWJsZSA9IGZhbHNlOyB9XG4gICAgICAgICAgICBpZiAoZGF0YSA9PT0gdm9pZCAwKSB7IGRhdGEgPSBudWxsOyB9XG4gICAgICAgICAgICBfc3VwZXIuY2FsbCh0aGlzKTtcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogVGhlIHR5cGUgb2YgZXZlbnQuXG4gICAgICAgICAgICAgKlxuICAgICAgICAgICAgICogQHByb3BlcnR5IHR5cGVcbiAgICAgICAgICAgICAqIEB0eXBlIHtzdHJpbmd9XG4gICAgICAgICAgICAgKiBAZGVmYXVsdCBudWxsXG4gICAgICAgICAgICAgKiBAcHVibGljXG4gICAgICAgICAgICAgKiBAcmVhZE9ubHlcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgdGhpcy50eXBlID0gbnVsbDtcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogQSByZWZlcmVuY2UgdG8gdGhlIG9iamVjdCB0aGF0IG9yaWdpbmFsbHkgZGlzcGF0Y2hlZCB0aGUgZXZlbnQuXG4gICAgICAgICAgICAgKlxuICAgICAgICAgICAgICogQHByb3BlcnR5IHRhcmdldFxuICAgICAgICAgICAgICogQHR5cGUge2FueX1cbiAgICAgICAgICAgICAqIEBkZWZhdWx0IG51bGxcbiAgICAgICAgICAgICAqIEBwdWJsaWNcbiAgICAgICAgICAgICAqIEByZWFkT25seVxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICB0aGlzLnRhcmdldCA9IG51bGw7XG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIFRoZSBjdXJyZW50VGFyZ2V0IHByb3BlcnR5IGFsd2F5cyBwb2ludHMgdG8gdGhlIHt7I2Nyb3NzTGluayBcIkRpc3BsYXlPYmplY3RDb250YWluZXJcIn19e3svY3Jvc3NMaW5rfX0gdGhhdCB0aGUgZXZlbnQgaXMgY3VycmVudGx5IHByb2Nlc3NpbmcgKGkuZS4gYnViYmxpbmcgYXQpLlxuICAgICAgICAgICAgICpcbiAgICAgICAgICAgICAqIEBwcm9wZXJ0eSBjdXJyZW50VGFyZ2V0XG4gICAgICAgICAgICAgKiBAdHlwZSB7YW55fVxuICAgICAgICAgICAgICogQGRlZmF1bHQgbnVsbFxuICAgICAgICAgICAgICogQHB1YmxpY1xuICAgICAgICAgICAgICogQHJlYWRPbmx5XG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHRoaXMuY3VycmVudFRhcmdldCA9IG51bGw7XG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIFVzZWQgdG8gcGFzcyBhbnkgdHlwZSBvZiBkYXRhIHdpdGggdGhlIGV2ZW50LlxuICAgICAgICAgICAgICpcbiAgICAgICAgICAgICAqIEBwcm9wZXJ0eSBkYXRhXG4gICAgICAgICAgICAgKiBAdHlwZSB7YW55fVxuICAgICAgICAgICAgICogQHB1YmxpY1xuICAgICAgICAgICAgICogQGRlZmF1bHQgbnVsbFxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICB0aGlzLmRhdGEgPSBudWxsO1xuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBJbmRpY2F0ZXMgd2hldGhlciBhbiBldmVudCBpcyBhIGJ1YmJsaW5nIGV2ZW50LlxuICAgICAgICAgICAgICpcbiAgICAgICAgICAgICAqIEBwcm9wZXJ0eSBidWJibGVzXG4gICAgICAgICAgICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICAgICAgICAgICAqIEBwdWJsaWNcbiAgICAgICAgICAgICAqIEBkZWZhdWx0IGZhbHNlXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHRoaXMuYnViYmxlcyA9IGZhbHNlO1xuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBJbmRpY2F0ZXMgd2hldGhlciB0aGUgYmVoYXZpb3IgYXNzb2NpYXRlZCB3aXRoIHRoZSBldmVudCBjYW4gYmUgcHJldmVudGVkLlxuICAgICAgICAgICAgICpcbiAgICAgICAgICAgICAqIEBwcm9wZXJ0eSBjYW5jZWxhYmxlXG4gICAgICAgICAgICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICAgICAgICAgICAqIEBwdWJsaWNcbiAgICAgICAgICAgICAqIEBkZWZhdWx0IGZhbHNlXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHRoaXMuY2FuY2VsYWJsZSA9IGZhbHNlO1xuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBJbmRpY2F0ZXMgaWYgdGhlIHt7I2Nyb3NzTGluayBcIkJhc2VFdmVudC9zdG9wUHJvcGFnYXRpb246bWV0aG9kXCJ9fXt7L2Nyb3NzTGlua319IHdhcyBjYWxsZWQgb24gdGhlIGV2ZW50IG9iamVjdC5cbiAgICAgICAgICAgICAqXG4gICAgICAgICAgICAgKiBAcHJvcGVydHkgaXNQcm9wYWdhdGlvblN0b3BwZWRcbiAgICAgICAgICAgICAqIEB0eXBlIHtib29sZWFufVxuICAgICAgICAgICAgICogQGRlZmF1bHQgZmFsc2VcbiAgICAgICAgICAgICAqIEBwdWJsaWNcbiAgICAgICAgICAgICAqIEByZWFkT25seVxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICB0aGlzLmlzUHJvcGFnYXRpb25TdG9wcGVkID0gZmFsc2U7XG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIEluZGljYXRlcyBpZiB0aGUge3sjY3Jvc3NMaW5rIFwiQmFzZUV2ZW50L3N0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbjptZXRob2RcIn19e3svY3Jvc3NMaW5rfX0gd2FzIGNhbGxlZCBvbiB0aGUgZXZlbnQgb2JqZWN0LlxuICAgICAgICAgICAgICpcbiAgICAgICAgICAgICAqIEBwcm9wZXJ0eSBpc0ltbWVkaWF0ZVByb3BhZ2F0aW9uU3RvcHBlZFxuICAgICAgICAgICAgICogQHR5cGUge2Jvb2xlYW59XG4gICAgICAgICAgICAgKiBAZGVmYXVsdCBmYWxzZVxuICAgICAgICAgICAgICogQHB1YmxpY1xuICAgICAgICAgICAgICogQHJlYWRPbmx5XG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHRoaXMuaXNJbW1lZGlhdGVQcm9wYWdhdGlvblN0b3BwZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMudHlwZSA9IHR5cGU7XG4gICAgICAgICAgICB0aGlzLmJ1YmJsZXMgPSBidWJibGVzO1xuICAgICAgICAgICAgdGhpcy5jYW5jZWxhYmxlID0gY2FuY2VsYWJsZTtcbiAgICAgICAgICAgIHRoaXMuZGF0YSA9IGRhdGE7XG4gICAgICAgIH1cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFByZXZlbnRzIHByb2Nlc3Npbmcgb2YgYW55IGV2ZW50IGxpc3RlbmVycyBpbiBub2RlcyBzdWJzZXF1ZW50IHRvIHRoZSBjdXJyZW50IG5vZGUgaW4gdGhlIGV2ZW50IGZsb3cuXG4gICAgICAgICAqIFRoaXMgbWV0aG9kIGRvZXMgbm90IGFmZmVjdCBhbnkgZXZlbnQgbGlzdGVuZXJzIGluIHRoZSBjdXJyZW50IG5vZGUgKGN1cnJlbnRUYXJnZXQpLiBJbiBjb250cmFzdCxcbiAgICAgICAgICogdGhlIHt7I2Nyb3NzTGluayBcIkJhc2VFdmVudC9zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb246bWV0aG9kXCJ9fXt7L2Nyb3NzTGlua319IG1ldGhvZCBwcmV2ZW50cyBwcm9jZXNzaW5nXG4gICAgICAgICAqIG9mIGV2ZW50IGxpc3RlbmVycyBpbiBib3RoIHRoZSBjdXJyZW50IG5vZGUgYW5kIHN1YnNlcXVlbnQgbm9kZXMuIEFkZGl0aW9uYWwgY2FsbHMgdG8gdGhpcyBtZXRob2QgaGF2ZSBubyBlZmZlY3QuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBtZXRob2Qgc3RvcFByb3BhZ2F0aW9uXG4gICAgICAgICAqIEBwdWJsaWNcbiAgICAgICAgICogQGV4YW1wbGVcbiAgICAgICAgICogICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgKi9cbiAgICAgICAgQmFzZUV2ZW50LnByb3RvdHlwZS5zdG9wUHJvcGFnYXRpb24gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLmlzUHJvcGFnYXRpb25TdG9wcGVkID0gdHJ1ZTtcbiAgICAgICAgfTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFByZXZlbnRzIHByb2Nlc3Npbmcgb2YgYW55IGV2ZW50IGxpc3RlbmVycyBpbiB0aGUgY3VycmVudCBub2RlIGFuZCBhbnkgc3Vic2VxdWVudCBub2RlcyBpbiB0aGUgZXZlbnQgZmxvdy5cbiAgICAgICAgICogVGhpcyBtZXRob2QgdGFrZXMgZWZmZWN0IGltbWVkaWF0ZWx5LCBhbmQgaXQgYWZmZWN0cyBldmVudCBsaXN0ZW5lcnMgaW4gdGhlIGN1cnJlbnQgbm9kZS4gSW4gY29udHJhc3QsXG4gICAgICAgICAqIHRoZSB7eyNjcm9zc0xpbmsgXCJCYXNlRXZlbnQvc3RvcFByb3BhZ2F0aW9uOm1ldGhvZFwifX17ey9jcm9zc0xpbmt9fSBtZXRob2QgZG9lc24ndCB0YWtlIGVmZmVjdCB1bnRpbFxuICAgICAgICAgKiBhbGwgdGhlIGV2ZW50IGxpc3RlbmVycyBpbiB0aGUgY3VycmVudCBub2RlIGZpbmlzaCBwcm9jZXNzaW5nLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAbWV0aG9kIHN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvblxuICAgICAgICAgKiBAcHVibGljXG4gICAgICAgICAqIEBleGFtcGxlXG4gICAgICAgICAqICAgICBldmVudC5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICovXG4gICAgICAgIEJhc2VFdmVudC5wcm90b3R5cGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgIHRoaXMuaXNJbW1lZGlhdGVQcm9wYWdhdGlvblN0b3BwZWQgPSB0cnVlO1xuICAgICAgICB9O1xuICAgICAgICAvKipcbiAgICAgICAgICogRHVwbGljYXRlcyBhbiBpbnN0YW5jZSBvZiBhbiBCYXNlRXZlbnQgc3ViY2xhc3MuXG4gICAgICAgICAqXG4gICAgICAgICAqIFJldHVybnMgYSBuZXcgQmFzZUV2ZW50IG9iamVjdCB0aGF0IGlzIGEgY29weSBvZiB0aGUgb3JpZ2luYWwgaW5zdGFuY2Ugb2YgdGhlIEJhc2VFdmVudCBvYmplY3QuXG4gICAgICAgICAqXG4gICAgICAgICAqIFRoZSBuZXcgQmFzZUV2ZW50IG9iamVjdCBpbmNsdWRlcyBhbGwgdGhlIHByb3BlcnRpZXMgb2YgdGhlIG9yaWdpbmFsLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAbWV0aG9kIGNsb25lXG4gICAgICAgICAqIEByZXR1cm5zIHtCYXNlRXZlbnR9XG4gICAgICAgICAqIEBwdWJsaWNcbiAgICAgICAgICogQGV4YW1wbGVcbiAgICAgICAgICogICAgIGxldCBjbG9uZU9mRXZlbnQgPSBldmVudC5jbG9uZSgpO1xuICAgICAgICAgKi9cbiAgICAgICAgQmFzZUV2ZW50LnByb3RvdHlwZS5jbG9uZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBjbG9uZWRCYXNlTW9kZWwgPSBuZXcgdGhpcy5jb25zdHJ1Y3Rvcih0aGlzLnR5cGUsIHRoaXMuYnViYmxlcywgdGhpcy5jYW5jZWxhYmxlLCB0aGlzLmRhdGEpO1xuICAgICAgICAgICAgZm9yICh2YXIga2V5IGluIHRoaXMpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNsb25lZEJhc2VNb2RlbFtrZXldID0gdGhpc1trZXldO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBjbG9uZWRCYXNlTW9kZWw7XG4gICAgICAgIH07XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgQmFzZUV2ZW50LkFDVElWQVRFIGNvbnN0YW50IGRlZmluZXMgdGhlIHZhbHVlIG9mIHRoZSB0eXBlIHByb3BlcnR5IG9mIGFuIGFjdGl2YXRlIGV2ZW50IG9iamVjdC5cbiAgICAgICAgICpcbiAgICAgICAgICogQGV2ZW50IEFDVElWQVRFXG4gICAgICAgICAqIEB0eXBlIHtzdHJpbmd9XG4gICAgICAgICAqIEBwdWJsaWNcbiAgICAgICAgICogQHN0YXRpY1xuICAgICAgICAgKi9cbiAgICAgICAgQmFzZUV2ZW50LkFDVElWQVRFID0gJ0Jhc2VFdmVudC5hY3RpdmF0ZSc7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgQmFzZUV2ZW50LkFEREVEIGNvbnN0YW50IGRlZmluZXMgdGhlIHZhbHVlIG9mIHRoZSB0eXBlIHByb3BlcnR5IG9mIGFuIGFkZGVkIGV2ZW50IG9iamVjdC5cbiAgICAgICAgICpcbiAgICAgICAgICogQGV2ZW50IEFEREVEXG4gICAgICAgICAqIEB0eXBlIHtzdHJpbmd9XG4gICAgICAgICAqIEBwdWJsaWNcbiAgICAgICAgICogQHN0YXRpY1xuICAgICAgICAgKi9cbiAgICAgICAgQmFzZUV2ZW50LkFEREVEID0gJ0Jhc2VFdmVudC5hZGRlZCc7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgQmFzZUV2ZW50LkFEREVEX1RPX1NUQUdFIGNvbnN0YW50IGRlZmluZXMgdGhlIHZhbHVlIG9mIHRoZSB0eXBlIHByb3BlcnR5IG9mIGFuIGFkZGVkVG9TdGFnZSBldmVudCBvYmplY3QuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBldmVudCBBRERFRF9UT19TVEFHRVxuICAgICAgICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgICAgICAgKiBAcHVibGljXG4gICAgICAgICAqIEBzdGF0aWNcbiAgICAgICAgICovXG4gICAgICAgIEJhc2VFdmVudC5BRERFRF9UT19TVEFHRSA9ICdCYXNlRXZlbnQuYWRkZWRUb1N0YWdlJztcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSBCYXNlRXZlbnQuQ0FOQ0VMIGNvbnN0YW50IGRlZmluZXMgdGhlIHZhbHVlIG9mIHRoZSB0eXBlIHByb3BlcnR5IG9mIGEgY2FuY2VsIGV2ZW50IG9iamVjdC5cbiAgICAgICAgICpcbiAgICAgICAgICogQGV2ZW50IENBTkNFTFxuICAgICAgICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgICAgICAgKiBAcHVibGljXG4gICAgICAgICAqIEBzdGF0aWNcbiAgICAgICAgICovXG4gICAgICAgIEJhc2VFdmVudC5DQU5DRUwgPSAnQmFzZUV2ZW50LmNhbmNlbCc7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgQmFzZUV2ZW50LkNIQU5HRSBjb25zdGFudCBkZWZpbmVzIHRoZSB2YWx1ZSBvZiB0aGUgdHlwZSBwcm9wZXJ0eSBvZiBhIGNoYW5nZSBldmVudCBvYmplY3QuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBldmVudCBDSEFOR0VcbiAgICAgICAgICogQHR5cGUge3N0cmluZ31cbiAgICAgICAgICogQHB1YmxpY1xuICAgICAgICAgKiBAc3RhdGljXG4gICAgICAgICAqL1xuICAgICAgICBCYXNlRXZlbnQuQ0hBTkdFID0gJ0Jhc2VFdmVudC5jaGFuZ2UnO1xuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIEJhc2VFdmVudC5DTEVBUiBjb25zdGFudCBkZWZpbmVzIHRoZSB2YWx1ZSBvZiB0aGUgdHlwZSBwcm9wZXJ0eSBvZiBhIGNsZWFyIGV2ZW50IG9iamVjdC5cbiAgICAgICAgICpcbiAgICAgICAgICogQGV2ZW50IENMRUFSXG4gICAgICAgICAqIEB0eXBlIHtzdHJpbmd9XG4gICAgICAgICAqIEBwdWJsaWNcbiAgICAgICAgICogQHN0YXRpY1xuICAgICAgICAgKi9cbiAgICAgICAgQmFzZUV2ZW50LkNMRUFSID0gJ0Jhc2VFdmVudC5jbGVhcic7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgQmFzZUV2ZW50LkNMT1NFIGNvbnN0YW50IGRlZmluZXMgdGhlIHZhbHVlIG9mIHRoZSB0eXBlIHByb3BlcnR5IG9mIGEgY2xvc2UgZXZlbnQgb2JqZWN0LlxuICAgICAgICAgKlxuICAgICAgICAgKiBAZXZlbnQgQ0xPU0VcbiAgICAgICAgICogQHR5cGUge3N0cmluZ31cbiAgICAgICAgICogQHB1YmxpY1xuICAgICAgICAgKiBAc3RhdGljXG4gICAgICAgICAqL1xuICAgICAgICBCYXNlRXZlbnQuQ0xPU0UgPSAnQmFzZUV2ZW50LmNsb3NlJztcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSBCYXNlRXZlbnQuQ0xPU0lORyBjb25zdGFudCBkZWZpbmVzIHRoZSB2YWx1ZSBvZiB0aGUgdHlwZSBwcm9wZXJ0eSBvZiBhIGNsb3NpbmcgZXZlbnQgb2JqZWN0LlxuICAgICAgICAgKlxuICAgICAgICAgKiBAZXZlbnQgQ0xPU0lOR1xuICAgICAgICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgICAgICAgKiBAcHVibGljXG4gICAgICAgICAqIEBzdGF0aWNcbiAgICAgICAgICovXG4gICAgICAgIEJhc2VFdmVudC5DTE9TSU5HID0gJ0Jhc2VFdmVudC5jbG9zaW5nJztcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSBCYXNlRXZlbnQuQ09NUExFVEUgY29uc3RhbnQgZGVmaW5lcyB0aGUgdmFsdWUgb2YgdGhlIHR5cGUgcHJvcGVydHkgb2YgYSBjb21wbGV0ZSBldmVudCBvYmplY3QuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBldmVudCBDT01QTEVURVxuICAgICAgICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgICAgICAgKiBAcHVibGljXG4gICAgICAgICAqIEBzdGF0aWNcbiAgICAgICAgICovXG4gICAgICAgIEJhc2VFdmVudC5DT01QTEVURSA9ICdCYXNlRXZlbnQuY29tcGxldGUnO1xuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIEJhc2VFdmVudC5DT05ORUNUIGNvbnN0YW50IGRlZmluZXMgdGhlIHZhbHVlIG9mIHRoZSB0eXBlIHByb3BlcnR5IG9mIGEgY29ubmVjdCBldmVudCBvYmplY3QuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBldmVudCBDT05ORUNUXG4gICAgICAgICAqIEB0eXBlIHtzdHJpbmd9XG4gICAgICAgICAqIEBwdWJsaWNcbiAgICAgICAgICogQHN0YXRpY1xuICAgICAgICAgKi9cbiAgICAgICAgQmFzZUV2ZW50LkNPTk5FQ1QgPSAnQmFzZUV2ZW50LmNvbm5lY3QnO1xuICAgICAgICAvKipcbiAgICAgICAgICogRGVmaW5lcyB0aGUgdmFsdWUgb2YgdGhlIHR5cGUgcHJvcGVydHkgb2YgYSBjb3B5IGV2ZW50IG9iamVjdC5cbiAgICAgICAgICpcbiAgICAgICAgICogQGV2ZW50IENPUFlcbiAgICAgICAgICogQHR5cGUge3N0cmluZ31cbiAgICAgICAgICogQHB1YmxpY1xuICAgICAgICAgKiBAc3RhdGljXG4gICAgICAgICAqL1xuICAgICAgICBCYXNlRXZlbnQuQ09QWSA9ICdCYXNlRXZlbnQuY29weSc7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBEZWZpbmVzIHRoZSB2YWx1ZSBvZiB0aGUgdHlwZSBwcm9wZXJ0eSBvZiBhIGN1dCBldmVudCBvYmplY3QuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBldmVudCBDVVRcbiAgICAgICAgICogQHR5cGUge3N0cmluZ31cbiAgICAgICAgICogQHB1YmxpY1xuICAgICAgICAgKiBAc3RhdGljXG4gICAgICAgICAqL1xuICAgICAgICBCYXNlRXZlbnQuQ1VUID0gJ0Jhc2VFdmVudC5jdXQnO1xuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIEJhc2VFdmVudC5ERUFDVElWQVRFIGNvbnN0YW50IGRlZmluZXMgdGhlIHZhbHVlIG9mIHRoZSB0eXBlIHByb3BlcnR5IG9mIGEgZGVhY3RpdmF0ZSBldmVudCBvYmplY3QuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBldmVudCBERUFDVElWQVRFXG4gICAgICAgICAqIEB0eXBlIHtzdHJpbmd9XG4gICAgICAgICAqIEBwdWJsaWNcbiAgICAgICAgICogQHN0YXRpY1xuICAgICAgICAgKi9cbiAgICAgICAgQmFzZUV2ZW50LkRFQUNUSVZBVEUgPSAnQmFzZUV2ZW50LmRlYWN0aXZhdGUnO1xuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIEJhc2VFdmVudC5ESVNQTEFZSU5HIGNvbnN0YW50IGRlZmluZXMgdGhlIHZhbHVlIG9mIHRoZSB0eXBlIHByb3BlcnR5IG9mIGEgZGlzcGxheWluZyBldmVudCBvYmplY3QuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBldmVudCBESVNQTEFZSU5HXG4gICAgICAgICAqIEB0eXBlIHtzdHJpbmd9XG4gICAgICAgICAqIEBwdWJsaWNcbiAgICAgICAgICogQHN0YXRpY1xuICAgICAgICAgKi9cbiAgICAgICAgQmFzZUV2ZW50LkRJU1BMQVlJTkcgPSAnQmFzZUV2ZW50LmRpc3BsYXlpbmcnO1xuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIEJhc2VFdmVudC5FTlRFUl9GUkFNRSBjb25zdGFudCBkZWZpbmVzIHRoZSB2YWx1ZSBvZiB0aGUgdHlwZSBwcm9wZXJ0eSBvZiBhbiBlbnRlckZyYW1lIGV2ZW50IG9iamVjdC5cbiAgICAgICAgICpcbiAgICAgICAgICogQGV2ZW50IEVOVEVSX0ZSQU1FXG4gICAgICAgICAqIEB0eXBlIHtzdHJpbmd9XG4gICAgICAgICAqIEBwdWJsaWNcbiAgICAgICAgICogQHN0YXRpY1xuICAgICAgICAgKi9cbiAgICAgICAgQmFzZUV2ZW50LkVOVEVSX0ZSQU1FID0gJ0Jhc2VFdmVudC5lbnRlckZyYW1lJztcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSBCYXNlRXZlbnQuRVhJVF9GUkFNRSBjb25zdGFudCBkZWZpbmVzIHRoZSB2YWx1ZSBvZiB0aGUgdHlwZSBwcm9wZXJ0eSBvZiBhbiBleGl0RnJhbWUgZXZlbnQgb2JqZWN0LlxuICAgICAgICAgKlxuICAgICAgICAgKiBAZXZlbnQgRVhJVF9GUkFNRVxuICAgICAgICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgICAgICAgKiBAcHVibGljXG4gICAgICAgICAqIEBzdGF0aWNcbiAgICAgICAgICovXG4gICAgICAgIEJhc2VFdmVudC5FWElUX0ZSQU1FID0gJ0Jhc2VFdmVudC5leGl0RnJhbWUnO1xuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIEJhc2VFdmVudC5FWElUSU5HIGNvbnN0YW50IGRlZmluZXMgdGhlIHZhbHVlIG9mIHRoZSB0eXBlIHByb3BlcnR5IG9mIGFuIGV4aXRpbmcgZXZlbnQgb2JqZWN0LlxuICAgICAgICAgKlxuICAgICAgICAgKiBAZXZlbnQgRVhJVElOR1xuICAgICAgICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgICAgICAgKiBAcHVibGljXG4gICAgICAgICAqIEBzdGF0aWNcbiAgICAgICAgICovXG4gICAgICAgIEJhc2VFdmVudC5FWElUSU5HID0gJ0Jhc2VFdmVudC5leGl0aW5nJztcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSBCYXNlRXZlbnQuRlVMTF9TQ1JFRU4gY29uc3RhbnQgZGVmaW5lcyB0aGUgdmFsdWUgb2YgdGhlIHR5cGUgcHJvcGVydHkgb2YgYSBmdWxsU2NyZWVuIGV2ZW50IG9iamVjdC5cbiAgICAgICAgICpcbiAgICAgICAgICogQGV2ZW50IEZVTExTQ1JFRU5cbiAgICAgICAgICogQHR5cGUge3N0cmluZ31cbiAgICAgICAgICogQHB1YmxpY1xuICAgICAgICAgKiBAc3RhdGljXG4gICAgICAgICAqL1xuICAgICAgICBCYXNlRXZlbnQuRlVMTFNDUkVFTiA9ICdCYXNlRXZlbnQuZnVsbFNjcmVlbic7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgQmFzZUV2ZW50LklOSVQgY29uc3RhbnQgZGVmaW5lcyB0aGUgdmFsdWUgb2YgdGhlIHR5cGUgcHJvcGVydHkgb2YgYW4gaW5pdCBldmVudCBvYmplY3QuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBldmVudCBJTklUXG4gICAgICAgICAqIEB0eXBlIHtzdHJpbmd9XG4gICAgICAgICAqIEBwdWJsaWNcbiAgICAgICAgICogQHN0YXRpY1xuICAgICAgICAgKi9cbiAgICAgICAgQmFzZUV2ZW50LklOSVQgPSAnQmFzZUV2ZW50LmluaXQnO1xuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIEJhc2VFdmVudC5ORVRXT1JLX0NIQU5HRSBjb25zdGFudCBkZWZpbmVzIHRoZSB2YWx1ZSBvZiB0aGUgdHlwZSBwcm9wZXJ0eSBvZiBhIG5ldHdvcmtDaGFuZ2UgZXZlbnQgb2JqZWN0LlxuICAgICAgICAgKlxuICAgICAgICAgKiBAZXZlbnQgTkVUV09SS19DSEFOR0VcbiAgICAgICAgICogQHR5cGUge3N0cmluZ31cbiAgICAgICAgICogQHB1YmxpY1xuICAgICAgICAgKiBAc3RhdGljXG4gICAgICAgICAqL1xuICAgICAgICBCYXNlRXZlbnQuTkVUV09SS19DSEFOR0UgPSAnQmFzZUV2ZW50Lm5ldHdvcmtDaGFuZ2UnO1xuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIEJhc2VFdmVudC5PUEVOIGNvbnN0YW50IGRlZmluZXMgdGhlIHZhbHVlIG9mIHRoZSB0eXBlIHByb3BlcnR5IG9mIGFuIG9wZW4gZXZlbnQgb2JqZWN0LlxuICAgICAgICAgKlxuICAgICAgICAgKiBAZXZlbnQgT1BFTlxuICAgICAgICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgICAgICAgKiBAcHVibGljXG4gICAgICAgICAqIEBzdGF0aWNcbiAgICAgICAgICovXG4gICAgICAgIEJhc2VFdmVudC5PUEVOID0gJ0Jhc2VFdmVudC5vcGVuJztcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSBCYXNlRXZlbnQuUEFTVEUgY29uc3RhbnQgZGVmaW5lcyB0aGUgdmFsdWUgb2YgdGhlIHR5cGUgcHJvcGVydHkgb2YgYSBwYXN0ZSBldmVudCBvYmplY3QuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBldmVudCBQQVNURVxuICAgICAgICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgICAgICAgKiBAcHVibGljXG4gICAgICAgICAqIEBzdGF0aWNcbiAgICAgICAgICovXG4gICAgICAgIEJhc2VFdmVudC5QQVNURSA9ICdCYXNlRXZlbnQucGFzdGUnO1xuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIEJhc2VFdmVudC5QUkVQQVJJTkcgY29uc3RhbnQgZGVmaW5lcyB0aGUgdmFsdWUgb2YgdGhlIHR5cGUgcHJvcGVydHkgb2YgYSBwcmVwYXJpbmcgZXZlbnQgb2JqZWN0LlxuICAgICAgICAgKlxuICAgICAgICAgKiBAZXZlbnQgUFJFUEFSSU5HXG4gICAgICAgICAqIEB0eXBlIHtzdHJpbmd9XG4gICAgICAgICAqIEBwdWJsaWNcbiAgICAgICAgICogQHN0YXRpY1xuICAgICAgICAgKi9cbiAgICAgICAgQmFzZUV2ZW50LlBSRVBBUklORyA9ICdCYXNlRXZlbnQucHJlcGFyaW5nJztcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSBCYXNlRXZlbnQuUkVNT1ZFRCBjb25zdGFudCBkZWZpbmVzIHRoZSB2YWx1ZSBvZiB0aGUgdHlwZSBwcm9wZXJ0eSBvZiBhIHJlbW92ZWQgZXZlbnQgb2JqZWN0LlxuICAgICAgICAgKlxuICAgICAgICAgKiBAZXZlbnQgUkVNT1ZFRFxuICAgICAgICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgICAgICAgKiBAcHVibGljXG4gICAgICAgICAqIEBzdGF0aWNcbiAgICAgICAgICovXG4gICAgICAgIEJhc2VFdmVudC5SRU1PVkVEID0gJ0Jhc2VFdmVudC5yZW1vdmVkJztcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSBCYXNlRXZlbnQuUkVOREVSIGNvbnN0YW50IGRlZmluZXMgdGhlIHZhbHVlIG9mIHRoZSB0eXBlIHByb3BlcnR5IG9mIGEgcmVuZGVyIGV2ZW50IG9iamVjdC5cbiAgICAgICAgICpcbiAgICAgICAgICogQGV2ZW50IFJFTkRFUlxuICAgICAgICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgICAgICAgKiBAcHVibGljXG4gICAgICAgICAqIEBzdGF0aWNcbiAgICAgICAgICovXG4gICAgICAgIEJhc2VFdmVudC5SRU5ERVIgPSAnQmFzZUV2ZW50LnJlbmRlcic7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgQmFzZUV2ZW50LlJFU0laRSBjb25zdGFudCBkZWZpbmVzIHRoZSB2YWx1ZSBvZiB0aGUgdHlwZSBwcm9wZXJ0eSBvZiBhIHJlc2l6ZSBldmVudCBvYmplY3QuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBldmVudCBSRVNJWkVcbiAgICAgICAgICogQHR5cGUge3N0cmluZ31cbiAgICAgICAgICogQHB1YmxpY1xuICAgICAgICAgKiBAc3RhdGljXG4gICAgICAgICAqL1xuICAgICAgICBCYXNlRXZlbnQuUkVTSVpFID0gJ0Jhc2VFdmVudC5yZXNpemUnO1xuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIEJhc2VFdmVudC5TRUxFQ1RFRCBjb25zdGFudCBkZWZpbmVzIHRoZSB2YWx1ZSBvZiB0aGUgdHlwZSBwcm9wZXJ0eSBvZiBhIHNlbGVjdGVkIGV2ZW50IG9iamVjdC5cbiAgICAgICAgICpcbiAgICAgICAgICogQGV2ZW50IFNFTEVDVEVEXG4gICAgICAgICAqIEB0eXBlIHtzdHJpbmd9XG4gICAgICAgICAqIEBwdWJsaWNcbiAgICAgICAgICogQHN0YXRpY1xuICAgICAgICAgKi9cbiAgICAgICAgQmFzZUV2ZW50LlNFTEVDVEVEID0gJ0Jhc2VFdmVudC5zZWxlY3RlZCc7XG4gICAgICAgIHJldHVybiBCYXNlRXZlbnQ7XG4gICAgfSkoQmFzZU9iamVjdF8xLmRlZmF1bHQpO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbiAgICBleHBvcnRzLmRlZmF1bHQgPSBCYXNlRXZlbnQ7XG59KTtcbiIsInZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgZnVuY3Rpb24gKGQsIGIpIHtcbiAgICBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTtcbiAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG59O1xuKGZ1bmN0aW9uIChmYWN0b3J5KSB7XG4gICAgaWYgKHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUuZXhwb3J0cyA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgdmFyIHYgPSBmYWN0b3J5KHJlcXVpcmUsIGV4cG9ydHMpOyBpZiAodiAhPT0gdW5kZWZpbmVkKSBtb2R1bGUuZXhwb3J0cyA9IHY7XG4gICAgfVxuICAgIGVsc2UgaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkge1xuICAgICAgICBkZWZpbmUoW1wicmVxdWlyZVwiLCBcImV4cG9ydHNcIiwgJy4uL09iamVjdE1hbmFnZXInLCAnLi9CYXNlRXZlbnQnXSwgZmFjdG9yeSk7XG4gICAgfVxufSkoZnVuY3Rpb24gKHJlcXVpcmUsIGV4cG9ydHMpIHtcbiAgICB2YXIgT2JqZWN0TWFuYWdlcl8xID0gcmVxdWlyZSgnLi4vT2JqZWN0TWFuYWdlcicpO1xuICAgIHZhciBCYXNlRXZlbnRfMSA9IHJlcXVpcmUoJy4vQmFzZUV2ZW50Jyk7XG4gICAgLyoqXG4gICAgICogRXZlbnREaXNwYXRjaGVyIGlzIHRoZSBiYXNlIGNsYXNzIGZvciBhbGwgY2xhc3NlcyB0aGF0IGRpc3BhdGNoIGV2ZW50cy4gSXQgaXMgdGhlIGJhc2UgY2xhc3MgZm9yIHRoZSB7eyNjcm9zc0xpbmsgXCJEaXNwbGF5T2JqZWN0Q29udGFpbmVyXCJ9fXt7L2Nyb3NzTGlua319IGNsYXNzLlxuICAgICAqIEV2ZW50RGlzcGF0Y2hlciBwcm92aWRlcyBtZXRob2RzIGZvciBtYW5hZ2luZyBwcmlvcml0aXplZCBxdWV1ZXMgb2YgZXZlbnQgbGlzdGVuZXJzIGFuZCBkaXNwYXRjaGluZyBldmVudHMuXG4gICAgICpcbiAgICAgKiBAY2xhc3MgRXZlbnREaXNwYXRjaGVyXG4gICAgICogQGV4dGVuZHMgT2JqZWN0TWFuYWdlclxuICAgICAqIEBtb2R1bGUgU3RydWN0dXJlSlNcbiAgICAgKiBAc3VibW9kdWxlIGV2ZW50XG4gICAgICogQHJlcXVpcmVzIEV4dGVuZFxuICAgICAqIEByZXF1aXJlcyBPYmplY3RNYW5hZ2VyXG4gICAgICogQHJlcXVpcmVzIEJhc2VFdmVudFxuICAgICAqIEBjb25zdHJ1Y3RvclxuICAgICAqIEBhdXRob3IgUm9iZXJ0IFMuICh3d3cuY29kZUJlbHQuY29tKVxuICAgICAqIEBleGFtcGxlXG4gICAgICogICAgICAvLyBBbm90aGVyIHdheSB0byB1c2UgdGhlIEV2ZW50RGlzcGF0Y2hlci5cbiAgICAgKiAgICAgIGxldCBldmVudERpc3BhdGNoZXIgPSBuZXcgRXZlbnREaXNwYXRjaGVyKCk7XG4gICAgICogICAgICBldmVudERpc3BhdGNoZXIuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgdGhpcy5faGFuZGxlck1ldGhvZCwgdGhpcyk7XG4gICAgICogICAgICBldmVudERpc3BhdGNoZXIuZGlzcGF0Y2hFdmVudCgnY2hhbmdlJyk7XG4gICAgICovXG4gICAgdmFyIEV2ZW50RGlzcGF0Y2hlciA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgICAgIF9fZXh0ZW5kcyhFdmVudERpc3BhdGNoZXIsIF9zdXBlcik7XG4gICAgICAgIGZ1bmN0aW9uIEV2ZW50RGlzcGF0Y2hlcigpIHtcbiAgICAgICAgICAgIF9zdXBlci5jYWxsKHRoaXMpO1xuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBIb2xkcyBhIHJlZmVyZW5jZSB0byBhZGRlZCBsaXN0ZW5lcnMuXG4gICAgICAgICAgICAgKlxuICAgICAgICAgICAgICogQHByb3BlcnR5IF9saXN0ZW5lcnNcbiAgICAgICAgICAgICAqIEB0eXBlIHtBcnJheS48YW55Pn1cbiAgICAgICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgdGhpcy5fbGlzdGVuZXJzID0gbnVsbDtcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogSW5kaWNhdGVzIHRoZSBvYmplY3QgdGhhdCBjb250YWlucyBhIGNoaWxkIG9iamVjdC4gVXNlcyB0aGUgcGFyZW50IHByb3BlcnR5XG4gICAgICAgICAgICAgKiB0byBzcGVjaWZ5IGEgcmVsYXRpdmUgcGF0aCB0byBkaXNwbGF5IG9iamVjdHMgdGhhdCBhcmUgYWJvdmUgdGhlIGN1cnJlbnQgZGlzcGxheSBvYmplY3QgaW4gdGhlIGRpc3BsYXlcbiAgICAgICAgICAgICAqIGxpc3QgaGllcmFyY2h5IGFuZCBoZWxwcyBmYWNpbGl0YXRlIGV2ZW50IGJ1YmJsaW5nLlxuICAgICAgICAgICAgICpcbiAgICAgICAgICAgICAqIEBwcm9wZXJ0eSBwYXJlbnRcbiAgICAgICAgICAgICAqIEB0eXBlIHthbnl9XG4gICAgICAgICAgICAgKiBAcHVibGljXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHRoaXMucGFyZW50ID0gbnVsbDtcbiAgICAgICAgICAgIHRoaXMuX2xpc3RlbmVycyA9IFtdO1xuICAgICAgICB9XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBSZWdpc3RlcnMgYW4gZXZlbnQgbGlzdGVuZXIgb2JqZWN0IHdpdGggYW4gRXZlbnREaXNwYXRjaGVyIG9iamVjdCBzbyB0aGUgbGlzdGVuZXIgcmVjZWl2ZXMgbm90aWZpY2F0aW9uIG9mIGFuIGV2ZW50LlxuICAgICAgICAgKlxuICAgICAgICAgKiBAbWV0aG9kIGFkZEV2ZW50TGlzdGVuZXJcbiAgICAgICAgICogQHBhcmFtIHR5cGUge1N0cmluZ30gVGhlIHR5cGUgb2YgZXZlbnQuXG4gICAgICAgICAqIEBwYXJhbSBjYWxsYmFjayB7RnVuY3Rpb259IFRoZSBsaXN0ZW5lciBmdW5jdGlvbiB0aGF0IHByb2Nlc3NlcyB0aGUgZXZlbnQuIFRoaXMgZnVuY3Rpb24gbXVzdCBhY2NlcHQgYW4gRXZlbnQgb2JqZWN0IGFzIGl0cyBvbmx5IHBhcmFtZXRlciBhbmQgbXVzdCByZXR1cm4gbm90aGluZywgYXMgdGhpcyBleGFtcGxlIHNob3dzLiBAZXhhbXBsZSBmdW5jdGlvbihldmVudDpFdmVudCk6dm9pZFxuICAgICAgICAgKiBAcGFyYW0gc2NvcGUge2FueX0gQmluZHMgdGhlIHNjb3BlIHRvIGEgcGFydGljdWxhciBvYmplY3QgKHNjb3BlIGlzIGJhc2ljYWxseSB3aGF0IFwidGhpc1wiIHJlZmVycyB0byBpbiB5b3VyIGZ1bmN0aW9uKS4gVGhpcyBjYW4gYmUgdmVyeSB1c2VmdWwgaW4gSmF2YVNjcmlwdCBiZWNhdXNlIHNjb3BlIGlzbid0IGdlbmVyYWxseSBtYWludGFpbmVkLlxuICAgICAgICAgKiBAcGFyYW0gW3ByaW9yaXR5PTBdIHtpbnR9IEluZmx1ZW5jZXMgdGhlIG9yZGVyIGluIHdoaWNoIHRoZSBsaXN0ZW5lcnMgYXJlIGNhbGxlZC4gTGlzdGVuZXJzIHdpdGggbG93ZXIgcHJpb3JpdGllcyBhcmUgY2FsbGVkIGFmdGVyIG9uZXMgd2l0aCBoaWdoZXIgcHJpb3JpdGllcy5cbiAgICAgICAgICogQHB1YmxpY1xuICAgICAgICAgKiBAY2hhaW5hYmxlXG4gICAgICAgICAqIEBleGFtcGxlXG4gICAgICAgICAqICAgICAgdGhpcy5hZGRFdmVudExpc3RlbmVyKEJhc2VFdmVudC5DSEFOR0UsIHRoaXMuX2hhbmRsZXJNZXRob2QsIHRoaXMpO1xuICAgICAgICAgKlxuICAgICAgICAgKiAgICAgIF9oYW5kbGVyTWV0aG9kKGV2ZW50KSB7XG4gICAgICAgICAqICAgICAgICAgIGNvbnNvbGUubG9nKGV2ZW50LnRhcmdldCArIFwiIHNlbnQgdGhlIGV2ZW50LlwiKTtcbiAgICAgICAgICogICAgICAgICAgY29uc29sZS5sb2coZXZlbnQudHlwZSwgZXZlbnQuZGF0YSk7XG4gICAgICAgICAqICAgICAgfVxuICAgICAgICAgKi9cbiAgICAgICAgRXZlbnREaXNwYXRjaGVyLnByb3RvdHlwZS5hZGRFdmVudExpc3RlbmVyID0gZnVuY3Rpb24gKHR5cGUsIGNhbGxiYWNrLCBzY29wZSwgcHJpb3JpdHkpIHtcbiAgICAgICAgICAgIGlmIChwcmlvcml0eSA9PT0gdm9pZCAwKSB7IHByaW9yaXR5ID0gMDsgfVxuICAgICAgICAgICAgLy8gR2V0IHRoZSBsaXN0IG9mIGV2ZW50IGxpc3RlbmVycyBieSB0aGUgYXNzb2NpYXRlZCB0eXBlIHZhbHVlIHRoYXQgaXMgcGFzc2VkIGluLlxuICAgICAgICAgICAgdmFyIGxpc3QgPSB0aGlzLl9saXN0ZW5lcnNbdHlwZV07XG4gICAgICAgICAgICBpZiAobGlzdCA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgLy8gSWYgYSBsaXN0IG9mIGV2ZW50IGxpc3RlbmVycyBkbyBub3QgZXhpc3QgZm9yIHRoZSB0eXBlIHZhbHVlIHBhc3NlZCBpbiB0aGVuIGNyZWF0ZSBhIG5ldyBlbXB0eSBhcnJheS5cbiAgICAgICAgICAgICAgICB0aGlzLl9saXN0ZW5lcnNbdHlwZV0gPSBsaXN0ID0gW107XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgaW5kZXggPSAwO1xuICAgICAgICAgICAgdmFyIGxpc3RlbmVyO1xuICAgICAgICAgICAgdmFyIGkgPSBsaXN0Lmxlbmd0aDtcbiAgICAgICAgICAgIHdoaWxlICgtLWkgPiAtMSkge1xuICAgICAgICAgICAgICAgIGxpc3RlbmVyID0gbGlzdFtpXTtcbiAgICAgICAgICAgICAgICBpZiAobGlzdGVuZXIuY2FsbGJhY2sgPT09IGNhbGxiYWNrICYmIGxpc3RlbmVyLnNjb3BlID09PSBzY29wZSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBJZiB0aGUgc2FtZSBjYWxsYmFjayBhbmQgc2NvcGUgYXJlIGZvdW5kIHRoZW4gcmVtb3ZlIGl0IGFuZCBhZGQgdGhlIGN1cnJlbnQgb25lIGJlbG93LlxuICAgICAgICAgICAgICAgICAgICBsaXN0LnNwbGljZShpLCAxKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoaW5kZXggPT09IDAgJiYgbGlzdGVuZXIucHJpb3JpdHkgPCBwcmlvcml0eSkge1xuICAgICAgICAgICAgICAgICAgICBpbmRleCA9IGkgKyAxO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIEFkZCB0aGUgZXZlbnQgbGlzdGVuZXIgdG8gdGhlIGxpc3QgYXJyYXkgYXQgdGhlIGluZGV4IHZhbHVlLlxuICAgICAgICAgICAgbGlzdC5zcGxpY2UoaW5kZXgsIDAsIHsgY2FsbGJhY2s6IGNhbGxiYWNrLCBzY29wZTogc2NvcGUsIHByaW9yaXR5OiBwcmlvcml0eSwgb25jZTogZmFsc2UgfSk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFJlZ2lzdGVycyBhbiBldmVudCBsaXN0ZW5lciBvYmplY3Qgb25jZSB3aXRoIGFuIEV2ZW50RGlzcGF0Y2hlciBvYmplY3Qgc28gdGhlIGxpc3RlbmVyIHdpbGwgcmVjZWl2ZSB0aGUgbm90aWZpY2F0aW9uIG9mIGFuIGV2ZW50LlxuICAgICAgICAgKlxuICAgICAgICAgKiBAbWV0aG9kIGFkZEV2ZW50TGlzdGVuZXJPbmNlXG4gICAgICAgICAqIEBwYXJhbSB0eXBlIHtTdHJpbmd9IFRoZSB0eXBlIG9mIGV2ZW50LlxuICAgICAgICAgKiBAcGFyYW0gY2FsbGJhY2sge0Z1bmN0aW9ufSBUaGUgbGlzdGVuZXIgZnVuY3Rpb24gdGhhdCBwcm9jZXNzZXMgdGhlIGV2ZW50LiBUaGlzIGZ1bmN0aW9uIG11c3QgYWNjZXB0IGFuIEV2ZW50IG9iamVjdCBhcyBpdHMgb25seSBwYXJhbWV0ZXIgYW5kIG11c3QgcmV0dXJuIG5vdGhpbmcsIGFzIHRoaXMgZXhhbXBsZSBzaG93cy4gQGV4YW1wbGUgZnVuY3Rpb24oZXZlbnQ6RXZlbnQpOnZvaWRcbiAgICAgICAgICogQHBhcmFtIHNjb3BlIHthbnl9IEJpbmRzIHRoZSBzY29wZSB0byBhIHBhcnRpY3VsYXIgb2JqZWN0IChzY29wZSBpcyBiYXNpY2FsbHkgd2hhdCBcInRoaXNcIiByZWZlcnMgdG8gaW4geW91ciBmdW5jdGlvbikuIFRoaXMgY2FuIGJlIHZlcnkgdXNlZnVsIGluIEphdmFTY3JpcHQgYmVjYXVzZSBzY29wZSBpc24ndCBnZW5lcmFsbHkgbWFpbnRhaW5lZC5cbiAgICAgICAgICogQHBhcmFtIFtwcmlvcml0eT0wXSB7aW50fSBJbmZsdWVuY2VzIHRoZSBvcmRlciBpbiB3aGljaCB0aGUgbGlzdGVuZXJzIGFyZSBjYWxsZWQuIExpc3RlbmVycyB3aXRoIGxvd2VyIHByaW9yaXRpZXMgYXJlIGNhbGxlZCBhZnRlciBvbmVzIHdpdGggaGlnaGVyIHByaW9yaXRpZXMuXG4gICAgICAgICAqIEBwdWJsaWNcbiAgICAgICAgICogQGNoYWluYWJsZVxuICAgICAgICAgKiBAZXhhbXBsZVxuICAgICAgICAgKiAgICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lck9uY2UoQmFzZUV2ZW50LkNIQU5HRSwgdGhpcy5faGFuZGxlck1ldGhvZCwgdGhpcyk7XG4gICAgICAgICAqXG4gICAgICAgICAqICAgICAgX2hhbmRsZXJNZXRob2QoZXZlbnQpIHtcbiAgICAgICAgICogICAgICAgICAgY29uc29sZS5sb2coZXZlbnQudGFyZ2V0ICsgXCIgc2VudCB0aGUgZXZlbnQuXCIpO1xuICAgICAgICAgKiAgICAgICAgICBjb25zb2xlLmxvZyhldmVudC50eXBlLCBldmVudC5kYXRhKTtcbiAgICAgICAgICogICAgICB9XG4gICAgICAgICAqL1xuICAgICAgICBFdmVudERpc3BhdGNoZXIucHJvdG90eXBlLmFkZEV2ZW50TGlzdGVuZXJPbmNlID0gZnVuY3Rpb24gKHR5cGUsIGNhbGxiYWNrLCBzY29wZSwgcHJpb3JpdHkpIHtcbiAgICAgICAgICAgIGlmIChwcmlvcml0eSA9PT0gdm9pZCAwKSB7IHByaW9yaXR5ID0gMDsgfVxuICAgICAgICAgICAgLy8gQWRkIHRoZSBldmVudCBsaXN0ZW5lciB0aGUgbm9ybWFsIHdheS5cbiAgICAgICAgICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcih0eXBlLCBjYWxsYmFjaywgc2NvcGUsIHByaW9yaXR5KTtcbiAgICAgICAgICAgIC8vIEdldCB0aGUgZXZlbnQgbGlzdGVuZXJzIHdlIGp1c3QgYWRkZWQuXG4gICAgICAgICAgICB2YXIgbGlzdCA9IHRoaXMuX2xpc3RlbmVyc1t0eXBlXTtcbiAgICAgICAgICAgIHZhciBsaXN0ZW5lciA9IGxpc3RbMF07XG4gICAgICAgICAgICAvLyBDaGFuZ2UgdGhlIHZhbHVlIHRvIHRydWUgc28gaXQgd2lsbCBiZSByZW1vdmUgYWZ0ZXIgZGlzcGF0Y2hFdmVudCBpcyBjYWxsZWQuXG4gICAgICAgICAgICBsaXN0ZW5lci5vbmNlID0gdHJ1ZTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9O1xuICAgICAgICAvKipcbiAgICAgICAgICogUmVtb3ZlcyBhIHNwZWNpZmllZCBsaXN0ZW5lciBmcm9tIHRoZSBFdmVudERpc3BhdGNoZXIgb2JqZWN0LlxuICAgICAgICAgKlxuICAgICAgICAgKiBAbWV0aG9kIHJlbW92ZUV2ZW50TGlzdGVuZXJcbiAgICAgICAgICogQHBhcmFtIHR5cGUge1N0cmluZ30gVGhlIHR5cGUgb2YgZXZlbnQuXG4gICAgICAgICAqIEBwYXJhbSBjYWxsYmFjayB7RnVuY3Rpb259IFRoZSBsaXN0ZW5lciBvYmplY3QgdG8gcmVtb3ZlLlxuICAgICAgICAgKiBAcGFyYW0gc2NvcGUge2FueX0gVGhlIHNjb3BlIG9mIHRoZSBsaXN0ZW5lciBvYmplY3QgdG8gYmUgcmVtb3ZlZC5cbiAgICAgICAgICogQGhpZGUgVGhpcyB3YXMgYWRkZWQgYmVjYXVzZSBpdCB3YXMgbmVlZGVkIGZvciB0aGUge3sjY3Jvc3NMaW5rIFwiRXZlbnRCcm9rZXJcIn19e3svY3Jvc3NMaW5rfX0gY2xhc3MuIFRvIGtlZXAgdGhpbmdzIGNvbnNpc3RlbnQgdGhpcyBwYXJhbWV0ZXIgaXMgcmVxdWlyZWQuXG4gICAgICAgICAqIEBwdWJsaWNcbiAgICAgICAgICogQGNoYWluYWJsZVxuICAgICAgICAgKiBAZXhhbXBsZVxuICAgICAgICAgKiAgICAgIHRoaXMucmVtb3ZlRXZlbnRMaXN0ZW5lcihCYXNlRXZlbnQuQ0hBTkdFLCB0aGlzLl9oYW5kbGVyTWV0aG9kLCB0aGlzKTtcbiAgICAgICAgICovXG4gICAgICAgIEV2ZW50RGlzcGF0Y2hlci5wcm90b3R5cGUucmVtb3ZlRXZlbnRMaXN0ZW5lciA9IGZ1bmN0aW9uICh0eXBlLCBjYWxsYmFjaywgc2NvcGUpIHtcbiAgICAgICAgICAgIC8vIEdldCB0aGUgbGlzdCBvZiBldmVudCBsaXN0ZW5lcnMgYnkgdGhlIGFzc29jaWF0ZWQgdHlwZSB2YWx1ZSB0aGF0IGlzIHBhc3NlZCBpbi5cbiAgICAgICAgICAgIHZhciBsaXN0ID0gdGhpcy5fbGlzdGVuZXJzW3R5cGVdO1xuICAgICAgICAgICAgaWYgKGxpc3QgIT09IHZvaWQgMCkge1xuICAgICAgICAgICAgICAgIHZhciBpXzEgPSBsaXN0Lmxlbmd0aDtcbiAgICAgICAgICAgICAgICB3aGlsZSAoLS1pXzEgPiAtMSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBJZiB0aGUgY2FsbGJhY2sgYW5kIHNjb3BlIGFyZSB0aGUgc2FtZSB0aGVuIHJlbW92ZSB0aGUgZXZlbnQgbGlzdGVuZXIuXG4gICAgICAgICAgICAgICAgICAgIGlmIChsaXN0W2lfMV0uY2FsbGJhY2sgPT09IGNhbGxiYWNrICYmIGxpc3RbaV8xXS5zY29wZSA9PT0gc2NvcGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpc3Quc3BsaWNlKGlfMSwgMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9O1xuICAgICAgICAvKipcbiAgICAgICAgICogPHA+RGlzcGF0Y2hlcyBhbiBldmVudCBpbnRvIHRoZSBldmVudCBmbG93LiBUaGUgZXZlbnQgdGFyZ2V0IGlzIHRoZSBFdmVudERpc3BhdGNoZXIgb2JqZWN0IHVwb24gd2hpY2ggdGhlIGRpc3BhdGNoRXZlbnQoKSBtZXRob2QgaXMgY2FsbGVkLjwvcD5cbiAgICAgICAgICpcbiAgICAgICAgICogQG1ldGhvZCBkaXNwYXRjaEV2ZW50XG4gICAgICAgICAqIEBwYXJhbSBldmVudCB7c3RyaW5nfEJhc2VFdmVudH0gVGhlIEV2ZW50IG9iamVjdCBvciBldmVudCB0eXBlIHN0cmluZyB5b3Ugd2FudCB0byBkaXNwYXRjaC4gWW91IGNhbiBjcmVhdGUgY3VzdG9tIGV2ZW50cywgdGhlIG9ubHkgcmVxdWlyZW1lbnQgaXMgYWxsIGV2ZW50cyBtdXN0IGV4dGVuZCB7eyNjcm9zc0xpbmsgXCJCYXNlRXZlbnRcIn19e3svY3Jvc3NMaW5rfX0uXG4gICAgICAgICAqIEBwYXJhbSBbZGF0YT1udWxsXSB7YW55fSBUaGUgb3B0aW9uYWwgZGF0YSB5b3Ugd2FudCB0byBzZW5kIHdpdGggdGhlIGV2ZW50LiBEbyBub3QgdXNlIHRoaXMgcGFyYW1ldGVyIGlmIHlvdSBhcmUgcGFzc2luZyBpbiBhIHt7I2Nyb3NzTGluayBcIkJhc2VFdmVudFwifX17ey9jcm9zc0xpbmt9fS5cbiAgICAgICAgICogQHB1YmxpY1xuICAgICAgICAgKiBAY2hhaW5hYmxlXG4gICAgICAgICAqIEBleGFtcGxlXG4gICAgICAgICAqICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KCdjaGFuZ2UnKTtcbiAgICAgICAgICpcbiAgICAgICAgICogICAgICAvLyBFeGFtcGxlOiBTZW5kaW5nIGRhdGEgd2l0aCB0aGUgZXZlbnQ6XG4gICAgICAgICAqICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KCdjaGFuZ2UnLCB7c29tZTogJ2RhdGEnfSk7XG4gICAgICAgICAqXG4gICAgICAgICAqICAgICAgLy8gRXhhbXBsZTogV2l0aCBhbiBldmVudCBvYmplY3RcbiAgICAgICAgICogICAgICAvLyAoZXZlbnQgdHlwZSwgYnViYmxpbmcgc2V0IHRvIHRydWUsIGNhbmNlbGFibGUgc2V0IHRvIHRydWUgYW5kIHBhc3NpbmcgZGF0YSkgOlxuICAgICAgICAgKiAgICAgIGxldCBldmVudCA9IG5ldyBCYXNlRXZlbnQoQmFzZUV2ZW50LkNIQU5HRSwgdHJ1ZSwgdHJ1ZSwge3NvbWU6ICdkYXRhJ30pO1xuICAgICAgICAgKiAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudChldmVudCk7XG4gICAgICAgICAqXG4gICAgICAgICAqICAgICAgLy8gSGVyZSBpcyBhIGNvbW1vbiBpbmxpbmUgZXZlbnQgb2JqZWN0IGJlaW5nIGRpc3BhdGNoZWQ6XG4gICAgICAgICAqICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KG5ldyBCYXNlRXZlbnQoQmFzZUV2ZW50LkNIQU5HRSkpO1xuICAgICAgICAgKi9cbiAgICAgICAgRXZlbnREaXNwYXRjaGVyLnByb3RvdHlwZS5kaXNwYXRjaEV2ZW50ID0gZnVuY3Rpb24gKHR5cGUsIGRhdGEpIHtcbiAgICAgICAgICAgIGlmIChkYXRhID09PSB2b2lkIDApIHsgZGF0YSA9IG51bGw7IH1cbiAgICAgICAgICAgIHZhciBldmVudCA9IHR5cGU7XG4gICAgICAgICAgICBpZiAodHlwZW9mIGV2ZW50ID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgIGV2ZW50ID0gbmV3IEJhc2VFdmVudF8xLmRlZmF1bHQodHlwZSwgZmFsc2UsIHRydWUsIGRhdGEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gSWYgdGFyZ2V0IGlzIG51bGwgdGhlbiBzZXQgaXQgdG8gdGhlIG9iamVjdCB0aGF0IGRpc3BhdGNoZWQgdGhlIGV2ZW50LlxuICAgICAgICAgICAgaWYgKGV2ZW50LnRhcmdldCA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgZXZlbnQudGFyZ2V0ID0gdGhpcztcbiAgICAgICAgICAgICAgICBldmVudC5jdXJyZW50VGFyZ2V0ID0gdGhpcztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIEdldCB0aGUgbGlzdCBvZiBldmVudCBsaXN0ZW5lciBieSB0aGUgYXNzb2NpYXRlZCB0eXBlIHZhbHVlLlxuICAgICAgICAgICAgdmFyIGxpc3QgPSB0aGlzLl9saXN0ZW5lcnNbZXZlbnQudHlwZV07XG4gICAgICAgICAgICBpZiAobGlzdCAhPT0gdm9pZCAwKSB7XG4gICAgICAgICAgICAgICAgdmFyIGlfMiA9IGxpc3QubGVuZ3RoO1xuICAgICAgICAgICAgICAgIHZhciBsaXN0ZW5lcjtcbiAgICAgICAgICAgICAgICB3aGlsZSAoLS1pXzIgPiAtMSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBJZiBjYW5jZWxhYmxlIGFuZCBpc0ltbWVkaWF0ZVByb3BhZ2F0aW9uU3RvcHBlZCBhcmUgdHJ1ZSB0aGVuIGJyZWFrIG91dCBvZiB0aGUgd2hpbGUgbG9vcC5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGV2ZW50LmNhbmNlbGFibGUgPT09IHRydWUgJiYgZXZlbnQuaXNJbW1lZGlhdGVQcm9wYWdhdGlvblN0b3BwZWQgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGxpc3RlbmVyID0gbGlzdFtpXzJdO1xuICAgICAgICAgICAgICAgICAgICBsaXN0ZW5lci5jYWxsYmFjay5jYWxsKGxpc3RlbmVyLnNjb3BlLCBldmVudCk7XG4gICAgICAgICAgICAgICAgICAgIC8vIElmIHRoZSBvbmNlIHZhbHVlIGlzIHRydWUgd2Ugd2FudCB0byByZW1vdmUgdGhlIGxpc3RlbmVyIHJpZ2h0IGFmdGVyIHRoaXMgY2FsbGJhY2sgd2FzIGNhbGxlZC5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGxpc3RlbmVyLm9uY2UgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudC50eXBlLCBsaXN0ZW5lci5jYWxsYmFjaywgbGlzdGVuZXIuc2NvcGUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy9EaXNwYXRjaGVzIHVwIHRoZSBjaGFpbiBvZiBjbGFzc2VzIHRoYXQgaGF2ZSBhIHBhcmVudC5cbiAgICAgICAgICAgIGlmICh0aGlzLnBhcmVudCAhPSBudWxsICYmIGV2ZW50LmJ1YmJsZXMgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICAvLyBJZiBjYW5jZWxhYmxlIGFuZCBpc1Byb3BhZ2F0aW9uU3RvcHBlZCBhcmUgdHJ1ZSB0aGVuIGRvbid0IGRpc3BhdGNoIHRoZSBldmVudCBvbiB0aGUgcGFyZW50IG9iamVjdC5cbiAgICAgICAgICAgICAgICBpZiAoZXZlbnQuY2FuY2VsYWJsZSA9PT0gdHJ1ZSAmJiBldmVudC5pc1Byb3BhZ2F0aW9uU3RvcHBlZCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gQXNzaWduIHRoZSBjdXJyZW50IG9iamVjdCB0aGF0IGlzIGN1cnJlbnRseSBwcm9jZXNzaW5nIHRoZSBldmVudCAoaS5lLiBldmVudCBidWJibGluZyBhdCkuXG4gICAgICAgICAgICAgICAgZXZlbnQuY3VycmVudFRhcmdldCA9IHRoaXM7XG4gICAgICAgICAgICAgICAgLy8gUGFzcyB0aGUgZXZlbnQgdG8gdGhlIHBhcmVudCAoZXZlbnQgYnViYmxpbmcpLlxuICAgICAgICAgICAgICAgIHRoaXMucGFyZW50LmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH07XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDaGVjayBpZiBhbiBvYmplY3QgaGFzIGEgc3BlY2lmaWMgZXZlbnQgbGlzdGVuZXIgYWxyZWFkeSBhZGRlZC5cbiAgICAgICAgICpcbiAgICAgICAgICogQG1ldGhvZCBoYXNFdmVudExpc3RlbmVyXG4gICAgICAgICAqIEBwYXJhbSB0eXBlIHtTdHJpbmd9IFRoZSB0eXBlIG9mIGV2ZW50LlxuICAgICAgICAgKiBAcGFyYW0gY2FsbGJhY2sge0Z1bmN0aW9ufSBUaGUgbGlzdGVuZXIgbWV0aG9kIHRvIGNhbGwuXG4gICAgICAgICAqIEBwYXJhbSBzY29wZSB7YW55fSBUaGUgc2NvcGUgb2YgdGhlIGxpc3RlbmVyIG9iamVjdC5cbiAgICAgICAgICogQHJldHVybiB7Ym9vbGVhbn1cbiAgICAgICAgICogQHB1YmxpY1xuICAgICAgICAgKiBAZXhhbXBsZVxuICAgICAgICAgKiAgICAgIHRoaXMuaGFzRXZlbnRMaXN0ZW5lcihCYXNlRXZlbnQuQ0hBTkdFLCB0aGlzLl9oYW5kbGVyTWV0aG9kLCB0aGlzKTtcbiAgICAgICAgICovXG4gICAgICAgIEV2ZW50RGlzcGF0Y2hlci5wcm90b3R5cGUuaGFzRXZlbnRMaXN0ZW5lciA9IGZ1bmN0aW9uICh0eXBlLCBjYWxsYmFjaywgc2NvcGUpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLl9saXN0ZW5lcnNbdHlwZV0gIT09IHZvaWQgMCkge1xuICAgICAgICAgICAgICAgIHZhciBsaXN0ZW5lcjtcbiAgICAgICAgICAgICAgICB2YXIgbnVtT2ZDYWxsYmFja3MgPSB0aGlzLl9saXN0ZW5lcnNbdHlwZV0ubGVuZ3RoO1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGlfMyA9IDA7IGlfMyA8IG51bU9mQ2FsbGJhY2tzOyBpXzMrKykge1xuICAgICAgICAgICAgICAgICAgICBsaXN0ZW5lciA9IHRoaXMuX2xpc3RlbmVyc1t0eXBlXVtpXzNdO1xuICAgICAgICAgICAgICAgICAgICBpZiAobGlzdGVuZXIuY2FsbGJhY2sgPT09IGNhbGxiYWNrICYmIGxpc3RlbmVyLnNjb3BlID09PSBzY29wZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH07XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBHZW5lcmF0ZXMgYSBzdHJpbmcgb3V0cHV0IG9mIGV2ZW50IGxpc3RlbmVycyBmb3IgYSBnaXZlbiBvYmplY3QuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBtZXRob2QgZ2V0RXZlbnRMaXN0ZW5lcnNcbiAgICAgICAgICogQHJldHVybiB7c3RyaW5nfVxuICAgICAgICAgKiBAcHVibGljXG4gICAgICAgICAqIEBleGFtcGxlXG4gICAgICAgICAqICAgICAgdGhpcy5nZXRFdmVudExpc3RlbmVycygpO1xuICAgICAgICAgKlxuICAgICAgICAgKiAgICAgIC8vIFtDbGFzc05hbWVdIGlzIGxpc3RlbmluZyBmb3IgdGhlICdCYXNlRXZlbnQuY2hhbmdlJyBldmVudC5cbiAgICAgICAgICovXG4gICAgICAgIEV2ZW50RGlzcGF0Y2hlci5wcm90b3R5cGUuZ2V0RXZlbnRMaXN0ZW5lcnMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgc3RyID0gJyc7XG4gICAgICAgICAgICB2YXIgbnVtT2ZDYWxsYmFja3M7XG4gICAgICAgICAgICB2YXIgbGlzdGVuZXI7XG4gICAgICAgICAgICBmb3IgKHZhciB0eXBlIGluIHRoaXMuX2xpc3RlbmVycykge1xuICAgICAgICAgICAgICAgIG51bU9mQ2FsbGJhY2tzID0gdGhpcy5fbGlzdGVuZXJzW3R5cGVdLmxlbmd0aDtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpXzQgPSAwOyBpXzQgPCBudW1PZkNhbGxiYWNrczsgaV80KyspIHtcbiAgICAgICAgICAgICAgICAgICAgbGlzdGVuZXIgPSB0aGlzLl9saXN0ZW5lcnNbdHlwZV1baV80XTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGxpc3RlbmVyLnNjb3BlICYmICh0eXBlb2YgbGlzdGVuZXIuc2NvcGUuZ2V0UXVhbGlmaWVkQ2xhc3NOYW1lID09PSAnZnVuY3Rpb24nKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3RyICs9ICdbJyArIGxpc3RlbmVyLnNjb3BlLmdldFF1YWxpZmllZENsYXNzTmFtZSgpICsgJ10nO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3RyICs9ICdbVW5rbm93bl0nO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHN0ciArPSBcIiBpcyBsaXN0ZW4gZm9yICdcIiArIHR5cGUgKyBcIicgZXZlbnQuXFxuXCI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHN0cjtcbiAgICAgICAgfTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBvdmVycmlkZGVuIEJhc2VPYmplY3QuZGVzdHJveVxuICAgICAgICAgKi9cbiAgICAgICAgRXZlbnREaXNwYXRjaGVyLnByb3RvdHlwZS5kZXN0cm95ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy5kaXNhYmxlKCk7XG4gICAgICAgICAgICBfc3VwZXIucHJvdG90eXBlLmRlc3Ryb3kuY2FsbCh0aGlzKTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIEV2ZW50RGlzcGF0Y2hlcjtcbiAgICB9KShPYmplY3RNYW5hZ2VyXzEuZGVmYXVsdCk7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuICAgIGV4cG9ydHMuZGVmYXVsdCA9IEV2ZW50RGlzcGF0Y2hlcjtcbn0pO1xuIiwidmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCBmdW5jdGlvbiAoZCwgYikge1xuICAgIGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdO1xuICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbn07XG4oZnVuY3Rpb24gKGZhY3RvcnkpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZS5leHBvcnRzID09PSAnb2JqZWN0Jykge1xuICAgICAgICB2YXIgdiA9IGZhY3RvcnkocmVxdWlyZSwgZXhwb3J0cyk7IGlmICh2ICE9PSB1bmRlZmluZWQpIG1vZHVsZS5leHBvcnRzID0gdjtcbiAgICB9XG4gICAgZWxzZSBpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSB7XG4gICAgICAgIGRlZmluZShbXCJyZXF1aXJlXCIsIFwiZXhwb3J0c1wiLCAnLi4vQmFzZU9iamVjdCcsICcuLi91dGlsL1V0aWwnXSwgZmFjdG9yeSk7XG4gICAgfVxufSkoZnVuY3Rpb24gKHJlcXVpcmUsIGV4cG9ydHMpIHtcbiAgICB2YXIgQmFzZU9iamVjdF8xID0gcmVxdWlyZSgnLi4vQmFzZU9iamVjdCcpO1xuICAgIHZhciBVdGlsXzEgPSByZXF1aXJlKCcuLi91dGlsL1V0aWwnKTtcbiAgICAvKipcbiAgICAgKiAgQmFzZSBNb2RlbCBpcyBhIGRlc2lnbiBwYXR0ZXJuIHVzZWQgdG8gdHJhbnNmZXIgZGF0YSBiZXR3ZWVuIHNvZnR3YXJlIGFwcGxpY2F0aW9uIHN1YnN5c3RlbXMuXG4gICAgICpcbiAgICAgKiBOb3RlOiBJZiB0aGUgZGF0YSBkb2Vzbid0IG1hdGNoIHRoZSBwcm9wZXJ0eSBuYW1lcyB5b3UgY2FuIHNldCB0aGUgdmFsdWUgbWFudWFsbHkgYWZ0ZXIgdXBkYXRlIHN1cGVyIG1ldGhvZCBoYXMgYmVlbiBjYWxsZWQuXG4gICAgICogIEFsc28gaW4gdGhlIGNsYXNzIHlvdSBpbmhlcml0IEJhc2VNb2RlbCBmcm9tIHlvdSBjYW4gb3ZlcnJpZGUgdGhlIHVwZGF0ZSBtZXRob2QgdG8gaGFuZGxlIHRoZSBkYXRhIGhvdyB5b3Ugd2FudC5cbiAgICAgKlxuICAgICAqIEBjbGFzcyBCYXNlTW9kZWxcbiAgICAgKiBAZXh0ZW5kcyBCYXNlT2JqZWN0XG4gICAgICogQHBhcmFtIFtkYXRhXSB7YW55fSBQcm92aWRlIGEgd2F5IHRvIHVwZGF0ZSB0aGUgIEJhc2UgTW9kZWwgdXBvbiBpbml0aWFsaXphdGlvbi5cbiAgICAgKiBAbW9kdWxlIFN0cnVjdHVyZUpTXG4gICAgICogQHN1Ym1vZHVsZSBtb2RlbFxuICAgICAqIEByZXF1aXJlcyBFeHRlbmRcbiAgICAgKiBAcmVxdWlyZXMgQmFzZU9iamVjdFxuICAgICAqIEByZXF1aXJlcyBVdGlsXG4gICAgICogQGNvbnN0cnVjdG9yXG4gICAgICogQGF1dGhvciBSb2JlcnQgUy4gKHd3dy5jb2RlQmVsdC5jb20pXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiAgICAgIC8vIEV4YW1wbGUgaG93IHRvIGV4dGVuZCB0aGUgQmFzZU1vZGVsIGNsYXNzLlxuICAgICAqICAgICAgbGV0IGRhdGEgPSB7XG4gICAgICogICAgICAgICAgICAgIG1ha2U6ICdUZXNsYScsXG4gICAgICogICAgICAgICAgICAgIG1vZGVsOiAnTW9kZWwgUycsXG4gICAgICogICAgICAgICAgICAgIFllQXI6IDIwMTQsXG4gICAgICogICAgICAgICAgICAgIGZlYXR1cmU6IHtcbiAgICAgKiAgICAgICAgICAgICAgICAgIGFiczogdHJ1ZSxcbiAgICAgKiAgICAgICAgICAgICAgICAgIGFpcmJhZ3M6IHRydWVcbiAgICAgKiAgICAgICAgICAgICAgfVxuICAgICAqICAgICAgfVxuICAgICAqICAgICAgbGV0IGNhck1vZGVsID0gbmV3IENhck1vZGVsKGRhdGEpO1xuICAgICAqXG4gICAgICpcbiAgICAgKiAgICAgIC8vIEV4YW1wbGUgaG93IHRvIGV4dGVuZCB0aGUgQmFzZU1vZGVsIGNsYXNzLlxuICAgICAqICAgICAgY2xhc3MgQ2FyTW9kZWwgZXh0ZW5kcyBCYXNlTW9kZWwge1xuICAgICAqXG4gICAgICogICAgICAgICAgLy8gWW91IG5lZWQgdG8gaGF2ZSBwcm9wZXJ0aWVzIHNvIHRoZSBkYXRhIHdpbGwgZ2V0IGFzc2lnbmVkLlxuICAgICAqICAgICAgICAgIC8vIElmIG5vdCB0aGUgZGF0YSB3aWxsIG5vdCBnZXQgYXNzaWduZWQgdG8gdGhlIG1vZGVsLlxuICAgICAqICAgICAgICAgIG1ha2UgPSBudWxsO1xuICAgICAqICAgICAgICAgIG1vZGVsID0gbnVsbDtcbiAgICAgKiAgICAgICAgICB5ZWFyID0gbnVsbDtcbiAgICAgKiAgICAgICAgICBhbGxXaGVlbCA9IGZhbHNlOyAvLyBTZXQgYSBkZWZhdWx0IHZhbHVlXG4gICAgICpcbiAgICAgKiAgICAgICAgICAvLyBZb3UgY2FuIGFzc2lnbiBCYXNlTW9kZWwgdG8gYSBwcm9wZXJ0eSB3aGljaCB3aWxsXG4gICAgICogICAgICAgICAgLy8gYXV0b21hdGljYWxseSBjcmVhdGVkIGl0IGFuZCBwYXNzIHRoZSBkYXRhIHRvIGl0LlxuICAgICAqICAgICAgICAgIGZlYXR1cmUgPSBGZWF0dXJlTW9kZWxcbiAgICAgKlxuICAgICAqICAgICAgICAgIC8vIElmIHlvdSBoYXZlIGFuIGFycmF5IG9mIGRhdGEgYW5kIHdhbnQgdGhlbSBhc3NpZ24gdG8gYSBCYXNlTW9kZWwuXG4gICAgICogICAgICAgICAgZmVhdHVyZSA9IFtGZWF0dXJlTW9kZWxdO1xuICAgICAqXG4gICAgICogICAgICAgICAgY29uc3RydWN0b3IoZGF0YSkge1xuICAgICAqICAgICAgICAgICAgICBzdXBlcigpO1xuICAgICAqXG4gICAgICogICAgICAgICAgICAgIGlmIChkYXRhKSB7XG4gICAgICogICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZShkYXRhKTtcbiAgICAgKiAgICAgICAgICAgICAgfVxuICAgICAqICAgICAgICAgIH1cbiAgICAgKlxuICAgICAqICAgICAgICAgIC8vIEBvdmVycmlkZGVuIEJhc2VNb2RlbC51cGRhdGVcbiAgICAgKiAgICAgICAgICB1cGRhdGUoZGF0YSkge1xuICAgICAqICAgICAgICAgICAgICBzdXBlci51cGRhdGUoZGF0YSk7XG4gICAgICpcbiAgICAgKiAgICAgICAgICAgICAgLy8gSWYgdGhlIGRhdGEgZG9lc24ndCBtYXRjaCB0aGUgcHJvcGVydHkgbmFtZS5cbiAgICAgKiAgICAgICAgICAgICAgLy8gWW91IGNhbiBzZXQgdGhlIHZhbHVlKHMpIG1hbnVhbGx5IGFmdGVyIHRoZSB1cGRhdGUgc3VwZXIgbWV0aG9kIGhhcyBiZWVuIGNhbGxlZC5cbiAgICAgKiAgICAgICAgICAgICAgdGhpcy55ZWFyID0gZGF0YS5ZZUFyO1xuICAgICAqICAgICAgICAgIH1cbiAgICAgKiAgICAgIH1cbiAgICAgKi9cbiAgICB2YXIgQmFzZU1vZGVsID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICAgICAgX19leHRlbmRzKEJhc2VNb2RlbCwgX3N1cGVyKTtcbiAgICAgICAgZnVuY3Rpb24gQmFzZU1vZGVsKCkge1xuICAgICAgICAgICAgX3N1cGVyLmNhbGwodGhpcyk7XG4gICAgICAgIH1cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFByb3ZpZGUgYSB3YXkgdG8gdXBkYXRlIHRoZSAgQmFzZSBNb2RlbC5cbiAgICAgICAgICpcbiAgICAgICAgICogQG1ldGhvZCB1cGRhdGVcbiAgICAgICAgICogQHBhcmFtIGRhdGEge2FueX1cbiAgICAgICAgICogQHB1YmxpY1xuICAgICAgICAgKiBAZXhhbXBsZVxuICAgICAgICAgKiAgICAgLy8gRXhhbXBsZSBvZiB1cGRhdGluZyBzb21lIG9mIHRoZSBkYXRhOlxuICAgICAgICAgKiAgICAgY2FyTW9kZWwudXBkYXRlKHsgeWVhcjogMjAxNSwgYWxsV2hlZWw6IHRydWV9KTtcbiAgICAgICAgICpcbiAgICAgICAgICogICAgIC8vIE9mIGNvdXJzZSB5b3UgY2FuIGFsc28gZG8gaXQgdGhlIGZvbGxvd2luZyB3YXk6XG4gICAgICAgICAqICAgICBjYXJNb2RlbC55ZWFyID0gMjAxNTtcbiAgICAgICAgICogICAgIGNhck1vZGVsLmFsbFdoZWVsID0gZmFsc2U7XG4gICAgICAgICAqL1xuICAgICAgICBCYXNlTW9kZWwucHJvdG90eXBlLnVwZGF0ZSA9IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgICB2YXIgcHJvcGVydHlEYXRhO1xuICAgICAgICAgICAgZm9yICh2YXIgcHJvcGVydHlLZXkgaW4gdGhpcykge1xuICAgICAgICAgICAgICAgIC8vIElmIHRoaXMgY2xhc3MgaGFzIGEgcHJvcGVydHkgdGhhdCBtYXRjaGVzIGEgcHJvcGVydHkgb24gdGhlIGRhdGEgYmVpbmcgcGFzc2VkIGluIHRoZW4gc2V0IGl0LlxuICAgICAgICAgICAgICAgIC8vIEFsc28gZG9uJ3Qgc2V0IHRoZSBzanNJZCBkYXRhIHZhbHVlIGJlY2F1c2UgaXQgaXMgYXV0b21hdGljYWxseSBzZXQgaW4gdGhlIGNvbnN0cnVjdG9yIGFuZFxuICAgICAgICAgICAgICAgIC8vIHdlIGRvIHdhbnQgaXQgdG8gYmUgb3ZlcnJpZGRlbiB3aGVuIHRoZSBjbG9uZSBtZXRob2QgaGFzIGJlZW4gY2FsbGVkLlxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmhhc093blByb3BlcnR5KHByb3BlcnR5S2V5KSAmJiBwcm9wZXJ0eUtleSAhPT0gJ3Nqc0lkJykge1xuICAgICAgICAgICAgICAgICAgICAvLyBJZiB0aGUgZGF0YSBwYXNzZWQgaW4gZG9lcyBub3QgaGF2ZSBhIHByb3BlcnR5IHRoYXQgbWF0Y2hlcyBhIHByb3BlcnR5IG9uIHRoZSAgQmFzZSBNb2RlbCB0aGVuXG4gICAgICAgICAgICAgICAgICAgIC8vIHVzZSB0aGUgZGVmYXVsdCB2YWx1ZS9kYXRhIHRoYXQgd2FzIGFzc2lnbmVkIHRvIHRoZSBwcm9wZXJ0eS5cbiAgICAgICAgICAgICAgICAgICAgLy8gRWxzZSB1c2UgdGhlIGRhdGEgdGhhdCB3YXMgcGFzc2VkIGluLlxuICAgICAgICAgICAgICAgICAgICBwcm9wZXJ0eURhdGEgPSAoZGF0YVtwcm9wZXJ0eUtleV0gPT09IHZvaWQgMCkgPyB0aGlzW3Byb3BlcnR5S2V5XSA6IGRhdGFbcHJvcGVydHlLZXldO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9zZXREYXRhKHByb3BlcnR5S2V5LCBwcm9wZXJ0eURhdGEpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9O1xuICAgICAgICAvKipcbiAgICAgICAgICogVE9ETzogWVVJRG9jX2NvbW1lbnRcbiAgICAgICAgICpcbiAgICAgICAgICogQG1ldGhvZCBfc2V0RGF0YVxuICAgICAgICAgKiBAcGFyYW0ga2V5XG4gICAgICAgICAqIEBwYXJhbSBkYXRhXG4gICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICovXG4gICAgICAgIEJhc2VNb2RlbC5wcm90b3R5cGUuX3NldERhdGEgPSBmdW5jdGlvbiAoa2V5LCBkYXRhKSB7XG4gICAgICAgICAgICAvLyBJZiB0aGUgZGF0YSBpcyBhbiBhcnJheSBhbmQgaWYgdGhlIHByb3BlcnR5IGl0cyBiZWluZyBhc3NpZ25lZCB0byBpcyBhbiBhcnJheS5cbiAgICAgICAgICAgIGlmIChkYXRhIGluc3RhbmNlb2YgQXJyYXkgJiYgdGhpc1trZXldIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgICAgICAgICAgICB2YXIgdGVtcCA9IFtdO1xuICAgICAgICAgICAgICAgIHZhciBsZW4gPSBkYXRhLmxlbmd0aDtcbiAgICAgICAgICAgICAgICBpZiAoKHRoaXNba2V5XVswXSBpbnN0YW5jZW9mIEJhc2VNb2RlbC5jb25zdHJ1Y3RvciAmJiBkYXRhWzBdIGluc3RhbmNlb2YgQmFzZU1vZGVsLmNvbnN0cnVjdG9yKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGJhc2VNb2RlbE9yT3RoZXIgPSAodGhpc1trZXldIGluc3RhbmNlb2YgQXJyYXkpID8gdGhpc1trZXldWzBdIDogdGhpc1trZXldO1xuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpXzEgPSAwOyBpXzEgPCBsZW47IGlfMSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wW2lfMV0gPSB0aGlzLl91cGRhdGVEYXRhKGJhc2VNb2RlbE9yT3RoZXIsIGRhdGFbaV8xXSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpc1trZXldID0gdGVtcDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXNba2V5XSA9IHRoaXMuX3VwZGF0ZURhdGEodGhpc1trZXldLCBkYXRhKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRPRE86IFlVSURvY19jb21tZW50XG4gICAgICAgICAqXG4gICAgICAgICAqIEBtZXRob2QgX3VwZGF0ZURhdGFcbiAgICAgICAgICogQHBhcmFtIGtleVZhbHVlXG4gICAgICAgICAqIEBwYXJhbSBkYXRhXG4gICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICovXG4gICAgICAgIEJhc2VNb2RlbC5wcm90b3R5cGUuX3VwZGF0ZURhdGEgPSBmdW5jdGlvbiAoa2V5VmFsdWUsIGRhdGEpIHtcbiAgICAgICAgICAgIGlmIChrZXlWYWx1ZSBpbnN0YW5jZW9mIEJhc2VNb2RlbC5jb25zdHJ1Y3Rvcikge1xuICAgICAgICAgICAgICAgIC8vIElmIHRoZSBwcm9wZXJ0eSBpcyBhbiBpbnN0YW5jZSBvZiBhIEJhc2VNb2RlbCBjbGFzcyBhbmQgaGFzIG5vdCBiZWVuIGNyZWF0ZWQgeWV0LlxuICAgICAgICAgICAgICAgIC8vIFRoZW4gaW5zdGFudGlhdGUgaXQgYW5kIHBhc3MgaW4gdGhlIGRhdGEgdG8gdGhlIGNvbnN0cnVjdG9yLlxuICAgICAgICAgICAgICAgIGtleVZhbHVlID0gbmV3IGtleVZhbHVlKGRhdGEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoa2V5VmFsdWUgaW5zdGFuY2VvZiBCYXNlTW9kZWwpIHtcbiAgICAgICAgICAgICAgICAvLyBJZiBwcm9wZXJ0eSBpcyBhbiBpbnN0YW5jZSBvZiBhIEJhc2VNb2RlbCBjbGFzcyBhbmQgaGFzIGFscmVhZHkgYmVlbiBjcmVhdGVkLlxuICAgICAgICAgICAgICAgIC8vIFRoZW4gY2FsbCB0aGUgdXBkYXRlIG1ldGhvZCBhbmQgcGFzcyBpbiB0aGUgZGF0YS5cbiAgICAgICAgICAgICAgICBrZXlWYWx1ZS51cGRhdGUoZGF0YSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBFbHNlIGp1c3QgYXNzaWduIHRoZSBkYXRhIHRvIHRoZSBwcm9wZXJ0eS5cbiAgICAgICAgICAgICAgICBrZXlWYWx1ZSA9IGRhdGE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4ga2V5VmFsdWU7XG4gICAgICAgIH07XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDb252ZXJ0cyB0aGUgQmFzZSBNb2RlbCBkYXRhIGludG8gYSBKU09OIG9iamVjdCBhbmQgZGVsZXRlcyB0aGUgc2pzSWQgcHJvcGVydHkuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBtZXRob2QgdG9KU09OXG4gICAgICAgICAqIEByZXR1cm5zIHthbnl9XG4gICAgICAgICAqIEBwdWJsaWNcbiAgICAgICAgICogQGV4YW1wbGVcbiAgICAgICAgICogICAgIGxldCBvYmogPSBjYXJNb2RlbC50b0pTT04oKTtcbiAgICAgICAgICovXG4gICAgICAgIEJhc2VNb2RlbC5wcm90b3R5cGUudG9KU09OID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIGNsb25lID0gVXRpbF8xLmRlZmF1bHQuY2xvbmUodGhpcyk7XG4gICAgICAgICAgICByZXR1cm4gVXRpbF8xLmRlZmF1bHQuZGVsZXRlUHJvcGVydHlGcm9tT2JqZWN0KGNsb25lLCBbJ3Nqc0lkJ10pO1xuICAgICAgICB9O1xuICAgICAgICAvKipcbiAgICAgICAgICogQ29udmVydHMgYSAgQmFzZSBNb2RlbCB0byBhIEpTT04gc3RyaW5nLFxuICAgICAgICAgKlxuICAgICAgICAgKiBAbWV0aG9kIHRvSlNPTlN0cmluZ1xuICAgICAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxuICAgICAgICAgKiBAcHVibGljXG4gICAgICAgICAqIEBleGFtcGxlXG4gICAgICAgICAqICAgICBsZXQgc3RyID0gY2FyTW9kZWwudG9KU09OU3RyaW5nKCk7XG4gICAgICAgICAqL1xuICAgICAgICBCYXNlTW9kZWwucHJvdG90eXBlLnRvSlNPTlN0cmluZyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSh0aGlzLnRvSlNPTigpKTtcbiAgICAgICAgfTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIENvbnZlcnRzIHRoZSBzdHJpbmcganNvbiBkYXRhIGludG8gYW4gT2JqZWN0IGFuZCBjYWxscyB0aGUge3sjY3Jvc3NMaW5rIFwiQmFzZU1vZGVsL3VwZGF0ZTptZXRob2RcIn19e3svY3Jvc3NMaW5rfX0gbWV0aG9kIHdpdGggdGhlIGNvbnZlcnRlZCBPYmplY3QuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBtZXRob2QgZnJvbUpTT05cbiAgICAgICAgICogQHBhcmFtIGpzb24ge3N0cmluZ31cbiAgICAgICAgICogQHB1YmxpY1xuICAgICAgICAgKiBAZXhhbXBsZVxuICAgICAgICAgKiAgICAgIGxldCBzdHIgPSAne1wibWFrZVwiOlwiVGVzbGFcIixcIm1vZGVsXCI6XCJNb2RlbCBTXCIsXCJ5ZWFyXCI6MjAxNH0nXG4gICAgICAgICAqICAgICAgbGV0IGNhck1vZGVsID0gbmV3IENhck1vZGVsKCk7XG4gICAgICAgICAqICAgICAgY2FyTW9kZWwuZnJvbUpTT04oc3RyKTtcbiAgICAgICAgICovXG4gICAgICAgIEJhc2VNb2RlbC5wcm90b3R5cGUuZnJvbUpTT04gPSBmdW5jdGlvbiAoanNvbikge1xuICAgICAgICAgICAgdmFyIHBhcnNlZERhdGEgPSBKU09OLnBhcnNlKGpzb24pO1xuICAgICAgICAgICAgdGhpcy51cGRhdGUocGFyc2VkRGF0YSk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIENyZWF0ZSBhIGNsb25lL2NvcHkgb2YgdGhlICBCYXNlIE1vZGVsLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAbWV0aG9kIGNsb25lXG4gICAgICAgICAqIEByZXR1cm5zIHtCYXNlTW9kZWx9XG4gICAgICAgICAqIEBwdWJsaWNcbiAgICAgICAgICogQGV4YW1wbGVcbiAgICAgICAgICogICAgIGxldCBjbG9uZSA9IGNhck1vZGVsLmNsb25lKCk7XG4gICAgICAgICAqL1xuICAgICAgICBCYXNlTW9kZWwucHJvdG90eXBlLmNsb25lID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIGNsb25lZEJhc2VNb2RlbCA9IG5ldyB0aGlzLmNvbnN0cnVjdG9yKHRoaXMpO1xuICAgICAgICAgICAgcmV0dXJuIGNsb25lZEJhc2VNb2RlbDtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIEJhc2VNb2RlbDtcbiAgICB9KShCYXNlT2JqZWN0XzEuZGVmYXVsdCk7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuICAgIGV4cG9ydHMuZGVmYXVsdCA9IEJhc2VNb2RlbDtcbn0pO1xuIiwidmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCBmdW5jdGlvbiAoZCwgYikge1xuICAgIGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdO1xuICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbn07XG4oZnVuY3Rpb24gKGZhY3RvcnkpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZS5leHBvcnRzID09PSAnb2JqZWN0Jykge1xuICAgICAgICB2YXIgdiA9IGZhY3RvcnkocmVxdWlyZSwgZXhwb3J0cyk7IGlmICh2ICE9PSB1bmRlZmluZWQpIG1vZHVsZS5leHBvcnRzID0gdjtcbiAgICB9XG4gICAgZWxzZSBpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSB7XG4gICAgICAgIGRlZmluZShbXCJyZXF1aXJlXCIsIFwiZXhwb3J0c1wiLCAnLi4vZXZlbnQvRXZlbnREaXNwYXRjaGVyJywgJy4uL2V2ZW50L0Jhc2VFdmVudCcsICcuLi91dGlsL1V0aWwnXSwgZmFjdG9yeSk7XG4gICAgfVxufSkoZnVuY3Rpb24gKHJlcXVpcmUsIGV4cG9ydHMpIHtcbiAgICB2YXIgRXZlbnREaXNwYXRjaGVyXzEgPSByZXF1aXJlKCcuLi9ldmVudC9FdmVudERpc3BhdGNoZXInKTtcbiAgICB2YXIgQmFzZUV2ZW50XzEgPSByZXF1aXJlKCcuLi9ldmVudC9CYXNlRXZlbnQnKTtcbiAgICB2YXIgVXRpbF8xID0gcmVxdWlyZSgnLi4vdXRpbC9VdGlsJyk7XG4gICAgLyoqXG4gICAgICogVGhlIENvbGxlY3Rpb24gY2xhc3MgcHJvdmlkZXMgYSB3YXkgZm9yIHlvdSB0byBtYW5hZ2UgeW91ciBtb2RlbHMuXG4gICAgICpcbiAgICAgKiBAY2xhc3MgQ29sbGVjdGlvblxuICAgICAqIEBleHRlbmRzIEV2ZW50RGlzcGF0Y2hlclxuICAgICAqIEBtb2R1bGUgU3RydWN0dXJlSlNcbiAgICAgKiBAc3VibW9kdWxlIG1vZGVsXG4gICAgICogQHJlcXVpcmVzIEV4dGVuZFxuICAgICAqIEByZXF1aXJlcyBFdmVudERpc3BhdGNoZXJcbiAgICAgKiBAcmVxdWlyZXMgQmFzZUV2ZW50XG4gICAgICogQGNvbnN0cnVjdG9yXG4gICAgICogQHBhcmFtIGJhc2VNb2RlbFR5cGUge0Jhc2VNb2RlbH0gUGFzcyBhIGNsYXNzIHRoYXQgZXh0ZW5kcyBCYXNlTW9kZWwgYW5kIHRoZSBkYXRhIGFkZGVkIHRvIHRoZSBjb2xsZWN0aW9uIHdpbGwgYmUgY3JlYXRlZCBhcyB0aGF0IHR5cGUuXG4gICAgICogQGF1dGhvciBSb2JlcnQgUy4gKHd3dy5jb2RlQmVsdC5jb20pXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiAgICAgbGV0IGRhdGEgPSBbeyBtYWtlOiAnVGVzbGEnLCBtb2RlbDogJ01vZGVsIFMnLCB5ZWFyOiAyMDE0IH0sIHsgbWFrZTogJ1Rlc2xhJywgbW9kZWw6ICdNb2RlbCBYJywgeWVhcjogMjAxNiB9XTtcbiAgICAgKlxuICAgICAqICAgICAvLyBFeGFtcGxlIG9mIGFkZGluZyBkYXRhIHRvIGEgY29sbGVjdGlvblxuICAgICAqICAgICBsZXQgY29sbGVjdGlvbiA9IG5ldyBDb2xsZWN0aW9uKCk7XG4gICAgICogICAgIGNvbGxlY3Rpb24uYWRkKGRhdGEpO1xuICAgICAqXG4gICAgICogICAgIC8vIEV4YW1wbGUgb2YgYWRkaW5nIGRhdGEgdG8gYSBjb2xsZWN0aW9uIHRoYXQgd2lsbCBjcmVhdGUgYSBDYXJNb2RlbCBtb2RlbCBmb3IgZWFjaCBkYXRhIG9iamVjdCBwYXNzZWQgaW4uXG4gICAgICogICAgIGxldCBjb2xsZWN0aW9uID0gbmV3IENvbGxlY3Rpb24oQ2FyTW9kZWwpO1xuICAgICAqICAgICBjb2xsZWN0aW9uLmFkZChkYXRhKTtcbiAgICAgKi9cbiAgICB2YXIgQ29sbGVjdGlvbiA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgICAgIF9fZXh0ZW5kcyhDb2xsZWN0aW9uLCBfc3VwZXIpO1xuICAgICAgICBmdW5jdGlvbiBDb2xsZWN0aW9uKGJhc2VNb2RlbFR5cGUpIHtcbiAgICAgICAgICAgIGlmIChiYXNlTW9kZWxUeXBlID09PSB2b2lkIDApIHsgYmFzZU1vZGVsVHlwZSA9IG51bGw7IH1cbiAgICAgICAgICAgIF9zdXBlci5jYWxsKHRoaXMpO1xuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBUaGUgbGlzdCBvZiBtb2RlbHMgaW4gdGhlIGNvbGxlY3Rpb24uXG4gICAgICAgICAgICAgKlxuICAgICAgICAgICAgICogQHByb3BlcnR5IG1vZGVsc1xuICAgICAgICAgICAgICogQHR5cGUge0FycmF5Ljxhbnk+fVxuICAgICAgICAgICAgICogQHJlYWRPbmx5XG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHRoaXMubW9kZWxzID0gW107XG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIFRoZSBjb3VudCBvZiBob3cgbWFueSBtb2RlbHMgYXJlIGluIHRoZSBjb2xsZWN0aW9uLlxuICAgICAgICAgICAgICpcbiAgICAgICAgICAgICAqIEBwcm9wZXJ0eSBsZW5ndGhcbiAgICAgICAgICAgICAqIEB0eXBlIHtpbnR9XG4gICAgICAgICAgICAgKiBAZGVmYXVsdCAwXG4gICAgICAgICAgICAgKiBAcmVhZE9ubHlcbiAgICAgICAgICAgICAqIEBwdWJsaWNcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgdGhpcy5sZW5ndGggPSAwO1xuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBBIHJlZmVyZW5jZSB0byBhIEJhc2VNb2RlbCB0eXBlIHRoYXQgd2lsbCBiZSB1c2VkIGluIHRoZSBjb2xsZWN0aW9uLlxuICAgICAgICAgICAgICpcbiAgICAgICAgICAgICAqIEBwcm9wZXJ0eSBfbW9kZWxUeXBlXG4gICAgICAgICAgICAgKiBAdHlwZSB7YW55fVxuICAgICAgICAgICAgICogQHByb3RlY3RlZFxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICB0aGlzLl9tb2RlbFR5cGUgPSBudWxsO1xuICAgICAgICAgICAgdGhpcy5fbW9kZWxUeXBlID0gYmFzZU1vZGVsVHlwZTtcbiAgICAgICAgfVxuICAgICAgICAvKipcbiAgICAgICAgICogQWRkcyBtb2RlbCBvciBhbiBhcnJheSBvZiBtb2RlbHMgdG8gdGhlIGNvbGxlY3Rpb24uXG4gICAgICAgICAqXG4gICAgICAgICAqIEBtZXRob2QgYWRkXG4gICAgICAgICAqIEBwYXJhbSBtb2RlbCB7QW55fEFycmF5fSBTaW5nbGUgb3IgYW4gYXJyYXkgb2YgbW9kZWxzIHRvIGFkZCB0byB0aGUgY3VycmVudCBjb2xsZWN0aW9uLlxuICAgICAgICAgKiBAcGFyYW0gW3NpbGVudD1mYWxzZV0ge2Jvb2xlYW59IElmIHlvdSdkIGxpa2UgdG8gcHJldmVudCB0aGUgZXZlbnQgZnJvbSBiZWluZyBkaXNwYXRjaGVkLlxuICAgICAgICAgKiBAcHVibGljXG4gICAgICAgICAqIEBjaGFpbmFibGVcbiAgICAgICAgICogQGV4YW1wbGVcbiAgICAgICAgICogICAgICBjb2xsZWN0aW9uLmFkZChtb2RlbCk7XG4gICAgICAgICAqXG4gICAgICAgICAqICAgICAgY29sbGVjdGlvbi5hZGQoW21vZGVsLCBtb2RlbCwgbW9kZWwsIG1vZGVsXSk7XG4gICAgICAgICAqXG4gICAgICAgICAqICAgICAgY29sbGVjdGlvbi5hZGQobW9kZWwsIHRydWUpO1xuICAgICAgICAgKi9cbiAgICAgICAgQ29sbGVjdGlvbi5wcm90b3R5cGUuYWRkID0gZnVuY3Rpb24gKG1vZGVsLCBzaWxlbnQpIHtcbiAgICAgICAgICAgIGlmIChzaWxlbnQgPT09IHZvaWQgMCkgeyBzaWxlbnQgPSBmYWxzZTsgfVxuICAgICAgICAgICAgLy8gSWYgdGhlIG1vZGVsIHBhc3NlZCBpbiBpcyBub3QgYW4gYXJyYXkgdGhlbiBtYWtlIGl0LlxuICAgICAgICAgICAgdmFyIG1vZGVscyA9IChtb2RlbCBpbnN0YW5jZW9mIEFycmF5KSA/IG1vZGVsIDogW21vZGVsXTtcbiAgICAgICAgICAgIHZhciBsZW4gPSBtb2RlbHMubGVuZ3RoO1xuICAgICAgICAgICAgZm9yICh2YXIgaV8xID0gMDsgaV8xIDwgbGVuOyBpXzErKykge1xuICAgICAgICAgICAgICAgIC8vIE9ubHkgYWRkIHRoZSBtb2RlbCBpZiBpdCBkb2VzIG5vdCBleGlzdCBpbiB0aGUgdGhlIGNvbGxlY3Rpb24uXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaGFzKG1vZGVsc1tpXzFdKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX21vZGVsVHlwZSAhPT0gbnVsbCAmJiAobW9kZWxzW2lfMV0gaW5zdGFuY2VvZiB0aGlzLl9tb2RlbFR5cGUpID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gSWYgdGhlIG1vZGVsVHlwZSBpcyBzZXQgYW5kIHRoZSBkYXRhIGlzIG5vdCBhbHJlYWR5IGEgaW5zdGFuY2Ugb2YgdGhlIG1vZGVsVHlwZVxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gdGhlbiBpbnN0YW50aWF0ZSBpdCBhbmQgcGFzcyB0aGUgZGF0YSBpbnRvIHRoZSBjb25zdHJ1Y3Rvci5cbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubW9kZWxzLnB1c2gobmV3IHRoaXMuX21vZGVsVHlwZShtb2RlbHNbaV8xXSkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gUGFzcyB0aGUgZGF0YSBvYmplY3QgdG8gdGhlIGFycmF5LlxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tb2RlbHMucHVzaChtb2RlbHNbaV8xXSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sZW5ndGggPSB0aGlzLm1vZGVscy5sZW5ndGg7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHNpbGVudCA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRpc3BhdGNoRXZlbnQobmV3IEJhc2VFdmVudF8xLmRlZmF1bHQoQmFzZUV2ZW50XzEuZGVmYXVsdC5BRERFRCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH07XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBSZW1vdmVzIGEgbW9kZWwgb3IgYW4gYXJyYXkgb2YgbW9kZWxzIGZyb20gdGhlIGNvbGxlY3Rpb24uXG4gICAgICAgICAqXG4gICAgICAgICAqIEBtZXRob2QgcmVtb3ZlXG4gICAgICAgICAqIEBwYXJhbSBtb2RlbCB7T2JqZWN0fEFycmF5fSBNb2RlbChzKSB0byByZW1vdmVcbiAgICAgICAgICogQHBhcmFtIFtzaWxlbnQ9ZmFsc2VdIHtib29sZWFufSBJZiB5b3UnZCBsaWtlIHRvIHByZXZlbnQgdGhlIGV2ZW50IGZyb20gYmVpbmcgZGlzcGF0Y2hlZC5cbiAgICAgICAgICogQHB1YmxpY1xuICAgICAgICAgKiBAY2hhaW5hYmxlXG4gICAgICAgICAqIEBleGFtcGxlXG4gICAgICAgICAqICAgICAgY29sbGVjdGlvbi5yZW1vdmUobW9kZWwpO1xuICAgICAgICAgKlxuICAgICAgICAgKiAgICAgIGNvbGxlY3Rpb24ucmVtb3ZlKFttb2RlbCwgbW9kZWwsIG1vZGVsLCBtb2RlbF0pO1xuICAgICAgICAgKlxuICAgICAgICAgKiAgICAgIGNvbGxlY3Rpb24ucmVtb3ZlKG1vZGVsLCB0cnVlKTtcbiAgICAgICAgICovXG4gICAgICAgIENvbGxlY3Rpb24ucHJvdG90eXBlLnJlbW92ZSA9IGZ1bmN0aW9uIChtb2RlbCwgc2lsZW50KSB7XG4gICAgICAgICAgICBpZiAoc2lsZW50ID09PSB2b2lkIDApIHsgc2lsZW50ID0gZmFsc2U7IH1cbiAgICAgICAgICAgIC8vIElmIHRoZSBtb2RlbCBwYXNzZWQgaW4gaXMgbm90IGFuIGFycmF5IHRoZW4gbWFrZSBpdC5cbiAgICAgICAgICAgIHZhciBtb2RlbHMgPSAobW9kZWwgaW5zdGFuY2VvZiBBcnJheSkgPyBtb2RlbCA6IFttb2RlbF07XG4gICAgICAgICAgICBmb3IgKHZhciBpXzIgPSBtb2RlbHMubGVuZ3RoIC0gMTsgaV8yID49IDA7IGlfMi0tKSB7XG4gICAgICAgICAgICAgICAgLy8gT25seSByZW1vdmUgdGhlIG1vZGVsIGlmIGl0IGV4aXN0cyBpbiB0aGUgdGhlIGNvbGxlY3Rpb24uXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaGFzKG1vZGVsc1tpXzJdKSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1vZGVscy5zcGxpY2UodGhpcy5pbmRleE9mKG1vZGVsc1tpXzJdKSwgMSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubGVuZ3RoID0gdGhpcy5tb2RlbHMubGVuZ3RoO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChzaWxlbnQgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KG5ldyBCYXNlRXZlbnRfMS5kZWZhdWx0KEJhc2VFdmVudF8xLmRlZmF1bHQuUkVNT1ZFRCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH07XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDaGVja3MgaWYgYSBjb2xsZWN0aW9uIGhhcyBhbiBtb2RlbC5cbiAgICAgICAgICpcbiAgICAgICAgICogQG1ldGhvZCBoYXNcbiAgICAgICAgICogQHBhcmFtIG1vZGVsIHtPYmplY3R9IEl0ZW0gdG8gY2hlY2tcbiAgICAgICAgICogQHJldHVybiB7Ym9vbGVhbn1cbiAgICAgICAgICogQHB1YmxpY1xuICAgICAgICAgKiBAZXhhbXBsZVxuICAgICAgICAgKiAgICAgIGNvbGxlY3Rpb24uaGFzKG1vZGVsKTtcbiAgICAgICAgICovXG4gICAgICAgIENvbGxlY3Rpb24ucHJvdG90eXBlLmhhcyA9IGZ1bmN0aW9uIChtb2RlbCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuaW5kZXhPZihtb2RlbCkgPiAtMTtcbiAgICAgICAgfTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFJldHVybnMgdGhlIGFycmF5IGluZGV4IHBvc2l0aW9uIG9mIHRoZSAgQmFzZSBNb2RlbC5cbiAgICAgICAgICpcbiAgICAgICAgICogQG1ldGhvZCBpbmRleE9mXG4gICAgICAgICAqIEBwYXJhbSBtb2RlbCB7T2JqZWN0fSBnZXQgdGhlIGluZGV4IG9mLlxuICAgICAgICAgKiBAcmV0dXJuIHtpbnR9XG4gICAgICAgICAqIEBwdWJsaWNcbiAgICAgICAgICogQGV4YW1wbGVcbiAgICAgICAgICogICAgICBjb2xsZWN0aW9uLmluZGV4T2YobW9kZWwpO1xuICAgICAgICAgKi9cbiAgICAgICAgQ29sbGVjdGlvbi5wcm90b3R5cGUuaW5kZXhPZiA9IGZ1bmN0aW9uIChtb2RlbCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMubW9kZWxzLmluZGV4T2YobW9kZWwpO1xuICAgICAgICB9O1xuICAgICAgICAvKipcbiAgICAgICAgICogRmluZHMgYW4gb2JqZWN0IGJ5IGFuIGluZGV4IHZhbHVlLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAbWV0aG9kIGdldFxuICAgICAgICAgKiBAcGFyYW0gaW5kZXgge2ludH0gVGhlIGluZGV4IGludGVnZXIgb2YgdGhlIG1vZGVsIHRvIGdldFxuICAgICAgICAgKiBAcmV0dXJuIHtPYmplY3R9IHRoZSBtb2RlbFxuICAgICAgICAgKiBAcHVibGljXG4gICAgICAgICAqIEBleGFtcGxlXG4gICAgICAgICAqICAgICAgbGV0IG1vZGVsID0gY29sbGVjdGlvbi5nZXQoMSk7XG4gICAgICAgICAqL1xuICAgICAgICBDb2xsZWN0aW9uLnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbiAoaW5kZXgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm1vZGVsc1tpbmRleF0gfHwgbnVsbDtcbiAgICAgICAgfTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEV4YW1pbmVzIGVhY2ggZWxlbWVudCBpbiBhIGNvbGxlY3Rpb24sIHJldHVybmluZyBhbiBhcnJheSBvZiBhbGwgZWxlbWVudHMgdGhhdCBoYXZlIHRoZSBnaXZlbiBwcm9wZXJ0aWVzLlxuICAgICAgICAgKiBXaGVuIGNoZWNraW5nIHByb3BlcnRpZXMsIHRoaXMgbWV0aG9kIHBlcmZvcm1zIGEgZGVlcCBjb21wYXJpc29uIGJldHdlZW4gdmFsdWVzIHRvIGRldGVybWluZSBpZiB0aGV5IGFyZSBlcXVpdmFsZW50IHRvIGVhY2ggb3RoZXIuXG4gICAgICAgICAqIEBtZXRob2QgZmluZEJ5XG4gICAgICAgICAqIEBwYXJhbSBhcmcge09iamVjdHxBcnJheX1cbiAgICAgICAgICogQHJldHVybiB7QXJyYXkuPGFueT59IFJldHVybnMgYSBsaXN0IG9mIGZvdW5kIG9iamVjdCdzLlxuICAgICAgICAgKiBAcHVibGljXG4gICAgICAgICAqIEBleGFtcGxlXG4gICAgICAgICAqICAgICAgLy8gRmluZHMgYWxsICBCYXNlIE1vZGVsIHRoYXQgaGFzICdSb2JlcnQnIGluIGl0LlxuICAgICAgICAgKiAgICAgIGNvbGxlY3Rpb24uZmluZEJ5KFwiUm9iZXJ0XCIpO1xuICAgICAgICAgKiAgICAgIC8vIEZpbmRzIGFueSAgQmFzZSBNb2RlbCB0aGF0IGhhcyAnUm9iZXJ0JyBvciAnSGVhdGVyJyBvciAyMyBpbiBpdC5cbiAgICAgICAgICogICAgICBjb2xsZWN0aW9uLmZpbmRCeShbXCJSb2JlcnRcIiwgXCJIZWF0aGVyXCIsIDMyXSk7XG4gICAgICAgICAqXG4gICAgICAgICAqICAgICAgLy8gRmluZHMgYWxsICBCYXNlIE1vZGVscyB0aGF0IHNhbWUga2V5IGFuZCB2YWx1ZSB5b3UgYXJlIHNlYXJjaGluZyBmb3IuXG4gICAgICAgICAqICAgICAgY29sbGVjdGlvbi5maW5kQnkoeyBuYW1lOiAnYXBwbGUnLCBvcmdhbmljOiBmYWxzZSwgdHlwZTogJ2ZydWl0JyB9KTtcbiAgICAgICAgICogICAgICBjb2xsZWN0aW9uLmZpbmRCeShbeyB0eXBlOiAndmVnZXRhYmxlJyB9LCB7IG5hbWU6ICdhcHBsZScsICdvcmdhbmljOiBmYWxzZSwgdHlwZSc6ICdmcnVpdCcgfV0pO1xuICAgICAgICAgKi9cbiAgICAgICAgQ29sbGVjdGlvbi5wcm90b3R5cGUuZmluZEJ5ID0gZnVuY3Rpb24gKGFyZykge1xuICAgICAgICAgICAgLy8gSWYgcHJvcGVydGllcyBpcyBub3QgYW4gYXJyYXkgdGhlbiBtYWtlIGl0IGFuIGFycmF5IG9iamVjdC5cbiAgICAgICAgICAgIHZhciBsaXN0ID0gKGFyZyBpbnN0YW5jZW9mIEFycmF5KSA/IGFyZyA6IFthcmddO1xuICAgICAgICAgICAgdmFyIGZvdW5kSXRlbXMgPSBbXTtcbiAgICAgICAgICAgIHZhciBsZW4gPSBsaXN0Lmxlbmd0aDtcbiAgICAgICAgICAgIHZhciBwcm9wO1xuICAgICAgICAgICAgZm9yICh2YXIgaV8zID0gMDsgaV8zIDwgbGVuOyBpXzMrKykge1xuICAgICAgICAgICAgICAgIHByb3AgPSBsaXN0W2lfM107XG4gICAgICAgICAgICAgICAgLy8gQWRkcyBmb3VuZCAgQmFzZSBNb2RlbCB0byB0aGUgZm91bmRJdGVtcyBhcnJheS5cbiAgICAgICAgICAgICAgICBpZiAoKHR5cGVvZiBwcm9wID09PSAnc3RyaW5nJykgfHwgKHR5cGVvZiBwcm9wID09PSAnbnVtYmVyJykgfHwgKHR5cGVvZiBwcm9wID09PSAnYm9vbGVhbicpKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIElmIHRoZSBtb2RlbCBpcyBub3QgYW4gb2JqZWN0LlxuICAgICAgICAgICAgICAgICAgICBmb3VuZEl0ZW1zID0gZm91bmRJdGVtcy5jb25jYXQodGhpcy5fZmluZFByb3BlcnR5VmFsdWUocHJvcCkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gSWYgdGhlIG1vZGVsIGlzIGFuIG9iamVjdC5cbiAgICAgICAgICAgICAgICAgICAgZm91bmRJdGVtcyA9IGZvdW5kSXRlbXMuY29uY2F0KHRoaXMuX3doZXJlKHByb3ApKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBSZW1vdmVzIGFsbCBkdXBsaWNhdGVkIG9iamVjdHMgZm91bmQgaW4gdGhlIHRlbXAgYXJyYXkuXG4gICAgICAgICAgICByZXR1cm4gVXRpbF8xLmRlZmF1bHQudW5pcXVlKGZvdW5kSXRlbXMpO1xuICAgICAgICB9O1xuICAgICAgICAvKipcbiAgICAgICAgICogTG9vcHMgdGhyb3VnaCB0aGUgbW9kZWxzIGFycmF5IGFuZCBjcmVhdGVzIGEgbmV3IGFycmF5IG9mIG1vZGVscyB0aGF0IG1hdGNoIGFsbCB0aGUgcHJvcGVydGllcyBvbiB0aGUgb2JqZWN0IHBhc3NlZCBpbi5cbiAgICAgICAgICpcbiAgICAgICAgICogQG1ldGhvZCBfd2hlcmVcbiAgICAgICAgICogQHBhcmFtIHByb3BMaXN0IHtPYmplY3R8QXJyYXl9XG4gICAgICAgICAqIEByZXR1cm4ge0FycmF5Ljxhbnk+fSBSZXR1cm5zIGEgbGlzdCBvZiBmb3VuZCBvYmplY3Qncy5cbiAgICAgICAgICogQHByb3RlY3RlZFxuICAgICAgICAgKi9cbiAgICAgICAgQ29sbGVjdGlvbi5wcm90b3R5cGUuX3doZXJlID0gZnVuY3Rpb24gKHByb3BMaXN0KSB7XG4gICAgICAgICAgICAvLyBJZiBwcm9wZXJ0aWVzIGlzIG5vdCBhbiBhcnJheSB0aGVuIG1ha2UgaXQgYW4gYXJyYXkgb2JqZWN0LlxuICAgICAgICAgICAgdmFyIGxpc3QgPSAocHJvcExpc3QgaW5zdGFuY2VvZiBBcnJheSkgPyBwcm9wTGlzdCA6IFtwcm9wTGlzdF07XG4gICAgICAgICAgICB2YXIgZm91bmRJdGVtcyA9IFtdO1xuICAgICAgICAgICAgdmFyIGl0ZW1zTGVuZ3RoID0gdGhpcy5tb2RlbHMubGVuZ3RoO1xuICAgICAgICAgICAgdmFyIGl0ZW1zVG9GaW5kTGVuZ3RoID0gbGlzdC5sZW5ndGg7XG4gICAgICAgICAgICB2YXIgaGFzTWF0Y2hpbmdQcm9wZXJ0eSA9IGZhbHNlO1xuICAgICAgICAgICAgdmFyIGRvZXNNb2RlbE1hdGNoID0gZmFsc2U7XG4gICAgICAgICAgICB2YXIgbW9kZWw7XG4gICAgICAgICAgICB2YXIgb2JqO1xuICAgICAgICAgICAgdmFyIGtleTtcbiAgICAgICAgICAgIHZhciBqO1xuICAgICAgICAgICAgZm9yICh2YXIgaV80ID0gMDsgaV80IDwgaXRlbXNUb0ZpbmRMZW5ndGg7IGlfNCsrKSB7XG4gICAgICAgICAgICAgICAgb2JqID0gbGlzdFtpXzRdO1xuICAgICAgICAgICAgICAgIGZvciAoaiA9IDA7IGogPCBpdGVtc0xlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAgICAgICAgIGhhc01hdGNoaW5nUHJvcGVydHkgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgZG9lc01vZGVsTWF0Y2ggPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBtb2RlbCA9IHRoaXMubW9kZWxzW2pdO1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGtleSBpbiBvYmopIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIENoZWNrIGlmIHRoZSBrZXkgdmFsdWUgaXMgYSBwcm9wZXJ0eS5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvYmouaGFzT3duUHJvcGVydHkoa2V5KSAmJiBtb2RlbC5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGFzTWF0Y2hpbmdQcm9wZXJ0eSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9ialtrZXldICE9PSBtb2RlbFtrZXldKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRvZXNNb2RlbE1hdGNoID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAoZG9lc01vZGVsTWF0Y2ggPT09IHRydWUgJiYgaGFzTWF0Y2hpbmdQcm9wZXJ0eSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZm91bmRJdGVtcy5wdXNoKG1vZGVsKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBmb3VuZEl0ZW1zO1xuICAgICAgICB9O1xuICAgICAgICAvKipcbiAgICAgICAgICogTG9vcHMgdGhyb3VnaCBhbGwgcHJvcGVydGllcyBvZiBhbiBvYmplY3QgYW5kIGNoZWNrIHRvIHNlZSBpZiB0aGUgdmFsdWUgbWF0Y2hlcyB0aGUgYXJndW1lbnQgcGFzc2VkIGluLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAbWV0aG9kIF9maW5kUHJvcGVydHlWYWx1ZVxuICAgICAgICAgKiBAcGFyYW0gYXJnIHtTdHJpbmd8TnVtYmVyfEJvb2xlYW4+fVxuICAgICAgICAgKiBAcmV0dXJuIHtBcnJheS48YW55Pn0gUmV0dXJucyBhIGxpc3Qgb2YgZm91bmQgb2JqZWN0J3MuXG4gICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICovXG4gICAgICAgIENvbGxlY3Rpb24ucHJvdG90eXBlLl9maW5kUHJvcGVydHlWYWx1ZSA9IGZ1bmN0aW9uIChhcmcpIHtcbiAgICAgICAgICAgIC8vIElmIHByb3BlcnRpZXMgaXMgbm90IGFuIGFycmF5IHRoZW4gbWFrZSBpdCBhbiBhcnJheSBvYmplY3QuXG4gICAgICAgICAgICB2YXIgbGlzdCA9IChhcmcgaW5zdGFuY2VvZiBBcnJheSkgPyBhcmcgOiBbYXJnXTtcbiAgICAgICAgICAgIHZhciBmb3VuZEl0ZW1zID0gW107XG4gICAgICAgICAgICB2YXIgaXRlbXNMZW5ndGggPSB0aGlzLm1vZGVscy5sZW5ndGg7XG4gICAgICAgICAgICB2YXIgaXRlbXNUb0ZpbmRMZW5ndGggPSBsaXN0Lmxlbmd0aDtcbiAgICAgICAgICAgIHZhciBwcm9wZXJ0eVZhbHVlO1xuICAgICAgICAgICAgdmFyIHZhbHVlO1xuICAgICAgICAgICAgdmFyIG1vZGVsO1xuICAgICAgICAgICAgdmFyIGtleTtcbiAgICAgICAgICAgIHZhciBqO1xuICAgICAgICAgICAgZm9yICh2YXIgaV81ID0gMDsgaV81IDwgaXRlbXNMZW5ndGg7IGlfNSsrKSB7XG4gICAgICAgICAgICAgICAgbW9kZWwgPSB0aGlzLm1vZGVsc1tpXzVdO1xuICAgICAgICAgICAgICAgIGZvciAoa2V5IGluIG1vZGVsKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIENoZWNrIGlmIHRoZSBrZXkgdmFsdWUgaXMgYSBwcm9wZXJ0eS5cbiAgICAgICAgICAgICAgICAgICAgaWYgKG1vZGVsLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb3BlcnR5VmFsdWUgPSBtb2RlbFtrZXldO1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChqID0gMDsgaiA8IGl0ZW1zVG9GaW5kTGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IGxpc3Rbal07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gSWYgdGhlICBCYXNlIE1vZGVsIHByb3BlcnR5IGVxdWFscyB0aGUgc3RyaW5nIHZhbHVlIHRoZW4ga2VlcCBhIHJlZmVyZW5jZSB0byB0aGF0ICBCYXNlIE1vZGVsLlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwcm9wZXJ0eVZhbHVlID09PSB2YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBBZGQgZm91bmQgIEJhc2UgTW9kZWwgdG8gdGhlIGZvdW5kSXRlbXMgYXJyYXkuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvdW5kSXRlbXMucHVzaChtb2RlbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBmb3VuZEl0ZW1zO1xuICAgICAgICB9O1xuICAgICAgICAvKipcbiAgICAgICAgICogQ2xlYXJzIG9yIHJlbW92ZSBhbGwgdGhlIG1vZGVscyBmcm9tIHRoZSBjb2xsZWN0aW9uLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAbWV0aG9kIGNsZWFyXG4gICAgICAgICAqIEBwYXJhbSBbc2lsZW50PWZhbHNlXSB7Ym9vbGVhbn0gSWYgeW91J2QgbGlrZSB0byBwcmV2ZW50IHRoZSBldmVudCBmcm9tIGJlaW5nIGRpc3BhdGNoZWQuXG4gICAgICAgICAqIEBwdWJsaWNcbiAgICAgICAgICogQGNoYWluYWJsZVxuICAgICAgICAgKiBAZXhhbXBsZVxuICAgICAgICAgKiAgICAgIGNvbGxlY3Rpb24uY2xlYXIoKTtcbiAgICAgICAgICovXG4gICAgICAgIENvbGxlY3Rpb24ucHJvdG90eXBlLmNsZWFyID0gZnVuY3Rpb24gKHNpbGVudCkge1xuICAgICAgICAgICAgaWYgKHNpbGVudCA9PT0gdm9pZCAwKSB7IHNpbGVudCA9IGZhbHNlOyB9XG4gICAgICAgICAgICB0aGlzLm1vZGVscyA9IFtdO1xuICAgICAgICAgICAgdGhpcy5sZW5ndGggPSAwO1xuICAgICAgICAgICAgaWYgKHNpbGVudCA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRpc3BhdGNoRXZlbnQobmV3IEJhc2VFdmVudF8xLmRlZmF1bHQoQmFzZUV2ZW50XzEuZGVmYXVsdC5DTEVBUikpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH07XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDcmVhdGVzIGFuZCByZXR1cm5zIGEgbmV3IGNvbGxlY3Rpb24gb2JqZWN0IHRoYXQgY29udGFpbnMgYSByZWZlcmVuY2UgdG8gdGhlIG1vZGVscyBpbiB0aGUgY29sbGVjdGlvbiBjbG9uZWQgZnJvbS5cbiAgICAgICAgICpcbiAgICAgICAgICogQG1ldGhvZCBjbG9uZVxuICAgICAgICAgKiBAcmV0dXJucyB7Q29sbGVjdGlvbn1cbiAgICAgICAgICogQHB1YmxpY1xuICAgICAgICAgKiBAZXhhbXBsZVxuICAgICAgICAgKiAgICAgbGV0IGNsb25lID0gY29sbGVjdGlvbi5jbG9uZSgpO1xuICAgICAgICAgKi9cbiAgICAgICAgQ29sbGVjdGlvbi5wcm90b3R5cGUuY2xvbmUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgY2xvbmVkQmFzZU1vZGVsID0gbmV3IHRoaXMuY29uc3RydWN0b3IodGhpcy5fbW9kZWxUeXBlKTtcbiAgICAgICAgICAgIGNsb25lZEJhc2VNb2RlbC5hZGQodGhpcy5tb2RlbHMuc2xpY2UoMCkpO1xuICAgICAgICAgICAgcmV0dXJuIGNsb25lZEJhc2VNb2RlbDtcbiAgICAgICAgfTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIENyZWF0ZXMgYSBKU09OIG9iamVjdCBvZiB0aGUgY29sbGVjdGlvbi5cbiAgICAgICAgICpcbiAgICAgICAgICogQG1ldGhvZCB0b0pTT05cbiAgICAgICAgICogQHJldHVybnMge0FycmF5Ljxhbnk+fVxuICAgICAgICAgKiBAcHVibGljXG4gICAgICAgICAqIEBleGFtcGxlXG4gICAgICAgICAqICAgICBsZXQgYXJyYXlPZk9iamVjdHMgPSBjb2xsZWN0aW9uLnRvSlNPTigpO1xuICAgICAgICAgKi9cbiAgICAgICAgQ29sbGVjdGlvbi5wcm90b3R5cGUudG9KU09OID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuX21vZGVsVHlwZSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHZhciBsaXN0ID0gW107XG4gICAgICAgICAgICAgICAgdmFyIGxlbiA9IHRoaXMubGVuZ3RoO1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGlfNiA9IDA7IGlfNiA8IGxlbjsgaV82KyspIHtcbiAgICAgICAgICAgICAgICAgICAgbGlzdFtpXzZdID0gdGhpcy5tb2RlbHNbaV82XS50b0pTT04oKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGxpc3Q7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gVXRpbF8xLmRlZmF1bHQuY2xvbmUodGhpcy5tb2RlbHMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICAvKipcbiAgICAgICAgICogQ3JlYXRlcyBhIEpTT04gc3RyaW5nIG9mIHRoZSBjb2xsZWN0aW9uLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAbWV0aG9kIHRvSlNPTlN0cmluZ1xuICAgICAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxuICAgICAgICAgKiBAcHVibGljXG4gICAgICAgICAqIEBleGFtcGxlXG4gICAgICAgICAqICAgICBsZXQgc3RyID0gY29sbGVjdGlvbi50b0pTT05TdHJpbmcoKTtcbiAgICAgICAgICovXG4gICAgICAgIENvbGxlY3Rpb24ucHJvdG90eXBlLnRvSlNPTlN0cmluZyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSh0aGlzLnRvSlNPTigpKTtcbiAgICAgICAgfTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIENvbnZlcnRzIHRoZSBzdHJpbmcganNvbiBkYXRhIGludG8gYW4gT2JqZWN0cyBhbmQgY2FsbHMgdGhlIHt7I2Nyb3NzTGluayBcIkNvbGxlY3Rpb24vYWRkOm1ldGhvZFwifX17ey9jcm9zc0xpbmt9fSBtZXRob2QgdG8gYWRkIHRoZSBvYmplY3RzIHRvIHRoZSBjb2xsZWN0aW9uLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAbWV0aG9kIGZyb21KU09OXG4gICAgICAgICAqIEBwYXJhbSBqc29uIHtzdHJpbmd9XG4gICAgICAgICAqIEBwdWJsaWNcbiAgICAgICAgICogQGNoYWluYWJsZVxuICAgICAgICAgKiBAZXhhbXBsZVxuICAgICAgICAgKiAgICAgIGNvbGxlY3Rpb24uZnJvbUpTT04oc3RyKTtcbiAgICAgICAgICovXG4gICAgICAgIENvbGxlY3Rpb24ucHJvdG90eXBlLmZyb21KU09OID0gZnVuY3Rpb24gKGpzb24pIHtcbiAgICAgICAgICAgIHZhciBwYXJzZWREYXRhID0gSlNPTi5wYXJzZShqc29uKTtcbiAgICAgICAgICAgIHRoaXMuYWRkKHBhcnNlZERhdGEpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH07XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBBbGxvd3MgeW91IHRvIHNvcnQgbW9kZWxzIHRoYXQgaGF2ZSBvbmUgb3IgbW9yZSBjb21tb24gcHJvcGVydGllcywgc3BlY2lmeWluZyB0aGUgcHJvcGVydHkgb3IgcHJvcGVydGllcyB0byB1c2UgYXMgdGhlIHNvcnQga2V5c1xuICAgICAgICAgKlxuICAgICAgICAgKiBAbWV0aG9kIHNvcnRPblxuICAgICAgICAgKiBAcGFyYW0gcHJvcGVydHlOYW1lIHtzdHJpbmd9XG4gICAgICAgICAqIEBwYXJhbSBbc29ydEFzY2VuZGluZz10cnVlXSB7Ym9vbGVhbn1cbiAgICAgICAgICogQHB1YmxpY1xuICAgICAgICAgKiBAcmV0dXJuIHtBcnJheTxhbnk+fSBSZXR1cm5zIHRoZSBsaXN0IG9mIG1vZGVscyBpbiB0aGUgY29sbGVjdGlvbi5cbiAgICAgICAgICogQGV4YW1wbGVcbiAgICAgICAgICogICAgICBjb2xsZWN0aW9uLnNvcnRPbignbmFtZScpO1xuICAgICAgICAgKiAgICAgIGNvbGxlY3Rpb24uc29ydE9uKCduYW1lJywgZmFsc2UpO1xuICAgICAgICAgKi9cbiAgICAgICAgQ29sbGVjdGlvbi5wcm90b3R5cGUuc29ydE9uID0gZnVuY3Rpb24gKHByb3BlcnR5TmFtZSwgc29ydEFzY2VuZGluZykge1xuICAgICAgICAgICAgaWYgKHNvcnRBc2NlbmRpbmcgPT09IHZvaWQgMCkgeyBzb3J0QXNjZW5kaW5nID0gdHJ1ZTsgfVxuICAgICAgICAgICAgaWYgKHNvcnRBc2NlbmRpbmcgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuc29ydChmdW5jdGlvbiAoYSwgYikge1xuICAgICAgICAgICAgICAgICAgICBpZiAoYVtwcm9wZXJ0eU5hbWVdIDwgYltwcm9wZXJ0eU5hbWVdKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gMTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAoYVtwcm9wZXJ0eU5hbWVdID4gYltwcm9wZXJ0eU5hbWVdKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gLTE7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5zb3J0KGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChhW3Byb3BlcnR5TmFtZV0gPiBiW3Byb3BlcnR5TmFtZV0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAxO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChhW3Byb3BlcnR5TmFtZV0gPCBiW3Byb3BlcnR5TmFtZV0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAtMTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFNwZWNpZmllcyBhIGZ1bmN0aW9uIHRoYXQgZGVmaW5lcyB0aGUgc29ydCBvcmRlci4gSWYgb21pdHRlZCwgdGhlIGFycmF5IGlzIHNvcnRlZCBhY2NvcmRpbmcgdG8gZWFjaCBjaGFyYWN0ZXIncyBVbmljb2RlIGNvZGVcbiAgICAgICAgICogcG9pbnQgdmFsdWUsIGFjY29yZGluZyB0byB0aGUgc3RyaW5nIGNvbnZlcnNpb24gb2YgZWFjaCBlbGVtZW50LlxuICAgICAgICAgKlxuICAgICAgICAgKiBAbWV0aG9kIHNvcnRcbiAgICAgICAgICogQHBhcmFtIFtzb3J0RnVuY3Rpb249bnVsbF0ge0Z1bmN0aW9ufVxuICAgICAgICAgKiBAcHVibGljXG4gICAgICAgICAqIEByZXR1cm4ge0FycmF5Ljxhbnk+fSBSZXR1cm5zIHRoZSBsaXN0IG9mIG1vZGVscyBpbiB0aGUgY29sbGVjdGlvbi5cbiAgICAgICAgICogQGV4YW1wbGVcbiAgICAgICAgICogICAgICBsZXQgc29ydEJ5RGF0ZSA9IGZ1bmN0aW9uKGEsIGIpe1xuICAgICAgICAgKiAgICAgICAgICByZXR1cm4gbmV3IERhdGUoYS5kYXRlKSAtIG5ldyBEYXRlKGIuZGF0ZSlcbiAgICAgICAgICogICAgICB9XG4gICAgICAgICAqXG4gICAgICAgICAqICAgICAgY29sbGVjdGlvbi5zb3J0KHNvcnRCeURhdGUpO1xuICAgICAgICAgKi9cbiAgICAgICAgQ29sbGVjdGlvbi5wcm90b3R5cGUuc29ydCA9IGZ1bmN0aW9uIChzb3J0RnVuY3Rpb24pIHtcbiAgICAgICAgICAgIGlmIChzb3J0RnVuY3Rpb24gPT09IHZvaWQgMCkgeyBzb3J0RnVuY3Rpb24gPSBudWxsOyB9XG4gICAgICAgICAgICB0aGlzLm1vZGVscy5zb3J0KHNvcnRGdW5jdGlvbik7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5tb2RlbHM7XG4gICAgICAgIH07XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgZmlsdGVyIG1ldGhvZCBjcmVhdGVzIGEgbmV3IGFycmF5IHdpdGggYWxsIGVsZW1lbnRzIHRoYXQgcGFzcyB0aGUgdGVzdCBpbXBsZW1lbnRlZCBieSB0aGUgcHJvdmlkZWQgZnVuY3Rpb24uXG4gICAgICAgICAqXG4gICAgICAgICAqIEBtZXRob2QgZmlsdGVyXG4gICAgICAgICAqIEBwYXJhbSBjYWxsYmFjayB7RnVuY3Rpb259IEZ1bmN0aW9uIHRvIHRlc3QgZWFjaCBlbGVtZW50IG9mIHRoZSBhcnJheS4gSW52b2tlZCB3aXRoIGFyZ3VtZW50cyAoZWxlbWVudCwgaW5kZXgsIGFycmF5KS4gUmV0dXJuIHRydWUgdG8ga2VlcCB0aGUgZWxlbWVudCwgZmFsc2Ugb3RoZXJ3aXNlLlxuICAgICAgICAgKiBAcGFyYW0gW2NhbGxiYWNrU2NvcGU9bnVsbF0gT3B0aW9uYWwuIFZhbHVlIHRvIHVzZSBhcyB0aGlzIHdoZW4gZXhlY3V0aW5nIGNhbGxiYWNrLlxuICAgICAgICAgKiBAcHVibGljXG4gICAgICAgICAqIEByZXR1cm4ge0FycmF5Ljxhbnk+fSBSZXR1cm5zIHRoZSBsaXN0IG9mIG1vZGVscyBpbiB0aGUgY29sbGVjdGlvbi5cbiAgICAgICAgICogQGV4YW1wbGVcbiAgICAgICAgICogICAgICBsZXQgaXNPbGRFbm91Z2ggPSBmdW5jdGlvbihtb2RlbCl7XG4gICAgICAgICAqICAgICAgICAgIHJldHVybiBtb2RlbC5hZ2UgPj0gMjE7XG4gICAgICAgICAqICAgICAgfVxuICAgICAgICAgKlxuICAgICAgICAgKiAgICAgIGxldCBsaXN0ID0gY29sbGVjdGlvbi5maWx0ZXIoaXNPbGRFbm91Z2gpO1xuICAgICAgICAgKi9cbiAgICAgICAgQ29sbGVjdGlvbi5wcm90b3R5cGUuZmlsdGVyID0gZnVuY3Rpb24gKGNhbGxiYWNrLCBjYWxsYmFja1Njb3BlKSB7XG4gICAgICAgICAgICBpZiAoY2FsbGJhY2tTY29wZSA9PT0gdm9pZCAwKSB7IGNhbGxiYWNrU2NvcGUgPSBudWxsOyB9XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5tb2RlbHMuZmlsdGVyKGNhbGxiYWNrLCBjYWxsYmFja1Njb3BlKTtcbiAgICAgICAgfTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIENvbnZlbmllbnQgd2F5IHRvIGdldCBhIGxpc3Qgb2YgcHJvcGVydHkgdmFsdWVzLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAbWV0aG9kIHBsdWNrXG4gICAgICAgICAqIEBwYXJhbSBwcm9wZXJ0eU5hbWUge3N0cmluZ30gVGhlIHByb3BlcnR5IG5hbWUgeW91IHdhbnQgdGhlIHZhbHVlcyBmcm9tLlxuICAgICAgICAgKiBAcGFyYW0gW3VuaXF1ZT1mYWxzZV0ge3N0cmluZ30gUGFzcyBpbiB0cnVlIHRvIHJlbW92ZSBkdXBsaWNhdGVzLlxuICAgICAgICAgKiBAcmV0dXJuIHtBcnJheS48YW55Pn1cbiAgICAgICAgICogQHB1YmxpY1xuICAgICAgICAgKiBAZXhhbXBsZVxuICAgICAgICAgKiAgICAgIGNvbGxlY3Rpb24uYWRkKFt7bmFtZTogJ1JvYmVydCd9LCB7bmFtZTogJ1JvYmVydCd9LCB7bmFtZTogJ0NocmlzJ31dKTtcbiAgICAgICAgICpcbiAgICAgICAgICogICAgICBsZXQgbGlzdCA9IGNvbGxlY3Rpb24ucGx1Y2soJ25hbWUnKTtcbiAgICAgICAgICogICAgICAvLyBbJ1JvYmVydCcsICdSb2JlcnQnLCAnQ2hyaXMnXVxuICAgICAgICAgKlxuICAgICAgICAgKiAgICAgIGxldCBsaXN0ID0gY29sbGVjdGlvbi5wbHVjaygnbmFtZScsIHRydWUpO1xuICAgICAgICAgKiAgICAgIC8vIFsnUm9iZXJ0JywgJ0NocmlzJ11cbiAgICAgICAgICovXG4gICAgICAgIENvbGxlY3Rpb24ucHJvdG90eXBlLnBsdWNrID0gZnVuY3Rpb24gKHByb3BlcnR5TmFtZSwgdW5pcXVlKSB7XG4gICAgICAgICAgICBpZiAodW5pcXVlID09PSB2b2lkIDApIHsgdW5pcXVlID0gZmFsc2U7IH1cbiAgICAgICAgICAgIHZhciBsaXN0ID0gW107XG4gICAgICAgICAgICBmb3IgKHZhciBpXzcgPSAwOyBpXzcgPCB0aGlzLmxlbmd0aDsgaV83KyspIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5tb2RlbHNbaV83XS5oYXNPd25Qcm9wZXJ0eShwcm9wZXJ0eU5hbWUpID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgICAgIGxpc3RbaV83XSA9IHRoaXMubW9kZWxzW2lfN11bcHJvcGVydHlOYW1lXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodW5pcXVlID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgbGlzdCA9IFV0aWxfMS5kZWZhdWx0LnVuaXF1ZShsaXN0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBsaXN0O1xuICAgICAgICB9O1xuICAgICAgICAvKipcbiAgICAgICAgICogQ29udmVuaWVudCB3YXkgdG8gZ3JvdXAgbW9kZWxzIGludG8gY2F0ZWdvcmllcy9ncm91cHMgYnkgYSBwcm9wZXJ0eSBuYW1lLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAbWV0aG9kIGdyb3VwQnlcbiAgICAgICAgICogQHBhcmFtIHByb3BlcnR5TmFtZSB7c3RyaW5nfSBUaGUgc3RyaW5nIHZhbHVlIG9mIHRoZSBwcm9wZXJ0eSB5b3Ugd2FudCB0byBncm91cCB3aXRoLlxuICAgICAgICAgKiBAcmV0dXJuIHthbnl9IFJldHVybnMgYW4gb2JqZWN0IHRoYXQgaXMgY2F0ZWdvcml6ZWQgYnkgdGhlIHByb3BlcnR5IG5hbWUuXG4gICAgICAgICAqIEBwdWJsaWNcbiAgICAgICAgICogQGV4YW1wbGVcbiAgICAgICAgICogICAgICBjb2xsZWN0aW9uLmFkZChbe25hbWU6ICdSb2JlcnQnLCBpZDogMH0sIHtuYW1lOiAnUm9iZXJ0JywgaWQ6IDF9LCB7bmFtZTogJ0NocmlzJywgaWQ6IDJ9XSk7XG4gICAgICAgICAqXG4gICAgICAgICAqICAgICAgbGV0IGxpc3QgPSBjb2xsZWN0aW9uLmdyb3VwQnkoJ25hbWUnKTtcbiAgICAgICAgICpcbiAgICAgICAgICogICAgICAvLyB7XG4gICAgICAgICAqICAgICAgLy8gICAgUm9iZXJ0OiBbe25hbWU6ICdSb2JlcnQnLCBpZDogMH0sIHtuYW1lOiAnUm9iZXJ0JywgaWQ6IDF9XVxuICAgICAgICAgKiAgICAgIC8vICAgIENocmlzOiBbe25hbWU6ICdDaHJpcycsIGlkOiAyfV1cbiAgICAgICAgICogICAgICAvLyB9XG4gICAgICAgICAqL1xuICAgICAgICBDb2xsZWN0aW9uLnByb3RvdHlwZS5ncm91cEJ5ID0gZnVuY3Rpb24gKHByb3BlcnR5TmFtZSkge1xuICAgICAgICAgICAgdmFyIG1vZGVsO1xuICAgICAgICAgICAgdmFyIGdyb3VwTmFtZTtcbiAgICAgICAgICAgIHZhciBncm91cExpc3QgPSB7fTtcbiAgICAgICAgICAgIC8vIExvb3AgdGhyb3VnaCBhbGwgdGhlIG1vZGVscyBpbiB0aGlzIGNvbGxlY3Rpb24uXG4gICAgICAgICAgICBmb3IgKHZhciBpXzggPSAwOyBpXzggPCB0aGlzLmxlbmd0aDsgaV84KyspIHtcbiAgICAgICAgICAgICAgICBtb2RlbCA9IHRoaXMubW9kZWxzW2lfOF07XG4gICAgICAgICAgICAgICAgLy8gR2V0IHRoZSB2YWx1ZSBmcm9tIHRoZSBwcm9wZXJ0eSBuYW1lIHBhc3NlZCBpbiBhbmQgdXNlcyB0aGF0IGFzIHRoZSBncm91cCBuYW1lLlxuICAgICAgICAgICAgICAgIGdyb3VwTmFtZSA9IG1vZGVsW3Byb3BlcnR5TmFtZV07XG4gICAgICAgICAgICAgICAgaWYgKGdyb3VwTGlzdFtncm91cE5hbWVdID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgZ3JvdXBMaXN0W2dyb3VwTmFtZV0gPSBbXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZ3JvdXBMaXN0W2dyb3VwTmFtZV0ucHVzaChtb2RlbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gZ3JvdXBMaXN0O1xuICAgICAgICB9O1xuICAgICAgICAvKipcbiAgICAgICAgICogQ2hhbmdlcyB0aGUgb3JkZXIgb2YgdGhlIG1vZGVscyBzbyB0aGF0IHRoZSBsYXN0IG1vZGVsIGJlY29tZXMgdGhlIGZpcnN0IG1vZGVsLCB0aGUgcGVudWx0aW1hdGUgbW9kZWwgYmVjb21lcyB0aGUgc2Vjb25kLCBhbmQgc28gb24uXG4gICAgICAgICAqXG4gICAgICAgICAqIEBtZXRob2QgcmV2ZXJzZVxuICAgICAgICAgKiBAcHVibGljXG4gICAgICAgICAqIEByZXR1cm4ge0FycmF5Ljxhbnk+fSBSZXR1cm5zIHRoZSBsaXN0IG9mIG1vZGVscyBpbiB0aGUgY29sbGVjdGlvbi5cbiAgICAgICAgICogQGV4YW1wbGVcbiAgICAgICAgICogICAgICBjb2xsZWN0aW9uLnJldmVyc2UoKTtcbiAgICAgICAgICovXG4gICAgICAgIENvbGxlY3Rpb24ucHJvdG90eXBlLnJldmVyc2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5tb2RlbHMucmV2ZXJzZSgpO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gQ29sbGVjdGlvbjtcbiAgICB9KShFdmVudERpc3BhdGNoZXJfMS5kZWZhdWx0KTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG4gICAgZXhwb3J0cy5kZWZhdWx0ID0gQ29sbGVjdGlvbjtcbn0pO1xuIiwiKGZ1bmN0aW9uIChmYWN0b3J5KSB7XG4gICAgaWYgKHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUuZXhwb3J0cyA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgdmFyIHYgPSBmYWN0b3J5KHJlcXVpcmUsIGV4cG9ydHMpOyBpZiAodiAhPT0gdW5kZWZpbmVkKSBtb2R1bGUuZXhwb3J0cyA9IHY7XG4gICAgfVxuICAgIGVsc2UgaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkge1xuICAgICAgICBkZWZpbmUoW1wicmVxdWlyZVwiLCBcImV4cG9ydHNcIiwgJ2pxdWVyeSddLCBmYWN0b3J5KTtcbiAgICB9XG59KShmdW5jdGlvbiAocmVxdWlyZSwgZXhwb3J0cykge1xuICAgIHZhciAkID0gcmVxdWlyZSgnanF1ZXJ5Jyk7XG4gICAgdmFyICRldmVudExpc3RlbmVyID0gJDtcbiAgICAvKipcbiAgICAgKiBBIGJpbmQgcG9seWZpbGwgZm9yIGJyb3dzZXJzIHRoYXQgZG9uJ3Qgc3VwcG9ydCB0aGUgYmluZCBtZXRob2QuXG4gICAgICovXG4gICAgaWYgKCFGdW5jdGlvbi5wcm90b3R5cGUuYmluZCkge1xuICAgICAgICBGdW5jdGlvbi5wcm90b3R5cGUuYmluZCA9IGZ1bmN0aW9uIChvVGhpcykge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiB0aGlzICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgLy8gY2xvc2VzdCB0aGluZyBwb3NzaWJsZSB0byB0aGUgRUNNQVNjcmlwdCA1IGludGVybmFsIElzQ2FsbGFibGUgZnVuY3Rpb25cbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdGdW5jdGlvbi5wcm90b3R5cGUuYmluZCAtIHdoYXQgaXMgdHJ5aW5nIHRvIGJlIGJvdW5kIGlzIG5vdCBjYWxsYWJsZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIGFBcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKSwgZlRvQmluZCA9IHRoaXMsIGZOT1AgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB9LCBmQm91bmQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZUb0JpbmQuYXBwbHkodGhpcyBpbnN0YW5jZW9mIGZOT1AgJiYgb1RoaXNcbiAgICAgICAgICAgICAgICAgICAgPyB0aGlzXG4gICAgICAgICAgICAgICAgICAgIDogb1RoaXMsIGFBcmdzLmNvbmNhdChBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMpKSk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgZk5PUC5wcm90b3R5cGUgPSB0aGlzLnByb3RvdHlwZTtcbiAgICAgICAgICAgIGZCb3VuZC5wcm90b3R5cGUgPSBuZXcgZk5PUCgpO1xuICAgICAgICAgICAgcmV0dXJuIGZCb3VuZDtcbiAgICAgICAgfTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogR2VuZXJhdGVzIGEgaGFzaCBzdHJpbmcgZnJvbSB0aGUgc3RyaW5nIGJlaW5nIHBhc3NlZCBpbi4gSW4gdGhpcyBjYXNlIGl0IGlzIGEgZnVuY3Rpb24gdGhhdCBpcyBjYXN0ZWQgYXMgc3RyaW5nIHZhbHVlLlxuICAgICAqXG4gICAgICogQHBhcmFtIHN0clxuICAgICAqIEByZXR1cm5zIHtTdHJpbmd9XG4gICAgICovXG4gICAgdmFyIGhhc2hDb2RlID0gZnVuY3Rpb24gKHN0cikge1xuICAgICAgICBzdHIgPSBTdHJpbmcoc3RyKTtcbiAgICAgICAgLy8gaHR0cDovL2VybHljb2Rlci5jb20vNDkvamF2YXNjcmlwdC1oYXNoLWZ1bmN0aW9ucy10by1jb252ZXJ0LXN0cmluZy1pbnRvLWludGVnZXItaGFzaC1cbiAgICAgICAgdmFyIGNoYXJhY3RlcjtcbiAgICAgICAgdmFyIGhhc2ggPSBudWxsO1xuICAgICAgICB2YXIgc3RyTGVuZ3RoID0gc3RyLmxlbmd0aDtcbiAgICAgICAgaWYgKHN0ckxlbmd0aCA9PSAwKVxuICAgICAgICAgICAgcmV0dXJuIGhhc2g7XG4gICAgICAgIGZvciAodmFyIGlfMSA9IDA7IGlfMSA8IHN0ckxlbmd0aDsgaV8xKyspIHtcbiAgICAgICAgICAgIGNoYXJhY3RlciA9IHN0ci5jaGFyQ29kZUF0KGlfMSk7XG4gICAgICAgICAgICBoYXNoID0gKChoYXNoIDw8IDUpIC0gaGFzaCkgKyBjaGFyYWN0ZXI7XG4gICAgICAgICAgICBoYXNoID0gaGFzaCAmIGhhc2g7IC8vIENvbnZlcnQgdG8gMzJiaXQgaW50ZWdlclxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBTdHJpbmcoTWF0aC5hYnMoaGFzaCkpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogVGhlIGpRdWVyeSBhZGRFdmVudExpc3RlbmVyIHBsdWdpblxuICAgICAqL1xuICAgICRldmVudExpc3RlbmVyLmZuLmFkZEV2ZW50TGlzdGVuZXIgPSBmdW5jdGlvbiAodHlwZSwgc2VsZWN0b3IsIGRhdGEsIGNhbGxiYWNrLCBzY29wZSkge1xuICAgICAgICB2YXIgX2NhbGxiYWNrO1xuICAgICAgICB2YXIgX3Njb3BlO1xuICAgICAgICB2YXIgX2hhbmRsZXI7XG4gICAgICAgIHN3aXRjaCAoYXJndW1lbnRzLmxlbmd0aCkge1xuICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICAgIF9jYWxsYmFjayA9IHNlbGVjdG9yO1xuICAgICAgICAgICAgICAgIF9zY29wZSA9IGRhdGE7XG4gICAgICAgICAgICAgICAgX3Njb3BlLl9oYW5kbGVyTWFwID0gX3Njb3BlLl9oYW5kbGVyTWFwIHx8IHt9O1xuICAgICAgICAgICAgICAgIF9oYW5kbGVyID0gX3Njb3BlLl9oYW5kbGVyTWFwW2hhc2hDb2RlKF9jYWxsYmFjayldID0gX2NhbGxiYWNrLmJpbmQoX3Njb3BlKTtcbiAgICAgICAgICAgICAgICB0aGlzLm9uKHR5cGUsIF9oYW5kbGVyKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgNDpcbiAgICAgICAgICAgICAgICBfY2FsbGJhY2sgPSBkYXRhO1xuICAgICAgICAgICAgICAgIF9zY29wZSA9IGNhbGxiYWNrO1xuICAgICAgICAgICAgICAgIF9zY29wZS5faGFuZGxlck1hcCA9IF9zY29wZS5faGFuZGxlck1hcCB8fCB7fTtcbiAgICAgICAgICAgICAgICBfaGFuZGxlciA9IF9zY29wZS5faGFuZGxlck1hcFtoYXNoQ29kZShfY2FsbGJhY2spXSA9IF9jYWxsYmFjay5iaW5kKF9zY29wZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5vbih0eXBlLCBzZWxlY3RvciwgX2hhbmRsZXIpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSA1OlxuICAgICAgICAgICAgICAgIF9jYWxsYmFjayA9IGNhbGxiYWNrO1xuICAgICAgICAgICAgICAgIF9zY29wZSA9IHNjb3BlO1xuICAgICAgICAgICAgICAgIF9zY29wZS5faGFuZGxlck1hcCA9IF9zY29wZS5faGFuZGxlck1hcCB8fCB7fTtcbiAgICAgICAgICAgICAgICBfaGFuZGxlciA9IF9zY29wZS5faGFuZGxlck1hcFtoYXNoQ29kZShfY2FsbGJhY2spXSA9IF9jYWxsYmFjay5iaW5kKF9zY29wZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5vbih0eXBlLCBzZWxlY3RvciwgZGF0YSwgX2hhbmRsZXIpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2pRdWVyeSBhZGRFdmVudExpc3RlbmVyIHBsdWdpbiByZXF1aXJlcyBhdCBsZWFzdCAzIGFyZ3VtZW50cy4nKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFRoZSBqUXVlcnkgcmVtb3ZlRXZlbnRMaXN0ZW5lciBwbHVnaW5cbiAgICAgKi9cbiAgICAkZXZlbnRMaXN0ZW5lci5mbi5yZW1vdmVFdmVudExpc3RlbmVyID0gZnVuY3Rpb24gKHR5cGUsIHNlbGVjdG9yLCBjYWxsYmFjaywgc2NvcGUpIHtcbiAgICAgICAgdmFyIF9jYWxsYmFjaztcbiAgICAgICAgdmFyIF9zY29wZTtcbiAgICAgICAgdmFyIF9oYW5kbGVyO1xuICAgICAgICBzd2l0Y2ggKGFyZ3VtZW50cy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgICAgICBfY2FsbGJhY2sgPSBzZWxlY3RvcjtcbiAgICAgICAgICAgICAgICBfc2NvcGUgPSBjYWxsYmFjaztcbiAgICAgICAgICAgICAgICBfc2NvcGUuX2hhbmRsZXJNYXAgPSBfc2NvcGUuX2hhbmRsZXJNYXAgfHwge307XG4gICAgICAgICAgICAgICAgX2hhbmRsZXIgPSBfc2NvcGUuX2hhbmRsZXJNYXBbaGFzaENvZGUoX2NhbGxiYWNrKV07XG4gICAgICAgICAgICAgICAgdGhpcy5vZmYodHlwZSwgX2hhbmRsZXIpO1xuICAgICAgICAgICAgICAgIF9zY29wZS5faGFuZGxlck1hcFtoYXNoQ29kZShfY2FsbGJhY2spXSA9IG51bGw7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDQ6XG4gICAgICAgICAgICAgICAgX2NhbGxiYWNrID0gY2FsbGJhY2s7XG4gICAgICAgICAgICAgICAgX3Njb3BlID0gc2NvcGU7XG4gICAgICAgICAgICAgICAgX3Njb3BlLl9oYW5kbGVyTWFwID0gX3Njb3BlLl9oYW5kbGVyTWFwIHx8IHt9O1xuICAgICAgICAgICAgICAgIF9oYW5kbGVyID0gX3Njb3BlLl9oYW5kbGVyTWFwW2hhc2hDb2RlKF9jYWxsYmFjayldO1xuICAgICAgICAgICAgICAgIHRoaXMub2ZmKHR5cGUsIHNlbGVjdG9yLCBfaGFuZGxlcik7XG4gICAgICAgICAgICAgICAgX3Njb3BlLl9oYW5kbGVyTWFwW2hhc2hDb2RlKF9jYWxsYmFjayldID0gbnVsbDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdqUXVlcnkgcmVtb3ZlRXZlbnRMaXN0ZW5lciBwbHVnaW4gcmVxdWlyZXMgYXQgbGVhc3QgMyBhcmd1bWVudHMuJyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG4gICAgZXhwb3J0cy5kZWZhdWx0ID0gJGV2ZW50TGlzdGVuZXI7XG59KTtcbiIsIihmdW5jdGlvbiAoZmFjdG9yeSkge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlLmV4cG9ydHMgPT09ICdvYmplY3QnKSB7XG4gICAgICAgIHZhciB2ID0gZmFjdG9yeShyZXF1aXJlLCBleHBvcnRzKTsgaWYgKHYgIT09IHVuZGVmaW5lZCkgbW9kdWxlLmV4cG9ydHMgPSB2O1xuICAgIH1cbiAgICBlbHNlIGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHtcbiAgICAgICAgZGVmaW5lKFtcInJlcXVpcmVcIiwgXCJleHBvcnRzXCIsICcuLi91dGlsL1V0aWwnXSwgZmFjdG9yeSk7XG4gICAgfVxufSkoZnVuY3Rpb24gKHJlcXVpcmUsIGV4cG9ydHMpIHtcbiAgICB2YXIgVXRpbF8xID0gcmVxdWlyZSgnLi4vdXRpbC9VdGlsJyk7XG4gICAgLyoqXG4gICAgICogQSBoZWxwZXIgY2xhc3MgdG8gY3JlYXRlIG11bHRpcGxlIGluc3RhbmNlcyBvZiB0aGUgc2FtZSBDb21wb25lbnQgQ2xhc3MgZnJvbSBqUXVlcnkgb2JqZWN0IHRoYXQgaGFzIG9uZSBvciBtb3JlIGVsZW1lbnRzIGluIGl0LlxuICAgICAqXG4gICAgICogQGNsYXNzIENvbXBvbmVudEZhY3RvcnlcbiAgICAgKiBAbW9kdWxlIFN0cnVjdHVyZUpTXG4gICAgICogQHN1Ym1vZHVsZSB1dGlsXG4gICAgICogQGF1dGhvciBSb2JlcnQgUy4gKHd3dy5jb2RlQmVsdC5jb20pXG4gICAgICogQHN0YXRpY1xuICAgICAqL1xuICAgIHZhciBDb21wb25lbnRGYWN0b3J5ID0gKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZnVuY3Rpb24gQ29tcG9uZW50RmFjdG9yeSgpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignW0NvbXBvbmVudEZhY3RvcnldIERvIG5vdCBpbnN0YW50aWF0ZSB0aGUgQ29tcG9uZW50RmFjdG9yeSBjbGFzcyBiZWNhdXNlIGl0IGlzIGEgc3RhdGljIGNsYXNzLicpO1xuICAgICAgICB9XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUYWtlcyBhIGpRdWVyeSBvYmplY3QgdGhhdCBoYXMgb25lIG9yIG1vcmUgZWxlbWVudHMgaW4gaXQgYW5kIHBhc3NlcyBhIHNpbmdsZSBqUXVlcnkgZWxlbWVudCBpbnRvIHRoZSBjb25zdHJ1Y3RvciBvZiB0aGUgY2xhc3MgdGhhdCBpcyBhbHNvIGJlaW5nIHBhc3NlZCBpbi5cbiAgICAgICAgICpcbiAgICAgICAgICogQG1ldGhvZCBjcmVhdGVcbiAgICAgICAgICogQHBhcmFtICRlbGVtZW50IHtqUXVlcnl9IE9uZSBvciBtb3JlIGpRdWVyeSByZWZlcmVuY2VkIERPTSBlbGVtZW50cy5cbiAgICAgICAgICogQHBhcmFtIENvbXBvbmVudENsYXNzIHthbnl9IFRoZSBjbGFzcyB0aGF0IHlvdSB3YW50IGluc3RhbnRpYXRlZC5cbiAgICAgICAgICogQHBhcmFtIFtzY29wZT1udWxsXSB7RGlzcGxheU9iamVjdENvbnRhaW5lcn0gVGhpcyBzY29wZSAocGFyZW50IG9iamVjdCkgaXMgbmVlZGVkIHRvIGluc3RhbnRpYXRlIHRoZSBjb21wb25lbnQvdmlldyB3aXRoIHRoZSB1c2Ugb2YgdGhlIHt7I2Nyb3NzTGluayBcIkRpc3BsYXlPYmplY3RDb250YWluZXIvYWRkQ2hpbGQ6bWV0aG9kXCJ9fXt7L2Nyb3NzTGlua319IG1ldGhvZC5cbiAgICAgICAgICogQHJldHVybiB7QXJyYXkuPGFueT59IFJldHVybnMgYSBsaXN0IG9mIGluc3RhbnRpYXRlZCBjb21wb25lbnRzL3ZpZXdzIHNvIHlvdSBjYW4gbWFuYWdlIHRoZW0gd2l0aGluIHRoZSBDbGFzcyB0aGF0IGNyZWF0ZWQgdGhlbS5cbiAgICAgICAgICogQHB1YmxpY1xuICAgICAgICAgKiBAc3RhdGljXG4gICAgICAgICAqIEBleGFtcGxlXG4gICAgICAgICAqICAgICAgQ29tcG9uZW50RmFjdG9yeS5jcmVhdGUoJCgnLmpzLWxpc3QnKSwgU29tZUNsYXNzLCB0aGlzKTtcbiAgICAgICAgICovXG4gICAgICAgIENvbXBvbmVudEZhY3RvcnkuY3JlYXRlID0gZnVuY3Rpb24gKCRlbGVtZW50cywgQ29tcG9uZW50Q2xhc3MsIHNjb3BlKSB7XG4gICAgICAgICAgICBpZiAoc2NvcGUgPT09IHZvaWQgMCkgeyBzY29wZSA9IG51bGw7IH1cbiAgICAgICAgICAgIHZhciBsaXN0ID0gW107XG4gICAgICAgICAgICB2YXIgY29tcG9uZW50O1xuICAgICAgICAgICAgdmFyICRlbGVtZW50O1xuICAgICAgICAgICAgdmFyIGxlbmd0aCA9ICRlbGVtZW50cy5sZW5ndGg7XG4gICAgICAgICAgICB2YXIgdHlwZXM7XG4gICAgICAgICAgICB2YXIgY29tcG9uZW50TmFtZTtcbiAgICAgICAgICAgIGZvciAodmFyIGlfMSA9IDA7IGlfMSA8IGxlbmd0aDsgaV8xKyspIHtcbiAgICAgICAgICAgICAgICAkZWxlbWVudCA9ICRlbGVtZW50cy5lcShpXzEpO1xuICAgICAgICAgICAgICAgIHR5cGVzID0gJGVsZW1lbnQuYXR0cignZGF0YS1zanMtdHlwZScpO1xuICAgICAgICAgICAgICAgIGlmICh0eXBlcyA9PT0gdm9pZCAwKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIENyZWF0ZSB0aGUgY29tcG9uZW50IGlmIHRoZXJlIGlzIG5vdCBhICdkYXRhLXNqcy10eXBlJyBhdHRyaWJ1dGUgb24gdGhlIGVsZW1lbnQuXG4gICAgICAgICAgICAgICAgICAgIGNvbXBvbmVudCA9IENvbXBvbmVudEZhY3RvcnkuX2NyZWF0ZUNvbXBvbmVudCgkZWxlbWVudCwgQ29tcG9uZW50Q2xhc3MsIHNjb3BlKTtcbiAgICAgICAgICAgICAgICAgICAgbGlzdC5wdXNoKGNvbXBvbmVudCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyBFbHNlIGlmIHRoZXJlIGlzIGFscmVhZHkgYSAnZGF0YS1zanMtdHlwZScgYXR0cmlidXRlIHRoZW4gZ2V0IHRoZSB0eXBlKHMpLlxuICAgICAgICAgICAgICAgICAgICB0eXBlcyA9IHR5cGVzLnNwbGl0KCcsJyk7XG4gICAgICAgICAgICAgICAgICAgIGNvbXBvbmVudE5hbWUgPSBVdGlsXzEuZGVmYXVsdC5nZXROYW1lKENvbXBvbmVudENsYXNzKTtcbiAgICAgICAgICAgICAgICAgICAgLy8gT25seSBjcmVhdGUgdGhlIGNvbXBvbmVudCBpZiB0aGUgY29tcG9uZW50IHR5cGUgZG9lcyBub3QgYWxyZWFkeSBleGlzdC5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVzLmluZGV4T2YoY29tcG9uZW50TmFtZSkgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb21wb25lbnQgPSBDb21wb25lbnRGYWN0b3J5Ll9jcmVhdGVDb21wb25lbnQoJGVsZW1lbnQsIENvbXBvbmVudENsYXNzLCBzY29wZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBsaXN0LnB1c2goY29tcG9uZW50KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBsaXN0O1xuICAgICAgICB9O1xuICAgICAgICAvKipcbiAgICAgICAgICogSGVscGVyIG1ldGhvZCB0byBjcmVhdGUgdGhlIGNvbXBvbmVudC5cbiAgICAgICAgICpcbiAgICAgICAgICogQG1ldGhvZCBfY3JlYXRlQ29tcG9uZW50XG4gICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICAqL1xuICAgICAgICBDb21wb25lbnRGYWN0b3J5Ll9jcmVhdGVDb21wb25lbnQgPSBmdW5jdGlvbiAoJGVsZW1lbnQsIENvbXBvbmVudENsYXNzLCBzY29wZSkge1xuICAgICAgICAgICAgdmFyIGNvbXBvbmVudCA9IG5ldyBDb21wb25lbnRDbGFzcygkZWxlbWVudCk7XG4gICAgICAgICAgICAvLyBJZiB0aGUgY2xhc3Mgb2JqZWN0IGhhcyB0aGUgc2pzSWQgcHJvcGVydHkgdGhlbiBJIGFtIGFzc3VtaW5nIGl0IGlzIGFuIGluc3RhbmNlIG9mIHRoZSBEaXNwbGF5T2JqZWN0IGNsYXNzLlxuICAgICAgICAgICAgaWYgKHNjb3BlICE9PSBudWxsICYmIGNvbXBvbmVudC5oYXNPd25Qcm9wZXJ0eSgnc2pzSWQnKSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIHNjb3BlLmFkZENoaWxkKGNvbXBvbmVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gY29tcG9uZW50O1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gQ29tcG9uZW50RmFjdG9yeTtcbiAgICB9KSgpO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbiAgICBleHBvcnRzLmRlZmF1bHQgPSBDb21wb25lbnRGYWN0b3J5O1xufSk7XG4iLCIoZnVuY3Rpb24gKGZhY3RvcnkpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZS5leHBvcnRzID09PSAnb2JqZWN0Jykge1xuICAgICAgICB2YXIgdiA9IGZhY3RvcnkocmVxdWlyZSwgZXhwb3J0cyk7IGlmICh2ICE9PSB1bmRlZmluZWQpIG1vZHVsZS5leHBvcnRzID0gdjtcbiAgICB9XG4gICAgZWxzZSBpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSB7XG4gICAgICAgIGRlZmluZShbXCJyZXF1aXJlXCIsIFwiZXhwb3J0c1wiXSwgZmFjdG9yeSk7XG4gICAgfVxufSkoZnVuY3Rpb24gKHJlcXVpcmUsIGV4cG9ydHMpIHtcbiAgICAvKipcbiAgICAgKiBUaGUgTnVtYmVyVXRpbCBjbGFzcyBoYXMgbWFueSBoZWxwZXIgbWV0aG9kcyB0byB3b3JrIHdpdGggbnVtYmVyIGRhdGEuXG4gICAgICpcbiAgICAgKiBAY2xhc3MgTnVtYmVyVXRpbFxuICAgICAqIEBtb2R1bGUgU3RydWN0dXJlSlNcbiAgICAgKiBAc3VibW9kdWxlIHV0aWxcbiAgICAgKiBAYXV0aG9yIFJvYmVydCBTLiAod3d3LmNvZGVCZWx0LmNvbSlcbiAgICAgKiBAc3RhdGljXG4gICAgICovXG4gICAgdmFyIE51bWJlclV0aWwgPSAoZnVuY3Rpb24gKCkge1xuICAgICAgICBmdW5jdGlvbiBOdW1iZXJVdGlsKCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdbTnVtYmVyVXRpbF0gRG8gbm90IGluc3RhbnRpYXRlIHRoZSBOdW1iZXJVdGlsIGNsYXNzIGJlY2F1c2UgaXQgaXMgYSBzdGF0aWMgY2xhc3MuJyk7XG4gICAgICAgIH1cbiAgICAgICAgLyoqXG4gICAgICAgICAqIENvbnZlcnRzIGJ5dGVzIGludG8gbWVnYWJ5dGVzLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAbWV0aG9kIGJ5dGVzVG9NZWdhYnl0ZXNcbiAgICAgICAgICogQHBhcmFtIGJ5dGVzIHtudW1iZXJ9XG4gICAgICAgICAqIEByZXR1cm5zIHtudW1iZXJ9XG4gICAgICAgICAqIEBwdWJsaWNcbiAgICAgICAgICogQHN0YXRpY1xuICAgICAgICAgKiBAZXhhbXBsZVxuICAgICAgICAgKlxuICAgICAgICAgKi9cbiAgICAgICAgTnVtYmVyVXRpbC5ieXRlc1RvTWVnYWJ5dGVzID0gZnVuY3Rpb24gKGJ5dGVzKSB7XG4gICAgICAgICAgICByZXR1cm4gYnl0ZXMgLyAxMDQ4NTc2O1xuICAgICAgICB9O1xuICAgICAgICAvKipcbiAgICAgICAgICogQ29udmVydHMgY2VudGltZXRlcnMgaW50byBpbmNoZXMuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBtZXRob2QgY2VudGltZXRlclRvSW5jaFxuICAgICAgICAgKiBAcGFyYW0gY20ge251bWJlcn1cbiAgICAgICAgICogQHB1YmxpY1xuICAgICAgICAgKiBAc3RhdGljXG4gICAgICAgICAqIEByZXR1cm5zIHtudW1iZXJ9XG4gICAgICAgICAqIEBleGFtcGxlXG4gICAgICAgICAqICAgICBOdW1iZXJVdGlsLmNlbnRpbWV0ZXJUb0luY2goMSk7XG4gICAgICAgICAqICAgICAvLyAwLjM5MzdcbiAgICAgICAgICovXG4gICAgICAgIE51bWJlclV0aWwuY2VudGltZXRlclRvSW5jaCA9IGZ1bmN0aW9uIChjbSkge1xuICAgICAgICAgICAgcmV0dXJuIGNtICogMC4zOTM3MDtcbiAgICAgICAgfTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIENvbnZlcnRzIGluY2hlcyBpbnRvIGNlbnRpbWV0ZXJzLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAbWV0aG9kIGluY2hUb0NlbnRpbWV0ZXJcbiAgICAgICAgICogQHBhcmFtIGluY2gge251bWJlcn1cbiAgICAgICAgICogQHB1YmxpY1xuICAgICAgICAgKiBAc3RhdGljXG4gICAgICAgICAqIEByZXR1cm5zIHtudW1iZXJ9XG4gICAgICAgICAqIEBleGFtcGxlXG4gICAgICAgICAqICAgICBOdW1iZXJVdGlsLmluY2hUb0NlbnRpbWV0ZXIoMSk7XG4gICAgICAgICAqICAgICAvLyAyLjU0XG4gICAgICAgICAqL1xuICAgICAgICBOdW1iZXJVdGlsLmluY2hUb0NlbnRpbWV0ZXIgPSBmdW5jdGlvbiAoaW5jaCkge1xuICAgICAgICAgICAgcmV0dXJuIGluY2ggKiAyLjU0O1xuICAgICAgICB9O1xuICAgICAgICAvKipcbiAgICAgICAgICogQ29udmVydHMgZmVldCBpbnRvIG1ldGVycy5cbiAgICAgICAgICpcbiAgICAgICAgICogQG1ldGhvZCBmZWV0VG9NZXRlclxuICAgICAgICAgKiBAcGFyYW0gZmVldCB7bnVtYmVyfVxuICAgICAgICAgKiBAcHVibGljXG4gICAgICAgICAqIEBzdGF0aWNcbiAgICAgICAgICogQHJldHVybnMge251bWJlcn1cbiAgICAgICAgICogQGV4YW1wbGVcbiAgICAgICAgICogICAgIE51bWJlclV0aWwuZmVldFRvTWV0ZXIoMSk7XG4gICAgICAgICAqICAgICAvLyAwLjMwNDhcbiAgICAgICAgICpcbiAgICAgICAgICovXG4gICAgICAgIE51bWJlclV0aWwuZmVldFRvTWV0ZXIgPSBmdW5jdGlvbiAoZmVldCkge1xuICAgICAgICAgICAgcmV0dXJuIGZlZXQgLyAzLjI4MDg7XG4gICAgICAgIH07XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDb252ZXJ0cyBzZWNvbmRzIGludG8gaG91ciwgbWludXRlcywgc2Vjb25kcy5cbiAgICAgICAgICpcbiAgICAgICAgICogQG1ldGhvZCBjb252ZXJ0VG9ISE1NU1NcbiAgICAgICAgICogQHBhcmFtIHNlY29uZHMge251bWJlcn1cbiAgICAgICAgICogQHBhcmFtIHNob3dIb3VycyBbYm9vbGVhbj10cnVlXSBCeSBkZWZhdWx0IGlmIHRoZSB0aW1lIGRvZXMgbm90IHBhc3Mgb25lIGhvdXIgaXQgd2lsbCBzaG93IDAwOjA1OjM0LiBQYXNzIGZhbHNlIHRvIGRpc3BsYXkgdGhlIHRpbWUgYXMgMDU6MzQgdW50aWwgaXQgZ2V0cyBwYXNzIG9uZSBob3VyIGFuZCB0aGVuIGl0IHdpbGwgc2hvdyAwMTowMDowMFxuICAgICAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxuICAgICAgICAgKiBAcHVibGljXG4gICAgICAgICAqIEBzdGF0aWNcbiAgICAgICAgICogQGV4YW1wbGVcbiAgICAgICAgICogICAgIE51bWJlclV0aWwuY29udmVydFRvSEhNTVNTKDMzMzMzKTtcbiAgICAgICAgICogICAgIC8vICcwOToxNTozMydcbiAgICAgICAgICovXG4gICAgICAgIE51bWJlclV0aWwuY29udmVydFRvSEhNTVNTID0gZnVuY3Rpb24gKHNlY29uZHMsIHNob3dIb3Vycykge1xuICAgICAgICAgICAgaWYgKHNob3dIb3VycyA9PT0gdm9pZCAwKSB7IHNob3dIb3VycyA9IHRydWU7IH1cbiAgICAgICAgICAgIHZhciBzZWMgPSBpc05hTihzZWNvbmRzKSA/IDAgOiBzZWNvbmRzOyAvL0NoYW5nZXMgTmFOIHRvIDBcbiAgICAgICAgICAgIHZhciBzID0gc2VjICUgNjA7XG4gICAgICAgICAgICB2YXIgbSA9IE1hdGguZmxvb3IoKHNlYyAlIDM2MDApIC8gNjApO1xuICAgICAgICAgICAgdmFyIGggPSBNYXRoLmZsb29yKHNlYyAvICg2MCAqIDYwKSk7XG4gICAgICAgICAgICB2YXIgaG91clN0cjtcbiAgICAgICAgICAgIGlmIChzaG93SG91cnMgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgaG91clN0ciA9IChoID09IDApID8gJycgOiBOdW1iZXJVdGlsLmRvdWJsZURpZ2l0Rm9ybWF0KGgpICsgJzonO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgaG91clN0ciA9IE51bWJlclV0aWwuZG91YmxlRGlnaXRGb3JtYXQoaCkgKyAnOic7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgbWludXRlU3RyID0gTnVtYmVyVXRpbC5kb3VibGVEaWdpdEZvcm1hdChtKSArICc6JztcbiAgICAgICAgICAgIHZhciBzZWNvbmRzU3RyID0gTnVtYmVyVXRpbC5kb3VibGVEaWdpdEZvcm1hdChzKTtcbiAgICAgICAgICAgIHJldHVybiBob3VyU3RyICsgbWludXRlU3RyICsgc2Vjb25kc1N0cjtcbiAgICAgICAgfTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEZvcm1hdHMgYSBudW1iZXIgZnJvbSAwLTkgdG8gZGlzcGxheSB3aXRoIDIgZGlnaXRzLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAbWV0aG9kIGRvdWJsZURpZ2l0Rm9ybWF0XG4gICAgICAgICAqIEBwYXJhbSBudW0ge251bWJlcn1cbiAgICAgICAgICogQHJldHVybnMge3N0cmluZ31cbiAgICAgICAgICogQHB1YmxpY1xuICAgICAgICAgKiBAc3RhdGljXG4gICAgICAgICAqIEBleGFtcGxlXG4gICAgICAgICAqICAgICBOdW1iZXJVdGlsLmRvdWJsZURpZ2l0Rm9ybWF0KDApO1xuICAgICAgICAgKiAgICAgLy8gJzAwJ1xuICAgICAgICAgKlxuICAgICAgICAgKiAgICAgTnVtYmVyVXRpbC5kb3VibGVEaWdpdEZvcm1hdCg1KTtcbiAgICAgICAgICogICAgIC8vICcwNSdcbiAgICAgICAgICpcbiAgICAgICAgICogICAgIE51bWJlclV0aWwuZG91YmxlRGlnaXRGb3JtYXQoOSk7XG4gICAgICAgICAqICAgICAvLyAnMDknXG4gICAgICAgICAqL1xuICAgICAgICBOdW1iZXJVdGlsLmRvdWJsZURpZ2l0Rm9ybWF0ID0gZnVuY3Rpb24gKG51bSkge1xuICAgICAgICAgICAgaWYgKG51bSA8IDEwKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICgnMCcgKyBudW0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIFN0cmluZyhudW0pO1xuICAgICAgICB9O1xuICAgICAgICAvKipcbiAgICAgICAgICogRm9ybWF0cyBhIGN1cnJlbmN5IHN0cmluZyBhcyBhIG51bWJlci5cbiAgICAgICAgICpcbiAgICAgICAgICogQG1ldGhvZCB1bmZvcm1hdFVuaXRcbiAgICAgICAgICogQHBhcmFtIHZhbHVlIHtzdHJpbmd9IFRoZSBzdHJpbmcgY3VycmVuY3kgdGhhdCB5b3Ugd2FudCBjb252ZXJ0ZWQgaW50byBhIG51bWJlci5cbiAgICAgICAgICogQHJldHVybnMge251bWJlcn0gUmV0dXJucyB0aGUgbnVtYmVyIHZhbHVlIG9mIHRoZSBjdXJyZW5jeSBzdHJpbmcuXG4gICAgICAgICAqIEBwdWJsaWNcbiAgICAgICAgICogQHN0YXRpY1xuICAgICAgICAgKiBAZXhhbXBsZVxuICAgICAgICAgKiAgICAgTnVtYmVyVXRpbC51bmZvcm1hdFVuaXQoJyQxLDIzNCw1NjcuODknKTtcbiAgICAgICAgICogICAgIC8vIDEyMzQ1NjcuODlcbiAgICAgICAgICpcbiAgICAgICAgICogICAgIE51bWJlclV0aWwudW5mb3JtYXRVbml0KCcxLjIzNC41NjcsODkg4oKsJyk7XG4gICAgICAgICAqICAgICAvLyAxMjM0NTY3Ljg5XG4gICAgICAgICAqXG4gICAgICAgICAqICAgICBOdW1iZXJVdGlsLnVuZm9ybWF0VW5pdCgnJC0xMjMsNDU2LDc4OS45OScpO1xuICAgICAgICAgKiAgICAgLy8gLTEyMzQ1Njc4OS45OVxuICAgICAgICAgKi9cbiAgICAgICAgTnVtYmVyVXRpbC51bmZvcm1hdFVuaXQgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgIC8vIFJlbW92ZXMgYWxsIGNoYXJhY3RlcnMgYW5kIHNwYWNlcyBleGNlcHQgdGhlIHBlcmlvZCAoLiksIGNvbW1hICgsKSBhbmQgdGhlIG5lZ2F0aXZlIHN5bWJvbCAoLSkuXG4gICAgICAgICAgICB2YXIgd2l0aG91dFNwZWNpYWxDaGFyYWN0ZXJzID0gdmFsdWUucmVwbGFjZSgvW15cXGQuLC1dL2csICcnKTtcbiAgICAgICAgICAgIC8vIEdldHMgdGhlIGluZGV4IHdoZXJlIHRoZSBkZWNpbWFsIHBsYWNlbWVudCBpcyBsb2NhdGVkLlxuICAgICAgICAgICAgdmFyIGRlY2ltYWxJbmRleCA9IHdpdGhvdXRTcGVjaWFsQ2hhcmFjdGVycy5sZW5ndGggLSAzO1xuICAgICAgICAgICAgdmFyIGRlY2ltYWxTZXBhcmF0b3IgPSB3aXRob3V0U3BlY2lhbENoYXJhY3RlcnMuY2hhckF0KGRlY2ltYWxJbmRleCk7XG4gICAgICAgICAgICBpZiAoZGVjaW1hbFNlcGFyYXRvciA9PT0gJy4nKSB7XG4gICAgICAgICAgICAgICAgLy8gUmVtb3ZlcyBhbGwgY29tbWEgKCwpIGNoYXJhY3RlcnMgYW5kIGxlYXZlcyB0aGUgcGVyaW9kICguKSBhbmQgdGhlIG5lZ2F0aXZlIHN5bWJvbCAoLSkuXG4gICAgICAgICAgICAgICAgd2l0aG91dFNwZWNpYWxDaGFyYWN0ZXJzID0gdmFsdWUucmVwbGFjZSgvW15cXGQuLV0vZywgJycpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gUmVtb3ZlcyBhbGwgcGVyaW9kICguKSBjaGFyYWN0ZXJzIGFuZCBsZWF2ZXMgdGhlIGNvbW1hICgsKSBhbmQgdGhlIG5lZ2F0aXZlIHN5bWJvbCAoLSkuXG4gICAgICAgICAgICAgICAgd2l0aG91dFNwZWNpYWxDaGFyYWN0ZXJzID0gdmFsdWUucmVwbGFjZSgvW15cXGQsLV0vZywgJycpO1xuICAgICAgICAgICAgICAgIGRlY2ltYWxJbmRleCA9IHdpdGhvdXRTcGVjaWFsQ2hhcmFjdGVycy5sZW5ndGggLSAzO1xuICAgICAgICAgICAgICAgIC8vUmVwbGFjZXMgdGhlIGNvbW1hICgsKSB0byBhIHBlcmlvZCAoLikuXG4gICAgICAgICAgICAgICAgd2l0aG91dFNwZWNpYWxDaGFyYWN0ZXJzID0gd2l0aG91dFNwZWNpYWxDaGFyYWN0ZXJzLnJlcGxhY2UoJywnLCAnLicpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHBhcnNlRmxvYXQod2l0aG91dFNwZWNpYWxDaGFyYWN0ZXJzKTtcbiAgICAgICAgfTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEZvcm1hdHMgYSBudW1iZXIgYXMgYSBjdXJyZW5jeSBzdHJpbmcuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBtZXRob2QgZm9ybWF0VW5pdFxuICAgICAgICAgKiBAcGFyYW0gdmFsdWUge251bWJlcn0gVGhlIG51bWJlciB2YWx1ZSB5b3Ugd2FudCBmb3JtYXR0ZWQuXG4gICAgICAgICAqIEBwYXJhbSBbZGVjaW1hbFBsYWNlbWVudD0yXSB7bnVtYmVyfSBIb3cgbWFueSBkZWNpbWFsIHBsYWNlbWVudHMgeW91IHdhbnQgdG8gc2hvdy5cbiAgICAgICAgICogQHBhcmFtIFtkZWNpbWFsU2VwYXJhdG9yPScuJ10ge3N0cmluZ30gVGhlIGNoYXJhY3RlciB5b3Ugd2FudCB0byB1c2UgYXMgdGhlIHRob3VzYW5kcyBzZXBhcmF0b3IuXG4gICAgICAgICAqIEBwYXJhbSBbdGhvdXNhbmRzU2VwYXJhdG9yPScsJ10ge3N0cmluZ30gVGhlIGNoYXJhY3RlciB5b3Ugd2FudCB0byB1c2UgYXMgdGhlIHRob3VzYW5kcyBzZXBhcmF0b3IuXG4gICAgICAgICAqIEBwYXJhbSBbY3VycmVuY3lTeW1ib2w9JyddIHtzdHJpbmd9IFRoZSBzeW1ib2wgeW91IHdvdWxkIGxpa2UgdG8gYWRkLlxuICAgICAgICAgKiBAcGFyYW0gW2N1cnJlbmN5U3ltYm9sUGxhY2VtZW50PTBdIHtudW1iZXJ9IFRoZSBwbGFjZW1lbnQgb2YgdGhlIHN5bWJvbC4gVXNlIDAgdG8gcGxhY2UgaW4gZnJvbnQgb3IgMSB0byBwbGFjZSBhdCB0aGUgZW5kLlxuICAgICAgICAgKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSBmb3JtYXR0ZWQgY3VycmVuY3kuXG4gICAgICAgICAqIEBwdWJsaWNcbiAgICAgICAgICogQHN0YXRpY1xuICAgICAgICAgKiBAZXhhbXBsZVxuICAgICAgICAgKiAgICAgTnVtYmVyVXRpbC5mb3JtYXRVbml0KDEyMzQ1NjcuODksIDIsIFwiLlwiLCBcIixcIiwgXCIkXCIsIDApO1xuICAgICAgICAgKiAgICAgLy8gJyQxLDIzNCw1NjcuODknXG4gICAgICAgICAqXG4gICAgICAgICAqICAgICBOdW1iZXJVdGlsLmZvcm1hdFVuaXQoMTIzNDEyMzQuNTYsIDIsIFwiKlwiLCBcIixcIiwgXCIg4oKsXCIsIDEpO1xuICAgICAgICAgKiAgICAgLy8gJzEyLDM0MSwyMzQqNTYg4oKsJ1xuICAgICAgICAgKlxuICAgICAgICAgKiAgICAgTnVtYmVyVXRpbC5mb3JtYXRVbml0KC0xOTAwLjI0LCAxKTtcbiAgICAgICAgICogICAgIC8vICctMSw5MDAuMidcbiAgICAgICAgICovXG4gICAgICAgIE51bWJlclV0aWwuZm9ybWF0VW5pdCA9IGZ1bmN0aW9uICh2YWx1ZSwgZGVjaW1hbFBsYWNlbWVudCwgZGVjaW1hbFNlcGFyYXRvciwgdGhvdXNhbmRzU2VwYXJhdG9yLCBjdXJyZW5jeVN5bWJvbCwgY3VycmVuY3lTeW1ib2xQbGFjZW1lbnQpIHtcbiAgICAgICAgICAgIGlmIChkZWNpbWFsUGxhY2VtZW50ID09PSB2b2lkIDApIHsgZGVjaW1hbFBsYWNlbWVudCA9IDI7IH1cbiAgICAgICAgICAgIGlmIChkZWNpbWFsU2VwYXJhdG9yID09PSB2b2lkIDApIHsgZGVjaW1hbFNlcGFyYXRvciA9ICcuJzsgfVxuICAgICAgICAgICAgaWYgKHRob3VzYW5kc1NlcGFyYXRvciA9PT0gdm9pZCAwKSB7IHRob3VzYW5kc1NlcGFyYXRvciA9ICcsJzsgfVxuICAgICAgICAgICAgaWYgKGN1cnJlbmN5U3ltYm9sID09PSB2b2lkIDApIHsgY3VycmVuY3lTeW1ib2wgPSAnJzsgfVxuICAgICAgICAgICAgaWYgKGN1cnJlbmN5U3ltYm9sUGxhY2VtZW50ID09PSB2b2lkIDApIHsgY3VycmVuY3lTeW1ib2xQbGFjZW1lbnQgPSAwOyB9XG4gICAgICAgICAgICB2YXIgc3RyID0gU3RyaW5nKE51bWJlcih2YWx1ZSkudG9GaXhlZChkZWNpbWFsUGxhY2VtZW50KSk7XG4gICAgICAgICAgICB2YXIgcmVzdWx0ID0gJyc7XG4gICAgICAgICAgICBpZiAoZGVjaW1hbFBsYWNlbWVudCAhPSAwKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gc3RyLnNsaWNlKC0xIC0gZGVjaW1hbFBsYWNlbWVudCk7XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gcmVzdWx0LnJlcGxhY2UoJy4nLCBkZWNpbWFsU2VwYXJhdG9yKTtcbiAgICAgICAgICAgICAgICBzdHIgPSBzdHIuc2xpY2UoMCwgc3RyLmxlbmd0aCAtIDEgLSBkZWNpbWFsUGxhY2VtZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHdoaWxlIChzdHIubGVuZ3RoID4gMykge1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9IHRob3VzYW5kc1NlcGFyYXRvciArIHN0ci5zbGljZSgtMykgKyByZXN1bHQ7XG4gICAgICAgICAgICAgICAgc3RyID0gc3RyLnNsaWNlKDAsIHN0ci5sZW5ndGggLSAzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChzdHIubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIGlmIChjdXJyZW5jeVN5bWJvbFBsYWNlbWVudCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSBjdXJyZW5jeVN5bWJvbCArIHN0ciArIHJlc3VsdDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoY3VycmVuY3lTeW1ib2xQbGFjZW1lbnQgPT09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gc3RyICsgcmVzdWx0ICsgY3VycmVuY3lTeW1ib2w7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSBzdHIgKyByZXN1bHQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIENvbnZlcnQgRmFocmVuaGVpdCB0byBDZWxzaXVzLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAbWV0aG9kIGZhaHJlbmhlaXRUb0NlbHNpdXNcbiAgICAgICAgICogQHBhcmFtIGZhaHJlbmhlaXQge251bWJlcn0gVGhlIGZhaHJlbmhlaXQgdmFsdWUuXG4gICAgICAgICAqIEBwYXJhbSBkZWNpbWFscyB7bnVtYmVyfSBUaGUgbnVtYmVyIG9mIGRlY2ltYWxzLlxuICAgICAgICAgKiBAcmV0dXJuIHtudW1iZXJ9XG4gICAgICAgICAqIEBleGFtcGxlXG4gICAgICAgICAqICAgICAgTWF0aFV0aWwuZmFocmVuaGVpdFRvQ2Vsc2l1cygzMik7XG4gICAgICAgICAqICAgICAgLy8gMFxuICAgICAgICAgKlxuICAgICAgICAgKiAgICAgIE1hdGhVdGlsLmZhaHJlbmhlaXRUb0NlbHNpdXMoMjEyKTtcbiAgICAgICAgICogICAgICAvLyAxMDBcbiAgICAgICAgICovXG4gICAgICAgIE51bWJlclV0aWwuZmFocmVuaGVpdFRvQ2Vsc2l1cyA9IGZ1bmN0aW9uIChmYWhyZW5oZWl0LCBkZWNpbWFscykge1xuICAgICAgICAgICAgaWYgKGRlY2ltYWxzID09PSB2b2lkIDApIHsgZGVjaW1hbHMgPSAyOyB9XG4gICAgICAgICAgICB2YXIgZCA9ICcnO1xuICAgICAgICAgICAgdmFyIHIgPSAoNSAvIDkpICogKGZhaHJlbmhlaXQgLSAzMik7XG4gICAgICAgICAgICB2YXIgcyA9IHIudG9TdHJpbmcoKS5zcGxpdCgnLicpO1xuICAgICAgICAgICAgaWYgKHNbMV0gIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgZCA9IHNbMV0uc3Vic3RyKDAsIGRlY2ltYWxzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHZhciBpXzEgPSBkZWNpbWFscztcbiAgICAgICAgICAgICAgICB3aGlsZSAoaV8xID4gMCkge1xuICAgICAgICAgICAgICAgICAgICBkICs9ICcwJztcbiAgICAgICAgICAgICAgICAgICAgaV8xLS07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIGMgPSBzWzBdICsgJy4nICsgZDtcbiAgICAgICAgICAgIHJldHVybiBOdW1iZXIoYyk7XG4gICAgICAgIH07XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDb252ZXJ0IENlbHNpdXMgdG8gRmFocmVuaGVpdC5cbiAgICAgICAgICpcbiAgICAgICAgICogQG1ldGhvZCBjZWxzaXVzVG9GYWhyZW5oZWl0XG4gICAgICAgICAqIEBwYXJhbSBjZWxzaXVzIHtudW1iZXJ9IFRoZSBjZWxzaXVzIHZhbHVlLlxuICAgICAgICAgKiBAcGFyYW0gZGVjaW1hbHMge251bWJlcn0gVGhlIG51bWJlciBvZiBkZWNpbWFscy5cbiAgICAgICAgICogQHJldHVybiB7bnVtYmVyfVxuICAgICAgICAgKiBAZXhhbXBsZVxuICAgICAgICAgKiAgICAgIE1hdGhVdGlsLmNlbHNpdXNUb0ZhaHJlbmhlaXQoMCk7XG4gICAgICAgICAqICAgICAgLy8gMzJcbiAgICAgICAgICpcbiAgICAgICAgICogICAgICBNYXRoVXRpbC5jZWxzaXVzVG9GYWhyZW5oZWl0KDEwMCk7XG4gICAgICAgICAqICAgICAgLy8gMjEyXG4gICAgICAgICAqL1xuICAgICAgICBOdW1iZXJVdGlsLmNlbHNpdXNUb0ZhaHJlbmhlaXQgPSBmdW5jdGlvbiAoY2Vsc2l1cywgZGVjaW1hbHMpIHtcbiAgICAgICAgICAgIGlmIChkZWNpbWFscyA9PT0gdm9pZCAwKSB7IGRlY2ltYWxzID0gMjsgfVxuICAgICAgICAgICAgdmFyIGQgPSAnJztcbiAgICAgICAgICAgIHZhciByID0gKGNlbHNpdXMgLyAoNSAvIDkpKSArIDMyO1xuICAgICAgICAgICAgdmFyIHMgPSByLnRvU3RyaW5nKCkuc3BsaXQoJy4nKTtcbiAgICAgICAgICAgIGlmIChzWzFdICE9IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIGQgPSBzWzFdLnN1YnN0cigwLCBkZWNpbWFscyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB2YXIgaV8yID0gZGVjaW1hbHM7XG4gICAgICAgICAgICAgICAgd2hpbGUgKGlfMiA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgZCArPSAnMCc7XG4gICAgICAgICAgICAgICAgICAgIGlfMi0tO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBmID0gc1swXSArICcuJyArIGQ7XG4gICAgICAgICAgICByZXR1cm4gTnVtYmVyKGYpO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gTnVtYmVyVXRpbDtcbiAgICB9KSgpO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbiAgICBleHBvcnRzLmRlZmF1bHQgPSBOdW1iZXJVdGlsO1xufSk7XG4iLCIoZnVuY3Rpb24gKGZhY3RvcnkpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZS5leHBvcnRzID09PSAnb2JqZWN0Jykge1xuICAgICAgICB2YXIgdiA9IGZhY3RvcnkocmVxdWlyZSwgZXhwb3J0cyk7IGlmICh2ICE9PSB1bmRlZmluZWQpIG1vZHVsZS5leHBvcnRzID0gdjtcbiAgICB9XG4gICAgZWxzZSBpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSB7XG4gICAgICAgIGRlZmluZShbXCJyZXF1aXJlXCIsIFwiZXhwb3J0c1wiXSwgZmFjdG9yeSk7XG4gICAgfVxufSkoZnVuY3Rpb24gKHJlcXVpcmUsIGV4cG9ydHMpIHtcbiAgICAvKipcbiAgICAgKiBUaGUgU3RyaW5nVXRpbC4uLlxuICAgICAqXG4gICAgICogQGNsYXNzIFN0cmluZ1V0aWxcbiAgICAgKiBAbW9kdWxlIFN0cnVjdHVyZUpTXG4gICAgICogQHN1Ym1vZHVsZSB1dGlsXG4gICAgICogQGF1dGhvciBSb2JlcnQgUy4gKHd3dy5jb2RlQmVsdC5jb20pXG4gICAgICogQHN0YXRpY1xuICAgICAqL1xuICAgIHZhciBTdHJpbmdVdGlsID0gKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZnVuY3Rpb24gU3RyaW5nVXRpbCgpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignW1N0cmluZ1V0aWxdIERvIG5vdCBpbnN0YW50aWF0ZSB0aGUgU3RyaW5nVXRpbCBjbGFzcyBiZWNhdXNlIGl0IGlzIGEgc3RhdGljIGNsYXNzLicpO1xuICAgICAgICB9XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBHZXRzIHRoZSBleHRlbnNpb24gbmFtZSBvZmYgdGhlIHN0cmluZyBiZWluZyBwYXNzZWQgaW4uXG4gICAgICAgICAqXG4gICAgICAgICAqIEBtZXRob2QgZ2V0RXh0ZW5zaW9uXG4gICAgICAgICAqIEBwYXJhbSBmaWxlbmFtZSB7c3RyaW5nfVxuICAgICAgICAgKiBAcGFyYW0gd2l0aERvdCB7Ym9vbGVhbn0gSWYgeW91IHdhbnQgdGhlIHBlcmlvZCB0byBiZSBpbmNsdWRlZCBpbiB0aGUgZXh0ZW5zaW9uIG5hbWUuXG4gICAgICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XG4gICAgICAgICAqIEBwdWJsaWNcbiAgICAgICAgICogQHN0YXRpY1xuICAgICAgICAgKiBAZXhhbXBsZVxuICAgICAgICAgKiAgICAgIFN0cmluZ1V0aWwuZ2V0RXh0ZW5zaW9uKCdmaWxlLmV4ZScpO1xuICAgICAgICAgKiAgICAgIC8vICdleGUnXG4gICAgICAgICAqXG4gICAgICAgICAqICAgICAgU3RyaW5nVXRpbC5nZXRFeHRlbnNpb24oJ2ZpbGUuZXhlJywgdHJ1ZSk7XG4gICAgICAgICAqICAgICAgLy8gJy5leGUnXG4gICAgICAgICAqL1xuICAgICAgICBTdHJpbmdVdGlsLmdldEV4dGVuc2lvbiA9IGZ1bmN0aW9uIChmaWxlbmFtZSwgd2l0aERvdCkge1xuICAgICAgICAgICAgaWYgKHdpdGhEb3QgPT09IHZvaWQgMCkgeyB3aXRoRG90ID0gZmFsc2U7IH1cbiAgICAgICAgICAgIHZhciBudW0gPSAod2l0aERvdCA9PT0gdHJ1ZSkgPyAwIDogMTtcbiAgICAgICAgICAgIHJldHVybiBmaWxlbmFtZS5zbGljZShmaWxlbmFtZS5sYXN0SW5kZXhPZignLicpICsgbnVtLCBmaWxlbmFtZS5sZW5ndGgpO1xuICAgICAgICB9O1xuICAgICAgICAvKipcbiAgICAgICAgICogQ29udmVydHMgYSBzdHJpbmcgdG8gYSBzZW50ZW5jZSBjYXNlIHN0cmluZy5cbiAgICAgICAgICpcbiAgICAgICAgICogQG1ldGhvZCB0b1NlbnRlbmNlXG4gICAgICAgICAqIEBwYXJhbSBzdHIge3N0cmluZ31cbiAgICAgICAgICogQHBhcmFtIFtzZXBhcmF0b3JdIHtzdHJpbmd9IENhbiBiZSBhbnkgc3RyaW5nIHlvdSB3YW50IHRvIHVzZSBhcyBhIHNlcGFyYXRvci5cbiAgICAgICAgICogQHJldHVybnMge3N0cmluZ31cbiAgICAgICAgICogQHB1YmxpY1xuICAgICAgICAgKiBAc3RhdGljXG4gICAgICAgICAqIEBleGFtcGxlXG4gICAgICAgICAqICAgICAgU3RyaW5nVXRpbC50b1NlbnRlbmNlKFwibGl2ZURvd25fYnktdGhlLlJpdmVyXCIpO1xuICAgICAgICAgKiAgICAgIC8vICdsaXZlIGRvd24gYnkgdGhlIHJpdmVyJ1xuICAgICAgICAgKlxuICAgICAgICAgKiAgICAgIFN0cmluZ1V0aWwudG9TZW50ZW5jZShcImxpdmVEb3duX2J5LXRoZS5SaXZlclwiLCAnLScpO1xuICAgICAgICAgKiAgICAgIC8vICdsaXZlLWRvd24tYnktdGhlLXJpdmVyJ1xuICAgICAgICAgKlxuICAgICAgICAgKiAgICAgIFN0cmluZ1V0aWwudG9TZW50ZW5jZShcImxpdmVEb3duX2J5LXRoZS5SaXZlclwiLCAnXycpO1xuICAgICAgICAgKiAgICAgIC8vICdsaXZlX2Rvd25fYnlfdGhlX3JpdmVyJ1xuICAgICAgICAgKlxuICAgICAgICAgKiAgICAgIFN0cmluZ1V0aWwudG9TZW50ZW5jZShcImxpdmVEb3duX2J5LXRoZS5SaXZlclwiLCAnLycpO1xuICAgICAgICAgKiAgICAgIC8vICdsaXZlL2Rvd24vYnkvdGhlL3JpdmVyJ1xuICAgICAgICAgKi9cbiAgICAgICAgU3RyaW5nVXRpbC50b1NlbnRlbmNlID0gZnVuY3Rpb24gKHN0ciwgc2VwYXJhdG9yKSB7XG4gICAgICAgICAgICBpZiAoc2VwYXJhdG9yID09PSB2b2lkIDApIHsgc2VwYXJhdG9yID0gJyAnOyB9XG4gICAgICAgICAgICByZXR1cm4gU3RyaW5nKHN0cilcbiAgICAgICAgICAgICAgICAucmVwbGFjZSgvKFxcZCkvZywgJyQxICcpXG4gICAgICAgICAgICAgICAgLnJlcGxhY2UoLyhbYS16XSg/PVtBLVpdKSkvZywgJyQxICcpXG4gICAgICAgICAgICAgICAgLnJlcGxhY2UoL1teYS16QS1aMC05IF0vZywgJyAnKVxuICAgICAgICAgICAgICAgIC5yZXBsYWNlKC9cXHN7Mix9L2csICcgJylcbiAgICAgICAgICAgICAgICAucmVwbGFjZSgvXiB8ICQvZywgJycpXG4gICAgICAgICAgICAgICAgLnRvTG93ZXJDYXNlKClcbiAgICAgICAgICAgICAgICAucmVwbGFjZSgvXFxzKy9nLCBzZXBhcmF0b3IpO1xuICAgICAgICB9O1xuICAgICAgICAvKipcbiAgICAgICAgICogQ29udmVydHMgYSBzdHJpbmcgdG8gYSBjYW1lbCBjYXNlIHN0cmluZy5cbiAgICAgICAgICpcbiAgICAgICAgICogQG1ldGhvZCB0b0NhbWVsQ2FzZVxuICAgICAgICAgKiBAcGFyYW0gc3RyIHtzdHJpbmd9XG4gICAgICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XG4gICAgICAgICAqIEBwdWJsaWNcbiAgICAgICAgICogQHN0YXRpY1xuICAgICAgICAgKiBAZXhhbXBsZVxuICAgICAgICAgKiAgICAgIFN0cmluZ1V0aWwudG9DYW1lbENhc2UoXCJsaXZlRG93bl9ieS10aGUuUml2ZXJcIik7XG4gICAgICAgICAqICAgICAgLy8gJ2xpdmVEb3duQnlUaGVSaXZlcidcbiAgICAgICAgICovXG4gICAgICAgIFN0cmluZ1V0aWwudG9DYW1lbENhc2UgPSBmdW5jdGlvbiAoc3RyKSB7XG4gICAgICAgICAgICByZXR1cm4gU3RyaW5nVXRpbC50b1NlbnRlbmNlKHN0cilcbiAgICAgICAgICAgICAgICAucmVwbGFjZSgvIChcXHcpL2csIGZ1bmN0aW9uIChfLCAkMSkge1xuICAgICAgICAgICAgICAgIHJldHVybiAkMS50b1VwcGVyQ2FzZSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDb252ZXJ0cyBhIGh5cGhlbiBzdHJpbmcgdG8gYSBwYXNjYWwgY2FzZSBzdHJpbmcuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBtZXRob2QgdG9QYXNjYWxDYXNlXG4gICAgICAgICAqIEBwYXJhbSBzdHIge3N0cmluZ31cbiAgICAgICAgICogQHJldHVybnMge3N0cmluZ31cbiAgICAgICAgICogQHB1YmxpY1xuICAgICAgICAgKiBAc3RhdGljXG4gICAgICAgICAqIEBleGFtcGxlXG4gICAgICAgICAqICAgICAgU3RyaW5nVXRpbC50b1Bhc2NhbENhc2UoXCJsaXZlRG93bl9ieS10aGUuUml2ZXJcIik7XG4gICAgICAgICAqICAgICAgLy8gJ0xpdmVEb3duQnlUaGVSaXZlcidcbiAgICAgICAgICovXG4gICAgICAgIFN0cmluZ1V0aWwudG9QYXNjYWxDYXNlID0gZnVuY3Rpb24gKHN0cikge1xuICAgICAgICAgICAgcmV0dXJuIFN0cmluZ1V0aWwudG9DYW1lbENhc2Uoc3RyKVxuICAgICAgICAgICAgICAgIC5yZXBsYWNlKC9eW2EtekEtWl0vLCBmdW5jdGlvbiAoYSwgYiwgYykge1xuICAgICAgICAgICAgICAgIHJldHVybiBhLnRvVXBwZXJDYXNlKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIENvbnZlcnRzIGEgc3RyaW5nIHRvIGEgY29uc3RhbnQgY2FzZSBzdHJpbmcuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBtZXRob2QgdG9Db25zdGFudENhc2VcbiAgICAgICAgICogQHBhcmFtIHN0ciB7c3RyaW5nfVxuICAgICAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxuICAgICAgICAgKiBAcHVibGljXG4gICAgICAgICAqIEBzdGF0aWNcbiAgICAgICAgICogQGV4YW1wbGVcbiAgICAgICAgICogICAgICBTdHJpbmdVdGlsLnRvQ29uc3RhbnRDYXNlKFwibGl2ZURvd25fYnktdGhlLlJpdmVyXCIpO1xuICAgICAgICAgKiAgICAgIC8vICdMSVZFX0RPV05fQllfVEhFX1JJVkVSJ1xuICAgICAgICAgKi9cbiAgICAgICAgU3RyaW5nVXRpbC50b0NvbnN0YW50Q2FzZSA9IGZ1bmN0aW9uIChzdHIpIHtcbiAgICAgICAgICAgIHJldHVybiBTdHJpbmdVdGlsLnRvU2VudGVuY2Uoc3RyLCAnXycpXG4gICAgICAgICAgICAgICAgLnRvVXBwZXJDYXNlKCk7XG4gICAgICAgIH07XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDcmVhdGVzIGEgdW5pdmVyc2FsbHkgdW5pcXVlIGlkZW50aWZpZXIuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBtZXRob2QgY3JlYXRlVVVJRFxuICAgICAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxuICAgICAgICAgKiBAcHVibGljXG4gICAgICAgICAqIEBzdGF0aWNcbiAgICAgICAgICogQGV4YW1wbGVcbiAgICAgICAgICogICAgICBTdHJpbmdVdGlsLmNyZWF0ZVVVSUQoKTtcbiAgICAgICAgICogICAgICAvLyAnYTk1ZDcxMzQtMzM0Mi00MDAxLWJjZWEtY2MwMzcxYjcwZGVjJ1xuICAgICAgICAgKi9cbiAgICAgICAgU3RyaW5nVXRpbC5jcmVhdGVVVUlEID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIHV1aWQgPSAoJ3h4eHh4eHh4LXh4eHgtNHh4eC15eHh4LXh4eHh4eHh4eHh4eCcpLnJlcGxhY2UoL1t4eV0vZywgZnVuY3Rpb24gKGMpIHtcbiAgICAgICAgICAgICAgICB2YXIgciA9IE1hdGgucmFuZG9tKCkgKiAxNiB8IDA7XG4gICAgICAgICAgICAgICAgdmFyIHYgPSAoYyA9PSAneCcpID8gciA6IChyICYgMHgzIHwgMHg4KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdi50b1N0cmluZygxNik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiB1dWlkO1xuICAgICAgICB9O1xuICAgICAgICAvKipcbiAgICAgICAgICogQ29udmVydHMgYSBxdWVyeSBzdHJpbmcgdG8gYW4gb2JqZWN0LlxuICAgICAgICAgKlxuICAgICAgICAgKiBAbWV0aG9kIHF1ZXJ5U3RyaW5nVG9PYmplY3RcbiAgICAgICAgICogQHBhcmFtIHF1ZXJ5U3RyaW5nIHtzdHJpbmd9XG4gICAgICAgICAqIEBwYXJhbSBbdXNlUGFyc2VGbG9hdD1mYWxzZV0ge2Jvb2xlYW59IElmIHRydWUgY29udmVydHMgc3RyaW5ncyB0byBudW1iZXJzLlxuICAgICAgICAgKiBAcmV0dXJucyB7T2JqZWN0fE51bGx9XG4gICAgICAgICAqIEBwdWJsaWNcbiAgICAgICAgICogQHN0YXRpY1xuICAgICAgICAgKiBAZXhhbXBsZVxuICAgICAgICAgKiAgICAgIFN0cmluZ1V0aWwucXVlcnlTdHJpbmdUb09iamVjdCgnP25hbWU9Um9iZXJ0JmFnZT0yMyZnZW5kZXI9bWFsZScpO1xuICAgICAgICAgKiAgICAgIC8vIHtuYW1lOiAnUm9iZXJ0JywgYWdlOiAnMjMnLCBnZW5kZXI6ICdtYWxlJ31cbiAgICAgICAgICpcbiAgICAgICAgICogICAgICBTdHJpbmdVdGlsLnF1ZXJ5U3RyaW5nVG9PYmplY3QoJz9uYW1lPVJvYmVydCZhZ2U9MjMmZ2VuZGVyPW1hbGUnLCB0cnVlKTtcbiAgICAgICAgICogICAgICAvLyB7bmFtZTogJ1JvYmVydCcsIGFnZTogMjMsIGdlbmRlcjogJ21hbGUnfVxuICAgICAgICAgKi9cbiAgICAgICAgU3RyaW5nVXRpbC5xdWVyeVN0cmluZ1RvT2JqZWN0ID0gZnVuY3Rpb24gKHF1ZXJ5U3RyaW5nLCB1c2VQYXJzZUZsb2F0KSB7XG4gICAgICAgICAgICBpZiAodXNlUGFyc2VGbG9hdCA9PT0gdm9pZCAwKSB7IHVzZVBhcnNlRmxvYXQgPSBmYWxzZTsgfVxuICAgICAgICAgICAgdmFyIHBhcmFtcyA9IHt9O1xuICAgICAgICAgICAgdmFyIHRlbXAgPSBudWxsO1xuICAgICAgICAgICAgdmFyIHN0ciA9IHF1ZXJ5U3RyaW5nLnN1YnN0cmluZyhxdWVyeVN0cmluZy5pbmRleE9mKCc/JykgKyAxKTtcbiAgICAgICAgICAgIGlmIChzdHIgPT09ICcnKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBTcGxpdCBpbnRvIGtleS92YWx1ZSBwYWlyc1xuICAgICAgICAgICAgdmFyIHF1ZXJpZXMgPSBzdHIuc3BsaXQoJyYnKTtcbiAgICAgICAgICAgIC8vIENvbnZlcnQgdGhlIGFycmF5IG9mIHN0cmluZ3MgaW50byBhbiBvYmplY3RcbiAgICAgICAgICAgIHZhciBsZW4gPSBxdWVyaWVzLmxlbmd0aDtcbiAgICAgICAgICAgIGZvciAodmFyIGlfMSA9IDA7IGlfMSA8IGxlbjsgaV8xKyspIHtcbiAgICAgICAgICAgICAgICB0ZW1wID0gcXVlcmllc1tpXzFdLnNwbGl0KCc9Jyk7XG4gICAgICAgICAgICAgICAgcGFyYW1zW3RlbXBbMF1dID0gKHVzZVBhcnNlRmxvYXQgPT09IHRydWUgJiYgaXNOYU4ocGFyc2VGbG9hdCh0ZW1wWzFdKSkgPT09IGZhbHNlKSA/IHBhcnNlRmxvYXQodGVtcFsxXSkgOiB0ZW1wWzFdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHBhcmFtcztcbiAgICAgICAgfTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFJlbW92ZSBhbGwgd2hpdGVzcGFjZSBmcm9tIHRoZSBzdHJpbmcgcGFzc2VkIGluLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAbWV0aG9kIHJlbW92ZUFsbFdoaXRlc3BhY2VcbiAgICAgICAgICogQHBhcmFtIHN0ciB7c3RyaW5nfVxuICAgICAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxuICAgICAgICAgKiBAcHVibGljXG4gICAgICAgICAqIEBzdGF0aWNcbiAgICAgICAgICogQGV4YW1wbGVcbiAgICAgICAgICogICAgICBsZXQgc3RyID0gJyAgIGEgYiAgICBjIGQgZSBmIGcgJztcbiAgICAgICAgICogICAgICBTdHJpbmdVdGlsLnJlbW92ZUFsbFdoaXRlc3BhY2Uoc3RyKTtcbiAgICAgICAgICogICAgICAvLyAnYWJjZGVmZydcbiAgICAgICAgICovXG4gICAgICAgIFN0cmluZ1V0aWwucmVtb3ZlQWxsV2hpdGVzcGFjZSA9IGZ1bmN0aW9uIChzdHIpIHtcbiAgICAgICAgICAgIHJldHVybiBzdHIucmVwbGFjZSgvXFxzKy9nLCAnJyk7XG4gICAgICAgIH07XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBSZW1vdmUgbGVhZGluZyBhbmQgdHJhaWxpbmcgd2hpdGVzcGFjZS5cbiAgICAgICAgICpcbiAgICAgICAgICogQG1ldGhvZCByZW1vdmVMZWFkaW5nVHJhaWxpbmdXaGl0ZXNwYWNlXG4gICAgICAgICAqIEBwYXJhbSBzdHIge3N0cmluZ31cbiAgICAgICAgICogQHJldHVybnMge3N0cmluZ31cbiAgICAgICAgICogQHB1YmxpY1xuICAgICAgICAgKiBAc3RhdGljXG4gICAgICAgICAqIEBleGFtcGxlXG4gICAgICAgICAqICAgICAgbGV0IHN0ciA9ICcgICBhIGIgICAgYyBkIGUgZiBnICc7XG4gICAgICAgICAqICAgICAgU3RyaW5nVXRpbC5yZW1vdmVMZWFkaW5nVHJhaWxpbmdXaGl0ZXNwYWNlKHN0cik7XG4gICAgICAgICAqICAgICAgLy8gJ2EgYiAgICBjIGQgZSBmIGcnXG4gICAgICAgICAqL1xuICAgICAgICBTdHJpbmdVdGlsLnJlbW92ZUxlYWRpbmdUcmFpbGluZ1doaXRlc3BhY2UgPSBmdW5jdGlvbiAoc3RyKSB7XG4gICAgICAgICAgICByZXR1cm4gc3RyLnJlcGxhY2UoLyheXFxzK3xcXHMrJCkvZywgJycpO1xuICAgICAgICB9O1xuICAgICAgICAvKipcbiAgICAgICAgICpcbiAgICAgICAgICogQG1ldGhvZCB0cnVuY2F0ZVxuICAgICAgICAgKiBAcGFyYW0gdGV4dCB7c3RyaW5nfVxuICAgICAgICAgKiBAcGFyYW0gbGVuZ3RoIHtpbnR9XG4gICAgICAgICAqIEBwYXJhbSBpbmRpY2F0b3Ige3N0cmluZ31cbiAgICAgICAgICogQHJldHVybnMge3N0cmluZ31cbiAgICAgICAgICogQHB1YmxpY1xuICAgICAgICAgKiBAc3RhdGljXG4gICAgICAgICAqIEBleGFtcGxlXG4gICAgICAgICAqICAgICAgU3RyaW5nVXRpbC50cnVuY2F0ZSgnUm9iZXJ0IGlzIGNvb2wgYW5kIGhlIGxpa2VzIGJydXNjaGV0dGEuJywgMTQpKTtcbiAgICAgICAgICogICAgICAvLyAnUm9iZXJ0IGlzIGNvb2wuLi4nXG4gICAgICAgICAqXG4gICAgICAgICAqICAgICAgU3RyaW5nVXRpbC50cnVuY2F0ZSgnUm9iZXJ0IGlzIGNvb2wgYW5kIGhlIGxpa2VzIGJydXNjaGV0dGEuJywgMTQsICchISEnKSk7XG4gICAgICAgICAqICAgICAgLy8gJ1JvYmVydCBpcyBjb29sISEhJ1xuICAgICAgICAgKi9cbiAgICAgICAgU3RyaW5nVXRpbC50cnVuY2F0ZSA9IGZ1bmN0aW9uICh0ZXh0LCBsZW5ndGgsIGluZGljYXRvcikge1xuICAgICAgICAgICAgaWYgKGluZGljYXRvciA9PT0gdm9pZCAwKSB7IGluZGljYXRvciA9ICcuLi4nOyB9XG4gICAgICAgICAgICBpZiAodGV4dC5sZW5ndGggPD0gbGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRleHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGV4dC5zdWJzdHIoMCwgbGVuZ3RoKSArIGluZGljYXRvcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFJlcGxhY2VzIGVhY2ggZm9ybWF0IGl0ZW0gaW4gYSBzcGVjaWZpZWQgc3RyaW5nIHdpdGggdGhlIHRleHQgZXF1aXZhbGVudCBvZiBhIGNvcnJlc3BvbmRpbmcgb2JqZWN0J3MgdmFsdWUuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBtZXRob2QgZm9ybWF0XG4gICAgICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XG4gICAgICAgICAqIEBwYXJhbSBzdHIge3N0cmluZ31cbiAgICAgICAgICogQHBhcmFtIC4uLnJlc3Qge0FycmF5Ljxhbnk+fVxuICAgICAgICAgKiBAcHVibGljXG4gICAgICAgICAqIEBzdGF0aWNcbiAgICAgICAgICogQGV4YW1wbGVcbiAgICAgICAgICogICAgICBTdHJpbmdVdGlsLmZvcm1hdCgnUm9iZXJ0IGlzIHswfS4gVmVyeSB7MH0gYW5kIHsxfSEnLCAnY29vbCcsICdzbWFydCcpO1xuICAgICAgICAgKiAgICAgIC8vICdSb2JlcnQgaXMgY29vbC4gVmVyeSBjb29sIGFuZCBzbWFydCEnXG4gICAgICAgICAqL1xuICAgICAgICBTdHJpbmdVdGlsLmZvcm1hdCA9IGZ1bmN0aW9uIChzdHIpIHtcbiAgICAgICAgICAgIHZhciByZXN0ID0gW107XG4gICAgICAgICAgICBmb3IgKHZhciBfaSA9IDE7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykge1xuICAgICAgICAgICAgICAgIHJlc3RbX2kgLSAxXSA9IGFyZ3VtZW50c1tfaV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgbGVuZ3RoID0gcmVzdC5sZW5ndGg7XG4gICAgICAgICAgICB2YXIgdmFsdWUgPSBzdHI7XG4gICAgICAgICAgICBmb3IgKHZhciBpXzIgPSAwOyBpXzIgPCBsZW5ndGg7IGlfMisrKSB7XG4gICAgICAgICAgICAgICAgdmFyIHJlZyA9IG5ldyBSZWdFeHAoJ1xcXFx7JyArIGlfMiArICdcXFxcfScsICdnbScpO1xuICAgICAgICAgICAgICAgIHZhbHVlID0gdmFsdWUucmVwbGFjZShyZWcsIHJlc3RbaV8yXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgIH07XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBVcGRhdGVzIGEgdmFsdWUgaW4gdGhlIHF1ZXJ5IHN0cmluZyBieSBpdHMga2V5IG5hbWUuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBtZXRob2QgcGFyYW1SZXBsYWNlXG4gICAgICAgICAqIEBwYXJhbSBxdWVyeVN0cmluZ1xuICAgICAgICAgKiBAcGFyYW0gbmFtZVxuICAgICAgICAgKiBAcGFyYW0gdmFsdWVcbiAgICAgICAgICogQHJldHVybnMge3N0cmluZ3x2b2lkfVxuICAgICAgICAgKiBAZXhhbXBsZVxuICAgICAgICAgKiAgICAgIFN0cmluZ1V0aWwucGFyYW1SZXBsYWNlKCc/bmFtZT1Sb2JlcnQmYWdlPTIzJmdlbmRlcj1tYWxlJywgJ2dlbmRlcicsICdmZW1hbGUnKTtcbiAgICAgICAgICogICAgICAvLyAnP25hbWU9Um9iZXJ0JmFnZT0yMyZnZW5kZXI9ZmVtYWxlJ1xuICAgICAgICAgKi9cbiAgICAgICAgU3RyaW5nVXRpbC5wYXJhbVJlcGxhY2UgPSBmdW5jdGlvbiAocXVlcnlTdHJpbmcsIG5hbWUsIHZhbHVlKSB7XG4gICAgICAgICAgICAvLyBGaW5kIHRoZSBwYXJhbSB3aXRoIHJlZ2V4XG4gICAgICAgICAgICAvLyBHcmFiIHRoZSBmaXJzdCBjaGFyYWN0ZXIgaW4gdGhlIHJldHVybmVkIHN0cmluZyAoc2hvdWxkIGJlID8gb3IgJilcbiAgICAgICAgICAgIC8vIFJlcGxhY2Ugb3VyIGhyZWYgc3RyaW5nIHdpdGggb3VyIG5ldyB2YWx1ZSwgcGFzc2luZyBvbiB0aGUgbmFtZSBhbmQgZGVsaW1pdGVyXG4gICAgICAgICAgICB2YXIgcmUgPSBuZXcgUmVnRXhwKCdbXFxcXD8mXScgKyBuYW1lICsgJz0oW14mI10qKScpO1xuICAgICAgICAgICAgdmFyIGRlbGltaXRlciA9IHJlLmV4ZWMocXVlcnlTdHJpbmcpWzBdLmNoYXJBdCgwKTtcbiAgICAgICAgICAgIHJldHVybiBxdWVyeVN0cmluZy5yZXBsYWNlKHJlLCBkZWxpbWl0ZXIgKyBuYW1lICsgJz0nICsgdmFsdWUpO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gU3RyaW5nVXRpbDtcbiAgICB9KSgpO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbiAgICBleHBvcnRzLmRlZmF1bHQgPSBTdHJpbmdVdGlsO1xufSk7XG4iLCIoZnVuY3Rpb24gKGZhY3RvcnkpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZS5leHBvcnRzID09PSAnb2JqZWN0Jykge1xuICAgICAgICB2YXIgdiA9IGZhY3RvcnkocmVxdWlyZSwgZXhwb3J0cyk7IGlmICh2ICE9PSB1bmRlZmluZWQpIG1vZHVsZS5leHBvcnRzID0gdjtcbiAgICB9XG4gICAgZWxzZSBpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSB7XG4gICAgICAgIGRlZmluZShbXCJyZXF1aXJlXCIsIFwiZXhwb3J0c1wiLCAnLi9TdHJpbmdVdGlsJ10sIGZhY3RvcnkpO1xuICAgIH1cbn0pKGZ1bmN0aW9uIChyZXF1aXJlLCBleHBvcnRzKSB7XG4gICAgdmFyIFN0cmluZ1V0aWxfMSA9IHJlcXVpcmUoJy4vU3RyaW5nVXRpbCcpO1xuICAgIC8qKlxuICAgICAqIEEgaGVscGVyIGNsYXNzIHRvIHByb3ZpZGUgYSBjb252ZW5pZW50IGFuZCBjb25zaXN0ZW50IHdheSB0byByZW5kZXIgdGVtcGxhdGVzLlxuICAgICAqXG4gICAgICogQGNsYXNzIFRlbXBsYXRlRmFjdG9yeVxuICAgICAqIEBtb2R1bGUgU3RydWN0dXJlSlNcbiAgICAgKiBAc3VibW9kdWxlIHV0aWxcbiAgICAgKiBAcmVxdWlyZXMgU3RyaW5nVXRpbFxuICAgICAqIEByZXF1aXJlcyBIYW5kbGViYXJzXG4gICAgICogQGF1dGhvciBSb2JlcnQgUy4gKHd3dy5jb2RlQmVsdC5jb20pXG4gICAgICogQHN0YXRpY1xuICAgICAqL1xuICAgIHZhciBUZW1wbGF0ZUZhY3RvcnkgPSAoZnVuY3Rpb24gKCkge1xuICAgICAgICBmdW5jdGlvbiBUZW1wbGF0ZUZhY3RvcnkoKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1tUZW1wbGF0ZUZhY3RvcnldIERvIG5vdCBpbnN0YW50aWF0ZSB0aGUgVGVtcGxhdGVGYWN0b3J5IGNsYXNzIGJlY2F1c2UgaXQgaXMgYSBzdGF0aWMgY2xhc3MuJyk7XG4gICAgICAgIH1cbiAgICAgICAgLyoqXG4gICAgICAgICAqIENyZWF0ZXMgYSB0ZW1wbGF0ZS5cbiAgICAgICAgICpcbiAgICAgICAgICogQG1ldGhvZCBjcmVhdGVcbiAgICAgICAgICogQHBhcmFtIHRlbXBsYXRlUGF0aCB7YW55fVxuICAgICAgICAgKiBAcGFyYW0gW2RhdGE9YW55XVxuICAgICAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxuICAgICAgICAgKiBAcHVibGljXG4gICAgICAgICAqIEBzdGF0aWNcbiAgICAgICAgICogQGV4YW1wbGVcbiAgICAgICAgICogICAgICBUZW1wbGF0ZUZhY3RvcnkuY3JlYXRlKCd0ZW1wbGF0ZU5hbWUnLCB7c29tZTogJ2RhdGEnfSk7XG4gICAgICAgICAqL1xuICAgICAgICBUZW1wbGF0ZUZhY3RvcnkuY3JlYXRlID0gZnVuY3Rpb24gKHRlbXBsYXRlUGF0aCwgZGF0YSkge1xuICAgICAgICAgICAgaWYgKGRhdGEgPT09IHZvaWQgMCkgeyBkYXRhID0gbnVsbDsgfVxuICAgICAgICAgICAgLy9DaGVja3MgdGhlIGZpcnN0IGNoYXJhY3RlciB0byBzZWUgaWYgaXQgaXMgYSAnLicgb3IgJyMnLlxuICAgICAgICAgICAgdmFyIHJlZ2V4ID0gL14oWy4jXSkoLispLztcbiAgICAgICAgICAgIHZhciB0ZW1wbGF0ZSA9IG51bGw7XG4gICAgICAgICAgICB2YXIgaXNGdW5jdGlvblRlbXBsYXRlID0gdHlwZW9mIHRlbXBsYXRlUGF0aCA9PT0gJ2Z1bmN0aW9uJztcbiAgICAgICAgICAgIHZhciBpc0NsYXNzT3JJZE5hbWUgPSByZWdleC50ZXN0KHRlbXBsYXRlUGF0aCk7XG4gICAgICAgICAgICBpZiAoaXNGdW5jdGlvblRlbXBsYXRlKSB7XG4gICAgICAgICAgICAgICAgdGVtcGxhdGUgPSB0ZW1wbGF0ZVBhdGgoZGF0YSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChpc0NsYXNzT3JJZE5hbWUpIHtcbiAgICAgICAgICAgICAgICAvLyBSZW1vdmUgcG91bmQgc2lnbiBmcm9tIHRoZSBpZCBuYW1lLlxuICAgICAgICAgICAgICAgIHRlbXBsYXRlUGF0aCA9IHRlbXBsYXRlUGF0aC5zdWJzdHJpbmcoMSk7XG4gICAgICAgICAgICAgICAgdmFyIGh0bWxTdHJpbmcgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0ZW1wbGF0ZVBhdGgpLmlubmVySFRNTDtcbiAgICAgICAgICAgICAgICBodG1sU3RyaW5nID0gU3RyaW5nVXRpbF8xLmRlZmF1bHQucmVtb3ZlTGVhZGluZ1RyYWlsaW5nV2hpdGVzcGFjZShodG1sU3RyaW5nKTtcbiAgICAgICAgICAgICAgICBpZiAoVGVtcGxhdGVGYWN0b3J5LnRlbXBsYXRlRW5naW5lID09IFRlbXBsYXRlRmFjdG9yeS5VTkRFUlNDT1JFKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIFVuZGVyc2NvcmUgVGVtcGxhdGU6XG4gICAgICAgICAgICAgICAgICAgIHZhciB0ZW1wbGF0ZU1ldGhvZCA9IHdpbmRvd1snXyddLnRlbXBsYXRlKGh0bWxTdHJpbmcpO1xuICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZSA9IHRlbXBsYXRlTWV0aG9kKGRhdGEpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gSGFuZGxlYmFycyBUZW1wbGF0ZVxuICAgICAgICAgICAgICAgICAgICB2YXIgdGVtcGxhdGVNZXRob2QgPSBIYW5kbGViYXJzLmNvbXBpbGUoaHRtbFN0cmluZyk7XG4gICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlID0gdGVtcGxhdGVNZXRob2QoZGF0YSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdmFyIHRlbXBsYXRlT2JqID0gd2luZG93W1RlbXBsYXRlRmFjdG9yeS50ZW1wbGF0ZU5hbWVzcGFjZV07XG4gICAgICAgICAgICAgICAgaWYgKCF0ZW1wbGF0ZU9iaikge1xuICAgICAgICAgICAgICAgICAgICAvLyBSZXR1cm5zIG51bGwgYmVjYXVzZSB0aGUgdGVtcGxhdGUgbmFtZXNwYWNlIGlzIG5vdCBmb3VuZC5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHZhciB0ZW1wbGF0ZUZ1bmN0aW9uID0gdGVtcGxhdGVPYmpbdGVtcGxhdGVQYXRoXTtcbiAgICAgICAgICAgICAgICBpZiAodGVtcGxhdGVGdW5jdGlvbikge1xuICAgICAgICAgICAgICAgICAgICAvLyBUaGUgdGVtcGxhdGVQYXRoIGdldHMgYSBmdW5jdGlvbiBzdG9yYWdlIGluIHRoZSBhc3NvY2lhdGl2ZSBhcnJheS5cbiAgICAgICAgICAgICAgICAgICAgLy8gV2UgY2FsbCB0aGUgZnVuY3Rpb24gYnkgcGFzc2luZyBpbiB0aGUgZGF0YSBhcyB0aGUgYXJndW1lbnQuXG4gICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlID0gdGVtcGxhdGVGdW5jdGlvbihkYXRhKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGVtcGxhdGU7XG4gICAgICAgIH07XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBBIGNvbnN0YW50IHZhbHVlIGZvciB1c2luZyBVbmRlcnNjb3JlIG9yIExvZGFzaCB0ZW1wbGF0ZXMuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwcm9wZXJ0eSBVTkRFUlNDT1JFXG4gICAgICAgICAqIEB0eXBlIHtzdHJpbmd9XG4gICAgICAgICAqIEBwdWJsaWNcbiAgICAgICAgICogQGZpbmFsXG4gICAgICAgICAqIEBzdGF0aWNcbiAgICAgICAgICovXG4gICAgICAgIFRlbXBsYXRlRmFjdG9yeS5VTkRFUlNDT1JFID0gJ3VuZGVyc2NvcmUnO1xuICAgICAgICAvKipcbiAgICAgICAgICogQSBjb25zdGFudCB2YWx1ZSBmb3IgdXNpbmcgSGFuZGxlYmFycyB0ZW1wbGF0ZXMuIFRoaXMgaXMgdGhlIGRlZmF1bHQgdGVtcGxhdGUgZW5naW5lLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcHJvcGVydHkgSEFORExFQkFSU1xuICAgICAgICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgICAgICAgKiBAcHVibGljXG4gICAgICAgICAqIEBmaW5hbFxuICAgICAgICAgKiBAc3RhdGljXG4gICAgICAgICAqL1xuICAgICAgICBUZW1wbGF0ZUZhY3RvcnkuSEFORExFQkFSUyA9ICdoYW5kbGViYXJzJztcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFNldHMgdGhlIHRlbXBsYXRlIGVuZ2luZSB0eXBlIGZvciB0aGlzIFRlbXBsYXRlRmFjdG9yeSBjbGFzcy4gVGhlIGRlZmF1bHQgaXMgVGVtcGxhdGVGYWN0b3J5LkhBTkRMRUJBUlNcbiAgICAgICAgICpcbiAgICAgICAgICogQHByb3BlcnR5IHRlbXBsYXRlRW5naW5lXG4gICAgICAgICAqIEB0eXBlIHtzdHJpbmd9XG4gICAgICAgICAqIEBkZWZhdWx0IFRlbXBsYXRlRmFjdG9yeS5IQU5ETEVCQVJTXG4gICAgICAgICAqIEBwdWJsaWNcbiAgICAgICAgICogQHN0YXRpY1xuICAgICAgICAgKi9cbiAgICAgICAgVGVtcGxhdGVGYWN0b3J5LnRlbXBsYXRlRW5naW5lID0gVGVtcGxhdGVGYWN0b3J5LkhBTkRMRUJBUlM7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgZ2xvYmFsIG5hbWVzcGFjZSBmb3IgcHJlLWNvbXBpbGVkIHRlbXBsYXRlcy5cbiAgICAgICAgICpcbiAgICAgICAgICogQHByb3BlcnR5IHRlbXBsYXRlTmFtZXNwYWNlXG4gICAgICAgICAqIEB0eXBlIHtzdHJpbmd9XG4gICAgICAgICAqIEBkZWZhdWx0ICdKU1QnXG4gICAgICAgICAqIEBwdWJsaWNcbiAgICAgICAgICogQHN0YXRpY1xuICAgICAgICAgKi9cbiAgICAgICAgVGVtcGxhdGVGYWN0b3J5LnRlbXBsYXRlTmFtZXNwYWNlID0gJ0pTVCc7XG4gICAgICAgIHJldHVybiBUZW1wbGF0ZUZhY3Rvcnk7XG4gICAgfSkoKTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG4gICAgZXhwb3J0cy5kZWZhdWx0ID0gVGVtcGxhdGVGYWN0b3J5O1xufSk7XG4iLCIoZnVuY3Rpb24gKGZhY3RvcnkpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZS5leHBvcnRzID09PSAnb2JqZWN0Jykge1xuICAgICAgICB2YXIgdiA9IGZhY3RvcnkocmVxdWlyZSwgZXhwb3J0cyk7IGlmICh2ICE9PSB1bmRlZmluZWQpIG1vZHVsZS5leHBvcnRzID0gdjtcbiAgICB9XG4gICAgZWxzZSBpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSB7XG4gICAgICAgIGRlZmluZShbXCJyZXF1aXJlXCIsIFwiZXhwb3J0c1wiXSwgZmFjdG9yeSk7XG4gICAgfVxufSkoZnVuY3Rpb24gKHJlcXVpcmUsIGV4cG9ydHMpIHtcbiAgICAvKipcbiAgICAgKiBBIFV0aWxpdHkgY2xhc3MgdGhhdCBoYXMgc2V2ZXJhbCBzdGF0aWMgbWV0aG9kcyB0byBhc3Npc3QgaW4gZGV2ZWxvcG1lbnQuXG4gICAgICpcbiAgICAgKiBAY2xhc3MgVXRpbFxuICAgICAqIEBtb2R1bGUgU3RydWN0dXJlSlNcbiAgICAgKiBAc3VibW9kdWxlIHV0aWxcbiAgICAgKiBAYXV0aG9yIFJvYmVydCBTLiAod3d3LmNvZGVCZWx0LmNvbSlcbiAgICAgKiBAc3RhdGljXG4gICAgICovXG4gICAgdmFyIFV0aWwgPSAoZnVuY3Rpb24gKCkge1xuICAgICAgICBmdW5jdGlvbiBVdGlsKCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdbVXRpbF0gRG8gbm90IGluc3RhbnRpYXRlIHRoZSBVdGlsIGNsYXNzIGJlY2F1c2UgaXQgaXMgYSBzdGF0aWMgY2xhc3MuJyk7XG4gICAgICAgIH1cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEdlbmVyYXRlcyBhIHVuaXF1ZSBJRC4gSWYgYSBwcmVmaXggaXMgcGFzc2VkIGluLCB0aGUgdmFsdWUgd2lsbCBiZSBhcHBlbmRlZCB0byBpdC5cbiAgICAgICAgICpcbiAgICAgICAgICogQG1ldGhvZCB1bmlxdWVJZFxuICAgICAgICAgKiBAcGFyYW0gW3ByZWZpeF0ge3N0cmluZ30gVGhlIHN0cmluZyB2YWx1ZSB1c2VkIGZvciB0aGUgcHJlZml4LlxuICAgICAgICAgKiBAcmV0dXJucyB7aW5pdHxzdHJpbmd9IFJldHVybnMgdGhlIHVuaXF1ZSBpZGVudGlmaWVyLlxuICAgICAgICAgKiBAcHVibGljXG4gICAgICAgICAqIEBzdGF0aWNcbiAgICAgICAgICogQGV4YW1wbGVcbiAgICAgICAgICogICAgICBsZXQgcHJvcGVydHkgPSBVdGlsLnVuaXF1ZUlkKCk7XG4gICAgICAgICAqICAgICAgLy8gMVxuICAgICAgICAgKlxuICAgICAgICAgKiAgICAgIGxldCBwcm9wZXJ0eSA9IFV0aWwudW5pcXVlSWQoJ3ByZWZpeE5hbWVfJyk7XG4gICAgICAgICAqICAgICAgLy8gcHJlZml4TmFtZV8xXG4gICAgICAgICAqL1xuICAgICAgICBVdGlsLnVuaXF1ZUlkID0gZnVuY3Rpb24gKHByZWZpeCkge1xuICAgICAgICAgICAgaWYgKHByZWZpeCA9PT0gdm9pZCAwKSB7IHByZWZpeCA9IG51bGw7IH1cbiAgICAgICAgICAgIHZhciBpZCA9ICsrVXRpbC5faWRDb3VudGVyO1xuICAgICAgICAgICAgaWYgKHByZWZpeCAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFN0cmluZyhwcmVmaXggKyBpZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBSZW1vdmVzIGEgbGlzdCBvZiBwcm9wZXJ0aWVzIGZyb20gYW4gb2JqZWN0LlxuICAgICAgICAgKlxuICAgICAgICAgKiBAbWV0aG9kIGRlbGV0ZVByb3BlcnR5RnJvbU9iamVjdFxuICAgICAgICAgKiBAcGFyYW0gb2JqZWN0IHtPYmplY3R9IFRoZSBvYmplY3QgeW91IHdhbnQgdG8gcmVtb3ZlIHByb3BlcnRpZXMgZnJvbS5cbiAgICAgICAgICogQHBhcmFtIHZhbHVlIHtzdHJpbmd8QXJyYXkuPHN0cmluZz59IEEgcHJvcGVydHkgbmFtZSBvciBhbiBhcnJheSBvZiBwcm9wZXJ0eSBuYW1lcyB5b3Ugd2FudCB0byByZW1vdmUgZnJvbSB0aGUgb2JqZWN0LlxuICAgICAgICAgKiBAcmV0dXJucyB7YW55fSBSZXR1cm5zIHRoZSBvYmplY3QgcGFzc2VkIGluIHdpdGhvdXQgdGhlIHJlbW92ZWQgdGhlIHByb3BlcnRpZXMuXG4gICAgICAgICAqIEBwdWJsaWNcbiAgICAgICAgICogQHN0YXRpY1xuICAgICAgICAgKiBAZXhhbXBsZVxuICAgICAgICAgKiAgICAgIGxldCBvYmogPSB7IG5hbWU6ICdSb2JlcnQnLCBnZW5kZXI6ICdtYWxlJywgcGhvbmU6ICc1NTUtNTU1LTU1NTUnIH1cbiAgICAgICAgICpcbiAgICAgICAgICogICAgICBVdGlsLmRlbGV0ZVByb3BlcnR5RnJvbU9iamVjdChvYmosIFsncGhvbmUnLCAnZ2VuZGVyJ10pO1xuICAgICAgICAgKlxuICAgICAgICAgKiAgICAgIC8vIHsgbmFtZTogJ1JvYmVydCcgfVxuICAgICAgICAgKi9cbiAgICAgICAgVXRpbC5kZWxldGVQcm9wZXJ0eUZyb21PYmplY3QgPSBmdW5jdGlvbiAob2JqZWN0LCB2YWx1ZSkge1xuICAgICAgICAgICAgLy8gSWYgcHJvcGVydGllcyBpcyBub3QgYW4gYXJyYXkgdGhlbiBtYWtlIGl0IGFuIGFycmF5IG9iamVjdC5cbiAgICAgICAgICAgIHZhciBsaXN0ID0gKHZhbHVlIGluc3RhbmNlb2YgQXJyYXkpID8gdmFsdWUgOiBbdmFsdWVdO1xuICAgICAgICAgICAgLy8gTG9vcCB0aHJvdWdoIHRoZSBvYmplY3QgcHJvcGVydGllcy5cbiAgICAgICAgICAgIGZvciAodmFyIGtleSBpbiBvYmplY3QpIHtcbiAgICAgICAgICAgICAgICAvLyBJZiB0aGUga2V5IGlzIGEgcHJvcGVydHkgYW5kIG5vdCBmdW5jdGlvbi5cbiAgICAgICAgICAgICAgICBpZiAob2JqZWN0Lmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHZhbHVlXzEgPSBvYmplY3Rba2V5XTtcbiAgICAgICAgICAgICAgICAgICAgLy8gSWYgdGhlIHByb3BlcnR5IGlzIGFuIEFycmF5LlxuICAgICAgICAgICAgICAgICAgICBpZiAodmFsdWVfMSBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBMb29wIHRocm91Z2ggdGhlIEFycmF5IGFuZCBjYWxsIHRoZSBVdGlsLmRlbGV0ZVByb3BlcnR5RnJvbU9iamVjdCBtZXRob2Qgb24gZWFjaCBvYmplY3QgaW4gdGhlIGFycmF5LlxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGFycmF5ID0gdmFsdWVfMTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGluZGV4IGluIGFycmF5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gUmVjdXJzaXZlIGZ1bmN0aW9uIGNhbGwuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgVXRpbC5kZWxldGVQcm9wZXJ0eUZyb21PYmplY3QoYXJyYXlbaW5kZXhdLCBsaXN0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh2YWx1ZV8xIGluc3RhbmNlb2YgT2JqZWN0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBVdGlsLmRlbGV0ZVByb3BlcnR5RnJvbU9iamVjdCh2YWx1ZV8xLCBsaXN0KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIExvb3AgdGhyb3VnaCB0aGUgbGlzdCBvZiBwcm9wZXJ0eSBuYW1lLlxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgbGlzdEluZGV4IGluIGxpc3QpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBJZiB0aGUga2V5KHByb3BlcnR5IG5hbWUpIGVxdWFscyB0aGUgcHJvcGVydHkgbmFtZSBpbiB0aGUgbGlzdCBhcnJheS5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoa2V5ID09PSBsaXN0W2xpc3RJbmRleF0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gRGVsZXRlIHRoZSBwcm9wZXJ0eSBmcm9tIHRoZSBvYmplY3QuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBvYmplY3Rba2V5XTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gb2JqZWN0O1xuICAgICAgICB9O1xuICAgICAgICAvKipcbiAgICAgICAgICogUmVuYW1lcyBhIHByb3BlcnR5IG5hbWUgb24gYW4gb2JqZWN0LlxuICAgICAgICAgKlxuICAgICAgICAgKiBAbWV0aG9kIHJlbmFtZVByb3BlcnR5T25PYmplY3RcbiAgICAgICAgICogQHBhcmFtIG9iamVjdCB7T2JqZWN0fSBUaGUgb2JqZWN0IHlvdSB3YW50IHRvIHJlbmFtZSBwcm9wZXJ0aWVzIGZyb20uXG4gICAgICAgICAqIEBwYXJhbSBvbGROYW1lIHtzdHJpbmd9XG4gICAgICAgICAqIEBwYXJhbSBuZXdOYW1lIHtzdHJpbmd9XG4gICAgICAgICAqIEByZXR1cm5zIHthbnl9IFJldHVybnMgdGhlIG9iamVjdCBwYXNzZWQgaW4gcmVuYW1lZCBwcm9wZXJ0aWVzLlxuICAgICAgICAgKiBAcHVibGljXG4gICAgICAgICAqIEBzdGF0aWNcbiAgICAgICAgICogQGV4YW1wbGVcbiAgICAgICAgICogICAgICBsZXQgb2JqID0geyBuYW1lOiAnUm9iZXJ0JywgZ2VuZGVyOiAnbWFsZScsIHBob25lOiAnNTU1LTU1NS01NTU1JyB9XG4gICAgICAgICAqXG4gICAgICAgICAqICAgICAgVXRpbC5yZW5hbWVQcm9wZXJ0eU9uT2JqZWN0KG9iaiwgJ2dlbmRlcicsICdzZXgnKTtcbiAgICAgICAgICpcbiAgICAgICAgICogICAgICAvLyB7IG5hbWU6ICdSb2JlcnQnLCBzZXg6ICdtYWxlJywgcGhvbmU6ICc1NTUtNTU1LTU1NTUnIH1cbiAgICAgICAgICovXG4gICAgICAgIFV0aWwucmVuYW1lUHJvcGVydHlPbk9iamVjdCA9IGZ1bmN0aW9uIChvYmplY3QsIG9sZE5hbWUsIG5ld05hbWUpIHtcbiAgICAgICAgICAgIC8vIENoZWNrIGZvciB0aGUgb2xkIHByb3BlcnR5IG5hbWUgdG8gYXZvaWQgYSBSZWZlcmVuY2VFcnJvciBpbiBzdHJpY3QgbW9kZS5cbiAgICAgICAgICAgIGlmIChvYmplY3QuaGFzT3duUHJvcGVydHkob2xkTmFtZSkpIHtcbiAgICAgICAgICAgICAgICBvYmplY3RbbmV3TmFtZV0gPSBvYmplY3Rbb2xkTmFtZV07XG4gICAgICAgICAgICAgICAgZGVsZXRlIG9iamVjdFtvbGROYW1lXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBvYmplY3Q7XG4gICAgICAgIH07XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBNYWtlcyBhIGNsb25lIG9mIGFuIG9iamVjdC5cbiAgICAgICAgICpcbiAgICAgICAgICogQG1ldGhvZCBjbG9uZVxuICAgICAgICAgKiBAcGFyYW0gb2JqIHtPYmplY3R9IFRoZSBvYmplY3QgeW91IHRvIGNsb25lLlxuICAgICAgICAgKiBAcmV0dXJucyB7YW55fSBSZXR1cm5zIGEgY2xvbmUgb2JqZWN0IG9mIHRoZSBvbmUgcGFzc2VkIGluLlxuICAgICAgICAgKiBAcHVibGljXG4gICAgICAgICAqIEBzdGF0aWNcbiAgICAgICAgICogQGV4YW1wbGVcbiAgICAgICAgICogICAgICBsZXQgY2xvbmVPZk9iamVjdCA9IFV0aWwuY2xvbmUob2JqKTtcbiAgICAgICAgICovXG4gICAgICAgIFV0aWwuY2xvbmUgPSBmdW5jdGlvbiAob2JqKSB7XG4gICAgICAgICAgICAvL290aGVyIHNjcmlwdHM6IGh0dHA6Ly9kYXZpZHdhbHNoLm5hbWUvamF2YXNjcmlwdC1jbG9uZVxuICAgICAgICAgICAgLy9odHRwOi8vb3Jhbmxvb25leS5jb20vZnVuY3Rpb25hbC1qYXZhc2NyaXB0L1xuICAgICAgICAgICAgLy9odHRwOi8vb3Jhbmxvb25leS5jb20vZGVlcC1jb3B5LWphdmFzY3JpcHQvXG4gICAgICAgICAgICAvLyBIYW5kbGUgdGhlIDMgc2ltcGxlIHR5cGVzLCBhbmQgbnVsbCBvciB1bmRlZmluZWRcbiAgICAgICAgICAgIGlmIChudWxsID09IG9iaiB8fCAnb2JqZWN0JyAhPSB0eXBlb2Ygb2JqKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG9iajtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIEhhbmRsZSBEYXRlXG4gICAgICAgICAgICBpZiAob2JqIGluc3RhbmNlb2YgRGF0ZSkge1xuICAgICAgICAgICAgICAgIHZhciBkYXRlID0gbmV3IERhdGUoKTtcbiAgICAgICAgICAgICAgICBkYXRlLnNldFRpbWUob2JqLmdldFRpbWUoKSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGRhdGU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBIYW5kbGUgQXJyYXlcbiAgICAgICAgICAgIGlmIChvYmogaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgICAgICAgICAgIHZhciBhcnJheSA9IFtdO1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGlfMSA9IDAsIGxlbiA9IG9iai5sZW5ndGg7IGlfMSA8IGxlbjsgaV8xKyspIHtcbiAgICAgICAgICAgICAgICAgICAgYXJyYXlbaV8xXSA9IFV0aWwuY2xvbmUob2JqW2lfMV0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gYXJyYXk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBIYW5kbGUgT2JqZWN0XG4gICAgICAgICAgICBpZiAob2JqIGluc3RhbmNlb2YgT2JqZWN0KSB7XG4gICAgICAgICAgICAgICAgdmFyIGNvcHkgPSB7fTtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBhdHRyIGluIG9iaikge1xuICAgICAgICAgICAgICAgICAgICBpZiAob2JqLmhhc093blByb3BlcnR5KGF0dHIpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb3B5W2F0dHJdID0gVXRpbC5jbG9uZShvYmpbYXR0cl0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBjb3B5O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiW1V0aWxdIFVuYWJsZSB0byBjb3B5IG9iaiEgSXRzIHR5cGUgaXNuJ3Qgc3VwcG9ydGVkLlwiKTtcbiAgICAgICAgfTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIENvbnZlcnRzIGEgc3RyaW5nIG9yIG51bWJlciB0byBhIGJvb2xlYW4uXG4gICAgICAgICAqXG4gICAgICAgICAqIEBtZXRob2QgdG9Cb29sZWFuXG4gICAgICAgICAqIEBwYXJhbSBzdHJOdW0ge3N0cmluZ3xudW1iZXJ9XG4gICAgICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAgICAgKiBAcHVibGljXG4gICAgICAgICAqIEBzdGF0aWNcbiAgICAgICAgICogQGV4YW1wbGVcbiAgICAgICAgICogICAgICBVdGlsLnRvQm9vbGVhbihcIlRSVUVcIik7XG4gICAgICAgICAqICAgICAgLy8gdHJ1ZVxuICAgICAgICAgKlxuICAgICAgICAgKiAgICAgIFV0aWwudG9Cb29sZWFuKDApO1xuICAgICAgICAgKiAgICAgIC8vIGZhbHNlXG4gICAgICAgICAqXG4gICAgICAgICAqICAgICAgVXRpbC50b0Jvb2xlYW4odW5kZWZpbmVkKTtcbiAgICAgICAgICogICAgICAvLyBmYWxzZVxuICAgICAgICAgKi9cbiAgICAgICAgVXRpbC50b0Jvb2xlYW4gPSBmdW5jdGlvbiAoc3RyTnVtKSB7XG4gICAgICAgICAgICB2YXIgdmFsdWUgPSAodHlwZW9mIHN0ck51bSA9PT0gJ3N0cmluZycpID8gc3RyTnVtLnRvTG93ZXJDYXNlKCkgOiBzdHJOdW07XG4gICAgICAgICAgICByZXR1cm4gKHZhbHVlID4gMCB8fCB2YWx1ZSA9PSAndHJ1ZScgfHwgdmFsdWUgPT0gJ3llcycpO1xuICAgICAgICB9O1xuICAgICAgICAvKipcbiAgICAgICAgICogUmV0dXJucyB0aGUgbmFtZSBvZiB0aGUgZnVuY3Rpb24vb2JqZWN0IHBhc3NlZCBpbi5cbiAgICAgICAgICpcbiAgICAgICAgICogQG1ldGhvZCBnZXROYW1lXG4gICAgICAgICAqIEBwYXJhbSBjbGFzc09iamVjdCB7YW55fVxuICAgICAgICAgKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSBuYW1lIG9mIHRoZSBmdW5jdGlvbiBvciBvYmplY3QuXG4gICAgICAgICAqIEBzdGF0aWNcbiAgICAgICAgICogQGV4YW1wbGVcbiAgICAgICAgICogICAgICBsZXQgc29tZUNsYXNzID0gbmV3IFNvbWVDbGFzcygpO1xuICAgICAgICAgKiAgICAgIFV0aWwuZ2V0TmFtZShzb21lQ2xhc3MpOyAgICAgICAgICAgIC8vICdTb21lQ2xhc3MnXG4gICAgICAgICAqXG4gICAgICAgICAqICAgICAgVXRpbC5nZXROYW1lKGZ1bmN0aW9uIFRlc3QoKXt9KTsgICAgLy8gJ1Rlc3QnXG4gICAgICAgICAqICAgICAgVXRpbC5nZXROYW1lKGZ1bmN0aW9uICgpe30pOyAgICAgICAgLy8gJ2Fub255bW91cydcbiAgICAgICAgICovXG4gICAgICAgIFV0aWwuZ2V0TmFtZSA9IGZ1bmN0aW9uIChjbGFzc09iamVjdCkge1xuICAgICAgICAgICAgdmFyIHR5cGUgPSB0eXBlb2YgY2xhc3NPYmplY3Q7XG4gICAgICAgICAgICB2YXIgdmFsdWU7XG4gICAgICAgICAgICB2YXIgZnVuY05hbWVSZWdleCA9IC9mdW5jdGlvbiAoW15cXChdKykvO1xuICAgICAgICAgICAgaWYgKHR5cGUgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICAgICAgLy8gR2V0cyB0aGUgbmFtZSBvZiB0aGUgb2JqZWN0LlxuICAgICAgICAgICAgICAgIHZhciByZXN1bHRzID0gY2xhc3NPYmplY3QuY29uc3RydWN0b3IudG9TdHJpbmcoKS5tYXRjaChmdW5jTmFtZVJlZ2V4KTtcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IHJlc3VsdHNbMV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBUaGlzIGVsc2UgY29kZSBpcyBtYWlubHkgZm9yIEludGVybmV0IEV4cGxvcmUuXG4gICAgICAgICAgICAgICAgdmFyIGlzRnVuY3Rpb24gPSAodHlwZSA9PT0gJ2Z1bmN0aW9uJyk7XG4gICAgICAgICAgICAgICAgLy8gVE9ETzogZmlndXJlIG91dCBob3cgdG8gZXhwbGFpbiB0aGlzXG4gICAgICAgICAgICAgICAgdmFyIG5hbWVfMSA9IGlzRnVuY3Rpb24gJiYgKChjbGFzc09iamVjdC5uYW1lICYmIFsnJywgY2xhc3NPYmplY3QubmFtZV0pIHx8IGNsYXNzT2JqZWN0LnRvU3RyaW5nKCkubWF0Y2goZnVuY05hbWVSZWdleCkpO1xuICAgICAgICAgICAgICAgIGlmIChpc0Z1bmN0aW9uID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IHR5cGU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKG5hbWVfMSAmJiBuYW1lXzFbMV0pIHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSBuYW1lXzFbMV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9ICdhbm9ueW1vdXMnO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgfTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIENyZWF0ZXMgYW5kIHJldHVybnMgYSBuZXcgZGVib3VuY2VkIHZlcnNpb24gb2YgdGhlIHBhc3NlZCBmdW5jdGlvbiB3aGljaCB3aWxsIHBvc3Rwb25lIGl0cyBleGVjdXRpb24gdW50aWwgYWZ0ZXJcbiAgICAgICAgICogd2FpdCBtaWxsaXNlY29uZHMgaGF2ZSBlbGFwc2VkIHNpbmNlIHRoZSBsYXN0IHRpbWUgaXQgd2FzIGludm9rZWQuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBtZXRob2QgZGVib3VuY2VcbiAgICAgICAgICogQHBhcmFtIGNhbGxiYWNrIHtGdW5jdGlvbn0gVGhlIGZ1bmN0aW9uIHRoYXQgc2hvdWxkIGJlIGV4ZWN1dGVkLlxuICAgICAgICAgKiBAcGFyYW0gd2FpdCB7bnVtYmVyfSBNaWxsaXNlY29uZHMgdG8gZWxhcHNlZCBiZWZvcmUgaW52b2tpbmcgdGhlIGNhbGxiYWNrLlxuICAgICAgICAgKiBAcGFyYW0gaW1tZWRpYXRlIHtib29sZWFufSBQYXNzIHRydWUgZm9yIHRoZSBpbW1lZGlhdGUgcGFyYW1ldGVyIHRvIGNhdXNlIGRlYm91bmNlIHRvIHRyaWdnZXIgdGhlIGZ1bmN0aW9uIG9uIHRoZSBsZWFkaW5nIGluc3RlYWQgb2YgdGhlIHRyYWlsaW5nIGVkZ2Ugb2YgdGhlIHdhaXQgaW50ZXJ2YWwuIFVzZWZ1bCBpbiBjaXJjdW1zdGFuY2VzIGxpa2UgcHJldmVudGluZyBhY2NpZGVudGFsIGRvdWJsZS1jbGlja3Mgb24gYSBcInN1Ym1pdFwiIGJ1dHRvbiBmcm9tIGZpcmluZyBhIHNlY29uZCB0aW1lLlxuICAgICAgICAgKiBAcGFyYW0gY2FsbGJhY2tTY29wZSB7YW55fSBUaGUgc2NvcGUgb2YgdGhlIGNhbGxiYWNrIGZ1bmN0aW9uIHRoYXQgc2hvdWxkIGJlIGV4ZWN1dGVkLlxuICAgICAgICAgKiBAcHVibGljXG4gICAgICAgICAqIEBzdGF0aWNcbiAgICAgICAgICogQGV4YW1wbGVcbiAgICAgICAgICogICAgICBVdGlsLmRlYm91bmNlKHRoaXMuX29uQnJlYWtwb2ludENoYW5nZSwgMjUwLCBmYWxzZSwgdGhpcyk7XG4gICAgICAgICAqL1xuICAgICAgICBVdGlsLmRlYm91bmNlID0gZnVuY3Rpb24gKGNhbGxiYWNrLCB3YWl0LCBpbW1lZGlhdGUsIGNhbGxiYWNrU2NvcGUpIHtcbiAgICAgICAgICAgIHZhciB0aW1lb3V0O1xuICAgICAgICAgICAgdmFyIHJlc3VsdDtcbiAgICAgICAgICAgIHZhciBkZWJvdW5jZWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdmFyIGFyZ3MgPSBhcmd1bWVudHM7XG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gZGVsYXllZCgpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGltbWVkaWF0ZSA9PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gY2FsbGJhY2suYXBwbHkoY2FsbGJhY2tTY29wZSwgYXJncyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdGltZW91dCA9IG51bGw7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICh0aW1lb3V0KSB7XG4gICAgICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aW1lb3V0KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoaW1tZWRpYXRlID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IGNhbGxiYWNrLmFwcGx5KGNhbGxiYWNrU2NvcGUsIGFyZ3MpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aW1lb3V0ID0gc2V0VGltZW91dChkZWxheWVkLCB3YWl0KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGRlYm91bmNlZC5jYW5jZWwgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHJldHVybiBkZWJvdW5jZWQ7XG4gICAgICAgIH07XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUT0RPOiBZVUlEb2NfY29tbWVudFxuICAgICAgICAgKlxuICAgICAgICAgKiBAbWV0aG9kIGFwcGx5TWl4aW5zXG4gICAgICAgICAqIEBwYXJhbSBkZXJpdmVkQ3RvciB7YW55fVxuICAgICAgICAgKiBAcGFyYW0gYmFzZUN0b3JzIHthbnl9XG4gICAgICAgICAqIEBwdWJsaWNcbiAgICAgICAgICogQHN0YXRpY1xuICAgICAgICAgKiBAZXhhbXBsZVxuICAgICAgICAgKlxuICAgICAgICAgICAgICAgIGNsYXNzIEZsaWVzIHtcbiAgICAgICAgICAgICAgICAgICAgZmx5KCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgYWxlcnQoJ0lzIGl0IGEgYmlyZD8gSXMgaXQgYSBwbGFuZT8nKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICBcbiAgICAgICAgICAgICAgICBjbGFzcyBDbGltYnMge1xuICAgICAgICAgICAgICAgICAgICBjbGltYigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFsZXJ0KCdNeSBzcGlkZXItc2Vuc2UgaXMgdGluZ2xpbmcuJyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgXG4gICAgICAgICAgICAgICAgY2xhc3MgSG9yc2VmbHlXb21hbiBpbXBsZW1lbnRzIENsaW1icywgRmxpZXMge1xuICAgICAgICAgICAgICAgICAgICBjbGltYjogKCkgPT4gdm9pZDtcbiAgICAgICAgICAgICAgICAgICAgZmx5OiAoKSA9PiB2b2lkO1xuICAgICAgICAgICAgICAgIH1cbiAgICBcbiAgICAgICAgICAgICAgICBVdGlsLmFwcGx5TWl4aW5zKEhvcnNlZmx5V29tYW4sIFtDbGltYnMsIEZsaWVzXSk7XG4gICAgICAgICAqL1xuICAgICAgICBVdGlsLmFwcGx5TWl4aW5zID0gZnVuY3Rpb24gKGRlcml2ZWRDdG9yLCBiYXNlQ3RvcnMpIHtcbiAgICAgICAgICAgIGJhc2VDdG9ycy5mb3JFYWNoKGZ1bmN0aW9uIChiYXNlQ3Rvcikge1xuICAgICAgICAgICAgICAgIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKGJhc2VDdG9yLnByb3RvdHlwZSkuZm9yRWFjaChmdW5jdGlvbiAobmFtZSkge1xuICAgICAgICAgICAgICAgICAgICBkZXJpdmVkQ3Rvci5wcm90b3R5cGVbbmFtZV0gPSBiYXNlQ3Rvci5wcm90b3R5cGVbbmFtZV07XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFJldHVybnMgYSBuZXcgYXJyYXkgd2l0aCBkdXBsaWNhdGVzIHJlbW92ZWQuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBtZXRob2QgdW5pcXVlXG4gICAgICAgICAqIEBwYXJhbSBsaXN0IHtBcnJheS48YW55Pn0gVGhlIGFycmF5IHlvdSB3YW50IHRvIHVzZSB0byBnZW5lcmF0ZSB0aGUgdW5pcXVlIGFycmF5LlxuICAgICAgICAgKiBAcmV0dXJuIHtBcnJheTxhbnk+fSBSZXR1cm5zIGEgbmV3IGFycmF5IGxpc3Qgb2YgdW5pcXVlIGl0ZW1zLlxuICAgICAgICAgKiBAcHJvdGVjdGVkXG4gICAgICAgICAqL1xuICAgICAgICBVdGlsLnVuaXF1ZSA9IGZ1bmN0aW9uIChsaXN0KSB7XG4gICAgICAgICAgICB2YXIgdW5pcXVlTGlzdCA9IGxpc3QucmVkdWNlKGZ1bmN0aW9uIChwcmV2aW91c1ZhbHVlLCBjdXJyZW50VmFsdWUpIHtcbiAgICAgICAgICAgICAgICBpZiAocHJldmlvdXNWYWx1ZS5pbmRleE9mKGN1cnJlbnRWYWx1ZSkgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIHByZXZpb3VzVmFsdWUucHVzaChjdXJyZW50VmFsdWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gcHJldmlvdXNWYWx1ZTtcbiAgICAgICAgICAgIH0sIFtdKTtcbiAgICAgICAgICAgIHJldHVybiB1bmlxdWVMaXN0O1xuICAgICAgICB9O1xuICAgICAgICAvKipcbiAgICAgICAgICogS2VlcHMgdHJhY2sgb2YgdGhlIGNvdW50IGZvciB0aGUgdW5pcXVlSWQgbWV0aG9kLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcHJvcGVydHkgX2lkQ291bnRlclxuICAgICAgICAgKiBAdHlwZSB7aW50fVxuICAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAgKiBAc3RhdGljXG4gICAgICAgICAqL1xuICAgICAgICBVdGlsLl9pZENvdW50ZXIgPSAwO1xuICAgICAgICByZXR1cm4gVXRpbDtcbiAgICB9KSgpO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbiAgICBleHBvcnRzLmRlZmF1bHQgPSBVdGlsO1xufSk7XG4iXX0=

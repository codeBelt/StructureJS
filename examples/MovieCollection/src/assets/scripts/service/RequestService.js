define(function (require, exports, module) { // jshint ignore:line
    'use strict';

    var $ = require('jquery');

    (function addXhrProgressEvent($) {
        var originalXhr = $.ajaxSettings.xhr;
        $.ajaxSetup({
            xhr: function() {
                var req = originalXhr();
                var self = this;
                if (req) {
                    if (typeof req.addEventListener == "function" && self.progress !== undefined) {
                        req.addEventListener("progress", function(evt) {
                            self.progress(evt);
                        }, false);
                    }
                    if (typeof req.upload == "object" && self.progressUpload !== undefined) {
                        req.upload.addEventListener("progress", function(evt) {
                            self.progressUpload(evt);
                        }, false);
                    }
                }
                return req;
            }
        });
    })($);

    /**
     * TODO: YUIDoc_comment
     *
     * @class RequestService
     * @constructor
     */
    var RequestService = function () {
    };

    var proto = RequestService.prototype;

    /**
     *
     * @method get
     * @param endPoint {string}
     * @param requestType {string} The type of the request: GET, POST, PUT, DELETE, etc.
     * @param [data=null]
     * @return {JQueryXHR}
     * @public
     */
    proto.send = function(endPoint, requestType, data) {
        return this._createAjaxRequest({
            type: requestType,
            url: endPoint,
            data: data,
            contentType: 'application/json; charset=utf-8'
        });
    };

    /**
     * Gets data from the server.
     *
     * @method get
     * @param endPoint {string}
     * @param [data=null]
     * @return {JQueryXHR}
     * @public
     */
    proto.get = function(endPoint, data) {
        return this._createAjaxRequest({
            type: 'GET',
            url: endPoint,
            data: data,
            contentType: 'application/json; charset=utf-8'
        });
    };

    /**
     * Creates new data on the server.
     *
     * @method get
     * @param endPoint {string}
     * @param [data=null]
     * @return {JQueryXHR}
     * @public
     */
    proto.post = function(endPoint, data) {
        return this._createAjaxRequest({
            type: 'POST',
            url: endPoint,
            data: data,
            contentType: 'application/json; charset=utf-8'
        });
    };

    /**
     * Updates some data on the server.
     *
     * @method get
     * @param endPoint {string}
     * @param [data=null]
     * @return {JQueryXHR}
     * @public
     */
    proto.put = function(endPoint, data) {
        return this._createAjaxRequest({
            type: 'PUT',
            url: endPoint,
            data: data,
            contentType: 'application/json; charset=utf-8'
        });
    };

    /**
     * Updates some data on the server.
     *
     * @method delete
     * @param endPoint {string}
     * @param [data=null]
     * @return {JQueryXHR}
     * @public
     */
    proto.delete = function(endPoint, data) {
        return this._createAjaxRequest({
            type: 'DELETE',
            url: endPoint,
            data: data,
            contentType: 'application/json; charset=utf-8'
        });
    };

    /**
     * Saves form data to the server. Images and video files.
     *
     * @method postFormData
     * @param endPoint {string}
     * @param formData {FormData} https://developer.mozilla.org/en-US/docs/Web/API/FormData
     * @return {JQueryXHR}
     * @public
     */
    proto.postFormData = function(endPoint, formData) {
        return this._createAjaxRequest({
            type: 'POST',
            url: endPoint,
            data: formData,
            contentType: false,
            processData: false,
            xhr: function() {
                return new XMLHttpRequest();
            },
            progress: function(event) {
                if (event.lengthComputable) {
                    var percent =  parseInt( (event.loaded / event.total * 100), 10);
                }
                else {
                    //console.log("Length not computable.");
                }
            },
            progressUpload: function(event) {
                if (event.lengthComputable) {
                    var percent =  parseInt( (event.loaded / event.total * 100), 10);
                    console.log("percent", percent);
                }
                else {
                    //console.log("progressUpload not computable.");
                }
            }
        });
    };

    /**
     * Updates form data to the server. Images and video files.
     *
     * @method putFormData
     * @param endPoint {string}
     * @param formData {FormData} https://developer.mozilla.org/en-US/docs/Web/API/FormData
     * @return {JQueryXHR}
     * @public
     */
    proto.putFormData = function(endPoint, formData) {
        return this._createAjaxRequest({
            type: 'PUT',
            url: endPoint,
            data: formData,
            contentType: false,
            processData: false,
            xhr: function() {
                return new XMLHttpRequest();
            },
            progress: function(event) {
                if (event.lengthComputable) {
                    var percent =  parseInt( (event.loaded / event.total * 100), 10);
                }
                else {
                    //console.log("Length not computable.");
                }
            },
            progressUpload: function(event) {
                if (event.lengthComputable) {
                    var percent =  parseInt( (event.loaded / event.total * 100), 10);
                    console.log("percent", percent);
                }
                else {
                    //console.log("progressUpload not computable.");
                }
            }
        });
    };

    /**
     * A single place for all our ajax object to be created from.
     *
     * @method _createAjaxRequest
     * @param obj {Object} the options for the jQuery ajax request.
     * @return {JQueryXHR}
     * @private
     */
    proto._createAjaxRequest = function(obj) {
        // Assign the url so we can get if the request fails.
        obj.beforeSend = function(jqXHR, settings) {
            jqXHR.url = settings.url;
        };

        var request = $.ajax(obj);

        // Global successes:
        request.done(function(data, textStatus, jqXHR) {
            console.log("success", data);
        }.bind(this));

        // Global fails:
        request.fail(function(jqXHR, textStatus, errorThrown){
            console.log("fail", jqXHR);
        }.bind(this));

        return request;
    };

    return new RequestService();

});

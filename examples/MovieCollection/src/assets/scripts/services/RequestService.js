import EventDispatcher from 'structurejs/event/EventDispatcher';

/**
 * A Singleton Class that handles all ajax requests.
 *
 * @class RequestService
 * @extends EventBroker
 * @constructor
 **/
class RequestService extends EventDispatcher {

    constructor() {
        super();
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
    send(endPoint, requestType, data = null) {
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
    get(endPoint, data = null, type = null) {
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
    post(endPoint, data = null) {
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
    put(endPoint, data = null) {
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
    delete(endPoint, data = null) {
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
    postFormData(endPoint, formData) {
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
    putFormData(endPoint, formData) {
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
    _createAjaxRequest(obj) {
        // Assign the url so we can get if the request fails.
        obj.beforeSend = function(jqXHR, settings) {
            jqXHR.url = settings.url;
        };

        obj.xhr = function () {
            let xhr = $.ajaxSettings.xhr();
            // handle upload progress events
            xhr.upload.addEventListener('progress', function(event) {
                if (event.lengthComputable) {
                    const percent = (event.loaded / event.total) * 100;
                    this.dispatchEvent('progress', percent);
                }
            }.bind(this), false);

            return xhr;
        }.bind(this);

        const request = $.ajax(obj);

        // Global successes:
        request.done((data, textStatus, jqXHR) => {
            //console.info(data);
        });

        // Global fails:
        request.fail((jqXHR, textStatus, errorThrown) => {
            console.warn('fail jqXHR: ', jqXHR);
        });

        return request;
    }
}

export default new RequestService(); // Singleton Class

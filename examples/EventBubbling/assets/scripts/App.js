/**
 * Main entry point for RequireJS
 */
require(
    [
        'EventBubblingApp',
        'jquery'
    ],
    function(
        EventBubblingApp,
        $
    ) {
        'use strict';

        $(document).ready(function () {
            var app = new EventBubblingApp();
            app.appendTo('.js-eventBubblingApp');

            window.app = app;
        });
    }
);
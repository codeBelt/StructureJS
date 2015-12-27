/**
 * Main entry point for RequireJS
 */
require(
    [
        'WebsiteApp',
        'jquery'
    ],
    function(
        WebsiteApp,
        $
    ) {
        'use strict';

        $(document).ready(function () {
            var app = new WebsiteApp();
            app.appendTo('body');

            window.app = app;
        });
    }
);
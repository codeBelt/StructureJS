/**
 * Main entry point for RequireJS
 */
require(
    [
        'SimonApp',
        'jquery'
    ],
    function(
        SimonApp,
        $
    ) {
        'use strict';

        $(document).ready(function () {
            var simon = new SimonApp();
            simon.appendTo('.js-simonApp');
        });
    }
);
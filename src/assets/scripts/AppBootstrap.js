/**
 * Main entry point for RequireJS
 */
require(
    [
        'example1/SimonApp',
        'EventBubblingApp',
        'jquery'
    ],
    function(
        SimonApp,
        EventBubblingApp,
        $
    ) {
        'use strict';

        $(document).ready(function () {
            var simon = new SimonApp();
            simon.appendTo('.js-simonApp');

            var bubbling = new EventBubblingApp();
            bubbling.appendTo('.js-eventBubblingApp');
        });
    }
);
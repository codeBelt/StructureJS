require(
    // The only purpose of this file is to kick off your application's top-level
    // controller at the appropriate time. All other code should be written as
    // separate modules in their own files.
    //
    // Note that since this is the application entry-point, traditional
    // RequireJS syntax is used here to specify dependencies. Do not use this
    // syntax in any other modules.
    [
        './App'
    ],
    function(
        App
    ) {
        'use strict';

        // Initialize
        window.app = new App();
        window.app.appendTo('#todoapp');// Need to specify what area our code has control over.
                                        // The App.js class extends Stage which has the appendTo method.
                                        // Note: On typical website you may want to set it as 'body' do you have control over the whole page.
    }
);

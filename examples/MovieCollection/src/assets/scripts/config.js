/**
 * Application configuration declaration.
 */
require.config({

    baseUrl: 'assets/scripts/',

    paths: {
        //main libraries
        jquery: '../vendor/jquery/dist/jquery',
        handlebars: '../vendor/handlebars/handlebars.runtime.min',
        structurejs: '../../../../../js/',
        templates: './templates'
    },

    shim: {
        jquery: {
            exports: '$'
        },
        handlebars: {
            exports: 'Handlebars'
        }
    }
});

/**
* Application configuration declaration.
*/
require.config({

    baseUrl: 'assets/scripts/',

    paths: {
        //main libraries
        jquery: '../vendor/jquery/jquery-1.9.1',
        lodash: '../vendor/lodash/lodash.compat',
        handlebars: '../vendor/handlebars/handlebars',
        structurejs: '../../../../src',

        //shortcut paths
        templates: '../templates',

        //require plugins
        text: '../vendor/require/text',
        tpl: '../vendor/require/tpl',
        json: '../vendor/require/json',
        hbs: '../vendor/require-handlebars-plugin/hbs'
    },

    shim: {
        jquery: {
            exports: '$'
        },
        lodash: {
            exports: '_'
        },
        handlebars: {
            exports: 'Handlebars'
        }
    },

    urlArgs: 'v=' + Date.now(),
    hbs: {
        helpers: true,
        i18n: false,
        templateExtension: 'html',
        partialsUrl: ''
    },
    deps: [
    ]
});
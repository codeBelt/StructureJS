/**
* Application configuration declaration.
*/
require.config({

    baseUrl: 'assets/scripts/',

    paths: {
        //main libraries
        jquery: '../vendor/jquery/jquery-1.9.1',
        lodash: '../vendor/lodash/lodash.compat',
        Handlebars: '../vendor/handlebars/handlebars-v1.3.0',
        eventListener: 'structurejs/plugin/jquery.eventListener',

        //shortcut paths
        templates: '../templates',
        data: '../data',

        //require plugins
        text: '../vendor/require/text',
        tpl: '../vendor/require/tpl',
        json: '../vendor/require/json',
        hbs: '../vendor/require-handlebars-plugin/hbs',

        //jquery plugins
        'bootstrap': '../vendor/bootstrap/bootstrap',

        //other plugins
        json2: '../vendor/json2'
    },

    shim: {
        jquery: {
            exports: '$'
        },
        'bootstrap': {
            deps: ['jquery']
        },
        lodash: {
            exports: '_'
        },
        json2: {
            exports: 'JSON'
        },
        Handlebars: {
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
        'json2',
        'Handlebars'
    ]
});
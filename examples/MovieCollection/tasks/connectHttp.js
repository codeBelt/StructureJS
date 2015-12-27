/*jshint node:true, laxbreak:true */
'use strict';

module.exports = function(grunt) {
    var shouldOpen = grunt.option('open');
    var path = require('path');
    //var mockApi = require('swagger-mock-api');

    grunt.config.merge({
        // Launches http-server
        connect: {
            connectHttp: {
                options: {
                    port: 9000,
                    useAvailablePort: true,
                    protocol: 'http',
                    base: 'web/',
                    livereload: true,
                    open: shouldOpen ? true : false, // opens a tab in your default browser e.g. grunt launch --open
                    //middleware: function(connect, options, middlewares) {
                    //    middlewares.push(mockApi({
                    //        swaggerFile: path.join(__dirname, '../swagger.yaml'),
                    //        watch: true
                    //    }));
                    //
                    //    return middlewares;
                    //}
                }
            }
        }
    });

    grunt.registerTask('connectHttp', [
        'connect:connectHttp'
    ]);
};

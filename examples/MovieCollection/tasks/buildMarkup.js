/*jshint node:true, laxbreak:true */
'use strict';

module.exports = function(grunt) {
    var shouldMinify = !grunt.option('dev');

    grunt.config.merge({

        // Replaces script and style tag references with a reference to a
        // single optimized output file.
        usemin: {
            buildMarkup: ['<%= env.DIR_DEST %>/index.html']
        },

        /**
         * Copy and needed files to the web folder.
         */
        copy: {
            buildMarkup: {
                files: [{
                    expand: true,
                    cwd: '<%= env.DIR_SRC %>/',
                    dest: '<%= env.DIR_DEST %>/',
                    src: [
                        'index.html'
                    ]
                }]
            }
        }

    });

    grunt.registerTask('buildMarkup',
        shouldMinify
            ? [
                'copy:buildMarkup',
                'usemin'
            ]
            : [
                'copy:buildMarkup'
            ]
    );
};

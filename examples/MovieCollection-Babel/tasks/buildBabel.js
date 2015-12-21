/*jshint node:true, laxbreak:true */
'use strict';

module.exports = function(grunt) {
    var remapify = require('remapify');
    var shouldMinify = !grunt.option('dev');

    // Help Grunt find the right plugins at runtime
    require('jit-grunt')(grunt, {
        useminPrepare: 'grunt-usemin'
    });

    // Clear out any previously generated usemin task configuration
    grunt.config.set('concat', undefined);
    grunt.config.set('uglify', undefined);

    grunt.config.merge({

        /**
         * Takes our CommonJS files and compiles them together.
         */
        browserify: {
            buildBabel: {
                options: {
                    preBundleCB: function(bundle) {
                        bundle.plugin(remapify, [{
                            cwd: './src/assets/vendor/structurejs/js',
                            src: '**/*.js',
                            expose: 'structurejs'
                        }]);
                    },
                    browserifyOptions: {
                        debug: shouldMinify ? false : true
                    },
                    transform: [['babelify', { stage: 0 }]]
                },
                files: {
                    '<%= env.DIR_TMP %>/assets/scripts/main.js': ['<%= env.DIR_SRC %>/assets/scripts/main.js']
                }
            }
        },

        // Searches for build comment blocks (`<!-- build:js -->`) and generates
        // the appropriate `concat` and `uglify` configuration.
        useminPrepare: {
            options: {
                root: '<%= env.DIR_TMP %>',
                staging: '<%= env.DIR_TMP %>',
                dest: '<%= env.DIR_DEST %>',
                flow: {
                    buildBabel: {
                        // Force js only
                        steps: { js: ['concat', 'uglifyjs'], css: [] },
                        post: {}
                    }
                }
            },
            buildBabel: ['<%= env.DIR_SRC %>/index.html']
        },

        concat: {
            options: {
                separator: ';'
            }
        },

        uglify: {
            options: {
                warnings: false,
                mangle: true
            }
        },

        // Copies static files for non-optimized builds
        copy: {
            buildBabelDev: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= env.DIR_SRC %>',
                        dest: '<%= env.DIR_DEST %>',
                        src: ['assets/vendor/**/*.{map,js}']
                    },
                    {
                        expand: true,
                        cwd: '<%= env.DIR_TMP %>',
                        dest: '<%= env.DIR_DEST %>',
                        src: ['assets/scripts/main.js']
                    }
                ]
            },
            buildBabelProd: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= env.DIR_SRC %>',
                        dest: '<%= env.DIR_TMP %>',
                        src: ['assets/vendor/**/*.{map,js}']
                    }
                ]
            }
        }

    });

    grunt.registerTask('scrub:buildBabel', function() {
        function scrub(name) {
            var config = JSON
                .stringify(grunt.config.get(name))
                .replace(/\?v=@@version/g, '');

            grunt.config.set(name, JSON.parse(config));
        }

        scrub('concat');
        scrub('uglify');
    });

    grunt.registerTask('buildBabel',
        shouldMinify
            ? [
            'browserify:buildBabel',
            'copy:buildBabelProd',
            'useminPrepare:buildBabel',
            'scrub:buildBabel',
            'concat:generated',
            'uglify:generated'
        ]
            : [
            'browserify:buildBabel',
            'copy:buildBabelDev'
        ]
    );

};

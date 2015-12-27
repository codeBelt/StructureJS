/*jshint node:true, laxbreak:true */
'use strict';

module.exports = function(grunt) {
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
            buildTypeScript: {
                options: {
                    preBundleCB: function(bundle) {
                        bundle.plugin('tsify', {
                            removeComments: false,
                            noImplicitAny: false,
                            target: 'ES5'
                        });
                    },
                    browserifyOptions: {
                        debug: shouldMinify ? false : true
                    }
                },
                files: {
                    '<%= env.DIR_TMP %>/assets/scripts/main.js': ['<%= env.DIR_SRC %>/assets/scripts/main.ts']
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
                    buildTypeScript: {
                        // Force js only
                        steps: { js: ['concat', 'uglifyjs'], css: [] },
                        post: {}
                    }
                }
            },
            buildTypeScript: ['<%= env.DIR_SRC %>/index.html']
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
            buildTypeScriptDev: {
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
            buildTypeScriptProd: {
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

    grunt.registerTask('scrub:buildTypeScript', function() {
        function scrub(name) {
            var config = JSON
                .stringify(grunt.config.get(name))
                .replace(/\?v=@@version/g, '');

            grunt.config.set(name, JSON.parse(config));
        }

        scrub('concat');
        scrub('uglify');
    });

    grunt.registerTask('buildTypeScript',
        shouldMinify
            ? [
            'browserify:buildTypeScript',
            'copy:buildTypeScriptProd',
            'useminPrepare:buildTypeScript',
            'scrub:buildTypeScript',
            'concat:generated',
            'uglify:generated'
        ]
            : [
            'browserify:buildTypeScript',
            'copy:buildTypeScriptDev'
        ]
    );

};

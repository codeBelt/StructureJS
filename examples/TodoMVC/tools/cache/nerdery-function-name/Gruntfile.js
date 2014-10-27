/*jshint node:true */
'use strict';

module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt);
    require('time-grunt')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        browserify: {
            build: {
                options: {
                    standalone: '<%= pkg.name %>'
                },
                src: ['lib/FunctionName.js'],
                dest: '<%= pkg.name %>.js'
            },

            test: {
                options: {
                    debug: true
                },
                src: ['test/**/*-test.js'],
                dest: 'test/all.js'
            }
        },

        clean: {
            installed: ['node_modules'],

            built: [
                '<%= pkg.name %>.js',
                'test/all.js'
            ]
        },

        jshint: {
            options: {
                force: true // warn, don't block
            },
            all: [
                'Gruntfile.js',
                'lib/**/*.js',
                'test/**/*-test.js'
            ]
        },

        simplemocha: {
            options: {
                reporter: 'spec'
            },

            all: ['test/all.js']
        },

        watch: {
            options: {
                livereload: true
            },

            all: {
                files: [
                    'lib/**/*.js',
                    'test/**/*.test.js'
                ],
                tasks: ['js']
            }
        }
    });

    // Tasks
    grunt.registerTask('default', ['lint', 'build', 'test']);
    grunt.registerTask('lint', ['jshint']);
    grunt.registerTask('build', ['clean:built', 'browserify']);
    grunt.registerTask('test', ['simplemocha']);
};

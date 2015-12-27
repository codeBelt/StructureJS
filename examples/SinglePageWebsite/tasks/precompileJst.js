/*jshint node:true, laxbreak:true */
'use strict';

module.exports = function(grunt) {
    var pkg = require('../package.json');
    var shouldMinify = !grunt.option('dev');

    grunt.config.merge({
        // Injects version number.
        'string-replace': {
            precompileJst: {
                options: {
                    replacements: [{
                        pattern: /@@version/g,
                        replacement: pkg.version
                    }]
                },
                files: [{
                    expand: true,
                    cwd: '<%= env.DIR_SRC %>/templates/precompile/',
                    dest: '<%= env.DIR_TMP %>/templates/precompile/',
                    src: ['**/*.hbs']
                }]
            }
        },

        handlebars: {
            precompileJst: {
                options: {
                    //amd: ['handlebars'],
                    namespace: 'JST',
                    // Registers all files that start with '_' as a partial.
                    partialRegex: /^_/,
                    // Shortens the file path for the templates.
                    processName: function(filePath) { // input:  src/templates/_header.hbs
                        return filePath.slice(filePath.indexOf('template'), filePath.lastIndexOf('.')); // output: templates/_header
                    },
                    // Shortens the file path for the partials.
                    processPartialName: function(filePath) { // input:  src/templates/_header.hbs
                        return filePath.slice(filePath.indexOf('template'), filePath.lastIndexOf('.')); // output: templates/_header
                    }
                },
                files: {
                    '<%= env.DIR_TMP %>/assets/scripts/precompiledJst.js': '<%= env.DIR_TMP %>/templates/precompile/**/*.hbs'
                }
            }
        },

        // Compiles Handlebars hbs templates into JavaScript (JST)
        copy: {
            precompileJst: {
                files: [{
                    expand: true,
                    cwd: '<%= env.DIR_TMP %>/',
                    dest: '<%= env.DIR_DEST %>/',
                    src: ['assets/scripts/precompiledJst.js']
                }]
            }
        }

    });

    grunt.registerTask('precompileJst',
        shouldMinify
            ? [
            'string-replace:precompileJst',
            'handlebars:precompileJst'
        ]
            : [
            'string-replace:precompileJst',
            'handlebars:precompileJst',
            'copy:precompileJst'
        ]
    );
};

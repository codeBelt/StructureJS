/*jshint node:true, laxbreak:true */
'use strict';

module.exports = function(grunt) {

    var remapify = require('remapify');

    // -- Plugins --------------------------------------------------------------

    // Intelligently autoloads `grunt-*` plugins from the package dependencies.
    require('load-grunt-tasks')(grunt);

    // Adds better support for defining options.
    require('nopt-grunt')(grunt);

    // Uncomment the next line to have grunt report the time it takes for tasks
    // to run so targets for optimization may be identified.
    // require('time-grunt')(grunt);

    // -- Options --------------------------------------------------------------

    grunt.initOptions({
        prod: {
            info: 'Whether this is a production build.',
            type: Boolean
        },
        stage: {
            info: 'Whether this is a staging build.',
            type: Boolean
        },
        maps: {
            info: 'Whether to generate source maps for compressed files.',
            type: Boolean
        }
    });

    // All builds are considered to be development builds, unless they're not.
    grunt.option('dev', !grunt.option('prod') && !grunt.option('stage'));

    // -- Configuration --------------------------------------------------------

    grunt.initConfig({

        // -- Metadata ---------------------------------------------------------

        // This will load the `package.json` file so we can have access to the
        // project metadata such as name and version number.
        pkg: require('./package.json'),

        // This will load the `build-env.js` file so we can have access to the
        // project environment configuration and constants.
        env: require('./build-env'),

        // A comment block that will be prefixed to all our minified code files.
        // Gets the name and version from the above loaded `package.json` file.
        // How to use: '<%= banner %>'
        banner: [
            '/*!',
            ' * <%= pkg.name %> v<%= pkg.version %>' + (grunt.option('dev') ? ' (dev)' : ''),
            ' * <%= pkg.description %>',
            ' *',
            ' * Build Date: <%= grunt.template.today("yyyy-mm-dd") %>',
            ' */\n'
        ].join('\n'),

        // -- Utility Tasks ----------------------------------------------------

        // Automatically removes generated files and directories. Useful for
        // rebuilding the project with fresh copies of everything.
        clean: {
            options: {
                force: '<%= env.UNSAFE_MODE %>'
            },
            dest: ['<%= env.DIR_DEST %>'],
            docs: ['<%= env.DIR_DOCS %>'],
            tmp: ['<%= env.DIR_TMP %>'],
            installed: [
                'tools/node-*',
                '<%= env.DIR_BOWER %>',
                '<%= env.DIR_NPM %>'
            ]
        },

        // Copies any files that should be moved to the destination directory
        // that are not already handled by another task.
        copy: {
            media: {
                files: [{
                    expand: true,
                    cwd: '<%= env.DIR_SRC %>',
                    src: ['assets/media/**', 'assets/vendor/todomvc-common/bg.png'],
                    dest: '<%= env.DIR_DEST %>'
                }]
            },
            server: {
                files: [{
                    expand: true,
                    cwd: '<%= env.DIR_SRC %>',
                    src: [
                        '**/*.{php,rb,py,jsp,asp,aspx,cshtml,txt}',
                        '!assets/vendor/**'
                    ],
                    dest: '<%= env.DIR_DEST %>'
                }]
            },
            markup: {
                files: [{
                    expand: true,
                    cwd: '<%= env.DIR_SRC %>',
                    dest: '<%= env.DIR_DEST %>',
                    src: ['**/*.html', '!assets/vendor/**']
                }]
            },
            styles: {
                files: [{
                    expand: true,
                    cwd: '<%= env.DIR_SRC %>',
                    dest: '<%= env.DIR_DEST %>',
                    src: [
                        'assets/{styles,vendor}/**/*.css',
                        '!assets/vendor/structurejs/**/*.css'
                    ]
                }]
            }
        },

        concat: {
            options: {
            },
            templates: {
                src: ['<%= env.DIR_SRC %>/assets/scripts/compiled/templates.tmpl.js', '<%= env.DIR_DEST %>/assets/scripts/main.js'],
                dest: '<%= env.DIR_DEST %>/assets/scripts/main.js'
            }
        },

        // Searches for bower comment blocks (`<!-- bower:* -->`) and injects
        // script and style tag references to bower modules into markup.
        bowerInstall: {
            all: {
                ignorePath: '<%= env.DIR_SRC %>/',
                src: ['<%= env.DIR_SRC %>/**/*.html']
            }
        },

        // Searches for build comment blocks (`<!-- build:* -->`) and generates
        // the appropriate `concat`, `cssmin`, and `uglify` grunt configuration.
        useminPrepare: {
            options: {
                root: '<%= env.DIR_SRC %>',
                staging: '<%= env.DIR_TMP %>',
                dest: '<%= env.DIR_DEST %>'
            },
            html: ['<%= env.DIR_SRC %>/**/*.html']
        },

        // Replaces script and style tag references with a reference to a single
        // optimized output file.
        usemin: {
            html: ['<%= env.DIR_DEST %>/**/*.html']
        },

        // YUIDoc plugin that will generate our JavaScript documentation.
        yuidoc: {
            compile: {
                name: '<%= pkg.name %>',
                description: '<%= pkg.description %>',
                version: '<%= pkg.version %>',
                url: '<%= pkg.homepage %>',
                options: {
                    paths: '<%= env.DIR_SRC %>',
                    outdir: '<%= env.DIR_DOCS %>'
                }
            }
        },

        // -- Lint Tasks -------------------------------------------------------

        // Verifies that style files conform to our standards.
        csslint: {
            options: {
                csslintrc: '.csslintrc'
            },
            all: {
                src: [
                    '<%= env.DIR_DEST %>/assets/styles/**/*.css'
                ]
            }
        },

        // Verifies that script files conform to our standards.
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            all: {
                src: [
                    'Gruntfile.js',
                    '<%= env.DIR_SRC %>/assets/scripts/**/*.js'
                ]
            }
        },

        // -- Style Tasks ------------------------------------------------------

        cssmin: {
            options: {
                banner: '<%= banner %>'
            }
        },

        // -- Script Tasks -----------------------------------------------------

        browserify: {
            //options: {
            //    debug: grunt.option('maps'),
            //    transform: [
            //        'debowerify',
            //        'decomponentify',
            //        'deamdify',
            //        'deglobalify'
            //    ],
            //    shim: {
            //
            //    }
            //},
            all: {
                options: {
                    preBundleCB: function(bundle) {
                        // Creates a CommonJS module around the script(s) in the file.
                        //bundle.require('./src/assets/scripts/templates.js');
                        // Creates a alias for a library that is already CommonJS.
                        bundle.plugin(remapify, [{
                            cwd: './src/assets/vendor/structurejs/js',
                            src: '**/*.js',
                            expose: 'structurejs'
                        }]);
                    },
                    postBundleCB: function(err, src, next) {
                        next(err, grunt.config.process('<%= banner %>') + src);
                    }
                },
                files: [{
                    expand: true,
                    cwd: '<%= env.DIR_SRC %>',
                    dest: '<%= env.DIR_DEST %>',
                    src: ['assets/scripts/main.js']
                }]
            }
        },

        /**
         * Compiles the Handlebars templates into Javascript.
         * http://handlebarsjs.com/
         */
        handlebars: {
            compile: {
                options: {
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
                    '<%= env.DIR_SRC %>/assets/scripts/compiled/templates.tmpl.js': ['<%= env.DIR_SRC %>/assets/templates/**/*.hbs']
                }
            }
        },

        // -- Task Helpers -----------------------------------------------------

        // Instead of running a server preprocessor, files and directories may
        // be watched for changes and have associated tasks run automatically
        // when you save your changes. This is compatible with the LiveReload
        // api, so you may use their free browser extensions to reload pages
        // after watch tasks complete. No purchase neccessary:
        // http://go.livereload.com/extensions
        watch: {
            options: {
                event: 'all',
                livereload: true
            },
            grunt: {
                files: ['Gruntfile.js'],
                tasks: ['build']
            },
            media: {
                files: ['<%= env.DIR_SRC %>/assets/media/**'],
                tasks: ['media']
            },
            server: {
                files: ['<%= env.DIR_SRC %>/**/*.{php,rb,py,jsp,asp,aspx,cshtml,txt}'],
                tasks: ['server']
            },
            markup: {
                files: ['<%= env.DIR_SRC %>/**/*.html'],
                tasks: ['markup']
            },
            styles: {
                files: ['<%= env.DIR_SRC %>/assets/{styles,vendor}/**/*.css'],
                tasks: ['styles']
            },
            scripts: {
                files: ['<%= env.DIR_SRC %>/assets/{scripts,vendor}/**/*.js'],
                tasks: ['scripts']
            }
        }
    });

    // -- Tasks ----------------------------------------------------------------
    if (grunt.option('dev')) {
        // Define the default task for development.
        // Run `grunt`
        grunt.registerTask('default', ['build']);
    }
    else if (grunt.option('stage')) {
        // Default task for staging.
        // Run `grunt --stage`
        grunt.registerTask('default', ['build']);
    }
    else if (grunt.option('prod')) {
        // Default task for production.
        // Run `grunt --prod`
        grunt.registerTask('default', ['build', 'docs']);
    }

    // Install task. Handles tasks that should happen right after npm and bower
    // modules are installed or updated. Run with `grunt install`.
    grunt.registerTask('install', ['bowerInstall']);

    // Custom tasks. 
    // Can be referenced from `watch` tasks
    // May also be run manually with `grunt [task-name]`
    grunt.registerTask('build', ['clean:dest', 'media', 'server', 'markup', 'styles', 'scripts', 'clean:tmp']);
    grunt.registerTask('lint', ['force:on', 'csslint', 'jshint', 'force:reset']);
    grunt.registerTask('docs', ['clean:docs', 'yuidoc', 'clean:tmp']);
    grunt.registerTask('media', ['copy:media']);
    grunt.registerTask('server', ['copy:server']);
    grunt.registerTask('markup', ['copy:markup']);
    if (grunt.option('dev')) {
        grunt.registerTask('styles', ['copy:styles']);
    } else {
        grunt.registerTask('styles', ['useminPrepare', 'concat', 'cssmin', 'usemin']);
    }
    grunt.registerTask('scripts', ['handlebars', 'browserify']);
};

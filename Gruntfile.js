module.exports = function(grunt) {

    // Load Grunt tasks declared in the package.json file.
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    // Project configuration.
    grunt.initConfig({

        /**
         * This will load in our package.json file so we can have access
         * to the project name and appVersion number.
         */
        pkg: grunt.file.readJSON('package.json'),

        /**
         * Constants for the Gruntfile so we can easily change the path for our environments.
         */
        BASE_PATH: '',
        DEVELOPMENT_PATH: 'src/',
        PRODUCTION_PATH: 'web/',

        /**
         * A code block that will be added to our minified code files.
         * Gets the name and appVersion and other info from the above loaded 'package.json' file.
         * @example <%= banner.join("\\n") %>
         */
        banner: [
                 '/*',
                 '* Project: <%= pkg.name %>',
                 '* Version: <%= pkg.appVersion %> (<%= grunt.template.today("yyyy-mm-dd") %>)',
                 '* Development By: <%= pkg.developedBy %>',
                 '* Copyright(c): <%= grunt.template.today("yyyy") %>',
                 '*/'
        ],

        /**
         * The different constant names that will be use to build our html files.
         * @example <!-- @if NODE_ENV == 'DEVELOPMENT' -->
         */
        env: {
            src: {
                NODE_ENV : 'DEVELOPMENT'
            },
            web : {
                NODE_ENV : 'PRODUCTION'
            }
        },

        /**
         * Allows us to pass in variables to files that have place holders so we can similar files with different data.
         * This plugin works with the 'env' plugin above.
         * @example <!-- @echo appVersion --> or <!-- @echo filePath -->
         */
        preprocess : {
            // Task to create the index.html file that will be used during development.
            // Passes the app version and creates the /index.html
            src : {
                src : '<%= DEVELOPMENT_PATH %>' + 'config.html',
                dest : '<%= DEVELOPMENT_PATH %>' + 'index.html',
                options : {
                    context : {
                        appVersion : '<%= pkg.appVersion %>',
                        filePath: ''
                    }
                }
            },
            // Task to create the index.html file that will be used in production.
            // Passes the app version and creates the /index.html
            web : {
                src : '<%= DEVELOPMENT_PATH %>' + 'config.html',
                dest : '<%= PRODUCTION_PATH %>' + 'index.html',
                options : {
                    context : {
                        appVersion : '<%= pkg.appVersion %>',
                        filePath: ''
                    }
                }
            }
        },

        /**
         * Cleans or deletes our production folder before we create a new production build.
         */
        clean: {
            dist: ['<%= PRODUCTION_PATH %>']
        },

        /**
         * Copies certain files over from the development folder to the production folder so we don't have to do it manually.
         */
        copy: {
            web:  {
                files: [
                    // Copy favicon.ico file from development to production
                    { expand: true, cwd: '<%= DEVELOPMENT_PATH %>', src: 'favicon.ico', dest: '<%= PRODUCTION_PATH %>' },
                    // Copy the media folder from development to production
                    { expand: true, cwd: '<%= DEVELOPMENT_PATH %>', src: ['assets/media/**'], dest: '<%= PRODUCTION_PATH %>' },
                    // Copy the index.html file from development to production
                    { expand: true, cwd: '<%= DEVELOPMENT_PATH %>', dest: '<%= PRODUCTION_PATH %>', src: ['index.html'], filter: 'isFile', dot: true },
                    // Copy require.js file from development to production
                    { expand: true, cwd: '<%= DEVELOPMENT_PATH %>' + 'assets/vendor/require/', src: 'require.js', dest: '<%= PRODUCTION_PATH %>' + 'assets/scripts/' }
                ]
            }
        },

        /**
         * Prepends the banner above to the minified files.
         */
        usebanner: {
            dist: {
                options: {
                    position: 'top',
                    banner: '<%= banner.join("\\n") %>',
                    linebreak: true
                },
                files: {
                    src: [
                        '<%= PRODUCTION_PATH %>' + 'assets/scripts/app.min.js',
                        '<%= PRODUCTION_PATH %>' + 'assets/styles/app.min.css'
                    ]
                }
            }
        },

        /**
         * The useminPrepare part of the usemin plugin looks at the html file and checks for a build:js or build:css code block.
         * It will take those files found in the code block(s) and concat them together and then runs uglify for js and/or cssmin for css files.
         * useminPrepare requires grunt-contrib-uglify, grunt-contrib-concat, and grunt-contrib-cssmin plugins to be installed. Which is listed in the package.json file.
         *
         * The usemin part will remove the code block(s) and replace that area with the single file path in the html file.
         */
        useminPrepare: {
            html: ['<%= DEVELOPMENT_PATH %>' + 'index.html'],
            options: {
                dest: '<%= PRODUCTION_PATH %>'// Moves the single concatenated files to production.
            }
        },
        usemin: {
            html: ['<%= PRODUCTION_PATH %>' + 'index.html'],
            options: {
                dirs: ['<%= PRODUCTION_PATH %>']
            }
        },

        /**
         * The RequireJS plugin that will use uglify2 to build and minify our JavaScript,
         * templates and any other data we include in the require files.
         */
        requirejs: {
            compile: {
                options: {
                    baseUrl: '<%= DEVELOPMENT_PATH %>' + 'assets/scripts/',                         // Path of source scripts, relative to this build file
                    mainConfigFile: '<%= DEVELOPMENT_PATH %>' + 'assets/scripts/config.js',         // Path of shared configuration file, relative to this build file
                    name: 'AppBootstrap',                                                           // Name of input script (.js extension inferred)
                    out: '<%= PRODUCTION_PATH %>' + 'assets/scripts/app.min.js',                    // Path of built script output

                    fileExclusionRegExp: /.svn/,                                                    // Ignore all files matching this pattern
                    useStrict: true,
                    preserveLicenseComments: false,
                    pragmas: {
                        debugExclude: true
                    },

                    optimize: 'uglify2',                                                            // Use 'none' If you do not want to uglify.
                    uglify2: {
                        output: {
                            beautify: false,
                            comments: false
                        },
                        compress: {
                            sequences: false,
                            global_defs: {
                                DEBUG: false
                            }
                        },
                        warnings: false,
                        mangle: true
                    }
                }
            }
        },

        /**
         * Removes all comments from the production index.html file. I can also remove all whitespace if desired.
         */
        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: false
                },
                files: {
                    '<%= PRODUCTION_PATH %>index.html': '<%= PRODUCTION_PATH %>' + 'index.html'
                }
            }
        },

        /**
         * Creates a Cache Manifest file.
         */
        manifest: {
            generate: {
                options: {
                    basePath: '<%= PRODUCTION_PATH %>',
                    exclude: [
                        'assets/media/images/moblie-icons/icon-144x144.png',
                        'assets/media/images/moblie-icons/icon-100x100.png',
                        'assets/media/images/moblie-icons/icon-29x29.png',
                        'assets/media/images/moblie-icons/icon-50x50.png',
                        'assets/media/images/moblie-icons/icon-58x58.png',
                        'assets/media/images/moblie-icons/icon-72x72.png'
                    ],
                    preferOnline: false,
                    verbose: true,
                    timestamp: true,
                    master: []
                },
                src: [
                    'assets/data/**/*.json',
                    'assets/media/images/**/*.jpg',
                    'assets/media/images/**/*.png',
                    'assets/scripts/**/*.js',
                    'assets/styles/**/*.css'
                ],
                dest: '<%= PRODUCTION_PATH %>' + 'offline.appcache'
            }
        },

        /**
         * YUIDoc plugin that will generate documentation from our YUI comments.
         */
        yuidoc: {
            compile: {
                name: '<%= pkg.name %>',
                description: '<%= pkg.description %>',
                version: '<%= pkg.appVersion %>',
                url: '<%= pkg.homepage %>',
                options: {
                    paths: '<%= DEVELOPMENT_PATH %>' + 'assets/scripts/structurejs/',
                    outdir: '<%= BASE_PATH %>docs',
                    themedir: 'friendly-theme',
                    extension: '.js',                                   // Default '.js' <comma-separated list of file extensions>
                    exclude: ''
                }
            }
        },

        /**
         * Creates a node.js Express Server to test our code in a server like environment.
         * Note: We are using the watch task to keep the server running.
         */
        express: {
            src: {
                options: {
                    port: 8000,
                    hostname: "0.0.0.0",
                    bases: ['<%= DEVELOPMENT_PATH %>'],
                    livereload: true
                }
            },
            web: {
                options: {
                    port: 8001,
                    hostname: "0.0.0.1",
                    bases: ['<%= PRODUCTION_PATH %>'],
                    livereload: true
                }
            }
        },

        /**
         * Opens the index.html file in the default browser after the node.js Express Server is running.
         */
        open: {
            src: {
                // Gets the port from the connect configuration
                path: 'http://localhost:<%= express.src.options.port%>'
            },
            web: {
                // Gets the port from the connect configuration
                path: 'http://localhost:<%= express.web.options.port%>'
            }
        },

        /**
         * Watches files and will run task(s) when files are changed. It will also reload/refresh the browser.
         */
        watch: {
            css: {
                options: {
                    livereload: true
                },
                files: [
                    '<%= DEVELOPMENT_PATH %>' + 'assets/styles/**/*.css',
                ]
            },
            src: {
                options: {
                    livereload: true
                },
                files: [
                    '<%= DEVELOPMENT_PATH %>' + 'assets/scripts/**/*.ts',
                    '<%= DEVELOPMENT_PATH %>' + 'config.html',
                    '<%= DEVELOPMENT_PATH %>' + 'assets/templates/**/*.hbs'
                ],
                tasks: ['src']
            }
        }

    });

    /**
     * Grunt tasks:
     *
     * grunt        (Will build and run your development code/server)
     * grunt web    (Will build and run your production code/server)
     * grunt doc    (Will generate the YUI documentation from the code comments)
     */
    grunt.registerTask('default', [
        'server'
    ]);

    grunt.registerTask('server', [
        'src',
        'express:src',
        'open:src',
        'watch'
    ]);

    grunt.registerTask('src', [
        'env:src',
        'preprocess:src'
    ]);

    grunt.registerTask('web', [
        'env:web',
        'preprocess',
        'clean',
        'copy',
        'useminPrepare', 'concat', 'cssmin',
        'usemin',
        'requirejs',
        'usebanner',
        'htmlmin',
        'manifest',
        'open:web',
        'express:web',
        'express-keepalive'
    ]);

    grunt.registerTask('docs', [
        'yuidoc'
    ]);

};
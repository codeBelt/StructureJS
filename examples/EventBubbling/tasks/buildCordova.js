/*jshint node:true, laxbreak:true */
'use strict';

module.exports = function(grunt) {
    grunt.config.merge({

        clean: {
            options: {
                force: '<%= env.UNSAFE_MODE %>'
            },
            buildCordova: ['<%= env.DIR_CORDOVA%>/www' + '**/*']
        },

        copy: {
            buildCordova: {
                files: [{
                    expand: true,
                    cwd: '<%= env.DIR_DEST %>',
                    dest: '<%= env.DIR_CORDOVA%>/www',
                    src: ['**/*', '!*.html', 'index.html']
                }]
            }
        },

        cordovacli: {
            options: {
                path: '<%= env.DIR_CORDOVA %>',
                cli: 'cordova'
            },
            cordova: {
                options: {
                    command: ['platform', 'plugin', 'build', 'emulate', 'prepare', 'compile', 'run'],
                    platforms: ['ios','android'],
                    plugins: ['device','dialogs'],
                    path: '<%= env.DIR_WWW %>',
                    id: 'com.medtronic.mycarelinksmartdemo',
                    name: 'HelloCordova'
                }
            },
            add_platforms: {
                options: {
                    command: 'platform',
                    action: 'add',
                    platforms: '<%= pkg.cordova.platforms %>'
                }
            },
            remove_platforms: {
                options: {
                    command: 'platform',
                    action: 'remove',
                    platforms: ['ios', 'android']
                }
            },
            add_plugins: {
                options: {
                    command: 'plugin',
                    action: 'add',
                    plugins: '<%= pkg.cordova.plugins %>'
                }
            },
            remove_plugins: {
                options: {
                    command: 'plugin',
                    action: 'rm',
                    plugins: '<%= pkg.cordova.plugins %>'
                }
            },
            build: {
                options: {
                    command: 'build',
                    platforms: ['ios', 'android']
                }
            },
            prepare: {
                options: {
                    command: 'prepare',
                    platforms: ['ios', 'android']
                }
            },
            emulate_android: {
                options: {
                    command: 'emulate',
                    platforms: ['android'],
                    //args: ['--target', 'Nexus5']
                }
            },
            emulate_ios: {
                options: {
                    command: 'emulate',
                    platforms: ['ios'],
                    args: ['--target','iPad-2'],
                    //args: ['--target','iPhone-5'] //['iPhone-4s', 'iPhone-4s, 7.1', 'iPhone-5', 'iPhone-5s', 'iPhone-6-Plus', 'iPhone-6', 'iPad-2', 'iPad-Retina', 'iPad-Air', 'Resizable-iPhone', 'Resizable-iPad']
                }
            },
            run_android: {
                options: {
                    command: 'run',
                    platforms: ['android']
                }
            },
            run_ios: {
                options: {
                    command: 'run',
                    platforms: ['ios']
                }
            }
        },

        weinre: {
            dev: {
                options: {
                    httpPort: 8082,
                    boundHost: '-all-'
                }
            }
        }

    });

    grunt.registerTask('buildCordova', [
        'clean:buildCordova',
        'copy:buildCordova',
        'buildCordova:build'
    ]);

    //grunt.registerTask('buildCordova:ripple', 'Runs the Ripple browser for developing' , function() {
    //    if (grunt.option('android')) {
    //        grunt.task.run('build', 'shell:prepare', 'shell:rippleAndroid');
    //    } else {
    //        grunt.task.run('build', 'shell:prepare', 'shell:rippleIOS');
    //    }
    //});
    //
    //grunt.registerTask('buildCordova:weinre', 'TODO:',
    //    ['weinre']
    //);
    //
    //grunt.registerTask('buildCordova:init', 'TODO:',
    //    ['cordovacli:add_plugins']
    //);

    grunt.registerTask('buildCordova:add', 'TODO:', [
        'cordovacli:add_plugins',
        'cordovacli:add_platforms'
    ]);

    grunt.registerTask('buildCordova:remove', 'TODO:', [
        'clean:buildCordova',
        'cordovacli:remove_plugins',
        'cordovacli:remove_platforms'
    ]);

    grunt.registerTask('buildCordova:prepare', 'TODO:', [
        'clean:buildCordova',
        'copy:buildCordova',
        'cordovacli:prepare'
    ]);

    grunt.registerTask('buildCordova:build', 'TODO:', [
        'clean:buildCordova',
        'copy:buildCordova',
        'cordovacli:build'
    ]);

    grunt.registerTask('buildCordova:emulate', 'Runs the emulator for developing' , function() {
        if (grunt.option('android')) {
            grunt.task.run('cordovacli:emulate_android');
        } else {
            grunt.task.run('cordovacli:emulate_ios');
        }
    });

    grunt.registerTask('buildCordova:run', 'Runs the app on a device' , function() {
        if (grunt.option('android')) {
            grunt.task.run('cordovacli:run_android');
        } else {
            grunt.task.run('cordovacli:run_ios');
        }
    });

};

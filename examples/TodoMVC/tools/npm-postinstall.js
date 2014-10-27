/*jshint node:true */
'use strict';

var path = require('path');
var shell = require('shelljs');

shell.cp('-R',
    path.resolve(__dirname, 'cache/nerdery-yuidoc-theme'),
    path.resolve(__dirname, '../node_modules')
);

shell.chmod(770, path.resolve(__dirname, '../build.sh'));
shell.chmod(770, path.resolve(__dirname, 'node-install.sh'));
shell.chmod(770, path.resolve(__dirname, 'node-uninstall.sh'));
shell.chmod(770, path.resolve(__dirname, 'node-standalone-install.sh'));
shell.chmod(770, path.resolve(__dirname, 'node-standalone-uninstall.sh'));

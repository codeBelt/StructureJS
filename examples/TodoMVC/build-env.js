'use strict';

/**
 * Environment constants.
 *
 * This configuration file contains all of the environment-specific values
 * needed to build a working website.
 *
 * @class Config
 * @static
 */
var Config = {

    /**
     * Path where Node.js modules are installed. No trailing slash.
     *
     * @property DIR_NPM
     * @type string
     */
    DIR_NPM: 'node_modules',

    /**
     * Path where Bower components are installed. No trailing slash.
     *
     * @property DIR_BOWER
     * @type string
     */
    DIR_BOWER: 'src/assets/vendor',

    /**
     * Path to uncompiled source files. No trailing slash.
     *
     * @property DIR_SRC
     * @type string
     */
    DIR_SRC: 'src',

    /**
     * Path to temporary directory (for multi-pass compilation). No trailing slash.
     *
     * @property DIR_TMP
     * @type string
     */
    DIR_TMP: '.tmp',

    /**
     * Path to compiled output files. No trailing slash.
     *
     * @property DIR_DEST
     * @type string
     */
    DIR_DEST: 'web',

    /**
     * Path to documentation output files. No trailing slash.
     *
     * @property DIR_DOCS
     * @type string
     */
    DIR_DOCS: 'docs'

};

module.exports = Config;

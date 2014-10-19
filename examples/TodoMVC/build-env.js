'use script';

/**
 * Environment constants.
 *
 * This configuration file contains all of the environment-specific values
 * needed to build a working website. The common values should be committed to
 * the `env.js-dist` file. A non-committed environment-specific copy of the file
 * should then be made to setup production, staging, and sandboxes as needed.
 *
 * @class Config
 * @static
 */
var Config = {
    /**
     * The canonical address of the website. No trailing slash. Protocol may be
     * omitted (http://www.paulirish.com/2010/the-protocol-relative-url/).
     *
     * @property URL_SITE
     * @type String
     */
    URL_SITE: '//www.example.com',       // protocol-relative address
//  URL_SITE: 'https://www.example.com', // absolute address

    /**
     * The base path of the website. Trailing slashes should be included for any
     * path other than an empty page-relative value.
     *
     * @property URL_BASE
     * @type String
     */
    URL_BASE: '',                       // page-relative base path
//  URL_BASE: '/',                      // root-relative base path
//  URL_BASE: '/foo/bar/',              // root-directory-relative base path
//  URL_BASE: '//www.example.com/foo/', // absolute base path

    /**
     * Path where Node.js modules are installed. No traling slash.
     *
     * @property DIR_NPM
     * @type String
     */
    DIR_NPM: 'node_modules',

    /**
     * Path where Bower components are installed. No traling slash.
     *
     * @property DIR_BOWER
     * @type String
     */
    DIR_BOWER: 'src/assets/vendor',

    /**
     * Path to uncompiled source files. No traling slash.
     *
     * @property DIR_SRC
     * @type String
     */
    DIR_SRC: 'src',

    /**
     * Path to temporary directory (for multi-pass compilation). No traling slash.
     *
     * @property DIR_TMP
     * @type String
     */
    DIR_TMP: '.tmp',

    /**
     * Path to compiled output files. No traling slash.
     *
     * @property DIR_DEST
     * @type String
     */
    DIR_DEST: 'web',

    /**
     * Path to documentation output files. No traling slash.
     *
     * @property DIR_DOCS
     * @type String
     */
    DIR_DOCS: 'docs',

    /**
     * DANGER: Whether the Gruntfile should be allowed to modify directories
     * outside of the current working directory (CDW). Should only be enabled
     * if you understand the effects and repercussions. Useful when building
     * in environments where only the contents of DIR_DEST should be publicly
     * accessible.
     *
     * @property UNSAFE_MODE
     */
    UNSAFE_MODE: false
};

module.exports = Config;

/* global window, requirejs */

;(function(){

  // Getting test file list from Karma so we an 
  var tests = [];
  for (var file in window.__karma__.files) {
    if (/Spec\.js$/.test(file)) {
      tests.push(file);
    }
  }

  // require js uses relative paths to this is necessary to avoid
  // timestamp errors when running karma
  for (file in window.__karma__.files) {
    window.__karma__.files[file.replace(/^\//, '')] = window.__karma__.files[file];
  }

  // Trying to get proper require src folder based on loaded files
  var srcDir = 'base';
  for (file in window.__karma__.files) {
    var regexp = /\/config.js$/;
    if(regexp.test(file)) {
      srcDir = file.replace(regexp, '').replace(/^\//, '');
      break;
    }
  }

  requirejs.config({
    baseUrl: srcDir,
    // ask Require.js to load these files (all our tests)
    deps: tests,
    // this will run loaded tests
    callback: window.__karma__.start
  });

})();

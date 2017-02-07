const path = require('path');
const gulp = require('gulp');
const handlebars = require('gulp-handlebars');
const wrap = require('gulp-wrap');
const declare = require('gulp-declare');
const concat = require('gulp-concat');
const merge = require('merge-stream');
const gulpIf = require('gulp-if');
const slash = require('slash');


gulp.task('buildJST', (done) => {
    const isAMD = false;
    const destPath = (isAMD === true && isProd === true) ? env.DIR_SRC : env.DIR_DEST;

    // Compile partials: Assume all partials start with an underscore
    const partials = gulp
        .src(env.DIR_SRC + '/templates/jst/**/_*.*')
        .pipe(handlebars({
            handlebars: require('handlebars')
        }))
        .pipe(wrap('Handlebars.registerPartial(<%= processPartialName(file.relative) %>, Handlebars.template(<%= contents %>));', {}, {
            processPartialName: (fileName) => {
                // Strip the extension and the underscore. Escape the output with JSON.stringify
                return JSON.stringify(path.basename(fileName, '.js').substr(1));
            }
        }));

    // Compile templates
    const templates = gulp
        .src(env.DIR_SRC + '/templates/jst/**/[^_]*.*')
        .pipe(handlebars({
            handlebars: require('handlebars')
        }))
        .pipe(wrap('Handlebars.template(<%= contents %>)'))
        .pipe(declare({
            namespace: 'JST',
            processName: (filePath) => {
                const path = filePath.slice(filePath.indexOf('template'), filePath.lastIndexOf('.'));
                // Node outputs \\ paths on Windows so the slash fixes that issue.
                return slash(path);
            },
            noRedeclare: true // Avoid duplicate declarations
        }));

    // Output both the partials and the templates.
    return merge(partials, templates)
        .pipe(concat('precompiledJst.js'))
        .pipe(gulpIf(isAMD, wrap('define(["handlebars"], function(Handlebars) {<%= contents %>});')))
        .pipe(gulp.dest(destPath + '/assets/scripts/'))
        .on('end', reloadBrowser);
});

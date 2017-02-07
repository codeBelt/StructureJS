const gulp = require('gulp');
const tslint = require('gulp-tslint');

gulp.task('lintScripts', function (done) {
    return gulp
        .src([
            env.DIR_SRC + '/assets/scripts/**/*.ts',
            '!node_modules/**',
            '!**/precompiledJst.js'
        ])
        .pipe(tslint())
        .pipe(tslint.report('prose', {
            emitError: false
        }))
});

var gulp = require('gulp');
var ts = require('gulp-typescript');

gulp.task('default', function () {
    return gulp
        .src('ts/**/*.ts')
        .pipe(ts({
            noImplicitAny: true
        })
        .pipe(gulp.dest('built/local'));
});
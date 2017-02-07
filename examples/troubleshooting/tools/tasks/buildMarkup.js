const gulp = require('gulp');

gulp.task('buildMarkup', (done) => {
    return gulp
        .src(env.DIR_SRC + '/*.html')
        .pipe(gulp.dest(env.DIR_DEST))
        .on('end', reloadBrowser);
});

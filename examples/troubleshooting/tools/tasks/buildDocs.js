const gulp = require('gulp');
const yuidoc = require('gulp-yuidoc');

gulp.task('buildDocs', (done) => {
    const parserOptions = {
        project: {
            name: pkg.name,
            description: pkg.description,
            version: pkg.version,
            url: pkg.homepage
        }
    };

    const generatorOptions = {
        //exclude: env.DIR_SRC + '/assets/vendor',
        helpers: [],
        themedir: 'tools/cache/yuidoc-friendly-theme'
    };

    return gulp
        .src(env.DIR_SRC + '/assets/scripts/**/*.{js,ts}')
        .pipe(yuidoc.parser(parserOptions))
        //.pipe(yuidoc.reporter())
        .pipe(yuidoc.generator(generatorOptions))
        .pipe(gulp.dest(env.DIR_DOCS))
});

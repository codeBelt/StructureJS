const gulp = require('gulp');
const del = require('del');
const ts = require('gulp-typescript');
const yuidoc = require('gulp-yuidoc');
const jest = require('gulp-jest').default;

/**
 * Setup global variables to use across tasks
 */
global.pkg = require('./package.json');

/**
 * Constants for the Gruntfile so we can easily change the path for our environments.
 */

gulp.task('ts', function () {
    const tsProject = ts.createProject('tsconfig.json');

    return gulp.src('ts/**/*.ts')
        .pipe(ts(tsProject))
        .pipe(gulp.dest('js/'));
});

gulp.task('clean', (done) => {
    return del([
        'ts/**/*.js'
    ]);
});

gulp.task('clean:docs', (done) => {
    return del([
        'docs/'
    ]);
});

gulp.task('docs', ['clean:docs'], (done) => {
    const parserOptions = {
        project: {
            name: 'StructureJS',
            description: pkg.description,
            version: pkg.version,
            url: pkg.homepage
        }
    };

    const generatorOptions = {
        //exclude: env.DIR_SRC + '/assets/vendor',
        helpers: [],
        themedir: 'friendly-theme',
        extension: '.ts'
    };

    return gulp
        .src('js/**/*.{js,ts}')
        .pipe(yuidoc.parser(parserOptions))
        //.pipe(yuidoc.reporter())
        .pipe(yuidoc.generator(generatorOptions))
        .pipe(gulp.dest('docs/'))
});

gulp.task('test', () => {
    return gulp
        .src('__tests__')
        .pipe(jest({
            config: {
                testPathPattern: /.\/__tests__\/.*-test.js/
                // "preprocessorIgnorePatterns": [
                //     "<rootDir>/dist/", "<rootDir>/node_modules/"
                // ],
                // "automock": false
            }
        }));
});

gulp.task('default', ['clean', 'ts']);
gulp.task('release', ['default', 'docs']);

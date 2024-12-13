const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');

const paths = {
    scss: './scss/**/*.scss',
    css: './css/'
};

function compileSCSS() {
    return gulp.src(paths.scss)
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 2 versions'],
            cascade: false
        }))
        .pipe(cleanCSS())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(paths.css));
}

function watchFiles() {
    gulp.watch(paths.scss, compileSCSS);
}

exports.compile = compileSCSS;
exports.watch = watchFiles;
exports.default = gulp.series(compileSCSS, watchFiles);
const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass')); // Use Dart Sass
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');

const paths = {
  scss: {
    src: './scss/**/*.scss',
    dest: './css',
  },
};

// Task to compile SCSS
function styles() {
  return gulp
    .src(paths.scss.src)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.scss.dest));
}

// Watch task
function watch() {
  gulp.watch(paths.scss.src, styles);
}

exports.styles = styles;
exports.watch = watch;
exports.default = gulp.series(styles, watch);
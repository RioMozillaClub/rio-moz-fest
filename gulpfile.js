var gulp = require('gulp'),
jade = require('gulp-jade'),
jsValidate = require('gulp-jsvalidate'),
uglify = require('gulp-uglify'),
less = require('gulp-less'),
concatCss = require('gulp-concat-css'),
autoprefixer = require('gulp-autoprefixer'),
minifyCss = require('gulp-minify-css'),
rename = require("gulp-rename"),
cssComb = require('gulp-csscomb'),
cssCombLint = require('gulp-csscomb-lint'),
cssBeautify = require('gulp-cssbeautify'),
watch = require('gulp-watch');

var pattern = ["dev/js/**", "!dev/js/riowebfest.js"];

gulp.task('copy-l20n', function() {
  gulp.src('dev/locales/**')
  .pipe(gulp.dest('dist/locales/'));
});

gulp.task('copy-design', function() {
  gulp.src('dev/design/**')
  .pipe(gulp.dest('dist/design/'));
});

gulp.task('copy-img', function() {
  gulp.src('dev/img/**')
  .pipe(gulp.dest('dist/img/'));
});

gulp.task('copy-html', function() {
  gulp.src('dev/**.html')
  .pipe(gulp.dest('dist/'));
});

gulp.task('copy-js', function() {
  gulp.src(pattern)
  .pipe(gulp.dest('dist/js/'));
});

gulp.task('copy-css', function() {
  gulp.src('dev/css/*.css')
  .pipe(gulp.dest('dist/css/'));
});

gulp.task('make-jade', function() {
  gulp.src('dev/templates/jade/*.jade')
  .pipe(jade())
  .pipe(gulp.dest('dist/'));
});

gulp.task('make-js', function () {
  return gulp.src('dev/js/riowebfest.js')
  .pipe(jsValidate())
  .pipe(uglify())
  .pipe(rename(function (path) {
    path.basename += ".min";
  }))
  .pipe(gulp.dest('dist/js/'));
});

gulp.task('make-less', function() {
  gulp.src('dev/less/rmc-structure-base.less')
  .pipe(less())
  .pipe(concatCss("riowebfest.css"))
  .pipe(cssComb())
  .pipe(cssBeautify({
    indent: '  ',
    openbrace: 'end-of-line',
    autosemicolon: true
  }))
  .pipe(autoprefixer({
    browsers: ['last 2 versions'],
    cascade: false
  }))
  .pipe(minifyCss({compatibility: 'ie8'}))
  .pipe(rename(function (path) {
    path.basename += ".min";
  }))
  .pipe(cssCombLint())
  .pipe(gulp.dest('dist/css/'));
});

gulp.task('watch', function() {
  gulp.watch('dev/templates/jade/**/**', ['make-jade']);
  gulp.watch('dev/js/riowebfest.js', ['make-js']);
  gulp.watch('dev/less/*.less', ['make-less']);
  gulp.watch('dev/**.html', ['copy-html']);
  gulp.watch('dev/css/*.css', ['copy-css']);
  gulp.watch(pattern, ['copy-js']);
  gulp.watch('dev/locales/**', ['copy-l20n']);
  gulp.watch('dev/design/**', ['copy-design']);
  gulp.watch('dev/img/**', ['copy-img']);
})

gulp.task('default', ['make-jade', 'make-js', 'make-less', 'copy-html', 'copy-css', 'copy-js', 'copy-l20n', 'copy-design', 'copy-img']);

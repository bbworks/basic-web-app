'use strict';
const gulp = require('gulp');
const concatCss = require('gulp-concat-css');
const clean = require('gulp-clean');

gulp.task('clean-css', function() {
  return gulp.src('../public/css/styles.css', {read: false, allowEmpty: true})
    .pipe(clean({force: true}));
});

gulp.task('concatenate-css', gulp.series('clean-css', function() {
  return gulp.src('../public/css/**/*.css')
    .pipe(concatCss('styles.css'))
    .pipe(gulp.dest('../public/css'));
}));

'use strict';
const gulp = require('gulp');
const concatCss = require('gulp-concat-css');

gulp.task('concatenate-css', function() {
  return gulp.src('../public/css/**/*.css')
    .pipe(concatCss('styles.css'))
    .pipe(gulp.dest('../public/css'));
});

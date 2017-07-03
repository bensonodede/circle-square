var gulp = require('gulp');
var uglify = require('gulp-uglify');
var uglifycss = require('gulp-uglifycss');
var gzip = require('gulp-gzip');

gulp.task('default', function() {
  gulp.src('js/*.js')
  .pipe(uglify())
  .pipe(gulp.dest('minjs'));
});

gulp.task('css', function(){
  gulp.src('css/*.css')
  .pipe(uglifycss())
  .pipe(gulp.dest('mincss'));
});

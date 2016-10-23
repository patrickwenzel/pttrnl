var gulp = require('gulp');
var sass = require('gulp-sass');
var nunjucksRender = require('gulp-nunjucks-render');
var browserSync = require('browser-sync');
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var cssnano = require('gulp-cssnano');
var del = require('del');
var runSequence = require('run-sequence');

// nunjucks
gulp.task('nunjucks', function() {
  return gulp.src('dev/pages/**/*.+(html|njk|nunjucks)')
    .pipe(nunjucksRender({
      path: ['dev/templates']
    }))
    .pipe(gulp.dest('dev'));
});

// Sass task
gulp.task('sass', function() {
  return gulp.src('dev/scss/**/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('dev/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

// Watch task
gulp.task('watch', ['browserSync', 'sass'], function() {
  gulp.watch('dev/scss/**/*.scss', ['sass']);
  gulp.watch('dev/*.html', browserSync.reload);
  gulp.watch('dev/js/**/*.js', browserSync.reload);
  gulp.watch('dev/pages/**/*.+(html|njk|nunjucks)', browserSync.reload);
  gulp.watch('dev/templates/**/*.+(html|njk|nunjucks)', browserSync.reload);
});

// browserSync task
gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'dev'
    },
  })
});

// concat and minify js/css
gulp.task('useref', function() {
  return gulp.src('dev/*.html')
    .pipe(useref())
    .pipe(gulpIf('*.js', uglify()))
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest('build'))
});

// clean up build
gulp.task('clean:build', function() {
  return del.sync('build');
});

// deletes and re-build build folder
gulp.task('build', function (callback) {
  runSequence('clean:build',
    ['nunjucks','sass', 'useref'],
    callback
  )
});

// starts default watch and sync task
gulp.task('default', function (callback) {
  runSequence(['nunjucks','sass','browserSync', 'watch'],
    callback
  )
});

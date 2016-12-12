var gulp = require('gulp');
var gutil = require('gulp-util');
var uglify = require('gulp-uglify');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');

var paths = {
  sass: [
    './src/assets/**/*.scss'
  ],
  js: [
    './src/app.js',
    './src/service-worker.js',
    './src/modules/**/*.js'
  ],
  files: [
    './src/index.html',
    './src/modules/**/*.html',
    './src/manifest.json',
    './src/assets/images/*',
    './src/assets/images/**/*',
    './src/assets/libs/ng-cordova.min.js',
    './src/assets/libs/ionic/fonts/*',
    './src/assets/libs/ionic/js/ionic.bundle.min.js'
  ]
};

gulp.task('sass', function(done) {
  gulp.src('./src/assets/styles/app.scss')
    .pipe(sass())
    .on('error', sass.logError)
    .pipe(gulp.dest('./www/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename("app.css"))
    .pipe(gulp.dest('./www/'))
    .on('end', done);
});

gulp.task('compress', function() {
    return gulp.src(paths.js)
    .pipe(concat('app.js'))
    .pipe(gulp.dest('./www'))
    .pipe(uglify({ mangle: false }))
    .on('error', console.error)
    .pipe(gulp.dest('./www'))
});

gulp.task('copy', function() {
    return gulp.src(paths.files, { base: './src' })
    .pipe(gulp.dest('./www'));
});

gulp.task('watch', ['sass'], function() {
  gulp.watch(paths.sass, ['sass']);
  gulp.watch(paths.js, ['compress']);
  gulp.watch(paths.files, ['copy']);
});

gulp.task('install', ['git-check'], function() {
  return bower.commands.install()
    .on('log', function(data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});

gulp.task('git-check', function(done) {
  if (!sh.which('git')) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});

gulp.task('default', ['sass', 'compress', 'copy']);

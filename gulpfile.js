var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var ngAnotate = require('gulp-ng-annotate');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var jshint = require('gulp-jshint');
var jshintStylish = require('jshint-stylish');
var sourcemaps = require('gulp-sourcemaps');
var inject = require('gulp-inject');
var sh = require('shelljs');
var del = require('del');
var _ = require('lodash');


var src = {
    js: ['./src/js/**/*.module.js', './src/js/**/*.js'],
    vendor: [
        './node_modules/lodash/dist/lodash.min.js'
    ],
    html: [
        './src/templates/**/*.html'
    ],
    index: ['./src/index.html'],
    sass: ['./scss/**/*.scss']
};

var dest = {
    js: './www/js',
    templates: './www/templates',
    css: './www/css',
    img: './www/img',
    home: './www'
}

function glob(path){
    return path + '/**/*';
}

gulp.task('default', ['debug']);

gulp.task('debug', ['js', 'vendor', 'html', 'sass']);
//gulp.task('release', ['js:release', 'vender', 'html', 'sass'])
gulp.task('clean', function(cb){
    del([
        glob(dest.js),
        glob(dest.templates),
        dest.home + '/*.*'
    ], cb);
});
/*
gulp.task('js:release', function(){
    gulp.src(src.js)
        .pipe(jshint())
        .pipe(jshint.reporter(jshintStylish))
        .pipe(sourcemaps.init())
        .pipe(uglify({mungle: false}))
        .pipe(concat('app.bundle.min.js'))
        .pipe(sourcemaps.write(dest.js))
        .pipe(gulp.dest(dest.js));
});
*/

gulp.task('js', ['clean'], function(){
    gulp.src(src.js)
        .pipe(jshint())
        .pipe(jshint.reporter(jshintStylish))
        .pipe(concat('app.bundle.js'))
        .pipe(gulp.dest(dest.js));
});

gulp.task('vendor', ['clean'], function(){
    gulp.src(src.vendor)
        //.pipe(uglify({mungle: false}))
        .pipe(concat('vendor.bundle.js'))
        .pipe(gulp.dest(dest.js));
});

gulp.task('html', ['clean'], function(){
    gulp.src(src.html)
        .pipe(gulp.dest(dest.templates));

    gulp.src(src.index)
        .pipe(gulp.dest(dest.home));
});

gulp.task('watch', function(){
    gulp.watch(src.js, ['js']);
    gulp.watch(src.html, ['html']);
    gulp.watch(src.sass, ['sass']);
});

/**
 * Sass is from IonicFramework
 */
gulp.task('sass', function(done) {
  gulp.src('./scss/ionic.app.scss')
    .pipe(sass())
    .pipe(gulp.dest(dest.css))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest(dest.css))
    .on('end', done);
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

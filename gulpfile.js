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
var jsesc = require('jsesc');
var f2json = require('gulp-file-contents-to-json');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');


var src = {
    js: ['./src/js/**/*.module.js', './src/js/**/*.js'],
    vendor: [
        './src/browserify/vendors-wrapped.js'
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

gulp.task('debug', ['clean', 'js', 'browserify', 'html', 'sass']);
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

gulp.task('browserify', function(){
    var bundler = browserify({
        entries: src.vendor,
        debug: true
    });

    return bundler
        .bundle()
        .pipe(source('vendor.bundle.js'))
        .pipe(buffer())
        .pipe(gulp.dest(dest.js));
});

gulp.task('js', function(){
    gulp.src(src.js)
        .pipe(jshint())
        .pipe(jshint.reporter(jshintStylish))
        .pipe(concat('app.bundle.js'))
        .pipe(gulp.dest(dest.js));
});

gulp.task('vendor', function(){
    gulp.src(src.vendor)
        //.pipe(uglify({mungle: false}))
        .pipe(concat('vendor.bundle.js'))
        .pipe(gulp.dest(dest.js));
});

gulp.task('html', function(){
    gulp.src(src.html)
        .pipe(gulp.dest(dest.templates));

    gulp.src(src.index)
        .pipe(gulp.dest(dest.home));
});

gulp.task('prep-data', function(){
    gulp.src('./src/data/styleguide')
        .pipe(f2json('styleguide.json'))
        .pipe(gulp.dest('./www/data'));
});

gulp.task('watch', function(){
    gulp.watch(src.js, ['js']);
    gulp.watch(src.vendor, ['browserify']);
    gulp.watch([src.html, src.index], ['html']);
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

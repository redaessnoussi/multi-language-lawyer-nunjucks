var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var cleanCSS = require('gulp-clean-css');
var sourcemaps = require('gulp-sourcemaps');
var pump = require('pump');

gulp.task('scripts', function () {
  gulp.src([
    'node_modules/bootstrap/dist/js/bootstrap.min.js',
    'node_modules/picturefill/dist/picturefill.js',
    'node_modules/lazysizes/lazysizes.js',
    'node_modules/lazysizes/plugins/rias/ls.rias.js',
    'node_modules/lazysizes/plugins/object-fit/ls.object-fit.js',
    'js/*.js',
  ])
    .pipe(concat('main.js'))
    .pipe(gulp.dest('public/js'))
});

gulp.task('compress-js', function (cb) {
  pump([
      gulp.src('public/js/main.js'),
      uglify(),
      rename({
        extname: '.min.js'
      }),
      gulp.dest('public/js')
    ],
    cb)
});

gulp.task('scss', function () {
  gulp.src('scss/main.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('public/css'))
});

gulp.task('autoprefixer', function () {
  gulp.src([
    // 'node_modules/nouislider/distribute/nouislider.css',
    // 'node_modules/sumoselect/sumoselect.css',
    // 'node_modules/jquery.mmenu/dist/jquery.mmenu.all.css',
    'public/css/main.css',
  ])
    .pipe(sourcemaps.init())
    .pipe(autoprefixer())
    .pipe(concat('main.css'))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('public/css/dist'))
});

gulp.task('minify-css', function () {
  gulp.src('public/css/main.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(rename({
      extname: '.min.css'
    }))
    .pipe(gulp.dest('public/css/dist'))
});

gulp.task('default', function () {
  gulp.watch('js/*.js', ['scripts']);
  gulp.watch('public/js/dist/main.js', ['compress-js']);
  gulp.watch('scss/*.scss', ['scss']);
  gulp.watch('public/css/main.css', ['autoprefixer', 'minify-css']);
});
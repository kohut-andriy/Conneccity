var gulp = require('gulp'),
  less = require('gulp-less'),
  mainBowerFiles = require('main-bower-files'),
  prefixer = require('gulp-autoprefixer'),
  rigger = require('gulp-rigger'),
  minifyJS = require('gulp-uglify'),
  babel = require('gulp-babel'),
  connect = require('gulp-connect'),
  rename = require('gulp-rename'),
  imagemin = require('gulp-imagemin'),
  minfy = require('gulp-clean-css');


gulp.task('webserver', function () {
  connect.server();
});


gulp.task('jsTask', function () {
  gulp.src('js/main.js')
    .pipe(rigger())
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(minifyJS())
    .pipe(gulp.dest('app/js'))
});

gulp.task('cssTask', function () {
  gulp.src('css/app.less')
    .pipe(less())
    .pipe(prefixer('last 5 versions'))
    .pipe(gulp.dest('app/style/'))
});

gulp.task('htmlTask', function () {
  gulp.src('js/**/*.html')
    .pipe(rename({dirname: ''}))
    .pipe(gulp.dest('app/views'));
});

gulp.task('bowerComponents', function () {
  gulp.src(mainBowerFiles())
    .pipe(gulp.dest('app/js/externals/'));
  /*  gulp.src("app/js/externals/!*.js")
   .pipe(minifyJS())
   .pipe(gulp.dest('app/js/externals'));*/
});

gulp.task('minImg', function () {
  gulp.src('img/**')
    .pipe(imagemin())
    .pipe(gulp.dest('app/img'));
});

gulp.task('watch', function () {
  gulp.watch('js/**', ['jsTask']);
  gulp.watch('js/**', ['htmlTask']);
  gulp.watch('css/*.less', ['cssTask']);
  gulp.watch('img/**', ['minImg']);
  gulp.watch('js/main.js', ['jsTask']);
});

gulp.task('default', ['cssTask', 'watch', 'jsTask', 'htmlTask', 'minImg', 'webserver']);

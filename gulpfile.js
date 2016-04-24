var gulp = require('gulp'),
  less = require('gulp-less'),
  mainBowerFiles = require('main-bower-files'),
  prefixer = require('gulp-autoprefixer'),
  rigger = require('gulp-rigger'),
  minifyJS = require('gulp-minify'),
  babel = require('gulp-babel'),
  connect = require('gulp-connect'),
  rename = require('gulp-rename');


gulp.task('webserver', function () {
  connect.server();
});
gulp.task('jsTask', function () {
  gulp.src('js/main.js')
    .pipe(rigger())
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(minifyJS({
      ext: {
        src: '-debug.js',
        min: '.js'
      },
      mangle: false
    }))
    .pipe(gulp.dest('app/js'))
});

gulp.task('cssTask', function () {
  gulp.src('css/*.less')
    .pipe(less())
    .pipe(prefixer('last 5 versions'))
    .pipe(gulp.dest('app/style/'))
});

gulp.task('htmlTask', function () {
  gulp.src('js/*/*.html')
    .pipe(rename({dirname: ''}))
    .pipe(gulp.dest('app/views'));
});


gulp.task('bowerComponents', function () {
  return gulp.src(mainBowerFiles())
    .pipe(minifyJS({
      ext: {
        src: '-debug.js',
        min: '.js'
      }
    }))
    .pipe(gulp.dest('app/js/externals'))
});


gulp.task('watch', function () {
  gulp.watch('js/*/*.js', ['jsTask']);
  gulp.watch('css/*.less', ['cssTask']);
  gulp.watch('js/*/*.html', ['htmlTask']);
  gulp.watch('js/main.js', ['jsTask']);
});


gulp.task('default', ['cssTask', 'bowerComponents', 'watch', 'jsTask', 'htmlTask', 'webserver']);

const gulp = require('gulp');
const less = require('gulp-less');
const prefixer = require('gulp-autoprefixer');
const rigger = require('gulp-rigger');
const minifyJS = require('gulp-uglify');
const babel = require('gulp-babel');
const connect = require('gulp-connect');
const rename = require('gulp-rename');
const imagemin = require('gulp-imagemin');
const minfy = require('gulp-clean-css');

gulp.task('webserver', () => {
  connect.server();
});

gulp.task('jsTask', () => {
  gulp.src('js/main.js')
  .pipe(rigger())
  .pipe(babel({
    presets: ['es2015'],
  }))
  .pipe(minifyJS())
  .pipe(gulp.dest('app/js'));
});

gulp.task('cssTask', () => {
  gulp.src('css/app.less')
  .pipe(less())
  .pipe(prefixer('last 5 versions'))
  .pipe(gulp.dest('app/style/'));
});

gulp.task('htmlTask', () => {
  gulp.src('js/**/*.html')
  .pipe(rename({ dirname: '' }))
  .pipe(gulp.dest('app/views'));
});

gulp.task('minImg', () => {
  gulp.src('img/**')
  .pipe(imagemin())
  .pipe(gulp.dest('app/img'));
});

gulp.task('watch', () => {
  gulp.watch('js/**', ['jsTask']);
  gulp.watch('js/**', ['htmlTask']);
  gulp.watch('css/*.less', ['cssTask']);
  gulp.watch('img/**', ['minImg']);
  gulp.watch('js/main.js', ['jsTask']);
});

gulp.task('default', ['cssTask', 'watch', 'jsTask', 'htmlTask', 'minImg', 'webserver']);

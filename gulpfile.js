var gulp = require('gulp'),
    connect = require('gulp-connect'),
    karma = require('gulp-karma'),
    ghPages = require('gulp-gh-pages');

gulp.task('webserver', function() {
  connect.server({
      port: 8000,
      livereload: true
  });
});

gulp.task('watch', function() {
    gulp.watch('/*.*', ['all']);
});

gulp.task('test', function () {
  gulp.src('./foobar')
    .pipe(karma({
      configFile: 'karma.conf.js',
      action: 'run'
    }));
});

gulp.task('deploy', function() {
  return gulp.src('./**/*')
    .pipe(ghPages());
});

gulp.task('default', ['webserver', 'watch']);

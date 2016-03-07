var gulp = require('gulp'),
    connect = require('gulp-connect'),
    karma = require('gulp-karma');

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

gulp.task('default', ['webserver', 'watch']);

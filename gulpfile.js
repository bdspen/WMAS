var gulp = require('gulp'),
    connect = require('gulp-connect');

gulp.task('webserver', function() {
  connect.server({
      port: 8000,
      livereload: true
  });

});

gulp.task('watch', function() {
    gulp.watch('/*.*', ['all']);
})

gulp.task('default', ['webserver', 'watch']);

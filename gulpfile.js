const gulp = require('gulp');

require('./gulp/tasks/scripts');

gulp.task('default', gulp.series(
  'scripts'
));

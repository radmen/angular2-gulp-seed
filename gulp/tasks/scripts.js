const source = require('vinyl-source-stream');
const gulp = require('gulp');
const tsify = require('tsify');
const browserify = require('browserify');
const buildEnv = require('../buildEnv');
const gulpIf = require('gulp-if');
const streamify = require('gulp-streamify')
const uglify = require('gulp-uglify');

const src = buildEnv.srcDir + '/scripts/main.ts';
const uglifyPipe = () => {
  return gulpIf(
    !buildEnv.isDevel(),
    streamify(uglify())
  );
}

gulp.task('scripts', () => {
  const bundle = browserify(src, {
      debug: buildEnv.isDevel(),
    })
    .plugin(tsify)
    .bundle();

  return bundle.pipe(source('main.js'))
    .pipe(uglifyPipe())
    .pipe(gulp.dest(buildEnv.distDir));
});

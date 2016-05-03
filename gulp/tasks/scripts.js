const source = require('vinyl-source-stream');
const gulp = require('gulp');
const gutil = require('gulp-util');
const tsify = require('tsify');
const watchify = require('watchify');
const browserify = require('browserify');
const buildEnv = require('../buildEnv');
const gulpIf = require('gulp-if');
const streamify = require('gulp-streamify')
const uglify = require('gulp-uglify');

const src = [
  buildEnv.srcDir + '/../typings/browser.d.ts',
  buildEnv.srcDir + '/scripts/main.ts',
];
const uglifyPipe = () => {
  return gulpIf(
    !buildEnv.isDevel(),
    streamify(uglify())
  );
}

function onError(error) {
  const chalk = gutil.colors;

  gutil.log(`${chalk.red(error.name)}: ${chalk.yellow(error.message)}`);
}

function bundleJs(bundler) {
  const bundle = bundler.bundle();

  return bundle
    .on('error', onError)
    .pipe(source('main.js'))
    .pipe(uglifyPipe())
    .pipe(gulp.dest(`${buildEnv.distDir}/scripts`));
}

gulp.task('scripts', () => {
  const bundler = browserify(src, {
    debug: buildEnv.isDevel(),
  })
    .plugin(tsify);

  return bundleJs(bundler);
});

gulp.task('scripts:watch', () => {
  const bundler = browserify(src, {
    debug: true,
  })
    .plugin(watchify)
    .plugin(tsify);

  bundler.on('update', () => {
    gutil.log(gutil.colors.yellow('Updating bundle'));
    return bundleJs(bundler);
  });

  bundler.on('log', time => gutil.log(time));

  return bundleJs(bundler);
});

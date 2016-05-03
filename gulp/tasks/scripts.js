const gulp = require('gulp');
const ts = require('gulp-typescript');
const buildEnv = require('../buildEnv');

const tsProject = ts.createProject('tsconfig.json', {
  typescript: require('typescript'),
});

const src = buildEnv.srcDir + '/scripts/**/*.ts';

gulp.task('scripts', () => {
  return gulp.src(src)
    .pipe(ts(tsProject))
    .pipe(gulp.dest(buildEnv.distDir));
});

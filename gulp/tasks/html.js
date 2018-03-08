const gulp = require('gulp');

const browserSync = require('browser-sync');

gulp.task('html', () => {
    browserSync.reload();
});

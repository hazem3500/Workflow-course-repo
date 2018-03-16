const gulp = require('gulp');

const browserSync = require('browser-sync');

gulp.task('watch', ['styles', 'scripts'], () => {
    browserSync.init({
        notify: false,
        server: {
            baseDir: './app'
        }
    });

    gulp.watch('./app/index.html', ['html']);
    gulp.watch('./app/assets/styles/scss/**/*.scss', ['css-sync']);
    gulp.watch('./app/assets/scripts/**/*.js', ['script-sync']);
});

gulp.task('css-sync', ['styles'], () =>
    gulp.src('./app/assets/styles/css/styles.css').pipe(browserSync.stream())
);

gulp.task('script-sync', ['scripts'], () => {
    browserSync.reload();
});

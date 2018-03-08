const gulp = require('gulp');

const browserSync = require('browser-sync');

gulp.task('watch', ['styles'], () => {
    browserSync.init({
        notify: false,
        server: {
            baseDir: './app'
        }
    });

    gulp.watch('./app/index.html', ['html']);
    gulp.watch('./app/assets/styles/scss/**/*.scss', ['styles', 'css-sync']);
});

gulp.task('css-sync', () =>
    gulp.src('./app/assets/styles/css/styles.css').pipe(browserSync.stream())
);

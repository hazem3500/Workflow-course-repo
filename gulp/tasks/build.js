const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const del = require('del');
const usemin = require('gulp-usemin');
const rev = require('gulp-rev');
const cssnano = require('gulp-cssnano');
const uglify = require('gulp-uglify');
const browserSync = require('browser-sync');

gulp.task('previewDist', () => {
    browserSync.init({
        notify: false,
        server: {
            baseDir: './docs'
        }
    });
});

gulp.task('deleteDistFolder', ['icons'], () => del('/docs'));

gulp.task('optimizeImages', ['deleteDistFolder'], () => {
    gulp
        .src([
            './app/assets/images/**/*',
            '!./app/assets/images/icons',
            '!./app/assets/images/icons/**/*'
        ])
        .pipe(
            imagemin({
                progressive: true,
                interlaced: true,
                multipass: true
            })
        )
        .pipe(gulp.dest('./docs/assets/images'));
});

gulp.task('useminTrigger', ['deleteDistFolder'], () => {
    gulp.start('usemin');
});

gulp.task('usemin', ['styles', 'scripts'], () => {
    gulp
        .src('./app/index.html')
        .pipe(
            usemin({
                css: [() => rev(), () => cssnano()],
                js: [() => rev(), () => uglify()]
            })
        )
        .pipe(gulp.dest('./docs'));
});

gulp.task('build', ['deleteDistFolder', 'optimizeImages', 'useminTrigger']);

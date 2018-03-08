const gulp = require('gulp');

const sass = require('gulp-sass');
const moduleImporter = require('sass-module-importer');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const plumber = require('gulp-plumber');

function customPlumber() {
    return plumber({
        errorHandler(err) {
            console.log(err);
            this.emit('end');
        }
    });
}

gulp.task('styles', () =>
    gulp
        .src('./app/assets/styles/scss/**/*.scss')
        .pipe(customPlumber())
        .pipe(sass({ importer: moduleImporter() }))
        .pipe(postcss([autoprefixer]))
        .pipe(gulp.dest('./app/assets/styles/css'))
);

gulp.task('watch', ['styles'], () => {
    gulp.watch('./app/assets/styles/scss/**/*.scss', ['styles']);
});


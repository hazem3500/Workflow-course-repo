const gulp = require('gulp');

const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssvars = require('postcss-simple-vars');
const nested = require('postcss-nested');
const plumber = require('gulp-plumber');
const extReplace = require('gulp-ext-replace');

function customPlumber() {
    return plumber({
        errorHandler(err) {
            console.log(err);
            this.emit('end');
        }
    });
}

gulp.task('postcss', () =>
    gulp.src('./app/assets/styles/postcss/**/*.postcss')
        .pipe(customPlumber())
        .pipe(postcss([cssvars, nested, autoprefixer]))
        .pipe(extReplace('.css'))
        .pipe(gulp.dest('./app/assets/styles/css'))
);

gulp.task('watch', ['postcss'], () => {
    gulp.watch('./app/index.html', ['default']);
    gulp.watch('./app/assets/styles/postcss/**/*.postcss', ['postcss']);
});


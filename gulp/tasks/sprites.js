const gulp = require('gulp');
const svgSprite = require('gulp-svg-sprite');
const rename = require('gulp-rename');
const del = require('del');

const config = {
    shape: {
        spacing: {
            padding: 5
        }
    },
    mode: {
        css: {
            sprite: 'sprite.svg',
            render: {
                scss: {
                    template: './gulp/templates/sprites.scss'
                }
            }
        }
    }
};

gulp.task('beginClean', () =>
    del(['./app/temp/sprite/', './app/assets/images/sprites/'])
);

gulp.task('createSprite', () => {
    gulp
        .src('./app/assets/images/icons/**/*.svg')
        .pipe(svgSprite(config))
        .pipe(gulp.dest('./app/temp/sprite/'));
});

gulp.task('copySpriteGraphic', ['createSprite'], () => {
    gulp
        .src('./app/temp/sprite/css/**/*.svg')
        .pipe(gulp.dest('./app/assets/images/sprites/'));
});

gulp.task('copySpriteSCSS', ['createSprite'], () => {
    gulp
        .src('./app/temp/sprite/css/*.scss')
        .pipe(rename('_sprite.scss'))
        .pipe(gulp.dest('./app/assets/styles/scss/modules'));
});

gulp.task('endClean', ['copySpriteGraphic', 'copySpriteSCSS'], () =>
    del('./app/temp/sprite/')
);

gulp.task('icons', [
    'beginClean',
    'createSprite',
    'copySpriteGraphic',
    'copySpriteSCSS',
    'endClean'
]);

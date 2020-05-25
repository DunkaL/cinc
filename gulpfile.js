var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync');
var cleancss = require('gulp-clean-css');

gulp.task('browser-sync', function () {
    browserSync({
        server: {
            baseDir: '/'
        },
        notify: false,
        // online: true, // Work offline without internet connection
        // tunnel: true, tunnel: 'test', // Demonstration page: http://projectname.localtunnel.me/
    });
});

function bsReload(done) {
    browserSync.reload();
    done();
}

gulp.task('sass-compile', function () {
    return gulp.src('scss/**/*.scss')
        .pipe(sass({
            outputStyle: 'expanded'
        }))
        .pipe(autoprefixer({
            grid: true,
            overrideBrowserslist: ['last 10 versions']
        }))
        .pipe(cleancss({
            level: {
                1: {
                    specialComments: 0
                }
            }
        })) // Optional. Comment out when debugging
        .pipe(gulp.dest('css'))
        .pipe(browserSync.stream());
});

gulp.task('watch', function () {
    gulp.watch('scss/**/*.scss', gulp.parallel('sass-compile'));
});
gulp.task('default', gulp.parallel('sass-compile', 'watch'));
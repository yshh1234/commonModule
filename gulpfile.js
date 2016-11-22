var gulp = require('gulp'),
    uglify = require('gulp-uglify');

/**
 * finally Compose
 */
gulp.task('finalMinSize',function () {
    gulp.src(['demo/js/commonForZepto.js'])
        .pipe(uglify({
            mangle:true,
            compress: true
        }))
        .pipe(gulp.dest('dist/js'));
});

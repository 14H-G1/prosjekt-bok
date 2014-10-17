var gulp        = require('gulp');
var sass        = require('gulp-ruby-sass');
var jshint      = require('gulp-jshint');
var stylish     = require('jshint-stylish');
var concat      = require('gulp-concat');
var nodemon     = require('gulp-nodemon');
var reload      = require('gulp-livereload');
var uglify      = require('gulp-uglify');

gulp.task('hint', function() {
    return gulp.src('assets/js/*')
        .pipe(jshint())
        .pipe(jshint.reporter(stylish))
        .pipe(reload({ auto: false }));
});

gulp.task('cc-func', function() {
    return gulp.src('assets/js/functions/*.js')
        .pipe(concat('functions.js'))
        .pipe(gulp.dest('assets/js/'));
});

gulp.task('cc-libs', function() {
    return gulp.src(['assets/js/libraries/jquery.min.js',
                     'assets/js/libraries/lightboxme.js',
                     'assets/js/libraries/fastclick.js'])
        .pipe(concat('libraries.js'))
        .pipe(uglify())
        .pipe(gulp.dest('assets/js/'));
});

gulp.task('sass', function() {
    return gulp.src('sass/style.sass')
        .pipe(sass({ style: "expanded" }))
        .pipe(gulp.dest('assets/css'))
        .pipe(reload({ auto: false }));
});

gulp.task('server', function() {
    /* Automatically restarts server on change */
    nodemon({ script: 'app.js' });
});

/* For front-end dev */
gulp.task('front', function() {
    reload.listen();
    gulp.watch('sass/**/*.sass', ['sass']);
    gulp.watch('assets/js/functions/*.js', ['hint', 'cc-func']);
    gulp.watch('assets/js/libraries/*.js', ['cc-libs']);
    gulp.watch('views/**').on('change', reload.changed);
});

/* For back-end dev */
gulp.task('back', ['server'], function() {

});

gulp.task('default', function() {
    gulp.watch('sass/**/*.sass', ['sass']);
    gulp.watch('assets/js/*.js', ['hint']);
});

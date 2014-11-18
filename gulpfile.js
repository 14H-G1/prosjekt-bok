var gulp        = require('gulp');
var sass        = require('gulp-ruby-sass');
var jshint      = require('gulp-jshint');
var stylish     = require('jshint-stylish');
var concat      = require('gulp-concat');
var nodemon     = require('gulp-nodemon');
var reload      = require('gulp-livereload');
var uglify      = require('gulp-uglify');
var coffee      = require('gulp-coffee');

gulp.task('hint', function() {
    return gulp.src('assets/js/partials/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter(stylish))
        .pipe(reload({ auto: false }));
});

gulp.task('cc-glob', function() {
    return gulp.src('assets/js/partials/*.js')
        .pipe(concat('global.js'))
        .pipe(coffee({bare: true}))
        .pipe(gulp.dest('assets/js/'));
});

gulp.task('cc-libs', function() {
    return gulp.src(['bower_components/jquery/dist/jquery.min.js',
                     'bower_components/fastclick/lib/fastclick.js'])
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

gulp.task('front', function() {
    /* For front-end dev */
    reload.listen();
    gulp.watch('sass/**/*.sass', ['sass']);
    gulp.watch('assets/js/partials/*.js', ['cc-glob', 'hint']);
    gulp.watch('views/**').on('change', reload.changed);
});

gulp.task('back', ['server'], function() {
    /* For back-end dev */

});

gulp.task('default', ['cc-glob', 'cc-libs', 'sass', 'hint'], function() {

});

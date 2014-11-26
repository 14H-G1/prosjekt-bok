var gulp            = require('gulp');
var sass            = require('gulp-ruby-sass');
var jshint          = require('gulp-jshint');
var stylish         = require('jshint-stylish');
var concat          = require('gulp-concat');
var nodemon         = require('gulp-nodemon');
var reload          = require('gulp-livereload');
var uglify          = require('gulp-uglify');
var coffee          = require('gulp-coffee');
var autoprefixer    = require('gulp-autoprefixer');

gulp.task('hint', function() {
    return gulp.src('app/assets/js/partials/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter(stylish))
        .pipe(reload({ auto: false }));
});

gulp.task('cc-glob', function() {
    return gulp.src('app/assets/js/partials/*.js')
        .pipe(concat('global.js'))
        .pipe(coffee({bare: true}))
<<<<<<< HEAD
        .pipe(gulp.dest('app/assets/js/'));
=======
        .pipe(gulp.dest('assets/js/'));
>>>>>>> better-layout
});

gulp.task('cc-libs', function() {
    return gulp.src(['bower_components/jquery/dist/jquery.min.js',
                     'bower_components/fastclick/lib/fastclick.js'])
        .pipe(concat('libraries.js'))
        .pipe(uglify())
        .pipe(gulp.dest('app/assets/js/'));
});

gulp.task('sass', function() {
    return gulp.src('app/sass/style.sass')
        .pipe(sass({ style: "expanded" }))
<<<<<<< HEAD
        .pipe(gulp.dest('app/assets/css/not-prefixed'))
=======
        .pipe(gulp.dest('assets/css/not-prefixed'))
>>>>>>> better-layout
        .pipe(reload({ auto: false }));
});

gulp.task('prefix', function() {
<<<<<<< HEAD
    return gulp.src('app/assets/css/not-prefixed/style.css')
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('app/assets/css'));
=======
        return gulp.src('assets/css/not-prefixed/style.css')
            .pipe(autoprefixer({
                browsers: ['last 2 versions'],
                cascade: false
            }))
            .pipe(gulp.dest('assets/css'))
>>>>>>> better-layout
});

gulp.task('server', function() {
    /* Automatically restarts server on change */
    nodemon({ script: 'app.js' });
});

<<<<<<< HEAD
gulp.task('front', ['livereload'], function() {
    /* For front-end dev */
    gulp.watch('app/sass/**/*.sass', ['sass', 'prefix']);
    gulp.watch('app/assets/js/partials/*.js', ['cc-glob']);
});

gulp.task('livereload', function() {
    reload.listen();
    gulp.watch('app/views/**').on('change', reload.changed);
});
=======
gulp.task('front', function() {
    /* For front-end dev */
    reload.listen();
    gulp.watch('sass/**/*.sass', ['sass']);
    gulp.watch('assets/css/not-prefixed/style.css', ['prefix']);
    gulp.watch('assets/js/partials/*.js', ['cc-glob', 'hint']);
    gulp.watch('views/**').on('change', reload.changed);
});

gulp.task('back', ['server'], function() {
    /* For back-end dev */
>>>>>>> better-layout

gulp.task('start', ['sass', 'prefix', 'cc-glob', 'cc-libs', 'server'], function() {
    /* Starts the server after compiling needed assets */
});

<<<<<<< HEAD
gulp.task('default', ['start'], function() {
    // start server,default thing to do
=======
gulp.task('default', ['cc-glob', 'cc-libs', 'sass', 'prefix', 'hint'], function() {

>>>>>>> better-layout
});

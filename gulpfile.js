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
        .pipe(gulp.dest('app/assets/js/'));
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
        .pipe(gulp.dest('app/assets/css/not-prefixed'))
        .pipe(reload({ auto: false }));
});

gulp.task('prefix', function() {
    return gulp.src('app/assets/css/not-prefixed/style.css')
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('app/assets/css'));
});

gulp.task('server', function() {
    /* Automatically restarts server on change */
    nodemon({ script: 'app.js' });
});

gulp.task('front', ['livereload'], function() {
    /* For front-end dev */
    gulp.watch('app/sass/**/*.sass', ['sass', 'prefix']);
    gulp.watch('app/assets/js/partials/*.js', ['cc-glob']);
});

gulp.task('livereload', function() {
    reload.listen();
    gulp.watch('app/views/**').on('change', reload.changed);
});

gulp.task('start', ['sass', 'prefix', 'cc-glob', 'cc-libs', 'server'], function() {
    /* Starts the server after compiling needed assets */
});

gulp.task('default', ['start'], function() {
    // start server,default thing to do
});

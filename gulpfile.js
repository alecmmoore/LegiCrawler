var gulp = require('gulp');

//--EXTERNAL(NPM) DEPENDENCIES
var bower = require('gulp-bower');
var bowerFiles = require('main-bower-files');
var templateCache = require('gulp-angular-templatecache');
var inject = require('gulp-inject');

gulp.task('angular_cache', function () {
	console.log('Start Angular Template Cache Task');
    gulp.src('./app/views/**/*.html')
        .pipe(templateCache())
        .pipe(gulp.dest('app/js/'));
});

gulp.task('inject-app', function () {
  var target = gulp.src('./app/index.html');
  // It's not necessary to read the files (will speed up things), we're only after their paths: 
  var sources = gulp.src([
      ,'./app/js/*.js!(*module*)' // app shell
      , './app/css/fonts.css'
      , './app/css/**/*.css!(*fonts*)'], { read: false });

  return target.pipe(inject(sources,{relative: true}))
    .pipe(gulp.dest('./app'));

});

gulp.task('inject-bower',function(){
    var target = gulp.src('./app/index.html');
    console.log(bowerFiles({ paths: { bowerDirectory: './app/bower_components'}}));
    return target
        .pipe(inject(gulp.src(bowerFiles({ paths: { bowerDirectory: './app/bower_components'}}), {read: false}), {name: 'bower',relative:true}))
        .pipe(gulp.dest('./app'));
})

gulp.task('bower',function(){
    return bower()
        .pipe(gulp.dest('lib/'))
})

gulp.task('build-dev',['bower','inject-bower','inject-app']);
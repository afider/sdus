var gulp = require('gulp');
var postcss = require('gulp-postcss');
var cssnext = require('postcss-cssnext');
var precss = require('precss');
var concat = require('gulp-concat');
var cached = require('gulp-cached');
var watch = require('gulp-watch');
var browserSync = require('browser-sync').create();
var remember = require('gulp-remember');
var path = require('path');
var rename = require('gulp-rename');
var pxtorem = require('postcss-pxtorem');
var stripInlineComments = require('postcss-strip-inline-comments');
var scss = require('postcss-scss');

// SVG
var svgmin = require('gulp-svgmin');
var svgstore = require('gulp-svgstore');
var svg2string = require('gulp-svg2string');

function handleError(err) {

  console.log(err.toString());
  this.emit('end');
}

gulp.task('css', function () {
	var processors = [
		precss,
		cssnext( {browsers: ['> 1%', 'IE 10']} ),
		pxtorem( {replace: false} ),
	];

	var processorForOneLineComments = [stripInlineComments];

	return gulp.src([
		'./css/src/normalize.css',
		'./css/src/vars.css',
		'./css/src/mixins.css',
		'./css/src/extends.css',
		'./css/src/start.css',
		'./css/src/blocks.css',
	])
	.pipe(concat('common.css')).on('error', handleError)
	.pipe(cached('css')).on('error', handleError)
	.pipe(remember('css')).on('error', handleError)
	.pipe(postcss(processorForOneLineComments, {syntax: scss})).on('error', handleError)
	.pipe(postcss(processors)).on('error', handleError)
	//.pipe(postcss(fontMagician)).on('error', handleError)

	
	.pipe(gulp.dest('./css/build'));
});


gulp.task('svg', function () {
	return gulp
		.src('./img/svg-icons/nomin/*.svg', { base: './img/svg-icons/nomin/' })
		.pipe(svgmin())
		.pipe(svgstore())
		.pipe(svg2string())
		.pipe(rename('js/svg.js'))
		.pipe(gulp.dest('./'));
});

gulp.task('watch', function () {

	gulp.watch('css/src/**/*.css', ['css']).on('unlink', function(filepath){

		remember.forget('css', path.resolve(filepath));
	});
});

gulp.task('dev', ['css', 'watch'] );


gulp.task('server', function () {

	browserSync.init({
		server: './'
	});

	browserSync.watch([
		'./css/build/**/*.*', 
		'./js/**/*.*', 
		'./*.html'
		])
	.on('change', browserSync.reload);
});


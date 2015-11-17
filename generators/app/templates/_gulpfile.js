/**
 * gulpfile.js generated automaticly using <%= pkg.name %> <%= pkg.version %>
 * on <%= (new Date).toISOString().split('T')[0] %>
 */
var gulp = require('gulp'),
    useref = require('gulp-useref'),<% if (includeSass){ %>
    sass = require('gulp-sass'),<% } %><% if (includeLess){ %>
    less = require('gulp-less'),<% } %>
    path = require('path'),
	del = require('del'),
	autoprefixer = require('gulp-autoprefixer'),
	minifyCss = require('gulp-minify-css'),
	gulpif = require('gulp-if'),
	uglify = require('gulp-uglify'),
	imagemin = require('gulp-imagemin'),
	plumber = require('gulp-plumber'),
	pngquant = require('imagemin-pngquant'),
	wiredep = require('wiredep').stream,
	browserSync = require('browser-sync').create();

//CSS task
<% if (includeCss) { %>gulp.task('css', function() {
	return gulp.src('app/styles/*.css')
		.pipe(plumber())
		.pipe(autoprefixer({
			browsers: ['last 2 versions'],
			cascade: false
		}))
		.pipe(minifyCss({
			compatibility: 'ie8'
		}))
		.pipe(gulp.dest('.tmp/styles'));
});<% } %>

// Less task
<% if (includeLess) { %>gulp.task('less', ['css'], function() {
	return gulp.src('app/styles/*.less')
		.pipe(plumber())
		.pipe(less({
			relativeUrls: true,
			paths: [path.join('app/styles/', 'app/style/less')]
		}))
		.pipe(gulp.dest('.tmp/styles'))
});<% } %>

<% if (includeSass) { %>
//Sass task
gulp.task('sass', ['css'], function() {
	return gulp.src('app/styles/**/*.scss')
		.pipe(plumber())
		.pipe(sass({
			relativeUrls: true,
			paths: [path.join('app/styles/', 'app/styles/scss')]
		}))
		.pipe(gulp.dest('.tmp/styles'))
});<% } %>


// Default task
gulp.task('default', ['del', <% if (includeLess){ %>
	'less', <% } %>
	<% if (includeSass){ %>
	'sass', <% } %>
	'img'], function() {
	var assets = useref.assets();
	return gulp.src('app/*.*')
		.pipe(assets)
		.pipe(gulpif('*.js', uglify()))
		.pipe(assets.restore())
		.pipe(useref())
		.pipe(gulp.dest('dist'));
});

// Images task
gulp.task('img', function() {
	return gulp.src('app/img/**/*')
		.pipe(imagemin({
			progressive: true,
			svgoPlugins: [{
				removeViewBox: false
			}],
			use: [pngquant()]
		}))
		.pipe(gulp.dest('dist/img'));
});

gulp.task('html:watch', ['html'], browserSync.reload);
gulp.task('css:watch', ['css'], browserSync.reload);
<% if (includeSass){ %>
gulp.task('sass:watch', ['sass'], browserSync.reload);
<% } %>
<% if (includeLess){ %>
gulp.task('less:watch', ['less'], browserSync.reload);
<% } %>
gulp.task('js:watch', ['js'], browserSync.reload);

// Server
gulp.task('serve', ['wiredep', 'html', 'css'], function() {
	browserSync.init({
		server: {
			port: 9000,
			baseDir: ['.tmp', 'app'],
		}
	});

	gulp.watch("app/*.html").on('change', ['html'], browserSync.reload);
	gulp.watch("styles/*.css", ['css:watch']);
	<% if (includeLess){ %>
	gulp.watch("styles/*.less", ['less:watch']);
	<% } %>
	<% if (includeSass){ %>
	gulp.watch("styles/*.scss", ['sass:watch']);
	<% } %>
	gulp.watch("scripts/*.js", ['js:watch']);
});

// Cleaning dist before main task
gulp.task('del', function() {
	return del('dist');
});

// Automatically inject Bower components into HTML file
gulp.task('wiredep', function() {
	<% if(includeSass){ %>
	gulp.src('app/styles/*.scss')
		.pipe(wiredep({
			ignorePath: /^(\.\.\/)+/
		}))
		.pipe(gulp.dest('app/styles'));
	<% } %>
	<% if(includeLess){ %>
	gulp.src('app/styles/*.less')
		.pipe(wiredep({
			ignorePath: /^(\.\.\/)+/
		}))
		.pipe(gulp.dest('app/styles'));
	<% } %>
	<% if(includeCss){ %>
	gulp.src('app/styles/*.css')
		.pipe(wiredep({
			ignorePath: /^(\.\.\/)+/
		}))
		.pipe(gulp.dest('app/styles'));
	<% } %>
	gulp.src('app/*.html')
		.pipe(wiredep({
			<% if(includeBootstrap) {
			if(includeSass) { %>

			exclude: ['bootstrap-scss'],
				<%} else { %>
			exclude: ['boostrap.js'],
				<% }} %>
			ignorePath: /^(\.\.\/)*\.\./
		}))
		.pipe(gulp.dest('app'));

});

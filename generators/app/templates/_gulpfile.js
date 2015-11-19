/**
 * gulpfile.js generated automaticly using <%= pkg.name %> <%= pkg.version %>
 * on <%= (new Date).toISOString().split('T')[0] %>
 */
var gulp = require('gulp');
var gulpLoadPlugins = require('gulp-load-plugins');
var browserSync = require('browser-sync');
var wiredep = require('wiredep');
var wiredepStream = wiredep.stream;

var $ = gulpLoadPlugins();
var reload = browserSync.reload;

// HTML task
gulp.task('html', ['styles'], function() {

	var assets = $.useref.assets({
		searchPath: ['.tmp', 'app', '.']
	});
	return gulp.src('app/*.html')
	.pipe(assets)
		.pipe($.if('*.js', $.uglify()))
		.pipe($.if('*.css', $.minifyCss({
			compatibility: '*'
		})))
		.pipe(assets.restore())
		.pipe($.useref())
		.pipe($.if('*.html', $.minifyHtml({
			conditionals: true,
			loose: true
		})))
		.pipe(gulp.dest('dist'));
});

// Style task
gulp.task('styles', function() {
	<% if (includeCss) { %>
	return gulp.src('app/styles/*.css')
		.pipe($.plumber())
	<% } %>
	<% if (includeLess) { %>
	return gulp.src('app/styles/*.less')
		.pipe($.plumber())
		.pipe($.sourcemaps.init())
		.pipe($.less())

	<% } %>
	<% if (includeSass) { %>
	return gulp.src('app/styles/*.scss')
		.pipe($.plumber())
		.pipe($.sourcemaps.init())
		.pipe($.sass())

	<% } %>

		.pipe($.autoprefixer({
			browsers: ['last 2 versions'],
			cascade: false
		}))
		.pipe($.sourcemaps.write())
		.pipe(gulp.dest('.tmp/styles'));
});

// Default task
gulp.task('default', ['del', 'styles', 'img'], function() {
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

// Server
gulp.task('serve', ['wiredep', 'html', 'styles'], function() {
	browserSync.init({
		server: {
			port: 9000,
			baseDir: ['.tmp', 'app'],
	        routes: {
	          '/bower_components': 'bower_components'
	        }
		}
	});

	gulp.watch([
		'app/*.html',
		'app/scripts/**/*.js',
		'app/images/**/*',
		'.tmp/fonts/**/*'
	]).on('change', reload);

	gulp.watch('app/styles/**/*.*', ['styles']).on('change', reload);
	gulp.watch('app/fonts/**/*', ['fonts']);
	gulp.watch('bower.json', ['wiredep', 'fonts']);
});

// Cleaning dist before main task
gulp.task('del', function() {
	return del('dist');
});

// Automatically inject Bower components into HTML file
gulp.task('wiredep', function() {
	<% if(includeSass){ %>
	gulp.src('app/styles/*.scss')
		.pipe(wiredepStream({
			ignorePath: /^(\.\.\/)+/
		}))
		.pipe(gulp.dest('app/styles'));
	<% } %>
	<% if(includeLess){ %>
	gulp.src('app/styles/*.less')
		.pipe(wiredepStream({
			ignorePath: /^(\.\.\/)+/
		}))
		.pipe(gulp.dest('app/styles'));
	<% } %>
	<% if(includeCss){ %>
	gulp.src('app/styles/*.css')
		.pipe(wiredepStream({
			ignorePath: /^(\.\.\/)+/
		}))
		.pipe(gulp.dest('app/styles'));
	<% } %>
	gulp.src('app/*.html')
		.pipe(wiredepStream({
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

/**
 * gulpfile.js generated automaticly using <%= pkg.name %> <%= pkg.version %>
 * on <%= (new Date).toISOString().split('T')[0] %>
 */
var gulp = require('gulp'),
	useref = require('gulp-useref'),<% if (includeLess){ %>
	less = require('gulp-less'),
	LessPluginCleanCSS = require('less-plugin-clean-css'),
	cleancss = new LessPluginCleanCSS({ advanced : true}),
	LessPluginAutoPrefix = require('less-plugin-autoprefix'),
	autoprefix = new LessPluginAutoPrefix({ browsers : ['> 5%']}),<% } if (includeSass){ %><% } %>
	path = require('path'),
	livereload = require('gulp-livereload'),
	del = require('del'),
	gulpif = require('gulp-if'),
	uglify = require('gulp-uglify'),
	imagemin = require('gulp-imagemin'),
	plumber = require('gulp-plumber'),
	pngquant = require('imagemin-pngquant'),
	wiredep = require ('wiredep').stream;

gulp.task('default',['del',<% if (includeLess){ %> 'less',<% } else if (includeSass){%>'sass' <% } %> 'img'], function(){
	var assets = useref.assets();
    return gulp.src('app/*.*')
        .pipe(assets)
        .pipe(gulpif('*.js', uglify()))
        .pipe(assets.restore())
        .pipe(useref())
        .pipe(gulp.dest('dist'));
});

// Less task
<% if (includeLess) { %>
gulp.task('less', function(){
	return gulp.src('app/style/**/*.less')
	.pipe(plumber())
	.pipe(less({
		relativeUrls: true,
		plugins : [autoprefix, cleancss],
		paths : [ path.join( 'app/style/', 'app/style/less') ]
	}))
	.pipe(gulp.dest('.tmp/style'))
	.pipe(livereload());
});
<% } %>
// Images
gulp.task('img', function(){
	return gulp.src('app/img/**/*')
	.pipe(imagemin({
		progressive : true,
		svgoPlugins: [{removeViewBox: false}],
		use : [pngquant()]
	}))
	.pipe(gulp.dest('dist/img'));
});

// HTML
gulp.task('html', function(){
	return gulp.src('app/**/*.html')
	.pipe(livereload());
});


// app watch
gulp.task('watch', function(){
	livereload.listen();
	<% if (includeLess) { %>
	gulp.watch('app/style/**/*', ['less']);
	<% } %>
	gulp.watch('app/**/*.html', ['html']);
});

// Cleaning dist before main task
gulp.task('del', function(){
	return del('dist');
});

// Automatically inject Bower components into HTML file
gulp.task('wiredep', function () {
	<% if(includeSass){ %>
	gulp.src('app/style/*.scss')
	.pipe(wiredep({
		ignorePath: /^(\.\.\/)+/
	}))
	.pipe(gulp.dest('app/style'));
	<% } %>
	<% if(includeLess){ %>
	gulp.src('app/style/*.less')
	.pipe(wiredep({
		ignorePath: /^(\.\.\/)+/
	}))
	.pipe(gulp.dest('app/style'));
	<% } %>
	<% if(includeCss){ %>
	gulp.src('app/style/*.css')
	.pipe(wiredep({
		ignorePath: /^(\.\.\/)+/
	}))
	.pipe(gulp.dest('app/style'));
	<% } %>
	gulp.src('app/*.html')
	.pipe(wiredep({
		<% if(includeBootstrap) {
			if(includeSass) { %>
		exclude: ['bootstrap-scss'],
		<%} else { %>
		exclude : ['boostrap.js'],
		<% }} %>
		ignorePath: /^(\.\.\/)*\.\./
	}))
	.pipe(gulp.dest('app'));
});

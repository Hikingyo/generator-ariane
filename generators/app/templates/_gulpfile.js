/**
 * gulpfile.js generated automaticly by generator-cionfire
 */
var gulp = require('gulp'),
	useref = require('gulp-useref')<% if (includeLess){ %>,
	less = require('gulp-less'),
	LessPluginCleanCSS = require('less-plugin-clean-css'),
	cleancss = new LessPluginCleanCSS({ advanced : true}),
	LessPluginAutoPrefix = require('less-plugin-autoprefix'),
	autoprefix = new LessPluginAutoPrefix({ browsers : ['> 5%']})<% } %>,
	path = require('path'),
	livereload = require('gulp-livereload'),
	del = require('del'),
	gulpif = require('gulp-if'),
	uglify = require('gulp-uglify'),
	imagemin = require('gulp-imagemin'),
	plumber = require('gulp-plumber'),
	pngquant = require('imagemin-pngquant');

gulp.task('default',['del',<% if (includeLess){ %> 'less',<% } %> 'img'], function(){
	var assets = useref.assets();
    return gulp.src('app/*.*')
        .pipe(assets)
        .pipe(gulpif('*.js', uglify()))
        .pipe(assets.restore())
        .pipe(useref())
        .pipe(gulp.dest('dist'));
});

// Gestion des fichier less
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
// Gestion des images
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
})


// app watch
gulp.task('watch', function(){
	livereload.listen();
	<% if (includeLess) { %>
	gulp.watch('app/style/**/*', ['less']);
	<% } %>
	gulp.watch('app/**/*.html', ['html']);
});

// Reconstruction du dossier dist
gulp.task('del', function(){
	return del('dist');
});

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
var del = require('del');
var pngquant = require('imagemin-pngquant');

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
gulp.task('styles', function() {<% if (includeCss) { %>
	return gulp.src('app/styles/*.css')
		.pipe($.plumber())
        <% } %><% if (includeLess) { %>
	return gulp.src('app/styles/*.less')
		.pipe($.plumber())
		.pipe($.sourcemaps.init())
		.pipe($.less({
            paths:['.']
        }))<% } %><% if (includeSass) { %>
	return gulp.src('app/styles/*.scss')
		.pipe($.plumber())
		.pipe($.sourcemaps.init())
		.pipe($.sass.sync({
            outputStyle: 'expanded',
            precision : 10,
            includePaths : ['.']
        }).on('error', $.sass.logError))<% } %>
		.pipe($.autoprefixer({
			browsers: ['last 2 versions'],
			cascade: false
		}))
		.pipe($.sourcemaps.write())
		.pipe(gulp.dest('.tmp/styles'));
});

// Images task
gulp.task('img', function() {
	return gulp.src('app/img/**/*')
		.pipe($.if($.if.isFile, $.cache($.imagemin({
			progressive: true,
			svgoPlugins: [{
				removeViewBox: false,
                cleanupIDs : false
			}],
			use: [pngquant()]
		}))))
        .on('error', function (err) {
            console.log(err);
            this.end();
        })
		.pipe(gulp.dest('dist/img'));
});

// Fonts task
gulp.task('fonts', function () {
    return gulp.src(require('main-bower-files')('**/*.{eot,svg,ttf,woff,woff2}', function (err) {})
        .concat('app/fonts/**/*'))
        .pipe(gulp.dest('.tmp/fonts'))
        .pipe(gulp.dest('dist/fonts'));
});

// serve
gulp.task('serve', ['styles', 'fonts'], function() {
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
        '.tmp/fonts/**/*',
        '.tmp/stlyes/**.*.css'
    ]).on('change', reload);

    gulp.watch('app/styles/**/*.*', ['styles']);
    gulp.watch('app/fonts/**/*', ['fonts']);
    gulp.watch('bower.json', ['wiredep', 'fonts']);
});

// serve:test
gulp.task('serve:test', function () {
    browserSync({
        notify: false,
        port: 9000,
        ui: false,
        server: {
            baseDir: 'test',
            routes: {
                '/scripts': 'app/scripts',
                '/bower_components': 'bower_components'
            }
        }
    });

    gulp.watch('test/spec/**/*.js').on('change', reload);
    gulp.watch('test/spec/**/*.js', ['lint:test']);
});

// Cleaning dist before main task
gulp.task('clean', function() {
	return del('dist');
});

// serve:dist
gulp.task('serve:dist', function() {
    browserSync({
        notify: false,
        port: 9000,
        server: {
            baseDir: ['dist']
        }
    });
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
            exclude:['bootstrap/dist'],
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


// lint task
function lint(files, opt){
    return function () {
        return gulp.src(files)
            .pipe(reload({
                stream : true,
                once : true
            }))
            .pipe($.eslint(opt))
            .pipe($.eslint.format())
            .pipe($.if(!browserSync.active, $.eslint.failAfterError()));
    };
}

var testLintOptions = {
    env : {<% if(testFramework === 'mocha') { %>
        mocha: true<% }else if (testFramework === 'jasmine') { %>
        jasmine : true<%} %>
    }
};

gulp.task('lint', lint('app/scripts/**/*.js'));
gulp.task('lint:test', lint('test/spec/**/*.js', testLintOptions));

// build task
gulp.task('build', ['lint', 'html', 'img', 'fonts', 'extras'], function() {
    return gulp.src('dist/**/*').pipe($.size({title: 'build', gzip: true}));
});

//default task
gulp.task('default', ['clean'], function() {
    gulp.start('build');
});

// extras
gulp.task('extras', function() {
    return gulp.src([
        'app/*.*',
        '!app/*.html'
    ], {
        dot: true
    }).pipe(gulp.dest('dist'));
});

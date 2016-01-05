var gulp = require("gulp");
var $ = require("gulp-load-plugins")();
var config = require("../config").styles;

gulp.task('styles', function(){
    return gulp.src(config.src)
            .pipe($.plumber())<% if(!includeCss){%>
            .pipe($.sourcemaps.init())<%}%>
        <% if (includeLess) { %>
            .pipe($.less({
                paths:['.']
            }))<% } %><% if (includeSass) { %>
            .pipe($.sass.sync({
                outputStyle: 'expanded',
                precision : 10,
                includePaths : ['.']
            }).on('error', $.sass.logError))<% } %>
    .pipe($.autoprefixer(config.autoprefixer))<% if(!includeCss){%>
        .pipe($.sourcemaps.write())<%}%>
        .pipe(gulp.dest(config.dest));
});

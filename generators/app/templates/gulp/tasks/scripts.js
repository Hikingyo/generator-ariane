/**
 * Created by hikingyo on 13/09/16.
 * gulp task scripts
 */
"use strict";

var gulp = require("gulp");
var $ = require("gulp-load-plugins")();
var browserSync = require("browser-sync");
var reload = browserSync.reload;
var config = require("../config").scripts;

gulp.task('scripts', function() {
    return gulp.src(config.src)
        .pipe($.plumber())
        .pipe($.sourcemaps.init())<% if(useBabel){ %>
        .pipe($.babel())<% } %>
        .pipe($.sourcemaps.write('.'))
        .pipe(gulp.dest(config.dest))
        .pipe(reload({stream: true}));
});

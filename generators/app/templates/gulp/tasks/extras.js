/**
* extras task
**/
"use strict";

var gulp = require("gulp");
var $ = require("gulp-load-plugins")();
var config = require("../config").extras;

gulp.task('extras', function() {
    return gulp.src(config.src, config.options)
    .pipe(gulp.dest(config.dest));
});

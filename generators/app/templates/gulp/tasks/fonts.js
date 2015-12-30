/**
* fonts task
**/
"use strict";

var gulp = require("gulp");
var config = require("../config").fonts;

gulp.task('fonts', function () {
    return gulp.src(require('main-bower-files')('**/*.{eot,svg,ttf,woff,woff2}', function (err) {})
        .concat(config.src))
        .pipe(gulp.dest(config.tmp))
        .pipe(gulp.dest(config.dest));
});

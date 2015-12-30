/**
* build task
**/
"use strict";

var gulp = require("gulp");
var $ = require("gulp-load-plugins")();
var config = require("../config").build;

gulp.task('build', ['lint', 'html', 'img', 'fonts', 'extras'], function() {
    return gulp.src(config.src).pipe($.size({title: 'build', gzip: true}));
});

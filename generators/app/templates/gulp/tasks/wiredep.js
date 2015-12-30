/**
* wiredep task
**/
"use strict";

var gulp = require("gulp");
var $ = require("gulp-load-plugins")();
var wiredep = require('wiredep');
var wiredepStream = wiredep.stream;
var config = require("../config").wiredep;

gulp.task('wiredep', function() {
gulp.src(config.styles.src)
    .pipe(wiredepStream(config.styles.wiredepStream))
	.pipe(gulp.dest(config.styles.dest));

	gulp.src(config.html.src)
		.pipe(wiredepStream(config.html.wiredepStream))
		.pipe(gulp.dest(config.html.dest));

});

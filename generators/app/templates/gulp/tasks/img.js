/**
* img task
**/
"use strict";

var gulp = require("gulp");
var $ = require("gulp-load-plugins")();
var config = require("../config").img;
var pngquant = require('imagemin-pngquant');

gulp.task('img', function() {
	return gulp.src(config.src)
		.pipe($.if($.if.isFile, $.cache($.imagemin({
			progressive: config.progressive,
			svgoPlugins: config.svgoPlugins,
			use: [pngquant()]
		}))))
        .on('error', function (err) {
            console.log(err);
            this.end();
        })
		.pipe(gulp.dest(config.dest));
});

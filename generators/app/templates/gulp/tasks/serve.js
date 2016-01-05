/**
* serve task
**/
"use strict";

var gulp = require("gulp");
var $ = require("gulp-load-plugins")();
var config = require("../config").serve;
var browserSync = require("browser-sync");
var reload = browserSync.reload;

gulp.task('serve', ['styles', 'fonts'], function() {
	browserSync.init(config.browsersync);

    gulp.watch(config.watch_reload).on('change', reload);

    gulp.watch(config.watch.styles, ['styles']);
    gulp.watch(config.watch.fonts, ['fonts']);
    gulp.watch(config.watch.bower, ['wiredep', 'fonts']);
});

var testConfig = config.test;

gulp.task('serve:test', function () {
    browserSync(testConfig.browsersync);

    gulp.watch(testConfig.watch).on('change', reload);
    gulp.watch(testConfig.watch, ['lint:test']);
});

var distConfig = config.dist;

gulp.task('serve:dist', function() {
    browserSync(distConfig.browsersync);
});

/**
* lint task
**/
"use strict";

var gulp = require("gulp");
var config = require("../config").lint;
var browserSync = require("browser-sync");
var reload = browserSync.reload;
var $ = require("gulp-load-plugins")();

function lint(files, opt){
    return function () {
        return gulp.src(files)
            .pipe(reload(config.reload))
            .pipe($.eslint(opt))
            .pipe($.eslint.format())
            .pipe($.if(!browserSync.active, $.eslint.failAfterError()));
    };
}

var testLintOptions = config.test.options;

gulp.task('lint', lint(config.src));
gulp.task('lint:test', lint(config.test.src, testLintOptions));

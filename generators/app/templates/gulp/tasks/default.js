/**
* Default task.
* Cleaning dest folder before building
**/
"use Strict";

var gulp = require("gulp");

gulp.task("default", ["clean"], function () {
    gulp.start("build");
})

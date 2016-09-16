// Avoid `console` errors in browsers that lack a console.
"use strict";
(function() {
    let noop = function () {};
    const methods = [
        "assert", "clear", "count", "debug", "dir", "dirxml", "error",
        "exception", "group", "groupCollapsed", "groupEnd", "info", "log",
        "markTimeline", "profile", "profileEnd", "table", "time", "timeEnd",
        "timeline", "timelineEnd", "timeStamp", "trace", "warn"
    ];
    let console = (window.console = window.console || {});
    methods.forEach((method)=>{
        if (!console[method]){
            console[method] = noop;
        }
    })
}());

// Place any jQuery/helper plugins in here.

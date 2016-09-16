/**
 * Gulp tasks config
 */

"use strict";

var src = "./app";
var dest = "./dist";
var tmp = "./.tmp";

module.exports = {
    html: {
        "src": src,
        "dest": dest,
        "useref": {
            "searchPath": [
                '.tmp',
                'app',
                '.'
            ]
        },
        "minifyCss": {
            "compatibility": "*"
        },
        "minifyHtml": {
            "conditionals": true,
            "loose": true
        }
    },
    styles: {
        "src": src + "/styles/*" + <% if(includeCss) { %>".css"<% } if(includeLess){ %>".less"<% } if(includeSass){ %>".scss"<% } %>,
        "dest": tmp + "/styles",
        "autoprefixer": {
            "browsers": ['last 2 versions'],
            "cascade": false
        }<% if(includeSass) { %>,
        "options": {
            outputStyle: 'expanded',
            precision : 10,
            includePaths : ['.']
        }<% } %>
    },
    scripts: {
        "src": src + "/scripts/**/*.js",
        "dest": tmp + "/scripts"
    },
    img: {
        "src": src + "/img/**/*",
        "dest": dest + "/img",
        "imagemin": {
            "progressive": true,
            "svgoPlugins": [{
                "removeViewBox": false,
                "cleanupIDs": false
            }]
        }
    },
    fonts: {
        "src": src + "/fonts/**/*",
        "dest": dest + "/fonts",
        "tmp": tmp + "/fonts"
    },
    serve: {
        "browsersync": {
            "port": 9000,
            "server": {
                "baseDir": [tmp, src],
                "routes": {
                    "/bower_components": "bower_components"
                }
            }
        },
        "watch_reload": [
            src + "/*.html",
            src + "/scripts/**/*.js",
            src + "/img/**/*",
            tmp + "/fonts/**/*",
            tmp + "/styles/**/*.css"
        ],
        "watch": {
            "styles": src + "/styles/**/*",
            "fonts": src + "/fonts/**/*",
            "bower": "bower.json"
        },
        "test": {
            "browsersync": {
                "notify": false,
                "port": 9001,
                "ui": false,
                "server": {
                    "baseDir": "test",
                    routes: {
                    '/scripts': 'app/scripts',
                    '/bower_components': 'bower_components'
                    }
                }
            },
            "watch": {
                "spec": "test/spec/**/*.js"
            }
        },
        "dist": {
            "browsersync": {
                "notify": false,
                "port": 9002,
                "server": {
                    "baseDir": [dest]
                }
            }
        }
    },
    clean : {
        "dest" : dest
    },
    wiredep: {
        "styles": {
            "src": src + "/styles" + <% if(includeCss){ %>".css"<% } if(includeLess){ %>".less"<% } if(includeSass){ %>".scss"<% } %>,
            "dest": src + "/styles",
            "wiredepStream":{
                <% if(includeLess){ %>"exclude": ["bootstrap/dist"],<% } %>
                "ignorePath": /^(\.\.\/)+/
            }
        },
        "html": {
            "src": src + "/*.html",
            "dest": src,
            "wiredepStream":{
                <% if(includeBootstrap){ if(includeSass){ %>"exclude": ['bootstrap-scss'],<% } else { %>"exclude": ['bootstrap.js'],<% } } %>
                "ignorePath": /^(\.\.\/)*\.\./
            }
        }
    },
    lint: {
        "reload": {
            "stream": true,
            "once": true
        },
        "src": src + "/scripts/**/*.js",
        "test": {
            "src": "test/spec/**/*.js",
            "options": {
                "env": {
                    "node": true,<% if(testFramework === "mocha"){ %>
                    "mocha": true<% } else if(testFramework === "jasmine") { %>
                    "jasmine" : true<% } %>
                }
            }
        }
    },
    build: {
        "src": src + "/**/*"
    },
    extras: {
        "src": [
            src + "*.*",
            "!" + src + "/*.html"
        ],
        "options":{
            "dot": true
        },
        "dest": dest
    }
};

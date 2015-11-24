'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-generator').test;
var testPath = '../cionfire_test';
var appPath = '../generators/app';

describe('gulp tasks', function () {
    before(function (done) {
        helpers.run(path.join(__dirname,appPath))
            .inDir(testPath)
            .withOptions({skipInstall: true})
            .withPrompts(
                {
                    features: []
                })
            .on('end', done);
    });

    it('should contain necessary tasks', function () {
        [
            'styles',
            'lint',
            'lint:test',
            'html',
            'img',
            'fonts',
            'extras',
            'clean',
            'serve',
            'serve:dist',
            'serve:test',
            'wiredep',
            'build',
            'default'
        ].forEach(function (task) {
            assert.fileContent('gulpfile.js', 'gulp.task(\'' + task);
        });
    });
});

describe('grunt tasks', function () {
    before(function (done) {
        helpers.run(path.join(__dirname,appPath))
            .inDir(testPath)
            .withOptions({skipInstall: true})
            .withPrompts(
                {
                    features: [],
                    taskRunner : 'grunt'
                })
            .on('end', done);
    });

    it('should create Gruntfile.js', function () {
        assert.file('Gruntfile.js');
    });

    it('should have default packages', function (){
        [
            "grunt",
            "grunt-browser-sync",
            "grunt-concurrent",
            "grunt-contrib-clean",
            "grunt-contrib-concat",
            "grunt-contrib-copy",
            "grunt-contrib-cssmin",
            "grunt-contrib-htmlmin",
            "grunt-contrib-mocha",
            "grunt-contrib-uglify",
            "grunt-contrib-watch",
            "grunt-eslint",
            "grunt-filerev",
            "grunt-newer",
            "grunt-postcss",
            "grunt-svgmin",
            "grunt-usemin",
            "grunt-wiredep",
            "jit-grunt",
            "time-grunt",
            "grunt-mocha"
        ].forEach(function (pckg) {
            assert.fileContent('package.json', pckg);
        });
    });
});

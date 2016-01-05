'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');
var testPath = '../ariane_test';
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

    it('should copying the tasks files', function(){
        [
            'styles',
            'lint',
            'html',
            'img',
            'fonts',
            'extras',
            'clean',
            'serve',
            'wiredep',
            'build',
            'default'
        ].forEach(function (task) {
            assert.file('gulp/tasks/' + task + '.js');
        });
    });

    it('shoudl copyinig the config file', function () {
        assert.file('gulp/config.js');
    })
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
            "grunt-mocha",
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

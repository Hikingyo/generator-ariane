'use strict';

var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-generator').test;
var testPath = '../cionfire_test';
var appPath = '../generators/app';

describe('Bootstrap feature', function () {
    describe('on', function () {
        before(function (done) {

            helpers.run(path.join(__dirname, appPath))
                .inDir(testPath)
                .withOptions(
                    {
                        'skip-install': true
                    })
                .withPrompts(
                    {
                        features: [
                            'includeBootstrap'
                        ]
                    })
                .on('end', done);
        });

        it('adds the Bootstrap dependency', function () {
            assert.fileContent('bower.json', '"bootstrap"');
        });

        it('don\'t explicitly add the jQuery dependency', function () {
            assert.noFileContent('bower.json', 'jquery');
        });
    });

    describe('off', function () {
        before(function (done) {
            helpers.run(path.join(__dirname, appPath))
                .inDir(testPath)
                .withOptions(
                    {
                        'skip-install': true
                    })
                .withPrompts(
                    {
                        features: []
                    })
                .on('end', done);
        });

        it('don\'t the Bootstrap dependency', function () {
            assert.noFileContent('bower.json', '"bootstrap"');
        });

        it('should explicitly add the jQuery dependency', function () {
            assert.fileContent('bower.json', 'jquery');
        });
    });

    // Testing with Css
    describe('with only css', function () {
        before(function(done) {
            helpers.run(path.join(__dirname, appPath))
                .inDir(testPath)
                .withOptions({ 'skip-install': true})
                .withPrompts(
                    {
                        features : [
                            'includeBootstrap'
                        ],
                        stylessheetlanguage : 'css'

                    }
                )
                .on('end', done);
        });

        it('should use Bootstrap', function(){
            assert.fileContent('bower.json', '"bootstrap"');
        });

        it("should output the correct <script> paths", function(){
            assert.fileContent('app/index.html', /src="(.*?)\/bootstrap\/js\//);
        });

        it('should correctly override Bootstrap\'s bower.json', function() {
            assert.fileContent('bower.json', 'dist/css/bootstrap.css');
            assert.fileContent('bower.json', 'dist/js/bootstrap.js');
            assert.fileContent('bower.json', 'dist/fonts/*');
        });

        it('should create main.css file', function(){
            assert.file('app/styles/main.css');
        });
    });

    describe('with Sass', function() {
        before(function(done) {
            helpers.run(path.join(__dirname, appPath))
                .inDir(testPath)
                .withOptions({'skip-install': true})
                .withPrompts(
                    {
                        features : [
                            'includeBootstrap'
                        ],
                        stylessheetlanguage : 'sass'
                    }
                )
                .on('end', done);
        });

        it('should use Bootstrap Sass', function() {
            assert.fileContent('bower.json', '"bootstrap-sass"');
        });

        it('main.scss should contain the font path variable', function(){
            assert.fileContent('app/styles/main.scss', '$icon-font-path');
        });

        it('should correctly override Bootstrap\'s bower.js', function (){
            assert.fileContent('bower.json', '"overrides"');
            assert.fileContent('bower.json', 'assets/stylesheets/_bootstrap.scss');
            assert.fileContent('bower.json', 'assets/fonts/bootstrap/*');
            assert.fileContent('bower.json', 'assets/javascripts/bootstrap.js');
        });
    });
    describe('with Less', function() {
        before(function(done) {
            helpers.run(path.join(__dirname, appPath))
                .inDir(testPath)
                .withOptions({'skip-install': true})
                .withPrompts(
                    {
                        features : [
                            'includeBootstrap'
                        ],
                        stylessheetlanguage : 'less'
                    }
                )
                .on('end', done);
        });

        it('should use Bootstrap', function() {
            assert.fileContent('bower.json', '"bootstrap"');
        });

        it('should correctly override Boostrap\'s bower.json', function() {
            assert.fileContent('bower.json', '"overrides"');
            assert.fileContent('bower.json', 'less/bootstrap.less');
            assert.fileContent('bower.json', 'dist/js/bootstrap.js');
            assert.fileContent('bower.json', 'dist/fonts/*');
        });

        it('should create main.less file', function(){
            assert.file('app/styles/main.less');
        });

        it('should contain @include Bootstrap variable', function () {
            assert.fileContent('app/styles/main.less', 'bower_components/bootstrap/less/bootstrap.less');
        })
    });
});

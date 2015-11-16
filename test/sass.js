'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var testPath = '../cionfire_test';
var appPath = '../generators/app';

describe('Sass feature', function () {
    describe('on', function () {
        before(function (done) {
            helpers.run(path.join(__dirname, appPath))
                .inDir(testPath)
                .withOptions({'skip-install': true})
                .withPrompts({
                    features: [],
                    stylessheetlanguage : 'sass'
                })
                .on('end', done);
        });

        it('should create an SCSS file', function () {
            assert.file('app/style/main.scss');
        });
    });

    describe('off', function () {
        before(function (done) {
            helpers.run(path.join(__dirname, appPath))
                .inDir(testPath)
                .withOptions({'skip-install': true})
                .withPrompts({
                    features: [],
                    stylessheetlanguage : 'css'
                })
                .on('end', done);
        });

        it('should create a CSS file', function () {
            assert.file('app/style/main.css');
        });
    });
});

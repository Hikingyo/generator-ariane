'use strict';

var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-generator').test;
var testPath = '../cionfire_test';
var appPath = '../generators/app';

describe('Less feature', function () {
    describe('on', function () {
        before(function (done) {
            helpers.run(path.join(__dirname, appPath))
                .inDir(testPath)
                .withOptions({'skip-install': true})
                .withPrompts({
                    username: '',
                    projectName: '',
                    projectDescription: '',
                    repoURL : 'https://github.com/taptapship/wiredep.git',
                    repoType : '',
                    features: [],
                    stylesSheetLanguage : 'less'
                })
                .on('end', done);
        });

        it('should create an LESS file', function () {
            assert.file('app/styles/main.less');
        });
    });

    describe('off', function () {
        before(function (done) {
            helpers.run(path.join(__dirname, appPath))
                .inDir(testPath)
                .withOptions({'skip-install': true})
                .withPrompts({
                    username: '',
                    projectName: '',
                    projectDescription: '',
                    repoURL : 'https://github.com/taptapship/wiredep.git',
                    repoType : '',
                    features: [],
                    stylesSheetLanguage : 'css'
                })
                .on('end', done);
        });

        it('should create a CSS file', function () {
            assert.file('app/styles/main.css');
        });
    });
});

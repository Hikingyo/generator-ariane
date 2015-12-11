
'use strict';
var path = require('path');
var helpers = require('yeoman-generator').test;
var assert = require('yeoman-assert');
var testPath = '../ariane_test';
var appPath = '../generators/app';

describe('test framework', function () {
    describe('mocha', function () {
        before(function (done) {
            helpers.run(path.join(__dirname, appPath))
                .inDir(testPath)
                .withOptions({
                    'skip-install': true,
                    'test-framework': 'mocha'
                })
                .withPrompts({features: []})
                .on('end', done);
        });

        it('uses the correct ESLint environment', function () {
            assert.fileContent('gulpfile.js', 'mocha');
        });

        it('generates the expected fixture', function () {
            assert.fileContent('test/index.html', 'mocha');
        });
    });

    describe('jasmine', function () {
        before(function (done) {
            helpers.run(path.join(__dirname, appPath))
                .inDir(testPath)
                .withOptions({
                    'skip-install': true,
                    'test-framework': 'jasmine'
                })
                .withPrompts({features: []})
                .on('end', done);
        });

        it('uses the correct ESLint environment', function () {
            assert.fileContent('gulpfile.js', 'jasmine');
        });

        it('generates the expected fixture', function () {
            assert.fileContent('test/index.html', 'jasmine');
        });
    });
});

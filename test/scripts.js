'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');
var testPath = '../ariane_test';
var appPath = '../generators/app';

describe('babel', function () {
    describe('on', function () {
        before(function (done) {
            helpers.run(path.join(__dirname, appPath))
                .inDir(testPath)
                .withOptions({skipInstall: true})
                .withPrompts(
                    {
                        features: []
                    })
                .on('end', done);
        });

        it('eslint should contains ES6 config parameter', function () {
            assert.fileContent('.eslintrc', '"ecmaVersion": 6')
        });

        it('package.json should contains babel packages', function () {
            assert.fileContent('package.json', 'babel-core') && assert.fileContent('package.json', 'babel-preset-es2015')
        });

        it('should contain a .babelrc file', function() {
            assert.file('.babelrc');
        })

        it('should tasks/scripts.js contains babel', function() {
            assert.fileContent('gulp/tasks/scripts.js', 'babel');
        })
    });

    describe('off', function () {
        before(function (done) {
            helpers.run(path.join(__dirname, appPath))
                .inDir(testPath)
                .withOptions({skipInstall: true})
                .withPrompts(
                    {
                        features: [],
                        scriptingLanguage: 'js'
                    })
                .on('end', done);
        });

        it('eslint shouldn\'t contains ES6 config parameter', function () {
            assert.noFileContent('.eslintrc', '"ecmaVersion": 6')
        });

        it('package.json shouldn\'t contains babel packages', function () {
            assert.noFileContent('package.json', 'babel-core') && assert.noFileContent('package.json', 'babel-preset-es2015')
        });

        it('should not contain a .babelrc file', function() {
            assert.noFile('.babelrc');
        })
    });

    it('should create main.js and plugin.js files', function () {
        assert.file([
            'app/scripts/main.js',
            'app/scripts/plugins.js'
        ]);
    });
});

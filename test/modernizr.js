'use strict';

var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');
var appPath = '../generators/app';

describe('modernizr feature', function () {
    describe('including Modernizr', function () {
        before(function (done) {
            helpers.run(path.join(__dirname, appPath))
                .withOptions({
                    'skip-install' : true
                })
                .withPrompts({
                    features : ['includeModernizr'],
                })
                .on('end', done);
        });

        it('adds the bower dependency', function () {
            assert.fileContent('bower.json', '"modernizr"');
        });
    });

    describe('not including Modernizr', function () {
        before(function (done) {
            helpers.run(path.join(__dirname, appPath))
                .withOptions({
                    'skip-install' : true
                })
                .withPrompts({
                    features : []
                })
                .on('end', done);
        });

        it('don\'t add the bower dependency', function () {
            assert.noFileContent('bower.json', '"modernizr"');
        });
    });
});

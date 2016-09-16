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
            'default',
            'scripts'
        ].forEach(function (task) {
            assert.file('gulp/tasks/' + task + '.js');
        });
    });

    it('should copying the config file', function () {
        assert.file('gulp/config.js');
    })
});

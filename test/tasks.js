'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-generator').test;
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

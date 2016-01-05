'use strict';

var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');
var testPath = '../ariane_test';
var appPath = '../generators/app';

describe('general', function () {

    it('can be require without throwing', function () {
        this.app = require('../generators/app');
    });

    describe('default config', function () {
        before(function (done) {
            helpers.run(path.join(__dirname, appPath))
                .inDir(testPath)
                .withOptions({skipInstall: true})
                .withPrompts(
                    {
                        username: '',
                        projectName: '',
                        projectDescription: '',
                        repoURL: 'git://github.com/taptapship/wiredep.git',
                        repoType: 'git',
                        features: [],
                        stylesSheetLanguage: ''
                    })
                .on('end', done);
        });

        it('default username', function () {
            assert.fileContent('package.json', 'JohnDoe');
        });

        it('default projectName', function () {
            assert.fileContent('package.json', 'ariane');
        });

        it('default project description', function () {
            assert.fileContent('package.json', 'A sample project.')
        });

        it('test project repository type', function () {
            assert.fileContent('package.json', '');
        });

        it('test repo URL', function () {
            assert.fileContent('package.json', /([--:\w?@%&+~#=]*\.[a-z]{2,4}\/{0,2})((?:[?&](?:\w+)=(?:\w+))+|[--:\w?@%&+~#=]+)?/g);
        });

        it('should create gulpfile.js', function () {
            assert.file('gulpfile.js');
        });

    });

    describe('copying files', function () {
        before(function (done) {
            helpers.run(path.join(__dirname, appPath))
                .inDir(testPath)
                .withOptions({skipInstall: true})
                .withPrompts(
                    {
                        username: '',
                        projectName: '',
                        projectDescription: '',
                        repoURL: '',
                        features: []
                    })
                .on('end', done);
        });

        it('creates config files', function () {
            assert.file([
                'bower.json',
                'package.json',
                '.editorconfig',
                '.gitignore',
                '.eslintrc',
                '.bowerrc'
            ]);
        });

        it('creates app root files', function () {
            assert.file([
                'app/humans.txt',
                'app/robots.txt',
                'app/favicon.ico',
                'app/largetile.png',
                'app/smalltile.png',
                'app/mediumtile.png',
                'app/apple-touch-icon.png',
                'app/browserconfig.xml',
                'app/crossdomain.xml'
            ])
        });
    });
});

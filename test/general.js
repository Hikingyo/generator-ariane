'use strict';

var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-generator').test;
var testPath = '../cionfire_test';
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
                        repoURL : 'https://github.com/taptapship/wiredep.git',
                        repoType : '',
                        features: [],
                        stylesSheetLanguage : ''
                    })
                .on('end', done);
        });

        it('default username', function () {
            assert.fileContent('package.json', 'JohnDoe');
        });

        it('default projectName', function () {
            assert.fileContent('package.json', 'CiOnFire');
        });

        it('default project description', function () {
            assert.fileContent('package.json', 'A sample project.')
        });

        it('default project repository type', function(){
            assert.fileContent('package.json', 'git');
        });

        it('test repo URL', function(){
            assert.fileContent('package.json', /([--:\w?@%&+~#=]*\.[a-z]{2,4}\/{0,2})((?:[?&](?:\w+)=(?:\w+))+|[--:\w?@%&+~#=]+)?/g);
        });

    });

    describe('copying files', function () {
        before(function (done) {
            helpers.run(path.join(__dirname,appPath))
                .inDir(testPath)
                .withOptions({skipInstall: true})
                .withPrompts(
                    {
                        username: '',
                        projectName: '',
                        projectDescription: '',
                        repoURL : 'http://my_test_repo.git',
                        repoType : '',
                        features: []
                    })
                .on('end', done);
        });

        it('creates config files', function () {
            assert.file([
                'bower.json',
                'package.json',
                'gulpfile.js',
                '.editorconfig',
                '.gitignore',
                '.jshintrc',
                '.bowerrc'
            ]);
        });

        it('creates app root files', function () {
            assert.file([
                'app/humans.txt',
                'app/robots.txt',
                'app/favicon.ico',
                'app/tile-wide.png',
                'app/tile.png',
                'app/apple-touch-icon.png',
                'app/browserconfig.xml',
                'app/crossdomain.xml'
            ])
        });
    });
});

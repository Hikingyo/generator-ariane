'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var os = require('os');
var fs = require('fs-extra');

describe('general', function () {

  it('can be require without throwing', function() {
    this.app = require('../generators/app');
  });

  describe('default config', function () {
    before(function (done) {
      helpers.run(path.join(__dirname, '../generators/app'))
      .inDir('../tmp')
      .withOptions({ skipInstall: true })
      .withPrompts(
        {
          username: '',
          projectname : '',
          projectdescription : '',
          features : []
        })
      .on('end', done);
    });

    it('default username', function () {
      assert.fileContent('package.json', 'JohnDoe');
    });

    it('default projectname', function () {
      assert.fileContent('package.json', 'webapp');
    });

    it('default project description', function () {
      assert.fileContent('package.json', 'A sample project.')
    });

  });

  describe('copying files', function () {
    before(function (done) {
      helpers.run(path.join(__dirname, '../generators/app'))
      .inDir('../tmp')
      .withOptions({ skipInstall: true })
      .withPrompts(
        {
          username: '',
          projectname : '',
          projectdescription : '',
          features : []
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

    it('creates app root files', function (){
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

    it('copying docs', function (){
      assert.file([
        'docs/faq.md',
        'docs/usage.md',
        ]);
    });
  });

});

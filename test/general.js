'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var os = require('os');

describe('general', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../generators/app'))
      .withOptions({ skipInstall: true })
      .withPrompts({ username: '' })
      .withPrompts({ features : []})
      .on('end', done);
  });

  it('can be require without throwing', function() {
    this.app = require('../generators/app');
  });

  it('creates files', function () {
    assert.file([
      'app/humans.txt',
      'app/robots.txt',
      'bower.json',
      'package.json',
      'gulpfile.js',
      '.editorconfig',
      '.gitignore',
      '.jshintrc'
    ]);
  });

  it('default username', function () {
    assert.fileContent('package.json', 'JohnDoe');
  });

});

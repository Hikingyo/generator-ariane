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

  it('default username', function () {
    assert.fileContent('package.json', 'JohnDoe');
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

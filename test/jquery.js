'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var os = require('os');

describe('jquery', function () {
	describe('including jQuery', function () {
		before(function (done) {
			helpers.run(path.join(__dirname, '../generators/app'))
			.withOptions({
				'skip-install' : true
			})
			.withPrompts({
				username : '',
				features : [],
				includeJQuery : true
			})
			.on('end', done);
		});

		it('adds the bower dependency', function () {
			assert.fileContent('bower.json', '"jquery"');
		});
	});

	describe('not including jQuery', function () {
		before(function (done) {
			helpers.run(path.join(__dirname, '../generators/app'))
			.withOptions({
				'skip-install' : true
			})
			.withPrompts({
				username : '',
				features : [],
				includeJQuery : false
			})
			.on('end', done);
		});

		it('don\'t add the bower dependency', function () {
			assert.noFileContent('bower.json', '"jquery"');
		});
	});
});
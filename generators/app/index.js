'use strict';

var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var _s = require('underscore.string');
var mkdirp = require('mkdirp');
var wiredep = require('wiredep');


module.exports = yeoman.generators.Base.extend({

	constructor: function() {

		var testLocal;

		yeoman.Base.apply(this, arguments);

		this.option('skip-welcome-message', {
			desc: 'Skip the welcome message',
			type: Boolean
		});

		this.option('skip-install-message', {
			desc: 'Skip the message after installation dependencies',
			type: Boolean
		});

		this.option('babel', {
			desc: 'Use Babel',
			type: Boolean,
			defaults: true
		});

		this.option('test-framework', {
			desc: 'Test framework to be invoked',
			type: String,
			defaults: 'mocha'
		});

		if (this.options['test-framework'] === 'mocha') {
			testLocal = require.resolve('generator-mocha/generators/app/index.js');
		} else {
			testLocal = require.resolve('generator-jasmin/generators/app/index.js');
		}

		this.composeWith(this.options['test-framework'] + ':app', {
			options: {
				'skip-install': this.options['skip-install']
			}
		}, {
			local: testLocal
		});

	},

	initializing: function() {
		this.pkg = require('../../package.json');
	},

	prompting: function() {
		var done = this.async();

		// Have Yeoman greet the user.
		if (!this.options['skip-install-message']) {
			this.log(yosay(
				'Welcome to the amazing ' + chalk.red('Cionfire') + ' generator!'
			));
		}

		var prompts = [{
				type: 'input',
				name: 'username',
				message: 'What\'s your username',
				default: 'JohnDoe'
			},

			{
				type: 'input',
				name: 'projectname',
				message: 'What\'s your project name',
				default: 'webapp'
			},

			{
				type: 'input',
				name: 'projectdescription',
				message: 'Describe your project',
				default: 'A sample project.'
			},

            {
                type: 'input',
                name: 'repoURL',
                message: 'The repository URL',
                default: ''
            },

            {
                type: 'input',
                name: 'repoType',
                message: 'Type of the repository (eg. git, hg ...)',
                default: 'git'
            },

			{
				type: 'checkbox',
				name: 'features',
				message: 'What more would you like?',
				choices: [{
					name: 'Bootstrap',
					value: 'includeBootstrap',
					checked: true
				}, {
					name: 'Modernizr',
					value: 'includeModernizr',
					checked: true
				}]
			},

			{
				type: 'list',
				name: 'stylessheetlanguage',
				message: 'Which stylesheet language would you use ?',
				default: 0, // Css
				choices: [{
					name: 'CSS',
					value: 'css',
				}, {
					name: 'LESS',
					value: 'less'
				}, {
					name: 'SASS',
					value: 'sass',
				}, ]
			},

			{
				type: 'confirm',
				name: 'includeJQuery',
				message: 'Would you like to include jQuery ?',
				default: true,
				when: function(answers) {
					return answers.features.indexOf('includeBootstrap') === -1;
				}
			}
		];

		this.prompt(prompts, function(answers) {

			var features = answers.features;

			function hasFeature(feat) {
				return features && features.indexOf(feat) !== -1;
			}

			this.username = answers.username;
            this.projectname = answers.projectname;
            this.projectdescription = answers.projectdescription;
            this.repoURL = answers.repoURL;
            this.repoType = answers.repoType,
            this.includeBootstrap = hasFeature('includeBootstrap');
            this.includeJQuery = answers.includeJQuery;
            this.includeModernizr = hasFeature('includeModernizr');
            this.includeLess = answers.stylessheetlanguage == 'less';
            this.includeSass = answers.stylessheetlanguage == 'sass';
            this.includeCss = answers.stylessheetlanguage == 'css';

			done();
		}.bind(this));
	},

	writing: {

		gulpfile: function() {
			this.fs.copyTpl(
				this.templatePath('_gulpfile.js'),
				this.destinationPath('gulpfile.js'), {
					pkg: this.pkg,
					includeLess: this.includeLess,
					includeSass: this.includeSass,
					includeCss: this.includeCss,
					includeBootstrap: this.includeBootstrap
				}
			);
		},

		packageJSON: function() {
			this.fs.copyTpl(
				this.templatePath('_package.json'),
				this.destinationPath('package.json'), {
					includeLess: this.includeLess,
					includeSass: this.includeSass,
					username: this.username,
					projectname: this.projectname,
					projectdescription: this.projectdescription,
                    repoURL: this.repoURL,
                    repoType : this.repoType,
					testFramework: this.options['test-framework'],
					useBabel: this.options['babel']
				}
			);
		},

		bower: function() {

			var bowerJson = {
				name: _s.slugify(this.projectname),
				private: true,
				dependencies: {}
			};

			// Bootstrap
			if (this.includeBootstrap) {

				if (this.includeLess) {
					bowerJson.dependencies['bootstrap'] = '~3.3.5';
					bowerJson.overrides = {
						'bootstrap': {
							'main': [
								'less/bootstrap.less',
								'dist/js/bootstrap.js',
								'dist/fonts/*'
							]
						}
					};
				} else if (this.includeSass) {
					bowerJson.dependencies['bootstrap-sass'] = '~3.3.5';
					bowerJson.overrides = {
						'bootstrap-sass': {
							'main': [
								'assets/stylesheets/_bootstrap.scss',
								'assets/fonts/bootstrap/*',
								'assets/javascripts/bootstrap.js'
							]
						}
					};
				} else { // Only css
					bowerJson.dependencies['bootstrap'] = '~3.3.5';
					bowerJson.overrides = {
						'bootstrap': {
							'main': [
								'./dist/js/bootstrap.js',
								'./dist/fonts/*',
								'./dist/css/bootstrap.css'
							]
						}
					};
				}
			} else if (this.includeJQuery) {
				bowerJson.dependencies['jquery'] = '~2.1.4';
			}

			// Modernizr
			if (this.includeModernizr) {
				bowerJson.dependencies['modernizr'] = '~2.8.3';
			}

			// Writing bower.json et bowerrc
			this.fs.writeJSON('bower.json', bowerJson);
			this.fs.copy(
				this.templatePath('bowerrc'),
				this.destinationPath('.bowerrc')
			);
		},

		scripts: function() {
			this.fs.copy(
				this.templatePath('scripts/javascript/main.js'),
				this.destinationPath('app/scripts/main.js')
			);
			this.fs.copy(
				this.templatePath('scripts/javascript/plugins.js'),
				this.destinationPath('app/scripts/plugins.js')
			);
		},

		git: function() {
			this.fs.copy(
				this.templatePath('gitignore'),
				this.destinationPath('.gitignore')
			);
		},

		icons: function() {
			this.fs.copy(
				this.templatePath('favicon.ico'),
				this.destinationPath('app/favicon.ico')
			);
			this.fs.copy(
				this.templatePath('apple-touch-icon.png'),
				this.destinationPath('app/apple-touch-icon.png')
			);
			this.fs.copy(
				this.templatePath('tile.png'),
				this.destinationPath('app/tile.png')
			);
			this.fs.copy(
				this.templatePath('tile-wide.png'),
				this.destinationPath('app/tile-wide.png')
			);
		},

		html: function() {
			var bsPath = '';

			// path prefix for Bootstrap JS files
			if (this.includeBootstrap) {
				if (this.includeSass) {
					bsPath = '/bower_components/bootstrap-sass/assets/javascripts/bootstrap/';
				} else {
					bsPath = '/bower_components/bootstrap/js/';
				}
			}

			this.fs.copyTpl(
				this.templatePath('index.html'),
				this.destinationPath('app/index.html'), {
					projectname: this.projectname,
					includeSass: this.includeSass,
					includeBootstrap: this.includeBootstrap,
					includeModernizr: this.includeModernizr,
					bsPath: bsPath,
					bsPlugins: [
						'affix',
						'alert',
						'dropdown',
						'tooltip',
						'modal',
						'transition',
						'button',
						'popover',
						'carousel',
						'scrollspy',
						'collapse',
						'tab'
					]
				}
			);
		},

		style: function() {
			var styleSheet = 'main';
			var type;
			if (this.includeSass) {
				type = 'scss';
			} else if (this.includeLess) {
				type = 'less';
			} else {
				type = 'css';
			}

			this.fs.copyTpl(
				this.templatePath('styles/' + type + '/' + styleSheet + '.' + type),
				this.destinationPath('app/styles/' + styleSheet + '.' + type), {
					includeBootstrap: this.includeBootstrap
				}
			);
		},

		robots: function() {
			this.fs.copy(
				this.templatePath('robots.txt'),
				this.destinationPath('app/robots.txt')
			);
		},

		humans: function() {
			this.fs.copy(
				this.templatePath('humans.txt'),
				this.destinationPath('app/humans.txt')
			);
		},

		broswerconfig: function() {
			this.fs.copy(
				this.templatePath('browserconfig.xml'),
				this.destinationPath('app/browserconfig.xml')
			);
		},

		crossdomain: function() {
			this.fs.copy(
				this.templatePath('crossdomain.xml'),
				this.destinationPath('app/crossdomain.xml')
			);
		},

		projectfiles: function() {
			this.fs.copy(
				this.templatePath('editorconfig'),
				this.destinationPath('.editorconfig')
			);
			this.fs.copy(
				this.templatePath('jshintrc'),
				this.destinationPath('.jshintrc')
			);
		},

		documentation: function() {
			this.fs.copy(
				this.templatePath('docs/**.md'),
				this.destinationPath('docs/')
			);
		},

		misc: function() {
			mkdirp('app/img');
			mkdirp('app/fonts');
		}
	},

	install: function() {
		this.installDependencies({
			skipInstall: this.options['skip-install'],
			skipMessage: this.options['skip-install-message']
		});
	},

	end: function() {
		var bowerJson = this.fs.readJSON(this.destinationPath('bower.json'));
		var howToInstall =
			'\nAfter running ' +
			chalk.yellow.bold('npm install & bower install') +
			', inject your' +
			'\nfront end dependencies by running ' +
			chalk.yellow.bold('gulp wiredep') + // TODO mettre le nom du task runner en paramètre
			'.';

		if (this.options['skip-install']) {
			this.log(howToInstall);
			return;
		}

		// wire Bower packages into templates
		wiredep({
			bowerJson: bowerJson,
			directory: 'bower_components',
			src: 'app/index.html',
			exclude: ['bootstrap.js', 'bootstrap-sass'],
			ignorePath: /^(\.\.\/)*\.\./
		});

		if (this.includeSass) {
			wiredep({
				bowerJson: bowerJson,
				directory: 'bower_components',
				src: 'app/styles/*.scss',
				ignorePath: /^(\.\.\/)+/
			});
		}

		if (this.includeLess) {
			wiredep({
				bowerJson: bowerJson,
				directory: 'bower_components',
				src: 'app/styles/*.less',
				ignorePath: /^(\.\.\/)+/
			});
		}
	}
});

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
        } else if (this.options['test-framework'] === 'jasmine') {
            testLocal = require.resolve('generator-jasmine/generators/app/index.js');
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
				name: 'projectName',
				message: 'What\'s your project name',
				default: 'CiOnFire'
			},

			{
				type: 'input',
				name: 'projectDescription',
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
                default: '',
                when : function(answers) {
                    return answers.repoURL != '';
                }
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
				name: 'stylesSheetLanguage',
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
				} ]
			},

			{
				type: 'confirm',
				name: 'includeJQuery',
				message: 'Would you like to include jQuery ?',
				default: true,
				when: function(answers) {
					return answers.features.indexOf('includeBootstrap') === -1;
				}
			},

            {
                type : 'list',
                name : 'taskRunner',
                message : 'Which tasks runner do you want to use',
                default : 'gulp',
                choices: [{
                    name : 'Gulp',
                    value: 'gulp'
                }, {
                    name : 'Grunt',
                    value : 'grunt'
                }]
            }
		];

		this.prompt(prompts, function(answers) {

			var features = answers.features;

			function hasFeature(feat) {
				return features && features.indexOf(feat) !== -1;
			}

			this.username = answers.username;
            this.projectName = answers.projectName;
            this.projectDescription = answers.projectDescription;
            this.repoURL = answers.repoURL;
            this.repoType = answers.repoType,
            this.includeBootstrap = hasFeature('includeBootstrap');
            this.includeJQuery = answers.includeJQuery;
            this.includeModernizr = hasFeature('includeModernizr');
            this.includeLess = answers.stylesSheetLanguage == 'less';
            this.includeSass = answers.stylesSheetLanguage == 'sass';
            this.includeCss = answers.stylesSheetLanguage == 'css';
            this.useGulp = answers.taskRunner == 'gulp';
            this.useGrunt = answers.taskRunner == 'grunt';

			done();
		}.bind(this));
	},

	writing: {

		tasksRunner: function() {
            var tplPath;
            var destPath;
            if(this.useGulp){
                tplPath = '_gulpfile.js';
                destPath = 'gulpfile.js';
            }
            if(this.useGrunt){
                tplPath = '_Gruntfile.js';
                destPath = 'Gruntfile.js';
            }
			this.fs.copyTpl(
				this.templatePath(tplPath),
				this.destinationPath(destPath), {
					pkg: this.pkg,
					includeLess: this.includeLess,
					includeSass: this.includeSass,
					includeCss: this.includeCss,
					includeBootstrap: this.includeBootstrap,
                    testFramework: this.options['test-framework'],
                    useBabel : this.useBabel,
                    includeModernizr : this.includeModernizr
				}
			);
		},

		packageJSON: function() {
			this.fs.copyTpl(
				this.templatePath('_package.json'),
				this.destinationPath('package.json'), {
					includeLess: this.includeLess,
					includeSass: this.includeSass,
                    includeJQuery : this.includeJQuery,
					username: this.username,
					projectName: this.projectName,
					projectDescription: this.projectDescription,
                    repoURL: this.repoURL,
                    repoType : this.repoType,
					testFramework: this.options['test-framework'],
					useBabel: this.options['babel'],
                    useGulp : this.useGulp,
                    useGrunt : this.useGrunt,
                    includeModernizr : this.includeModernizr
				}
			);
		},

		bower: function() {

			var bowerJson = {
				name: _s.slugify(this.projectName),
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
					projectName: this.projectName,
					includeSass: this.includeSass,
					includeLess: this.includeLess,
					includeJQuery: this.includeJQuery,
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
					includeBootstrap: this.includeBootstrap,
                    useGulp : this.useGulp,
                    useGrunt : this.useGrunt
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

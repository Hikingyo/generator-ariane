'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var _s = require('underscore.string');
var mkdirp = require('mkdirp');
var wiredep = require('wiredep');

module.exports = yeoman.generators.Base.extend({

  initializing: function(){
    this.pkg = require('../../package.json');
  },

  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the amazing ' + chalk.red('Cionfire') + ' generator!'
      ));

    var prompts = [
    {
      type : 'input',
      name: 'username',
      message: 'What\'s your username',
      default: 'JohnDoe'
    },
    {
      type : 'checkbox',
      name : 'features',
      message : 'What more would you like?',
      choices : [{
        name : 'Less',
        value : 'includeLess',
        checked : true
      },
      {
        name : 'bootstrap',
        value : 'includeBootstrap',
        checked : false
      },
      {
        name : 'modernizr',
        value : 'includeModernizr',
        checked : true
      }]
    },
    {
      type : 'confirm',
      name : 'includeJQuery',
      message : 'Would you like to include jQuery ?',
      default : true,
      when : function (answers) {
        return answers.features.indexOf('includeBootstrap') === -1;
      }
    }
    ];

    this.prompt(prompts, function (answers) {

      var features = answers.features;

      function hasFeature(feat){
        return features && features.indexOf(feat) !== -1;
      }

      this.username = answers.username;

      this.includeBootstrap = hasFeature('includeBootstrap');
      this.includeJQuery = hasFeature('includeJQuery');
      this.includeModernizr = hasFeature('includeModernizr');
      this.includeLess = hasFeature('includeLess');

      done();
    }.bind(this));
  },

  writing: {
   gulpfile : function () {

      this.fs.copyTpl(
        this.templatePath('_gulpfile.js'),
        this.destinationPath('gulpfile.js'),
        {
          pkg : this.pkg,
          includeLess : this.includeLess
        }
        )
    },

     packageJSON : function () {
      this.fs.copyTpl(
        this.templatePath('_package.json'),
        this.destinationPath('package.json'),
        {
          includeLess: this.includeLess,
          username : this.username
        }
        )
    },

    bower : function(){
      var bowerJson = {
        name : _s.slugify(this.appname),
        private : true,
        dependencies : {}
      };

      // Bootstrap
      if(this.includeBootstrap) {
        bowerJson.dependencies['bootstrap'] = '~3.3.5';
       /* bowerJson.overrides = {
          'bootstrap' : {
            'main' : [
            'dev/style/less/bootstrap.less',
            'dev/js/vendor/bootstrap.js',
            'dev/style/fonts/*'
            ]
          }
        };*/
      }
      else if (this.includeJQuery){
        bowerJson.dependencies['jquery'] = '~2.1.4';
      }

      // Modernizr
      if(this.includeModernizr) {
        bowerJson.dependencies['modernizr'] = '~2.8.3';
      }

      // Writing bower.json et bowerrc
      this.fs.writeJSON('bower.json', bowerJson);
      this.fs.copy(
        this.templatePath('bowerrc'),
        this.destinationPath('.bowerrc')
        );
    },

    scripts : function(){
      this.fs.copy(
        this.templatePath('js/main.js'),
        this.destinationPath('app/js/main.js')
        );
      this.fs.copy(
        this.templatePath('js/plugins.js'),
        this.destinationPath('app/js/plugins.js')
        );
    },

    git: function () {
      this.fs.copy(
        this.templatePath('gitignore'),
        this.destinationPath('.gitignore')
        );
    },

    icons : function(){
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

    html : function (){
      var bsPath;
      this.fs.copy(
        this.templatePath('index.html'),
        this.destinationPath('app/index.html')
        );
    },

    robots : function () {
      this.fs.copy(
        this.templatePath('robots.txt'),
        this.destinationPath('app/robots.txt')
        );
    },

    humans : function () {
      this.fs.copy(
        this.templatePath('humans.txt'),
        this.destinationPath('app/humans.txt')
        );
    },

    projectfiles: function () {
      this.fs.copy(
        this.templatePath('editorconfig'),
        this.destinationPath('.editorconfig')
        );
      this.fs.copy(
        this.templatePath('jshintrc'),
        this.destinationPath('.jshintrc')
        );
    }
  },

  misc : function () {
    mkdirp('app/img');
    mkdirp('app/style/fonts');
  },

  install: function () {
    this.installDependencies();
  }
});

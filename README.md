# Cionfire [![Build Status](https://secure.travis-ci.org/Hikingyo/generator-cionfire.png?branch=master)](https://travis-ci.org/hikingyo/generator-cionfire)


## About

Web projects do not meet all the same requirements and need a plethora of tools for their
development.
Furthermore, we all have preferences and workflow of our own or we want simply to discover
other tools.
So, with this generator, we offer the ability to deploy quickly and in a jiffy a development
environment from the more simplest to the most complete.

Special thanks to the teams of HTML5 Boilerplate, Yeoman, Gulp, Grunt, Bower, Browsersync and to the creators of all the Node.js modules we use.


## Features

* A HMTL boilerplate (based on the critically acclaimed [HTML5 Boilerplate](https://github.com/h5bp/html5-boilerplate))
* CSS autoprefixing & minifying
* Choose between Sass, Less or CSS for your stylesheets
* [Bootstrap](http://getbootstrap.com/) & [Foundation](http://foundation.zurb.com/) support
* Map compiled CSS to source stylesheets with source maps
* Lint & uglify your scripts
* Built-in preview server with Browsersync
* Awesome image optimization
* Wire-up dependencies installed with [Bower](http://bower.io)
* Choose your task runner between [Gulp](http://gulpjs.com/) and [Grunt](http://gruntjs.com/)


*For more informations on what this generator can do for you, take a look at the [documentations](docs/README.md).*


## libsass

Keep in mind that libsass is feature-wise not fully compatible with Ruby Sass. Check out [this](http://sass-compatibility.github.io) curated list of incompatibilities to find out which features are missing.

If your favorite feature is missing and you really need Ruby Sass, you can always switch to [gulp-ruby-sass](https://github.com/sindresorhus/gulp-ruby-sass) and update the `styles` task in gulpfile accordingly.


## Getting Started

### With gulp

- Install yeoman : `npm install -g yo gulp bower`
- Install the generator: `npm install -g generator-cionfire`
- Run `yo cionfire` to scaffold your web app
- Run `gulp serve` to preview and watch for changes
- Run `bower install --save <package>` to install front-end dependencies
- Run `gulp serve:test` to run the tests in the browser
- Run `gulp` to build your web app for production
- Run `gulp serve:dist` to preview the production build

### With grunt

- Install yeoman : `npm install -g yo grunt bower`
- Install the generator: `npm install -g generator-cionfire`
- Run `yo cionfire` to scaffold your web app
- Run `grunt serve` to preview and watch for changes
- Run `bower install --save <package>` to install front-end dependencies
- Run `grunt serve:test` to run the tests in the browser
- Run `grunt` to build your web app for production
- Run `grunt serve:dist` to preview the production build

## Docs

* [getting started](docs/README.md) with this generator
* [recipes](docs/recipes/README.md) for integrating other popular technologies like CoffeeScript
* [details](docs/bower.md) about our Bower setup


## Options

- `--skip-welcome-message`
  Skips Yeoman's greeting before displaying options. You shouldn't do that ...
- `--skip-install-message`
  Skips the the message displayed after scaffolding has finished and before the dependencies are being installed.
- `--skip-install`
  Skips the automatic execution of `bower` and `npm` after scaffolding has finished.
- `--test-framework=<framework>`
  Either `mocha` or `jasmine`. Defaults to `mocha` for your tests.


## Contribute

See the [contributing docs](contributing.md).


## License

[BSD license](http://opensource.org/licenses/bsd-license.php)

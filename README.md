# generator-cionfire [![Build Status](https://secure.travis-ci.org/Hikingyo/generator-cionfire.png?branch=master)](https://travis-ci.org/hikingyo/generator-cionfire)


## About this project

Web projects do not meet all the same requirements and need a plethora of tools for their
development.
Furthermore, we all have preferences and workflow of our own or we want simply to discover
other tools.
So, with this generator, we offer the ability to deploy quickly and in a jiffy a development
environment from the more simplest to the most complete.


## Features


### Front End

* CSS Autoprefixing
* Built-in preview server with BrowserSync
* Choose Sass, less or css for stylesheet
* Automagically lint your scripts
* Map compiled CSS to source stylesheets with source maps
* Awesome image optimization
* Automagically wire-up dependencies installed with [Bower](http://bower.io)
* Choose tasks runner between [Gulp](http://gulpjs.com/) and [Grunt](http://gruntjs.com/)
* Choose stylesheet framework between [Bootstrap](http://getbootstrap.com/) and [Foundation](http://foundation.zurb.com/)or nothing
 
*For more information on what this generator can do for you, take a look at the [documentations](docs/README.md).*


## libsass

Keep in mind that libsass is feature-wise not fully compatible with Ruby Sass. Check out [this](http://sass-compatibility.github.io) curated list of incompatibilities to find out which features are missing.

If your favorite feature is missing and you really need Ruby Sass, you can always switch to [gulp-ruby-sass](https://github.com/sindresorhus/gulp-ruby-sass) and update the `styles` task in gulpfile accordingly.


## Getting Started (with gulp)

- Install yeoman : `npm install -g yo gulp bower`
- Install the generator: `npm install -g generator-cionfire`
- Run `yo cionfire` to scaffold your webapp
- Run `gulp serve` to preview and watch for changes
- Run `bower install --save <package>` to install frontend dependencies
- Run `gulp serve:test` to run the tests in the browser
- Run `gulp` to build your webapp for production
- Run `gulp serve:dist` to preview the production build


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

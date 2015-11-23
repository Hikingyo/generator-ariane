# Getting Started


If you haven't already, install [yo] and this generator by running:

```sh
$ npm install --global yo generator-cionfire
```

Ensure that you have install tasks runner (eg. `npm install -g gulp`)

Now you can scaffold your very own web app:

```sh
$ mkdir my-webapp
$ cd my-webapp
$ yo cionfire
```

## With gulp

If you're not familiar with gulp, we suggest checking out [their docs][gulp-docs].

To start developing , run:

```sh
$ gulp serve
```

This will fire up a local web server, open http://localhost:3000 in your default browser and watch files for changes, reloading the browser automatically via [Browsersync].

To run the tests in the browser, run:

```sh
$ gulp serve:test
```

To make a production-ready build of the app, run:

```sh
$ gulp
```

To preview the production-ready build to check if everything is ok:

```sh
$ gulp serve:dist
```

### Tasks

To get the list of available tasks, run:

```sh
$ gulp --tasks
```

### Gulp plugins

As you might have noticed, gulp plugins (the ones that begin with `gulp-`) don't have to be `require()`'d. They are automatically picked up by [gulp-load-plugins][plugins] and available through the `$` variable.

### Serve

We use the `.tmp` directory mostly for compiling assets like SCSS files. It has precedence over `app`, so if you had an `app/index.html` template compiling to `.tmp/index.html`, http://localhost:3000 would point to `.tmp/index.html`, which is what we want.

This system can be a little confusing with the `watch` task, but it's actually pretty simple:

* notify Browsersync when compiled assets change
* run the compile task when source assets change

E.g. if you have Less files, you would want to notify Browsersync when Less files have compiled, i.e. when `.tmp/styles/**/*.css` change, but you would want to compile Less files by running the `styles` task when source files change, i.e. `app/styles/**/*.less`.

## Bower

We keep `bower_components` in the project app directory as `vendor`, you can read details about that [here](bower.md).

While serve task is running, installing Bower components will usually be as easy as:

```sh
$ bower install --save jquery
```

Behind the scenes [wiredep] will automatically inject assets from your Bower components to your HTML/SCSS files.

Keep in mind that there will sometimes be situations where you will have to do some extra work.

### 1. You ran `bower install` while serve task wasn't running

Because the serve task watches `bower.json` and runs wiredep tesk on change, so the solution is to simply run it yourself.
(eg. `gulp wiredep`)

### 2. Field values in the component's `bower.json` are incorrect or missing

If there's a problem, it's usually with the `main` field, which wiredep uses to wire up assets. Fortunately you can always [override][override] these fields and send a pull request to that component's repository, fixing their `bower.json` :wink:

[gulp]:       https://github.com/gulpjs/gulp
[gulp-docs]:  https://github.com/gulpjs/gulp/blob/master/docs/README.md
[yo]:         https://github.com/yeoman/yo
[Browsersync]: https://github.com/Browsersync/browser-sync
[plugins]:    https://github.com/jackfranklin/gulp-load-plugins
[calc]:       https://github.com/postcss/postcss-calc
[wiredep]:    https://github.com/taptapship/wiredep
[replace]:    https://github.com/lazd/gulp-replace
[override]:   https://github.com/taptapship/wiredep#bower-overrides

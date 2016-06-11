# generate-package [![NPM version](https://img.shields.io/npm/v/generate-package.svg?style=flat)](https://www.npmjs.com/package/generate-package) [![NPM downloads](https://img.shields.io/npm/dm/generate-package.svg?style=flat)](https://npmjs.org/package/generate-package) [![Build Status](https://img.shields.io/travis/jonschlinkert/generate-package.svg?style=flat)](https://travis-ci.org/jonschlinkert/generate-package)

When scaffolding out a new project, this generator simply automates the creation of package.json file, making it a continuous part of the build workflow.

Run this generator with the `gen package` command, or use in your own generator as a plugin or sub-generator.

## What is generate?

Generate is a new, open source developer framework for rapidly initializing and scaffolding out new code projects, offering an intuitive CLI, and a powerful and expressive API that makes it easy and enjoyable to use.

Visit the [getting started guide](https://github.com/generate/getting-started) or the [generate](https://github.com/generate/generate) project and documentation to learn more.

## Quickstart

See the [docs section](#docs) for more detailed examples and descriptions.

### CLI usage

Install globally with [npm](https://www.npmjs.com/):

```sh
$ npm install --global generate-package
```

You should now be able to run this generator's [default task](#default) with the `gen package` command. See all avallable [tasks](#tasks)

### API usage

**Use as a plugin**

Extend your own generator with the settings and features of generate-package:

```js
module.exports = function(app) {
  app.use(require('generate-package'));
};
```

**Use as a sub-generator**

Add this generator to a namespace in your generator:

```js
module.exports = function(app) {
  // you can use any arbitrary name to register the generator
  app.register('package', require('generate-package'));
};
```

## Docs

### CLI

**Installing the CLI**

To run the `package` generator from the command line, you'll need to install [generate](https://github.com/generate/generate) globally first. You can do that now with the following command:

```sh
$ npm i -g generate
```

This adds the `gen` command to your system path, allowing it to be run from any directory.

**Help**

Get general help and a menu of available commands:

```sh
$ gen help
```

**Running the `package` generator**

Once both [generate](https://github.com/generate/generate) and `generate-package` are installed globally, you can run the generator with the following command:

```sh
$ gen package
```

If completed successfully, you should see both `starting` and `finished` events in the terminal, like the following:

```sh
[00:44:21] starting ...
...
[00:44:22] finished ✔
```

If you do not see one or both of those events, please [let us know about it](../../issues).

### Tasks

The following tasks are registered on the `package` generator. See the [Getting Started guide](https://github.com/generate/getting-started) to learn how to run tasks.

#### [package](generator.js#L37)

Generate a `package.json` file to the working directory, or specified `-d` | `--dest`. To use a different template, run the [package:choose](#packagechoose) task, or pass the name on the `-t` or `--template` flag.

**Example**

```sh
$ gen package
```

#### [package:normalize](generator.js#L57)

Generate's a package.json file, same as the [package](#package) task, but also normalizes the result using [normalize-pkg](https://github.com/jonschlinkert/normalize-pkg).

**Example**

```sh
$ gen package:normalize
```

#### [package:choose](generator.js#L78)

Prompts the user to choose the template to use for generating a `package.json` file to the working directory, or specified `-d` | `--dest`.

**Example**

```sh
$ gen package:choose
```

#### [default](generator.js#L102)

Alias for the `package:normalize` task to allow running the generator with the following command:

**Example**

```sh
$ gen package
```

### API

This updater can also be used as a node.js library in your own updater. To do so you must first install generate-package locally.

Install with [npm](https://www.npmjs.com/):

```sh
$ npm install --save generate-package
```

Then use in your project:

```js
var package = require('generate-package');
```

**Use as a plugin in your generator**

Use as a plugin if you want to extend your own generator with the features, settings and tasks of generate-package, as if they were created on your generator.

In your `generator.js`:

```js
module.exports = function(app) {
  app.use(require('generate-package'));

  // specify any tasks from generate-package. Example:
  app.task('default', ['package']);
};
```

**Use as a sub-generator**

Use as a sub-generator if you want expose the features, settings and tasks from generate-package on a _namespace_ in your generator.

In your `generator.js`:

```js
module.exports = function(app) {
  // register the generate-package generator (as a sub-generator with an arbitrary name)
  app.register('foo', require('generate-package'));

  app.task('minify', function(cb) {
    // minify some stuff
    cb();
  });

  // run the "default" task on generate-package (aliased as `foo`), 
  // then run the `minify` task defined in our generator
  app.task('default', function(cb) {
    app.generate(['foo:default', 'minify'], cb);
  });
};
```

Tasks from `generate-package` will be available on the `foo` namespace from the API and the command line. Continuing with the previous code example, to run the `default` task on `generate-package`, you would run `gen foo:default` (or just `gen foo` if `foo` does not conflict with an existing task on your generator).

To learn more about namespaces and sub-generators, and how they work, [visit the getting started guide](https://github.com/generate/getting-started).

## Contributing

This document was generated by [verb-readme-generator](https://github.com/verbose/verb-readme-generator) (a [verb](https://github.com/verbose/verb) generator), please don't edit directly. Any changes to the readme must be made in [.verb.md](.verb.md). See [Building Docs](#building-docs).

Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](../../issues/new). Or visit the [verb-readme-generator](https://github.com/verbose/verb-readme-generator) project to submit bug reports or pull requests for the readme layout template.

## Building docs

Generate readme and API documentation with [verb](https://github.com/verbose/verb):

```sh
$ npm install -g verb verb-readme-generator && verb
```

## Running tests

Install dev dependencies:

```sh
$ npm install -d && npm test
```

## Author

**Jon Schlinkert**

* [github/jonschlinkert](https://github.com/jonschlinkert)
* [twitter/jonschlinkert](http://twitter.com/jonschlinkert)

## License

Copyright © 2016, [Jon Schlinkert](https://github.com/jonschlinkert).
Released under the [MIT license](https://github.com/jonschlinkert/generate-package/blob/master/LICENSE).

***

_This file was generated by [verb](https://github.com/verbose/verb), v0.9.0, on June 11, 2016._
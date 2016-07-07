# generate-package [![NPM version](https://img.shields.io/npm/v/generate-package.svg?style=flat)](https://www.npmjs.com/package/generate-package) [![NPM downloads](https://img.shields.io/npm/dm/generate-package.svg?style=flat)](https://npmjs.org/package/generate-package) [![Build Status](https://img.shields.io/travis/generate/generate-package.svg?style=flat)](https://travis-ci.org/generate/generate-package)

Generate a package.json from a pre-defined or user-defined template. This generator can be used from the command line when globally installed, or as a plugin or sub-generator in your own generator.

## TOC

- [What is "Generate"?](#what-is-generate)
- [Command line usage](#command-line-usage)
  * [Install globally](#install-globally)
  * [Running generate-package](#running-generate-package)
  * [Running tasks](#running-tasks)
- [Available tasks](#available-tasks)
- [API usage](#api-usage)
  * [Install locally](#install-locally)
  * [Register as a plugin](#register-as-a-plugin)
  * [Run tasks](#run-tasks)
- [Customization](#customization)
  * [Destination directory](#destination-directory)
  * [Overriding templates](#overriding-templates)
- [About](#about)
  * [Related projects](#related-projects)
  * [Contributing](#contributing)
  * [Running tests](#running-tests)
  * [Author](#author)
  * [License](#license)

_(TOC generated by [verb](https://github.com/verbose/verb) using [markdown-toc](https://github.com/jonschlinkert/markdown-toc))_

![generate-package demo](https://raw.githubusercontent.com/generate/generate-package/master/demo.gif)

## What is "Generate"?

Generate is a command line tool and developer framework for scaffolding out new GitHub projects using [generators](https://github.com/generate/generate/blob/master/docs/){generators.md} and [tasks](https://github.com/generate/generate/blob/master/docs/){tasks.md}. Answers to prompts and the user's environment can be used to determine the templates, directories, files and contents to build. Support for [gulp](http://gulpjs.com), [base](https://github.com/node-base/base) and [assemble](https://github.com/assemble/assemble) plugins, and much more.

For more information about Generate:

* Visit the [generate project](https://github.com/generate/generate)
* Visit the [generate documentation](https://github.com/generate/generate/blob/master/docs/)
* Find [generators on npm](https://www.npmjs.com/browse/keyword/generate-generator) (help us [author generators](https://github.com/generate/generate/blob/master/docs/){micro-generators.md})

## Command line usage

### Install globally

**Installing the CLI**

To run the `package` generator from the command line, you'll need to install [generate](https://github.com/generate/generate) globally first. You can do that now with the following command:

```sh
$ npm install --global generate
```

This adds the `gen` command to your system path, allowing it to be run from any directory.

**Install generate-package**

You may now install this module with the following command:

```sh
$ npm install --global generate-package
```

### Running generate-package

You should now be able to run `generate-package` with the following command:

```js
$ gen package
```

**What will happen?**

Running `$ gen package` will run the generator's [default task](#packagedefault), which creates a new `package.json` file in the current working directory. The template can be [customized](#customization).

### Running tasks

Tasks on `generate-package` are by run passing the name of the task to run after the generator name, delimited by a comma:

```sh
$ gen package:foo
       ^       ^
generator     task
```

**Example**

The following will run generator `foo`, task `bar`:

```sh
$ gen foo:bar
```

**Default task**

If a task is not explicitly passed Generate's CLI will run the `default` task.

## Available tasks

### [package:new](index.js#L34)

Create a new package.json file, same as the [raw](#packageraw) task, but also normalizes the result using [normalize-pkg](https://github.com/jonschlinkert/normalize-pkg).

**Example**

```sh
$ gen package:new
```

### [package:raw](index.js#L54)

Generate a `package.json` file in the cwd. To use a different template, run the [package:choose](#packagechoose) task, or pass the name on the `-t` or `--template` flag.

**Example**

```sh
$ gen package:raw
```

### [package:choose](index.js#L71)

Prompts the user to choose the template to use for generating a `package.json` file to the working directory, or specified `-d` | `--dest`.

**Example**

```sh
$ gen package:choose
```

### [package:setup](index.js#L92)

Prepare questions and merge data to be used for prompts from the `base` instance onto the context.

**Example**

```sh
$ gen package:setup
```

Visit Generate's [documentation for tasks](https://github.com/generate/generate/blob/master/docs/tasks.md).

## API usage

Use `generate-package` as a [plugin](https://github.com/generate/generate/blob/master/docs/){plugins.md} in your own [generator](https://github.com/generate/generate/blob/master/docs/){generators.md}.

### Install locally

Install with [npm](https://www.npmjs.com/):

```sh
$ npm install --save generate-package
```

### Register as a plugin

Inside your own [generator](https://github.com/generate/generate/blob/master/docs/){generators.md}:

```js
module.exports = function(app) {
  // register generate-package as a plugin
  app.use(require('generate-package'));
};
```

### Run tasks

Programmatically run tasks from `generate-package`:

```js
module.exports = function(app) {
  // register generate-package as a plugin
  app.use(require('generate-package'));

  // run the `default` task on generate-package
  app.task('foo', function(cb) {
    app.generate('generate-package', cb);
  });

  // or run a specific task on generate-package 
  // (where `foo` is the name of the task to run)
  app.task('bar', function(cb) {
    app.generate('generate-package:foo', cb);
  });
};
```

Visit the [generator docs](https://github.com/generate/generate/blob/master/docs/){generators.md} to learn more about creating, installing, using and publishing generators.

## Customization

### Destination directory

To customize the destination directory, install [generate-dest](https://github.com/generate/generate-dest) globally, then in the command line prefix `dest` before any other generator names.

For example, the following will prompt you for the destination path to use, then pass the result to `generate-package`:

```sh
$ gen dest package
```

### Overriding templates

You can override a template by adding a template of the same name to the `templates` directory in user home.

For example, to override the `package.json` template, add a template at the following path `~/generate/generate-package/templates/package.json`, where `~/` is the user-home directory that `os.homedir()` resolves to on your system.

## About

### Related projects

You might also be interested in these projects:

* [generate-dest](https://www.npmjs.com/package/generate-dest): Generate`generator that prompts the user for the destination directory to use. Can be used… [more](https://github.com/generate/generate-dest) | [homepage](https://github.com/generate/generate-dest "`Generate` generator that prompts the user for the destination directory to use. Can be used as a sub-generator or plugin in your generator.")
* [generate-file](https://www.npmjs.com/package/generate-file): Generator for generating a single file from a template. | [homepage](https://github.com/generate/generate-file "Generator for generating a single file from a template.")
* [generate-git](https://www.npmjs.com/package/generate-git): Generator for initializing a git repository and adding first commit. | [homepage](https://github.com/generate/generate-git "Generator for initializing a git repository and adding first commit.")

### Contributing

Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](../../issues/new).

### Running tests

Install dev dependencies:

```sh
$ npm install -d && npm test
```

### Author

**Jon Schlinkert**

* [github/jonschlinkert](https://github.com/jonschlinkert)
* [twitter/jonschlinkert](http://twitter.com/jonschlinkert)

### License

Copyright © 2016, [Jon Schlinkert](https://github.com/jonschlinkert).
Released under the [MIT license](https://github.com/generate/generate-package/blob/master/LICENSE).

***

_This file was generated by [verb](https://github.com/verbose/verb), v0.9.0, on July 07, 2016._
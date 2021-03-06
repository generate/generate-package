<p align="center">

<a href="https://github.com/generate/generate">
<img height="150" width="150" src="https://raw.githubusercontent.com/generate/generate/master/docs/logo.png">
</a>
</p>

Generate a package.json from a pre-defined or user-defined template. This generator can be used from the command line when globally installed, or as a plugin or sub-generator in your own generator.

# generate-package

[![NPM version](https://img.shields.io/npm/v/generate-package.svg?style=flat)](https://www.npmjs.com/package/generate-package) [![NPM monthly downloads](https://img.shields.io/npm/dm/generate-package.svg?style=flat)](https://npmjs.org/package/generate-package) [![Build Status](https://img.shields.io/travis/generate/generate-package.svg?style=flat)](https://travis-ci.org/generate/generate-package)

![generate-package demo](https://raw.githubusercontent.com/generate/generate-package/master/docs/demo.gif)

<details>
<summary><strong>Table of Contents</strong></summary>
- [Quickstart](#quickstart)
- [Getting started](#getting-started)
  * [Install](#install)
  * [CLI](#cli)
  * [Help](#help)
- [Next steps](#next-steps)
  * [Running unit tests](#running-unit-tests)
  * [Publishing your generator](#publishing-your-generator)
- [About](#about)
  * [What is "Generate"?](#what-is-generate)
  * [Related projects](#related-projects)
  * [Community](#community)
  * [Contributors](#contributors)
  * [Contributing](#contributing)
  * [Running tests](#running-tests)
  * [Author](#author)
  * [License](#license)

_(TOC generated by [verb](https://github.com/verbose/verb) using [markdown-toc](https://github.com/jonschlinkert/markdown-toc))_
</details>

## Quickstart

Install [generate](https://github.com/generate/generate) and `generate-package`:

```sh
$ npm install --global generate generate-package
```

Generate a package.json in the current working directory:

```sh
$ gen package
```

## Getting started

### Install

**Installing the CLI**

To run the `readme` generator from the command line, you'll need to install [Generate](https://github.com/generate/generate) globally first. You can do that now with the following command:

```sh
$ npm install --global generate
```

This adds the `gen` command to your system path, allowing it to be run from any directory.

**Install generate-package**

Install this module with the following command:

```sh
$ npm install --global generate-package
```

### CLI

Run this generator's `default` [task](https://github.com/generate/generate/blob/master/docs/tasks.md#default) with the following command:

```sh
$ gen readme
```

**What you should see in the terminal**

If completed successfully, you should see both `starting` and `finished` events in the terminal, like the following:

```sh
[00:44:21] starting ...
...
[00:44:22] finished ✔
```

If you do not see one or both of those events, please [let us know about it](../../issues).

### Help

To see a general help menu and available commands for Generate's CLI, run:

```sh
$ gen help
```

## Next steps

### Running unit tests

It's never too early to begin running unit tests. When you're ready to get started, the following command will ensure the project's dependencies are installed then run all of the unit tests:

```sh
$ npm install && test
```

### Publishing your generator

If you're tests are passing and you're ready to publish your generator to [npm](https://www.npmjs.com), you can do that now with the following command:

**Are you sure you're ready?!**

Let's go!

```sh
$ npm publish
```

## About

### What is "Generate"?

Generate is a command line tool and developer framework for scaffolding out new GitHub projects using [generators](https://github.com/generate/generate/blob/master/docs/generators.md) and [tasks](https://github.com/generate/generate/blob/master/docs/tasks.md).

Answers to prompts and the user's environment can be used to determine the templates, directories, files and contents to build. Support for [gulp](http://gulpjs.com), [base](https://github.com/node-base/base) and [assemble](https://github.com/assemble/assemble) plugins, and much more.

**For more information**:

* Visit the [generate project](https://github.com/generate/generate/)
* Visit the [generate documentation](https://github.com/generate/generate/blob/master/docs/)
* Find [generators on npm](https://www.npmjs.com/browse/keyword/generate-generator) (help us [author generators](https://github.com/generate/generate/blob/master/docs/micro-generators.md))

### Related projects

* [generate-gitignore](https://www.npmjs.com/package/generate-gitignore): Generate any local or global .gitignore file from the github/gitignore repository. Use from the command… [more](https://github.com/generate/generate-gitignore) | [homepage](https://github.com/generate/generate-gitignore "Generate any local or global .gitignore file from the github/gitignore repository. Use from the command line when Generate's CLI is installed globally, or use as a plugin or sub-generator in your own generator.")
* [generate-license](https://www.npmjs.com/package/generate-license): Generate a license file for a GitHub project. | [homepage](https://github.com/generate/generate-license "Generate a license file for a GitHub project.")
* [generate-readme](https://www.npmjs.com/package/generate-readme): Generate a README.md using answers to prompts and data from the environment, like `package.json`, `.git… [more](https://github.com/generate/generate-readme) | [homepage](https://github.com/generate/generate-readme "Generate a README.md using answers to prompts and data from the environment, like`package.json`,`.git` config, etc. This generator can be run by command line if Generate is installed globally, or you can use this as a plugin or sub-generator in your own")

### Community

Are you using [Generate](https://github.com/generate/generate) in your project? Have you published a [generator](https://github.com/generate/generate/blob/master/docs/generators.md) and want to share your project with the world?

Here are some suggestions!

* If you get like Generate and want to tweet about it, please feel free to mention `@generatejs` or use the `#generatejs` hashtag
* Show your love by starring [Generate](https://github.com/generate/generate) and `generate-package`
* Get implementation help on [StackOverflow](http://stackoverflow.com/questions/tagged/generate) (please use the `generatejs` tag in questions)
* **Gitter** Discuss Generate with us on [Gitter](https://gitter.im/generate/generate)
* If you publish an generator, thank you! To make your project as discoverable as possible, please add the keyword `generategenerator` to package.json.

### Contributors

| **Commits** | **Contributor** | 
| --- | --- |
| 95 | [jonschlinkert](https://github.com/jonschlinkert) |
| 1 | [dawsonbotsford](https://github.com/dawsonbotsford) |
| 1 | [jamen](https://github.com/jamen) |

### Contributing

Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](../../issues/new).

### Running tests

Install dev dependencies:

```sh
$ npm install && npm test
```

### Author

**Jon Schlinkert**

* [github/jonschlinkert](https://github.com/jonschlinkert)
* [twitter/jonschlinkert](https://twitter.com/jonschlinkert)

### License

Copyright © 2017, [Jon Schlinkert](https://github.com/jonschlinkert).
Released under the [MIT License](LICENSE).

***

_This file was generated by [verb-generate-readme](https://github.com/verbose/verb-generate-readme), v0.4.2, on January 27, 2017._
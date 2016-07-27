## What is "Generate"?
{%= include("what-is-generate") %}

## Install

**Install generate**

If you haven't already installed [generate][] globally, you can do that now with the following command:

```sh
$ npm install --global generate
```

**Install {%= name %}**

Then install this module:

```sh
$ npm install --global {%= name %}
```

## Usage

You should now be able to run the generator with the following command:

```sh
$ gen package
```

### What will happen?

Running `$ gen package` will run the generator's [default task](#packagedefault), which creates a new `package.json` file in the current working directory.


## Tasks

The following tasks are available to run using `generate package:*` where `*` is the task name.

{%= apidocs('index.js') %}

### Task naming conventions

## Customization

The following instructions can be used to override settings in `{%= name %}`. Visit the [Generate documentation][docs]{overriding-defaults.md} to learn about other ways to override defaults.

**Overriding templates**

You can override a template by adding a template of the same name to the `templates` directory in user home. For example, to override the `package.json` template, add a template at the following path `~/generate/{%= name %}/templates/package.json`, where `~/` is the user-home directory that `os.homedir()` resolves to on your system.

[docs]: https://github.com/generate/generate/blob/master/docs/

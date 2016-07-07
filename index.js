'use strict';

var path = require('path');
var utils = require('./utils');

module.exports = function(app, base, env) {
  if (!utils.isValid(app, 'generate-package')) return;

  /**
   * Build variables
   */

  var src = path.resolve.bind(path, __dirname, 'templates');
  var dir = app.options.dest || app.cwd || process.cwd();

  /**
   * Use other generators as plugins
   */

  app.use(require('generate-collections'));
  app.use(require('generate-defaults'));

  /**
   * Create a new package.json file, same as the [raw](#packageraw) task, but also
   * normalizes the result using [normalize-pkg][].
   *
   * ```sh
   * $ gen package:new
   * ```
   * @name package:new
   * @api public
   */

  app.task('new', ['setup'], function() {
    return app.toStream('templates', pickFile(app))
      .pipe(app.renderFile('*'))
      .pipe(utils.normalize())
      .pipe(app.conflicts(dir))
      .pipe(app.dest(dir));
  });

  /**
   * Generate a `package.json` file in the cwd. To use a different template, run
   * the [package:choose](#packagechoose) task, or pass the name on the `-t` or
   * `--template` flag.
   *
   * ```sh
   * $ gen package:raw
   * ```
   * @name package:raw
   * @api public
   */

  app.task('raw', ['setup'], function() {
    return app.toStream('templates', pickFile(app))
      .pipe(app.renderFile('*'))
      .pipe(app.conflicts(dir))
      .pipe(app.dest(dir));
  });

  /**
   * Prompts the user to choose the template to use for generating a `package.json` file to the working directory, or specified `-d` | `--dest`.
   *
   * ```sh
   * $ gen package:choose
   * ```
   * @name package:choose
   * @api public
   */

  app.task('choose', ['setup'], function() {
    return app.toStream('templates')
      .pipe(utils.choose({key: 'stem'}))
      .pipe(app.renderFile('*'))
      .pipe(utils.normalize())
      .pipe(utils.pick())
      .pipe(app.conflicts(dir))
      .pipe(app.dest(dir));
  });

  /**
   * Prepare questions and merge data to be used for prompts from the `base` instance
   * onto the context.
   *
   * ```sh
   * $ gen package:setup
   * ```
   * @name package:setup
   * @api public
   */

  app.task('setup', function(cb) {
    app.data(app.base.cache.data);
    app.use(utils.commonQuestions());
    app.template('*.json', {cwd: src()});
    cb();
  });

  /**
   * Alias for the `package` task to allow running the generator
   * with the following command:
   *
   * ```sh
   * $ gen package
   * ```
   * @name default
   */

  app.task('package', ['new']);
  app.task('default', ['new']);
};

/**
 * Pick the file to render. If the user specifies a `--file`, use that,
 * otherwise use the default `$package.json` template
 */

function pickFile(app, fallback) {
  return function(key, file) {
    return file.stem === (app.option('file') || fallback || 'package');
  };
}

function userFile(app, name) {
  var file = app.home('updater-package/templates', name);
  if (utils.exists(file)) {
    return file;
  }
}

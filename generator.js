'use strict';

var path = require('path');
var utils = require('./utils');

module.exports = function(app, base, env) {
  if (!utils.isValid(app, 'generate-package')) return;

  /**
   * Build variables
   */

  var src = path.resolve.bind(path, __dirname, 'templates');
  var dir = app.options.dest || app.cwd;

  /**
   * Register other generators as plugins
   */

  app.use(require('generate-collections'));
  app.use(require('generate-defaults'));

  /**
   * Load templates
   */

  app.template('*.json', {cwd: src()});

  /**
   * Generate's a package.json file, same as the [package](#package) task, but also
   * normalizes the result using [normalize-pkg][].
   *
   * ```sh
   * $ gen package
   * ```
   * @name package
   * @api public
   */

  app.task('package', ['package-data'], function() {
    return app.toStream('templates', pickFile(app))
      .pipe(app.renderFile('*'))
      .pipe(utils.normalize())
      .pipe(app.conflicts(dir))
      .pipe(app.dest(dir));
  });

  /**
   * Generate a `package.json` file in the cwd. To use a different template, run the [package:choose](#packagechoose) task, or pass the name on the `-t` or `--template` flag.
   *
   * ```sh
   * $ gen package:
   * ```
   * @name package:
   * @api public
   */

  app.task('package-raw', ['package-data'], function() {
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

  app.task('choose', ['package-choose']);
  app.task('package-choose', ['package-data'], function() {
    return app.toStream('templates')
      .pipe(utils.choose({key: 'stem'}))
      .pipe(app.renderFile('*'))
      .pipe(utils.normalize())
      .pipe(utils.pick())
      .pipe(app.conflicts(dir))
      .pipe(app.dest(dir));
  });

  /**
   * Lazily merge data from the `base` instance onto the context.
   *
   * ```sh
   * $ gen package:package-data
   * ```
   * @name package:package.data
   * @api public
   */

  app.task('package-data', function(cb) {
    app.data(app.base.cache.data);
    app.use(utils.commonQuestions());
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

  app.task('default', ['package']);
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

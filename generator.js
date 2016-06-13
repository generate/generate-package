'use strict';

var path = require('path');
var opts = {alias: {dest: 'd', template: 't'}};
var argv = require('yargs-parser')(process.argv.slice(2), opts);
var utils = require('./utils');

module.exports = function(app) {
  if (!utils.isValid(app, 'generate-package')) return;

  /**
   * Build variables
   */

  var name = argv.t || 'default';
  var src = path.resolve.bind(path, __dirname, 'templates');
  var dir = app.options.dest || app.cwd;

  /**
   * Engine to use for rendering templates
   */

  app.engine('json', require('engine-base'));

  /**
   * Generate a `package.json` file to the cwd. (to customize destination use [generate-dest][]).
   * To use a different template, run the [package:choose](#packagechoose) task,
   * or pass the name on the `-t` or `--template` flag.
   *
   * ```sh
   * $ gen package
   * ```
   * @name package
   * @api public
   */

  app.task('package', function() {
    app.data(app.base.cache.data);
    app.use(utils.commonQuestions());

    return app.src(src(`${argv.t || 'default'}.json`))
      .pipe(app.renderFile('json'))
      .pipe(rename('package.json'))
      .pipe(app.conflicts(dir))
      .pipe(app.dest(dir));
  });

  /**
   * Generate's a package.json file, same as the [package](#package) task, but also
   * normalizes the result using [normalize-pkg][].
   *
   * ```sh
   * $ gen package:normalize
   * ```
   * @name package:normalize
   * @api public
   */

  app.task('normalize', ['package-normalize']);
  app.task('package-normalize', function() {
    app.data(app.base.cache.data);
    app.use(utils.commonQuestions());

    return app.src(src(`${name}.json`))
      .pipe(app.renderFile('json'))
      .pipe(utils.normalize())
      .pipe(rename('package.json'))
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
  app.task('package-choose', function() {
    app.data(app.base.cache.data);
    app.use(utils.commonQuestions());

    return app.src(src('*.json'))
      .pipe(utils.choose({key: 'stem'}))
      .pipe(app.renderFile('json'))
      .pipe(utils.normalize())
      .pipe(utils.pick())
      .pipe(rename('package.json'))
      .pipe(app.conflicts(dir))
      .pipe(app.dest(dir));
  });

  /**
   * Alias for the `package:normalize` task to allow running the generator
   * with the following command:
   *
   * ```sh
   * $ gen package
   * ```
   * @name default
   * @api public
   */

  app.task('default', ['package-normalize']);
};

/**
 * Rename the file before checking with `base-conflicts`
 */

function rename(name) {
  return utils.through.obj(function(file, enc, next) {
    file.basename = name;
    next(null, file);
  });
}

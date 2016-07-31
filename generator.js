'use strict';

var utils = require('./utils');

module.exports = function(app, base, env) {
  if (!utils.isValid(app, 'generate-package')) return;

  /**
   * Use other generators as plugins
   */

  app.use(require('generate-defaults'));
  app.helper('date', require('helper-date'));

  /**
   * Middleware
   */

  app.postRender(/package\.json/, function(file, next) {
    if (app.options.private) {
      var pkg = JSON.parse(file.content);
      pkg.private = true;
      file.contents = new Buffer(JSON.stringify(pkg, null, 2));
    }
    next();
  });

  app.postWrite(/package\.json/, function(file, next) {
    app.pkg.data = JSON.parse(file.contents.toString());
    next();
  });

  /**
   * Listener: add `author` data to the cache on the base instance,
   * so other generators can use it.
   */

  app.on('ask', function(val, key) {
    if (val && /^author\./.test(key)) {
      app.base.data(key, val);
    }
  });

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

  app.task('new', {silent: true}, ['package-new']);
  app.task('package-new', {silent: true}, ['package-hints'], function() {
    return app.src('templates/$package.json', {cwd: __dirname})
      .pipe(app.renderFile('*')).on('error', console.log)
      .pipe(utils.normalize())
      .pipe(app.conflicts(app.cwd))
      .pipe(app.dest(app.cwd));
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

  app.task('raw', {silent: true}, ['package-raw']);
  app.task('package-raw', {silent: true}, ['package-hints'], function() {
    return app.src('templates/$package.json', {cwd: __dirname})
      .pipe(app.renderFile('*')).on('error', console.log)
      .pipe(app.conflicts(app.cwd))
      .pipe(app.dest(app.cwd));
  });

  /**
   * Generate a temporary `package.json` file in the cwd for dev, tests, etc. All of the
   * fields in this file are pre-populated with bogus data.
   *
   * ```sh
   * $ gen package:dev
   * ```
   * @name package:dev
   * @api public
   */

  app.task('dev', {silent: true}, ['package-dev']);
  app.task('package-dev', {silent: true}, function() {
    return app.src('templates/$dev.json', {cwd: __dirname})
      .pipe(app.renderFile('*')).on('error', console.log)
      .pipe(app.conflicts(app.cwd))
      .pipe(app.dest(app.cwd));
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

  app.task('choose', {silent: true}, ['package-choose']);
  app.task('package-choose', {silent: true}, ['package-hints'], function() {
    return app.src('templates/*.json', {cwd: __dirname})
      .pipe(utils.choose({key: 'stem'}))
      .pipe(app.renderFile('*')).on('error', console.log)
      .pipe(utils.normalize())
      .pipe(utils.pick())
      .pipe(app.conflicts(app.cwd))
      .pipe(app.dest(app.cwd));
  });

  /**
   * Merge data to be used for hints onto the context.
   *
   * ```sh
   * $ gen package:package-hints
   * ```
   * @name package:package-hints
   * @api public
   */

  app.task('package-hints', {silent: true}, function(cb) {
    if (app.options.hints !== false) {
      app.data(app.base.cache.data);
    }
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

  app.task('package', ['package-new']);
  app.task('default', ['package-new']);
};

'use strict';

var path = require('path');
var utils = require('./utils');

module.exports = function(app, base, env) {
  if (!utils.isValid(app, 'generate-package')) return;

  /**
   * Set defaults
   */

  app.use(require('generate-defaults'));

  /**
   * Helpers
   */

  app.helper('date', require('helper-date'));

  /**
   * Middleware
   */

  app.postRender(/package\.json$/, function(file, next) {
    if (!file.basename === 'package.json') {
      next();
      return;
    }

    if (app.options.private) {
      var pkg = JSON.parse(file.content);
      pkg.private = true;
      file.contents = new Buffer(JSON.stringify(pkg, null, 2));
    }
    next();
  });

  /**
   * Generate a [normalized][normalize-pkg] package.json file in the current working directory.
   *
   * ```sh
   * $ gen package
   * # or
   * $ gen package:new
   * ```
   * @name package
   * @api public
   */

  app.task('package', {silent: true}, ['package-new']);
  app.task('default', {silent: true}, ['package-new']);

  /**
   * Create a [normalized][normalize-pkg] package.json file.
   *
   * ```sh
   * $ gen package:new
   * ```
   * @name package:new
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
   * Generate a `package.json` without normalizing the result.
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
   * Generate a minimal `package.json` file.
   *
   * ```sh
   * $ gen package:min
   * ```
   * @name package:min
   * @api public
   */

  app.task('min', ['package-min']);
  app.task('package-min', {silent: true}, function() {
    return file(app, 'min.json');
  });

  /**
   * Generate a `package.json` or a sub-directory in a project, with only
   * `name`, `description` and `private` fields defined.
   *
   * ```sh
   * $ gen package:sub
   * ```
   * @name package:sub
   * @api public
   */

  app.task('sub', ['package-sub']);
  app.task('package-sub', {silent: true}, function() {
    app.question('subname', 'What name would you like to use?', {default: app.pkg.get('name')});
    return file(app, 'sub.json');
  });

  /**
   * Generate a fake `package.json` file to use for development. All of the
   * fields in this file are pre-populated with fake data.
   *
   * ```sh
   * $ gen package:dev
   * ```
   * @name package:dev
   * @api public
   */

  app.task('dev', ['package-dev']);
  app.task('package-dev', {silent: true}, function() {
    return file(app, 'dev.json');
  });

  /**
   * Prompts the user to choose the template and fields to use for generating a `package.json` file.
   *
   * ```sh
   * $ gen package:choose
   * ```
   * @name package:choose
   * @api public
   */

  app.task('choose', ['package-choose']);
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
   */

  app.task('package-hints', {silent: true}, function(cb) {
    if (app.options.hints !== false) {
      app.data(app.base.cache.data);
    }
    cb();
  });
};

function file(app, pattern) {
  var src = app.options.srcBase || path.join(__dirname, 'templates');
  return app.src(pattern, {cwd: src})
    .pipe(app.renderFile('*')).on('error', console.log)
    .pipe(app.conflicts(app.cwd))
    .pipe(app.dest(app.cwd));
}

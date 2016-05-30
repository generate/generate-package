'use strict';

var path = require('path');
var isValidApp = require('is-valid-app');

module.exports = function(app, base) {
  if (!isValidApp(app, 'generate-package')) return;
  app.use(require('generate-defaults'));

  app.task('package', function() {
    return app.src('package.json', {cwd: path.resolve(__dirname, 'templates')})
      .pipe(app.renderFile('*'))
      .pipe(app.dest(function(file) {
        file.basename = 'package.json';
        return app.cwd;
      }))
  });

  app.task('default', ['package']);
};

'use strict';

require('mocha');
var fs = require('fs');
var path = require('path');
var assert = require('assert');
var generate = require('generate');
var del = require('delete');
var generator = require('./');
var app;

var cwd = path.resolve.bind(path, __dirname, 'actual');

function exists(name, cb) {
  var filepath = cwd(name);

  return function(err) {
    if (err) return cb(err);

    fs.stat(filepath, function(err, stat) {
      assert(stat);
      del(path.dirname(filepath), cb);
    });
  }
}

describe('generate-package', function() {
  beforeEach(function() {
    app = generate({silent: true});
    app.cwd = cwd();
    app.option('dest', cwd());
    app.option('askWhen', 'not-answered');

    // provide template data to avoid prompts
    app.data({
      author: {
        name: 'Jon Schlinkert',
        username: 'jonschlnkert',
        url: 'https://github.com/jonschlinkert'
      },
      project: {
        name: 'foo',
        description: 'bar',
        version: '0.1.0'
      }
    });
  });

  describe('plugin', function() {
    it('should only register the plugin once', function(cb) {
      var count = 0;
      app.on('plugin', function(name) {
        if (name === 'generate-package') {
          count++;
        }
      });
      app.use(generator);
      app.use(generator);
      app.use(generator);
      assert.equal(count, 1);
      cb();
    });

    it('should extend tasks onto the instance', function() {
      app.use(generator);
      assert(app.tasks.hasOwnProperty('default'));
      assert(app.tasks.hasOwnProperty('package'));
    });

    it('should run the `default` task', function(cb) {
      app.use(generator);
      app.generate('default', exists('package.json', cb));
    });

    it('should run the `package` task', function(cb) {
      app.use(generator);
      app.generate('package', exists('package.json', cb));
    });
  });

  describe('generator', function() {
    it('should run the default task on the generator', function(cb) {
      app.register('package', generator);
      app.generate('package', exists('package.json', cb));
    });

    it('should run the `default` task when defined explicitly', function(cb) {
      app.register('package', generator);
      app.generate('package:default', exists('package.json', cb));
    });

    it('should run the `package` task', function(cb) {
      app.register('package', generator);
      app.generate('package:normalize', exists('package.json', cb));
    });
  });

  describe('sub-generator', function() {
    it('should work as a sub-generator', function(cb) {
      app.register('foo', function(foo) {
        foo.register('package', generator);
      });
      app.generate('foo.package', exists('package.json', cb));
    });

    it('should run the `default` task by default', function(cb) {
      app.register('foo', function(foo) {
        foo.register('package', generator);
      });
      app.generate('foo.package', exists('package.json', cb));
    });

    it('should run the `package:default` task when defined explicitly', function(cb) {
      app.register('foo', function(foo) {
        foo.register('package', generator);
      });
      app.generate('foo.package:default', exists('package.json', cb));
    });

    it('should run the `package:normalize` task', function(cb) {
      app.register('foo', function(foo) {
        foo.register('package', generator);
      });
      app.generate('foo.package:normalize', exists('package.json', cb));
    });
  });
});

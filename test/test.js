'use strict';

require('mocha');
var fs = require('fs');
var path = require('path');
var assert = require('assert');
var generate = require('generate');
var gm = require('global-modules');
var existsSync = require('fs-exists-sync');
var del = require('delete');
var generator = require('..');
var app;

var fixtures = path.resolve.bind(path, __dirname, 'fixtures');
var actual = path.resolve.bind(path, __dirname, 'actual');

function exists(name, cb) {
  var filepath = actual(name);

  return function(err) {
    if (err) return cb(err);

    fs.stat(filepath, function(err, stat) {
      assert(stat);
      del(actual(), cb);
    });
  }
}

describe('generate-package', function() {
  beforeEach(function() {
    app = generate({silent: true});
    app.cwd = actual();
    app.option('dest', actual());
    app.option('askWhen', 'not-answered');

    // provide template data to avoid prompts
    app.data(require('../package'));
    app.data('project', require('../package'));
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
      assert(app.tasks.hasOwnProperty('package-new'));
      assert(app.tasks.hasOwnProperty('package-raw'));
      assert(app.tasks.hasOwnProperty('package-choose'));
    });

    it('should run the `default` task with .build', function(cb) {
      app.use(generator);
      app.build('default', exists('package.json', cb));
    });

    it('should run the `default` task with .generate', function(cb) {
      app.use(generator);
      app.generate('default', exists('package.json', cb));
    });

    it('should run the `new` task with .build', function(cb) {
      app.use(generator);
      app.build('new', exists('package.json', cb));
    });

    it('should run the `package` task with .generate', function(cb) {
      app.use(generator);
      app.generate('package', exists('package.json', cb));
    });

    it('should run the `raw` task with .build', function(cb) {
      app.use(generator);
      app.build('raw', exists('package.json', cb));
    });

    it('should run the `raw` task with .generate', function(cb) {
      app.use(generator);
      app.generate('raw', exists('package.json', cb));
    });
  });

  if (!process.env.CI && !process.env.TRAVIS) {
    if (!existsSync(path.resolve(gm, 'generate-package'))) {
      console.log('generate-package is not installed globally, skipping CLI tests');
    } else {
      describe('generator (CLI)', function() {
        it('should run the default task using the `generate-package` name', function(cb) {
          app.use(generator);
          app.generate('generate-package', exists('package.json', cb));
        });

        it('should run the default task using the `package` generator alias', function(cb) {
          app.use(generator);
          app.generate('package', exists('package.json', cb));
        });

        it('should run the package task explicitly using the `package` generator alias', function(cb) {
          app.use(generator);
          app.generate('package:new', exists('package.json', cb));
        });
      });
    }
  }

  describe('generator (API)', function() {
    it('should run the default task on the generator', function(cb) {
      app.register('package', generator);
      app.generate('package', exists('package.json', cb));
    });

    it('should run the `default` task when defined explicitly', function(cb) {
      app.register('package', generator);
      app.generate('package:default', exists('package.json', cb));
    });

    it('should run the `new` task', function(cb) {
      app.register('package', generator);
      app.generate('package:new', exists('package.json', cb));
    });

    it('should run the `raw` task', function(cb) {
      app.register('package', generator);
      app.generate('package:raw', exists('package.json', cb));
    });

    it('should `package.json` default file', function(cb) {
      app.register('package', generator);

      app.generate('package', function(err) {
        if (err) return cb(err);
        var fp = actual('package.json');
        assert(existsSync(fp));
        var pkg = JSON.parse(fs.readFileSync(fp, 'utf8'));
        assert(pkg.hasOwnProperty('license'));
        del(path.dirname(fp), cb);
      });
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

    it('should run the `package:new` task', function(cb) {
      app.register('foo', function(foo) {
        foo.register('package', generator);
      });
      app.generate('foo.package:new', exists('package.json', cb));
    });

    it('should work with nested sub-generators', function(cb) {
      app
        .register('foo', generator)
        .register('bar', generator)
        .register('baz', generator)

      app.generate('foo.bar.baz', exists('package.json', cb));
    });
  });
});

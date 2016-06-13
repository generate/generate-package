'use strict';

var utils = require('lazy-cache')(require);
var fn = require;
require = utils;

/**
 * Lazily required module dependencies
 */

require('base-fs-conflicts', 'conflicts');
require('common-questions');
require('gulp-choose-files', 'choose');
require('gulp-normalize-pkg', 'normalize');
require('gulp-pick-keys', 'pick');
require('is-valid-app', 'isValid');
require('through2', 'through');
require = fn;

/**
 * Expose `utils` modules
 */

module.exports = utils;

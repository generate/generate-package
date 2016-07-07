'use strict';

var utils = require('lazy-cache')(require);
var fn = require;
require = utils;

/**
 * Lazily required module dependencies (exposed on the `utils` object)
 */

require('common-questions');
require('fs-exists-sync', 'exists');
require('gulp-choose-files', 'choose');
require('gulp-normalize-pkg', 'normalize');
require('gulp-pick-keys', 'pick');
require('is-valid-app', 'isValid');
require = fn;

/**
 * Expose `utils` modules
 */

module.exports = utils;

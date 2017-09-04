#!/usr/bin/env node
'use strict';

const Chalk = require('chalk');
const log = console.log;
const hive = require('../handlers/hive');
const Utils = require('../utils/utils');
const ConfigUtils = require('../utils/config_utils');

// Main code //
const self = module.exports = {
  init: (input) => {
    ConfigUtils.deleteConfig();
    hive.cloneOrUpdate().then(() => {
      log(`Updated successfully`);
    });
  }
};

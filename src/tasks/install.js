#!/usr/bin/env node
'use strict';

const Chalk = require('chalk');
const log = console.log;
const hive = require('../handlers/hive');
const Utils = require('../utils/utils');
const Log = require('../utils/log_utils');
const ConfigUtils = require('../utils/config_utils');
const fs = require('fs');

// Main code //
const self = module.exports = {
  downloadDependencies: (input) => {
    let command = './gradlew dependencies'
    if (fs.existsSync('build.gradle')) {
      if (!fs.existsSync('gradlew')) {
        command = 'gradle dependencies'
      }
      Log.title(`Trying to install dependencies...`);
      Utils.run(command).then(() => {});
    } else {
      Log.titleError(`This doesn't look like a gradle project`);
    }
  },
  init: (input) => {
    self.downloadDependencies();
  }
};

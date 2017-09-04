#!/usr/bin/env node
'use strict';

const Chalk = require('chalk');
const log = console.log;
const Utils = require('../utils/utils');
const Log = require('../utils/log_utils');
const QuickSearch = require('../handlers/quick_search');

// Main code //
const self = module.exports = {
  init: (input) => {
    Log.title(`Stats`)
    QuickSearch.findAllJsonFiles()
      .then(items => {
        log(`There are ${Chalk.green(items.length)} libraries`);
      });
  }
};

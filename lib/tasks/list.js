#!/usr/bin/env node
'use strict';

const Chalk = require('chalk');
const log = console.log;
const hive = require('../handlers/hive');
const Utils = require('../utils/utils');
const Log = require('../utils/log_utils');
const QuickSearch = require('../handlers/quick_search');

// Main code //
const self = module.exports = {
  init: (input) => {

    QuickSearch.read()
      .then(items => {
        items.forEach(item => {
          log(item);
        });
        Log.title(`These are the ${Chalk.bold(items.length)} items`);
      });
  }
};

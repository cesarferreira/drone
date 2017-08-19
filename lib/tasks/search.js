#!/usr/bin/env node
'use strict';

const Chalk = require('chalk');
const log = console.log;
const QuickSearch = require('../handlers/quick_search');
const InfoTask = require('../tasks/info');
const Log = require('../utils/log_utils');
const Utils = require('../utils/utils');

// Main code //
const self = module.exports = {
  init: (input) => {
    QuickSearch.search(input)
      .then(result => {

        if (result.rating === 1) {
          Log.title(`Found it!`);
          InfoTask.init(result.target);
        } else if (result.rating > 0.4) {
          Log.title(`Did you mean`);
          log(`${result.target} `+ Chalk.grey(`(${Math.round(result.rating*100)}%)`));
        } else {
          Utils.suggestCreation(input);
        }
      });
  }
};

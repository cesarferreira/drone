#!/usr/bin/env node
'use strict';

const Chalk = require('chalk');
const log = console.log;
const QuickSearch = require('../handlers/quick_search');
const InfoTask = require('../tasks/info');
const Log = require('../utils/log_utils');

// Main code //
const self = module.exports = {
  init: (input) => {

    if (input.length == 0) {
      Log.titleError(`You need to specify the pair`);
      return;
    }
    
    QuickSearch.searchWithSuggestions(input[0]);
  }
};

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

    QuickSearch.search(input[0])
    .then(result => {
      if (result.rating === 1) {
        hive.getWithVersions(result.target)
        .then(info => {
          Utils.printInfo(info);          
        });
      } else {
        Log.title('Did you mean');
        log(`${result.target}`);
      }
    });
  },
  print: pair => {
    hive.get(pair)
      .then(info => {
        Utils.printInfo(info);
      })
      .catch(err => {
        Utils.suggestCreation(pair);
      });
  }
};

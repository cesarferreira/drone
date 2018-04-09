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

    const term = input[0]
    QuickSearch.search(term)
      .then(results => {

				const bestMatch = QuickSearch.findBestMatch(results, input[0])

        if (bestMatch) {
          hive.getWithVersions(bestMatch)
            .then(info => {
              Utils.printInfo(info);          
            });
        } else {
          QuickSearch.showSuggestionsIfPresent(results, term)
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

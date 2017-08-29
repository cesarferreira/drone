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
    QuickSearch.searchWithMatches(input[0])
      .then(result => {        
        if (result.bestMatch.rating === 1) {
          Log.title(`Found it!`);
          InfoTask.print(result.target);
        } else {
          Log.title(`Did you mean`);
          result.ratings.forEach(item => {
            if (item.rating > 0.2) {
              log(Chalk.grey(`${Math.round(item.rating * 100)}% `)+`${item.target} `);
            }
          });
        }
      });
  }
};

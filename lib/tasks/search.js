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

    if (input.length == 0) {
      Log.titleError(`You need to specify the pair`);
      return;
    }

    const pair = input[0];

    QuickSearch.searchWithMatches(pair)
      .then(result => {        
        if (result.bestMatch.rating === 1) {
          Log.title(`Found it!`);
          InfoTask.print(result.bestMatch.target);
        } else if (result.ratings.length > 0) {
          let response = [];
          result.ratings.forEach(item => {
            if (item.rating > 0.3) {
              response.push(Chalk.grey(`${Math.round(item.rating * 100)}% `)+`${item.target} `);
            }
          });

          if (response.length > 0) {
            Log.title(`Did you mean`);
            response.forEach(item => {
              log(item);
            })
          } else {
            Utils.suggestCreation(pair);  
          }
        } else {
          Utils.suggestCreation(pair);
        }
      });
  }
};

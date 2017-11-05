#!/usr/bin/env node
'use strict';

const Chalk = require('chalk');
const log = console.log;
const QuickSearch = require('../handlers/quick_search');
const InfoTask = require('../tasks/info');
const Log = require('../utils/log_utils');
const Utils = require('../utils/utils');
const Hive = require('../handlers/hive');

function sortByKey(array, key) {
  return array.sort(function(a, b) {
      var x = a[key]; var y = b[key];
      return ((x < y) ? -1 : ((x > y) ? 1 : 0));
  }).reverse();
}

function getSuggestion(item) {
  var description = Hive.getDescription(item.target)
  return Chalk.grey(`${Math.round(item.rating * 100)}% `)+`${Chalk.bold(item.target)}: ${Chalk.grey(description)}`;
}

function getSuggestions(items) {
  let result = []
  sortByKey(items, "rating").forEach(item => {
    if (item.rating > 0.3) {
      result.push(getSuggestion(item));
    }
  });

  return result;
}
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
          log(getSuggestion(result.bestMatch))
        
        } else if (result.ratings.length > 0) {
          
          let suggestions = getSuggestions(result.ratings);

          if (suggestions.length > 0) {
            Log.title(`Did you mean`);
            suggestions.forEach(item => {
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

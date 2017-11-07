#!/usr/bin/env node
'use strict';

const log = console.log;
const Utils = require('../utils/utils');
const Chalk = require('chalk');
const Constants = require('../utils/constants');

// Main code //
const self = module.exports = {

  getSuggestion: (item) => {    
    const description = self.getLibraryDescription(item.target);
    // Chalk.grey(`${Math.round(item.rating * 100)}% `)+
    return `${item.target}: ${Chalk.grey(description)}`;
  },

  getSuggestions: items => {
    let result = []
    Utils.sortByKey(items, 'rating').forEach(item => {
      if (item.rating > 0.3) {
        result.push(self.getSuggestion(item));
      }
    });
  
    return result;
  },
  getLibraryDescription: pair => {
    const path = `${Constants.HIVE_LIBS_DIR}/${pair}.json`;
    return require(path).description;
  },
};

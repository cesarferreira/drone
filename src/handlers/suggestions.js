#!/usr/bin/env node
'use strict';

const log = console.log;
const Utils = require('../utils/utils');
const Chalk = require('chalk');
const Constants = require('../utils/constants');
const jsonfile = require('jsonfile');

// Main code //
const self = module.exports = {

  getSuggestion: (item) => {    
    const description = self.getLibraryDescription(item);
    return `${item}: ${Chalk.grey(description)}`;
  },

  getSuggestions: items => {
    let result = []
    items.forEach(item => {
      result.push(self.getSuggestion(item));
    });
  
    return result;
  },
  
  getLibraryDescription: pair => {
    const path = `${Constants.HIVE_LIBS_DIR}/${pair}.json`;
    return jsonfile.readFileSync(path).description;
  },
};

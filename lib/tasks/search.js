#!/usr/bin/env node
'use strict';

const Chalk = require('chalk');
const log = console.log;
const QuickSearch = require('../handlers/quick_search');
const InfoTask = require('../tasks/info');

// Main code //
const self = module.exports = {
  init: (input) => {
    QuickSearch.search(input)
      .then(result => {

        if (result.rating === 1) {
          log(Chalk.blue('==>') + Chalk.bold(' Found it!'));
          InfoTask.init(result.target);
        } else {
          log(Chalk.blue('==>')+ Chalk.bold(' Did you mean'));
          log(`${result.target} `+ Chalk.grey(`(${Math.round(result.rating*100)}%)`));
        }
      });
  }
};

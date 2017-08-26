#!/usr/bin/env node
'use strict';

const Chalk = require('chalk');
const log = console.log;
const hive = require('../handlers/hive');
const Utils = require('../utils/utils');
const Log = require('../utils/log_utils');

// Main code //
const self = module.exports = {
  init: (input) => {

    if (input.length == 0) {
      Log.titleError(`You need to specify the pair`);
      return;
    }

    self.print(input[0])
    
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

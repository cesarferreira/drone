#!/usr/bin/env node
'use strict';

const Chalk = require('chalk');
const log = console.log;
const hive = require('../handlers/hive');
const Utils = require('../utils/utils');

// Main code //
const self = module.exports = {
  init: (input) => {
    hive.get(input)
      .then(info => {
        Utils.printInfo(info);
      })
      .catch(err => {
        Utils.suggestCreation(input);
      });
  }
};

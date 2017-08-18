#!/usr/bin/env node
'use strict';

const Chalk = require('chalk');
const Git = require('../utils/git');
const fs = require('fs');
const Constants = require('../utils/constants');
const log = console.log;

// Main code //
const self = module.exports = {
  get: (pair) => {
    return new Promise((resolve, reject) => {
      const path = `${Constants.HIVE_LIBS_DIR}/${pair}.json`;
      let result = null;

      if (fs.existsSync(path)) {
        resolve(require(path));
      } else {
        reject(`Couldn't find this pair`);
      }
    });
  },
  cloneOrUpdate: () => {
    return Git.cloneOrUpdate(Constants.HIVE_GITHUB_URL, Constants.HIVE_HOME_DIR);
  }
};

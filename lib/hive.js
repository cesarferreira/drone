#!/usr/bin/env node
'use strict';

const Chalk = require('chalk');
const Git = require('./git');
const fs = require('fs');
const Constants = require('./constants');
const log = console.log;

// Main code //
const self = module.exports = {
  get: (pair) => {
    log(Constants.cena)
    return new Promise((resolve, reject) => {
      const path = `${Constants.HIVE_LIBS_DIR}/${pair}/info.json`;
      let result = null;
      if (fs.existsSync(path)) {
        resolve(require(path));
      } else {
        reject();
      }
    });
  },
  cloneOrUpdate: () => {
    return Git.cloneOrUpdate(Constants.HIVE_GITHUB_URL, Constants.HIVE_HOME_DIR);
  }
};

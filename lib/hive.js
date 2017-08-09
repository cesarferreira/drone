#!/usr/bin/env node
'use strict';

const Chalk = require('chalk');
const Git = require('./git');
const homedir = require('homedir');
const fs = require('fs');

const log = console.log;

const HIVE_GITHUB_URL = 'https://github.com/cesarferreira/drone-hive'; // we should allow the user to swtich for his own
const HIVE_HOME_DIR = `${homedir()}/.drone-hive`;
const HIVE_LIBS_DIR = `${HIVE_HOME_DIR}/hive/`;

// Main code //
const self = module.exports = {
  get: (pair) => {
    return new Promise((resolve, reject) => {
      const path = `${HIVE_LIBS_DIR}/${pair}/info.json`;
      let result = null;
      if (fs.existsSync(path)) {
        resolve(require(path));
      } else {
        reject();
      }
    });
  },
  cloneOrUpdate: () => {
    return Git.cloneOrUpdate(HIVE_GITHUB_URL, HIVE_HOME_DIR);
  }
};

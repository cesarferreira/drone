#!/usr/bin/env node
'use strict';

const Chalk = require('chalk');
const Git = require('nodegit');
const homedir = require('homedir');
const fs = require('fs');
const jclrz = require('json-colorz');

const log = console.log;

const HIVE_GITHUB_URL = 'https://github.com/cesarferreira/drone-hive'; // we should allow the user to swtich for his own
const HIVE_HOME_DIR = `${homedir()}/.drone-hive`;
const HIVE_LIBS_DIR = `${HIVE_HOME_DIR}/hive/`;

// Main code //
const self = module.exports = {
  init: (params) => {
    
  },
  data: (params) => {
    const path = `${HIVE_LIBS_DIR}/${params}/info.json`;

    if (fs.existsSync(path)) {
      const parsedJSON = require(path);
      jclrz(parsedJSON);

    } else {
      log(Chalk.red(`CANT FIND ANYTHING SON, suggest how to create a new one`))
    }
  },
  clone: () => {

    if (fs.existsSync(HIVE_HOME_DIR)) {
      // update
      Git.u
    } else {
      Git.Clone(HIVE_GITHUB_URL, HIVE_HOME_DIR)
        .then(repo => {
          // Use a known commit sha from this repository.
          log(`i cloned`)
        })
    }
  }
};

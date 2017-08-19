#!/usr/bin/env node
'use strict';

const exec = require('child_process').exec;
const Chalk = require('chalk');
const log = console.log;
const jclrz = require('json-colorz');
const Constants = require('../utils/constants');
const Log = require('../utils/log_utils');

// Main code //
const self = module.exports = {
  run: command => {
    return new Promise((resolve, reject) => {
      exec(command, (error, stdout, stderr) => {
          if (error !== null) {
            reject(error);
          } else {
            resolve(stdout);
          }
      });
    })
  },
  removeFirstItem: params => { 
    const temp = params;
    return temp.shift() 
  },
  needParams: params => {
    if (!params || params.length === 0) {
      log(Chalk.red(`You lack params`));
      process.exit();
    }
  },
  suggestCreation: (input) => {
    Log.titleError(`CANT FIND ${Chalk.yellow(input)}`)
    log(`To learn how to create a new 'drone' go to\n${Chalk.green(Constants.HIVE_GITHUB_URL)}`)
  },
  printInfo: (info) => {
    jclrz(info);
  }
};

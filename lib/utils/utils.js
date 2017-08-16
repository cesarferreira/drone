#!/usr/bin/env node
'use strict';

const exec = require('child_process').exec;
const Chalk = require('chalk');
const log = console.log;

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
  }
};

#!/usr/bin/env node
'use strict';

const exec = require('child_process').exec;
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
    params.splice(0, 1)
    return params;
  },
  needParams: params => {
    if (params.length === 0) {
      log(Chalk.red(`You lack params`));
      process.exit();
    }
  }
};

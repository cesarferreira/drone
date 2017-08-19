#!/usr/bin/env node
'use strict';

const exec = require('child_process').exec;
const Chalk = require('chalk');
const log = console.log;
const jclrz = require('json-colorz');
const Constants = require('../utils/constants');
const Log = require('../utils/log_utils');
const fs = require('fs');
const stringSearcher = require('string-search');

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
  },
  findStringInFile: (textToFind, pathToFile) => {
    return new Promise((resolve, reject) => {
      fs.readFile(pathToFile, 'utf8', function (err, content) {
        if (err) {
          reject(err)
        } else {
          stringSearcher.find(content, textToFind)
            .then(resultArr => {
              if (resultArr.length > 0) {
                resolve(resultArr);
              } else {
                resolve([])
              }
            });
        }
      });
    });
  }
};

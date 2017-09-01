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
const shell = require('shelljs');

Array.prototype.subarray = function (start, end) {
  if (!end) { end = -1; }
  return this.slice(start, this.length + 1 - (end * -1));
}

// Main code //
const self = module.exports = {
  run: command => {
    return new Promise((resolve, reject) => {

      try {
        shell.exec(command, { silent: false }).stdout;
        resolve();
      } catch (error) {
        reject(error);
      }
    })
  },
  isEmpty: obj => {
    return Object.keys(obj).length === 0;
  },
  suggestCreation: (input) => {
    Log.titleError(`CANT FIND ${Chalk.yellow(input)}`)
    log(`Try to run ${Chalk.green('drone update')} to get the latest packages`)
    log(`If it doesn't work, to learn how to create a new 'drone' go to\n${Chalk.green(Constants.HIVE_GITHUB_URL)}`)
  },
  printInfo: (info) => {
    jclrz(info);
  },
  countFileLines: filePath => {
    return new Promise((resolve, reject) => {
      let lineCount = 0;
      fs.createReadStream(filePath)
        .on("data", (buffer) => {
          let idx = -1;
          lineCount--; // Because the loop will run once for idx=-1
          do {
            idx = buffer.indexOf(10, idx + 1);
            lineCount++;
          } while (idx !== -1);
        }).on("end", () => {
          resolve(lineCount);
        }).on("error", reject);
    });
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

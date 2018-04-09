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

function findSync(...args) {
  if (args.length !== 2) {
    reject('You must provide all arguments');
  }
  const [targetStr, patternStr] = args;
  const results = [];
  const pattern = new RegExp(patternStr, 'gi');

  targetStr.split('\n').forEach((value, index) => {
    if (value.match(pattern)) {
      results.push({ line: index + 1, text: value, term: patternStr });
    }
  });
  return results;
}

// Main code //
const self = module.exports = {
  run: (command, silent) => {
    silent = typeof silent !== 'undefined' ? silent : false;

    return new Promise((resolve, reject) => {
      try {
        shell.exec(command, { silent }).stdout;
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  },
  isEmpty: obj => {
    return Object.keys(obj).length === 0;
  },
  sortByKey: (array, key) => {
    return array.sort(function(a, b) {
        var x = a[key]; var y = b[key];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    }).reverse();
  },
  suggestCreation: (input) => {
    Log.titleError(`CANT FIND ${Chalk.yellow(input)}\n\n`)
    log(`Try to run ${Chalk.green('drone update')} to get the latest packages`)
    log(`If it doesn't work, to learn how to create a new 'drone' go to\n${Chalk.green(Constants.HIVE_GITHUB_URL)}`)
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
              resolve (resultArr.length > 0 ? resultArr : [])
            });
        }
      });
    });
  },
  findStringInFileSync: (textToFind, pathToFile) => {
    const content = fs.readFileSync(pathToFile, 'utf8');  
    const resultArr = findSync(content, textToFind)
    let result = [];
    if (resultArr.length > 0) {
      result = resultArr;
    }
    return result;
  }
};

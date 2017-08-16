#!/usr/bin/env node
'use strict';

const Chalk = require('chalk');
const fs = require('fs-extra');
const Utils = require('./utils')
const log = console.log;

// Main code //
const self = module.exports = {
  cloneOrUpdate: (url, destination) => {
    return new Promise((resolve, reject) => {
      fs.ensureDirSync(destination)
      process.chdir(destination);
      if (fs.existsSync(`${destination}/.git/`)) {
        // log(`Gonna update the repository...`)
        Utils.run(`git pull`)
          .then(repo => {
            resolve(destination)
          })
          .catch(err => {
            reject(err);
          }) 
      } else {
        log(`Gonna clone the repository...`)
        Utils.run(`git clone ${url} ${destination}`)
          .then(repo => {
            resolve(destination)
          })
          .catch(err => {
            reject(err);
          }) 
      }
    })
  }
};

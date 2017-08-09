#!/usr/bin/env node
'use strict';

const Chalk = require('chalk');
const fs = require('fs');
const Utils = require('./utils')
const log = console.log;

// Main code //
const self = module.exports = {
  cloneOrUpdate: (url, destination) => {
    return new Promise((resolve, reject) => {
      process.chdir(destination);
      if (fs.existsSync(destination)) {
        // update
        Utils.run(`git pull`)
          .then(repo => {
            resolve(destination)
          })
          .catch(err => {
            reject(err);
          }) 
      } else {
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

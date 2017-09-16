#!/usr/bin/env node
'use strict';

const Chalk = require('chalk');
const fs = require('fs-extra');
const Utils = require('./utils')
const log = console.log;
const QuickSearch = require('../handlers/quick_search');
const ConfigUtils = require('../utils/config_utils');

// Main code //
const self = module.exports = {
  cloneOrUpdate: (url, destination) => {
    return new Promise((resolve, reject) => {
      fs.ensureDirSync(destination)
      process.chdir(destination);
      if (fs.existsSync(`${destination}/.git/`)) {
        if (!ConfigUtils.shouldIUpdateTheHive()) {
          resolve('No need to update')
        } else {
          log(Chalk.yellow(`Updating the hive repository...`));
          Utils.run(`git pull`, true)
            .then(repo => {
              ConfigUtils.updateOrCreateConfig();
              QuickSearch.initOrUpdateFile()
              .then(irrelevant => {
                resolve(destination)
              });
          })
          .catch(err => {
            reject(err);
          });
        }
      } else {
        log(Chalk.green(`Cloning the hive repository...`));
        Utils.run(`git clone ${url} ${destination}`, true)
          .then(repo => {
            ConfigUtils.updateOrCreateConfig();
            QuickSearch.initOrUpdateFile()
              .then(irrelevant => {
                resolve(destination)
              });
            })
          .catch(err => {
            reject(err);
          }) 
      }
    })
  }
};

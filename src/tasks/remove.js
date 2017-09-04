#!/usr/bin/env node
'use strict';

const Chalk = require('chalk');
const log = console.log;
const hive = require('../handlers/hive');
const QuickSearch = require('../handlers/quick_search');
const Log = require('../utils/log_utils');
const Utils = require('../utils/utils');
const GradleUtils = require('../utils/gradle_utils');
const Constants = require('../utils/constants');

function remove(module, dependencies, gradleFilePath) {
  if (GradleUtils.gradleFileExistsIn(module)) {
    dependencies.forEach(dep => {
      Utils.findStringInFile(dep.dependency, gradleFilePath)
        .then(found => {
          if (found.length !== 0) {
            Log.title(`${Chalk.green(dep.dependency)} is there @ line ${found[0].line}`);
            // does this work with the ones with MULTIPLE lines?
            GradleUtils.deleteLineFromFile(gradleFilePath, found[0].line-1);
            Log.title(`Deleted with success`);
          } else {
            Log.titleError(`Couldn't find it in this build.gradle`);
          }
        })
        .catch(err => log(err))
    })
  } else {
    Log.titleError(`Can't find this gradle file`)
    log(gradleFilePath)
  }
}

// Main code //
const self = module.exports = {
  init: (input) => {
    if (input.length < 3) {
      Log.titleError(`You need to specify the module`);
      return;
    }

    const pair = input[1];
    const module = input[2];

    QuickSearch.search(pair)
      .then(result => {
        if (result.rating === 1) {
          hive.getWithVersions(result.target)
            .then(info => {
              remove(module, info.dependencies, GradleUtils.gradleFilePath(module));
            });
        } else {
          Log.titleError(`Can't find ${Chalk.yellow(pair)} in this build.gradle`);
        }
      });
  }
};

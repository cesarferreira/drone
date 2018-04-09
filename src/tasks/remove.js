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

function findAndDelete(dep, gradleFilePath) {
  const found = Utils.findStringInFileSync(dep.dependency, gradleFilePath);

  // Found something
  if (found.length !== 0) {
    const toDelete = found[0];
    
    Log.title(`Deleted ${Chalk.green(dep.dependency)}`);
    GradleUtils.deleteLineFromFile(gradleFilePath, toDelete.line-1);
  } else {
    Log.titleError(`Couldn't find ${Chalk.green(dep.dependency)} in this build.gradle`);
  }
}

function remove(module, dependencies, gradleFilePath) {
  if (GradleUtils.gradleFileExistsIn(module)) {
    dependencies.forEach(dep => {
      findAndDelete(dep, gradleFilePath)
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
      .then(results => {

        const bestMatch = QuickSearch.findBestMatch(results, pair)

        if (bestMatch) {
          hive.getWithVersions(bestMatch)
            .then(info => {
              remove(module, info.dependencies, GradleUtils.gradleFilePath(module));
            });
        } else {
          Log.titleError(`Can't find ${Chalk.yellow(pair)} in this build.gradle`);
        }
      });
  }
};

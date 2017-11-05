#!/usr/bin/env node
'use strict';

const Chalk = require('chalk');
const Git = require('../utils/git');
const fs = require('fs');
const Constants = require('../utils/constants');
const log = console.log;
const Metadata = require('../metadata/metadata');

// Main code //
const self = module.exports = {

  get: pair => {
    return new Promise((resolve, reject) => {
      const path = `${Constants.HIVE_LIBS_DIR}/${pair}.json`;
      let result = null;

      if (fs.existsSync(path)) {
        resolve(require(path));
      } else {
        reject(`Couldn't find this pair`);
      }
    });
  },

  getWithVersions: pair => {
    return self.get(pair)
      .then(info => {
        return Metadata.getLatestVersions(info)
          .then(versions => {
            for (var i = 0; i < versions.length; i++) {
              info.dependencies[i].version = versions[i]
            }
            return info;
          })
      });
  },

  getCompileLines: (info) => {
    let compileLines = [];
    info.dependencies.forEach(dep => {
      compileLines.push(self.getCompileLine(dep));
    });
    return compileLines;
  },

  getCompileLine: (dep) => {
    return `    ${dep.compileType} '${dep.dependency}:${dep.version}'`;
  },

  cloneOrUpdate: () => {
    return Git.cloneOrUpdate(Constants.HIVE_GITHUB_URL, Constants.HIVE_HOME_DIR);
  }
};

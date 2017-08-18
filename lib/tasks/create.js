#!/usr/bin/env node
'use strict';

const Chalk = require('chalk');
const inquirer = require('inquirer');
const log = console.log;
const Constants = require('../utils/constants');
const fs = require('fs-extra');

// Main code //
const self = module.exports = {
  init: (input, flags) => {
    inquirer.prompt(Constants.CREATE_QUESTIONS)
      .then(answers => {
        const result = self.getFormatedResult(answers);
        const path = `${Constants.HIVE_LIBS_DIR}/${answers.name.toLowerCase()}`

        log('Instructions:\n')
        log(Chalk.green(`mkdir -p ${path}`))
        log(`info.json`)
        
        const infoContent = JSON.stringify(result, null, '  ');

        self.createFileIn(`${path}`, infoContent)

        self.createPullRequest(result);
    });
  },
  createPullRequest:(result => { 
    // TODO
    // log(`I have no idea how to create a PR`);
  }),
  createFileIn:((destination, content) => {
    fs.ensureDirSync(destination);
    const destinationFile = destination + `/info.json`;

    var options = { flag: 'w' };

    // Write the info.json file
    fs.writeFile(destinationFile, content, options, err => {
      if (err) {
        return log(err);
      }

      log(Chalk.green(content));

      log("The file was saved in " + destinationFile);
    }); 
  }),
  getFormatedResult:(answers => {
    let result = {};

    result.name = answers.name;

    if (answers.description !== '') {
      result.description = answers.description;
    }
    if (answers.homepage !== '') {
      result.homepage = answers.homepage;
    }
    
    result.dependencies = [{
      dependency: answers.dependency,
      compileType: answers.compileType
    }];

    result.repository = {};
    result.repository.server = answers.server;

    if (answers.customRepository !== '') {
      result.repository.url = answers.customRepository;
    }

    return result;
  })
};

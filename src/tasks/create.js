#!/usr/bin/env node
'use strict';

const Chalk = require('chalk');
const inquirer = require('inquirer');
const log = console.log;
const Constants = require('../utils/constants');
const fs = require('fs-extra');
const GithubMetadata = require('../handlers/github_metadata');
const QuickSearch = require('../handlers/quick_search');

function getQuestions(metadata) {
  const CREATE_QUESTIONS = [
    {
      type: 'input',
      name: 'dependency',
      message: `What's the dependency?`,
      default: () => metadata.dependency || 'com.username.library:library'
    },
    {
      type: 'input',
      name: 'server',
      message: `What's the server?`,
      default: () => metadata.serverType || 'jcenter'
    },
    {
      type: 'input',
      name: 'compileType',
      message: `What's the compilation type? ${Chalk.gray('(e.g. implementation/implementationCompile/provide/etc)')}`,
      default: () => 'implementation'
    },
    {
      type: 'input',
      name: 'customRepository',
      message: `Does it have a custom classpath? ${Chalk.gray('(e.g.: https://jitpack.io)')}`,
      default: () => metadata.serverUrl
    },
    {
      type: 'input',
      name: 'homepage',
      message: `What's the homepage (optional)?`,
      default: () => metadata.homepage
    },
    {
      type: 'input',
      name: 'description',
      message: `What's the project description (optional)?`,
      default: () => metadata.description
    }
  ];
  return CREATE_QUESTIONS;
}

// Main code //
const self = module.exports = {
  init: (input, flags) => {
    const askForPair = [{
        type: 'input',
        name: 'pair',
        message: `What's the project's name? (e.g. square/retrofit)`,
        default: () => 'creator/library'
      }];

    inquirer.prompt(askForPair)
      .then(pairAnswers => {
        const pair = pairAnswers.pair.trim();
        GithubMetadata.getGithubMetadata(pair)
          .then(metadata => {
            inquirer.prompt(getQuestions(metadata))
              .then(answers => {
                const result = self.getFormatedResult(answers, pair);
                const path = `${Constants.HIVE_LIBS_DIR}/${pair.toLowerCase().split('/')[0]}`
                const jsonFileName = pair.toLowerCase().split('/')[1];
      
                log('\nInstructions:\n')
                const file = `/hive` + path.replace(Constants.HIVE_LIBS_DIR, ``) +`/`+ jsonFileName+`.json`;
                log(`Go to ${Chalk.bgRed.white(Constants.HIVE_GITHUB_URL)}`)
                log(`Open a pull request in this path: ${Chalk.bgRed.white(file)} with this content:`)
                
                const infoContent = JSON.stringify(result, null, 2);
                self.createFileIn(`${path}`, jsonFileName, infoContent)
      
                // force the update of the summary file
                QuickSearch.initOrUpdateFile();
            });
          });
      });
  },
  commitChanges: ((destinationFile, name) => {
    // log(`git add ${destinationFile}; git commit -m "added ${name}"`)
    // return Utils.run(`git add ${destinationFile}; git commit -m "added ${name}"`)   
  }),
  createFileIn:((destination, fileName, content) => {
    fs.ensureDirSync(destination);
    const destinationFile = `${destination}/${fileName}.json`;

    var options = { flag: 'w' };

    // Write the info.json file
    fs.writeFile(destinationFile, content, options, err => {
      if (err) {
        return log(err);
      }

      log(Chalk.green(content));

      self.commitChanges(destinationFile, JSON.parse(content).name)
    }); 
  }),
  getFormatedResult:((answers, pair) => {
    let result = {};
    result.name = pair;

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

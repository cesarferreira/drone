#!/usr/bin/env node
'use strict';

const Chalk = require('chalk');
const inquirer = require('inquirer');
const log = console.log;
const Constants = require('../utils/constants');
const fs = require('fs-extra');
const GithubMetadata = require('../handlers/github_metadata');

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
      message: `What's the compilation type? ${Chalk.gray('(e.g. compile/testCompile/provide/etc)')}`,
      default: () => 'compile'
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
      GithubMetadata.getGithubMetadata(pairAnswers.pair)
        .then(metadata => {
          inquirer.prompt(getQuestions(metadata))
            .then(answers => {
    
              const result = self.getFormatedResult(answers);
              const path = `${Constants.HIVE_LIBS_DIR}/${pairAnswers.pair.toLowerCase().split('/')[0]}`
              const jsonFileName = pairAnswers.pair.toLowerCase().split('/')[1];
    
              log('Instructions:\n')
              log(Chalk.green(`mkdir -p ${path}`))
              
              const infoContent = JSON.stringify(result, null, 2);
              // log(Chalk.green(infoContent));

              self.createFileIn(`${path}`, jsonFileName, infoContent)
    
              // self.createPullRequest(result);
          });
        });
    });
  },
  createPullRequest: result => { 
    // TODO
    // log(`I have no idea how to create a PR`);
  },
  commitChanges: ((destinationFile, name) => {
    log(`git add ${destinationFile}; git commit -m "added ${name}"`)
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

      log("The file was saved in " + destinationFile);

      self.commitChanges(destinationFile, JSON.parse(content).name)
      //   .then(repo => {
      //     log(`added ${name}`);
      //   })
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

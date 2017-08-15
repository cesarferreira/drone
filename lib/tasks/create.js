#!/usr/bin/env node
'use strict';

const Chalk = require('chalk');
const inquirer = require('inquirer');
const log = console.log;

// Main code //
const self = module.exports = {
  init: (input, flags) => {

    let homepage = "";

    var questions = [
      {
        type: 'input',
        name: 'name',
        message: `What's the project's name?`,
        default: () => 'username/repo'
      },
      {
        type: 'input',
        name: 'dependency',
        message: `What's the dependency?`,
        default: () => 'com.username.library:library'
      },
      {
        type: 'input',
        name: 'server',
        message: `What's the server?`,
        default: () => 'jcenter'
      },
      {
        type: 'input',
        name: 'compileType',
        message: `What's the compilation type? (e.g. compile/testCompile/etc) `,
        default: () => 'compile'
      }, 
      {
        type: 'input',
        name: 'customRepository',
        message: `Does it have a custom classpath? (e.g.: https://jitpack.io)`
      },
      {
        type: 'input',
        name: 'homepage',
        message: `What's the homepage (optional)?`
      },
      {
        type: 'input',
        name: 'description',
        message: `What's the project description (optional)?`
      }
    ]

    inquirer.prompt(questions)
      .then(answers => {
      console.log(JSON.stringify(answers, null, '  '));
    });
  }
};

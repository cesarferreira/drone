#!/usr/bin/env node
'use strict';

const Chalk = require('chalk');
const log = console.log;
const jclrz = require('json-colorz');
const hive = require('../handlers/hive');

// Main code //
const self = module.exports = {
  init: (input) => {
    hive.get(input)
      .then(info => {
        jclrz(info);
      })
      .catch(err => {
        log(Chalk.red(`CANT FIND ${Chalk.yellow(input)}, //TODO suggest how to create a new one`))
      });
  }
};

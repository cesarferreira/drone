#!/usr/bin/env node
'use strict';

const Chalk = require('chalk');
const Utils = require('./utils')
const log = console.log;

// Main code //
const self = module.exports = {
	title: (text) => {
		log(Chalk.blue('==>') + Chalk.bold(` ${text}`));
	},
	titleError: (text) => {
		log(Chalk.red('==>') + Chalk.bold(` ${text}`));
	}
};

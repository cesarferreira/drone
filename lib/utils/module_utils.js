#!/usr/bin/env node
'use strict';

const Chalk = require('chalk');
const Utils = require('./utils')
const log = console.log;
const fs = require('fs');

// Main code //
const self = module.exports = {
	gradleFilePath: (module) => {
		return `${process.cwd()}/${module}/build.gradle`;
	},
	gradleFileExistsIn: (module) => {
		return fs.existsSync(self.gradleFilePath(module));
	}
};

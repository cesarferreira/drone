#!/usr/bin/env node
'use strict';

const Chalk = require('chalk');
const Utils = require('./utils')
const log = console.log;
const fs = require('fs');
const fsp = require('mz/fs');
const matchBracket = require('match-bracket');

// Main code //
const self = module.exports = {
	gradleFilePath: module => {
		return `${process.cwd()}/${module}/build.gradle`;
	},
	gradleFileExistsIn: module => {
		return fs.existsSync(self.gradleFilePath(module));
	},
	gradleContentAsString: module => {
		return fsp.readFile(self.gradleFilePath(module));
	},
	findEndBracket: (module, line, cursor) => {
		const code = require('fs').readFileSync(self.gradleFilePath(module), 'utf8');
		const bracketPos = { line, cursor };
		return matchBracket(code, bracketPos);
	},
	findLineToInsertLibrary: (module) => {
		self.gradleContentAsString(module)
			.then(content => {
				// find DEPENDENCY
				Utils.findStringInFile('dependencies', self.gradleFilePath(module))
					.then(found => {
						const item = found[0];
						const line = item.line;
						const cursor = item.text.indexOf(`{`)+1;

						// FIND STARTING and ENDING BRACKET
						const result = self.findEndBracket(module, line, cursor);
						log(result)
						// ENDINGBRACKET - 1 in position should be the place
					})
					.catch(err => log(err))

			});
	}
};

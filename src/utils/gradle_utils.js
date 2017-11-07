#!/usr/bin/env node
'use strict';

const Chalk = require('chalk');
const Utils = require('./utils')
const log = console.log;
const fs = require('fs');
const fsp = require('mz/fs');
const matchBracket = require('match-bracket');

function cleanupComments(array) {
	let result = [];
	array.forEach(item => {
		if (!item.text.trim().startsWith('//')) {
			result.push(item);
		}
	})
	return result;
}

function theRightRepository(allRepositories, allProjects) {
	let chosenOne = {};

	if (allProjects.length > 0) {
		allRepositories.forEach(repo => {
			if (repo.line > allProjects[0].line) {
				chosenOne = repo;
			}
		})
	}	
	return chosenOne;
}

// Main code //
const self = module.exports = {
	mainGradleFilePath: () => {
		return `${process.cwd()}/build.gradle`;
	},
	mainGradleContentAsString: () => {
		return fsp.readFileSync(self.mainGradleFilePath());
	},
	gradleFilePath: module => {
		return `${process.cwd()}/${module}/build.gradle`;
	}, 
	gradleFileExistsIn: module => {
		return fs.existsSync(self.gradleFilePath(module));
	},
	gradleContentAsString: module => {
		return fsp.readFile(self.gradleFilePath(module));
	},
	gradleContentAsStringSync: module => {
		return fsp.readFileSync(self.gradleFilePath(module));
	},
	getRepositoryLine: (server, url) => {
		return `        ${server} { url '${url}' }`
	},
	findEndBracket: (path, line, cursor) => {
		const code = require('fs').readFileSync(path, 'utf8');
		const bracketPos = { line, cursor };
		return matchBracket(code, bracketPos);
	},
	insertLineInFile: (pathToFile, line, lineNumber) => {
		var data = fs.readFileSync(pathToFile).toString().split("\n");
		data.splice(lineNumber, 0, line);
		var text = data.join("\n");
		fs.writeFileSync(pathToFile, text, 'utf8');
	},
	deleteLineFromFile: (pathToFile, lineNumber) => {
		var data = fs.readFileSync(pathToFile).toString().split("\n");
		data.splice(lineNumber, 1);
		var text = data.join("\n");
		fs.writeFileSync(pathToFile, text, 'utf8');
	},
	findLineToInsertLibrary: (module) => {
		const content = self.gradleContentAsStringSync(module)

		// find DEPENDENCY
		const found = Utils.findStringInFileSync('dependencies', self.gradleFilePath(module))
			
		const item = found[0];
		const line = item.line;
		const cursor = item.text.indexOf(`{`) + 1;
		// FIND STARTING and ENDING BRACKET
		const result = self.findEndBracket(self.gradleFilePath(module), line, cursor);
		// ENDINGBRACKET - 1 in position should be the place
		return result.line - 1;
	},
	findLineToInsertDependency: (repositoryInfo) => {
		const content = self.mainGradleContentAsString()
			// find DEPENDENCY
		const repositoriesFound = Utils.findStringInFileSync('repositories', self.mainGradleFilePath())
				
		const cleanedRepositories = cleanupComments(repositoriesFound);
		const allProjectsFound = Utils.findStringInFileSync('allprojects', self.mainGradleFilePath())
		const cleanedAllProjects = cleanupComments(allProjectsFound);

		if (cleanedAllProjects.length > 0) {
			// I found an all projects
			const rightRepository = theRightRepository(cleanedRepositories, cleanedAllProjects);

			if (!Utils.isEmpty(rightRepository)) {
				const cursor = rightRepository.text.indexOf(`{`) + 1;
				const result = self.findEndBracket(self.mainGradleFilePath(), rightRepository.line, cursor);
				return result.line - 1;
			}
		} else {
			throw `didnt find an allprojects`;
		}

	}
};

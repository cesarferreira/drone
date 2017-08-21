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
		return fsp.readFile(self.mainGradleFilePath());
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
	findLineToInsertLibrary: (module) => {
		return self.gradleContentAsString(module)
			.then(content => {
				// find DEPENDENCY
				return Utils.findStringInFile('dependencies', self.gradleFilePath(module))
					.then(found => {
						const item = found[0];
						const line = item.line;
						const cursor = item.text.indexOf(`{`) + 1;
						// FIND STARTING and ENDING BRACKET
						const result = self.findEndBracket(self.gradleFilePath(module), line, cursor);
						// ENDINGBRACKET - 1 in position should be the place
						return result.line - 1;
					});
			});
	},
	findLineToInsertDependency: (repositoryInfo) => {
		return self.mainGradleContentAsString()
			.then(content => {
				// find DEPENDENCY
				return Utils.findStringInFile('repositories', self.mainGradleFilePath())
					.then(repositoriesFound => {
						const cleanedRepositories = cleanupComments(repositoriesFound);

						return Utils.findStringInFile('allprojects', self.mainGradleFilePath())
							.then(allProjectsFound => {
								const cleanedAllProjects = cleanupComments(allProjectsFound);

								if (cleanedAllProjects.length > 0) {
									// ACHEI UM ALL PROJECTS
									const rightRepository = theRightRepository(cleanedRepositories, cleanedAllProjects);

									if (Utils.isEmpty(rightRepository)) {
										// todo INSERT ALLPROJECT STUFF
										log(' insert all project stuff')
									} else {
										const cursor = rightRepository.text.indexOf(`{`) + 1;
										// const line = getRepositoryLine(repositoryInfo.url); TODO ISTO NAO DEVIA ESTAR AQUI
										const result = self.findEndBracket(self.mainGradleFilePath(), rightRepository.line, cursor);
										// ENDINGBRACKET - 1 in position should be the place
										return result.line - 1;
									}

								} else {
									log('didnt find an allprojects')
								}
							});
					});
			});
	}
};

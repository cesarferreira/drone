#!/usr/bin/env node
'use strict';

const Chalk = require('chalk');
const log = console.log;
const hive = require('../handlers/hive');
const QuickSearch = require('../handlers/quick_search');
const Log = require('../utils/log_utils');
const Utils = require('../utils/utils');
const GradleUtils = require('../utils/gradle_utils');
const Constants = require('../utils/constants');

function handle(found, info) {
	if (found.length > 0) {
		Log.title(`${Chalk.yellow(info.repository.url)} is already in the main build.gradle`);
	} else {
		return GradleUtils.findLineToInsertDependency(info.repository)
			.then(result => {
				const lineText = GradleUtils.getRepositoryLine(info.repository.server, info.repository.url)
				GradleUtils.insertLineInFile(mainGradleFilePath, lineText, result);
				// pretty print the lines
				log(Chalk.green(lineText.trim()));
			}).catch(err => {
				log(`\nYou are missing the following lines in your main ${Chalk.green('build.gradle')} `)
				log(Chalk.yellow(Constants.ALL_PROJECTS_EMPTY_TEMPLATE))
				log(`\nAfter you add the lines, re-run the drone command`)
			});
	}
}
function handleRepositoryInjection(info) {
	if (info.repository.url) {
		const mainGradleFilePath = GradleUtils.mainGradleFilePath();
		Utils.findStringInFile(info.repository.url, mainGradleFilePath)
			.then(found => {
				handle(found, info)
			});
	}
}

function findLineAndInsertDependency(module, dep, gradleFilePath) {
	const result = GradleUtils.findLineToInsertLibrary(module);

	// get the full line to insert in the file
	const line = hive.getCompileLine(dep)
	// insert the line in fht file
	GradleUtils.insertLineInFile(gradleFilePath, line, result);
	// pretty print the lines
	return line.trim();
}

function injectDependency(dep, dependenciesLength, module, gradleFilePath) {
	return Utils.findStringInFile(dep.dependency, gradleFilePath)
		.then(found => {
			if (found.length === 0) {
				Log.title(`Inserted the following line`);
				
				const resultLine = findLineAndInsertDependency(module, dep, gradleFilePath);
				log(Chalk.green(resultLine.trim()))
			} else {
				Log.titleError(`${Chalk.green(dep.dependency)} is already there @ line ${found[0].line}`)
			}
		})
		.catch(err => log(err))
}

function handleGradleDependencyInjection(module, dependencies, gradleFilePath) {
	if (GradleUtils.gradleFileExistsIn(module)) {
		
		var actions = dependencies.map(dep => {
			return injectDependency(dep, dependencies.length, module, gradleFilePath);
		})

		Promise.all(actions);
	} else {
		Log.titleError(`Can't find this gradle file`)
		log(gradleFilePath)
	}
}

// Main code //
const self = module.exports = {
	init: (input) => {
		if (input.length <= 1) {
			Log.titleError(`You need to specify the module`);
			return;
		}

		const module = input[input.length-1];
		const libraries = input.splice(0, input.length-1)
		
		// log(libraries)
		// log(module)
		
		// process.exit(2)
		libraries.forEach(library => {

			QuickSearch.search(library)
			.then(result => {
				if (result.rating === 1) {
					hive.getWithVersions(result.target)
					.then(info => {
						handleRepositoryInjection(info);
						handleGradleDependencyInjection(module, info.dependencies, GradleUtils.gradleFilePath(module));
					});
				} else {
					Log.title('Did you mean');
					log(`${result.target}`);
				}
			});
		})
		}
	};

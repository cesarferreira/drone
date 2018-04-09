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
const Install = require('../tasks/install');

function handle(found, info, mainGradleFilePath) {
	if (found.length > 0) {
		Log.title(`${Chalk.yellow(info.repository.url)} is already in the main build.gradle`);
	} else {
		const result = GradleUtils.findLineToInsertDependency(info.repository)

		const lineText = GradleUtils.getRepositoryLine(info.repository.server, info.repository.url)
		GradleUtils.insertLineInFile(mainGradleFilePath, lineText, result);
		// pretty print the lines
		log(Chalk.green(lineText.trim()));
		// }).catch(err => {
		// 	log(`\nYou are missing the following lines in your main ${Chalk.green('build.gradle')} `)
		// 	log(Chalk.yellow(Constants.ALL_PROJECTS_EMPTY_TEMPLATE))
		// 	log(`\nAfter you add the lines, re-run the drone command`)
		// });
	}
}
function handleRepositoryInjection(info) {
	if (info.repository.url) {
		const mainGradleFilePath = GradleUtils.mainGradleFilePath();
		const found = Utils.findStringInFileSync(info.repository.url, mainGradleFilePath)	
		handle(found, info, mainGradleFilePath)
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
	const found = Utils.findStringInFileSync(dep.dependency, gradleFilePath)

	if (found.length === 0) {
		const resultLine = findLineAndInsertDependency(module, dep, gradleFilePath);
		Log.title(`Inserted: ${Chalk.green(resultLine.trim())}`)
	} else {
		Log.titleError(`${Chalk.green(dep.dependency)} is already there @ line ${found[0].line}`)
	}
}

function handleGradleDependencyInjection(appModule, dependencies, gradleFilePath) {
	if (GradleUtils.gradleFileExistsIn(appModule)) {
		var actions = dependencies.map(dep => {
			return injectDependency(dep, dependencies.length, appModule, gradleFilePath);
		})

		Promise.all(actions);
	} else {
		Log.titleError(`Can't find this gradle file`)
		log(gradleFilePath)
	}
}

function handleSearchResponse(results, appModule, library) {

	const bestMatch = QuickSearch.findBestMatch(results, library)

  if (bestMatch) {
		hive.getWithVersions(bestMatch)
			.then(info => {
				handleRepositoryInjection(info);
				const gradlePath = GradleUtils.gradleFilePath(appModule);
				handleGradleDependencyInjection(appModule, info.dependencies, gradlePath);
			});
	} else {
		Log.titleError(`Couldnt find ${library}`);
	}
}

function handleInsertion(libraries, appModule) {
	libraries.forEach(library => {
		QuickSearch.search(library)
			.then(results => {
				handleSearchResponse(results, appModule, library);			
			})
		})
}
// Main code //
const self = module.exports = {
	init: (input) => {
		if (input.length <= 1) {
			Log.titleError(`You need to specify the module`);
			return;
		}

		const appModule = input[input.length-1];
		const libraries = input.splice(0, input.length-1)
			
		handleInsertion(libraries, appModule);

		// Install.downloadDependencies()
	}
};

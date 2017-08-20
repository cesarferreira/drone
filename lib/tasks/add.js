#!/usr/bin/env node
'use strict';

const Chalk = require('chalk');
const log = console.log;
const hive = require('../handlers/hive');
const QuickSearch = require('../handlers/quick_search');
const Log = require('../utils/log_utils');
const Utils = require('../utils/utils');
const GradleUtils = require('../utils/gradle_utils');

// Main code //
const self = module.exports = {
	init: (input) => {
		// log(input.length)
		// TODOOOOOOOOOOOOOOOOOOOOOOO so tem 1 em lenght? nao pode continuar
		const module = 'app';  // TODO MAKE ME A REAL BOY
		QuickSearch.search(input[0])
			.then(result => {
				if (result.rating === 1) {
					hive.getWithVersions(result.target)
						.then(info => {
							hive.getCompileLines(info);

							const dependencies = info.dependencies;
							const gradleFilePath = GradleUtils.gradleFilePath(module)

							if (GradleUtils.gradleFileExistsIn(module)) {
								dependencies.forEach(dep => {
									Utils.findStringInFile(dep.dependency, gradleFilePath)
										.then(found => {
											if (found.length === 0) {
												Log.title(`Inserted the following line${dependencies.length > 1 ? 's': ''}`);
												GradleUtils.findLineToInsertLibrary(module)
													.then(result => {
														// get the full line to insert in the file
														const line = hive.getCompileLine(dep)
														// insert the line in fht file
														GradleUtils.insertLineInFile(gradleFilePath, line, result);
														// pretty print the lines
														log(Chalk.green(line.trim()))
													})
											} else {
												Log.titleError(`It's already there @ line ${found[0].line}`)
											}
										})
										.catch(err => log(err))
								})
							} else {
								Log.titleError(`Can't find this gradle file`)
								log(gradleFilePath)
							}

						});
				} else {
					Log.title('Did you mean');
					log(`${result.target}`);
				}
			});
	}
};

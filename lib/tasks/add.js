#!/usr/bin/env node
'use strict';

const Chalk = require('chalk');
const log = console.log;
const hive = require('../handlers/hive');
const QuickSearch = require('../handlers/quick_search');
const Log = require('../utils/log_utils');
const Utils = require('../utils/utils');
const ModuleUtils = require('../utils/module_utils');

// Main code //
const self = module.exports = {
	init: (input) => {
		const module = 'app';  // TODO MAKE ME A REAL BOY
		QuickSearch.search(input[0])
			.then(result => {
				if (result.rating === 1) {
					Log.title(`Found it!`)
					hive.getWithVersions(result.target)
						.then(info => {
							hive.getCompileLines(info);
							const lines = hive.getCompileLines(info);
							lines.forEach(line => {
								log(Chalk.green(line))
							});

							const dependencies = info.dependencies;
							const gradleFilePath = ModuleUtils.gradleFilePath(module)

							if (ModuleUtils.gradleFileExistsIn(module)) {
								dependencies.forEach(dep => {
									Utils.findStringInFile(dep.dependency, gradleFilePath)
										.then(index => {
											log(`Found it @${JSON.stringify(index, null, ' ')}`)
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

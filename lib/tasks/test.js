#!/usr/bin/env node
'use strict';

const Chalk = require('chalk');
const log = console.log;
const hive = require('../handlers/hive');
const QuickSearch = require('../handlers/quick_search');
const Log = require('../utils/log_utils');

// Main code //
const self = module.exports = {
	init: (input) => {
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
						});
				} else {
					Log.title('Did you mean');
					log(`${result.target}`);
				}
			});
	}
};

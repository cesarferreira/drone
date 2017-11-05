#!/usr/bin/env node
'use strict';

const Chalk = require('chalk');
const log = console.log;
const hive = require('../handlers/hive');
const QuickSearch = require('../handlers/quick_search');
const Log = require('../utils/log_utils');
const Utils = require('../utils/utils');
const Suggestions = require('../handlers/suggestions');

// Main code //
const self = module.exports = {
	init: (input) => {

		if (input.length < 1) {
			Log.titleError(`You need to specify the pair`);
			return;
		}

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
				} else if (result.rating > 0.3) {
					Log.title(`Did you mean`);
					log(Suggestions.getSuggestion(result));
				} else {
					Utils.suggestCreation(input);
				}
			});
	}
};

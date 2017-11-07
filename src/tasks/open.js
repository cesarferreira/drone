#!/usr/bin/env node
'use strict';

const Chalk = require('chalk');
const log = console.log;
const Hive = require('../handlers/hive');
const opn = require('opn');
const QuickSearch = require('../handlers/quick_search');

// Main code //
const self = module.exports = {
	init: (input) => {
		QuickSearch.getPairFromInput(input[0])
			.then(term => {
				Hive.get(term)
				.then(info => {
					const url = info.homepage;
					if (url) {
						opn(url, { wait: false }).then(() => {
							log(`Opened: ${Chalk.green(url)}`);
						});
					}
				}).catch(() => {
					log(Chalk.red(`Couldn't find this item`))
				});
			})
	}
};

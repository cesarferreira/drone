#!/usr/bin/env node
'use strict';

const Chalk = require('chalk');
const log = console.log;
const Hive = require('../handlers/hive');
const opn = require('opn');

// Main code //
const self = module.exports = {
	init: (input) => {
		Hive.get(input)
			.then(info => {
				const url = info.homepage;
				if (url) {
					opn(url, { wait: false }).then(() => {
						log(`Opened: ${Chalk.green(url)}`);
					});
				}
			}).catch(() => {
				log(Chalk.red(`Couldn't find this pair`))
			});
	}
};

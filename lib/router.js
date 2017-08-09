#!/usr/bin/env node
'use strict';

const Chalk = require('chalk');
const hive = require('./hive');
const log = console.log;


function removeFirstItem(params) {
	params.splice(0,1)
	return params;
}

function needParams(params) {
	if (params.length === 0) {
		log(Chalk.red(`You lack params`));
		process.exit();
	}
}
// Main code //
const self = module.exports = {
	add: (params) => {
		// todo params sao mais que 2?
		needParams(params);
		// todo module/build.gradle adicionar
		log(`add ${Chalk.green(params.join(', '))}`);
	},
	info: (params) => {
		needParams(params);
		log(`info ${Chalk.green(params.join(', '))}`);
		hive.data(params[0]);
	},
	create: (input, flags) => {
		// needParams(params);
		// log(`create ${Chalk.green(params.join(', '))}`);
		console.log(JSON.stringify(flags, null, 2));
		// hive.data(params[0]);
	},
	install: () => {
		// todo params sao mais que 2?
		// todo module/build.gradle adicionar
		log(`install`);
	},
	// Init
	init: (input, flags) => { 
		// hive.clone(); // todo isto tem que ser visto
		switch (input[0].toLowerCase()) {
			case 'add':
				self.add(removeFirstItem(input));
				break;
			case 'create':
				self.create(removeFirstItem(input), flags);
				break;
			case 'info':
				self.info(removeFirstItem(input));
				break;
			case 'install':
				self.install();
				break;
			default:
				console.log('Sorry');
		}
	}
};

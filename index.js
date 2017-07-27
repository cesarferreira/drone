#!/usr/bin/env node
'use strict';

const Chalk = require('chalk');
const log = console.log;

function removeFirstItem(params) {
	params.splice(0,1)
	return params;
}

// Main code //
const self = module.exports = {
	add: (params) => {
		// todo params sao mais que 2?
		// todo module/build.gradle adicionar
		log(`add ${Chalk.green(params.join(', '))}`);
	},
	init: (params) => { 
		switch (params[0].toLowerCase()) {
			case 'add':
				self.add(removeFirstItem(params));
				break;
			default:
				console.log('Sorry');
		}
	}
};

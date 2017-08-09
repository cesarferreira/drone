#!/usr/bin/env node
'use strict';

const Chalk = require('chalk');
const hive = require('./hive');
const Utils = require('./utils');
const jclrz = require('json-colorz');
const log = console.log;

// Main code //
const self = module.exports = {
	add: (params) => {
		// todo params sao mais que 2?
		Utils.needParams(params);
		// todo module/build.gradle adicionar
		log(`add ${Chalk.green(params.join(', '))}`);
	},
	info: (params) => {
		Utils.needParams(params);
		hive.get(params[0])
			.then(info => {
				jclrz(info);
			})
			.catch(err => {
				log(Chalk.red(`CANT FIND ${Chalk.yellow(params)}, //TODO suggest how to create a new one`))
			});
	},
	create: (input, flags) => {
		// needParams(params);
		// log(`create ${Chalk.green(params.join(', '))}`);
		console.log(JSON.stringify(flags, null, 2));
		// hive.data(params[0]);
	},
	install: () => {
		log(`install`);
	},
	// Init
	init: (input, flags) => { 
		hive.cloneOrUpdate().then(result => {
			switch (input[0].toLowerCase()) {
				case 'add':
					self.add(Utils.removeFirstItem(input));
					break;
				case 'create':
					self.create(Utils.removeFirstItem(input), flags);
					break;
				case 'info':
					self.info(Utils.removeFirstItem(input));
					break;
				case 'install':
					self.install();
					break;
				default:
					console.log('Sorry');
			}
		})
		.catch(err => {
			log(`An error ocurred while cloning the hive project:\n${err}`);
		});
	}
};

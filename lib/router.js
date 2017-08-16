#!/usr/bin/env node
'use strict';

const Chalk = require('chalk');
const hive = require('./handlers/hive');
const Utils = require('./utils/utils');
const log = console.log;

const CreateTask = require('./tasks/create');
const InfoTask = require('./tasks/info');
const SearchTask = require('./tasks/search');

// Main code //
const self = module.exports = {
	init: (input, flags) => { 
		const params = input[1];
		hive.cloneOrUpdate()
		.then(result => {
			switch (input[0].toLowerCase()) {
				case 'add':
					Utils.needParams(Utils.removeFirstItem(input));
					log(`add ${Chalk.green(input.join(', '))}`);
					break;
				case 'create':
					CreateTask.init(input, flags);
					break;
				case 'search':
					SearchTask.init(params);
					break;
				case 'info':
					Utils.needParams(params);
					InfoTask.init(params)
					break;
				case 'install':
					log(`install`);
					break;
				default:
					log(`Sorry, cant find ${input[0]}`);
			}
		})
		.catch(err => {
			log(`An error ocurred while cloning the hive project:\n${Chalk.red(err)}`);
		});
	}
};

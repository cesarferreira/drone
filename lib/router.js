#!/usr/bin/env node
'use strict';

const Chalk = require('chalk');
const hive = require('./handlers/hive');
const Utils = require('./utils/utils');
const log = console.log;

const CreateTask = require('./tasks/create');
const InfoTask = require('./tasks/info');
const SearchTask = require('./tasks/search');
const AddTask = require('./tasks/add');
const TestTask = require('./tasks/test');
const OpenTask = require('./tasks/open');

// Main code //
const self = module.exports = {
	init: (input, flags) => {
		const currentFolder = process.cwd();

		const params = input[1]; // should be all but the first
		hive.cloneOrUpdate().then(result => {
			process.chdir(currentFolder);

			switch (input[0].toLowerCase()) {
				case 'add':
					Utils.needParams(Utils.removeFirstItem(input));
					AddTask.init(input);
					break;
				case 'test':
					Utils.needParams(Utils.removeFirstItem(input));
					TestTask.init(input);
					break;
				case 'open':
					Utils.needParams(Utils.removeFirstItem(input));
					OpenTask.init(input);
					break;
				case 'create':
				case 'new':
					CreateTask.init(input, flags);
					break;
				case 'search':
				case 'find':
					SearchTask.init(params);
					break;
				case 'info':
					Utils.needParams(params);
					InfoTask.init(params);
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

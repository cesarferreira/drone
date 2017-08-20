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
const UpdateTask = require('./tasks/update');
const InstallTask = require('./tasks/install');
const StatsTask = require('./tasks/stats');

// Main code //
const self = module.exports = {
	init: (input, flags) => {
		const currentFolder = process.cwd();

		const first = input[0];
		const params = input.subarray(1, input.length);

		hive.cloneOrUpdate({output: false}).then(() => {
			process.chdir(currentFolder);

			switch (first.toLowerCase()) {
				case 'add':
					AddTask.init(params);
					break;
				case 'test':
					TestTask.init(params);
					break;
				case 'open':
					OpenTask.init(params);
					break;
				case 'create':
				case 'new':
					CreateTask.init(params, flags);
					break;
				case 'search':
				case 'find':
					SearchTask.init(params);
					break;
				case 'info':
					InfoTask.init(params);
					break;
				case 'update':
				case 'upgrade':
					UpdateTask.init(input);
					break;
				case 'install':
					InstallTask.init(input);
					break;
				case 'stats':
					StatsTask.init(input);
					break;
				default:
					log(`Sorry, cant find ${first}`);
			}
		})
		.catch(err => {
			log(`An error ocurred while cloning the hive project:\n${Chalk.red(err)}`);
		});
	}
};

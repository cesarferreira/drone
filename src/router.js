#!/usr/bin/env node
'use strict';

const Chalk = require('chalk');
const hive = require('./handlers/hive');
const Utils = require('./utils/utils');
const Constants = require('./utils/constants');
const Analytics = require('./utils/analytics');
const log = console.log;
const opn = require('opn');

const CreateTask = require('./tasks/create');
const InfoTask = require('./tasks/info');
const SearchTask = require('./tasks/search');
const AddTask = require('./tasks/add');
const TestTask = require('./tasks/test');
const OpenTask = require('./tasks/open');
const UpdateTask = require('./tasks/update');
const InstallTask = require('./tasks/install');
const StatsTask = require('./tasks/stats');
const ListTask = require('./tasks/list');
const RemoveTask = require('./tasks/remove');

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
				case 'a':
					AddTask.init(params);
					Analytics.track(`add`, params[0]);
					break;
				case 'test':
					TestTask.init(params);
					Analytics.track(`test`, params[0]);
					break;
				case 'open':
				case 'o':
					OpenTask.init(params);
					Analytics.track(`open`, params[0]);
					break;
				case 'list':
				case 'l':
					ListTask.init(params);
					Analytics.track(`list`);
					break;
				case 'create':
				case 'new':
					CreateTask.init(params, flags);
					Analytics.track(`create`);
					break;
				case 'search':
				case 'find':
				case 'f':
					SearchTask.init(params);
					Analytics.track(`search`, params[0]);
					break;
				case 'info':
					InfoTask.init(params);
					Analytics.track(`add`, params[0]);
					break;
				case 'update':
				case 'upgrade':
				case 'u':
					UpdateTask.init(input);
					Analytics.track(`update`);
					break;
				case 'install':
				case 'i':
					InstallTask.init(input);
					Analytics.track(`install`);
					break;
				case 'remove':
				case 'delete':
				case 'rm':
					RemoveTask.init(input);
					Analytics.track(`remove`, params[0]);
					break;
				case 'stats':
				case 's':
					StatsTask.init(input);
					Analytics.track(`stats`);
					break;
				case 'hive':
					Analytics.track(`hive`);
					opn(Constants.HIVE_GITHUB_URL, { wait: false }).then(() => {
						log(`Opened: ${Chalk.green(Constants.HIVE_GITHUB_URL)}`);
					});
					break;
				default:
					log(`Sorry, cant find ${first}`);
			}
		})
		// .catch(err => {
		// 	log(`An error ocurred while cloning the hive project:\n${Chalk.red(err)}`);
		// });
	}
};

#!/usr/bin/env node
'use strict';

const Chalk = require('chalk');
const Utils = require('./utils')
const log = console.log;
const Constants = require('../utils/constants');
const fs = require('fs');

// Main code //
const self = module.exports = {
	getConfig: () => {
		let result = {
			last_update: -1
		};

		if (fs.existsSync(Constants.DRONE_CONFIG_FILE)) {
			result = JSON.parse(fs.readFileSync(Constants.DRONE_CONFIG_FILE, 'utf8'));
		} else {
			fs.writeFileSync(Constants.DRONE_CONFIG_FILE, JSON.stringify(result), 'utf-8');
		}

		return result;
	},
	updateOrCreateConfig: params => {
		const conf = {
			last_update: Math.floor(Date.now() / 1000)
		}

		fs.writeFileSync(Constants.DRONE_CONFIG_FILE, JSON.stringify(conf), 'utf-8');
	},
	deleteConfig: () => {
		fs.unlinkSync(Constants.DRONE_CONFIG_FILE);
	},
	shouldIUpdateTheHive: () => {
		// read config
		const config = self.getConfig();
		let shouldIPull = false;

		const currentDate = Math.floor(Date.now() / 1000);
		const diff = currentDate - (config.last_update + Constants.UPDATE_TIMOUT);

		if (config.last_update === -1 || diff >= 0) {
			shouldIPull = true;
		}
		return shouldIPull;
	}
};

#!/usr/bin/env node
'use strict';

const Chalk = require('chalk');
const log = console.log;
const Constants = require('../utils/constants');
const fs = require('fs-extra');
const JCenter = require('./jcenter')
const Maven = require('./jcenter')

// Main code //
const self = module.exports = {
	getLatestVersion: (info) => {
		let promise = {};
		const server = info.repository.server.toLowerCase();
		log(server)
		switch (server) {
			case 'jcenter':
				promise = JCenter.getLatestVersion(info);
				break;
			case 'maven':
				promise = Maven.getLatestVersion(info);
				break;
			default:
				break;
		}
		return promise;
	}
};

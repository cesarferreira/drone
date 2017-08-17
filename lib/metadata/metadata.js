#!/usr/bin/env node
'use strict';

const Chalk = require('chalk');
const log = console.log;
const Constants = require('../utils/constants');
const fs = require('fs-extra');

const JCenter = require('./jcenter')
const Maven = require('./jcenter')
const Jitpack = require('./jitpack')

// Main code //
const self = module.exports = {
	getLatestVersion: (info) => {
		let promise = {};
		const server = info.repository.server.toLowerCase();
		switch (server) {
			case 'jcenter':
				promise = JCenter.getLatestVersion(info);
				break;
			case 'maven':
				switch (info.repository.server.url) {
					case 'https://jitpack.io':
						promise = Jitpack.getLatestVersion(info);
						break;
					default:
						promise = Maven.getLatestVersion(info);
						break;
				}
				break;
			default:
				// What is the meaning of life?!
				break;
		}
		return promise;
	}
};

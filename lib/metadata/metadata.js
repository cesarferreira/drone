#!/usr/bin/env node
'use strict';

const Chalk = require('chalk');
const log = console.log;
const Constants = require('../utils/constants');
const fs = require('fs-extra');

const MetadataUtils = require('./utils')

// Main code //
const self = module.exports = {
	getLatestVersion: (info) => {
		let promise = {};
		const server = info.repository.server.toLowerCase();
		
		switch (server) {
			case 'jcenter':
				promise = MetadataUtils.getLatestVersion(info.dependencies, Constants.JCENTER_URL_TEMPLATE);
				break;
			case 'maven':
				switch (info.repository.server.url) {
					case 'https://jitpack.io':
						promise = MetadataUtils.getLatestVersion(info);
						break;
					default:
						promise = MetadataUtils.getLatestVersion(info.dependencies, Constants.MAVEN_URL_TEMPLATE);
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

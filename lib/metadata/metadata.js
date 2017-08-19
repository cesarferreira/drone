#!/usr/bin/env node
'use strict';

const Chalk = require('chalk');
const log = console.log;
const Constants = require('../utils/constants');
const fs = require('fs-extra');

const MetadataUtils = require('./utils')

function jcenterVersionCallback(result) {
	let version = '+';

	if (result.metadata.version.length === 1) {
		version = result.metadata.version[0];
	} 
	return version;
}

function mavenVersionCallback(result) {
	return jcenterVersionCallback(result);
}

function jitpackVersionCallback(result) {
	let version = '+';

	if (result.metadata.versioning[0].release.length === 1) {
		version = result.metadata.versioning[0].release[0];
	}

	return version;
}

// Main code //
const self = module.exports = {
	getLatestVersions: (info) => {
		let promise = {};
		const server = info.repository.server.toLowerCase();
		
		switch (server) {
			case 'jcenter':
				promise = MetadataUtils.getLatestVersion(info.dependencies, jcenterVersionCallback, Constants.JCENTER_URL_TEMPLATE);
				break;
			case 'maven':
				switch (info.repository.url) {
					case 'https://jitpack.io':
						promise = MetadataUtils.getLatestVersion(info.dependencies, jitpackVersionCallback, Constants.JITPACK_URL_TEMPLATE);
						break;
					default:
						promise = MetadataUtils.getLatestVersion(info.dependencies, mavenVersionCallback, Constants.MAVEN_URL_TEMPLATE);
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

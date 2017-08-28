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
				let template = {};
				if (info.repository.url) {
					const cleansedUrl = info.repository.url[info.repository.url.length - 1] === '/' ? info.repository.url : info.repository.url + '/';
					template = Constants.MAVEN_CUSTOM_URL_TEMPLATE.replace('URL', cleansedUrl);
				} else {
					template = Constants.MAVEN_URL_TEMPLATE;
				}

				promise = MetadataUtils.getLatestVersion(info.dependencies, mavenVersionCallback, template);
				break;
			default:
				break;
		}
		return promise;
	}
};

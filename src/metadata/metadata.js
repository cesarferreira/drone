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

function getCorrectMavenTemplate(url) {
	let template = {};
	if (url) {
		const cleansedUrl = url[url.length - 1] === '/' ? url : url + '/';
		template = Constants.MAVEN_CUSTOM_URL_TEMPLATE.replace('URL', cleansedUrl);
	} else {
		template = Constants.MAVEN_URL_TEMPLATE;
	}

	return template;
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
				promise = MetadataUtils.getLatestVersion(info.dependencies, mavenVersionCallback, getCorrectMavenTemplate(info.repository.url));
				break;
			default:
				break;
		}
		return promise;
	}
};

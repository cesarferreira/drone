#!/usr/bin/env node
'use strict';

const Chalk = require('chalk');
const log = console.log;
const Constants = require('../utils/constants');
const fs = require('fs-extra');
const Hive = require('../handlers/hive');
const xml2js = require('xml2js');

// Main code //
const self = module.exports = {
	getLatestVersion: (dependencies, versionCallback, URL_TEMPLATE) => {
		var promises = dependencies.map(dep => {
			return new Promise((resolve, reject) => {
				const substitute = dep.dependency.replace(/\./g, '/').replace(/:/g, '/');
				let url = URL_TEMPLATE.replace('PLACEHOLDER', substitute);
				require('node-read-url')
					.promise(url)
					.then(response => {
						xml2js.parseString(response, (err, result) => {
							const version = versionCallback(result);
							resolve(version)
						});
					}).catch(err => resolve('+'));
			}).catch(err => resolve('+'));
		});
		return Promise.all(promises);
	},
	getLatestVersionByPair: (pair, URL_TEMPLATE) => {
		return Hive.get(pair)
			.then(info => {
				return self.getLatestVersion(info.dependencies);
			}).catch(err => {
				log(`Cant find the pair: ${pair}`)
			});
	}
};

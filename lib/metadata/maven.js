#!/usr/bin/env node
'use strict';

const Chalk = require('chalk');
const log = console.log;
const Constants = require('../utils/constants');
const fs = require('fs-extra');
const Hive = require('../handlers/Hive');
const xml2js = require('xml2js');

// Main code //
const self = module.exports = {
	getLatestVersion: (info) => {
		return new Promise((resolve, reject) => {
			const substitute = info.dependency.replace(/\./g, '/').replace(/:/g, '/')
			let url = `http://repo1.maven.org/maven2/${substitute}/maven-metadata.xml`

			require('node-read-url')
				.promise(url)
				.then(response => {
					xml2js.parseString(response, (err, result) => {
						if (result.metadata.version.length === 1) {
							resolve(result.metadata.version[0])
						} else {
							resolve('+')
						}
					});
				})
		}).catch(err => resolve('+'));
	},
	getLatestVersionByPair: (pair) => {
		return Hive.get(pair)
			.then(info => { 
				return self.getLatestVersion(info);
			}).catch(err => {
				log(`Cant find the pair: ${pair}`)
			});
	}
};


// self.getLatestVersionByPair('square/picasso2')
// 	.then(version => {
// 		log(`version: ${version}`)
// 	})

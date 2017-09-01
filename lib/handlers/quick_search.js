#!/usr/bin/env node
'use strict';

const Chalk = require('chalk');
const log = console.log;
const Constants = require('../utils/constants');
const fs = require('fs-extra');
const FileHound = require('filehound');
const Similarity = require('string-similarity');

function readConfig(path) {
	return fs.readFile(path)
		.then(content => JSON.parse(content));
}

// Main code //
const self = module.exports = {
	findAllJsonFiles: () => { 
		return FileHound.create()
			.paths(Constants.HIVE_LIBS_DIR)
			.ext('json')
			.find();
	},
	getAllUsernameRepoPairs: () => {
		return self.findAllJsonFiles()	
		.then(items => {
			let newArray = [];
			items.forEach(item => {
				const newItem = item.replace(Constants.HIVE_LIBS_DIR+'/', '').replace('.json','');
				newArray.push(newItem)
			});
			return newArray;
		});
	},
	initOrUpdateFile: () => {
		return self.getAllUsernameRepoPairs()
			.then(items => {
				self.save(items);
				return items;
			})
	},
	save: (items) => {
		fs.writeFileSync(Constants.HIVE_SUMMARY_FILE, JSON.stringify(items), 'utf-8'); 
	}, 
	read: () => {
		let arrayOfPairs;
		if (fs.existsSync(`${Constants.HIVE_SUMMARY_FILE}`)) {
			arrayOfPairs = readConfig(Constants.HIVE_SUMMARY_FILE)
		} else {
			arrayOfPairs = self.initOrUpdateFile();
		}

		return arrayOfPairs;
	},
	search: term => {
		return self.read()
			.then(items => {
				return Similarity.findBestMatch(term, items).bestMatch;
			})
	},
	searchWithMatches: term => {
		return self.read()
			.then(items => {
				return Similarity.findBestMatch(term, items);
			})
	}
};

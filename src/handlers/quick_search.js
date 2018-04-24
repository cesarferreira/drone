#!/usr/bin/env node
'use strict';

const Chalk = require('chalk');
const Hive = require('../handlers/hive');
const log = console.log;
const Log = require('../utils/log_utils');
const Constants = require('../utils/constants');
const fs = require('fs-extra');
const FileHound = require('filehound');
const Suggestions = require('../handlers/suggestions');
const Utils = require('../utils/utils');

function readConfig(path) {
	return fs.readFile(path)
		.then(content => JSON.parse(content));
}

function findItemIn(items, term) {
	if (term.length === 1) {
		return []
	}
	return items.filter(s => s.includes(term))
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

	findBestMatch: (items, searchTerm) => {
		let filteredItems = items.filter(s => s.includes(searchTerm))
		let foundIt = filteredItems.indexOf(searchTerm)
		return (foundIt > -1) ? filteredItems[foundIt] : undefined
	},

	getPairFromInput: term => { 
		return self.search(term)
			.then(results => {
				return results[0]
			});
	},

	search: term => {
		return self.read()
			.then(items => {
				return findItemIn(items, term)
			})
	},

	searchWithSuggestions: term => {
		self.search(term)
			.then(results => {
				if (results.length > 0) {
					self.showSuggestionsIfPresent(results, term);
				} else {
					Utils.suggestCreation(term);
				}
			});
	},

	showSuggestionsIfPresent: (items, term) => {
		let suggestions = Suggestions.getSuggestions(items)

		if (suggestions.length > 0) {
			Log.title(`Look at what I found`);
			suggestions.forEach(item => {
				log(item);
			})
		} else {
			Utils.suggestCreation(term);  
		}
	}
};

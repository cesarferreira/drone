#!/usr/bin/env node
'use strict';

const Chalk = require('chalk');
const Hive = require('../handlers/hive');
const log = console.log;
const Log = require('../utils/log_utils');
const Constants = require('../utils/constants');
const fs = require('fs-extra');
const FileHound = require('filehound');
const Similarity = require('string-similarity');
const Suggestions = require('../handlers/suggestions');
const Utils = require('../utils/utils');

function readConfig(path) {
	return fs.readFile(path)
		.then(content => JSON.parse(content));
}

function getFilteredItems(term, items) {
	let result = items;
	if (term.indexOf('/') === -1) {
		result = items.map(item => item.split('/')[1])
	}
	return result;
}

function findMatch(term, items) {
	let result = items;
	let newTerm = term;
	if (term.indexOf('/') === -1) {
		result = items.map(item => item.split('/')[1])
	}

	if (result.indexOf(term) !== -1) {
		const index = result.indexOf(term);
		newTerm = items[index]
	}

	return newTerm;
}

function showSuggestionsifPresent(suggestions) {
	if (suggestions.length > 0) {
		Log.title(`Did you mean`);
		suggestions.forEach(item => {
			log(item);
		})
	} else {
		Utils.suggestCreation(term);  
	}
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
				const rightTerm = findMatch(term, items);
				return Similarity.findBestMatch(rightTerm, items).bestMatch;
			})
	},
	searchWithMatches: term => {
		return self.read()
			.then(items => {
				const rightTerm = findMatch(term, items);				
				return Similarity.findBestMatch(rightTerm, items);
			})
	},

	searchWithSuggestions: term => {
		
		self.searchWithMatches(term)
		.then(result => {
			if (result.bestMatch.rating === 1) {        
				Log.title(`Found it!`);
				log(Suggestions.getSuggestion(result.bestMatch))
			
			} else if (result.ratings.length > 0) {
				let suggestions = Suggestions.getSuggestions(result.ratings);

				showSuggestionsifPresent(suggestions);
			} else {
				Utils.suggestCreation(term);
			}
		});
	}
};

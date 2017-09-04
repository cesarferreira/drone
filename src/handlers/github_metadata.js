#!/usr/bin/env node
'use strict';

const Chalk = require('chalk');
const log = console.log;

function getGithubUrl(pair) {
	return `https://github.com/${pair}`
}

function containsHttp(str) {
	return str.indexOf(`http`) !== -1;
}

function getMetadata(pair) {
	const inspector = require('github-project-inspector').createInspector({
		plugins: ['readme', 'repo']
	});

	return inspector.inspectRepo(pair)
		.then(meta => {
			return {
				homepage: getGithubUrl(pair),
				description: meta.description.trim(),
				serverType: getServerType(meta.readme.content),
				serverUrl: getServerUrl(meta.readme.content),
				dependency: findCompileDependency(meta.readme.content)
			}
		});
}

function replaceAll(str, find, replace) {
	return str.replace(new RegExp(find, 'g'), replace);
}

function getTheOne(line) {
	const sp = line.trim().split(` `);
	let result = {};

	sp.forEach(item => {
		const count = countColons(item);
		if (count === 2) {
			result = item;
		}
	})

	return result;
}

function findCompileDependency(readme) {
	const arr = readme.split(`\n`);
	let result = ``;

	for (let line of arr) {
		const count = countColons(line);

		if (count === 2 && !containsHttp(line)) {
			let last = getTheOne(line);
			last = replaceAll(last, '`', ``);
			last = replaceAll(last, `'`, ``);
			last = replaceAll(last, `"`, ``);
			result = last.split(`:`).splice(0, 2).join(`:`);
			break;
		}
	}

	return result;
}

function countColons(str) {
	return (str.split(':').length - 1);
}

function getServerUrl(readmeContent) {
	let result = ''

	if (containsSubstring(readmeContent, 'https://jitpack.io')) {
		result = 'https://jitpack.io';
	}

	return result;
}

function containsSubstring(str, substr) {
	return str.indexOf(substr) > -1;
}

function getServerType(readmeContent) {
	let result = 'jcenter'

	if (containsSubstring(readmeContent, 'maven')) {
		result = 'maven';
	}

	return result;
}

// Main code //
const self = module.exports = {
	getGithubMetadata: pair => {
		return new Promise((resolve, reject) => {
			return getMetadata(pair.trim())
			  .then(metadata => {
					resolve(metadata);
				})
				.catch(err => {
					resolve({
						homepage: '',
						description: '',
						serverType: '',
						serverUrl: '',
						dependency: ''
					});
				});
		});
	}
};

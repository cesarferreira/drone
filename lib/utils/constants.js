#!/usr/bin/env node
'use strict';

const homedir = require('homedir');
const Chalk = require('chalk');

const HIVE_GITHUB_URL = 'https://github.com/cesarferreira/drone-hive';
const DRONE_HOME_DIR = `${homedir()}/.drone`;
const HIVE_HOME_DIR = `${DRONE_HOME_DIR}/drone-hive`;
const HIVE_LIBS_DIR = `${HIVE_HOME_DIR}/hive`;
const HIVE_SUMMARY_FILE = `${DRONE_HOME_DIR}/hive_summary.json`;
const CREATE_QUESTIONS = [
	{
		type: 'input',
		name: 'name',
		message: `What's the project's name?`,
		default: () => 'username/repo'
	},
	{
		type: 'input',
		name: 'dependency',
		message: `What's the dependency?`,
		default: () => 'com.username.library:library'
	},
	{
		type: 'input',
		name: 'server',
		message: `What's the server?`,
		default: () => 'jcenter'
	},
	{
		type: 'input',
		name: 'compileType',
		message: `What's the compilation type? ${Chalk.gray('(e.g. compile/testCompile/provide/etc)')}`,
		default: () => 'compile'
	},
	{
		type: 'input',
		name: 'customRepository',
		message: `Does it have a custom classpath? (e.g.: https://jitpack.io)`
	},
	{
		type: 'input',
		name: 'homepage',
		message: `What's the homepage (optional)?`
	},
	{
		type: 'input',
		name: 'description',
		message: `What's the project description (optional)?`
	}
];

// Main code //
module.exports = Object.freeze({
	HIVE_GITHUB_URL,
	HIVE_HOME_DIR,
	HIVE_LIBS_DIR,
	CREATE_QUESTIONS,
	DRONE_HOME_DIR,
	HIVE_SUMMARY_FILE
});

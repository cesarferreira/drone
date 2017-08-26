#!/usr/bin/env node
'use strict';

const homedir = require('homedir');
const Chalk = require('chalk');


const CREATE_QUESTIONS = [
	{
		type: 'input',
		name: 'name',
		message: `What's the project's name? (e.g. square/retrofit)`,
		default: () => 'creator/library'
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
		message: `Does it have a custom classpath? ${Chalk.gray('(e.g.: https://jitpack.io)')}`
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

const HIVE_GITHUB_URL = 'https://github.com/cesarferreira/drone-hive';
const DRONE_HOME_DIR = `${homedir()}/.drone`;
const HIVE_HOME_DIR = `${DRONE_HOME_DIR}/drone-hive`;
const HIVE_LIBS_DIR = `${HIVE_HOME_DIR}/hive`;
const HIVE_SUMMARY_FILE = `${DRONE_HOME_DIR}/hive_summary.json`;
const DRONE_CONFIG_FILE = `${DRONE_HOME_DIR}/config.json`;

const UPDATE_TIMOUT = 60*60; // 1 hour in seconds

const JCENTER_URL_TEMPLATE = `https://jcenter.bintray.com/PLACEHOLDER/maven-metadata.xml`;
const MAVEN_URL_TEMPLATE = `http://repo1.maven.org/maven2/PLACEHOLDER/maven-metadata.xml`;
const JITPACK_URL_TEMPLATE = `https://jitpack.io/PLACEHOLDER/maven-metadata.xml`;
const MAVEN_CUSTOM_URL_TEMPLATE = `URL/PLACEHOLDER/maven-metadata.xml`;

const ALL_PROJECTS_TEMPLATE = `
allprojects {
    repositories {
        SERVER { url 'SERVER_URL' }
    }
	}
}`

// Main code //
module.exports = Object.freeze({
	HIVE_GITHUB_URL,
	HIVE_HOME_DIR,
	HIVE_LIBS_DIR,
	CREATE_QUESTIONS,
	DRONE_HOME_DIR,
	HIVE_SUMMARY_FILE,
	MAVEN_URL_TEMPLATE,
	JCENTER_URL_TEMPLATE,
	JITPACK_URL_TEMPLATE,
	MAVEN_CUSTOM_URL_TEMPLATE,
	DRONE_CONFIG_FILE,
	ALL_PROJECTS_TEMPLATE,
	UPDATE_TIMOUT
});

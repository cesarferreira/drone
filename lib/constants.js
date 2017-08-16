#!/usr/bin/env node
'use strict';

const homedir = require('homedir');
const HIVE_GITHUB_URL = 'https://github.com/cesarferreira/drone-hive';
const HIVE_HOME_DIR = `${homedir()}/.drone-hive`;
const HIVE_LIBS_DIR = `${HIVE_HOME_DIR}/hive/`;

// Main code //
module.exports = Object.freeze({
	HIVE_GITHUB_URL,
	HIVE_HOME_DIR,
	HIVE_LIBS_DIR,
});

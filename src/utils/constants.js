#!/usr/bin/env node
'use strict';

const homedir = require('homedir');
const Chalk = require('chalk');

const HIVE_GITHUB_URL = 'https://github.com/cesarferreira/drone-hive';
const DRONE_HOME_DIR = `${homedir()}/.drone`;
const HIVE_HOME_DIR = `${DRONE_HOME_DIR}/drone-hive`;
const HIVE_LIBS_DIR = `${HIVE_HOME_DIR}/hive`;
const HIVE_SUMMARY_FILE = `${DRONE_HOME_DIR}/hive_summary.json`;
const DRONE_CONFIG_FILE = `${DRONE_HOME_DIR}/config.json`;

const UPDATE_TIMOUT = 60 * 60 * 48; // 48 hours in seconds

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

const ALL_PROJECTS_EMPTY_TEMPLATE = `
allprojects {
    repositories {
      jcenter()
    }
}`

// Main code //
module.exports = Object.freeze({
	HIVE_GITHUB_URL,
	HIVE_HOME_DIR,
	HIVE_LIBS_DIR,
	DRONE_HOME_DIR,
	HIVE_SUMMARY_FILE,
	MAVEN_URL_TEMPLATE,
	JCENTER_URL_TEMPLATE,
	JITPACK_URL_TEMPLATE,
	MAVEN_CUSTOM_URL_TEMPLATE,
	DRONE_CONFIG_FILE,
	ALL_PROJECTS_TEMPLATE,
	UPDATE_TIMOUT,
	ALL_PROJECTS_EMPTY_TEMPLATE
});

#!/usr/bin/env node
'use strict';

const meow = require('meow');
const core = require('./index.js');

const cli = meow(`
 Usage
   $ drone <command> <params>
   
 Examples
   $ drone install                    # downloads the packages
   $ drone add <module> <package>     # opens current pull request page`,
{});

if (cli.input.length > 0 ) {
	core.init(cli.input);
} else {
	cli.showHelp(2);
}
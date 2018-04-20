#!/usr/bin/env node
'use strict';

const meow = require('meow');
const router = require('./src/router');
const updateNotifier = require('update-notifier');
const pkg = require('./package.json');

updateNotifier({ pkg }).notify();

const cli = meow(`
Usage

   $ drone <command> <params>

   $ drone install                            # Downloads the packages
   $ drone test <library>                     # Tests the library by fetching its version
   $ drone add <library> <module>             # Adds a dependency to a module
   $ drone remove <library> <module>          # Removes the dependency from a module
   $ drone info <library>                     # Retrieves the info for this package
   $ drone update                             # Get the latest packages
   $ drone list                               # List all of the packages
   $ drone stats                              # Get some stats regarding the hive
   $ drone hive                               # Opens the hive url
   $ drone open <library>                     # Opens the library's homepage
   $ drone search <library>                   # Searches for the 'library' in the hive

 Examples

   $ drone install                            # Downloads the packages
   $ drone info picasso                       # Shows the info for picasso
   $ drone add retrofit app                   # Adds retrofit to the 'app' module 
   $ drone rm retrofit app                    # removes retrofit from the 'app' module 
   $ drone open gson                          # Opens GSONs homepage
   $ drone search rxjava                      # Searches the hive for 'rxjava'
   $ drone test picasso                       # Tests the library by fetching its version
`,
{
  alias: {
    v: 'version'
  },
  boolean: ['version']
});

// todo missing HasFlag --version, -v
if (cli.input.length > 0) {
	router.init(cli.input, cli.flags);
} else {
	cli.showHelp(2);
}

#!/usr/bin/env node
'use strict';

const meow = require('meow');
const router = require('./lib/router');

const cli = meow(`
Usage

   $ drone <command> <params>

   $ drone install                          # Downloads the packages
   $ drone add <username/repo> <module>     # Adds a dependency to a module
   $ drone info <username/repo>             # Retrieves the info for this package
   $ drone open <username/repo>             # Opens the library's homepage
   $ drone create                           # Creates a new one if it's not in the server yet
   $ drone search <library>                 # Searches for the 'library' in the hive
   $ drone test <username/repo>             # Tests the library by fetching its version

 Examples

   $ drone install                          # Downnloads the packages
   $ drone info square/picasso              # Shows the info for square/picasso
   $ drone add square/retrofit app          # Adds retrofit to the 'app' module 
   $ drone open google/gson                 # Opens GSONs homepage
   $ drone create                           # takes you throught the creation wizard
   $ drone search rxjava                    # Searches the hive for 'rxjava'
   $ drone test square/picasso              # Tests the library by fetching its version
`,
{
  alias: {
    // h: 'homepage', // Optional
    // d: 'description', // Optional
    // s: 'server', // Optional
    // d: 'dependency'
  }
});

if (cli.input.length > 0 ) {
	router.init(cli.input, cli.flags);
} else {
	cli.showHelp(2);
}
#!/usr/bin/env node
'use strict';

const meow = require('meow');
const router = require('./lib/router');

const cli = meow(`
Usage

   $ drone <command> <params>

   $ drone install                          # downloads the packages
   $ drone add <username/repo> <module>     # adds a dependency to a module
   $ drone info <username/repo>             # retrieves the info for this package
   $ drone create                           # creates a new one if it's not in the server yet
   $ drone search <library>                 # searches for the 'library' in the hive
   
 Examples

   $ drone info square/picasso              # Shows the info for square/picasso
   
   $ drone add reactivex/rxjava app         # Adds RxJava to the 'app' module
   $ drone add square/retrofit app          # Adds retrofit to the 'app' module
   $ drone add support/design app           # Adds design support to the 'app' module
   $ drone add google/gson app              # Adds GSON to the 'app' module
   
   $ drone create                           # takes you throught the wizard
   
   $ drone search rxjava                    # Searches the hive for 'rxjava'
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
#!/usr/bin/env node
'use strict';

const meow = require('meow');
const core = require('./lib/router');

const cli = meow(`
 Usage
   $ drone <command> <params>

   $ drone install                          # downloads the packages
   $ drone add <username/repo> <module>     # adds a dependency to a module
   $ drone info <username/repo>             # retrieves the info for this package
   $ drone create <todo>                    # creates a new one if it's not in the server yet
   
   # Multiline
   $ drone create square/picasso  \
          --homepage http://square.github.io/picasso \
          --description "image downloading and caching library" \
          --dependency com.squareup.picasso:picasso \
          --server jcenter

 Examples
   $ drone info square/picasso to module
   $ drone add reactivex/rxjava to module
   $ drone add square/retrofit to module
   $ drone add support/design to module
   $ drone add google/gson to module
   
   $ drone create square/picasso --dependency com.squareup.picasso:picasso
   `,
{
  alias: {
    h: 'homepage', // Optional
    d: 'description', // Optional
    s: 'server', // Optional
    d: 'dependency'
  }
});

if (cli.input.length > 0 ) {
	core.init(cli.input, cli.flags);
} else {
	cli.showHelp(2);
}
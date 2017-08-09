#!/usr/bin/env node
'use strict';

const meow = require('meow');
const core = require('./lib/router');

const cli = meow(`
 Usage
   $ drone <command> <params>
   
 Examples
   $ drone install                    # downloads the packages
   $ drone add <module> <package>     # opens current pull request page
   $ drone create <todo>              # opens current pull request page
   
   $ drone create square/picasso --dependency com.squareup.picasso:picasso
   
   # Multiline
   $ drone create square/picasso  \
          --url http://square.github.io/picasso \
          --description "image downloading and caching library" \
          --dependency com.squareup.picasso:picasso \
          --server jcenter
   
   `,
{
  alias: {
    u: 'url', // Optional
    d: 'description', // Optional
    // g: 'groupId',
    // a: 'artifactId',
    d: 'dependency',
    s: 'server' // Optional
  }
});

if (cli.input.length > 0 ) {
  // console.log(JSON.stringify(cli.flags));
	core.init(cli.input, cli.flags);
} else {
	cli.showHelp(2);
}
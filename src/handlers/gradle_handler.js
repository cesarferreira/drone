#!/usr/bin/env node
'use strict';

const log = console.log;
const fs = require('fs');

// Main code //
const self = module.exports = {
  // Init
  run: (tasks) => {
    log(`Im supposed to run: ${tasks.join(', ')}`)
   // todo is a build.gradle present?
    // ha ./gradlew?
    // ha gradle?
  }
};

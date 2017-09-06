#!/usr/bin/env node
'use strict';

const Chalk = require('chalk');
const log = console.log;
const Analytics = require('analytics-node');
const Utils = require('../utils/utils');
// Main code //
const self = module.exports = {
  track: (eventName, eventProperties) => {

    eventProperties = typeof eventProperties !== 'undefined' ? eventProperties : {};

    const client = new Analytics('b22zBM05ZkjwdBXUt7mqgVutSqvPua4B');

    let trackEvent = {
      userId: `anonymousId`,
      event: eventName
    }

    if (!Utils.isEmpty(eventProperties)) {
      trackEvent.properties = eventProperties
    }

    // log(trackEvent);
    client.track(trackEvent);
  }
};

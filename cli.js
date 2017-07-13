#!/usr/bin/env node
var cuckoo = require('./index.js');

console.info(JSON.stringify(cuckoo.run(process.env.PWD, true)));

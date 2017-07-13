#!/usr/bin/env node
var cuckoo = require('./index.js');

console.info(JSON.stringify(cuckoo.createReport(process.env.PWD)));

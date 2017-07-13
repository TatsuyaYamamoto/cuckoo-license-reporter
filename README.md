# cuckoo

[![Build Status](https://travis-ci.org/TatsuyaYamamoto/cuckoo-license-reporter.svg?branch=master)](https://travis-ci.org/kxingjs/kxing)

[![NPM](https://nodei.co/npm/cuckoo-license-reporter.png?compact=true)](https://nodei.co/npm/cuckoo-license-reporter/)

cuckoo is a license reporter of npm packages that the project installed.

## Installation

You can install via [npm](https://www.npmjs.com/package/cuckoo-license-reporter).

```bash
$ npm install cuckoo-license-reporter --save-dev
```

## Usage

```bash
// It's required to install target modules.
$ npm install

// write the result to the standard output.
$ $(npm bin)/cuckoo
```


## Example

```bash
// cuckoo dependecies. 
$ $(npm bin)/cuckoo | jq
{
  "title": "cuckoo license report",
  "numberOfPackages": 1,
  "results": [
    {
      "name": "lodash",
      "version": "4.17.4",
      "license": "MIT",
      "repositoryUrl": "git+https://github.com/lodash/lodash.git"
    }
  ]
}

```
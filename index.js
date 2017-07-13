var fs = require('fs');
var path = require('path');
var _ = require('lodash');

function run(projectRootDirPath, recursive) {
    var projectPackageJson = loadPackageJson(projectRootDirPath)();

    if (!_.has(projectPackageJson, "dependencies")) {
        console.error("There are no dependencies.");
        process.exit(1);
    }

    var dependingPackageJsonList = _.keys(projectPackageJson.dependencies).map(loadPackageJson(projectRootDirPath));

    if (recursive) {
        dependingPackageJsonList = _.flatten(_.concat(
            dependingPackageJsonList,
            dependingPackageJsonList.map(function (dependingPackageJson) {
                return _.keys(dependingPackageJson.dependencies).map(loadPackageJson(projectRootDirPath));
            })));
    }

    return createReport(projectPackageJson, dependingPackageJsonList);
}

function loadPackageJson(dirPath) {
    return function (packageName) {
        var targetPath = packageName ?
            path.resolve(dirPath, 'node_modules', packageName, 'package.json') :    // node modules'
            path.resolve(dirPath, 'package.json');                                  // project's

        return JSON.parse(fs.readFileSync(targetPath, 'utf8'));
    }
}

function createReport(projectPackageJson, dependingPackageJsonList) {
    return {
        title: 'cuckoo license report',
        numberOfPackages: _.keys(projectPackageJson.dependencies).length,
        results: dependingPackageJsonList.map(function (packageJson) {
            return {
                name: packageJson.name,
                version: packageJson.version,
                license: packageJson.license,
                repositoryUrl: packageJson.repository ? packageJson.repository.url : null
            }
        })
    };
}

exports.run = run;

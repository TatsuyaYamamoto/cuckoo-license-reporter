var fs = require('fs');
var path = require('path');

var reportTemplate = {
    title: 'cuckoo license report',
    numberOfPackages: 0,
    results: []
};
var packageResultTemplate = {
    name: null,
    version: null,
    license: null,
    repositoryUrl: null
};

function createReport(projectRootDirPath, recursive) {

    var projectPackageJson = loadPackageJson(projectRootDirPath);

    if (!projectPackageJson.dependencies) {
        console.error("There are no dependencies.");
        process.exit(1);
    }

    var dependingPackageNameList = Object.keys(projectPackageJson.dependencies);

    if (recursive) {
        dependingPackageNameList.forEach(function (package) {
            var packageJson = loadPackageJson(path.resolve(projectRootDirPath, 'node_modules', package));

            if (packageJson.dependencies) {
                Array.prototype.push.apply(
                    dependingPackageNameList,
                    Object.keys(packageJson.dependencies));
            }
        })
    }

    var report = reportTemplate;
    report.numberOfPackages = dependingPackageNameList.length;
    report.results = dependingPackageNameList.map(function (packageName) {
        var packageJson = loadPackageJson(path.resolve(projectRootDirPath, 'node_modules', packageName));
        return {
            name: packageJson.name,
            version: packageJson.version,
            license: packageJson.license,
            repositoryUrl: packageJson.repository ? packageJson.repository.url : null
        };
    });

    return report;
}
//---------------------------------------------------------------------------
// Private methods
//---------------------------------------------------------------------------


function loadPackageJson(dirPath) {
    return JSON.parse(fs.readFileSync(path.resolve(dirPath, 'package.json'), 'utf8'));
}

function loadNodeModuleDirs(dirPath) {
    return fs.readdirSync(path.resolve(dirPath, 'node_modules')).filter(function (dirName) {
        return dirName !== '.bin';
    });
}

function getDependingPackageNames(projectRootDirPath, recursive) {
    var projectPackageJson = loadPackageJson(projectRootDirPath);

    var projectDependencies = Object.keys(packageJson.dependencies);
    if (!recursive) {
        return projectDependencies;
    }

    projectDependencies.forEach(function (d) {
        loadPackageJson()
    })
}

exports.createReport = createReport;

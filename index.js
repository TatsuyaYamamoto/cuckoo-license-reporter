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

function createReport() {
function createReport(projectRootDirPath) {

    var packageDirNames = loadNodeModuleDirs(projectRootDirPath);

    var report = reportTemplate;
    report.numberOfPackages = packageDirNames.length;
    packageDirNames.forEach(function (packageDirName, index, array) {
        var packageJson = loadPackageJson(path.resolve(projectRootDirPath, 'node_modules', packageDirName));
        report.results.push({
            name: packageJson.name,
            version: packageJson.version,
            license: packageJson.license,
            repositoryUrl: packageJson.repository ? packageJson.repository.url : null
        });
    });

    return report;
}
//---------------------------------------------------------------------------
// Private methods
//---------------------------------------------------------------------------


function loadNodeModuleDirs(dirPath) {
    return fs.readdirSync(path.resolve(dirPath, 'node_modules')).filter(function (dirName) {
        return dirName !== '.bin';
    });
}

function isNotBinDir(dirName) {
    return dirName !== '.bin';
}

exports.createReport = createReport;

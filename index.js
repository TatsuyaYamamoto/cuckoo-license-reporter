var fs = require('fs');
var path = require('path');


function createReport() {
function createReport(projectRootDirPath) {

    var packageDirNames = loadNodeModuleDirs(projectRootDirPath);
    var report = createReportTemplateJson();
    report['numberOfPackages'] = packageDirNames.length;
    packageDirNames.forEach(function (packageDirName, index, array) {
        var packageJson = loadPackageJson(path.resolve(projectRootDirPath, 'node_modules', packageDirName));

        report['results'].push({
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

function createReportTemplateJson() {
    var report = Object.create(null);
    report['title'] = 'cuckoo license report';
    report['results'] = [];

    return report;
}

function isNotBinDir(dirName) {
    return dirName !== '.bin';
}

exports.createReport = createReport;

var fs = require('fs');


function createReport() {
    var packageDirNames = loadNodeModuleDirs().filter(isNotBinDir);

    var report = createReportTemplateJson();
    report['numberOfPackages'] = packageDirNames.length;
    packageDirNames.forEach(function (packageDirName, index, array) {
        var packageJson = loadPackageJson(packageDirName);

        report['results'].push({
            name: packageJson.name,
            version: packageJson.version,
            license: packageJson.license,
            repositoryUrl: packageJson.repository ? packageJson.repository.url : null
        });
    });

    return report;
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

function loadNodeModuleDirs() {
    return fs.readdirSync('./node_modules/');
}

function loadPackageJson(packageDirName) {
    return JSON.parse(fs.readFileSync('./node_modules/' + packageDirName + '/package.json', 'utf8'));
}

exports.createReport = createReport;

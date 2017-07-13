var exec = require('child_process').exec;

const cuckooResult = {
    title: "cuckoo license report",
    numberOfPackages: 1,
    results: [
        {
            name: "lodash",
            version: "4.17.4",
            license: "MIT",
            repositoryUrl: "git+https://github.com/lodash/lodash.git"
        }
    ]
};

describe("Command Line Execution", function () {
    it("should output detail json without option", function (done) {
        exec('node cli.js', function (err, stdout, stderr) {
            expect(err).toBeNull();
            expect(JSON.parse(stdout)).toEqual(cuckooResult);
            done();
        });
    });
});

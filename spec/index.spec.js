var rewire = require('rewire');
const index = rewire('../index');

describe("index.js", function () {
    describe("Module methods", function () {

    });

    describe("Private methods", function () {
        describe("loadPackageJson()", function () {
            var loadPackageJson = index.__get__("loadPackageJson");

            it("should be curried function.", function () {
                const curried = loadPackageJson();

                expect(typeof curried).toBe("function");
            });

            it("should return deserialize package.json", function () {
                const projectRootPath = process.env.PWD;

                expect(typeof loadPackageJson(projectRootPath)()).toBe("object");
            });

            it("should return project's package.json without package name", function () {
                const projectRootPath = process.env.PWD;

                expect(loadPackageJson(projectRootPath)().name).toBe("cuckoo");
            });

            it("should return depending package.json with package name", function () {
                const projectRootPath = process.env.PWD;
                const testPackageName = "lodash";
                expect(loadPackageJson(projectRootPath)(testPackageName).name).toBe(testPackageName);
            });
        });
    });
});

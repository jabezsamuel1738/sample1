const jsonData = require('./excludejson.json'); // import the file path

// Merge two arrays
jsonData.excludes["folderPath"].push(...jsonData.excludes["extension"]);

//Get the arrays for fileExcluding and fileIncluding
let filesExcludedForUnittesting = jsonData.excludes["folderPath"]
let filesIncludedForUnitTesting = jsonData.includes["folderPath"]

module.exports = {
  preset: "react-native",
  coverageDirectory: "coverage", // Folder where your Code Coverage need to Present
  collectCoverageFrom: filesIncludedForUnitTesting, // Files Includes for Unit testing
  coveragePathIgnorePatterns: filesExcludedForUnittesting, // Files Excludes for Unit testing
};

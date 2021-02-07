module.exports = {
    setupFilesAfterEnv: ["./jest.setup.js"],
    moduleNameMapper:{
      "^@components(.*)$": "<rootDir>/components$1",
       "^@styles(.*)$": "<rootDir>/styles$1",
    }
  };
  
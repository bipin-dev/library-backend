const path = require("path");
let config = require("./config");

const appPath = path.resolve(__dirname);
const frPath = path.resolve(__dirname, "./framework.js");
console.log("fr path is ... ", frPath);

config.dir.app = appPath;
config.dir.jr = frPath;

const Server = require(frPath);
const inst = new Server(config);
inst.initialize();

inst.startServer();

const debug = require("debug")("app:logger");

function log(req, res, next) {
  debug("logging...");
  next();
}

module.exports = log;

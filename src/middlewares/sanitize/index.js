'use strict'
const utilites = require("../../utilities");
const logger = utilites.logger;

const log = logger('sanitize.index');

let sanitize = (req, res, next) => {
  const payload = req.body;
  const sanitized_payload = {};
  log.info("Incoming Headers", JSON.stringify(req.headers));
  log.info("Req Body", JSON.stringify(payload));

  if (payload.payload ) {
    sanitized_payload.payload = payload.payload;
  }
  if (payload.color ) {
    sanitized_payload.color = payload.color;
  }
  if (payload.name || payload.Name || payload.NAME ) {
    sanitized_payload.name = (payload.name || payload.Name || payload.NAME)
  }

  req.payload = sanitized_payload;
  next();
}


module.exports = sanitize;
const rateLimit = require('express-rate-limit');
const { ONE_MINUTE_MS } = require('../config/constants');

const API_ENDPOINT_RATE_LIMIT = {
  '/upload': { limit: 5, window: ONE_MINUTE_MS, }, // 5 requests per minute
  '/login': { limit: 10, window: ONE_MINUTE_MS }, // 10 requests per minute
};

function useLimiter(req, res, next) {
  let limitObject = API_ENDPOINT_RATE_LIMIT[req.url]
  if (limitObject) {
    rateLimit(limitObject)
  } else {
    next()
  }
}



module.exports = {
  useLimiter
}
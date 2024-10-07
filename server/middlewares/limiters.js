const rateLimit = require('express-rate-limit')

const emailLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 3, // limit each IP to 1 request per windowMs
  message: ["message", "Too many"]
});


const mainLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 3, // limit each IP to 1 request per windowMs
  message: ["message", "Too many"]
})


module.exports = {
  emailLimiter
}
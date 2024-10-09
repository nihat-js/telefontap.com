const crypto = require("crypto");

// Generate a session token (secure random value)
function generateSessionToken() {
  return crypto.randomBytes(32).toString("hex");
}

// Generate a verification code for email
function generateVerifyByEmailCode() {
  // A simple 6-digit numeric code (can be adjusted as needed)
  return Math.floor(100000 + Math.random() * 900000).toString(); // Returns a string
}

// Generate a verification code for phone number
function generateVerifyByPhoneNumberCode() {
  // A simple 6-digit numeric code (can be adjusted as needed)
  return Math.floor(100000 + Math.random() * 900000).toString(); // Returns a string
}

// Generate a reset password code for email
function generateResetPasswordByEmailCode() {
  // A secure random string for password reset (can use different lengths)
  return crypto.randomBytes(16).toString("hex");
}

// Generate a reset password code for phone number
function generateResetPasswordByPhoneNumberCode() {
  // A secure random string for password reset (can use different lengths)
  return crypto.randomBytes(16).toString("hex");
}

module.exports = {
  generateSessionToken,
  generateVerifyByEmailCode,
  generateVerifyByPhoneNumberCode,
  generateResetPasswordByEmailCode,
  generateResetPasswordByPhoneNumberCode
};

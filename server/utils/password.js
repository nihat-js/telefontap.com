const bcrypt = require('bcrypt');


async function hashPassword(plainPassword) {
  const saltRounds = 10; // You can adjust this value for more security (cost factor)
  const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);
  return hashedPassword;
}

async function verifyPassword(plainPassword, hashedPassword) {
  const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
  return isMatch; // Returns true if the passwords match, false otherwise
}

module.exports = {
  hashPassword,
  verifyPassword
}
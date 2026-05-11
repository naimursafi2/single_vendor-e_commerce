const crypto = require('crypto');


const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const isValidEmail = (email) => {
  return emailRegex.test(email);
};

const generatOTP = () => {
  return crypto.randomInt(1000, 10000).toString();
};

module.exports = { isValidEmail, generatOTP };

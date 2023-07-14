const crypto = require('crypto');

const generateSecretKey = () => {
  const length = 12;
  const buffer = crypto.randomBytes(length);
  return buffer.toString('hex');
};

const secretKey = generateSecretKey();
console.log(secretKey);
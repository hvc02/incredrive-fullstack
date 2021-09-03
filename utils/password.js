const bcrypt = require("bcryptjs");

const generatePasswordHash = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

const isValidPassword = async (password, hashedPassword) => {
  const validPassword = await bcrypt.compare(password, hashedPassword);
  return validPassword;
};

module.exports = {
  generatePasswordHash,
  isValidPassword,
};
